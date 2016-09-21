/**
 * create a new hive (show form and deal with it), then let user add a logger
 */
function createHive() {
    console.log("début de la création d'une ruche");
    transition(_("pcreate-hive"), "slide");
    $("#sous_titre_create_hive").children("h1").html(donneesRuches.hivegroups[idHiveGroup].name);

    if(isTest) {
    	$("#form-create-hive").find(".bouton").click(function(e){$(this).off("click");
	        e.preventDefault();
            var donnees = $("#form-create-hive").serialize();
            idHive = donneesRuches.hivegroups[idHiveGroup].hives.length; //change idHive
        	updateLocalHive(donnees); // locally update list hive 
        	console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive]);
        	//goToAddLogger(); // add if needed a logger to the hive
	        goToListHives();
    	})
    }
    else {
        $("#form-create-hive").find(".bouton").click(function(e){$(this).off("click");
            var bouton = $(this);        
            //console.log("début ajout");
            e.preventDefault();
            var donnees = $("#form-create-hive").serialize();
            //console.log(donnees);
            charge();
            $.ajax({
                type: 'POST',
                url: url+'pshive/create',
                xhrFields: {
                    withCredentials: true
                },
                data: donnees + '&apibundle_pshive%5BidHiveGroup%5D=' + donneesRuches.hivegroups[idHiveGroup].id_hive_group,
                success: function(data) {
                    $("#form-create-hive")[0].reset();
                    finCharge();
                	console.log(data);
                	idHive = donneesRuches.hivegroups[idHiveGroup].hives.length; //change idHive
                	console.log(idHive);
                	updateLocalHive(data); // locally update list hive 
                	console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive]);
                	console.log(bouton);
                	console.log(bouton[0].id);
                	if(bouton[0].id == "creer_ruche") {
                	    console.log("goToAddLogger");
                    	goToAddLogger(); // add if needed a logger to the hive
                    }
                    else {
                        console.log("no need to add a logguer");
                        getListHiveGroups(function() {
                            console.log("récupération des listes de ruches par rucher");
                            getHivesForHiveGroups(1);
                        });
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                   console.log(xhr.responseText);
                   finCharge();
                   afficherBd("Une erreur est survenue","Fermer");

                }
            });
            console.log("fin ajout");
        });
    }
}

/**
 * update locally one hive in the list of hives
 * @Object donnees : object containing the new hive's data
 */
function updateLocalHive(donnees) {

    if(idHive == donneesRuches.hivegroups[idHiveGroup].hives.length) {//new hive
        donneesRuches.hivegroups[idHiveGroup].hives.push(donnees);
        donneesRuches.hivegroups[idHiveGroup].hives[idHive].indexhg=idHiveGroup+1;
        console.log(donnees);
    }
    else {//update old one
        for(var field in donnees) {
            donneesRuches.hivegroups[idHiveGroup].hives[idHive][field] = donnees[field];
        }
        if(donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive_group != idHiveGroup) {
            var id = donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive_group;
            var idHG;
            for(var hivegroup in donneesRuches.hivegroups) {
                if(donneesRuches.hivegroups[hivegroup].id_hive_group == id) {
                    idHG = hivegroup;
                }
            }
            donneesRuches.hivegroups[idHG].hives.push(donneesRuches.hivegroups[idHiveGroup].hives[idHive]);
            donneesRuches.hivegroups[idHiveGroup].hives.splice(idHive, 1);
            idHive = donneesRuches.hivegroups[idHG].hives.length - 1;
            idHiveGroup = idHG;
        }
    }
}

/**
 * add a logger to the selected hive
 */
function goToAddLogger() {
    transition(_("padd-logger"));
    var idClient = donneesRuches.hivegroups[idHiveGroup].id_client;
    console.log(idClient);
    console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive]);
    $("#sous_titre_addlogger").children("h1").html(donneesRuches.hivegroups[idHiveGroup].hives[idHive].name);
    $("#form-add-logger").find(".bouton").click(function(e){$(this).off("click");
        //console.log("début ajout");
        e.preventDefault();
        var donnees = $("#form-add-logger").serialize();
        charge();
        $.ajax({
            type: 'POST',
            url: url+'psbox/create',
            xhrFields: {
                withCredentials: true
            },
            data: donnees+ '&apibundle_psbox%5BidHive%5D=' + donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive + '&apibundle_psbox%5BidClient%5D=' + idClient + '&apibundle_psbox%5Bversion%5D=test&apibundle_psbox%5Bnote%5D=&apibundle_psbox%5Bactive%5D=1&apibundle_psbox%5BdateAdd%5D%5Bdate%5D%5Byear%5D=2011&apibundle_psbox%5BdateAdd%5D%5Bdate%5D%5Bmonth%5D=1&apibundle_psbox%5BdateAdd%5D%5Bdate%5D%5Bday%5D=1&apibundle_psbox%5BdateAdd%5D%5Btime%5D%5Bhour%5D=0&apibundle_psbox%5BdateAdd%5D%5Btime%5D%5Bminute%5D=0&apibundle_psbox%5BdateUpd%5D%5Bdate%5D%5Byear%5D=2011&apibundle_psbox%5BdateUpd%5D%5Bdate%5D%5Bmonth%5D=1&apibundle_psbox%5BdateUpd%5D%5Bdate%5D%5Bday%5D=1&apibundle_psbox%5BdateUpd%5D%5Btime%5D%5Bhour%5D=0&apibundle_psbox%5BdateUpd%5D%5Btime%5D%5Bminute%5D=0',
            success: function(data) {
            	console.log(data);
               finCharge();
               getListHiveGroups(function() {
                                 console.log("récupération des listes de ruches par rucher");
                                 getHivesForHiveGroups(1);
                                 });
               
            },
            error: function (xhr, ajaxOptions, thrownError) {
               finCharge();
               afficherBd("Une erreur est survenue","Fermer");
                console.log(xhr.responseText);
            }
        });
    });
}

function deleteHive(id,action) {
    charge();
    $.ajax({
        type: 'DELETE',
        url: url+'pshive/' + id,
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        //data: 'idclient=1&idruche=25&nomruche=NomDeMaRuche',
           success: function(data) {action();},
        error: function (xhr, ajaxOptions, thrownError) {
           console.log(xhr.responseText);
           finCharge();
           afficherBd("Une erreur est survenue","Fermer");

           
        }
    });
}

/** 
 * fonction pour modifier un boitier connecté
 * @int idLogger : identifiant du boitier
 * @String serialNumber : numéro de série du boitier ~nom
 * @int idHive : identifiant de la ruche à laquelle l'affecter
 */
function changeLogger(idLogger, serialNumber, idHive) {
    charge();
    $.ajax({
        type: 'PATCH',
        url: url+'psbox/'+ idLogger +'/update',
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        data: "apibundle_psbox%5BserialNumber%5D="+ serialNumber +"&apibundle_psbox%5BidHive%5D=" + idHive,
        success: function(data) {
            console.log(data);
            //what else to do on success
        },
        error: function (xhr, ajaxOptions, thrownError) {
           console.log(xhr.responseText);
           finCharge();
           afficherBd("Une erreur est survenue","Fermer");
        }
    });
}
