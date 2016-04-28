/**
 * get the list of all hives from a hiveGroup
 * @int idHiveGroup : identifier of the hiveGroup
 * @function action : callback, what to do with the data
 */
function getListHives(idHiveGroup, action) {
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
                    console.log("hiveGroups : " + hiveGroups);
				    hiveGroups[idHiveGroup].hives = data;
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
function goToListHives(idHiveGroup, listHives) {
	//console.log('goToListHives : begin');
	var template = $(templates).filter('#tpl-accueil').html();
	var idx = 1;
	hiveGroups[idHiveGroup].hives = listHives;
	var i = 0;
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
		    		hive = hiveGroups[idHiveGroup].hives[k-1].data;
		    		name = hiveGroups[idHiveGroup].hives[k-1].name;
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
