/**
 * get the list of all hiveGroups of a customer
 * @function action : callback, what to do with the data
 */
function getListHiveGroups(action,afficheCharge) {
    if(afficheCharge)charge();
    if(isTest) {
        enCharge=false;
        donneesRuches.hivegroups = test.hivegroups;
        _("ch").style.visibility="hidden";
        action();
    }
    else {
        $.ajax({
               type: 'GET',
               url: url+'pscustomer/hivegroups/me',
               dataType: "json",
               xhrFields: {
               withCredentials: true
               },
               success: function(data) {
               //console.log(data);
               donneesRuches.hivegroups = data;
               //console.log("hiveGroups : " + hiveGroups);
               action();
               },
               });
    }
};

function getHivesForHiveGroups(retour,act) {
    act = (typeof act == 'undefined')? function(){} : act;
    if(idHiveGroupMaj >= donneesRuches.hivegroups.length) {
        idHiveGroupMaj=0;
        finCharge();
        if(retour>=0)goToListHives(retour);
        else act();
    }
    else {
        getListHives(function(a,b) {
                     getDataForHives(aux,retour,act);
                     }, false);
    }
};

/**
 * display the list of hiveGroups
 */
function goToListHiveGroups() {
	//console.log('goToListHiveGroups : begin');
	var template = $(templates).filter('#tpl-list-hive-groups').html();
	/* TODO : inject hiveGroups in template
	reminder : structure of variable hiveGroups
	"hivegroups": [
        {
        "id_hive_group":18,
        "id_client":11,
        "name":"Rucher principal",
        "harvest":20,
        "date_add":"2016-03-08T15:32:09+0100",
        "date_upd":"2016-01-18T14:03:22+0100"
        }
    ]
    */
	var listHiveGroups = null;
    var h = Mustache.render(template, listHiveGroups);
    //console.log(listHiveGroups);
	//console.log(h);
	document.getElementById("content-list-hiveGroups").innerHTML = h;
    /*
    TODO : onclick, goToListHives(idHiveGroupServer, goToListHives), must allow using idHiveGroup from client side (id of selected hiveGroup in the client-side-stored list of all hiveGroups
    */
    transition(_("plist-hiveGroups"));
    /* TODO : remplacer bouton_creer_rucher par le bon identifiant 
    $('#bouton_creer_rucher').click(function() {
        //console.log("ajouter rucher");
        createHiveGroup(addHives);
    });*/
};
