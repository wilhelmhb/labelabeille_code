function _(el) {
	return document.getElementById(el);
}

if(window.addEventListener){
   window.addEventListener('load', debut, false);
}else{
    window.attachEvent('onload', debut);
}



var tMaxConnect=12;


var donneesRuches = {};
var checkb=new Array();
var tr;
var time;
var templates;
var enCharge=false;
var rucheSelect;
var tcharge;
var datahives;
var pcharge;
var dataHive;
var isTest=false;
var slider;
var templateCharge=false;
var evtclick="click";
var customer = null;
var client = null;
var hiveGroups = [{}];
var idHiveGroup = 0;
var dataHive = null;
var idHive = 1;
var nruches=0;
var listHivesGlobal;
var rechargerAccueil=false;
var tConnexion;
var levels = ["info", "todo", "warning", "important", "critical"];
var materialType = [{ 'v' : "wood", 'name' : "Bois"}, 
                { 'v' : "plastic", 'name' : "Plastique"},
                { 'v' : "both", 'name' : "Les deux"}, 
                ];
var beesType = [{ 'v' : "buckfast", 'name' : "Buckfast"}, 
                { 'v' : "hybrid", 'name' : "Hybride"}, 
                { 'v' : "black", 'name' : "Abeille noire"}, 
                { 'v' : "other", 'name' : "Autre"}, 
                ];
var supportType = [{ 'v' : "steel_frame", 'name' : "Châssis acier"}, 
                { 'v' : "cinderblock", 'name' : "Parpaing"}, 
                { 'v' : "beam", 'name' : "Poutre"}, 
                { 'v' : "other", 'name' : "Autre"}, 
                ];
var hiveType = [{ 'v' : "dadant", 'name' : "Dadant"}, 
                { 'v' : "langstroth", 'name' : "Langstroth"}, 
                { 'v' : "warre", 'name' : "Warré"}, 
                { 'v' : "other", 'name' : "Autre"}, 
                ];
var state = [{ 'v' : "good", 'name' : "Bon"}, 
                { 'v' : "average", 'name' : "Moyen"}, 
                { 'v' : "bad", 'name' : "Mauvais"},
                ];

var customNotesSetByUser;
var customNotesCreatedByUser;
var defaultNotes;
var historique;

document.addEventListener('deviceready', function () {
	cordova.plugins.backgroundMode.enable();
}, false);


function detectExitExternalPage(window, ref) {
    var interval = window.setInterval(function() {
        try {
            if (ref == null || ref.closed) {
                window.clearInterval(interval);
                _("ch").style.visibility="hidden";
            }
        }
        catch (e) {
        }
    }, 100);
}

function debut(){
        
	dessinCercleFLAT(_("canvasProgressSimple"),0);
    new FastClick(document.body);
 	masquerBd();
	slider = new PageSlider($("#container"),$(_("pchargement")),$("#pages"),"page");
	_("btReglages").addEventListener(evtclick,function(){goToGeneralParameters();});

	_("sitemobile").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		
		var ref=window.open('http://www.label-abeille.org', '_blank', 'location=yes,closebuttoncaption=Fermer');
		detectExitExternalPage(window, ref);
        ref.addEventListener('loaderror', function(event) { afficherBd("Erreur de chargement","OK"); } );

		
	});
	_("faq").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		var ref = window.open('http://www.label-abeille.org/faq', '_blank', 'location=yes,closebuttoncaption=Fermer');
		detectExitExternalPage(window, ref);
        ref.addEventListener('loaderror', function(event) { afficherBd("Erreur de chargement","OK"); } );

	});
	_("fb").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		
		var ref=window.open('https://www.facebook.com/Label-Abeille-679782012107769/?fref=ts', '_blank', 'location=yes,closebuttoncaption=Fermer');
		detectExitExternalPage(window, ref);
        ref.addEventListener('loaderror', function(event) { afficherBd("Erreur de chargement","OK"); } );
		
	});
	_("twitter").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		
		var ref=window.open('https://twitter.com/labelabeille', '_blank', 'location=yes,closebuttoncaption=Fermer');
		detectExitExternalPage(window, ref);
        ref.addEventListener('loaderror', function(event) { afficherBd("Erreur de chargement","OK"); } );
		
	});
	_("gplus").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		
		var ref=window.open('http://plus.google.com/share?url=https://www.label-abeille.org/fr', '_blank', 'location=yes,closebuttoncaption=Fermer');
		detectExitExternalPage(window, ref);
        ref.addEventListener('loaderror', function(event) { afficherBd("Erreur de chargement","OK"); } );
		
	});

	//LIENS
	//Boutons retour
	var btsRetour = document.getElementsByClassName('retour');
	for(var i=0, l=btsRetour.length; i<l; i++){
        btsRetour[i].addEventListener(evtclick,function(){retour();});
	}
	//Boite de dialogue
	_("btBd").addEventListener(evtclick,masquerBd);

	tcharge = setInterval(charger,10);
 	pcharge=0;
	$.get('templates.html', function(t) {
		 templates=t;
		 templateCharge=true;
	 },'html');
}
function charger(){
 if(pcharge<100)pcharge++;
 dessinCercleFLAT(_("canvasProgressSimple"),pcharge);
    if(pcharge==100&&templateCharge){
	 transition(_("pconnexion"));
	 clearInterval(tcharge);
	 connect();
 }
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
