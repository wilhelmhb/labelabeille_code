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
    /*console.log(listHives.idHives.length);
      console.log(JSON.stringify(listHives)); 
      console.log(listHives.idHives[0].name);*/
    var h = Mustache.render(template, customer);
    document.getElementById("corps-params-generaux").innerHTML = h;
    //console.log('goToGeneralParameters : before transition');
    transition(_("pparametres"), "slide");
    //console.log(customer.id);
    if(isTest) {
        $("#form-params-generaux").find(".bouton").click(function(e){$(this).off("click");
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
            goToListHives();
        })
    }
    else {
        $("#form-params-generaux").find(".bouton").click(function(e){$(this).off("click");
            //console.log("début modif");
            e.preventDefault(); 
            var donnees = $(this).serialize();
            //console.log(donnees);
            charge();
            $.ajax({
                type: 'PATCH',
                url: url+'pscustomer/'+customer.id,
                xhrFields: {
                    withCredentials: true
                },
                data: donnees,
                success: function(data) {
                    finCharge();
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

        //DECONNEXION
        $("#deconnexion").on("click",function(e) {
            e.preventDefault();
            logout();
        });


        //DESINSCRIPTION
        $("#desinscription").on("click",function(e) {
            e.preventDefault();

            if(confirm("Êtes-vous certain de vouloir supprimer votre compte ?")){deleteAccount();}

        });

    }
    //organiserRuches(listHives.idHives.length);
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
    var h = Mustache.render(template, donneesRuches.hivegroups[idHiveGroup].hives[idHive]);

    document.getElementById("corps-params-ruche").innerHTML = h;
    $("#sous_titre_pruche").children("h1").html(donneesRuches.hivegroups[idHiveGroup].hives[idHive].name);

    transition(_("pparametres-ruche"), "slide");

    if(isTest) {
        $("#form-params-hive").find(".bouton").click(function(e){$(this).off("click");
            e.preventDefault(); 
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].name = $("#apibundle_pshive_name").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].note = $("#apibundle_pshive_note").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].latitude = $("#apibundle_pshive_latitude").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].longitude = $("#apibundle_pshive_longitude").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].hive_type = $("#apibundle_pshive_hiveType").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].bees_type = $("#apibundle_pshive_beesType").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].material = $("#apibundle_pshive_material").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].support = $("#apibundle_pshive_support").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].state = $("#apibundle_pshive_state").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].harvest = $("#apibundle_pshive_harvest").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].note= $("#apibundle_pshive_note").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].notes = $("#apibundle_pshive_notes").val();
            //console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive]);
            goToDataHive(true);
        })
    }
    else {
        $("#form-params-hive").find(".bouton").click(function(e){
            $("#form-params-hive").submit();
        });
        $("#form-params-hive").submit(function(e){
            //console.log("début modif");
            e.preventDefault();
            var donnees = $(this).serialize();
            //console.log(donnees);
            console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive]);
            $.ajax({
                type: 'PATCH',
                url: url+'pshive/'+donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive + '/update',
                xhrFields: {
                    withCredentials: true
                },
                data: donnees + '&apibundle_pshive%5BidHiveGroup%5D=' + donneesRuches.hivegroups[idHiveGroup].id_hive_group,
                success: function(data) {
                    console.log(data); 
                    //customer = data;
                    updateLocalHive(data);
                    console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive]);
                    /* go back to details */
                    goToDataHives(donneesRuches.hivegroups[idHiveGroup].hives[idHive].name, donneesRuches.hivegroups[idHiveGroup].hives[idHive].data,true);
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


function submitParamsHive(){
    //console.log("début modif");

    var donnees = $("#form-params-hive").serialize();
    //console.log(donnees);
    console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive]);
    charge();
    $.ajax({
        type: 'PATCH',
        url: url+'pshive/'+donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive + '/update',
        xhrFields: {
            withCredentials: true
        },
        data: donnees + '&apibundle_pshive%5BidHiveGroup%5D=' + donneesRuches.hivegroups[idHiveGroup].id_hive_group,
        success: function(data) {
            console.log(data);
            //customer = data;
            updateLocalHive(data);
            console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive]);
            /* go back to details */
            finCharge();
            goToDataHive(true);
            //console.log("fin modif");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //console.log(xhr.responseText);
        }
    });
}

/**
 * display the parameters for the floor and ceiling value (launching the notifications)
 */
function goToHiveSeuils() {
    console.log('goToHiveSeuils : begin');
    var template = $(templates).filter('#tpl-params-ruche-seuils').html();

    for(s=0;s<seuils.length;s++) {
        console.log(seuils[s].nom);
        console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive].data[seuils[s].nom].v);
        seuils[s].v = donneesRuches.hivegroups[idHiveGroup].hives[idHive].data[seuils[s].nom].v;
    }
    var seuilsMustache = { 'seuils': seuils};
    console.log(seuils);
    var h = Mustache.render(template, seuilsMustache);
    //console.log(h);
    document.getElementById("corps-params-ruche-seuils").innerHTML = h;
    //console.log(document.getElementById("corps-params-ruche").innerHTML);
    console.log('goToHiveSeuils : before transition');
    transition(_("pparametres-ruche-seuils"), "slide");
    $("#pparametres-ruche-seuils").find(".sous_titre").find("h1").html("Seuils ("+donneesRuches.hivegroups[idHiveGroup].hives[idHive].name+")");
    if(isTest) {

    }
    else {
        $("#form-params-hive-seuils").find(".bouton").click(function(e){$("#form-params-hive-seuils").submit();$(this).off("click");});
        $("#form-params-hive-seuils").submit(function(e) {
            //console.log("début modif");
            e.preventDefault();
            var donnees = $(this).serialize();
            //console.log(donnees);

            charge();
            $.ajax({
                type: 'PATCH',
                url: url+'pshive/'+donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive + '/update',
                xhrFields: {
                    withCredentials: true
                },
                data: donnees,
                success: function(data) {
                    finCharge();
                    //console.log(data); 
                    //customer = data;
                    console.log("Succes de la modification des seuils");
                    console.log(data);
                    getDataHive(donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive, idHive, donneesRuches.hivegroups[idHiveGroup].hives[idHive].name, function(data) { updateLimitsHive(data); goToDataHive(true);});
                    /* on retourne aux détails */
                    //goToDataHive(true);
                    //console.log("fin modif");
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //console.log(xhr.responseText);
                    finCharge();
                    afficherBd("Une erreur est survenue","OK");
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
        donneesRuches.hivegroups[idHiveGroup].hives[idHive].data[limit] = data[limit];
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
