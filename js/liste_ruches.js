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
    
};
