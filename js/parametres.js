/**
 * display the parameters for selected hive
 */
function parametresRuche(){
    transition(_("pparametres"),"");
}

/**
 * display the parameters of the user's account
 */
function goToGeneralParameters() {
	//console.log('goToGeneralParameters : begin');
	var template = $(templates).filter('#tpl-params-generaux').html();
	/*console.log(listHives.ruches.length);
	console.log(JSON.stringify(listHives)); 
	console.log(listHives.ruches[0].name);*/
    var h = Mustache.render(template, customer);
    document.getElementById("corps-params-generaux").innerHTML = h;
    //console.log('goToGeneralParameters : before transition');
    transition(_("pparametres"), "slide");
    //console.log(customer.id);
    if(isTest) {
    	$("#form-params-generaux").find(".bouton").click(function(e){
	        e.preventDefault(); 
	        var firstname = $("#apibundle_pscustomer_firstname").val();
	        var lastname = $("#apibundle_pscustomer_lastname").val();
	        var email = $("#apibundle_pscustomer_email").val();
	        var password = $("#apibundle_pscustomer_password").val();
	        var donnees = {"id": customer.id, "firstname": firstname, "lastname": lastname, "email": email, "password": password};
	        //console.log(donnees);
	        customer = donnees;
	        test.customer = customer;
	        //console.log(test.customer);
            goToListHives(idHiveGroup, hiveGroups[idHiveGroup].hives);
    	})
    }
    else {
        $("#form-params-generaux").find(".bouton").click(function(e){
            //console.log("début modif");
            e.preventDefault(); 
            var donnees = $(this).serialize();
            //console.log(donnees);
            $.ajax({
                type: 'PATCH',
                url: url+'pscustomer/'+customer.id,
                xhrFields: {
                    withCredentials: true
                },
                data: donnees,
                success: function(data) {
                	//console.log(data); 
                	customer = data;
                    customer.firstname = $("#apibundle_pscustomer_firstname").val();
                    customer.lastname = $("#apibundle_pscustomer_lastname").val();
                    customer.email = $("#apibundle_pscustomer_email").val();
                    customer.password = $("#apibundle_pscustomer_password").val();
                    getListHives(goToListHives);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //console.log(xhr.responseText);
                }
            });
            //console.log("fin modif");
        });
    }
    //organiserRuches(listHives.ruches.length);
    //masquerBd();
    //console.log('goToGeneralParameters : end');
}

/**
 * display the parameters for the selected hivegroup
 */
function goToHiveGroupParameters() {
	//console.log('goToHiveGroupParameters : begin');
	var template = $(templates).filter('#tpl-params-rucher').html();
	//console.log(listHives.ruches.length);
	//console.log(JSON.stringify(listHives)); 
	//console.log(listHives.ruches[0].name);
    var h = Mustache.render(template, hiveGroups[idHiveGroup]);
    //console.log(h);
    document.getElementById("corps-params-rucher").innerHTML = h;
    //console.log(document.getElementById("corps-params-rucher").innerHTML);
    //console.log('goToHiveGroupParameters : before transition');
    transition(_("pparametres-rucher"), "slide");
    //organiserRuches(listHives.ruches.length);
    //masquerBd();
    //console.log('goToHiveGroupParameters : end');
}

/**
 * display the parameters for the selected hive
 */
function goToHiveParameters(rucher,ruche) {
	//console.log('goToHiveParameters : begin');
	var template = $(templates).filter('#tpl-params-ruche').html();
    var h = Mustache.render(template, donneesRuches.hiveGroups[rucher].hives[ruche]);

    document.getElementById("corps-params-ruche").innerHTML = h;
    $("#sous_titre_pruche").children("h1").html(donneesRuches.hiveGroups[rucher].hives[ruche].name);

    transition(_("pparametres-ruche"), "slide");
    
    if(isTest) {
    	$("#form-params-hive").find(".bouton").click(function(e){
	        e.preventDefault(); 
	        donneesRuches.hiveGroups[rucher].hives[ruche].name = $("#apibundle_pshive_name").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].note = $("#apibundle_pshive_note").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].latitude = $("#apibundle_pshive_latitude").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].longitude = $("#apibundle_pshive_longitude").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].hive_type = $("#apibundle_pshive_hiveType").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].bees_type = $("#apibundle_pshive_beesType").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].material = $("#apibundle_pshive_material").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].support = $("#apibundle_pshive_support").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].state = $("#apibundle_pshive_state").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].harvest = $("#apibundle_pshive_harvest").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].note= $("#apibundle_pshive_note").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].notes = $("#apibundle_pshive_notes").val();
	        //console.log(donneesRuches.hiveGroups[rucher].hives[ruche]);
                                      goToDataHive(rucher,ruche,true);
    	})
    }
    else {
        $("#form-params-hive").find(".bouton").click(function(e){
            //console.log("début modif");
            e.preventDefault();
            var donnees = $(this).serialize();
            //console.log(donnees);
            console.log(donneesRuches.hiveGroups[rucher].hives[ruche]);
            $.ajax({
                type: 'PATCH',
                url: url+'pshive/'+donneesRuches.hiveGroups[rucher].hives[ruche].id_hive + '/update',
                xhrFields: {
                    withCredentials: true
                },
                data: donnees,
                success: function(data) {
                	console.log(data); 
                	//customer = data;
                	updateLocalHive(data);
                	console.log(donneesRuches.hiveGroups[rucher].hives[ruche]);
	                /* go back to details */
	                goToDataHives(donneesRuches.hiveGroups[rucher].hives[ruche].name, donneesRuches.hiveGroups[rucher].hives[ruche].data,true);
                    //console.log("fin modif");
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //console.log(xhr.responseText);
                }
            });
        });
    }
    //organiserRuches(listHives.ruches.length);
    //masquerBd();
    //console.log('goToHiveParameters : end');
}

/**
 * display the parameters for the floor and ceiling value (launching the notifications)
 */
function goToHiveSeuils() {
	console.log('goToHiveSeuils : begin');
	var template = $(templates).filter('#tpl-params-ruche-seuils').html();
	//TODO: get idClient/idCustomer
	console.log(hiveGroups);
	console.log(hiveGroups[idHiveGroup]);
	console.log(idHive);
	console.log(hiveGroups[idHiveGroup].hives);
	var seuils = [
	    /*{
	        'nom': "PARAM.SEUIL_ACC_X_MAX",
	        'description': "Seuil Accéléromètre X maximum pour alerte"
	    },
	    {
            'nom': "PARAM.SEUIL_ACC_X_MIN",
            'description': "Seuil Accéléromètre X minimum pour alerte"
        },
        {
            'nom': "PARAM.SEUIL_ACC_Y_MAX",
            'description': "Seuil Accéléromètre Y maximum pour alerte"
        },
        {
            'nom': "PARAM.SEUIL_ACC_Y_MIN",
            'description': "Seuil Accéléromètre Y minimum pour alerte"
        },
        {
            'nom': "PARAM.SEUIL_ACC_Z_MAX",
            'description': "Seuil Accéléromètre Z maximum pour alerte"
        },
        {
            'nom': "PARAM.SEUIL_ACC_Z_MIN",
            'description': "Seuil Accéléromètre Z minimum pour alerte"
        },*/
        {
            'nom': "PARAM.SEUIL_BAISSE_POIDS",
            'description': "Baisse de poids maximale avant alerte"
        },
        /*{
            'nom': "PARAM.SEUIL_BAISSE_POIDS_DUREE",
            'description': "Nombre d'heure pour constater la baisse de poids"
        },*/
        {
            'nom': "PARAM.SEUIL_HUMIDITE_MAX",
            'description': "Humidité maximale avant alerte"
        },
        {
            'nom': "PARAM.SEUIL_HUMIDITE_MIN",
            'description': "Humidité minimale avant alerte"
        },
        {
            'nom': "PARAM.SEUIL_TEMP_MAX",
            'description': "Température maximale avant alerte"
        },
        {
            'nom': "PARAM.SEUIL_TEMP_MIN",
            'description': "Température minimale avant alerte"
        }
    ];
    console.log(seuils);
    for(var s in seuils) {
        console.log(s)
        console.log(seuils[s].nom);
        console.log(donneesRuches.hiveGroups[rucher].hives[ruche].data);
        seuils[s].v = donneesRuches.hiveGroups[rucher].hives[ruche].data[seuils[s].nom].v;
    }
    seuils = { 'seuils': seuils};
    console.log(seuils);
    var h = Mustache.render(template, seuils);
    //console.log(h);
    document.getElementById("corps-params-ruche-seuils").innerHTML = h;
    //console.log(document.getElementById("corps-params-ruche").innerHTML);
    console.log('goToHiveParameters : before transition');
    transition(_("pparametres-ruche-seuils"), "slide");
    if(isTest) {
    	$("#form-params-hive-seuils").find(".bouton").click(function(e){
	        e.preventDefault(); 
	        donneesRuches.hiveGroups[rucher].hives[ruche].name = $("#apibundle_pshive_name").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].note = $("#apibundle_pshive_note").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].latitude = $("#apibundle_pshive_latitude").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].longitude = $("#apibundle_pshive_longitude").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].hive_type = $("#apibundle_pshive_hiveType").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].bees_type = $("#apibundle_pshive_beesType").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].material = $("#apibundle_pshive_material").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].support = $("#apibundle_pshive_support").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].state = $("#apibundle_pshive_state").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].harvest = $("#apibundle_pshive_harvest").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].note= $("#apibundle_pshive_note").val();
	        donneesRuches.hiveGroups[rucher].hives[ruche].notes = $("#apibundle_pshive_notes").val();
	        //console.log(donneesRuches.hiveGroups[rucher].hives[ruche]);
	        goToDataHives(donneesRuches.hiveGroups[rucher].hives[ruche].name, donneesRuches.hiveGroups[rucher].hives[ruche].data,true);
    	})
    }
    else {
        $("#form-params-hive-seuils").find(".bouton").click(function(e){
            //console.log("début modif");
            e.preventDefault();
            var donnees = $(this).serialize();
            //console.log(donnees);
            $.ajax({
                type: 'PATCH',
                url: url+'pshive/'+donneesRuches.hiveGroups[rucher].hives[ruche].id,
                xhrFields: {
                    withCredentials: true
                },
                data: donnees,
                success: function(data) {
                	//console.log(data); 
                	//customer = data;
                	updateLimitsHive(data);
	                /* on retourne aux détails */
	                goToDataHives(donneesRuches.hiveGroups[rucher].hives[ruche].name, donneesRuches.hiveGroups[rucher].hives[ruche].data,true);
                    //console.log("fin modif");
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //console.log(xhr.responseText);
                }
            });
        });
    }
    //organiserRuches(listHives.ruches.length);
    //masquerBd();
    //console.log('goToHiveParameters : end');
}

/**
 * update the values of the limits for launching a notification
 * @Object data : contains list of the new limits
 */
function updateLimitsHive(data) {
    for(var limit in data) {
        donneesRuches.hiveGroups[rucher].hives[ruche].data[limit] = data[limit];
    }
}

/**
 * change the hiveGroup of one hive
 * @integer idHive : identifier of the hive on server side
 * @integer idHiveGroup : identifier of the new hiveGroup on client side
 * @function action : callback, what to do on success
 */
function changeHiveGroup(idHive, idHiveGroup, action) {
    var donnees = 'apibundle_pshive%5BidHiveGroup%5D=' + hiveGroups[idHiveGroup].id;
    $.ajax({
        type: 'PATCH',
        url: url+'pshive/'+idHive,
        xhrFields: {
            withCredentials: true
        },
        data: donnees,
        success: function(data) {
        	//console.log(data); 
        	//customer = data;
        	/* local storage for the hives should be updated in action */
        	action();
            //console.log("fin modif");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //console.log(xhr.responseText);
        }
    });
}
