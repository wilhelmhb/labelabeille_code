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
        $("#form-params-generaux").find(".bouton").click(function(e){
            //console.log("début modif");
            e.preventDefault(); 
            var donnees = $(this).parent().serialize();
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
                   console.log(xhr.responseText);
                   finCharge();
                   afficherBd("Une erreur est survenue","Fermer");
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
    var h = Mustache.render(template, donneesRuches.hivegroups[idHiveGroup]);
    console.log(h);
    document.getElementById("corps-params-rucher").innerHTML = h;
    //console.log(document.getElementById("corps-params-rucher").innerHTML);
    //console.log('goToHiveGroupParameters : before transition');
    transition(_("pparametres-rucher"), "slide");
    //organiserRuches(listHives.ruches.length);
    $("#supprimer_rucher").on("click",function(e) {
                              e.preventDefault();
                              deleteHiveGroup();
                              });
    if(isTest) {
        $("#form-params-ruchers").find(".bouton").click(function(e){$(this).off("click");
            e.preventDefault(); 
            donneesRuches.hivegroups[idHiveGroup].name = $("#apibundle_pshivegroup_name").val();
            donneesRuches.hivegroups[idHiveGroup].harvest = $("#apibundle_pshivegroup_harvest").val();
            //console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive]);
            goToListHives(1);
        })
    }
    else {
        $("#form-params-ruchers").find(".bouton").click(function(e){
            //console.log("début modif");
            e.preventDefault();
            var donnees = $(this).parent().serialize();
            //console.log(donnees);
            console.log(donneesRuches.hivegroups[idHiveGroup]);
            charge();
            $.ajax({
                type: 'PATCH',
                url: url+'pshivegroup/'+donneesRuches.hivegroups[idHiveGroup].id_hive_group,
                xhrFields: {
                    withCredentials: true
                },
                data: donnees,
                success: function(data) {
                    //console.log(data);
                    //console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive]);
                   finCharge();
                    /* go back to details */
                    donneesRuches.hivegroups[idHiveGroup].name = $("#apibundle_pshivegroup_name").val();
                    donneesRuches.hivegroups[idHiveGroup].harvest = $("#apibundle_pshivegroup_harvest").val();
                    //console.log("fin modif");
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //console.log(xhr.responseText);
                   finCharge();
                   afficherBd("Un erreur est survenue","Fermer");
                }
            });
        });
    }
    //masquerBd();
    //console.log('goToHiveGroupParameters : end');
}

/**
 * display the parameters for the selected hive
 */
function goToHiveParameters() {
    var template = $(templates).filter('#tpl-params-ruche').html();
    // create options for hivegroup selection
    var hivegroups = [];
    for(var hivegroup in donneesRuches.hivegroups) {
        var h = donneesRuches.hivegroups[hivegroup];
        h.isHiveGroup = hivegroup == idHiveGroup;
        hivegroups.push(h);
    }
    //create option for state selection
    var stateP = [];
    //console.log(state);
    for(var i = 0  ; i < state.length ; i++) {
        var s = state[i];
        s.isState = donneesRuches.hivegroups[idHiveGroup].hives[idHive].state == s.v;
        stateP.push(s);
    }
    //create option for beeType selection
    var beeTypeP = [];
    for(var i = 0  ; i < beesType.length ; i++) {
        var s = beesType[i];
        s.isType = donneesRuches.hivegroups[idHiveGroup].hives[idHive].bees_type == s.v;
        beeTypeP.push(s);
    }
    //create option for material selection
    var materialP = [];
    for(var i = 0  ; i < materialType.length ; i++) {
        var s = materialType[i];
        s.isType = donneesRuches.hivegroups[idHiveGroup].hives[idHive].material == s.v;
        materialP.push(s);
    }
    //create option for hive_type selection
    var hiveTypeP = [];
    for(var i = 0  ; i < hiveType.length ; i++) {
        var s = hiveType[i];
        s.isType = donneesRuches.hivegroups[idHiveGroup].hives[idHive].hive_type == s.v;
        hiveTypeP.push(s);
    }
    //create option for support selection
    var supportTypeP = [];
    for(var i = 0  ; i < supportType.length ; i++) {
        var s = supportType[i];
        s.isType = donneesRuches.hivegroups[idHiveGroup].hives[idHive].support == s.v;
        supportTypeP.push(s);
    }
    var donneesHive = { 'hive' : donneesRuches.hivegroups[idHiveGroup].hives[idHive], 'hivegroups' : hivegroups, 'state' : stateP, 'materialType' : materialP, 'hiveType' : hiveTypeP, 'beeType' : beeTypeP, 'supportType' : supportTypeP };
    //console.log(hivegroups);
    console.log(donneesHive);
    var h = Mustache.render(template, donneesHive);

    document.getElementById("corps-params-ruche").innerHTML = h;
    $("#sous_titre_pruche").children("h1").html(donneesRuches.hivegroups[idHiveGroup].hives[idHive].name);

    transition(_("pparametres-ruche"), "slide");

    if(isTest) {
        $("#form-params-hive").find(".bouton").click(function(e){$(this).off("click");
            e.preventDefault(); 
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].name = $("#apibundle_pshive_name").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].note = $("#apibundle_pshive_note").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].latitude = 0;//$("#apibundle_pshive_latitude").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].longitude = 0;//$("#apibundle_pshive_longitude").val();
            donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive_group = $("#apibundle_pshive_hivegroup").val();
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
    

    //organiserRuches(listHives.ruches.length);
    //masquerBd();
    //console.log('goToHiveParameters : end');
}


function submitParamsHive(){
    //console.log("début modif");
    var donnees = $("#form-params-hive").serialize();
    //console.log(donnees);
    var params = donnees.split("&apibundle_pshive%5Bnumero_serie%5D=");
    var num_serie = params[1];
    var data = params[0];
    console.log(num_serie);
    console.log(data);
    
    //console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive]);
    charge();
    $.ajax({
       type: 'PATCH',
       url: url+'pshive/' + donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive + '/update',
       xhrFields: {
       withCredentials: true
       },
       data: data,
       success: function(data) {
           //console.log(data);
           /* modify the box */
           if(donneesRuches.hivegroups[idHiveGroup].hives[idHive].data.idLogger == null) { if(num_serie!=""){
                //create
                //console.log("create");
                $.ajax({
                    type: 'POST',
                    url: url+'psbox/create',
                    xhrFields: {
                        withCredentials: true
                    },
                    data: 'apibundle_psbox%5BserialNumber%5D=' + num_serie + '&apibundle_psbox%5BidHive%5D=' + donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive + '&apibundle_psbox%5BidClient%5D=' + donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_client ,
                    success: function(data) {
                        //console.log(data);
                       donneesRuches.hivegroups[idHiveGroup].hives[idHive].data.idLogger = 0; // (Guillaume) REMPLACER LE 0 PAR LA BONNE VALEUR
                        donneesRuches.hivegroups[idHiveGroup].hives[idHive].data.serialNumber = num_serie;
                        finCharge(); 
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                       //console.log(xhr.responseText);
                       finCharge();
                       afficherBd("Une erreur est survenue","Fermer");
                       
                    }
                    
                });
           }}
           else {
                //console.log("update");
                //update
                changeLogger(donneesRuches.hivegroups[idHiveGroup].hives[idHive].data.idLogger, num_serie, donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive);
                donneesRuches.hivegroups[idHiveGroup].hives[idHive].data.serialNumber = num_serie;
           }
           updateLocalHive(data);
           console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive]);
           /* go back to details */
           finCharge();
           goToDataHive(true);
           //console.log("fin modif");
       }
   });
}

/**
 * display the parameters for the floor and ceiling value (launching the notifications)
 */
function goToHiveSeuils() {
    //console.log('goToHiveSeuils : begin');
    var template = $(templates).filter('#tpl-params-ruche-seuils').html();

    for(s=0;s<seuils.length;s++) {
        //console.log(seuils[s].nom);
        //console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive].data[seuils[s].nom].v);
        seuils[s].v = donneesRuches.hivegroups[idHiveGroup].hives[idHive].data[seuils[s].nom].v;
    }
    var seuilsMustache = { 'seuils': seuils};
    //console.log(seuils);
    var h = Mustache.render(template, seuilsMustache);
    //console.log(h);
    document.getElementById("corps-params-ruche-seuils").innerHTML = h;
    //console.log(document.getElementById("corps-params-ruche").innerHTML);
    //console.log('goToHiveSeuils : before transition');
    transition(_("pparametres-ruche-seuils"), "slide");
    $("#pparametres-ruche-seuils").find(".sous_titre").find("h1").html("Seuils ("+donneesRuches.hivegroups[idHiveGroup].hives[idHive].name+")");
    if(isTest) {

    }
    else {
        $("#form-params-hive-seuils").find(".bouton").click(function(e){$("#form-params-hive-seuils").submit();});
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
                   
                    //console.log(data); 
                    //customer = data;
                    //console.log("Succes de la modification des seuils");
                    //console.log(data);
                   updateLimitsHive();
                   finCharge();
                   //getDataHive(donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive, idHive, donneesRuches.hivegroups[idHiveGroup].hives[idHive].name, function(data) { console.log(data); updateLimitsHive(); goToDataHive(true);finCharge();});
                   
                    /* on retourne aux détails */
                    //goToDataHive(true);
                    //console.log("fin modif");
                },
                error: function (xhr, ajaxOptions, thrownError) {
                   //console.log(xhr.responseText);
                   finCharge();
                   afficherBd("Une erreur est survenue","Fermer");

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
function updateLimitsHive() {
    console.log("Update local des seuils");
    for(s=0;s<seuils.length;s++) {
        donneesRuches.hivegroups[idHiveGroup].hives[idHive].data[seuils[s].nom].v = document.getElementById(seuils[s].nom).value;
    }
    console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive].data);
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
           finCharge();
           afficherBd("Une erreur est survenue","Fermer");

        }
    });
}
