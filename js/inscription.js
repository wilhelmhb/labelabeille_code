/**
 * registrate a new user
 */
function inscription() {
    transition(_("pinscription"));
    console.log("inscription en cours");
    $("#form-inscription").find(".bouton").click(function(e) {
        e.preventDefault();
        $("#form-inscription").submit();
    });
    $("#form-inscription").submit(function(e) {
        e.preventDefault();
        //console.log("inscription confirmée");
        var donnees = $(this).serialize();
        console.log(donnees);
        $.ajax({
            type: 'POST',
            url: url+'pscustomer/create',
            xhrFields: {
                withCredentials: true
            },
            data: donnees + "&apibundle_pscustomer%5BidShopGroup%5D=1&apibundle_pscustomer%5BidShop%5D=1&apibundle_pscustomer%5BidGender%5D=1&apibundle_pscustomer%5BidDefaultGroup%5D=1&apibundle_pscustomer%5BidLang%5D=1&apibundle_pscustomer%5BidRisk%5D=1&apibundle_pscustomer%5Bcompany%5D=&apibundle_pscustomer%5Bsiret%5D=&apibundle_pscustomer%5Bape%5D=&apibundle_pscustomer%5BlastPasswdGen%5D%5Bdate%5D%5Byear%5D=2011&apibundle_pscustomer%5BlastPasswdGen%5D%5Bdate%5D%5Bmonth%5D=1&apibundle_pscustomer%5BlastPasswdGen%5D%5Bdate%5D%5Bday%5D=1&apibundle_pscustomer%5BlastPasswdGen%5D%5Btime%5D%5Bhour%5D=1&apibundle_pscustomer%5BlastPasswdGen%5D%5Btime%5D%5Bminute%5D=2&apibundle_pscustomer%5Bbirthday%5D%5Byear%5D=&apibundle_pscustomer%5Bbirthday%5D%5Bmonth%5D=&apibundle_pscustomer%5Bbirthday%5D%5Bday%5D=&apibundle_pscustomer%5Bnewsletter%5D=1&apibundle_pscustomer%5BipRegistrationNewsletter%5D=&apibundle_pscustomer%5BnewsletterDateAdd%5D%5Bdate%5D%5Byear%5D=&apibundle_pscustomer%5BnewsletterDateAdd%5D%5Bdate%5D%5Bmonth%5D=&apibundle_pscustomer%5BnewsletterDateAdd%5D%5Bdate%5D%5Bday%5D=&apibundle_pscustomer%5BnewsletterDateAdd%5D%5Btime%5D%5Bhour%5D=&apibundle_pscustomer%5BnewsletterDateAdd%5D%5Btime%5D%5Bminute%5D=&apibundle_pscustomer%5Boptin%5D=1&apibundle_pscustomer%5Bwebsite%5D=&apibundle_pscustomer%5BoutstandingAllowAmount%5D=0&apibundle_pscustomer%5BshowPublicPrices%5D=1&apibundle_pscustomer%5BmaxPaymentDays%5D=0&apibundle_pscustomer%5BsecureKey%5D=test&apibundle_pscustomer%5Bnote%5D=&apibundle_pscustomer%5Bactive%5D=1&apibundle_pscustomer%5BdateAdd%5D%5Bdate%5D%5Byear%5D=2011&apibundle_pscustomer%5BdateAdd%5D%5Bdate%5D%5Bmonth%5D=1&apibundle_pscustomer%5BdateAdd%5D%5Bdate%5D%5Bday%5D=1&apibundle_pscustomer%5BdateAdd%5D%5Btime%5D%5Bhour%5D=0&apibundle_pscustomer%5BdateAdd%5D%5Btime%5D%5Bminute%5D=0&apibundle_pscustomer%5BdateUpd%5D%5Bdate%5D%5Byear%5D=2011&apibundle_pscustomer%5BdateUpd%5D%5Bdate%5D%5Bmonth%5D=1&apibundle_pscustomer%5BdateUpd%5D%5Bdate%5D%5Bday%5D=1&apibundle_pscustomer%5BdateUpd%5D%5Btime%5D%5Bhour%5D=0&apibundle_pscustomer%5BdateUpd%5D%5Btime%5D%5Bminute%5D=0&apibundle_pscustomer%5BhivesNumber%5D=0&apibundle_pscustomer%5BhivesLostNumber%5D=0&apibundle_pscustomer%5Bharvest%5D=4&apibundle_pscustomer%5BstartYear%5D=25&apibundle_pscustomer%5Bdepartament%5D=0&apibundle_pscustomer%5BregistrationNumber%5D=0&apibundle_pscustomer%5Btranshumance%5D=0&apibundle_pscustomer%5Bstructure%5D=0", //additional informations, not asked to the user, but needed on server-side
            success: function(data) {
                console.log(data);
                customer = data;
                inscription_success(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.responseText);
                $("#result").html(xhr.responseText);
            }
        });
    });
};

/**
 * connect the new user and continue registration
 * @Object donnees : Object containing the data or the new user
 */
function inscription_success(donnees) {
    var user = encodeURIComponent($("#apibundle_pscustomer_email").val());
    //console.log(user);
    var login = encodeURIComponent($("#apibundle_pscustomer_password").val());
    //console.log(login);
    connexion(user, login, function() {
        console.log(donnees); 
        customer_inscription_success(donnees);
    }, connexion_failure);
};

/**
 * create a new client (NeoTool) from data donnees
 * @Object donnees : Object containing the data for the new user
 */
function customer_inscription_success(donnees) {
    console.log(donnees);
    donnees["name"] = donnees.firstname + " " + donnees.lastname;
    //create a new client
    $.ajax({
        type: 'POST',
        url: url+'psclient/create',
        xhrFields: {
            withCredentials: true
        },
        data: donnees,
        success: function(data) {
            console.log(data);
            client_inscription_success(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
        }
    });
}

/**
 * bring new user of the list of his/her hives
 */
function client_inscription_success(data) {
    donneesRuches.hivegroups = [];
    getCustomNotes(function(data) {
        customNotesCreatedByUser = data;
        getDefaultNotes(function(data) {
            defaultNotes = data;
            goToListHives(0);
        });
    });
}


