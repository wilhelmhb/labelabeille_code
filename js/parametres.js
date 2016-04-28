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
    	$("#form-params-generaux").submit(function(e){
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
        $("#form-params-generaux").submit(function(e){
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
                    goToListHives(idHiveGroup, hiveGroups[idHiveGroup].hives);
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
function goToHiveParameters() {
	//console.log('goToHiveParameters : begin');
	var template = $(templates).filter('#tpl-params-ruche').html();
	//TODO: get idClient/idCustomer
	console.log(hiveGroups);
	console.log(hiveGroups[idHiveGroup]);
	console.log(idHive);
	console.log(hiveGroups[idHiveGroup].hives);

    var h = Mustache.render(template, hiveGroups[idHiveGroup].hives[idHive]);
    //console.log(h);
    document.getElementById("corps-params-ruche").innerHTML = h;
    //console.log(document.getElementById("corps-params-ruche").innerHTML);
    //console.log('goToHiveParameters : before transition');
    transition(_("pparametres-ruche"), "slide");
    $('#go-to-seuils').click(function() {
        goToHiveSeuils();
    });
    if(isTest) {
    	$("#form-params-hive").submit(function(e){
	        e.preventDefault(); 
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
	        goToDataHives(hiveGroups[idHiveGroup].hives[idHive].name, hiveGroups[idHiveGroup].hives[idHive].data,true);
    	})
    }
    else {
        $("#form-params-hive").submit(function(e){
            //console.log("début modif");
            e.preventDefault();
            var donnees = $(this).serialize();
            //console.log(donnees);
            $.ajax({
                type: 'PATCH',
                url: url+'pshive/'+hiveGroups[idHiveGroup].hives[idHive].id,
                xhrFields: {
                    withCredentials: true
                },
                data: donnees,
                success: function(data) {
                	//console.log(data); 
                	//customer = data;
                	updateLocalHive(donnees);
	                /* go back to details */
	                goToDataHives(hiveGroups[idHiveGroup].hives[idHive].name, hiveGroups[idHiveGroup].hives[idHive].data,true);
                    //console.log("fin modif");
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //console.log(xhr.responseText);
                }
            });
            /* modification en local
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
        console.log(hiveGroups[idHiveGroup].hives[idHive].data);
        seuils[s].v = hiveGroups[idHiveGroup].hives[idHive].data[seuils[s].nom].v;
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
    	$("#form-params-hive-seuils").submit(function(e){
	        e.preventDefault(); 
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
	        goToDataHives(hiveGroups[idHiveGroup].hives[idHive].name, hiveGroups[idHiveGroup].hives[idHive].data,true);
    	})
    }
    else {
        $("#form-params-hive-seuils").submit(function(e){
            //console.log("début modif");
            e.preventDefault();
            var donnees = $(this).serialize();
            //console.log(donnees);
            $.ajax({
                type: 'PATCH',
                url: url+'pshive/'+hiveGroups[idHiveGroup].hives[idHive].id,
                xhrFields: {
                    withCredentials: true
                },
                data: donnees,
                success: function(data) {
                	//console.log(data); 
                	//customer = data;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //console.log(xhr.responseText);
                }
            });
            /* modification en local */
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
	        /* on retourne aux détails */
	        goToDataHives(hiveGroups[idHiveGroup].hives[idHive].name, hiveGroups[idHiveGroup].hives[idHive].data,true);
            //console.log("fin modif");
        });
    }
    //organiserRuches(listHives.ruches.length);
    //masquerBd();
    //console.log('goToHiveParameters : end');
}
