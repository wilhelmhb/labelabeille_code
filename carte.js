// initialize the map when the page is loaded
google.maps.event.addDomListener( window, 'load', initialize);
    
function initialize() {
    /* definition of the global variables */
    var paths, markers, it, map, panel = document.getElementById('panel'), direction, index = 0, number, numberZ, width, height, lineType, recursion, color, mapType, travelMode, centerLat, centerLong, widthZ, heightZ, coordinatesAdditionnalMarkers;
    
    /** get the values of the inputs
     */
    function refreshValues() {
        number = document.getElementById('number').value;
	    numberZ = document.getElementById('numberZ').value;
        width = document.getElementById('width').value;
        height = document.getElementById('height').value;
        lineType = document.getElementById('lineType').value;
        recursion = document.getElementById('recursion').checked;
        color = document.getElementById('color').value;
        mapType = document.getElementById('mapType').value;
        var t = document.getElementById('coordinatesZ').querySelectorAll('input');
        coordinatesAdditionnalMarkers = [];
        for(var k = 0; k<t.length; k += 2) {
            coordinatesAdditionnalMarkers[k/2] = {lat: t[k].value, lng: t[k+1].value};
        }
        travelMode = document.getElementById('travelMode').value;
        centerLat = document.getElementById('centerLat').value;
        centerLong = document.getElementById('centerLong').value;
        widthZ = document.getElementById('widthZ').value;
        heightZ = document.getElementById('heightZ').value;
    };
    
    refreshValues();
    //console.log(mapType);
    var mapTypes = {
        map: google.maps.MapTypeId.ROADMAP,
        satellite: google.maps.MapTypeId.SATELLITE,
        earth: google.maps.MapTypeId.TERRAIN,
        hybrid: google.maps.MapTypeId.HYBRID
    };
    var travelModes = {
        driving: google.maps.DirectionsTravelMode.DRIVING,
        walking: google.maps.DirectionsTravelMode.WALKING,
        cycling: google.maps.DirectionsTravelMode.CYCLING
    };
    var X = '<ol style="padding: 0px"><div ><div style="position:relative" ><ol style="padding: 0px">'+
	    '<div><div style="display: inline-block; margin-right: 1px;"><ul style="padding: 0px;"><!--m--><div style="height:160px;width:159px">'+
	        '<img src="https://lh3.googleusercontent.com/-QIWtp8fPUZ0/AAAAAAAAAAI/AAAAAAAAABU/xveN1EU_iao/s0-c-k-no-ns/photo.jpg" style="margin: 0px -1px 0px 0px; height: 160px; width: 159px;" title="https://plus.google.com/101972866602445406434" alt="Résultat de recherche d\'images pour " ecole="" polytechnique""="">'+
	    '</div><!--n--></ul></div>'+
	    '<div style="display: inline-block;"><div style="height:160px;width:294px">'+
	        '<img src="https://www.google.fr/maps/vt/data=RfCSdfNZ0LFPrHSm0ublXdzhdrDFhtmHhN1u-gM,WoVkt4WymAoEEijU8xT6BuO2_OsyCXUNGtW1GqoZhKb_7fRRJ8CPSJNXvFd2aE_lVFNrhdtc2vrFuZ5H-2fKsvmZud7tBBTkEUAiZs8lWsE1WnzPgOpv9o2YBIhDm2f_u_Zr" title="Map of École polytechnique" alt="Map of École polytechnique">'+
	    '</div></div>'+
	    '</ol></div></div>'+
	    '<div style="clear:none"><div style="font-size: 30px; font-family: arial;">École polytechnique</div><div style="text-align: right; padding-right: 10px;"><div style="display: inline-block;"><a style="display: inline-block; color: rgb(68, 68, 68); margin: 2px 0px; background-color: rgb(245, 245, 245); border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 2px; cursor: default; font-family: arial,sans-serif; font-size: 11px; font-weight: bold; height: 27px; line-height: 27px; min-width: 54px; padding: 0px 8px; text-align: center; transition: all 0.218s ease 0s, visibility 0s ease 0s; -moz-user-select: none; text-decoration: none;" href="http://www.polytechnique.edu/">Site Web</a></div> <div style="display: inline-block;"><a style="display: inline-block; color: rgb(68, 68, 68); margin: 2px 0px; background-color: rgb(245, 245, 245); border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 2px; cursor: default; font-family: arial,sans-serif; font-size: 11px; font-weight: bold; height: 27px; line-height: 27px; min-width: 54px; padding: 0px 8px; text-align: center; transition: all 0.218s ease 0s, visibility 0s ease 0s; -moz-user-select: none; text-decoration: none;" href="https://www.google.fr/maps/dir/\'\'/ecole+polytechnique/data=!4m5!4m4!1m0!1m2!1m1!1s0x47e6788dd891b127:0x43c2be8ce6d1821e?sa=X&amp;ved=0ahUKEwjQ85Hp8PDKAhUBiRoKHXhUCQMQ9RcIfjAM">Itinéraire</a></div> </div></div>'+
	    '<div><span style="font-size: 13px; color: gray;">École d’ingénieur à Palaiseau, France</span></div>'+
	    '<div><!--m--><div><div><div><span>L\'École polytechnique, fréquemment appelée Polytechnique et surnommée en France l\'« X », est une école d\'ingénieurs française fondée en 1794 sous le nom d\'École centrale des travaux publics et militarisée en 1804 par Napoléon Iᵉʳ.</span><span><a href="http://fr.wikipedia.org/wiki/%C3%89cole_polytechnique_(France)">Wikipédia</a></span></div></div></div><!--n--></div>'+
	    '<div><!--m--><div><div><span><a style="color: rgb(34, 34, 34); cursor: pointer; font-family: arial,sans-serif; font-size: 13px; font-weight: 700; line-height: 16.1167px; text-decoration: none rgb(34, 34, 34);" href="https://www.google.fr/search?client=ubuntu&amp;hs=GMi&amp;channel=fs&amp;q=%C3%A9cole+polytechnique+adresse&amp;stick=H4sIAAAAAAAAAOPgE-LUz9U3MCwzSLLQks1OttLPyU9OLMnMz4MzrBJTUopSi4sByHzEySwAAAA&amp;sa=X&amp;ved=0ahUKEwjQ85Hp8PDKAhUBiRoKHXhUCQMQ6BMIhgEwEA">Adresse</a>&nbsp;: </span>'+
	    '<span>Route de Saclay, 91128 Palaiseau</span></div></div><!--n--></div>'+
	    '<div><!--m--><div><div><span><a style="color: rgb(34, 34, 34); cursor: pointer; font-family: arial,sans-serif; font-size: 13px; font-weight: 700; line-height: 16.1167px; text-decoration: none rgb(34, 34, 34);" href="https://www.google.fr/search?client=ubuntu&amp;hs=GMi&amp;channel=fs&amp;q=%C3%A9cole+polytechnique+cr%C3%A9ation&amp;stick=H4sIAAAAAAAAAOPgE-LUz9U3MCwzSLLQUs1OttLPL0pPzMusSizJzM9D4Vil5ZfmpaSmAAB1hVJ-NAAAAA&amp;sa=X&amp;ved=0ahUKEwjQ85Hp8PDKAhUBiRoKHXhUCQMQ6BMIiQEoADAR">Création</a>&nbsp;: </span><span>11 mars 1794</span></div></div><!--n--></div>'+
	    '<div><!--m--><div><div><span><a style="color: rgb(34, 34, 34); cursor: pointer; font-family: arial,sans-serif; font-size: 13px; font-weight: 700; line-height: 16.1167px; text-decoration: none rgb(34, 34, 34);" href="https://www.google.fr/search?client=ubuntu&amp;hs=GMi&amp;channel=fs&amp;q=%C3%A9cole+polytechnique+t%C3%A9l%C3%A9phone&amp;stick=H4sIAAAAAAAAAOPgE-LUz9U3MCwzSLLQ0s9OttJPzs_JSU0uyczP08_Oyy_PSU1JT40vSMxLzSnWz0gsji_IyM9LtQKTALOe5kU-AAAA&amp;sa=X&amp;ved=0ahUKEwjQ85Hp8PDKAhUBiRoKHXhUCQMQ6BMIjAEwEg">Téléphone</a>&nbsp;: </span><span><a title="Appeller avec Hangouts" style="color: rgb(26, 13, 171); cursor: pointer; font-family: arial,sans-serif; font-size: 13px; line-height: 16.1167px; text-decoration: none rgb(26, 13, 171);">01 69 33 33 33</a></span></div></div><!--n--></div>'+
	    '<div style="clear:none" ><!--m--><div><div><span><a style="color: rgb(34, 34, 34); cursor: pointer; font-family: arial,sans-serif; font-size: 13px; font-weight: 700; line-height: 16.1167px; text-decoration: none rgb(34, 34, 34);" href="https://www.google.fr/search?client=ubuntu&amp;hs=GMi&amp;channel=fs&amp;q=%C3%A9cole+polytechnique+nombre+d\'inscrits&amp;stick=H4sIAAAAAAAAAOPgE-LUz9U3MCwzSLLQMshOttJPTSlNTizJzM9DsBJz4jPziksyS0pBPKvUvKL8nJzc1LwSANUJkD4_AAAA&amp;sa=X&amp;ved=0ahUKEwjQ85Hp8PDKAhUBiRoKHXhUCQMQ6BMIkAEoADAT">Nombre d\'inscrits</a>&nbsp;: </span><span>2 944 (2014)</span></div></div><!--n--></div>'+
	    '<div><!--m--><div><div><span><a style="color: rgb(34, 34, 34); cursor: pointer; font-family: arial,sans-serif; font-size: 13px; font-weight: 700; line-height: 16.1167px; text-decoration: none rgb(34, 34, 34);" href="https://www.google.fr/search?client=ubuntu&amp;hs=GMi&amp;channel=fs&amp;q=%C3%A9cole+polytechnique+fondateurs&amp;stick=H4sIAAAAAAAAAOPgE-LUz9U3MCwzSLLQUs1OttLPL0pPzMusSizJzM9D4Vil5ZfmpaQWAQAkMIaKNAAAAA&amp;sa=X&amp;ved=0ahUKEwjQ85Hp8PDKAhUBiRoKHXhUCQMQ6BMIkwEoADAU">Fondateurs</a>&nbsp;: </span>'+
	    '<span><a style="color: rgb(26, 13, 171); cursor: pointer; font-family: arial,sans-serif; font-size: 13px; line-height: 16.1167px; text-decoration: none rgb(26, 13, 171);" href="https://www.google.fr/search?client=ubuntu&amp;hs=GMi&amp;channel=fs&amp;q=Napol%C3%A9on&amp;stick=H4sIAAAAAAAAAOPgE-LUz9U3MCwzSLJQ4gAxs0yTLLRUs5Ot9POL0hPzMqsSSzLz81A4Vmn5pXkpqUUAVLeayz4AAAA&amp;sa=X&amp;ved=0ahUKEwjQ85Hp8PDKAhUBiRoKHXhUCQMQmxMIlAEoATAU" data-ved="0ahUKEwjQ85Hp8PDKAhUBiRoKHXhUCQMQmxMIlAEoATAU">Napoléon Ier</a>, '+
	    '<a style="color: rgb(26, 13, 171); cursor: pointer; font-family: arial,sans-serif; font-size: 13px; line-height: 16.1167px; text-decoration: none rgb(26, 13, 171);" href="https://www.google.fr/search?client=ubuntu&amp;hs=GMi&amp;channel=fs&amp;q=Gaspard+Monge&amp;stick=H4sIAAAAAAAAAOPgE-LUz9U3MCwzSLJQ4gAxs5OzyrVUs5Ot9POL0hPzMqsSSzLz81A4Vmn5pXkpqUUAQXZZaz4AAAA&amp;sa=X&amp;ved=0ahUKEwjQ85Hp8PDKAhUBiRoKHXhUCQMQmxMIlQEoAjAU">Gaspard Monge</a>, '+
	    '<a style="color: rgb(26, 13, 171); cursor: pointer; font-family: arial,sans-serif; font-size: 13px; line-height: 16.1167px; text-decoration: none rgb(26, 13, 171);" href="https://www.google.fr/search?client=ubuntu&amp;hs=GMi&amp;channel=fs&amp;q=Lazare+Carnot&amp;stick=H4sIAAAAAAAAAOPgE-LUz9U3MCwzSLJQgjBNzPPytFSzk63084vSE_MyqxJLMvPzUDhWafmleSmpRQDPhypoPwAAAA&amp;sa=X&amp;ved=0ahUKEwjQ85Hp8PDKAhUBiRoKHXhUCQMQmxMIlgEoAzAU">Lazare Carnot</a></span></div></div><!--n--></div></ol>';
    var markersIcons = [
        'http://maps.google.com/mapfiles/marker_yellow.png', 
        'http://maps.google.com/mapfiles/marker_green.png',
        'http://maps.google.com/mapfiles/marker_purple.png',
        'http://maps.google.com/mapfiles/marker.png',
        'http://maps.google.com/mapfiles/marker_orange.png',
        'http://maps.google.com/mapfiles/marker_white.png',
        'http://maps.google.com/mapfiles/marker_black.png',
        'http://maps.google.com/mapfiles/marker_grey.png',
        'http://maps.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png'
    ];

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
    function createMarker(n, map, lat, long, url = '', height = null, width = null, originX = null, originY = null, anchorX = null, anchorY = null, scaleHeight = null, scaleWidth = null, optimized = null, title = null, content = '', action) {
        //console.log(lat+', '+long);
        /* if no url has been provided, pick up a random one in our list of register pointers */
        if(url == '') {
            var i = Math.floor(Math.random() * markersIcons.length);
            url = markersIcons[i];
            //console.log('url : '+url+' at location : '+i);
        }
        var icon = {url: url}; // intanciate the icon
        /* if  the sizes and positions have been specified, use them */
        if(width !== null && height !== null) {
            icon.size = new google.maps.Size(width, height);
        }
        if(scaleWidth !== null && scaleHeight !== null) {
		    icon.scaledSize = new google.maps.Size(scaleHeight, scaleWidth); // scaled size
        }
        if(originX !== null && originY !== null) {
            icon.origin = new google.maps.Point(originX, originY); // origin
        }
        if(anchorX !== null && anchorY !== null) {
            icon.anchor = new google.maps.Point(anchorX, anchorY); // anchor
        }
        
        /* instanciate the marker itself */
        var marker = {
            position: new google.maps.LatLng(lat, long), 
	        map: map,
	        icon : icon
        }
        /* take in count the specified options */
        if(optimized !== null) {
            marker.optimized = optimized;
        }
        if(title != null) {
            marker.title = title;
        }
        /* transform our marker into a google maps marker */
	    var marker = new google.maps.Marker(marker); 
	    //console.log(content);
	    
	    /* if content has been defined, create an InfoWindow that will pop-up on click */
	    if(content != '') {
	        /* attach the infoWindow to the marker */
    	    marker.infobulle = new google.maps.InfoWindow({
                content  : content, // contenu qui sera affiché
                visible: false,
                position: new google.maps.LatLng(lat, long),
                maxWidth: 500
            });
        
	        google.maps.event.addListener(marker, 'click', function addInfoWindow(data){
	            // affichage position du marker
	            //console.log(content);
	            marker.infobulle.open(map, marker);
	        });
        }
	    google.maps.event.addListener(marker, 'click', action);
	    /* the index wil be useful in case of removal of the marker's childs and roads */
	    marker.index = n;
	    return marker;
    };
    
    /** delete all the markers and lines/roads from a given array 
     * @array path: array of (markers , line/road)
     */
    function deletePaths(path) {
        /* if we have a non-empty array */
        if(path != null && path.length > 0) {
            for(var k = 0; k < path.length; k++) {
                console.log(k);
                deletePaths(paths[path[k]['marker'].index])
                /* remove the marker and road of the map */
                path[k]['marker'].setMap(null);
                //console.log(path[k]);
                path[k].road.setMap(null);
            }
            /* our path array will be an empty array */
            path = new Array();
        }
        return path;
    }
    
    /** display the childs marker of a marker, and handle their behaviour 
     * @int nb: number of childs marker to create and display
     * @float lat, long: coordinates of the father marker
     * @array[markers, roads] path: array containing all the paths for the father marker's childs
     */
    function displayMarkers(nb = 5, lat, long, path) {
        //console.log(path);
        if(path == null) {
            path = new Array();
        }
        /* if we already have markers childs, we delete them */
        if(path.length > 0) {
            path = deletePaths(path);
        }
        else {
            for(var k=0; k < nb; k++) {
                /* choose coordinates at random */
                var lat1 = Math.random() * width + lat - (width / 2);
                var long1 = Math.random() * height + long - (height / 2);
                //console.log(lat1+','+long1);
                /* instanciate a new couple (marker, road) */
                path[k] = new Array();
                /* if user chosen to display road or map, handle it */
                if(lineType == 'it') {
                    path[k]['road'] = computePlotWay(lat+', '+long, lat1+','+long1);
                }
                else {
                    path[k]['road'] = tracePolyline([{lat: lat, lng: long},{lat: lat1,lng: long1}], color);
                }
                
                /*for(var d in path[k]['road'].gm_bindings_.directions) {
                    if(path[k]['road'].gm_bindings_.directions[d].jc == "directions") {
                        console.log(path[k]['road'].gm_bindings_.directions[d]);
                        console.log(path[k]['road'].gm_bindings_.directions[d].Rd.enabled);
                    }
                }*/
                /* if user wants that every child creates new markers, handle it */
                if(recursion) {
                    path[k]['marker'] = createMarker(index, map, lat1, long1, '', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, '', '', function(){paths[this.index] = displayMarkers(number, this.getPosition().lat(), this.getPosition().lng(), paths[this.index]);});
                }
                else {
                    path[k]['marker'] = createMarker(index, map, lat1, long1);
                }
                index++;
            }
        }
        return path;
    };
    
    /** determines if coordinates can be reached using the road that lead to them 
     * @google.maps.DirectionsRenderer road: road to the marker
     */
    function hasValidDestination(road) {
        for(var d in road.gm_bindings_.directions) {
            for(var d2 in road.gm_bindings_.directions[d]) {
                if(road.gm_bindings_.directions[d][d2] == "directions") {
                    for(var d3 in road.gm_bindings_.directions[d]) {
                        if(""+road.gm_bindings_.directions[d][d3] == "[object Object]") {
                            return road.gm_bindings_.directions[d][d3].enabled;
                        }
                    }
                }
            }
        }
    };
    
    /** recursive function to plot a reachable marker
     * @int id: index of the marker to create
     * @float latO, longO: coordinates of the origine of the road
     * @float latD, longD: coordinates of the destination
     * @int i: index of couple (marker, road) in the paths' array
     */
    function plotReachableMarker(id, latO, longO, latD, longD, i, path) {
        //console.log(i);
        //console.log(path);
        path[i] = new Array();
        path[i]['road'] = computePlotWayPlusMarker(latO, longO, latD, longD, i, function(j, x, y){
            //console.log(j);
            /* create the wished marker */
            /* handle the choice of the user concerning the recursion */
            if(recursion) {
                path[j]['marker'] = createMarker(id, map, x, y, '', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, '', '', function(){
                    paths[this.index] = displayMarkers2(number, this.getPosition().lat(), this.getPosition().lng(), paths[this.index]);
                });
            }
            else {
                path[j]['marker'] = createMarker(index, map, x, y);
            }
            //console.log(path[j]['marker']);
            //console.log(path[j]['marker'].getPosition().lat()+','+path[j]['marker'].getPosition().lng());

            /* if marker is not reachable, delete it, delete the road, and try it again */
            if(!hasValidDestination(path[j]['road'])) {
                console.log("pas bonnes coordonnées");
                deletePaths([path[j]]);
                plotReachableMarker(id, latO, longO, latD, longD, j, path);
            }
        });
    };
    
    /** display the childs marker of a marker, and handle their behaviour, avoid unreachable coordinates
     * @int nb: number of childs marker to create and display
     * @float lat, long: coordinates of the father marker
     * @array[markers, roads] path: array containing all the paths for the father marker's childs
     */
    function displayMarkers2(nb = 5, lat, long, path) {
        if(path == null) {
            path = new Array();
        }
        /* if we already have markers childs, we delete them */
        if(path.length > 0) {
            path = deletePaths(path);
        }
        else {
            for(var k=0; k < nb; k++) {
                /* choose coordinates at random */
                var lat1 = Math.random() * width + lat - (width / 2);
                var long1 = Math.random() * height + long - (height / 2);
                //console.log(lat1+','+long1);
                /* instanciate a new couple (marker, road) */
                path[k] = new Array();
                /* handle the choice of the user concerning the type of lines */
                if(lineType == 'it') {
                    plotReachableMarker(index, lat, long, lat1, long1, k, path);
                }
                else {
                    /* if we do not compute and plot the road, we don't mind if it's reachable */
                    path[k]['road'] = tracePolyline([{lat: lat, lng: long},{lat: lat1,lng: long1}], color);
                    if(recursion) {
                        path[k]['marker'] = createMarker(index, map, lat1, long1, '', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, '', '', function(){paths[this.index] = displayMarkers2(number, this.getPosition().lat(), this.getPosition().lng(), paths[this.index]);});
                    }
                    else {
                        path[k]['marker'] = createMarker(index, map, lat1, long1);
                    }
                }
                index++;
            }
            //console.log('end of for');
        }
        return path;
    };
    
    /** compute and display the road between to markers
     * @string origin: 'lat, long', coordinates of the origin
     * @string destination: 'lat, long', coordinates of the destination
     * @google.maps.DirectionsTravelMode mode: travel mode to use for the itinerary
     * @boolean suppressMarker: true if we false to delete default markers A/B at each edge of the road
     * @string colorL: '#xxxxxx', the color of the line
     * @int weight: font-weight of the line
     * @DOMElement panelR: panel where to display the steps of the journey
     */
    function computePlotWay(origin, destination, mode = travelModes[travelMode], suppressMarker = true, colorL = color, weight = 3, panelR = panel) {
	    //console.log(colorL);
	    /* define the service and the display for our road, using the defined parameters */
	    var directionsService = new google.maps.DirectionsService;
	    var directionsDisplay = new google.maps.DirectionsRenderer({
	        map: map,
            suppressMarkers: suppressMarker,
            suppressInfoWindows: true, 
            draggable: true,
            preserveViewport: true,
            polylineOptions : {
                strokeColor: colorL,
                strokeWeight: weight
            },
            panel : panelR
        });
	    directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: mode
        }, 
        function(response, status) {
            /* Route the directions and pass the response to a function to create markers for each step.*/
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
        return directionsDisplay;
    }
    
    /** compute and display the road between to markers, and display the destination's marker
     * @float latO, longO: coordinates of the origin
     * @float latD, longD: coordinates of the destination
     * @google.maps.DirectionsTravelMode mode: travel mode to use for the itinerary
     * @int i: index of the marker to plot
     * @function callback: function to call when road as been computed
     * @boolean suppressMarker: true if we false to delete default markers A/B at each edge of the road
     * @string colorL: '#xxxxxx', the color of the line
     * @int weight: font-weight of the line
     * @DOMElement panelR: panel where to display the steps of the journey
     */
    function computePlotWayPlusMarker(latO, longO, latD, longD, i, callback, mode = travelModes[travelMode], suppressMarker = true, colorL = color, weight = 3, panelR = panel) {
	    //console.log(colorL);
	    /* define the service and the display for our road, using the defined parameters */
	    var directionsService = new google.maps.DirectionsService;
	    var directionsDisplay = new google.maps.DirectionsRenderer({
	        map: map,
            suppressMarkers: suppressMarker,
            suppressInfoWindows: true, 
            draggable: true,
            preserveViewport: true,
            polylineOptions : {
                strokeColor: colorL,
                strokeWeight: weight
            },
            panel : panelR
        });
	    directionsService.route({
            origin: latO+','+longO,
            destination: latD+','+longD,
            travelMode: mode
        }, 
        function(response, status) {
            /* Route the directions and pass the response to a function to create markers for each step. */
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                callback(i, latD, longD);
            }
        });
        return directionsDisplay;
    }
    
    /** display a line between two markers
     * @array[{lat, long}] coordinates: coordinates of all the markers to link with the line
     * @string color: color of the line
     * @float opacity: opacity of the line
     * @int weight: weight of the line
     */
    function tracePolyline(coordinates, color = "#444444", opacity = 1.0, weight = 2) {
        var line = new google.maps.Polyline({
            path: coordinates,
            geodesic: true,
            strokeColor: color,
            strokeOpacity: opacity,
            strokeWeight: weight,
            map: map
        });
        return line;
    };

    /** create an display a map 
     * @DOMNode element: the element were to display the map
     * @float lat, long: coordinates of the center of the map
     * @int zoom: zoom on the map
     * @google.maps.MapTypeId type: type of map
     */
    function createMap(element, lat, long, zoom, type = mapTypes[mapType]) {
        map = new google.maps.Map(element, {
            'zoom': zoom,
            'center': new google.maps.LatLng(lat, long),
            'mapTypeId': type
        });
    };
    
    /** 
     * display all wished elements on the map, and handle their behaviour
     */
    function displayElements() {
        createMap(document.getElementById("div_karte"), 48.513202, 7.081958, 6);
	    console.log(map);
        //console.log('displayElements');
        
        /* if lines and markers are already present on the map, delete them */ 
        if(paths != null) {
            for(var k = 0; k < paths.length; k++) {
                paths[k] = deletePaths(paths[k]);
            }
        }
        if(markers != null && markers.length > 0) {
            //console.log(markers);
            for(var k = 0; k < markers.length; k++) {
                markers[k].setMap(null);
                delete markers[k];
            }
        }
        if(it != null) {
            it.setMap(null);
        }
        
        /* reset all constants of the map */
        index = 0;
        paths = new Array();
        markers = new Array();
        //console.log(markers);
        
        /* create marker for Polytechnique */
	    markers[index] = createMarker(index, map, 48.710236, 2.212092, 'test2.png', 70, 60, undefined, undefined, undefined, undefined, 70, 60, false, 'École polytechnique', X, function(){paths[this.index] = displayMarkers2(number, 48.710236, 2.212092, paths[this.index]);});
	    //creer_pointeur(map, 48.710236, 2.212092, 'http://maps.google.com/mapfiles/marker_green.png', /*height*/undefined, /*width*/undefined, /*origin*/undefined, undefined, /*anchor*/undefined, undefined, /*scale*/undefined, undefined, /*optimized*/undefined, /*title*/undefined, /*content*/'Test', function() {displayMarkers(3, 48.710236, 2.212092);});
	    index++;
	    
	    /* create marker for Cirrantic */
	    markers[index] = createMarker(index, map, 48.173926, 11.532224, 'test3.png', 70, 40, undefined, undefined, undefined, undefined, 40, 70, false, 'Cirrantic', '<div><img src="http://www.cirrantic.com/wp-content/uploads/CIRRANTIC.jpg" alt="logo Cirrantic" /><p>Office H0.16</p><p><a href="https://www.google.de/maps/dir//CIRRANTIC+GmbH,+Agnes-Pockels-Bogen+1,+80992+München/@48.173268,11.532293,19z/data=!4m12!1m3!3m2!1s0x479e765c3e5bff75:0x624321fb9d02cf2f!2sCIRRANTIC+GmbH!4m7!1m0!1m5!1m1!1s0x479e765c3e5bff75:0x624321fb9d02cf2f!2m2!1d11.532293!2d48.173268" target="_blank">Agnes-Pockels-Bogen 1<br /></a><a href="https://www.google.de/maps/dir//CIRRANTIC+GmbH,+Agnes-Pockels-Bogen+1,+80992+München/@48.173268,11.532293,19z/data=!4m12!1m3!3m2!1s0x479e765c3e5bff75:0x624321fb9d02cf2f!2sCIRRANTIC+GmbH!4m7!1m0!1m5!1m1!1s0x479e765c3e5bff75:0x624321fb9d02cf2f!2m2!1d11.532293!2d48.173268" target="_blank"> 80992 München<br /></a><a href="https://www.google.de/maps/dir//CIRRANTIC+GmbH,+Agnes-Pockels-Bogen+1,+80992+München/@48.173268,11.532293,19z/data=!4m12!1m3!3m2!1s0x479e765c3e5bff75:0x624321fb9d02cf2f!2sCIRRANTIC+GmbH!4m7!1m0!1m5!1m1!1s0x479e765c3e5bff75:0x624321fb9d02cf2f!2m2!1d11.532293!2d48.173268" target="_blank"> DE</a></p><p><a href="mailto:info@cirrantic.com">info@cirrantic.com<br /></a><a href="http://www.cirrantic.com">www.cirrantic.com<br /></a><a href="http://www.twitter.com/cirrantic">www.twitter.com/cirrantic</a></p></div>', function(){paths[this.index] = displayMarkers2(number, 48.173926, 11.532224, paths[this.index]);});
	    index++;
	    /* display road between the two */
	    it = computePlotWay("48.710236, 2.212092","48.173926, 11.532224");
	    //it = calculer_tracer_itineraire("48.710236, 2.212092","48.718920, 2.161459");
	    
	    /* if additionnal markers wanted, handle it */
	    //console.log(centerLat+','+centerLong);
	    //console.log(numberZ);
	    for(var i = 0; i < numberZ; i++) {
	        //console.log(i);
	        //console.log(centerLat);
	        //console.log(((Math.random() * widthZ) + parseFloat(centerLat)));// - (widthZ/2)));
	        if(coordinatesAdditionnalMarkers[i] != null) {
	            markers[index] = createMarker(index, map, coordinatesAdditionnalMarkers[i].lat, coordinatesAdditionnalMarkers[i].lng, '', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, '', 'Zusätzliche Marker', function(){paths[this.index] = displayMarkers2(number, this.getPosition().lat(), this.getPosition().lng(), paths[this.index]);});
	        }
	        else {
	            /* create a marker with random image at random position inside a zone */
	            markers[index] = createMarker(index, map, ((Math.random() * widthZ) + parseFloat(centerLat) - (widthZ/2)), ((Math.random() * height) + parseFloat(centerLong) - (heightZ/2)), '', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, '', 'Zusätzliche Marker', function(){paths[this.index] = displayMarkers2(number, this.getPosition().lat(), this.getPosition().lng(), paths[this.index]);});
	        }
	        index++;
	    }
	    //console.log(markers);
	};
	
	displayElements();
	handleCoordinatesAdditionnalMarkers();
	
	/* if the user wants to change a parameter, reload the map */
	document.getElementById('submit').addEventListener('click', function() {
	    refreshValues();
        displayElements(); 
        console.log('réaffichage de la carte');
    });
};

/** display forms for the user to enter the coordinates of the additionnal markers
 */
function handleCoordinatesAdditionnalMarkers() {
    document.getElementById('lineType').addEventListener('change', function() {
        if(this.value == 'it') {
            document.getElementById('travelModeP').style = "";
        }
        else {
            document.getElementById('travelModeP').style = "display: none;";
        }
    });
    if(document.getElementById('numberZ').value != 0) {
        console.log("rajouter un champ");
        document.getElementById('coordinatesZ').innerHTML += '<h3>Koordinaten des ersten zusätzlichen Markers</h3>';
        var i = 1;
        document.getElementById('coordinatesZ').innerHTML += '<div class="line"><p class="line"><label for="coordinates'+i+'Lat">Latitude : </label><input type="float" id="coordinates'+i+'Lat" /></p><p class="line"><label for="coordinates'+i+'Lng">Longitude : </label><input type="float" id="coordinates'+i+'Lng" /></p></div>';
        var t = document.getElementById('coordinatesZ').querySelectorAll('input');
        t[t.length-1].addEventListener('change', function add() {console.log("new coordinate form");addCoordinatesAdditionnalMarkers(i+1);});
        t[t.length-2].addEventListener('change', function add() {console.log("new coordinate form");addCoordinatesAdditionnalMarkers(i+1);});
    };
};

/** add a form for the coordinates of a marker, and create one new on change
 * @int i: number of the form (necessary for the id value)
 */
function addCoordinatesAdditionnalMarkers(i) {
    var t1 = [];
    var t = document.getElementById('coordinatesZ').querySelectorAll('input');
    for(var k = 0; k<t.length;k++) {
        t1[k] = t[k].value;
    }
    t[t.length-1].removeEventListener('change', function add() {console.log("new coordinate form");addCoordinatesAdditionnalMarkers(i+1);});
    t[t.length-2].removeEventListener('change', function add() {console.log("new coordinate form");addCoordinatesAdditionnalMarkers(i+1);});
    document.getElementById('coordinatesZ').innerHTML += '<div class="line"><p class="line"><label for="coordinates'+i+'Lat">Latitude : </label><input type="float" id="coordinates'+i+'Lat" /></p><p class="line"><label for="coordinates'+i+'Lng">Longitude : </label><input type="float" id="coordinates'+i+'Lng" /></p></div>';
    t = document.getElementById('coordinatesZ').querySelectorAll('input');
    for(var k = 0; k<t1.length;k++) {
        t[k].value = t1[k];
    }
    if(i < document.getElementById('numberZ').value) {
        t[t.length-1].addEventListener('change', function add() {console.log("new coordinate form");addCoordinatesAdditionnalMarkers(i+1);});
        t[t.length-2].addEventListener('change', function add() {console.log("new coordinate form");addCoordinatesAdditionnalMarkers(i+1);});
    }
};
