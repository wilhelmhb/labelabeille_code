/* récupération des données d'une ruche */
function getDataHive(id, id2, name, action) {
		enCharge=true;
		//$.support.cors = true;
		//$.mobile.allowCrossDomainPages = true;
		_("ch").style.visibility="visible";
		//console.log('on prend les données de la ruche '+name+" et id "+id);
		//console.log(action);
		if(isTest) {
			enCharge=false;
			_("ch").style.visibility="hidden";
			for(var i = 0; i< test.hives.length; i++) {
				//console.log(test.hives[i].id_hive);
			    if(test.hives[i].id_hive == id) {
				    idHive = i;
				    //console.log(i);
			    	dataHive = test.hives[i].data;
			        action(i, name, test.hives[i].data);
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
			    	dataHive = data;
				    _("ch").style.visibility="hidden";
				    //console.log(id2);
                	//console.log(JSON.stringify(data)); 
				    //console.log(JSON.stringify(data["param.poids_essaim"])); 
                	//$("#resultat").html(JSON.stringify(data));
                	action(id2, name, data);
                }
            });
        }
};

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
	//-Courbes
}


