/**
 * get the list of all hives from a hiveGroup
 * @int id : identifier of the hiveGroup
 * @function action : callback, what to do with the data
 */
function getListHives(id, action) {
		enCharge=true;
		_("ch").style.visibility="visible";
		if(isTest) {
		    enCharge=false;
		    hiveGroups[idHiveGroup].hives = test.hives;
			_("ch").style.visibility="hidden";
			action(id, test.hives);
		}
		else {
            $.ajax({
                type: 'GET',
                url: url+'pscustomer/hives/me',
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
				    enCharge=false;
				    _("ch").style.visibility="hidden";
                    //console.log(data); 
                    //$("#resultat").html(JSON.stringify(data));
                    console.log(id);
                    console.log(hiveGroups);
				    hiveGroups[id].hives = data;
                    action(id, data);
                },
            });
        }
};

/**
 * display the list of hives
 * @int id : identifier of the hiveGroup
 * @Object listHives : JSON Object containing the list of all hives
 */
function goToListHives(id, listHives) {
	//console.log('goToListHives : begin');
	var template = $(templates).filter('#tpl-accueil').html();
	var idx = 1;
	hiveGroups[id].hives = listHives;
	var i = 0;
	function a(j, name, data) {
		hiveGroups[id].hives[j].data = data;
		if(j+1<hiveGroups[id].hives.length) {
			//console.log(data);
			getDataHive(listHives[j+1].id_hive, j+1, listHives[j+1].name, a);
		}
		else {
			var obj_array = [];

			for (idx in hiveGroups[id].hives) {
				   obj_array.push ({'index': (parseInt(idx)+1), 'data': hiveGroups[id].hives[idx]});
			}

			listHives = {
				"ruches": obj_array
			}
			//console.log(listHives.ruches.length);
			//console.log(JSON.stringify(listHives)); 
			//console.log(listHives.ruches[0].name);
			//console.log(listHives);
			
		    var h = Mustache.render(template, listHives);
            console.log(listHives);
		    //console.log(h);
		    document.getElementById("content-accueil").innerHTML = h;
		    //console.log(document.getElementById("paccueil").innerHTML);
		    //console.log('goToListHives : before transition');
		    transition(_("paccueil"), "slide");
		    accueil(listHives.ruches.length);
		    for(var k=1; k<=listHives.ruches.length; k++) {
		    	//console.log(k);
		    	$("ruche"+k+"_selectionnee_reglages").click(function(e) {
		    		e.preventDefault();
		    		//console.log($(".ruche_selectionnee_reglages").index());
		    		idHive = k-1;
		    		goToHiveParameters();
		    	});
		    	_("ruche"+k).addEventListener('click', function(e) {
		    		e.preventDefault();
		    		//console.log($(this)[0].id);
		    		var k = $(this)[0].id.split("ruche")[1];
		    		idHive = k-1;
		    		hive = hiveGroups[id].hives[k-1].data;
		    		name = hiveGroups[id].hives[k-1].name;
		    		goToDataHives(name, hive);
		    	});
		    }
		    masquerBd();
		}
	}
	$("#add_hive").click(function() {
	    createHive();
	});
	getDataHive(listHives[0].id_hive, 0, listHives[0].name, a);
};

/*
 * create a new hive (show form and deal with it), then let user add a logger
 */
function createHive() {
    transition(_("pcreate-hive"), "slide");
    if(isTest) {
    	$("#form-create-hive").submit(function(e){
	        e.preventDefault();
            var donnees = $(this).serialize();
            idHive = hiveGroups[idHiveGroup].hives.length; //change idHive
        	updateLocalHive(idHive, donnees); // locally update list hive 
        	console.log(hiveGroups[idHiveGroup].hives[idHive]);
        	//goToAddLogger(); // add if needed a logger to the hive
	        /* TODO : update local state
	        hiveGroups[idHiveGroup].hives[idHive].name = $("#apibundle_pshive_name").val();
	        hiveGroups[idHiveGroup].hives[idHive].note = $("#apibundle_pshive_note").val();
	        hiveGroups[idHiveGroup].hives[idHive].latitude = $("#apibundle_pshive_latitude").val();
	        hiveGroups[idHiveGroup].hives[idHive].longitude = $("#apibundle_pshive_longitude").val();
	        hiveGroups[idHiveGroup].hives[idHive].hive_type = $("#apibundle_pshive_hiveType").val();
	        hiveGroups[idHiveGroup].hives[idHive].bees_type = $("#apibundle_pshive_beesType").val();
	        hiveGroups[idHiveGroup].hives[idHive].material = $("#apibundle_pshive_material").val();
	        hiveGroups[idHiveGroup].hives[idHive].support = $("#apibundle_pshive_support").val();
	        hiveGroups[idHiveGroup].hives[idHive].state = $("#apibundle_pshive_state").val();
	        hiveGroups[idHiveGroup].hives[idHive].harvest = $("#apibundle_pshive_harvest").val();
	        hiveGroups[idHiveGroup].hives[idHive].note= $("#apibundle_pshive_note").val();
	        hiveGroups[idHiveGroup].hives[idHive].notes = $("#apibundle_pshive_notes").val();
	        //console.log(hiveGroups[idHiveGroup].hives[idHive]);
	        goToDataHives(hiveGroups[idHiveGroup].hives[idHive].name, hiveGroups[idHiveGroup].hives[idHive].data,true);*/
	        gotToListHives(idHiveGroup, hiveGroups[idHiveGroup].hives]);
    	})
    }
    else {
        $("#form-create-hive").submit(function(e){
            //console.log("début ajout");
            e.preventDefault();
            var donnees = $(this).serialize();
            //console.log(donnees);
            $.ajax({
                type: 'POST',
                url: url+'pshive',
                xhrFields: {
                    withCredentials: true
                },
                data: donnees,
                success: function(data) {
                	//console.log(data); 
                	customer = data;
                	idHive = hiveGroups[idHiveGroup].hives.length; //change idHive
                	updateLocalHive(idHive, donnees); // locally update list hive 
                	console.log(hiveGroups[idHiveGroup].hives[idHive]);
                	goToAddLogger(); // add if needed a logger to the hive
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //console.log(xhr.responseText);
                }
            });
            /* modification en local */
	        /* TODO : update local state
	        hiveGroups[idHiveGroup].hives[idHive].name = $("#apibundle_pshive_name").val();
	        hiveGroups[idHiveGroup].hives[idHive].note = $("#apibundle_pshive_note").val();
	        hiveGroups[idHiveGroup].hives[idHive].latitude = $("#apibundle_pshive_latitude").val();
	        hiveGroups[idHiveGroup].hives[idHive].longitude = $("#apibundle_pshive_longitude").val();
	        hiveGroups[idHiveGroup].hives[idHive].hive_type = $("#apibundle_pshive_hiveType").val();
	        hiveGroups[idHiveGroup].hives[idHive].bees_type = $("#apibundle_pshive_beesType").val();
	        hiveGroups[idHiveGroup].hives[idHive].material = $("#apibundle_pshive_material").val();
	        hiveGroups[idHiveGroup].hives[idHive].support = $("#apibundle_pshive_support").val();
	        hiveGroups[idHiveGroup].hives[idHive].state = $("#apibundle_pshive_state").val();
	        hiveGroups[idHiveGroup].hives[idHive].harvest = $("#apibundle_pshive_harvest").val();
	        hiveGroups[idHiveGroup].hives[idHive].note= $("#apibundle_pshive_note").val();
	        hiveGroups[idHiveGroup].hives[idHive].notes = $("#apibundle_pshive_notes").val();
	        //console.log(hiveGroups[idHiveGroup].hives[idHive]);*/
            console.log("fin ajout");
        });
    }
}

/*
 * update locally one hive in the list of hives
 * @integer idHive : identifier of the to-update hive in the list
 * @Object donnees : object containing the new hive's data
 */
function updateLocalHive(idHive, donnees) {
    if(idHive >= hiveGroups[idHiveGroup].hives.length) {//new hive
        hiveGroups[idHiveGroup].hives.push(donnees);
    }
    else {//update old one
        hiveGroups[idHiveGroup].hives[idHive] = donnees;
    }
}
