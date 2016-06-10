function transition(p2,mode){
	if(mode=="retour")slider.slidePageFrom(p2,"left");
	else slider.slidePageFrom(p2,"right");
}

function retour(){slider.slidePageFrom(null,"left");}




function PageSlider(container,pageinit,reserve,classPage) {

    var container = container;
    var currentPage=pageinit;
    this.currentPageName=$(pageinit).attr("id");
    var exclureHisto=["pajoutnotepersonnalisee"];
    this.enTransition=false;
    var hist = [];
    
    this.cPage = function(){return currentPage;}
    
    // Use this function directly if you want to control the sliding direction outside PageSlider
    this.slidePageFrom = function(dest, from) {
        if($(dest).attr("id")==currentPage.attr("id")){return;}

    	//console.log('slidePageFrom : begin, enTransition='+enTransition);
        if(!this.enTransition&&!enCharge){
        	//console.log('slidePageFrom : isNotEnTransition');
	        this.enTransition=true;
			if(dest==null){
                dest=currentPage;
                while(dest.attr("id")==currentPage.attr("id")){
                    dest=$(hist.pop());// si aucune destination n'est demandée, la destination est la dernière page visitée précedemment
                }
	            if(dest.attr("id")=="paccueil"){
                    if(rechargerAccueil){
                        rechargerAccueil=false;
                        this.enTransition=false;
                        getListHiveGroups(function() {
                            console.log("récupération des listes de ruches par rucher");
                            getHivesForHiveGroups(1);
                        });
                        return;
                    }else{
                        goToListHives(1);
                    }
	            }
	            if(dest.attr("id")=="pconnexion"){
	                connect();
	            }
			}
			else{
				dest=$(dest);
				if(exclureHisto.indexOf(currentPage.attr("id"))==-1)hist.push(currentPage);
			}
            
            
	        container.append(dest);
            


	
	        // Position the page at the starting position of the animation
	        dest.attr("class", classPage+" " + from);
            var a = this;
	        currentPage.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
	        	//console.log('slidePageFrom : webkitTransitionEnd');
	                        a.enTransition=false;
	            $(e.target).remove();
				reserve.append(e.target);
                            
	        });
	
	        // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
	        container[0].offsetWidth;
	
	        // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
	        dest.attr("class", classPage+" transition center");
	        currentPage.attr("class", classPage+" transition " + (from === "left" ? "right" : "left"));
	        currentPage = dest;
            this.currentPageName = $(dest).attr("id");

            activerBoutons();
            
        }
    	//console.log('slidePageFrom : end, enTransition='+enTransition);
    };
}

/**
 * enter in the "test" part of the app
 */
function tester(){
	isTest=true;
    donneesRuches=test;
	getListHives(goToListHives);
}
