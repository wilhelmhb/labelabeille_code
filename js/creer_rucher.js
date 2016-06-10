/**
 * create a new hiveGroup (show form and deal with it), and allow user to add hives in it
 */
function createHiveGroup(action) {
    console.log("début de la création d'un rucher");
    if(isTest) {
    	$("#form-create-hive-group").find(".bouton").click(function(e){
	        e.preventDefault();
            var donnees = $("#form-create-hive-group").serialize();
            idHiveGroup = donneesRuches.hivegroups.length; //change idHiveGroup
        	updateLocalHiveGroup(donnees); // locally update list hiveGroup 
        	console.log(donneesRuches.hivegroups[idHiveGroup]);
	        action();
    	})
    }
    else {
        $("#form-create-hive-group").find(".bouton").click(function(e){
            console.log("début ajout");
            e.preventDefault();
            var donnees = $("#form-create-hive-group").serialize();
            console.log(donnees);
            charge();
            $.ajax({
                type: 'POST',
                url: url+'pshivegroup/create',
                xhrFields: {
                    withCredentials: true
                },
                data: donnees,
                success: function(data) {
                	console.log(data);
                   finCharge();
                	//customer = data;
                	idHiveGroup = donneesRuches.hivegroups.length; //change idHiveGroup
                	updateLocalHiveGroup(donnees); // locally update list hiveGroup
                	console.log(donneesRuches.hivegroups[idHiveGroup]);
                	action();
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
 * update locally one hiveGroup in the list of hiveGroups
 * @Object donnees : object containing the new hive's data
 */
function updateLocalHiveGroup(donnees) {
    if(idHiveGroup >= donneesRuches.hivegroups.length) {//new hive
        donneesRuches.hivegroups.push(donnees);
    }
    else {//update old one
        donneesRuches.hivegroups[idHiveGroup] = donnees;
    }
}

/**
 * add hives to the selected hiveGroup
 */
function addHives() {
    /* TODO : 
        _display the list of all hives of the user : Lucas
        _add checkbox for each one : Lucas
        _add submit button : Lucas
        _on submit, transfer all selected hives to the new hiveGroup : Guillaume
    */
    var template = $(templates).filter('#tpl-add-hives-to-hivegroup').html();
	var listHives = null;
    var h = Mustache.render(template, listHives);
    console.log(listHives);
	//console.log(h);
	document.getElementById("corps-add-hives-to-hivegroup").innerHTML = h;
	$("#form-add-hives-to-hivegroup").find(".bouton").click(function(e){
	    $('input[type=checkbox]:checked').each(function() {
            console.log($(this).id);
            var idHive = $(this).val();
            changeHiveGroup(idHive, idHiveGroup, function() {console.log("ruche ajoutée");});
        })
	});
	getListHiveGroups(goToListHiveGroups);
}

function deleteHiveGroup() {
    $.ajax({
        type: 'DELETE',
        url: url+'pshivegroup/' + donneesRuches.hivegroups[idHiveGroup].id_hive_group,
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        //data: 'idclient=1&idruche=25&nomruche=NomDeMaRuche',
        success: function(data) {console.log(data); $("#resultat").html(JSON.stringify(data));},
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            $("#result").html(xhr.responseText);
        }
    });
}
