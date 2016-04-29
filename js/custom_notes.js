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
        data: donnees,
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
    //TODO : decide what to do after successfully having added a note
}

/**
 * add a custom note to a hive, allow user to use it on his/her hives
 * @integer idCustomNote: identifier of the note to add
 */
function addCustomNoteToHive(idCustomNote) {
    $.ajax({
        type: 'POST',
        url: url+'pscustomnotecustomer',
        xhrFields: {
            withCredentials: true
        },
        data: 'apibundle_pscustomnotecustomer%5Bid_custom_note%5D=' + idCustomNote + '&apibundle_pscustomnotecustomer%5Bid_hive%5D=' + idHive,
        success: function(data) {
            console.log(data);
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
    //TODO : decide what to do after successfully having added a custom note to a hive
}

/**
 * get all the custom notes of the current user
 * @function action : what to do with the collected data
 */
function getCustomNotes(action) {
    $.ajax({
        type: 'GET',
        url: url+'pscustomnote',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            console.log(data);
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
        url: url+'pscustomnotecustomer/hives/' + idHive,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            console.log(data);
            action(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
        }
    });
}
