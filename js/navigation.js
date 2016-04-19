function transition(p2,mode,p1){
	//console.log('transition : begin');
	slider.slidePageFrom(p2,"right");
	//console.log('transition : end');
}

function retour(){slider.slidePageFrom(null,"left");}
function PageSlider(container,pageinit) {

    var container = container,
        enTransition=false,
        hist = [];
 	 currentPage=pageinit
    // Use this function directly if you want to control the sliding direction outside PageSlider
    this.slidePageFrom = function(dest, from) {
    	//console.log('slidePageFrom : begin, enTransition='+enTransition);
        if(!enTransition){
        	//console.log('slidePageFrom : isNotEnTransition');
	        enTransition=true;
			if(dest==null){
				dest=hist.pop();// si aucune destination n'est demandée, la destination est la dernière page visitée précedemment
			}
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
            if($(dest).attr("id")=="paccueil"){
                reinitAccueil();
            }
        }
    	//console.log('slidePageFrom : end, enTransition='+enTransition);
    };

}