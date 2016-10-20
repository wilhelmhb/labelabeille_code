/**
 * get the data of a hive from server
 * @int id : identifier of the hive on server
 * @int id2 : identifier of hive on client
 * @string name : name of the hive
 * @function action : callback, what to do with the data of the hive
 */
function getDataHive(id, id2, name, action) {
        //console.log('on prend les données de la ruche '+name+" et id "+id);
		//console.log(action);
		if(isTest) {
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
                        action(dataHive);
                    }
                }
            }
		}
		else {
            $.ajax({
                type: 'GET',
                url: url+'pshive/mes/'+id,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
				    
				    idHive = id2;
                   console.log(data);
                    if((parseInt(data.ORI.v)<=45)||315<=parseInt(data.ORI.v))data.ORICARD="Nord";
                    if(45<=parseInt(data.ORI.v)&&parseInt(data.ORI.v)<=135)data.ORICARD="Est";
                    if(135<=parseInt(data.ORI.v)&&parseInt(data.ORI.v)<=225)data.ORICARD="Sud";
                    if(225<=parseInt(data.ORI.v)&&parseInt(data.ORI.v)<=315)data.ORICARD="Ouest";
			    	donneesRuches.hivegroups[idHiveGroupMaj].hives[idHiveMaj].data = data;
                   donneesRuches.hivegroups[idHiveGroupMaj].hives[idHiveMaj].data.TRANSMISSION= (donneesRuches.hivegroups[idHiveGroupMaj].hives[idHiveMaj].data.idLogger == null)?"pas de lien":"OK";
			    	console.log(donneesRuches.hivegroups[idHiveGroupMaj].hives[idHiveMaj]);
                   
				    //console.log(id2);
                	//console.log(JSON.stringify(data)); 
				    //console.log(JSON.stringify(data["param.poids_essaim"]));
                	action(data);
                }
            });
        }
};




function goToDataHive(r) {
    var template = $(templates).filter('#tpl-details').html();
    //console.log("Rucher : " + idHiveGroup);
    //console.log("Ruche : " + idHive);
    //console.log(donneesRuches);
    dataHive=donneesRuches.hivegroups[idHiveGroup].hives[idHive];
    //console.log(dataHive)
    dataHive.name_hive_group=donneesRuches.hivegroups[idHiveGroup].name;
    dataHive.recolte = dataHive.data["PARAM.POIDS_RECOLTE"];
    dataHive.miel = dataHive.data["PARAM.PROD_MIEL_RUCHE"];
    dataHive.essaim = dataHive.data["PARAM.POIDS_ESSAIM"];
    dataHive.nom = name;
    var h = Mustache.render(template, dataHive);
    document.getElementById("corps").innerHTML = h;
    if(r)retour();
    else transition(_("pdetails"), "");
    
    
    
}
