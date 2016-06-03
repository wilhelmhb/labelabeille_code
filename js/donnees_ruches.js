/**
 * get the data of a hive from server
 * @int id : identifier of the hive on server
 * @int id2 : identifier of hive on client
 * @string name : name of the hive
 * @function action : callback, what to do with the data of the hive
 */
function getDataHive(id, id2, name, action) {
		enCharge=true;
		_("ch").style.visibility="visible";
		//console.log('on prend les données de la ruche '+name+" et id "+id);
		//console.log(action);
		if(isTest) {
			enCharge=false;
			_("ch").style.visibility="hidden";
            for(var k=0; k<test.hivegroups.length; k++){
                var hg=test.hivegroups[k];
                for(var i = 0; i< hg.hives.length; i++) {

                    if(hg.hives[i].id_hive == id) {
                        idHive = i;
                        //console.log(i);
                        dataHive = hg.hives[i].data;
                        dataHive.id_hive_group=hg.hives[i].id_hive_group;
                        dataHive.id_hive_group=hg.hives[i].id_hive_group;
                        dataHive.name_hive_group=hg.name;
                        dataHive.id_hive=id;
                        action(i, name, dataHive);
                    }
                }
            }
		}
		else {
            $.ajax({
                type: 'GET',
                url: url+'pscustomer/hives/'+id+'/me',
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
				    enCharge=false;
				    idHive = id2;
			    	donneesRuches.hivegroups[idHiveGroup].hives[idHive].data = data;
			    	console.log(data);
				    _("ch").style.visibility="hidden";
				    //console.log(id2);
                	//console.log(JSON.stringify(data)); 
				    //console.log(JSON.stringify(data["param.poids_essaim"]));
                	action(id2, name, data);
                }
            });
        }
};




function goToDataHive(r) {
    var template = $(templates).filter('#tpl-details').html();
    console.log("Rucher : " + idHiveGroup);
    console.log("Ruche : " + idHive);
    console.log(donneesRuches);
    var dataHive=donneesRuches.hivegroups[idHiveGroup].hives[idHive];
    console.log(dataHive)
    dataHive.name_hive_group=donneesRuches.hivegroups[idHiveGroup].name;
    dataHive.recolte = dataHive.data["PARAM.POIDS_RECOLTE"];
    dataHive.miel = dataHive.data["PARAM.PROD_MIEL_RUCHE"];
    dataHive.essaim = dataHive.data["PARAM.POIDS_ESSAIM"];
    dataHive.nom = name;
    var h = Mustache.render(template, dataHive);
    document.getElementById("corps").innerHTML = h;
    if(r)retour();
    else transition(_("pdetails"), "");
    //-Paramètres
    _("parametresDetails").addEventListener(evtclick,function(){goToHiveParameters();});
    //-Historique
    _("historiqueDetails").addEventListener(evtclick,function(){goToHistorique();});
    _("ajouter_note_details").addEventListener(evtclick,function(){
                                               ajouterNote();});
    //-Courbes
    _("courbesDetails").addEventListener(evtclick,function(){goToGraphs(dataHive.id_hive);});

}



/**
 * display the details of one hive
 * @string name : name of the hive
 * @Object dataHive : JSON Object containing all hive's details
 * @boolean r : true if we go back to details' page, false if we only go
 */

function goToDataHives(name, dataHive,r) {
	var template = $(templates).filter('#tpl-details').html();
	console.log(dataHive);
	
	dataHive.recolte = dataHive["PARAM.POIDS_RECOLTE"];
	dataHive.miel = dataHive["PARAM.PROD_MIEL_RUCHE"];
	dataHive.essaim = dataHive["PARAM.POIDS_ESSAIM"];
	dataHive.nom = name;
  	var h = Mustache.render(template, dataHive);
  	console.log(dataHive);
    document.getElementById("corps").innerHTML = h;
    if(r)retour();
    else transition(_("pdetails"), "");
	//-Paramètres
	_("parametresDetails").addEventListener(evtclick,goToHiveParameters); 
	//-Historique
	_("historiqueDetails").addEventListener(evtclick,goToHistorique); 
	_("ajouter_note_details").addEventListener(evtclick,function(){
		ajouterNote(dataHive.id_hive_group,dataHive.id_hive);}); 
	//-Courbes
}
