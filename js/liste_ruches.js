/**
 * get the list of all hives
 * @int idHiveGroup : identifier of the hiveGroup
 * @function action : callback, what to do with the data
 */
function getListHives(action,retour) {
		if(isTest) {
            action(retour);
		}
		else {
		    console.log('récupération des ruches du rucher ' + donneesRuches.hivegroups[idHiveGroup].id_hive_group);
		    console.log(hiveGroups[idHiveGroup]);
            charge();
            $.ajax({
                type: 'GET',
                url: url+'pshivegroup/hives/' + donneesRuches.hivegroups[idHiveGroup].id_hive_group,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                   finCharge();
                    console.log(data.ruches); 
                    //$("#resultat").html(JSON.stringify(data));
                    console.log("hiveGroups : " + hiveGroups);
				    donneesRuches.hivegroups[idHiveGroup].hives = data.ruches;
                    action(retour);
                },
            });
        }
};

function getDataForHives(action,retour) {
        if(idHive >= donneesRuches.hivegroups[idHiveGroup].hives.length) {
            idHive = 0;
            console.log(action);
            action(retour);
        }
        else {
            getDataHive(donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive, idHive, donneesRuches.hivegroups[idHiveGroup].hives[idHive].name, function() {
                idHive++;
                getDataForHives(action,retour);
            });
        }
    };

/**
 * display the list of hives
 * @int id : identifier of the hiveGroup
 * @Object listHives : JSON Object containing the list of all hives
 */
function goToListHives(retour) {


    var template = $(templates).filter('#tpl-accueil').html();
	var idx = 1;
	var i = 0;
    for(var l=0;l<donneesRuches.hivegroups.length;l++){
        donneesRuches.hivegroups[l].index=l+1;
        if(donneesRuches.hivegroups[l].hives != null) {
            for(var r=0;r<donneesRuches.hivegroups[l].hives.length;r++){
                donneesRuches.hivegroups[l].hives[r].indexhg=l+1;
                donneesRuches.hivegroups[l].hives[r].index=r+1;
            }
        }
    }
    
    console.log(donneesRuches);
    var h = Mustache.render(template, donneesRuches);
    document.getElementById("content-accueil").innerHTML = h;
    transition(_("paccueil"), (retour==1)?"retour":"");
    
    accueil();
    
    masquerBd();
    
    
	/**
	 * get data of the next hive
	 * if no more hive display all the hives and on click, bring user to the details of the hive
	 * @integer j : index of the hive in the hiveGroup (client-side)
	 * @String name : name of the hive
	 * @Object data : current data got from the box associated to the hive
	 */
    /*
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
	if(hiveGroups[idHiveGroup].hives.length > 0) {
    	getDataHive(hiveGroups[idHiveGroup].hives[0].id_hive, 0, hiveGroups[idHiveGroup].hives[0].name, a);
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
        $("#rucheplus").click(function() {
            console.log("ajouter ruche");
            createHive();
        });
	    //accueil(listHives.ruches.length);
	    masquerBd();
    }*/
};
