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

/* non-implémenté côté serveur */
function creer_ruche() {
    //return postJSON('api.label-abeille.org/pshive/post/', 'name='+nom+'&id_box='+box);
}

/* connexion */
function connexion(user, passwd, success, failure) {
        console.log(user);
        console.log(passwd);
        $.ajax({
            type: 'POST',
            url: url+'login_check',
            //url: url+'test/connections',
            data: '_username='+user+'&_password='+passwd,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
            	console.log(data); 
            	//$("#result").html(data+'');
            	success();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('echec');
                console.log(xhr.responseText);
                failure();
                //$("#result").html(xhr.responseText);
            }
        });
}
/* récupération de la liste des ruches */
function getListHives(action) {
        $.ajax({
            type: 'GET',
            url: url+'pscustomer/hives/me',
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                console.log(data); 
                data = data.data;
                //$("#resultat").html(JSON.stringify(data));
                action(data);
            },
        });
}
/* récupération des données d'une ruche */
function getDataHive(id, action) {
        $.ajax({
            type: 'GET',
            url: url+'pscustomer/hives/'+id+'/me',
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
            	console.log(data); 
            	//$("#resultat").html(JSON.stringify(data));
            	action(data);
            }
        });
};
    
var url = 'http://api.label-abeille.org/app.php/';

/* fonction qui récupère et traite les données de connexion */
function connect(action) {
	$("#valider").on(evtclick, function(){
        var user = encodeURIComponent($("#email").val());
        var user2 = $("#username").val();
        //console.log(user);
        var login = encodeURIComponent($("#mdp").val());
        var login2 = $("#password").val();
        //console.log(login);
        connexion(user, login, connexion_success, connexion_failure);
    });
};
function connexion_failure() {
	$("#bd").setAttribute('style', "display: block;");
}
function connexion_success() {
	getListHives(goToListHives);
}
function goToListHives(listHives) {
	var template = $(templates).filter('ruche').html();
	listHives = {"ruches": listHives};
    page = Mustache.render(template, listHives);
    document.getElementById("ruches").innerHTML = page;
    transition("accueil", "slide");
};
function goToDataHives(dataHive) {
	var template = $(templates).filter('donnees_ruche').html();
    page = Mustache.render(template, dataHive);
    document.getElementById("contenu").innerHTML = page;
    transition("details", "fade");
}