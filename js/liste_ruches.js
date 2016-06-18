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
		    //console.log('récupération des ruches du rucher ' + donneesRuches.hivegroups[idHiveGroupMaj].id_hive_group);
            $.ajax({
                type: 'GET',
                url: url+'pshivegroup/hives/' + donneesRuches.hivegroups[idHiveGroupMaj].id_hive_group,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    //console.log(data.ruches); 
                    //$("#resultat").html(JSON.stringify(data));
                    //console.log("hiveGroups : " + hiveGroups);
				    donneesRuches.hivegroups[idHiveGroupMaj].hives = data.ruches;
                    action(retour);
                },
            });
        }
};
var idHiveMaj=0;
var idHiveGroupMaj=0;
function getDataForHives(action,retour,act) {
    if(idHiveMaj >= donneesRuches.hivegroups[idHiveGroupMaj].hives.length) {
        idHiveMaj = 0;
        //console.log(action);
        action(retour,act);
    }
    else {
        getDataHive(donneesRuches.hivegroups[idHiveGroupMaj].hives[idHiveMaj].id_hive, idHiveMaj, donneesRuches.hivegroups[idHiveGroupMaj].hives[idHiveMaj].name, function() {
                    idHiveMaj++;
                    getDataForHives(action,retour,act);
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
