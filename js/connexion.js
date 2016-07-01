var url = 'https://api.label-abeille.org/';
var url2 = 'http://localhost/Symfony2/api_labelabeille_reduite/web/app_dev.php/';
var url_test = 'http://127.0.0.1:8000/'

/**
 * check if device is connected
 */
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    if(networkState == Connection.NONE) {
        alert("Nous n'avons détecté aucune connection Internet. Veuillez vous connecter avant de poursuivre.");
        return false;
    }
    else if (networkState == Connection.UNKNOWN) {
        alert("Votre connection Internet est incertaine. L'opération peut ne pas aboutir.");
    }
    return true;
}

/**
 * connect user
 * @string user : username
 * @string passwd : password of the user
 * @function success : callback on success
 * @function failure : callback on failure 
 */
function connexion(user, passwd, success, failure) {
    enCharge=true;
    _("ch").style.visibility="visible";
    if(isTest) {
        enCharge=false;
        _("ch").style.visibility="hidden";
        customer = test.customer;
        success();
    }
    else {
        $.ajax({
            type: 'POST',
            url: url+'login_check',
            data: '_username='+user+'&_password='+passwd,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                enCharge=false;
                _("ch").style.visibility="hidden";
                console.log(JSON.stringify(data));
                customer = data;
               window.localStorage.setItem("user",user);
               window.localStorage.setItem("login",passwd);
                success();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                _("ch").style.visibility="hidden";
                enCharge=false;
                //console.log('echec');
                //console.log(xhr.responseText);
                //console.log(ajaxOptions);
                failure();
            }
        });
    }
}

var user;
var login;
/**
 * get and deal with connection data
 */
function connect() {
    if (!(window.localStorage.getItem("user") === null)) {
        user=window.localStorage.getItem("user");
        login=window.localStorage.getItem("login");
        connexion(user, login, connexion_success, connexion_failure);
    }
    $("#test").click(tester);
    $("#valider_connexion").click(function(){
        if(!enCharge){
            user = encodeURIComponent($("#email_connexion").val());
            //console.log(user);
            login = encodeURIComponent($("#mdp_connexion").val());
            //console.log(login);
            connexion(user, login, connexion_success, connexion_failure);
        }
    });
    $("#commencer_inscription").click(function() {console.log("début de l'inscription");inscription();});
};

/**
 * when connection fails
 */
function connexion_failure() {
    afficherBd("Erreur de connexion","REESSAYER");
}

/**
 * when connection succeeds,
 * redirect user to the list of his/her hives
 */
function connexion_success() {
    afficherBd("Vous êtes connecté. Vous allez être redirigé vers la liste de vos ruches dans quelques instants. Si ce n'est pas le cas, cliquez sur le bouton ci-dessous.", "Aller");

    //NEW
    charge();
    getCustomNotes(function(data) {
        customNotesCreatedByUser = data;
        getDefaultNotes(function(data) {
            defaultNotes = data;
            getListHiveGroups(function() {
                console.log("récupération des listes de ruches par rucher");
                getHivesForHiveGroups(0);
            });
        });
    });
};

function aux(retour,act) {
    idHiveGroupMaj++;
    getHivesForHiveGroups(retour,act);
};


function charge(){
    enCharge=true;
    _("ch").style.visibility="visible";
}

function finCharge(){
    enCharge=false;
    _("ch").style.visibility="hidden";
}

function logout() {
    window.localStorage.clear();
    charge();
    $.ajax({
        type: 'GET',
        url: url+'logout',
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            //what to do on success
           finCharge();
           connect();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //what to do on failure
           finCharge();
           afficherBd("Un problème est survenu","Fermer");
        }
    });
}

function deleteAccount() {
    charge();
    $.ajax({
        type: 'DELETE',
        url: url+'pscustomer/' + customer.id,
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
           finCharge();
           connect();
            //what to do on success
        },
        error: function (xhr, ajaxOptions, thrownError) {
           finCharge();
            //what to do on failure
           afficherBd("Un problème est survenu","Fermer");

        }
    });
}
