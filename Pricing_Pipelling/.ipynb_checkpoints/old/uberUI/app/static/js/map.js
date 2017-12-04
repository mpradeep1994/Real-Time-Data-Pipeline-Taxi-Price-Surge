// Render the markers for cab locations on Google Maps
var SF = new google.maps.LatLng(37.7577,-122.4376);
var markers = [];
var map;
var loopnotdone1=false;
var loopnotdone2=false;
var loopnotdone3=false;
var loopnotdone4=false;


//var infowindow = new google.maps.InfoWindow();
/*
var textoverlay="";
    //adapded from this example http://code.google.com/apis/maps/documentation/javascript/overlays.html#CustomOverlays
     //text overlays
    function TxtOverlay(pos, txt, cls, map) {

      // Now initialize all properties.
      this.pos = pos;
      this.txt_ = txt;
      this.cls_ = cls;
      this.map_ = map;

      // We define a property to hold the image's
      // div. We'll actually create this div
      // upon receipt of the add() method so we'll
      // leave it null for now.
      this.div_ = null;

      // Explicitly call setMap() on this overlay
      this.setMap(map);
    }

    TxtOverlay.prototype = new google.maps.OverlayView();



    TxtOverlay.prototype.onAdd = function() {

      // Note: an overlay's receipt of onAdd() indicates that
      // the map's panes are now available for attaching
      // the overlay to the map via the DOM.

      // Create the DIV and set some basic attributes.
      var div = document.createElement('DIV');
      div.className = this.cls_;

      div.innerHTML = this.txt_;

      // Set the overlay's div_ property to this DIV
      this.div_ = div;
      var overlayProjection = this.getProjection();
      var position = overlayProjection.fromLatLngToDivPixel(this.pos);
      div.style.left = position.x + 'px';
      div.style.top = position.y + 'px';
      // We add an overlay to a map via one of the map's panes.

      var panes = this.getPanes();
      panes.floatPane.appendChild(div);
    }
    TxtOverlay.prototype.draw = function() {


        var overlayProjection = this.getProjection();

        // Retrieve the southwest and northeast coordinates of this overlay
        // in latlngs and convert them to pixels coordinates.
        // We'll use these coordinates to resize the DIV.
        var position = overlayProjection.fromLatLngToDivPixel(this.pos);


        var div = this.div_;
        div.style.left = position.x + 'px';
        div.style.top = position.y + 'px';



      }
      //Optional: helper methods for removing and toggling the text overlay.  
    TxtOverlay.prototype.onRemove = function() {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    }
    TxtOverlay.prototype.hide = function() {
      if (this.div_) {
        this.div_.style.visibility = "hidden";
      }
    }

    TxtOverlay.prototype.show = function() {
      if (this.div_) {
        this.div_.style.visibility = "visible";
      }
    }

    TxtOverlay.prototype.toggle = function() {
      if (this.div_) {
        if (this.div_.style.visibility == "hidden") {
          this.show();
        } else {
          this.hide();
        }
      }
    }

    TxtOverlay.prototype.toggleDOM = function() {
      if (this.getMap()) {
        this.setMap(null);
      } else {
        this.setMap(this.map_);
      }
    }
*/


function initialize() {
    /*var mapOptions = {
	zoom: 12,
	center: SF,
  mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
    }
    };*/
    var myOptions = {
    zoom: 12,
    center: SF,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [{
        "saturation": 36
      }, {
        "color": "#000000"
      }, {
        "lightness": 40
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }, {
        "weight": 1.2
      }]
    }, {
      "featureType": "administrative",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative.country",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "administrative.country",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "administrative.country",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "administrative.province",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative.locality",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }, {
        "saturation": "-100"
      }, {
        "lightness": "30"
      }]
    }, {
      "featureType": "administrative.neighborhood",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative.land_parcel",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }, {
        "gamma": "0.00"
      }, {
        "lightness": "74"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "all",
      "stylers": [{
        "lightness": "3"
      }]
    }, {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 21
      }]
    }, {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 29
      }, {
        "weight": 0.2
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 18
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 19
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }]
    }]
  };
  
    map = new google.maps.Map(document.getElementById('map-canvas'),
			      myOptions);

    var mapLabel = new MapLabel({
        text: '',
        position: new google.maps.LatLng(37.787808,-122.396584),
        map: map,
        fontSize: 35,
        align: 'right'
    });
}
function update_values() {
    $.getJSON('/realtime',
      function(data) {
        if(data.length > 1)
          clearMarkers();
      console.log(data)
      keys=["uberX","uberXL","UberBLACK","UberSUV"]
      //for (var key in keys){
        for(itr=0;itr<4;itr++){

          key=keys[itr];
        //var now = new Date().getTime();
       // while(new Date().getTime() < now + 2000){ /* do nothing Just adding a delay of 2*/ } 
        if(key=='uberX'){
          //while(loopnotdone1 || loopnotdone2 || loopnotdone3 || loopnotdone4){}
          uberx_loc=data[key];
          for (var i = 0; i < uberx_loc.length; i = i + 1) {
            //loopnotdone1=true;
            /*surgeval=uberx_loc[i].surge;
            if(surgeval > 1)
              iconimg="http://maps.google.com/mapfiles/ms/icons/red-dot.png";
            else
              iconimg="http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
             markers.push(new google.maps.Marker({
             position: new google.maps.LatLng(uberx_loc[i].lat, uberx_loc[i].lng),
             map: map,
             icon: iconimg,
             //draggable: true,
             animation: google.maps.Animation.DROP
            }));*/
            
            addMarkerWithTimeout(new google.maps.LatLng(uberx_loc[i].lat, uberx_loc[i].lng),i*1000,uberx_loc[i].surge, key);
                //alert(cabs[i].lat)
      }
        }
        if(key=='uberXL'){
          //while(loopnotdone1 || loopnotdone2 || loopnotdone3 || loopnotdone4){}
          uberx_loc=data[key]
          for (var i = 0; i < uberx_loc.length; i = i + 1) {
          //  loopnotdone2=true;
            /*surgeval=uberx_loc[i].surge;
            if(surgeval > 1)
              iconimg="http://maps.google.com/mapfiles/ms/icons/red-dot.png";
            else
              iconimg="http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
             markers.push(new google.maps.Marker({
             position: new google.maps.LatLng(uberx_loc[i].lat, uberx_loc[i].lng),
             map: map,
             icon: iconimg,
             //draggable: true,
             animation: google.maps.Animation.DROP
            }));*/
            
            addMarkerWithTimeout(new google.maps.LatLng(uberx_loc[i].lat, uberx_loc[i].lng),i*1000,uberx_loc[i].surge, key);
                //alert(cabs[i].lat)
      }
        }

        if(key=='UberBLACK'){
        //  while(loopnotdone1 || loopnotdone2 || loopnotdone3 || loopnotdone4){}
          uberx_loc=data[key]
          for (var i = 0; i < uberx_loc.length; i = i + 1) {
           // loopnotdone3=true;
            /*surgeval=uberx_loc[i].surge;
            if(surgeval > 1)
              iconimg="http://maps.google.com/mapfiles/ms/icons/red-dot.png";
            else
              iconimg="http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
             markers.push(new google.maps.Marker({
             position: new google.maps.LatLng(uberx_loc[i].lat, uberx_loc[i].lng),
             map: map,
             icon: iconimg,
             //draggable: true,
             animation: google.maps.Animation.DROP
            }));*/
             
            addMarkerWithTimeout(new google.maps.LatLng(uberx_loc[i].lat, uberx_loc[i].lng),i*1000,uberx_loc[i].surge, key);
                //alert(cabs[i].lat)
      }
        }

        if(key=='UberSUV'){
          //while(loopnotdone1 || loopnotdone2 || loopnotdone3 || loopnotdone4){}
          uberx_loc=data[key]
          for (var i = 0; i < uberx_loc.length; i = i + 1) {
            //loopnotdone4=true;
            /*surgeval=uberx_loc[i].surge;
            if(surgeval > 1)
              iconimg="http://maps.google.com/mapfiles/ms/icons/red-dot.png";
            else
              iconimg="http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
             markers.push(new google.maps.Marker({
             position: new google.maps.LatLng(uberx_loc[i].lat, uberx_loc[i].lng),
             map: map,
             icon: iconimg,
             //draggable: true,
             animation: google.maps.Animation.DROP
            }));*/
             
            addMarkerWithTimeout(new google.maps.LatLng(uberx_loc[i].lat, uberx_loc[i].lng),i*1000,uberx_loc[i].surge, key);
                //alert(cabs[i].lat)
      }
        }
      }
		  /*for (var i = 0; i < cabs.length; i = i + 1) {
        
	              addMarkerWithTimeout(new google.maps.LatLng(cabs[i].lat, cabs[i].lng),i*1000);
                //alert(cabs[i].lat)
		  }*/
            });
    window.setTimeout(update_values, 5000);
}


update_values();
function drop(lat, lng) {
  console.log("drop called");
    point  = new google.maps.LatLng(lat,lng);
   // clearMarkers();
    addMarkerWithTimeout(point,800);
}
function addMarkerWithTimeout(position,timeout,surgeval, key) {
  //var newIcon = google.maps.IconMaker.createMarkerIcon({width: 15, height:25, primaryColor: "#0000FF", cornercolor:"#0000FF"});
  iconimg  = "";
  if(surgeval > 1)
    iconimg="http://maps.google.com/mapfiles/ms/icons/red-dot.png";
  else
    iconimg="http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  console.log(iconimg);
 /* console.log(key);
  if(key == "uberX")
    loopnotdone1=false
  if(key =="uberXL")
    loopnotdone2 = false
  if(key == "UberBLACK")
    loopnotdone3=false
  if(key == "UberSUV")
    loopnotdone4=false*/
  /*var myOptions = {
                content: key+" | Surge: " + surgeval
                ,disableAutoPan: false
                ,maxWidth: 0
                ,pixelOffset: new google.maps.Size(-25,25)
                ,closeBoxMargin: "10px 2px 2px 2px"
                ,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
                ,infoBoxClearance: new google.maps.Size(1, 1)
                ,isHidden: false
                ,pane: "mapPane"
                ,enableEventPropagation: false
        };
  
  //len = markers.length > 0 ? (markers.length-1):0;
  infowindow.close();
  infowindow = new google.maps.InfoWindow(myOptions);
  infowindow.open(map);*/

  /*var customTxt = "<div>"+Key+" | Surge: "+surgeval+"</div>";
  if(textoverlay != "" ) 
    textoverlay.remove();  File "/home/admin1/anaconda/lib/python2.7/socket.py", line 307, in flush

  customBox = "customBoxBlue"
  if(surgeval > 1)
    customBox = "customBoxRed"
    
  textoverlay = new TxtOverlay(new google.maps.LatLng(37.724992,-122.331804), customTxt, customBox, map);*/

  window.setTimeout(function(){
    markers.push(new google.maps.Marker({
    position: position,
    map: map,
    icon: iconimg,
    //draggable: true,
    animation: google.maps.Animation.DROP
    }));
    //marker.addListener('click', toggleBounce);
},timeout);
}           

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
	markers[i].setMap(null);
    }
    markers = [];
}



function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
google.maps.event.addDomListener(window, 'load', initialize);