/**
 * get the list of all hives from a hiveGroup
 * @int idHiveGroup : identifier of the hiveGroup
 * @function action : callback, what to do with the data
 */
function getListHives(idHiveGroup, action,retour) {
		enCharge=true;
		_("ch").style.visibility="visible";
		if(isTest) {
		    enCharge=false;
		    hiveGroups[idHiveGroup].hives = test.hives;
			_("ch").style.visibility="hidden";
			action(idHiveGroup, test.hives,retour);
		}
		else {
		    console.log('récupération des ruches du rucher ' + idHiveGroup);
		    console.log(hiveGroups[idHiveGroup]);
            $.ajax({
                type: 'GET',
                url: url+'pshivegroup/hives/' + hiveGroups[idHiveGroup].id_hive_group,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
				    enCharge=false;
				    _("ch").style.visibility="hidden";
                    console.log(data.ruches); 
                    //$("#resultat").html(JSON.stringify(data));
                    console.log("hiveGroups : " + hiveGroups);
				    hiveGroups[idHiveGroup].hives = data.ruches;
                    action(idHiveGroup, data.ruches, retour);
                },
            });
        }
};

/**
 * display the list of hives
 * @int id : identifier of the hiveGroup
 * @Object listHives : JSON Object containing the list of all hives
 */
function goToListHives(idHiveGroup, listHives,retour) {

	//console.log('goToListHives : begin');
	var template = $(templates).filter('#tpl-accueil').html();
	var idx = 1;
	hiveGroups[idHiveGroup].hives = listHives;
	var i = 0;
	
	/**
	 * get data of the next hive in the hiveGroup
	 * if no more hive in this hiveGroup, display all the hives of the hiveGroup, and on click, bring user to the details of the hive
	 * @integer j : index of the hive in the hiveGroup (client-side)
	 * @String name : name of the hive
	 * @Object data : current data got from the box associated to the hive
	 */
	function a(j, name, data) {
		hiveGroups[idHiveGroup].hives[j].data = data;
		if(j+1 < hiveGroups[idHiveGroup].hives.length) {
			//console.log(data);
			getDataHive(listHives[j+1].id_hive, j+1, listHives[j+1].name, a);
		}
		else {
			var obj_array = [];

			for (idx in hiveGroups[idHiveGroup].hives) {
				   obj_array.push ({'index': (parseInt(idx)+1), 'data': hiveGroups[idHiveGroup].hives[idx]});
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
		    transition(_("paccueil"), (retour==1)?"retour":"");
	        $("#add_hive").click(function() {
	            console.log("ajouter ruche");
	            createHive();
	        });
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
		    		hive = hiveGroups[idHiveGroup].hives[k-1].data;
		    		name = hiveGroups[idHiveGroup].hives[k-1].name;
		    		goToDataHives(name, hive);
		    	});
		    }
		    masquerBd();
		}
	}
	getDataHive(hiveGroups[idHiveGroup].hives[0].id_hive, 0, hiveGroups[idHiveGroup].hives[0].name, a);
};
