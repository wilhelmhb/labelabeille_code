var h,h2,hruches,w;
var nbRuches;
var rucheSelect=3;
var rucheSelect2=3;
var transitionEnCours=false;
var $window;
var decalTop;
var firstAccueil=true;
var t=500;




function initAccueil(){
	if(firstAccueil){
		$("#ruche"+rucheSelect).css('width','100%');
	    if(_("ruche1").offsetHeight != null) {
	        //console.log('ok');
	        h = _("ruche1").offsetHeight;
	        h2 = _("ruche"+rucheSelect).offsetHeight;
	        hruches = _("ruches").offsetHeight;
	    }
	    else {
	        console.log(_("ruche1").pixelHeight != null);
	        if(_("ruche1").style.pixelHeight) {
	            h = _("ruche1").style.pixelHeight;
	            h2 = _("ruche"+rucheSelect).style.pixelHeight;
            
	        }
	        else {
	            console.log("ProblèmeH");
	        }
	    }
	    if(_("ruche1").offsetWidth != null) {
	        w = _("ruche1").offsetWidth;
	    }
	    else {
	        if(_("ruche1").style.pixelWidth != null){
	            w = _("ruche1").style.pixelWidth;
	        }
	        else {
	            console.log("ProblèmeW");
	        }
	    }
	    decalTop=h;
		hruches=1.7*h;
		firstAccueil=false;
	}
}

function accueil(n){
	nbRuches=n;
   	initAccueil();
    $window = $("#ruches");
    organiserRuches(nbRuches);
    $window.scrollTop((rucheSelect2-1)*h);
    $window.scroll(defiler);
    var tScroll = setInterval(defiler, 100);	
	
 	for(i=1;(i<=nbRuches&&$("#ruche"+i).length); i++){
	
	    $("#ruche"+i).css("transition-duration",(t/1000)+"s");
	    $("#ruche"+i).children(".fond_ruche_selectionnee").css("transition-duration",(t/1000)+"s");
	    $("#ruche"+i).children(".fond_ruche_grise").css("transition-duration",(t/1000)+"s");
	    $("#ruche"+i).children(".ruche_contenu").children(".ruche_selectionnee").css("transition-duration",(t/1000)+"s");
	    $("#ruche"+i).children(".ruche_contenu").children(".ruche_grise").css("transition-duration",(t/1000)+"s");
	
	
	    //Accélération matérielle
	    $("#ruche"+i).css("transform","translateZ(0)");
	    $("#ruche"+i).children(".fond_ruche_grise").css("transform","translateZ(0)");
	    $("#ruche"+i).children(".fond_ruche_selectionnee").css("transform","translateZ(0)");
		$("#ruche"+i).children(".fond_ruche_contenu").css("transform","translateZ(0)");
	    $("#ruche"+i).children(".fond_ruche_contenu").children(".ruche_selectionnee").css("transform","translateZ(0)");
	    $("#ruche"+i).children(".fond_ruche_contenu").children(".ruche_grise").css("transform","translateZ(0)");
	}
	
	$("#rucheplus").css("transition-duration",(t/1000)+"s");
    $("#rucheplus").css("transform","translateZ(0)");//Accélération matérielle
	
	$("#rucheplus").click(createHive);
	
	
};
function defiler(){
	if(currentPage.attr("id")=="paccueil"){
		rucheSelect2=Math.round(($window.scrollTop())/h)+1;
		if(rucheSelect2>nbRuches){
			rucheSelect2=nbRuches;
		}
	    if(rucheSelect2!=rucheSelect&&(!transitionEnCours)){//Changement de ruche selectionnée rucheSelect->rucheSelect2
	        transitionEnCours=true;
	        setTimeout(function(){ transitionEnCours=false; }, t);
        
	        //Decalage vers la gauche si la ruche selectionnée est à droite
	        var decal = (rucheSelect2%2==1)*0.5*w;
	        //Toutes les autres ruches se décalent si il y a changement de côté
 		 	for(i=1;(i<=nbRuches&&$("#ruche"+i).length); i++){ 
                if(i!=rucheSelect&&i!=rucheSelect2)$("#ruche"+i).css({"right":(((i%2==0)?0.5*w:0)+decal)+"px"});
            }
			
			
	        $("#ruche"+rucheSelect).children(".fond_ruche_selectionnee").css("opacity","0");
	        $("#ruche"+rucheSelect).children(".fond_ruche_grise").css("opacity","1");
	        $("#ruche"+rucheSelect2).children(".fond_ruche_selectionnee").css("opacity","1");
	        $("#ruche"+rucheSelect2).children(".fond_ruche_grise").css("opacity","0");
	        $("#ruche"+rucheSelect).children(".ruche_contenu").children(".ruche_selectionnee").css("opacity","0");
	        $("#ruche"+rucheSelect2).children(".ruche_contenu").children(".ruche_selectionnee").css("opacity","1");
	        $("#ruche"+rucheSelect).children(".ruche_contenu").children(".ruche_grise").css("opacity","1");
	        $("#ruche"+rucheSelect2).children(".ruche_contenu").children(".ruche_grise").css("opacity","0");
			
			
			
			$("#rucheplus").css({"right":((((nbRuches+1)%2==0)?0.5*w:0)+decal )+"px"});
			
	        if(rucheSelect2<rucheSelect){//On remonte
	            //L'ancienne ruche selectionnée rétrécit, devient grise, le contenu détaillé disparait
	            $("#ruche"+rucheSelect).css({"right":(((rucheSelect%2==0)?0.5*w:0)+decal)+"px","top":(getTop(rucheSelect)+(h2-h))+"px","width":"50%"});
	            //La nouvelle ruche selectionnée grandit, devient jaune, le contenu détaillé apparait
	            $("#ruche"+rucheSelect2).css({"right":"0","width":"100%"});
	            //Les ruches entre la ruche anciennement selectionnée et la ruche nouvellement selectionnée se décalent verticalement vers le bas
	            for(i=rucheSelect2+1;i<=rucheSelect;i++){
	               $("#ruche"+i).css({"top":(getTop(i)+(h2-h))+"px"});
	            }
            

            
	        }else{//On redescend			
	            //L'ancienne ruche selectionnée rétrécit, devient grise, le contenu détaillé disparait
	            $("#ruche"+rucheSelect).css({"right":(((rucheSelect%2==0)?0.5*w:0)+decal)+"px","width":"50%"});
	            //La nouvelle ruche selectionnée grandit, devient jaune, le contenu détaillé apparait
	            $("#ruche"+rucheSelect2).css({"right":"0","width":"100%"});
	            //Les ruches entre la ruche anciennement selectionnée et la ruche nouvellement selectionnée se décalent verticalement vers le haut
	            for(i=rucheSelect+1;i<=rucheSelect2;i++){
	               $("#ruche"+i).css({"top":(getTop(i)-(h2-h))+"px"});
	            }
            
	        }
        
	        rucheSelect=rucheSelect2;
	    }
    
   }
}
function getTop(n){return parseInt($("#ruche"+n).css("top").replace("px",""));}
function getRight(n){return parseInt($("#ruche"+n).css("right").replace("px",""));}

function organiserRuches(){
    var maxi=0;
    //Decalage vers la gauche si la ruche selectionnée est à droite
    var decal = (rucheSelect2%2==1)*0.5*w;
	
    if(nbRuches>0){
        for(i=1;i<=nbRuches&&$("#ruche"+i).length; i++){
            maxi=i;
            $("#ruche"+i).children(".fond_ruche_selectionnee").css("opacity","0");
            $("#ruche"+i).children(".ruche_contenu").children(".ruche_selectionnee").css("opacity","0");
            if(i==rucheSelect){
				$("#ruche"+rucheSelect).css('width','100%');
                $("#ruche"+rucheSelect).children(".fond_ruche_selectionnee").css("opacity","1");
                $("#ruche"+rucheSelect).children(".fond_ruche_grise").css("opacity","0");
                $("#ruche"+rucheSelect).children(".ruche_contenu").children(".ruche_selectionnee").css("opacity","1");
                $("#ruche"+rucheSelect).children(".ruche_contenu").children(".ruche_grise").css("opacity","0");
                $("#ruche"+rucheSelect).css({"top":(h*(0.76*(i-1))+decalTop)+'px',"right":"0"});
            }else{
				d=0;
				if(i>rucheSelect)d=(h2-h);
                _("ruche"+i).style.top = (d+decalTop+h*(0.76*(i-1)))+'px';
                _("ruche"+i).style.right = (decal+w*(0.5*((i%2==0)?1:0)))+'px';
            }
			console.log(i+" "+_("ruche"+i).style.top+", "+_("ruche"+i).style.right);
        }
    }else{
        afficherBd("Vous n'avez aucune ruche référencée sur nos serveurs pour l'instant. Rendez-vous sur www.label-abeille.org.","OK")
    }
    _("rucheplus").style.top = ((h2-h)+decalTop+h*(0.76*(i-1)))+'px';
    _("rucheplus").style.right = (decal+w*(0.5*((i%2==0)?1:0)))+'px';
	//$("#rucheplus").attr("id")="ruche"+(maxi+1);
    $("#ruches").append('<div style="position:absolute;width:100%;top:'+((h2-h)+decalTop+h*(0.76*maxi + 0.24))+'px;height:'+hruches+'px"></div>');
    //METTRE LE CODE ICI POUR LES LIENS VERS LA PAGE DETAILS QUAND ON CLIQUE SUR UNE RUCHE
}
