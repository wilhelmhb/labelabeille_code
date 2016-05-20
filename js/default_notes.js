/**
 * add a default note to a hive, allow user to use it on his/her hives
 * @integer idDefaultNote: identifier of the note to add
 */
function addDefaultNoteToHive(idDefaultNote) {
    $.ajax({
        type: 'POST',
        url: url+'psdefaultnotecustomer',
        xhrFields: {
            withCredentials: true
        },
        data: 'apibundle_psdefaultnotecustomer%5BidDefaultNote%5D=' + idDefaultNote + '&apibundle_psdefaultnotecustomer%5BidHive%5D=' + hiveGroups[idHiveGroup].hives[idHive].id_hive + '&apibundle_psdefaultnotecustomer%5BidCustomer%5D=' + customer.id,
        success: function(data) {
            console.log(data);
            addDefaultNoteToHiveSuccess();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
        }
    });
}

/**
 * what to do after having successfully added a default note to a hive
 */
function addDefaultNoteToHiveSuccess() {
    goToHistorique();
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
        }
    });
}

/**
 * get all the default notes added to the selected hive
 * @function action : what to do with the collected data
 */
function getDefaultNotesForHive(action) {
    $.ajax({
        type: 'GET',
        url: url+'psdefaultnotecustomer/hives/' + hiveGroups[idHiveGroup].hives[idHive].id_hive,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
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

//TODO : ne pas considérer code 301 comme erreur...
function deleteDefaultNoteForHive(idCustomNote) {
    $.ajax({
        type: 'DELETE',
        url: url+'psdefaultnotecustomer/' + idCustomNote,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            console.log("C'est RAS : " + data);
            deleteDefaultNoteToHiveSuccess();
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
function deleteDefaultNoteToHiveSuccess() {
    goToHistorique();
}
