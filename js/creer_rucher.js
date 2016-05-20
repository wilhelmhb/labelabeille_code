/**
 * create a new hiveGroup (show form and deal with it), and allow user to add hives in it
 */
function createHiveGroup(action) {
    console.log("début de la création d'un rucher");
    transition(_("pcreate-hive-group"), "slide");
    if(isTest) {
    	$("#form-create-hive-group").submit(function(e){
	        e.preventDefault();
            var donnees = $(this).serialize();
            idHiveGroup = hiveGroups.length; //change idHiveGroup
        	updateLocalHiveGroup(donnees); // locally update list hiveGroup 
        	console.log(hiveGroups[idHiveGroup]);
	        action();
    	})
    }
    else {
        $("#form-create-hive-group").submit(function(e){
            console.log("début ajout");
            e.preventDefault();
            var donnees = $(this).serialize();
            console.log(donnees);
            $.ajax({
                type: 'POST',
                url: url+'pshivegroup/create',
                xhrFields: {
                    withCredentials: true
                },
                data: donnees,
                success: function(data) {
                	console.log(data); 
                	//customer = data;
                	idHiveGroup = hiveGroups.length; //change idHiveGroup
                	updateLocalHiveGroup(donnees); // locally update list hiveGroup
                	console.log(hiveGroups[idHiveGroup]);
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
    if(idHiveGroup >= hiveGroups.length) {//new hive
        hiveGroups.push(donnees);
    }
    else {//update old one
        hiveGroups[idHiveGroup] = donnees;
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
	$("#form-add-hives-to-hivegroup").submit(function(e){
	    $('input[type=checkbox]:checked').each(function() {
            console.log($(this).id);
            var idHive = $(this).val();
            changeHiveGroup(idHive, idHiveGroup, function() {console.log("ruche ajoutée");});
        })
	});
	getListHiveGroups(goToListHiveGroups);
}
