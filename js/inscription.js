function inscription() {
    transition(_("pinscription"));
    console.log("inscription en cours");
    $("#form-inscription").submit(function(e){
        e.preventDefault();
        alert("inscription confirmée");
        var donnees = $(this).serialize();
        console.log(donnees);
        $.ajax({
            type: 'POST',
            url: url+'pscustomer',
            xhrFields: {
                withCredentials: true
            },
            data: donnees,
            success: function(data) {
                console.log(data);
                customer = data;
                //inscription_success(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.responseText);
                $("#result").html(xhr.responseText);
            }
        });
    });
};

function inscription_success(donnees) {
    var user = encodeURIComponent($("#email_inscription").val());
    //console.log(user);
    var login = encodeURIComponent($("#mdp_inscription").val());
    //console.log(login);
    connexion(user, login, function() {console.log(donnees);/*customer_inscription_success(donnees);*/}, connexion_failure);
};

function customer_inscription_success(donnees) {
    //create a new client
    $.ajax({
        type: 'POST',
        url: url+'psclient/',
        xhrFields: {
            withCredentials: true
        },
        data: donnees,
        success: function(data) {
            console.log(data);
            customer = data;
            client_inscription_success(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            $("#result").html(xhr.responseText);
        }
    });
}

function client_inscription_success() {
    getListHives(0, goToListHives);
}


