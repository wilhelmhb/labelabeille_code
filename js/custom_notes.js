/**
 * add a new custom note, allow user to use it on his/her hives
 * @Object data: contains the necessary informations to create the note (name, message, level)
 */
function addCustomNote(data) {
    charge();
    $.ajax({
        type: 'POST',
        url: url+'pscustomnote',
        xhrFields: {
            withCredentials: true
        },
        data: data,
        success: function(data) {
            addNoteSuccess();
        },
        error: function (xhr, ajaxOptions, thrownError) {
           //console.log(xhr.responseText);
           finCharge();
           afficherBd("Une erreur est survenue","Fermer");

        }
    });
}

/**
 * what to do after having successfully added a note
 */
function addNoteSuccess() {
    finCharge();
    getCustomNotes(function(data) {
        customNotesCreatedByUser = data;
        ajouterNote();
    });
}

/**
 * add a custom note to a hive, allow user to use it on his/her hives
 * @integer idCustomNote: identifier of the note to add
 */
function addCustomNoteToHive(idCustomNote) {
    //console.log(donneesRuches.hivegroups[idHiveGroup].hives[idHive]);
    charge();
    $.ajax({
        type: 'POST',
        url: url+'pscustomnotecustomer',
        xhrFields: {
            withCredentials: true
        },
        data: 'apibundle_pscustomnotecustomer%5BidCustomNote%5D=' + idCustomNote + '&apibundle_pscustomnotecustomer%5BidHive%5D=' + donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive,
        success: function(data) {
            //console.log("C'est RAS : " + data);
            addCustomNoteToHiveSuccess();
        },
        error: function (xhr, ajaxOptions, thrownError) {
           //console.log(xhr.responseText);
           finCharge();
           afficherBd("Une erreur est survenue","Fermer");
        }
    });
}

/**
 * what to do after having successfully added a custom note to a hive
 */
function addCustomNoteToHiveSuccess() {
    finCharge();
    goToHistorique(donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive,1);
}

/**
 * get all the custom notes of the current user
 * @function action : what to do with the collected data
 */
function getCustomNotes(action,fDefault) {
    $.ajax({
        type: 'GET',
        url: url+'pscustomnote/all',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            //console.log(data);
            for(var i in data) {
                data[i].level = levels[data[i].level];
            }
            action(data,fDefault,-1);
        },
        error: function (xhr, ajaxOptions, thrownError) {
           //console.log(xhr.responseText);
           finCharge();
           afficherBd("Une erreur est survenue","Fermer");
        }
    });
}

/**
 * get all the custom notes added to the selected hive
 * @function action : what to do with the collected data
 */
function getCustomNotesForHive(action, id) {
    $.ajax({
        type: 'GET',
        url: url+'pscustomnotecustomer/hives/' + id,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
           //console.log(data);
            for(var i in data) {
                var dates = formatDate(data[i].date_add);
                data[i].date_add = dates.add;
                data[i].date_compare = dates.compare;
            }
            customNotesSetByUser = data;
            console.log(id);
            action(id);
        },
        error: function (xhr, ajaxOptions, thrownError) {
           //console.log(xhr.responseText);
           finCharge();
           afficherBd("Une erreur est survenue","Fermer");
        }
    });
}

/**
 * what to do after having successfully added a custom note to a hive
 */
function deleteCustomNoteToHiveSuccess() {
    goToHistorique();
}

function deleteCustomNoteForHive(idCustomNote,idx) {
    charge();
    $.ajax({
        type: 'DELETE',
        url: url+'pscustomnotecustomer/' + idCustomNote,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            //console.log("C'est RAS : " + data);
            supprimerNote(idx);
            deleteCustomNoteToHiveSuccess();
        },
        error: function (xhr, ajaxOptions, thrownError) {
           //console.log(xhr.responseText);
           finCharge();
           afficherBd("Une erreur est survenue","Fermer");
        }
    });
}

function deleteCustomNote(idCustomNote) {
    charge();
    $.ajax({
        type: 'DELETE',
        url: url+'pscustomnote/' + idCustomNote,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            //console.log("C'est RAS : " + data);
            //ajouterNote();
            finCharge();
            for(var i = 0 ; i < customNotesCreatedByUser.length ; i++) {
                if(customNotesCreatedByUser[i].id == idCustomNote) {
                    customNotesCreatedByUser.splice(i, 1);
                }
            }
            $("#dlcn"+idCustomNote).remove();
            $("#"+idCustomNote).remove();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //console.log(xhr.responseText);
            finCharge();
            afficherBd("Une erreur est survenue","Fermer");
        }
    });
}


/**
 * what to do after having successfully deleted a custom note from a hive
 */
function deleteCustomNoteToHiveSuccess() {
    finCharge();
}
