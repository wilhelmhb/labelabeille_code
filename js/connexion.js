var url = 'https://api.label-abeille.org/';
var url_test = 'http://localhost/Symfony2/api_labelabeille_reduite/web/app_dev.php/';

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

/* connexion */
function connexion(user, passwd, success, failure) {
        //console.log(user);
        //console.log(passwd);
		enCharge=true;
		//$.support.cors = true;
		//$.mobile.allowCrossDomainPages = true;
		_("ch").style.visibility="visible";
		/*request = new XMLHttpRequest();
		request.open("GET", url+'login.html', true);
		
		request.onreadystatechange = function() {
			  console.log("** state = " + request.readyState);
			  if (request.readyState == 4) {
			      console.log("** status = " + request.status);
			      console.log(request.responseText);
			  }
		};

		request.send();*/
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
                //url: url+'test/connections',
                data: '_username='+user+'&_password='+passwd,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
				    enCharge=false;
				    _("ch").style.visibility="hidden";
                	console.log(JSON.stringify(data)); 
                	//$("#result").html(data+'');
                	customer = data;
                	success();
                },
                error: function (xhr, ajaxOptions, thrownError) {
				    _("ch").style.visibility="hidden";
				    enCharge=false;
                    //console.log('echec');
                    //console.log(xhr.responseText);
                    //console.log(ajaxOptions);
                    failure();
                    //$("#result").html(xhr.responseText);
                }
            });
        }
}
/* fonction qui récupère et traite les données de connexion */
function connect() {
	$("#test").click(tester);
	$("#valider_connexion").on(evtclick, function(){
		if(!enCharge){
        	var user = encodeURIComponent($("#email_connexion").val());
        	//console.log(user);
        	var login = encodeURIComponent($("#mdp_connexion").val());
        	//console.log(login);
        	connexion(user, login, connexion_success, connexion_failure);
		}
    });
};
function connexion_failure() {
	afficherBd("Erreur de connexion","REESSAYER");
}
function connexion_success() {
	afficherBd("Vous êtes connecté. Vous allez être redirigé vers la liste de vos ruches dans quelques instants. Si ce n'est pas le cas, cliquez sur le bouton ci-dessous.", "Aller à la liste des ruches");
	getListHives(0, goToListHives);
	_("btBd").addEventListener(evtclick, function (){
		getListHives(0, goToListHives);
	});
}
