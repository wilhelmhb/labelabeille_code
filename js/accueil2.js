var h,h2,hruches,w;
var nbRuches=[];
var nbRuchers;
var rucheSelect=[];
var rucheSelect2=[];
var transitionEnCours=false;
var $window;
var decalTop;
var firstAccueil=true;
var t=500;


function griser(i,j){
    $("#ruche"+i+"_"+j).children(".fond_ruche_selectionnee").css("opacity","0");
    $("#ruche"+i+"_"+j).find(".ruche_selectionnee").children("h1").css("border-bottom","1px solid gray");
    $("#ruche"+i+"_"+j).children(".fond_ruche_grise").css("opacity","1");
    $("#ruche"+i+"_"+j).find(".ruche_selectionnee_infos").css("width","85%");
    $("#ruche"+i+"_"+j).find(".ruche_selectionnee_infos").html("<p align=\"center\">Capteur non relié</p>");
    $("#ruche"+i+"_"+j+"_selectionnee_courbes").css("display","none");
    $("#ruche"+i+"_"+j+"_selectionnee_historique").css("display","none");

}

function initAccueil(){
	if(firstAccueil){
	    if(_("ruche0").offsetHeight != null) {
	        h = _("ruche0").offsetHeight;
	        h2 = _("rucheselect").offsetHeight;
	        hruches = _("rucher1").offsetHeight;
	    }
	    else {
	        if(_("ruche0").style.pixelHeight) {
	            h = _("ruche0").style.pixelHeight;
	            h2 = _("rucheselect").style.pixelHeight;
            
	        }
	        else {
	            //console.log("ProblèmeH");
	        }
	    }
	    if(_("ruche0").offsetWidth != null) {
	        w = _("ruche0").offsetWidth;
	    }
	    else {
	        if(_("ruche0").style.pixelWidth != null){
	            w = _("ruche0").style.pixelWidth;
	        }
	        else {
	            console.log("ProblèmeW");
	        }
	    }
        decalTop=h;
		firstAccueil=false;
       
	}
}
var inotif=0;
var notifsPresentes=[];
var enActualisation=false;
function notif(nom,ruche,idSeuil){
 present=notifsPresentes.indexOf(ruche.id_hive*10+idSeuil)!=-1;
 if(!present){
     inotif++;
     notifsPresentes.push(ruche.id_hive*10+idSeuil);
     cordova.plugins.notification.local.schedule({
                                                id: inotif,
                                                badge: inotif,
                                                 title: "Alerte ("+ruche.name+")",
                                                 text: "Seuil "+nom+" dépassé",
                                                 at: new Date()
                                                 });
     cordova.plugins.notification.local.on("click", function (notification) {
                                           inotif=0;
                                           goToListHives(1);
                                           });
 }
 
 }
/*
function notif(nom,nomRuche){
    inotif++;
 
    cordova.plugins.notification.local.schedule({
                                                id: inotif,
                                                badge: inotif,
                                                title: "Alerte ("+nomRuche+")",
                                                text: "Seuil "+nom+" dépassé",
                                                at: new Date()
                                                });
    cordova.plugins.notification.local.on("click", function (notification) {
                                          inotif=0;
                                          accueil();
                                          });
}*/

var seuils = [
              /*{
               'nom': "PARAM.SEUIL_ACC_X_MAX",
               'description': "Seuil Accéléromètre X maximum pour alerte"
               },
               {
               'nom': "PARAM.SEUIL_ACC_X_MIN",
               'description': "Seuil Accéléromètre X minimum pour alerte"
               },
               {
               'nom': "PARAM.SEUIL_ACC_Y_MAX",
               'description': "Seuil Accéléromètre Y maximum pour alerte"
               },
               {
               'nom': "PARAM.SEUIL_ACC_Y_MIN",
               'description': "Seuil Accéléromètre Y minimum pour alerte"
               },
               {
               'nom': "PARAM.SEUIL_ACC_Z_MAX",
               'description': "Seuil Accéléromètre Z maximum pour alerte"
               },
               {
               'nom': "PARAM.SEUIL_ACC_Z_MIN",
               'description': "Seuil Accéléromètre Z minimum pour alerte"
               },*/
              {
              'nom': "PARAM.SEUIL_BAISSE_POIDS",
              'description': "Baisse de poids max",
              'type': "max",
              'champ':"PARAM.POIDS_RECOLTE"
              },
              /*{
               'nom': "PARAM.SEUIL_BAISSE_POIDS_DUREE",
               'description': "Nombre d'heure pour constater la baisse de poids"
               },*/
              {
              'nom': "PARAM.SEUIL_HUMIDITE_MAX",
              'description': "Humidité max",
              'type': "max",
              'champ':"HUM"
              },
              {
              'nom': "PARAM.SEUIL_HUMIDITE_MIN",
              'description': "Humidité min",
              'type': "min",
              'champ':"HUM"
              },
              {
              'nom': "PARAM.SEUIL_TEMP_MAX",
              'description': "Température max",
              'type': "max",
              'champ':"TMP"
              },
              {
              'nom': "PARAM.SEUIL_TEMP_MIN",
              'description': "Température min",
              'type': "min",
              'champ':"TMP"
              }
              ];


function testSeuil(ruche,s,v){
    console.log(v+" / "+ruche.data[s.champ].v);
    if(s.type=="max"&&parseFloat(v)<parseFloat(ruche.data[s.champ].v)){
        return true;
    }
    else if(s.type=="min"&&parseFloat(v)>parseFloat(ruche.data[s.champ].v)){
        return true;
    }
    else return false;
}
function actuNotifs(){if(!enActualisation){
    enActualisation=true;
    getListHiveGroups(function() {
                      console.log("Actualisation des seuils");
                      getHivesForHiveGroups(-1,function(){//Pour chaque ruche
                                            for(var r=0;r<donneesRuches.hivegroups.length;r++){
                                            for(var i=0;i<donneesRuches.hivegroups[r].hives.length;i++){
                                            for(s=0;s<seuils.length;s++) {
                                            
                                            
                                            if(testSeuil(donneesRuches.hivegroups[r].hives[i],seuils[s],donneesRuches.hivegroups[r].hives[i].data[seuils[s].nom].v))notif(seuils[s].nom,donneesRuches.hivegroups[r].hives[i],s);
                                            }
                                            
                                            enActualisation=false;
                                            }}
                                        });//Le -1 pour dire qu'on ne va pas sur la liste des ruches (ça pourrait interferer avec la navigation de l'utilisateur si il est en train d'utiliser l'appli
                                  },false);//Ce -1 pour ne pas afficher le chargement
    

    
}}
var rucher=1;
var slider_ruchers;
var $window=[];
var tScroll=[];
function accueil(){
    //Carte
    _("btCarte").addEventListener(evtclick, goToMap);
    _("btHistorique").addEventListener(evtclick, goToHistorique);

    nbRuchers=donneesRuches.hivegroups.length;
    console.log("Nb de ruchers : "+nbRuchers);
    
    setInterval(function(){actuNotifs();}, 300000);

    if(nbRuchers>0){
        $("#rucher"+rucher).appendTo("#conteneur-rucher");
        initAccueil();
    
        for(var m=1;m<=nbRuchers;m++){
            if (donneesRuches.hivegroups[m-1].hives != null) {
                nbRuches[m]=donneesRuches.hivegroups[m-1].hives.length;
            }
            else {
                nbRuches[m] = 0;
                donneesRuches.hivegroups[m-1].hives = [];
            }
            console.log("Nb de ruches dans le rucher "+m+" : "+nbRuches[m]);
            $window[m] = $("#rucher"+m).children(".ruches");
            organiserRuches(m);
        }

        slider_ruchers = new PageSlider($("#conteneur-rucher"),$("#rucher"+rucher),$("#reserve-ruchers"),"page");
        allerAuRucher(rucher);
    }else{
        $("#nouveaurucher").appendTo("#conteneur-rucher");
        slider_ruchers = new PageSlider($("#conteneur-rucher"),$("#nouveaurucher"),$("#reserve-ruchers"),"page");
        nouveauRucher();
    }
};

function nouveauRucher(){
    if(!transitionEnCours&&!slider_ruchers.enTransition){
        if(rucher<nbRuchers+1){
            $window[rucher].off("scroll");
            clearInterval(tScroll[rucher]);
            slider_ruchers.slidePageFrom($("#nouveaurucher"));
        }
        $("#sous_titre_accueil").children("h1").html("Nouveau rucher");
        rucher=nbRuchers+1;
        $("#nav_gauche_rucher").off("click");
        $("#nav_droite_rucher").off("click");
        if(rucher==1)$("#nav_gauche_rucher").css("visibility","hidden");
        else {
            $("#nav_gauche_rucher").css("visibility","visible");
            $("#nav_gauche_rucher").click(function(){allerAuRucher(rucher-1);});
        }
        $("#nav_droite_rucher").css("visibility","hidden");
        //
        createHiveGroup(function(){getListHiveGroups(function() {
                                                     console.log("récupération des listes de ruches par rucher");
                                                     getHivesForHiveGroups(1);
                                                     });});
   
    }
    
}
function allerAuRucher(k){
    if(!transitionEnCours&&!slider_ruchers.enTransition){
        $("#sous_titre_accueil").children("h1").html(donneesRuches.hivegroups[k-1].name);
        var change=false;
        if(rucher!=k){change=true;}
        if(rucher<=nbRuchers){
         $window[rucher].off("scroll");
         clearInterval(tScroll[rucher]);
        }
        
        left=rucher>k;
        rucher=k;
        idHiveGroup = k - 1;
        if(change)slider_ruchers.slidePageFrom($("#rucher"+rucher),(left?"left":"right"));
        
        if(nbRuches[rucher]==0){
            //Mieux placer le bouton + quand il est tout seul sur la page
        
        }else{
            $window[rucher].scrollTop((rucheSelect2[rucher]-1)*h);
            $window[rucher].scroll(function(){defiler(rucher);});
            tScroll[rucher] = setInterval(function(){defiler(rucher);}, 100);
        }
        $("#nav_droite_rucher").css("visibility","visible");
        if(rucher==1)$("#nav_gauche_rucher").css("visibility","hidden");
        else $("#nav_gauche_rucher").css("visibility","visible");
        if(rucher==nbRuchers)$("#nav_droite_rucher").html("+");
        else $("#nav_droite_rucher").html(">");
        
        
        $("#nav_gauche_rucher").off("click");
        $("#nav_droite_rucher").off("click");
        function rucherPrecedent(){if(rucher>1)allerAuRucher(rucher-1);}
        function rucherSuivant(){if(rucher<nbRuchers){allerAuRucher(rucher+1);}else if(rucher==nbRuchers){nouveauRucher();}}
        $("#nav_gauche_rucher").click(rucherPrecedent);
        $("#nav_droite_rucher").click(rucherSuivant);
        
        liensAccueil(rucher);
        
        $("#ruche"+rucher+"plus").click(function(){createHive();});
        var element = document.getElementById('rucher'+rucher);
        Hammer(element).off("swipeleft");
        Hammer(element).off("swiperight");
        Hammer(element).on("swipeleft", rucherSuivant);
        Hammer(element).on("swiperight", rucherPrecedent);

    }
    
}

function liensAccueil(r){
    for(var i=1;i<=nbRuches[r];i++){
        
        $("#ruche"+rucher+"_"+rucheSelect[r]).find(".ruche_grise").css("display","none");
        $("#ruche"+r+"_"+i+"_selectionnee_supprimer").css("cursor","pointer");
        $("#ruche"+r+"_"+i+"_selectionnee_supprimer").click( function(e) { $(this).off("click");
                                                            e.preventDefault();
                                                            console.log($(".ruche_selectionnee_reglages").index());
                                                            var i,j,idd;
                                                            idd=$(this).attr('id');
                                                            var t = idd.substr(5,idd.length-5).split("_");
                                                            i=t[0]-1;
                                                            j=t[1]-1;
                                                            idHiveGroup = i;
                                                            idHive = j;
                                                            deleteHive(donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive,function(){getListHiveGroups(function() {
//console.log("récupération des listes de ruches par rucher");
                                                                                                                                                                getHivesForHiveGroups(1);
                                                                                                                                                                });});
                                                            });
        $("#ruche"+r+"_"+i+"_selectionnee_reglages").click( function(e) { $(this).off("click");
                                                           e.preventDefault();
                                                           e.preventDefault();
                                                           console.log($(".ruche_selectionnee_reglages").index());
                                                           var i,j,idd;
                                                           idd=$(this).attr('id');
                                                           var t = idd.substr(5,idd.length-5).split("_");
                                                           i=t[0]-1;
                                                           j=t[1]-1;
                                                           idHiveGroup = i;
                                                           idHive = j;
                                                           
                                                           console.log($(".ruche_selectionnee_reglages").index());
                                                           goToHiveParameters();
                                                           });

        if(donneesRuches.hivegroups[r-1].hives[i-1].data){
        
        $("#ruche"+r+"_"+i+"_selectionnee_courbes").click( function(e) { $(this).off("click");
                                                           e.preventDefault();
                                                           console.log($(".ruche_selectionnee_reglages").index());
                                                          var i,j,idd;
                                                          idd=$(this).attr('id');
                                                          var t = idd.substr(5,idd.length-5).split("_");
                                                          i=t[0]-1;
                                                          j=t[1]-1;
                                                          idHiveGroup = i;
                                                          idHive = j;
                                                           goToGraphs(donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive,donneesRuches.hivegroups[idHiveGroup].hives[idHive].name);
                                                           });
        $("#ruche"+r+"_"+i+"_selectionnee_historique").click( function(e) { $(this).off("click");
                                                          e.preventDefault();
                                                          console.log($(".ruche_selectionnee_reglages").index());
                                                          var i,j,idd;
                                                          idd=$(this).attr('id');
                                                          var t = idd.substr(5,idd.length-5).split("_");
                                                          i=t[0]-1;
                                                          j=t[1]-1;
                                                          idHiveGroup = i;
                                                          idHive = j;
                                                          goToHistorique(donneesRuches.hivegroups[idHiveGroup].hives[idHive].id_hive,donneesRuches.hivegroups[idHiveGroup].hives[idHive].name);
                                                          });

        $("#ruche"+r+"_"+i).find(".ruche_selectionnee_infos").click( function(e) { $(this).off("click");
                                                                    e.preventDefault();
                                                                    console.log($(this)[0].id);
                                                                    
                                                                    var i,j,idd;
                                                                    idd=$(this).parent().parent().parent().attr('id');
                                                                    var t = idd.substr(5,idd.length-5).split("_");
                                                                    i=t[0]-1;
                                                                    j=t[1]-1;
                                                                    idHiveGroup = i;
                                                                    idHive = j;
                                                                    
                                                                    if(donneesRuches.hivegroups[i].hives[j].data)goToDataHive();
                                                                    });
        }
    }
}

function defiler(rucher){
	if(slider.cPage().attr("id")=="paccueil"){
		rucheSelect2[rucher]=Math.round(($window[rucher].scrollTop())/h)+1;
		if(rucheSelect2[rucher]>nbRuches[rucher]){
			rucheSelect2[rucher]=nbRuches[rucher];
		}
	    if(rucheSelect2[rucher]!=rucheSelect[rucher]&&(!transitionEnCours)){//Changement de ruche selectionnée rucheSelect->rucheSelect2[rucher]
	        transitionEnCours=true;
	        setTimeout(function(){ transitionEnCours=false; }, t);
        
	        //Decalage vers la gauche si la ruche selectionnée est à droite
	        var decal = (rucheSelect2[rucher]%2==1)*0.5*w;
	        //Toutes les autres ruches se décalent si il y a changement de côté
 		 	for(i=1;(i<=nbRuches[rucher]&&$("#ruche"+rucher+"_"+i).length); i++){
                if(i!=rucheSelect[rucher]&&i!=rucheSelect2[rucher])$("#ruche"+rucher+"_"+i).css({"right":(((i%2==0)?0.5*w:0)+decal)+"px"});
            }
			
			
	        $("#ruche"+rucher+"_"+rucheSelect[rucher]).children(".fond_ruche_selectionnee").css("opacity","0");
	        $("#ruche"+rucher+"_"+rucheSelect[rucher]).children(".fond_ruche_grise").css("opacity","1");
	        $("#ruche"+rucher+"_"+rucheSelect2[rucher]).children(".fond_ruche_selectionnee").css("opacity","1");
	        $("#ruche"+rucher+"_"+rucheSelect2[rucher]).children(".fond_ruche_grise").css("opacity","0");
	        $("#ruche"+rucher+"_"+rucheSelect[rucher]).children(".ruche_contenu").children(".ruche_selectionnee").css("opacity","0");
	        $("#ruche"+rucher+"_"+rucheSelect2[rucher]).children(".ruche_contenu").children(".ruche_selectionnee").css("opacity","1");
	        $("#ruche"+rucher+"_"+rucheSelect[rucher]).children(".ruche_contenu").children(".ruche_grise").css("opacity","1");
	        $("#ruche"+rucher+"_"+rucheSelect2[rucher]).children(".ruche_contenu").children(".ruche_grise").css("opacity","0");
			
			if(!donneesRuches.hivegroups[rucher-1].hives[rucheSelect2[rucher]-1].data){griser(rucher,rucheSelect2[rucher]);}
			$("#ruche"+rucher+"plus").css({"right":((((nbRuches[rucher]+1)%2==0)?0.5*w:0)+decal )+"px"});
			
	        if(rucheSelect2[rucher]<rucheSelect[rucher]){//On remonte
	            //L'ancienne ruche selectionnée rétrécit, devient grise, le contenu détaillé disparait
	            $("#ruche"+rucher+"_"+rucheSelect[rucher]).css({"right":(((rucheSelect[rucher]%2==0)?0.5*w:0)+decal)+"px","top":(getTop(rucher+"_"+rucheSelect[rucher])+(h2-h))+"px","width":"50%"});
                
                $("#ruche"+rucher+"_"+rucheSelect[rucher]).find(".ruche_grise").css("display","block");

                

                
	            //La nouvelle ruche selectionnée grandit, devient jaune, le contenu détaillé apparait
	            $("#ruche"+rucher+"_"+rucheSelect2[rucher]).css({"right":"0","width":"100%"});
	            //Les ruches entre la ruche anciennement selectionnée et la ruche nouvellement selectionnée se décalent verticalement vers le bas
	            for(i=rucheSelect2[rucher]+1;i<=rucheSelect[rucher];i++){
	               $("#ruche"+rucher+"_"+i).css({"top":(getTop(rucher+"_"+i)+(h2-h))+"px"});
	            }
            

            
	        }else{//On redescend			
	            //L'ancienne ruche selectionnée rétrécit, devient grise, le contenu détaillé disparait
	            $("#ruche"+rucher+"_"+rucheSelect[rucher]).css({"right":(((rucheSelect[rucher]%2==0)?0.5*w:0)+decal)+"px","width":"50%"});
	            //La nouvelle ruche selectionnée grandit, devient jaune, le contenu détaillé apparait
	            $("#ruche"+rucher+"_"+rucheSelect2[rucher]).css({"right":"0","width":"100%"});
	            //Les ruches entre la ruche anciennement selectionnée et la ruche nouvellement selectionnée se décalent verticalement vers le haut
	            for(i=rucheSelect[rucher]+1;i<=rucheSelect2[rucher];i++){
	               $("#ruche"+rucher+"_"+i).css({"top":(getTop(rucher+"_"+i)-(h2-h))+"px"});
	            }
            
	        }
            
            $("#ruche"+rucher+"_"+rucheSelect[rucher]).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                                                           $("#ruche"+rucher+"_"+rucheSelect2[rucher]).find(".ruche_grise").css("display","none");
                                                           });
            
            
	        rucheSelect[rucher]=rucheSelect2[rucher];
	    }
    
   }
}
function getTop(n){return parseInt($("#ruche"+n).css("top").replace("px",""));}
function getRight(n){return parseInt($("#ruche"+n).css("right").replace("px",""));}

function organiserRuches(rucher){
    
    rucheSelect[rucher]=1;
    rucheSelect2[rucher]=1;
    
    var maxi=0;
    //Decalage vers la gauche si la ruche selectionnée est à droite
    var decal = (rucheSelect[rucher]%2==1)*0.5*w;
	
    if(nbRuches[rucher]>0){
        for(i=1;i<=nbRuches[rucher]&&$("#ruche"+rucher+"_"+i).length; i++){
            maxi=i;
            $("#ruche"+rucher+"_"+i).children(".fond_ruche_selectionnee").css("opacity","0");
            $("#ruche"+rucher+"_"+i).children(".ruche_contenu").children(".ruche_selectionnee").css("opacity","0");
            if(i==rucheSelect[rucher]){
				$("#ruche"+rucher+"_"+rucheSelect[rucher]).css('width','100%');
                $("#ruche"+rucher+"_"+rucheSelect[rucher]).children(".fond_ruche_selectionnee").css("opacity","1");
                $("#ruche"+rucher+"_"+rucheSelect[rucher]).children(".fond_ruche_grise").css("opacity","0");
                $("#ruche"+rucher+"_"+rucheSelect[rucher]).children(".ruche_contenu").children(".ruche_selectionnee").css("opacity","1");
                $("#ruche"+rucher+"_"+rucheSelect[rucher]).children(".ruche_contenu").children(".ruche_grise").css("opacity","0");
                $("#ruche"+rucher+"_"+rucheSelect[rucher]).css({"top":(h*(0.76*(i-1))+decalTop)+'px',"right":"0"});
                if(!donneesRuches.hivegroups[rucher-1].hives[i-1].data){griser(rucher,i);}
            }else{
				d=0;
				if(i>rucheSelect[rucher])d=(h2-h);
                _("ruche"+rucher+"_"+i).style.top = (d+decalTop+h*(0.76*(i-1)))+'px';
                _("ruche"+rucher+"_"+i).style.right = (decal+w*(0.5*((i%2==0)?1:0)))+'px';
            }
			console.log(i+" "+_("ruche"+rucher+"_"+i).style.top+", "+_("ruche"+rucher+"_"+i).style.right);
        }
    }else{
        afficherBd("Vous n'avez aucune ruche référencée sur nos serveurs pour l'instant. Rendez-vous sur www.label-abeille.org.","OK")
    }
    if(nbRuches[rucher]==0){
        $("#ruche"+rucher+"plus").css({"margin":"auto"});
        
    }else{
        _("ruche"+rucher+"plus").style.top = ((h2-h)+decalTop+h*(0.76*maxi))+'px';
        _("ruche"+rucher+"plus").style.right = (decal+w*(0.5*(((maxi+1)%2==0)?1:0)))+'px';
        //$("#rucheplus").attr("id")="ruche"+(maxi+1);
        $("#rucher"+rucher).children(".ruches").append('<div style="position:absolute;width:100%;top:'+((h2-h)+decalTop+h*(0.76*(maxi+1)))+'px;height:'+(hruches/2)+'px"></div>');
        

    }
    
    for(i=1;i<=nbRuches[rucher]; i++){
        $("#ruche"+rucher+"_"+i).css("transition-duration",(t/1000)+"s");
        $("#ruche"+rucher+"_"+i).children(".fond_ruche_selectionnee").css("transition-duration",(t/1000)+"s");
        $("#ruche"+rucher+"_"+i).children(".fond_ruche_grise").css("transition-duration",(t/1000)+"s");
        $("#ruche"+rucher+"_"+i).children(".ruche_contenu").children(".ruche_selectionnee").css("transition-duration",(t/1000)+"s");
        $("#ruche"+rucher+"_"+i).children(".ruche_contenu").children(".ruche_grise").css("transition-duration",(t/1000)+"s");
        
        
        //Accélération matérielle
        $("#ruche"+rucher+"_"+i).css("transform","translateZ(0)");
        $("#ruche"+rucher+"_"+i).children(".fond_ruche_grise").css("transform","translateZ(0)");
        $("#ruche"+rucher+"_"+i).children(".fond_ruche_selectionnee").css("transform","translateZ(0)");
        $("#ruche"+rucher+"_"+i).children(".fond_ruche_contenu").css("transform","translateZ(0)");
        $("#ruche"+rucher+"_"+i).children(".fond_ruche_contenu").children(".ruche_selectionnee").css("transform","translateZ(0)");
        $("#ruche"+rucher+"_"+i).children(".fond_ruche_contenu").children(".ruche_grise").css("transform","translateZ(0)");
    }
    
    $("#ruche"+rucher+"plus").css("transition-duration",(t/1000)+"s");
    $("#ruche"+rucher+"plus").css("transform","translateZ(0)");//Accélération matérielle
    
    

    
}
