/**
 * add a default note to a hive, allow user to use it on his/her hives
 * @integer idDefaultNote: identifier of the note to add
 */
function addDefaultNoteToHive(idDefaultNote) {
    charge();
    $.ajax({
        type: 'POST',
        url: url+'psdefaultnotecustomer',
        xhrFields: {
            withCredentials: true
        },
        data: 'apibundle_psdefaultnotecustomer%5BidDefaultNote%5D=' + idDefaultNote + '&apibundle_psdefaultnotecustomer%5BidHive%5D=' + donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive + '&apibundle_psdefaultnotecustomer%5BidCustomer%5D=' + customer.id,
        success: function(data) {
            console.log(data);
            addDefaultNoteToHiveSuccess();
        },
        error: function (xhr, ajaxOptions, thrownError) {
           console.log(xhr.responseText);
           finCharge();
           afficherBd("Une erreur est survenue","Fermer");
        }
    });
}

/**
 * what to do after having successfully added a default note to a hive
 */
function addDefaultNoteToHiveSuccess() {
    finCharge();
    goToHistorique(donneesRuches.hivegroups[idHiveGroup-1].hives[idHive-1].id_hive,1);
}

/**
 * get all the default notes of the current user
 * @function action : what to do with the collected data
 */
function getDefaultNotes(action) {
    $.ajax({
        type: 'GET',
        url: url+'psdefaultnote/all',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            console.log(data);
            for(var i in data) {
                data[i].level = levels[data[i].level];
            }
            action(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
           console.log(xhr.responseText);
           finCharge();
           afficherBd("Une erreur est survenue","Fermer");
        }
    });
}

/**
 * get all the default notes added to the selected hive
 * @function action : what to do with the collected data
 */
function getDefaultNotesForHive(action, id) {
    $.ajax({
        type: 'GET',
        url: url+'psdefaultnotecustomer/hives/' + id,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            console.log("defaultNotesForHive : " + JSON.stringify(data));
            for(var i in data) {
                var dates = formatDate(data[i].date_add);
                data[i].date_add = dates.add;
                data[i].date_compare = dates.compare;
            }
            action(data, id);
        },
        error: function (xhr, ajaxOptions, thrownError) {
           console.log(xhr.responseText);
           finCharge();
           afficherBd("Une erreur est survenue","Fermer");
        }
    });
}

function deleteDefaultNoteForHive(id,idx) {
    charge();
    $.ajax({
        type: 'DELETE',
        url: url+'psdefaultnotecustomer/' + id,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            console.log("C'est RAS : " + data);
           supprimerNote(idx);

            deleteDefaultNoteToHiveSuccess();
        },
        error: function (xhr, ajaxOptions, thrownError) {
           console.log(xhr.responseText);
           finCharge();
           afficherBd("Une erreur est survenue","Fermer");

        }
    });
}

/**
 * what to do after having successfully deleted a custom note from a hive
 */
function deleteDefaultNoteToHiveSuccess() {
    finCharge();
    goToHistorique(donneesRuches.hivegroups[idHiveGroup-1].hives[idHive-1].id_hive,1);
}
