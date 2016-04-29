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
        data: 'apibundle_psdefaultnotecustomer%5Bid_default_note%5D=' + idDefaultNote + '&apibundle_psdefaultnotecustomer%5Bid_hive%5D=' + idHive,
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
    //TODO : decide what to do after successfully having added a default note to a hive
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
        url: url+'psdefaultnotecustomer/hives/' + idHive,
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
