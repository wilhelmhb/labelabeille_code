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




function initAccueil(){
	if(firstAccueil){
	    if(_("ruche1_1").offsetHeight != null) {
	        //console.log('ok');
	        h = _("ruche1_1").offsetHeight;
	        h2 = _("rucheselect").offsetHeight;
	        hruches = _("rucher1").offsetHeight;
	    }
	    else {
	        console.log(_("ruche1_1").pixelHeight != null);
	        if(_("ruche1_1").style.pixelHeight) {
	            h = _("ruche1_1").style.pixelHeight;
	            h2 = _("rucheselect").style.pixelHeight;
            
	        }
	        else {
	            console.log("ProblèmeH");
	        }
	    }
	    if(_("ruche1_1").offsetWidth != null) {
	        w = _("ruche1_1").offsetWidth;
	    }
	    else {
	        if(_("ruche1_1").style.pixelWidth != null){
	            w = _("ruche1_1").style.pixelWidth;
	        }
	        else {
	            console.log("ProblèmeW");
	        }
	    }
        decalTop=h;
		firstAccueil=false;
       
       // alert(h+" "+h2+" "+hruches+" "+w);
	}
}
var rucher=1;
var slider_ruchers;
var $window=[];
var tScroll=[];
function accueil(){
    nbRuchers=datahives.hivegroups.length;
    console.log("Nb de ruchers : "+nbRuchers);
    
    
    
    $("#rucher"+rucher).appendTo("#conteneur-rucher");
    
    initAccueil();
    
    for(var m=1;m<=nbRuchers;m++){
        nbRuches[m]=datahives.hivegroups[m-1].hives.length;
        console.log("Nb de ruches dans le rucher "+m+" : "+nbRuches[m]);
        $window[m] = $("#rucher"+m).children(".ruches");
        organiserRuches(m);

    }
    

    //$("#rucher2").css('display','none');
    

    
    
    
    
    
    
    
    
    slider_ruchers = new PageSlider($("#conteneur-rucher"),$("#rucher"+rucher),$("#reserve-ruchers"),"page");
    allerAuRucher(rucher);

    

	
};

function allerAuRucher(k){
    $("#sous_titre_accueil").children("h1").html(donneesRuches.hivegroups[k-1].name);
    if(!transitionEnCours){
        var change=false;
        if(rucher!=k){change=true;}
        $window[rucher].off("scroll");
        clearInterval(tScroll[rucher]);
        left=rucher>k;
        rucher=k;

        if(change)slider_ruchers.slidePageFrom($("#rucher"+rucher),(left?"left":"right"));
        $window[rucher].scrollTop((rucheSelect2[rucher]-1)*h);
        $window[rucher].scroll(function(){defiler(rucher);});
        tScroll[rucher] = setInterval(function(){defiler(rucher);}, 100);
    
        if(rucher==1)$("#nav_gauche_rucher").css("visibility","hidden");
        else $("#nav_gauche_rucher").css("visibility","visible");
        if(rucher==nbRuchers)$("#nav_droite_rucher").css("visibility","hidden");
        else $("#nav_droite_rucher").css("visibility","visible");
        
        
        $("#nav_gauche_rucher").off("click");
        $("#nav_droite_rucher").off("click");
        $("#nav_gauche_rucher").click(function(){if(rucher>1)allerAuRucher(rucher-1);});
        
        $("#nav_droite_rucher").click(function(){if(rucher<nbRuchers)allerAuRucher(rucher+1);});
        
        $("#ruche"+rucher+"plus").click(createHive);
        
        for(var r=1;r<=nbRuchers;r++){
            for(var i=1;i<=nbRuches[r];i++){
                //console.log(k);

                $("#ruche"+r+"_"+i+"_selectionnee_reglages").click(function(e) {
                                                                           e.preventDefault();
                                                                           //console.log($(".ruche_selectionnee_reglages").index());
                                                                           goToHiveParameters();
                                                                           });
                $("#ruche"+r+"_"+i).click( function(e) {
                                                  e.preventDefault();
                                                  //console.log($(this)[0].id);
                                                  
                                                  var i,j,idd;
                                                  idd=$(this).attr('id');
                                                  var t = idd.substr(5,idd.length-5).split("_");
                                                  i=t[0]-1;
                                                  j=t[1]-1;
                                                  
                                                  hive = donneesRuches.hivegroups[i].hives[j].data;
                                                  name = donneesRuches.hivegroups[i].hives[j].name;
                                                  
                                                  goToDataHives(name, hive);
                                                  });
            }
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
			
			
			
			$("#ruche"+rucher+"plus").css({"right":((((nbRuches[rucher]+1)%2==0)?0.5*w:0)+decal )+"px"});
			
	        if(rucheSelect2[rucher]<rucheSelect[rucher]){//On remonte
	            //L'ancienne ruche selectionnée rétrécit, devient grise, le contenu détaillé disparait
	            $("#ruche"+rucher+"_"+rucheSelect[rucher]).css({"right":(((rucheSelect[rucher]%2==0)?0.5*w:0)+decal)+"px","top":(getTop(rucher+"_"+rucheSelect[rucher])+(h2-h))+"px","width":"50%"});
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
            }else{
				d=0;
				if(i>rucheSelect[rucher])d=(h2-h);
                _("ruche"+rucher+"_"+i).style.top = (d+decalTop+h*(0.76*(i-1)))+'px';
                _("ruche"+rucher+"_"+i).style.right = (decal+w*(0.5*((i%2==0)?1:0)))+'px';
            }
			//console.log(i+" "+_("ruche"+rucher+"_"+i).style.top+", "+_("ruche"+rucher+"_"+i).style.right);
        }
    }else{
        afficherBd("Vous n'avez aucune ruche référencée sur nos serveurs pour l'instant. Rendez-vous sur www.label-abeille.org.","OK")
    }
    _("ruche"+rucher+"plus").style.top = ((h2-h)+decalTop+h*(0.76*maxi))+'px';
    _("ruche"+rucher+"plus").style.right = (decal+w*(0.5*(((maxi+1)%2==0)?1:0)))+'px';
	//$("#rucheplus").attr("id")="ruche"+(maxi+1);
    $("#rucher"+rucher).children(".ruches").append('<div style="position:absolute;width:100%;top:'+((h2-h)+decalTop+h*(0.76*(maxi+1)))+'px;height:'+(hruches/2)+'px"></div>');
    
    
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
