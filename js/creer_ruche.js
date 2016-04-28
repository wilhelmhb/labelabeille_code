/*
 * create a new hive (show form and deal with it), then let user add a logger
 */
function createHive() {
    transition(_("pcreate-hive"), "slide");
    if(isTest) {
    	$("#form-create-hive").submit(function(e){
	        e.preventDefault();
            var donnees = $(this).serialize();
            idHive = hiveGroups[idHiveGroup].hives.length; //change idHive
        	updateLocalHive(idHive, donnees); // locally update list hive 
        	console.log(hiveGroups[idHiveGroup].hives[idHive]);
        	//goToAddLogger(); // add if needed a logger to the hive
	        /* TODO : update local state
	        hiveGroups[idHiveGroup].hives[idHive].name = $("#apibundle_pshive_name").val();
	        hiveGroups[idHiveGroup].hives[idHive].note = $("#apibundle_pshive_note").val();
	        hiveGroups[idHiveGroup].hives[idHive].latitude = $("#apibundle_pshive_latitude").val();
	        hiveGroups[idHiveGroup].hives[idHive].longitude = $("#apibundle_pshive_longitude").val();
	        hiveGroups[idHiveGroup].hives[idHive].hive_type = $("#apibundle_pshive_hiveType").val();
	        hiveGroups[idHiveGroup].hives[idHive].bees_type = $("#apibundle_pshive_beesType").val();
	        hiveGroups[idHiveGroup].hives[idHive].material = $("#apibundle_pshive_material").val();
	        hiveGroups[idHiveGroup].hives[idHive].support = $("#apibundle_pshive_support").val();
	        hiveGroups[idHiveGroup].hives[idHive].state = $("#apibundle_pshive_state").val();
	        hiveGroups[idHiveGroup].hives[idHive].harvest = $("#apibundle_pshive_harvest").val();
	        hiveGroups[idHiveGroup].hives[idHive].note= $("#apibundle_pshive_note").val();
	        hiveGroups[idHiveGroup].hives[idHive].notes = $("#apibundle_pshive_notes").val();
	        //console.log(hiveGroups[idHiveGroup].hives[idHive]);
	        goToDataHives(hiveGroups[idHiveGroup].hives[idHive].name, hiveGroups[idHiveGroup].hives[idHive].data,true);*/
	        gotToListHives(idHiveGroup, hiveGroups[idHiveGroup].hives]);
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
                url: url+'pshive',
                xhrFields: {
                    withCredentials: true
                },
                data: donnees,
                success: function(data) {
                	//console.log(data); 
                	customer = data;
                	idHive = hiveGroups[idHiveGroup].hives.length; //change idHive
                	updateLocalHive(idHive, donnees); // locally update list hive 
                	console.log(hiveGroups[idHiveGroup].hives[idHive]);
                	goToAddLogger(); // add if needed a logger to the hive
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //console.log(xhr.responseText);
                }
            });
            /* modification en local */
	        /* TODO : update local state
	        hiveGroups[idHiveGroup].hives[idHive].name = $("#apibundle_pshive_name").val();
	        hiveGroups[idHiveGroup].hives[idHive].note = $("#apibundle_pshive_note").val();
	        hiveGroups[idHiveGroup].hives[idHive].latitude = $("#apibundle_pshive_latitude").val();
	        hiveGroups[idHiveGroup].hives[idHive].longitude = $("#apibundle_pshive_longitude").val();
	        hiveGroups[idHiveGroup].hives[idHive].hive_type = $("#apibundle_pshive_hiveType").val();
	        hiveGroups[idHiveGroup].hives[idHive].bees_type = $("#apibundle_pshive_beesType").val();
	        hiveGroups[idHiveGroup].hives[idHive].material = $("#apibundle_pshive_material").val();
	        hiveGroups[idHiveGroup].hives[idHive].support = $("#apibundle_pshive_support").val();
	        hiveGroups[idHiveGroup].hives[idHive].state = $("#apibundle_pshive_state").val();
	        hiveGroups[idHiveGroup].hives[idHive].harvest = $("#apibundle_pshive_harvest").val();
	        hiveGroups[idHiveGroup].hives[idHive].note= $("#apibundle_pshive_note").val();
	        hiveGroups[idHiveGroup].hives[idHive].notes = $("#apibundle_pshive_notes").val();
	        //console.log(hiveGroups[idHiveGroup].hives[idHive]);*/
            console.log("fin ajout");
        });
    }
}

/*
 * update locally one hive in the list of hives
 * @integer idHive : identifier of the to-update hive in the list
 * @Object donnees : object containing the new hive's data
 */
function updateLocalHive(idHive, donnees) {
    if(idHive >= hiveGroups[idHiveGroup].hives.length) {//new hive
        hiveGroups[idHiveGroup].hives.push(donnees);
    }
    else {//update old one
        hiveGroups[idHiveGroup].hives[idHive] = donnees;
    }
}

/**
 * add a logger to the selected hive
 */
function goToAddLogger() {
    transition(_("padd-logger"));
    $("#form-add-logger").submit(function(e){
        //console.log("début ajout");
        e.preventDefault();
        var donnees = $(this).serialize();
        //console.log(donnees);
        $.ajax({
            type: 'POST',
            url: url+'psbox',
            xhrFields: {
                withCredentials: true
            },
            //TODO : where to find idClient ? version ?
            data: donnees+ '&apibundle_psbox%5BidHive%5D=' + idHive + '&apibundle_psbox%5BidClient%5D=' + idClient + '&apibundle_psbox%5Bversion%5D=&apibundle_psbox%5Bnote%5D=&apibundle_psbox%5Bactive%5D=1&apibundle_psbox%5BdateAdd%5D%5Bdate%5D%5Byear%5D=2011&apibundle_psbox%5BdateAdd%5D%5Bdate%5D%5Bmonth%5D=1&apibundle_psbox%5BdateAdd%5D%5Bdate%5D%5Bday%5D=1&apibundle_psbox%5BdateAdd%5D%5Btime%5D%5Bhour%5D=0&apibundle_psbox%5BdateAdd%5D%5Btime%5D%5Bminute%5D=0&apibundle_psbox%5BdateUpd%5D%5Bdate%5D%5Byear%5D=2011&apibundle_psbox%5BdateUpd%5D%5Bdate%5D%5Bmonth%5D=1&apibundle_psbox%5BdateUpd%5D%5Bdate%5D%5Bday%5D=1&apibundle_psbox%5BdateUpd%5D%5Btime%5D%5Bhour%5D=0&apibundle_psbox%5BdateUpd%5D%5Btime%5D%5Bminute%5D=0',
            success: function(data) {
            	//console.log(data); 
            	customer = data;
            	goToListHive(idHiveGroup, hiveGroups[idHiveGroup].hives);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //console.log(xhr.responseText);
            }
        });
    }
}
