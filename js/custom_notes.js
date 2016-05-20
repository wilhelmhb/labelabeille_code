/**
 * add a new custom note, allow user to use it on his/her hives
 * @Object data: contains the necessary informations to create the note (name, message, level)
 */
function addCustomNote(data) {
    $.ajax({
        type: 'POST',
        url: url+'pscustomnote',
        xhrFields: {
            withCredentials: true
        },
        data: data,
        success: function(data) {
            console.log(data);
            addNoteSuccess();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
        }
    });
}

/**
 * what to do after having successfully added a note
 */
function addNoteSuccess() {
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
    console.log(hiveGroups[idHiveGroup].hives[idHive]);
    $.ajax({
        type: 'POST',
        url: url+'pscustomnotecustomer',
        xhrFields: {
            withCredentials: true
        },
        data: 'apibundle_pscustomnotecustomer%5BidCustomNote%5D=' + idCustomNote + '&apibundle_pscustomnotecustomer%5BidHive%5D=' + hiveGroups[idHiveGroup].hives[idHive].id_hive,
        success: function(data) {
            console.log("C'est RAS : " + data);
            addCustomNoteToHiveSuccess();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
        }
    });
}

/**
 * what to do after having successfully added a custom note to a hive
 */
function addCustomNoteToHiveSuccess() {
    goToHistorique();
}

/**
 * get all the custom notes of the current user
 * @function action : what to do with the collected data
 */
function getCustomNotes(action) {
    $.ajax({
        type: 'GET',
        url: url+'pscustomnote/all',
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
        }
    });
}

/**
 * get all the custom notes added to the selected hive
 * @function action : what to do with the collected data
 */
function getCustomNotesForHive(action) {
    $.ajax({
        type: 'GET',
        url: url+'pscustomnotecustomer/hives/' + hiveGroups[idHiveGroup].hives[idHive].id_hive,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            console.log(idHive);
            console.log(hiveGroups[idHiveGroup].hives[idHive].id_hive);
            console.log(data);
            for(var i in data) {
                data[i].date_add = formatDate(data[i].date_add);
            }
            action(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
        }
    });
}

function deleteCustomNote(idCustomNote) {
    $.ajax({
        type: 'DELETE',
        url: url+'pscustomnote/' + idCustomNote,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            console.log(data);
            deleteCustomNoteToHiveSuccess();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
        }
    });
    
}

/**
 * what to do after having successfully added a custom note to a hive
 */
function deleteCustomNoteToHiveSuccess() {
    goToHistorique();
}

//TODO : ne pas considérer code 301 comme erreur...
function deleteCustomNoteForHive(idCustomNote) {
    $.ajax({
        type: 'DELETE',
        url: url+'pscustomnotecustomer/' + idCustomNote,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            console.log("C'est RAS : " + data);
            deleteCustomNoteToHiveSuccess();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            console.log(ajaxOptions);
            console.log(thrownError);
        }
    });
}

/**
 * what to do after having successfully deleted a custom note from a hive
 */
function deleteCustomNoteToHiveSuccess() {
    goToHistorique();
}
