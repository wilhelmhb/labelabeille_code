function _(el) {
	return document.getElementById(el);
}

if(window.addEventListener){
    window.addEventListener('load', debut, false);
}else{
    window.attachEvent('onload', debut);
}
var checkb=new Array();
var c=0;
var tr;
var time;
var page;
var page2;
var templates;
var enCharge=false;
var pagePrec=new Array();
var rucheSelect;
var tcharge;
var pcharge;
var templateCharge=false;
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
	StatusBar.overlaysWebView(false);
}
function debut(){
	dessinCercleFLAT(_("canvasProgressSimple"),0);
    new FastClick(document.body);
	page=_("pchargement");
 	masquerBd();
	_("btReglages").addEventListener("touchend",function(){transition(_("pparametres"),"");}); 
	_("btReglages").addEventListener("touchleave",function(){transition(_("pparametres"),"");}); 
	var btsRetour = document.getElementsByClassName('retour');
	for(var i=0, l=btsRetour.length; i<l; i++){
	 btsRetour[i].addEventListener("touchend",function(){retour();}); 
	}
	_("btBd").addEventListener(evtclick,masquerBd);
	tcharge = setInterval(charger,20);
 	pcharge=0;
	 $.get('templates.html', function(t) {
		 templates=t;
		 templateCharge=true;
	 },'html');
	 //_("check1").addEventListener(evtclick, function(){check(1);});
	 //checkb[1]=true;
}
function charger(){
 if(pcharge<100)pcharge++;
 dessinCercleFLAT(_("canvasProgressSimple"),pcharge);
 if(pcharge==100&&templateCharge){
	 transition(_("pconnexion"),"fade");
	 clearInterval(tcharge);
	 connect();
 }
}
function organiserRuches(nbRuches){
	h=_("ruche1").offsetHeight;
	w=_("ruche1").offsetWidth;
	console.log(h+","+w);
	for(i=2; i<=nbRuches; i++){
		_("ruche"+i).style.top=h*(0.76*(i-1))+'px';
		_("ruche"+i).style.left=w*(0.5*((i%2==0)?1:0))+'px';
	}
	for(i=1; i<=nbRuches; i++){
		_("ruche"+i).addEventListener(evtclick,function(){
			if(!enCharge){
				var k = this.getElementsByTagName("h2")[0].textContent;
				console.log(k);
				k = k.substring(1, k.length-1);
				console.log(k);
				rucheSelect=k;
				getDataHive(k,goToDataHives);
			}			
		});
		
	}
	
}
function parametresRuche(){
	transition(_("pparametres"),"");
}
function check(n){
	if(checkb[n]){
		_("check"+n).src="img/off.png";
		checkb[n]=false;
	}
	else {
		 _("check"+n).src="img/on.png";	
		 checkb[n]=true;
	 }
}

function masquerBd() {
	_("bd").style.visibility="hidden";	
}
function afficherBd(mes,bt) {
	_("bd").style.visibility="visible";	
	_("messBd").innerHTML=mes;
	_("btBd_txt").innerHTML=bt;
}

function retour(){transition(null,"slideright");}
function transition(p2,mode,p1){
	var sousNav=false;
	var pOrigin;
	if(typeof p1 != 'undefined'){pOrigin=page;sousNav=true;page=p1;}
	if(c==0){
		if(!sousNav&&p2==null)page2=pagePrec.pop();
		else page2=p2;
		page2.style.display="block";
		if(mode=="fade"){
			page2.style.filter = 'alpha(opacity = 0)';
			page2.style.opacity = 0;
		}
		else if(mode=="slideright"){
			//page2.style.right="100%";	
			page2.style.transform="translateX(-100%)";	
			
		}
		else {
			//page2.style.right="-100%";
			page2.style.transform="translateX(100%)";	
		}
		time = new Date().getTime();
		tr = setInterval(function(){animerTransition(mode,(p2==null),sousNav,pOrigin)}, 1);
	}
}
function animerTransition(mode,retour,sousNav,pOrigin) {
	var t;
	if(mode=="fade")t=1000;
	else t=400;
	c=	(new Date().getTime() - time)/t*100;
	if(c<=100){
		if(mode=="fade"){
			page.style.filter = 'alpha(opacity = '+(100-c)/100+')';
			page.style.opacity = (100-c)/100;
			page2.style.filter = 'alpha(opacity = '+c/100+')';
			page2.style.opacity = c/100;
		}
		else if(mode=="slideright"){
			//page.style.right=(-c)+"%";
			//page2.style.right=(100-c)+"%";
			page.style.transform="translateX("+c+"%)";
			page2.style.transform="translateX("+(-100+c)+"%)";
		}
		else //PAR DEFAUT, SLIDE DE DROITE A GAUCHE
		{
			//page.style.right=c+"%";
			//page2.style.right=(-100+c)+"%";
			page.style.transform="translateX(-"+c+"%)";
			page2.style.transform="translateX("+(100-c)+"%)";
		}
		c++;
	}else{
		if(mode=="fade"){
			page.style.filter = 'alpha(opacity = 0)';
			page.style.opacity = 0;
			page2.style.filter = 'alpha(opacity = 1)';
			page2.style.opacity = 1;
		}
		else if(mode=="slideright"){
			//page.style.right="-100%";
			//page2.style.right="0";
			page.style.transform="translateX(100%)";
			page2.style.transform="translateX(0)";
		}
		else {
			//page.style.right="100%";
			//page2.style.right="0";
			page.style.transform="translateX(-100%)";
			page2.style.transform="translateX(0)";
		}
		page.style.display="none";
		if(!sousNav&&!retour)pagePrec.push(page);
		if(!sousNav)page=page2;
		if(sousNav)page=pOrigin;
		clearInterval(tr);
		c=0;
	}
}

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
		enCharge=true;
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
            	console.log(data); 
            	//$("#result").html(data+'');
            	connexion_success();
            },
            error: function (xhr, ajaxOptions, thrownError) {
				enCharge=false;
                console.log('echec');
                console.log(xhr.responseText);
                connexion_failure();
                //$("#result").html(xhr.responseText);
            }
        });
}
/* récupération de la liste des ruches */
function getListHives(action) {
		enCharge=true;
        $.ajax({
            type: 'GET',
            url: url+'pscustomer/hives/me',
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
				enCharge=false;
                console.log(JSON.stringify(data)); 
                //$("#resultat").html(JSON.stringify(data));
                action(data);
            },
        });
}
/* récupération des données d'une ruche */
function getDataHive(id, action) {
		enCharge=true;
        $.ajax({
            type: 'GET',
            url: url+'pscustomer/hives/'+id+'/me',
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
				enCharge=false;
				console.log(id);
            	//console.log(JSON.stringify(data)); 
				console.log(JSON.stringify(data["param.poids_essaim"])); 
            	//$("#resultat").html(JSON.stringify(data));
            	action(data);
            }
        });
};
var url = 'http://api.label-abeille.org/app.php/';
/* fonction qui récupère et traite les données de connexion */
function connect() {
	$("#valider_connexion").on(evtclick, function(){
		if(!enCharge){
        	var user = encodeURIComponent($("#email_connexion").val());
        	console.log(user);
        	var login = encodeURIComponent($("#mdp_connexion").val());
        	console.log(login);
        	connexion(user, login, connexion_success, connexion_failure);
		}
    });
};
function connexion_failure() {
	afficherBd("Erreur de connexion","REESSAYER");
}
function connexion_success() {
	getListHives(goToListHives);
}
function goToListHives(listHives) {
    transition(_("paccueil"), "slide");
	var template = $(templates).filter('#tpl-accueil').html();
	var idx = 1;
	listHives = {
			"ruches": listHives,
		    "idx": function() {
		        return idx++;
		    }};
	console.log(listHives.ruches.length);
	console.log(JSON.stringify(listHives)); 
    var h = Mustache.render(template, listHives);
    //console.log(h);
    document.getElementById("content-accueil").innerHTML = h;
	organiserRuches(listHives.ruches.length);
	console.log(document.getElementById("paccueil").innerHTML);
};
function goToDataHives(dataHive) {
	var template = $(templates).filter('#tpl-details').html();
	dataHive.recolte = dataHive["param.poids_recolte"];
	dataHive.miel = dataHive["param.prod_miel_ruche"];
	dataHive.essaim = dataHive["param.poids_essaim"];
  	var h = Mustache.render(template, dataHive);
    document.getElementById("details-content").innerHTML = h;
    transition(_("pdetails"), "");
	_("parametresRuche").addEventListener(evtclick,parametresRuche); 
}
function dessinCercleFLAT(cible,pourcentage){
 var dateActu = new Date();
 timeActu= dateActu.getTime();
 
 var bg = cible;
 var ctx = bg.getContext('2d');
 // netoyage du canvas existant
 var w = _("alveoles_chargement").width;
 var h = _("alveoles_chargement").offsetHeight;
 var cote = w/3;
 _("canvasProgressSimple").width=_("canvasProgressSimple").height=cote+2;
 _("canvasProgressSimple").style.top=(20 + h/2 - cote/2)+'px';
 _("canvasProgressSimple").style.left='calc(50% - '+cote/2+'px)';
 ctx.clearRect ( 0 , 0 , cote , cote );
 // definition d'un cercle complet
 var circ = Math.PI * 2;
 var quart = Math.PI / 2;
 
 // creation d'un cercle de progression
 var ctx = ctx = bg.getContext('2d');
 ctx.strokeStyle = '#e1ffbc';
 ctx.lineWidth = cote/7;
 ctx.beginPath();
 ctx.arc(cote/2, cote/2, cote/2-ctx.lineWidth/2, 0, circ, false);
 ctx.stroke();
 
 // creation d'un cercle de progression
 var ctx = ctx = bg.getContext('2d');
 ctx.strokeStyle = '#99e144';
 ctx.lineWidth = cote/7;
 ctx.beginPath();
 ctx.shadowOffsetY = 0;
 ctx.arc(cote/2, cote/2, cote/2-ctx.lineWidth/2, -(quart), ((circ) * pourcentage/100) - quart, false);
 ctx.stroke();
 
 ctx.font = "bold "+(cote/8)+"pt Calibri,Geneva,Arial";
 ctx.textAlign = 'center';
 ctx.fillStyle = "#000000";
 ctx.fillText(pourcentage+'%', cote/2, cote/2+cote/20);
 ctx.shadowBlur = 0; 

}