function _(el) {
	return document.getElementById(el);
}

if(window.addEventListener){
    window.addEventListener('load', debut, false);
}else{
    window.attachEvent('onload', debut);
}
var checkb=new Array();
var tr;
var time;
var templates;
var enCharge=false;
var rucheSelect;
var tcharge;
var pcharge;
var slider;
var templateCharge=false;
var evtclick="click";
var customer = null;
var client = null;
var hiveGroups = [{}];
var idHiveGroup = 0;
var dataHive = null;
var idHive = 0;
var test = {
    "customer": { "email": "jean.dupont@mail.com", "id": 23, "firstname": "Jean", "lastname": "Dupont" }, 
    "client": null, 
    "hivegroups": [
        {
        "id_hive_group":18,
        "id_client":11,
        "name":"Rucher principal",
        "harvest":20,
        "date_add":"2016-03-08T15:32:09+0100",
        "date_upd":"2016-01-18T14:03:22+0100"
        }
    ],
    "hives": [
        {
            "id_hive":6,
            "id_client":11,
            "id_hive_group":18,
            "name":"RUCHE.1",
            "note": "",
            "latitude":0,
            "longitude":0,
            "active":true,
            "hive_type":"Type de ruche",
            "bees_type":"Espèce d'abeille",
            "material":"Bois",
            "support":"steel_frame",
            "state":"Bon",
            "harvest":20,
            "notes":"",
            "date_add":"2016-01-18T14:03:22+0100",
            "date_upd":"2016-03-08T15:32:09+0100", 
            "data": {
                "BAT":{"v":"3.477","h":"22\/03\/2016 09:53:04","u":"V"},
                "DEF.DEF_BATTERIE_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_BATTERIE_MOY":{"v":"Présent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_COM":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_GEO":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_MASSE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_ORI":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_POIDS_TARE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "HORODATE":{"v":"22\/03\/2016 13:55:19","h":"22\/03\/2016 13:55:19","u":""},
                "HUM":{"v":"62","h":"22\/03\/2016 13:55:12","u":"%"},
                "LAT":{"v":"47.952164","h":"17\/03\/2016 04:30:00","u":""},
                "LNG":{"v":"1.837055","h":"17\/03\/2016 04:30:00","u":""},
                "LUM":{"v":"2054","h":"22\/03\/2016 13:55:12","u":"lx"},
                "MASSE":{"v":"19.530","h":"22\/03\/2016 13:55:12","u":"kg"},
                "MODE":{"v":"Sigfox","h":"17\/03\/2016 03:21:58","u":""},
                "ORI":{"v":"278","h":"16\/03\/2016 13:18:37","u":""},
                "PARAM.COMMENTAIRE":{"v":"","h":"01\/01\/1970 01:00:00","u":""},
                "PARAM.NB_ABEILLE":{"v":"50000.0","h":"16\/06\/2015 00:00:00","u":""},
                "PARAM.NB_HAUSSE":{"v":"1","h":"12\/06\/2015 00:00:00","u":""},
                "PARAM.POIDS_ESSAIM":{"v":"5.000","h":"22\/09\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RECOLTE":{"v":"30.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RUCHE_VIERGE":{"v":"15.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_HAUSSE":{"v":"5.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_RUCHE":{"v":"20.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS":{"v":"1.0","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS_DUREE":{"v":"16","h":"12\/06\/2015 00:00:00","u":"h"},
                "PARAM.SEUIL_HUMIDITE_MAX":{"v":"90.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_HUMIDITE_MIN":{"v":"20.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_TEMP_MAX":{"v":"30.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "PARAM.SEUIL_TEMP_MIN":{"v":"0.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "TMP":{"v":"11.1","h":"22\/03\/2016 13:55:12","u":"°C"},
                "VOL":{"v":"Présent","h":"08\/03\/2016 08:29:36","u":""}}
        },
        {
            "id_hive":22,
            "id_client":11,
            "id_hive_group":18,
            "name":"RUCHE.2",
            "note": "",
            "latitude":0,
            "longitude":0,
            "active":true,
            "hive_type":"Type de ruche",
            "bees_type":"Espèce d'abeille",
            "material":"Bois",
            "support":"steel_frame",
            "state":"Bon",
            "harvest":0,"notes":"",
            "date_add":"2016-03-08T15:46:32+0100",
            "date_upd":"2016-03-08T15:46:32+0100", 
            "data": {
                "BAT":{"v":"3.477","h":"22\/03\/2016 09:53:04","u":"V"},
                "DEF.DEF_BATTERIE_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_BATTERIE_MOY":{"v":"Présent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_COM":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_GEO":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_MASSE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_ORI":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_POIDS_TARE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "HORODATE":{"v":"22\/03\/2016 13:55:19","h":"22\/03\/2016 13:55:19","u":""},
                "HUM":{"v":"62","h":"22\/03\/2016 13:55:12","u":"%"},
                "LAT":{"v":"47.952164","h":"17\/03\/2016 04:30:00","u":""},
                "LNG":{"v":"1.837055","h":"17\/03\/2016 04:30:00","u":""},
                "LUM":{"v":"2054","h":"22\/03\/2016 13:55:12","u":"lx"},
                "MASSE":{"v":"19.530","h":"22\/03\/2016 13:55:12","u":"kg"},
                "MODE":{"v":"Sigfox","h":"17\/03\/2016 03:21:58","u":""},
                "ORI":{"v":"278","h":"16\/03\/2016 13:18:37","u":""},
                "PARAM.COMMENTAIRE":{"v":"","h":"01\/01\/1970 01:00:00","u":""},
                "PARAM.NB_ABEILLE":{"v":"50000.0","h":"16\/06\/2015 00:00:00","u":""},
                "PARAM.NB_HAUSSE":{"v":"1","h":"12\/06\/2015 00:00:00","u":""},
                "PARAM.POIDS_ESSAIM":{"v":"5.000","h":"22\/09\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RECOLTE":{"v":"30.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RUCHE_VIERGE":{"v":"15.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_HAUSSE":{"v":"5.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_RUCHE":{"v":"20.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS":{"v":"1.0","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS_DUREE":{"v":"16","h":"12\/06\/2015 00:00:00","u":"h"},
                "PARAM.SEUIL_HUMIDITE_MAX":{"v":"90.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_HUMIDITE_MIN":{"v":"20.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_TEMP_MAX":{"v":"30.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "PARAM.SEUIL_TEMP_MIN":{"v":"0.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "TMP":{"v":"11.1","h":"22\/03\/2016 13:55:12","u":"°C"},
                "VOL":{"v":"Présent","h":"08\/03\/2016 08:29:36","u":""}}
        },
        {
            "id_hive":23,
            "id_client":11,
            "id_hive_group":18,
            "name":"RUCHE.3",
            "note": "",
            "latitude":0,
            "longitude":0,
            "active":true,
            "hive_type":"Type de ruche",
            "bees_type":"Espèce d'abeille",
            "material":"Bois",
            "support":"steel_frame",
            "state":"Bon",
            "harvest":0,
            "note":"",
            "notes":"",
            "date_add":"2016-03-08T15:46:51+0100",
            "date_upd":"2016-03-08T15:46:51+0100",
            "data": {"idruche":2,"idclient":1,
                "BAT":{"v":"3.477","h":"22\/03\/2016 09:53:04","u":"V"},
                "DEF.DEF_BATTERIE_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_BATTERIE_MOY":{"v":"Présent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_COM":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_GEO":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_MASSE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_ORI":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_POIDS_TARE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "HORODATE":{"v":"22\/03\/2016 13:55:19","h":"22\/03\/2016 13:55:19","u":""},
                "HUM":{"v":"62","h":"22\/03\/2016 13:55:12","u":"%"},
                "LAT":{"v":"47.952164","h":"17\/03\/2016 04:30:00","u":""},
                "LNG":{"v":"1.837055","h":"17\/03\/2016 04:30:00","u":""},
                "LUM":{"v":"2054","h":"22\/03\/2016 13:55:12","u":"lx"},
                "MASSE":{"v":"19.530","h":"22\/03\/2016 13:55:12","u":"kg"},
                "MODE":{"v":"Sigfox","h":"17\/03\/2016 03:21:58","u":""},
                "ORI":{"v":"278","h":"16\/03\/2016 13:18:37","u":""},
                "PARAM.COMMENTAIRE":{"v":"","h":"01\/01\/1970 01:00:00","u":""},
                "PARAM.NB_ABEILLE":{"v":"50000.0","h":"16\/06\/2015 00:00:00","u":""},
                "PARAM.NB_HAUSSE":{"v":"1","h":"12\/06\/2015 00:00:00","u":""},
                "PARAM.POIDS_ESSAIM":{"v":"5.000","h":"22\/09\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RECOLTE":{"v":"30.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RUCHE_VIERGE":{"v":"15.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_HAUSSE":{"v":"5.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_RUCHE":{"v":"20.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS":{"v":"1.0","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS_DUREE":{"v":"16","h":"12\/06\/2015 00:00:00","u":"h"},
                "PARAM.SEUIL_HUMIDITE_MAX":{"v":"90.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_HUMIDITE_MIN":{"v":"20.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_TEMP_MAX":{"v":"30.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "PARAM.SEUIL_TEMP_MIN":{"v":"0.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "TMP":{"v":"11.1","h":"22\/03\/2016 13:55:12","u":"°C"},
                "VOL":{"v":"Présent","h":"08\/03\/2016 08:29:36","u":""}
            }
        },
        {
            "id_hive":24,
            "id_client":11,
            "id_hive_group":18,
            "name":"RUCHE.4",
            "note": "",
            "latitude":0,
            "longitude":0,
            "active":true,
            "hive_type":"Type de ruche",
            "bees_type":"Espèce d'abeille",
            "material":"Bois",
            "support":"steel_frame",
            "state":"Bon",
            "harvest":1,
            "note":"",
            "date_add":"2011-01-01T00:00:00+0100",
            "date_upd":"2011-01-01T00:00:00+0100",
            "data": {"idruche":2,"idclient":1,
                "BAT":{"v":"3.477","h":"22\/03\/2016 09:53:04","u":"V"},
                "DEF.DEF_BATTERIE_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_BATTERIE_MOY":{"v":"Présent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_COM":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_GEO":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_HUM_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_MASSE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_ORI":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_POIDS_TARE":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MAX":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "DEF.DEF_TEMP_MIN":{"v":"Absent","h":"22\/03\/2016 14:09:00","u":""},
                "HORODATE":{"v":"22\/03\/2016 13:55:19","h":"22\/03\/2016 13:55:19","u":""},
                "HUM":{"v":"62","h":"22\/03\/2016 13:55:12","u":"%"},
                "LAT":{"v":"47.952164","h":"17\/03\/2016 04:30:00","u":""},
                "LNG":{"v":"1.837055","h":"17\/03\/2016 04:30:00","u":""},
                "LUM":{"v":"2054","h":"22\/03\/2016 13:55:12","u":"lx"},
                "MASSE":{"v":"19.530","h":"22\/03\/2016 13:55:12","u":"kg"},
                "MODE":{"v":"Sigfox","h":"17\/03\/2016 03:21:58","u":""},
                "ORI":{"v":"278","h":"16\/03\/2016 13:18:37","u":""},
                "PARAM.COMMENTAIRE":{"v":"","h":"01\/01\/1970 01:00:00","u":""},
                "PARAM.NB_ABEILLE":{"v":"50000.0","h":"16\/06\/2015 00:00:00","u":""},
                "PARAM.NB_HAUSSE":{"v":"1","h":"12\/06\/2015 00:00:00","u":""},
                "PARAM.POIDS_ESSAIM":{"v":"5.000","h":"22\/09\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RECOLTE":{"v":"30.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.POIDS_RUCHE_VIERGE":{"v":"15.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_HAUSSE":{"v":"5.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.PROD_MIEL_RUCHE":{"v":"20.000","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS":{"v":"1.0","h":"12\/06\/2015 00:00:00","u":"kg"},
                "PARAM.SEUIL_BAISSE_POIDS_DUREE":{"v":"16","h":"12\/06\/2015 00:00:00","u":"h"},
                "PARAM.SEUIL_HUMIDITE_MAX":{"v":"90.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_HUMIDITE_MIN":{"v":"20.0","h":"12\/06\/2015 00:00:00","u":"%"},
                "PARAM.SEUIL_TEMP_MAX":{"v":"30.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "PARAM.SEUIL_TEMP_MIN":{"v":"0.0","h":"12\/06\/2015 00:00:00","u":"°C"},
                "TMP":{"v":"11.1","h":"22\/03\/2016 13:55:12","u":"°C"},
                "VOL":{"v":"Présent","h":"08\/03\/2016 08:29:36","u":""}
            }
        }
    ], 
    
};
var isTest = false;
document.addEventListener('deviceready', function () {
	cordova.plugins.backgroundMode.enable();
}, false);

function debut(){
	dessinCercleFLAT(_("canvasProgressSimple"),0);
    new FastClick(document.body);
 	masquerBd();
	slider = new PageSlider($("#container"),$(_("pchargement")));
	_("btReglages").addEventListener(evtclick,function(){goToGeneralParameters();}); 		

	_("sitemobile").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		
		var ref=window.open('http://www.label-abeille.org', '_self');
		ref.addEventListener('loadstop', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loadstart', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('exit', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loaderror', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		
	});
	_("faq").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		
		var ref=window.open('http://www.label-abeille.org/faq', '_self');
		ref.addEventListener('loadstop', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loadstart', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('exit', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loaderror', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		
	});
	_("fb").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		
		var ref=window.open('https://www.facebook.com/Label-Abeille-679782012107769/?fref=ts', '_self');
		ref.addEventListener('loadstop', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loadstart', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('exit', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loaderror', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		
	});
	_("twitter").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		
		var ref=window.open('https://twitter.com/labelabeille', '_self');
		ref.addEventListener('loadstop', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loadstart', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('exit', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loaderror', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		
	});
	_("gplus").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		
		var ref=window.open('http://plus.google.com/share?url=https://www.label-abeille.org/fr', '_self');
		ref.addEventListener('loadstop', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loadstart', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('exit', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loaderror', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		
	});


	_("btCarte").addEventListener(evtclick, goToMap); 

	/* configurer précisément les boutons de retour */
	_("retour_params_generaux").addEventListener(evtclick,function(){
		goToListHives(idHiveGroup, hiveGroups[idHiveGroup].hives);
	});
	_("retour_params_rucher").addEventListener(evtclick,function(){
		return false;
	});
	_("retour_params_ruche").addEventListener(evtclick,function(){
		goToDataHives(
	    		hiveGroups[idHiveGroup].hives[idHive].data,
	    		hiveGroups[idHiveGroup].hives[idHive].name);
	});
	_("retour_params_details").addEventListener(evtclick,function(){
		goToListHives(idHiveGroup, hiveGroups[idHiveGroup].hives);
	});
	_("retour_params_carte").addEventListener(evtclick,function(){
		goToListHives(idHiveGroup, hiveGroups[idHiveGroup].hives);
	});
	
	_("btBd").addEventListener(evtclick,masquerBd);
	tcharge = setInterval(charger,20);
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

function retour(){slider.slidePageFrom(null,"left");}
function transition(p2,mode,p1){
	//console.log('transition : begin');
	slider.slidePageFrom(p2,"right");
	//console.log('transition : end');
}
function PageSlider(container,pageinit) {

    var container = container,
        enTransition=false,
        currentPage=pageinit,
        hist = [];

    // Use this function directly if you want to control the sliding direction outside PageSlider
    this.slidePageFrom = function(dest, from) {
    	//console.log('slidePageFrom : begin, enTransition='+enTransition);
        if(!enTransition){
        	//console.log('slidePageFrom : isNotEnTransition');
	        enTransition=true;
			if(dest==null)dest=hist.pop();// si aucune destination n'est affichée, la destination est la dernière page visitée précedemment
			else{
				dest=$(dest);
				hist.push(currentPage);
			}
		
	        container.append(dest);
	
	        if (!currentPage || !from) {
	            dest.attr("class", "page center");
	            currentPage = dest;
	            return;
	        }
	
	        // Position the page at the starting position of the animation
	        dest.attr("class", "page " + from);
	
	        currentPage.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
	        	//console.log('slidePageFrom : webkitTransitionEnd');
	                        enTransition=false;
	            $(e.target).remove();
				$("#pages").append(e.target);
	        });
	
	        // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
	        container[0].offsetWidth;
	
	        // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
	        dest.attr("class", "page transition center");
	        currentPage.attr("class", "page transition " + (from === "left" ? "right" : "left"));
	        currentPage = dest;
        }
    	//console.log('slidePageFrom : end, enTransition='+enTransition);
    };

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
        //console.log(user);
        //console.log(passwd);
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
                	//console.log(JSON.stringify(data)); 
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
/* récupération de la liste des ruches */
function getListHives(id, action) {
		enCharge=true;
		_("ch").style.visibility="visible";
		if(isTest) {
		    enCharge=false;
		    hiveGroups[idHiveGroup].hives = test.hives;
			_("ch").style.visibility="hidden";
			action(id, test.hives);
		}
		else {
            $.ajax({
                type: 'GET',
                url: url+'pscustomer/hives/me',
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
				    enCharge=false;
				    _("ch").style.visibility="hidden";
                    //console.log(data); 
                    //$("#resultat").html(JSON.stringify(data));
				    hiveGroups[id].hives = data;
                    action(id, data);
                },
            });
        }
}
/* récupération des données d'une ruche */
function getDataHive(id, id2, name, action) {
		enCharge=true;
		//$.support.cors = true;
		//$.mobile.allowCrossDomainPages = true;
		_("ch").style.visibility="visible";
		//console.log('on prend les données de la ruche '+name+" et id "+id);
		//console.log(action);
		if(isTest) {
			enCharge=false;
			_("ch").style.visibility="hidden";
			for(var i = 0; i< test.hives.length; i++) {
				//console.log(test.hives[i].id_hive);
			    if(test.hives[i].id_hive == id) {
				    idHive = i;
				    //console.log(i);
			    	dataHive = test.hives[i].data;
			        action(i, name, test.hives[i].data);
			    }
			}
		}
		else {
            $.ajax({
                type: 'GET',
                url: url+'pscustomer/hives/'+id+'/me',
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
				    enCharge=false;
				    idHive = id2;
			    	dataHive = data;
				    _("ch").style.visibility="hidden";
				    //console.log(id2);
                	//console.log(JSON.stringify(data)); 
				    //console.log(JSON.stringify(data["param.poids_essaim"])); 
                	//$("#resultat").html(JSON.stringify(data));
                	action(id2, name, data);
                }
            });
        }
};
function getHivesCoordinates(action) {
    $.ajax({
        type: 'GET',
        url: url+'pshive/hives/coordinates',
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
        	//console.log(JSON.stringify(data)); 
        	//$("#resultat").html(JSON.stringify(data));
        	action(data);
        }
    });
};
var url = 'https://api.label-abeille.org/';
var url_test = 'http://localhost/Symfony2/api_labelabeille_reduite/web/app_dev.php/';
/* fonction qui récupère et traite les données de connexion */
function connect() {
	$("#valider_connexion").on(evtclick, function(){
		if(!enCharge){
        	var user = encodeURIComponent($("#email_connexion").val());
        	//console.log(user);
        	var login = encodeURIComponent($("#mdp_connexion").val());
        	//console.log(login);
        	connexion(user, login, connexion_success, connexion_failure);
		}
    });
	$("#tester_appli").on(evtclick, function(){
		if(!enCharge){
			var user = null;
			var login = null;
			isTest = true;
        	connexion(user, login, connexion_success, connexion_failure);
		}
    });
};
function connexion_failure() {
	afficherBd("Erreur de connexion","REESSAYER");
}
function connexion_success() {
	afficherBd("Vous êtes connecté. Vous allez être redirigé vers la liste de vos ruches dans quelques instants. Si ce n'est pas le cas, cliquez sur le bouton ci-dessous.", "Aller à la liste des ruches");
	getListHives(idHiveGroup, goToListHives);
	_("btBd").addEventListener(evtclick, function (){
		getListHives(idHiveGroup, goToListHives);
	});
}
function goToListHives(id, listHives) {
	//console.log('goToListHives : begin');
	var template = $(templates).filter('#tpl-accueil').html();
	var idx = 1;
	hiveGroups[id].hives = listHives;
	var i = 0;
	function a(j, name, data) {
		/*console.log(data);
		console.log(hiveGroups[id].hives);
		console.log(j);*/
		hiveGroups[id].hives[j].data = data;
		if(j+1<hiveGroups[id].hives.length) {
			//console.log(data);
			getDataHive(listHives[j+1].id_hive, j+1, listHives[j+1].name, a);
		}
		else {
			var obj_array = [];

			for (idx in hiveGroups[id].hives) {
				   obj_array.push ({'index': (parseInt(idx)+1), 'data': hiveGroups[id].hives[idx]});
			}

			listHives = {
				"ruches": obj_array
			}
			//console.log(listHives.ruches.length);
			//console.log(JSON.stringify(listHives)); 
			//console.log(listHives.ruches[0].name);
			//console.log(listHives);
			
		    var h = Mustache.render(template, listHives);
		    //console.log(h);
		    document.getElementById("content-accueil").innerHTML = h;
		    //console.log(document.getElementById("paccueil").innerHTML);
		    //console.log('goToListHives : before transition');
		    transition(_("paccueil"), "slide");
		    accueil(listHives.ruches.length);
		    for(var k=1; k<=listHives.ruches.length; k++) {
		    	//console.log(k);
		    	$("ruche"+k+"_selectionnee_reglages").click(function(e) {
		    		e.preventDefault();
		    		//console.log($(".ruche_selectionnee_reglages").index());
		    		idHive = k-1;
		    		goToHiveParameters();
		    	});
		    	$("#ruche"+k).on('click', function(e) {
		    		e.preventDefault();
		    		//console.log($(this)[0].id);
		    		var k = $(this)[0].id.split("ruche")[1];
		    		idHive = k-1;
		    		hive = hiveGroups[id].hives[k-1].data;
		    		name = hiveGroups[id].hives[k-1].name;
		    		goToDataHives(name, hive);
		    	});
		    }
		    masquerBd();
		}
	}
	getDataHive(listHives[0].id_hive, 0, listHives[0].name, a);
};
function goToDataHives(name, dataHive) {
	var template = $(templates).filter('#tpl-details').html();
	dataHive.recolte = dataHive["PARAM.POIDS_RECOLTE"];
	dataHive.miel = dataHive["PARAM.PROD_MIEL_RUCHE"];
	dataHive.essaim = dataHive["PARAM.POIDS_ESSAIM"];
	dataHive.nom = name;
  	var h = Mustache.render(template, dataHive);
  	//console.log(dataHive);
    document.getElementById("corps").innerHTML = h;
    transition(_("pdetails"), "");
    if(isTest) {
    	_("parametresRuche").style = "";
    	_("parametresRuche").addEventListener(evtclick,goToHiveParameters);
    }
}
function goToMap() {
	//console.log("goToMap");
	getHivesCoordinates(initializeMap);
	transition(_("pmap"), "");
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

};
function initializeMap(hiveCoordinates) {
	/* definition of the global variables */
    var markers, map, index = 0, zoneMarkers;
    zoneMarkers = new google.maps.LatLngBounds();
    //console.log("initializeMap");
    /** create and place a marker on a map
     * @int n: index our the created marker
     * @map map: map where the marker will be placed
     * @float lat, long: coordinates of the marker on the map
     * @string url: url of the marker's image
     * @int height, width: size of the marker
     * @int originX, originY: placement of the marker's image in the layout
     * @int anchorX, anchorY: placement of the marker relative to the coordinates
     * @int scaleX, @scaleY: scaled size of the marker's image
     * @boolean optimized: true if all the markers have to be united in one graphic (better for time complexity, worse for resolution)
     * @string title: message to show onmouseover
     * @string content: content of the InfoWindow displayed on click, if empty, no InfoWindow
     * @function action: function to call on click in addition to the InfoWindow
     */
    function createMarker(n, map, lat, long, url) {
        var icon = {url: url}; // intanciate the icon
        
        /* instanciate the marker itself */
        var marker = {
            position: new google.maps.LatLng(lat, long), 
	        map: map,
	        icon : icon
        }
        /* transform our marker into a google maps marker */
	    var marker = new google.maps.Marker(marker); 
	    
	    /* if content has been defined, create an InfoWindow that will pop-up on click */
	    /*if(content != '') {
	        /* attach the infoWindow to the marker */
    	    /*marker.infobulle = new google.maps.InfoWindow({
                content  : content, // contenu qui sera affiché
                visible: false,
                position: new google.maps.LatLng(lat, long),
                maxWidth: 500
            });
        
	        google.maps.event.addListener(marker, 'click', function addInfoWindow(data){
	            // affichage position du marker
	            console.log(content);
	            marker.infobulle.open(map, marker);
	        });
        }*/
	    /* the index wil be useful in case of removal of the marker's childs and roads */
	    marker.index = n;
        /* add marker to the zone */
        zoneMarkers.extend(marker.getPosition());
        map.fitBounds(zoneMarkers);
	    return marker;
    };
    
    /** create and display a map 
     * @DOMNode element: the element were to display the map
     * @float lat, long: coordinates of the center of the map
     * @int zoom: zoom on the map
     * @google.maps.MapTypeId type: type of map
     */
    function createMap(element, lat, long, zoom) {
        map = new google.maps.Map(element, {
            'zoom': zoom,
            'center': new google.maps.LatLng(lat, long)
        });
    };
    
    /** 
     * display all wished elements on the map, and handle their behaviour
     */
    function displayElements() {
        createMap(document.getElementById("corps_carte"), 48.513202, 7.081958, 6);
	    //console.log(map);
	    
        if(markers != null && markers.length > 0) {
            //console.log(markers);
            for(var k = 0; k < markers.length; k++) {
                markers[k].setMap(null);
                delete markers[k];
            }
        }
        
        /* reset all constants of the map */
        index = 0;
        markers = new Array();
        
	    for(var i = 0; i < hiveCoordinates.length; i++) {
	    	//console.log(JSON.stringify(hiveCoordinates[i]));
	        if(hiveCoordinates[i] != null && (hiveCoordinates[i].lat != '0.00000000' || hiveCoordinates[i].lng != '0.00000000')) {
	            markers[index] = createMarker(index, map, hiveCoordinates[i].lat, hiveCoordinates[i].lng, "http://www.label-abeille.org/modules/cmaps/views/img/markers/yellow_pin.png");
		        index++;
	        }
	    }
	};
	
	displayElements();
};

function goToGeneralParameters() {
	//console.log('goToGeneralParameters : begin');
	var template = $(templates).filter('#tpl-params-generaux').html();
	/*console.log(listHives.ruches.length);
	console.log(JSON.stringify(listHives)); 
	console.log(listHives.ruches[0].name);*/
    var h = Mustache.render(template, customer);
    document.getElementById("corps-params-generaux").innerHTML = h;
    //console.log('goToGeneralParameters : before transition');
    transition(_("pparametres"), "slide");
    //console.log(customer.id);
    if(isTest) {
    	$("#form-params-generaux").submit(function(e){
	        e.preventDefault(); 
	        var firstname = $("#apibundle_pscustomer_firstname").val();
	        var lastname = $("#apibundle_pscustomer_lastname").val();
	        var email = $("#apibundle_pscustomer_email").val();
	        var password = $("#apibundle_pscustomer_password").val();
	        var donnees = {"id": customer.id, "firstname": firstname, "lastname": lastname, "email": email, "password": password};
	        //console.log(donnees);
	        customer = donnees;
	        test.customer = customer;
	        //console.log(test.customer);
            goToListHives(idHiveGroup, hiveGroups[idHiveGroup].hives);
    	})
    }
    else {
        $("#form-params-generaux").submit(function(e){
            //alert("début modif");
            e.preventDefault(); 
            var donnees = $(this).serialize();
            //console.log(donnees);
            $.ajax({
                type: 'PATCH',
                url: url+'pscustomer/'+customer.id,
                xhrFields: {
                    withCredentials: true
                },
                //data: 'apibundle_pscustomer[firstname]=test2',
                data: donnees,
                success: function(data) {
                	//console.log(data); 
                	customer = data; 
                	//$("#resultat").html(JSON.stringify(data));
                    customer.firstname = $("#apibundle_pscustomer_firstname").val();
                    customer.lastname = $("#apibundle_pscustomer_lastname").val();
                    customer.email = $("#apibundle_pscustomer_email").val();
                    customer.password = $("#apibundle_pscustomer_password").val();
                    goToListHives(idHiveGroup, hiveGroups[idHiveGroup].hives);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //console.log(xhr.responseText);
                    //$("#result").html(xhr.responseText);
                }
            });
            //alert("fin modif");
        });
    }
    //organiserRuches(listHives.ruches.length);
    //masquerBd();
    //console.log('goToGeneralParameters : end');
}

function goToHiveGroupParameters() {
	//console.log('goToHiveGroupParameters : begin');
	var template = $(templates).filter('#tpl-params-rucher').html();
	//console.log(listHives.ruches.length);
	//console.log(JSON.stringify(listHives)); 
	//console.log(listHives.ruches[0].name);
    var h = Mustache.render(template, hiveGroups[idHiveGroup]);
    //console.log(h);
    document.getElementById("corps-params-rucher").innerHTML = h;
    //console.log(document.getElementById("corps-params-rucher").innerHTML);
    //console.log('goToHiveGroupParameters : before transition');
    transition(_("pparametres-rucher"), "slide");
    //organiserRuches(listHives.ruches.length);
    //masquerBd();
    //console.log('goToHiveGroupParameters : end');
}

function goToHiveParameters() {
	//console.log('goToHiveParameters : begin');
	var template = $(templates).filter('#tpl-params-ruche').html();
	//TODO: get idClient/idCustomer
	//console.log(hiveGroups);
	//console.log(hiveGroups[idHiveGroup]);
	//console.log(idHive);
	//console.log(hiveGroups[idHiveGroup].hives);
    var h = Mustache.render(template, hiveGroups[idHiveGroup].hives[idHive]);
    //console.log(h);
    document.getElementById("corps-params-ruche").innerHTML = h;
    //console.log(document.getElementById("corps-params-ruche").innerHTML);
    //console.log('goToHiveParameters : before transition');
    transition(_("pparametres-ruche"), "slide");
    if(isTest) {
        //console.log("coucou");
    	$("#form-params-hive").submit(function(e){
    	    //console.log("coucou2");
	        e.preventDefault(); 
	        hiveGroups[idHiveGroup].hives[idHive].name = $("#apibundle_pshive_name").val();
	        hiveGroups[idHiveGroup].hives[idHive].note = $("#apibundle_pshive_note").val();
	        hiveGroups[idHiveGroup].hives[idHive].latitude = $("#apibundle_pshive_latitude").val();
	        hiveGroups[idHiveGroup].hives[idHive].longitude = $("#apibundle_pshive_longitude").val();
	        hiveGroups[idHiveGroup].hives[idHive].hive_type = $("#apibundle_pshive_hiveType").val();
	        hiveGroups[idHiveGroup].hives[idHive].bees_type = $("#apibundle_pshive_beesType").val();
	        hiveGroups[idHiveGroup].hives[idHive].material = $("#apibundle_pshive_material").val();
	        hiveGroups[idHiveGroup].hives[idHive].support = $("#apibundle_pshive_support").val();
	        hiveGroups[idHiveGroup].hives[idHive].state = $("#apibundle_pshive_state").val();
	        hiveGroups[idHiveGroup].hives[idHive].harvest = $("#apibundle_pshive_harvest").val();
	        hiveGroups[idHiveGroup].hives[idHive].note= $("#apibundle_pshive_note").val();
	        hiveGroups[idHiveGroup].hives[idHive].notes = $("#apibundle_pshive_notes").val();
	        //console.log(hiveGroups[idHiveGroup].hives[idHive]);
	        goToDataHives(hiveGroups[idHiveGroup].hives[idHive].name, hiveGroups[idHiveGroup].hives[idHive].data);
    	})
    }
    else {
        $("#form-params-hive").submit(function(e){
            //alert("début modif");
            e.preventDefault();
            var donnees = $(this).serialize();
            //console.log(donnees);
            $.ajax({
                type: 'PATCH',
                url: url+'pshive/'+hiveGroups[idHiveGroup].hives[idHive].id,
                xhrFields: {
                    withCredentials: true
                },
                //data: 'apibundle_pscustomer[firstname]=test2',
                data: donnees,
                success: function(data) {
                	//console.log(data); 
                	customer = data; 
                	//$("#resultat").html(JSON.stringify(data));
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //console.log(xhr.responseText);
                    //$("#result").html(xhr.responseText);
                }
            });
            /* modification en local */
	        hiveGroups[idHiveGroup].hives[idHive].name = $("#apibundle_pshive_name").val();
	        hiveGroups[idHiveGroup].hives[idHive].note = $("#apibundle_pshive_note").val();
	        hiveGroups[idHiveGroup].hives[idHive].latitude = $("#apibundle_pshive_latitude").val();
	        hiveGroups[idHiveGroup].hives[idHive].longitude = $("#apibundle_pshive_longitude").val();
	        hiveGroups[idHiveGroup].hives[idHive].hive_type = $("#apibundle_pshive_hiveType").val();
	        hiveGroups[idHiveGroup].hives[idHive].bees_type = $("#apibundle_pshive_beesType").val();
	        hiveGroups[idHiveGroup].hives[idHive].material = $("#apibundle_pshive_material").val();
	        hiveGroups[idHiveGroup].hives[idHive].support = $("#apibundle_pshive_support").val();
	        hiveGroups[idHiveGroup].hives[idHive].state = $("#apibundle_pshive_state").val();
	        hiveGroups[idHiveGroup].hives[idHive].harvest = $("#apibundle_pshive_harvest").val();
	        hiveGroups[idHiveGroup].hives[idHive].note= $("#apibundle_pshive_note").val();
	        hiveGroups[idHiveGroup].hives[idHive].notes = $("#apibundle_pshive_notes").val();
	        //console.log(hiveGroups[idHiveGroup].hives[idHive]);
	        /* on retourne aux détails */
	        goToDataHives(hiveGroups[idHiveGroup].hives[idHive].name, hiveGroups[idHiveGroup].hives[idHive].data);
            //alert("fin modif");
        });
    }
    //organiserRuches(listHives.ruches.length);
    //masquerBd();
    //console.log('goToHiveParameters : end');
}

