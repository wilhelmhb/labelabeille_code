//CARTE
/**
 * create a map with hives' coordinates and display it 
 */
function goToMap() {
	//console.log("goToMap");
	getHivesCoordinates(initializeMap);
	transition(_("pmap"), ""); //display the map
}

/**
 * get the hives' coordinates from the server 
 * @function action: callback function (what to do with the hives' coordinates
 */
function getHivesCoordinates(action) {
    $.ajax({
        type: 'GET',
        url: url+'pshive/hives/coordinates',
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
           console.log(data);
        	//console.log(JSON.stringify(data)); 
        	//$("#resultat").html(JSON.stringify(data));
        	action(data);
        }
    });
};

/** 
 * create the map itself 
 * @object hiveCoordinates : object containing the coordinates of all the hives
 */
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

    /** 
     * create and display a map 
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
        createMap(document.getElementById("corps_carte"), 46.513202, 2.381958, 4);
	    //console.log(map);
	    
        if(markers != null && markers.length > 0) {
            //console.log(markers);
            for(var k = 0; k < markers.length; k++) {
                markers[k].setMap(null);
                delete markers[k];
            }
        }else{
            alert("Aucune ruche à afficher");
        }
        
        /* reset all constants of the map */
        index = 0;
        markers = new Array();
        
	    for(var i = 0; i < hiveCoordinates.length; i++) {
	        //console.log(JSON.stringify(hiveCoordinates[i]));
	        if(hiveCoordinates[i] != null && hiveCoordinates[i].lat != null && hiveCoordinates[i].lng != null && (hiveCoordinates[i].lat != '0.00000000' || hiveCoordinates[i].lng != '0.00000000')) {
	            markers[index] = createMarker(index, map, hiveCoordinates[i].lat, hiveCoordinates[i].lng, "http://www.label-abeille.org/modules/cmaps/views/img/markers/yellow_pin.png");
	            index++;
	        }
	    }
    };

    displayElements();
};
