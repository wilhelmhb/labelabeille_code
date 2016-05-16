/**
 * create a new hive (show form and deal with it), then let user add a logger
 */
function createHive() {
    console.log("début de la création d'une ruche");
    transition(_("pcreate-hive"), "slide");
    if(isTest) {
    	$("#form-create-hive").submit(function(e){
	        e.preventDefault();
            var donnees = $(this).serialize();
            idHive = hiveGroups[idHiveGroup].hives.length; //change idHive
        	updateLocalHive(donnees); // locally update list hive 
        	console.log(hiveGroups[idHiveGroup].hives[idHive]);
        	//goToAddLogger(); // add if needed a logger to the hive
	        goToListHives(idHiveGroup, hiveGroups[idHiveGroup].hives);
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
                url: url+'pshive/create',
                xhrFields: {
                    withCredentials: true
                },
                data: donnees,
                success: function(data) {
                	console.log(data); 
                	idHive = hiveGroups[idHiveGroup].hives.length; //change idHive
                	console.log(idHive);
                	updateLocalHive(data); // locally update list hive 
                	console.log(hiveGroups[idHiveGroup].hives[idHive]);
                	goToAddLogger(); // add if needed a logger to the hive
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.responseText);
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
    if(idHive >= hiveGroups[idHiveGroup].hives.length) {//new hive
        hiveGroups[idHiveGroup].hives.push(donnees);
    }
    else {//update old one
        for(var field in donnees) {
            hiveGroups[idHiveGroup].hives[idHive][field] = donnees[field];
        }
    }
}

/**
 * add a logger to the selected hive
 */
function goToAddLogger() {
    transition(_("padd-logger"));
    var idClient = hiveGroups[idHiveGroup].id_client;
    console.log(idClient);
    console.log(hiveGroups[idHiveGroup].hives[idHive]);
    $("#form-add-logger").submit(function(e){
        //console.log("début ajout");
        e.preventDefault();
        var donnees = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: url+'psbox/create',
            xhrFields: {
                withCredentials: true
            },
            data: donnees+ '&apibundle_psbox%5BidHive%5D=' + hiveGroups[idHiveGroup].hives[idHive].id_hive + '&apibundle_psbox%5BidClient%5D=' + idClient + '&apibundle_psbox%5Bversion%5D=&apibundle_psbox%5Bnote%5D=&apibundle_psbox%5Bactive%5D=1&apibundle_psbox%5BdateAdd%5D%5Bdate%5D%5Byear%5D=2011&apibundle_psbox%5BdateAdd%5D%5Bdate%5D%5Bmonth%5D=1&apibundle_psbox%5BdateAdd%5D%5Bdate%5D%5Bday%5D=1&apibundle_psbox%5BdateAdd%5D%5Btime%5D%5Bhour%5D=0&apibundle_psbox%5BdateAdd%5D%5Btime%5D%5Bminute%5D=0&apibundle_psbox%5BdateUpd%5D%5Bdate%5D%5Byear%5D=2011&apibundle_psbox%5BdateUpd%5D%5Bdate%5D%5Bmonth%5D=1&apibundle_psbox%5BdateUpd%5D%5Bdate%5D%5Bday%5D=1&apibundle_psbox%5BdateUpd%5D%5Btime%5D%5Bhour%5D=0&apibundle_psbox%5BdateUpd%5D%5Btime%5D%5Bminute%5D=0',
            success: function(data) {
            	console.log(data);
            	goToListHives(idHiveGroup, hiveGroups[idHiveGroup].hives);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.responseText);
            }
        });
    });
}
