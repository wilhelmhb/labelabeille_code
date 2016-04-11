var h,h2,hruches,w;
var nbRuches;
var rucheSelect=2;
var rucheSelect2=2;
var transitionEnCours=false;
var $window;
var decalTop;
var firstAccueil=true;
function reinitAccueil(){
    $window = $("#ruches");
    $window.scrollTop((rucheSelect2-1)*h);
}
function accueil(n){
	nbRuches=n;
    $("#ruche2").css('width','100%');
    if(_("ruche1").offsetHeight != null) {
        //console.log('ok');
        h = _("ruche1").offsetHeight;
        h2 = _("ruche2").offsetHeight;
    }
    else {
        console.log(_("ruche1").pixelHeight != null);
        if(_("ruche1").style.pixelHeight) {
            h = _("ruche1").style.pixelHeight;
            h2 = _("ruche2").style.pixelHeight;
            
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
    console.log(h+","+w);
    decalTop=h;
	hruches=1.7*h;
    organiserRuches(nbRuches);
	if(firstAccueil){firstAccueil=false;reinitAccueil();}
    $window.scroll(defiler);
    var tScroll = setInterval(defiler, 100);
			 
};
function defiler(){
	if(currentPage.attr("id")=="paccueil"){
		rucheSelect2=Math.round(($window.scrollTop())/h)+1;
		if(rucheSelect2>nbRuches){
			rucheSelect2=nbRuches;
		}
	    if(rucheSelect2!=rucheSelect&&(!transitionEnCours)){//Changement de ruche selectionnée rucheSelect->rucheSelect2
	        transitionEnCours=true;
	        var t=500;
	        setTimeout(function(){ transitionEnCours=false; }, t);
        
	        //Decalage vers la gauche si la ruche selectionnée est à droite
	        var decal = (rucheSelect2%2==1)*0.5*w;
	        //Toutes les autres ruches se décalent si il y a changement de côté
	 		 		 	for(i=1;(i<=nbRuches&&$("#ruche"+i).length); i++){
	                        $("#ruche"+i).css("transition-duration",(t/1000)+"s");
                        
                            $("#ruche"+i).children(".fond_ruche_selectionnee").css("transform","translateZ(0)");
	                        $("#ruche"+i).children(".fond_ruche_selectionnee").css("transition-duration",(t/1000)+"s");
	                        $("#ruche"+i).children(".fond_ruche_grise").css("transition-duration",(t/1000)+"s");
                            
                            //Accélération matérielle
                            $("#ruche"+i).children(".fond_ruche_grise").css("transform","translateZ(0)");
                            $("#ruche"+i).children(".fond_ruche_contenu").children(".ruche_selectionnee").css("transform","translateZ(0)");
                            $("#ruche"+i).children(".fond_ruche_contenu").children(".ruche_grise").css("transform","translateZ(0)");

                            
	                        $("#ruche"+i).children(".ruche_contenu").children(".ruche_selectionnee").css("transition-duration",(t/1000)+"s");
	                        $("#ruche"+i).children(".ruche_contenu").children(".ruche_grise").css("transition-duration",(t/1000)+"s");
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
    if(nbRuches>0){
        for(i=1;(i<=nbRuches&&$("#ruche"+i).length); i++){
            maxi=i;
            $("#ruche"+i).children(".fond_ruche_selectionnee").css("opacity","0");
            $("#ruche"+i).children(".ruche_contenu").children(".ruche_selectionnee").css("opacity","0");
            if(i==1){
                _("ruche"+i).style.right = "0";
                _("ruche"+i).style.top = decalTop+'px';
            }
            else if(i==rucheSelect){
                $("#ruche"+rucheSelect).children(".fond_ruche_selectionnee").css("opacity","1");
                $("#ruche"+rucheSelect).children(".fond_ruche_grise").css("opacity","0");
				
                $("#ruche"+rucheSelect).children(".ruche_contenu").children(".ruche_selectionnee").css("opacity","1");
                $("#ruche"+rucheSelect).children(".ruche_contenu").children(".ruche_grise").css("opacity","0");
                $("#ruche"+rucheSelect2).css({"top":(h*(0.76*(i-1))+decalTop)+'px',"right":"0"});
            }else{
                _("ruche"+i).style.top = ((h2-h)+decalTop+h*(0.76*(i-1)))+'px';
                _("ruche"+i).style.right = w*(0.5*((i%2==0)?1:0))+'px';
            }
			/*$("#ruche"+i).find(".ruche_selectionnee_reglages").css("opacity","0");
	
			_("ruche"+i).addEventListener("click",function(){
				if(!enCharge){
					var k = $(this).find("h2").text();
					var n = $(this).find(".ruche_grise").find("h1").text();
					//console.log(k);
					//console.log(n)
					k = k.substring(1, k.length-1);
					//console.log(k);
					rucheSelect2=parseInt($(this).attr("id").replace("ruche",""));
				    $window.scrollTop((rucheSelect2-1)*h);
					getDataHive(k, n, goToDataHives);
				}			
			});*/
		}
    }else{
        afficherBd("Vous n'avez aucune ruche référencée sur nos serveurs pour l'instant. Rendez-vous sur www.label-abeille.org.","OK")
    }
    $("#ruches").append('<div style="position:absolute;width:100%;top:'+((h2-h)+decalTop+h*(0.76*maxi + 0.24))+'px;height:'+hruches+'px"></div>');
    
}
