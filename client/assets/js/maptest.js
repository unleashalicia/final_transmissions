//geolocation
var locationdata;
var coord;
var marker;
var average = [];
var startPoint;
var mapLoaded = false;
var map;
var target = {
    latitude: 33.6350687,
    longitude: -117.7402043,
    threshold: 8
}

// var target ={ LearningFuze specific 
//   latitude: 33.6348858 ,
//   longitude: -117.7404633,
//   threshold: 8
// }



//Out front of apartment
// var target = {
//     latitude: 33.7523889,
//     longitude: -117.8637263,
//     threshold: 10
// };

var sound = new Howl ({
    src: ['../assets/sounds/0951.ogg'],
    autoplay: false,
    loop: true,
    volume: 0,
    onloaderror: function(){
        console.log('sound load error');
    }
});
sound.audible = false;

//##
//our general purpose call for location locationdata
//this could get wrapped up into a player object as a method
//##
function getLocation() {
    if (!sound.playing()){
        sound.play();
    }
    console.log('getting location');
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maxAge: 10000
    };

    if (!coord && navigator.geolocation) {
        //If we have not gotten a location then call for one
        navigator.geolocation.getCurrentPosition(showSuccess,showError,options);
    } else if (navigator.geolocation){
        //otherwise, watch the position
        navigator.geolocation.watchPosition(showSuccess,showError,options);
    }else {
        location = "Geolocation is not supported by this browser.";
    }

    //##
    //Not sure about the need to have this here
    //move outside of the parent function?
    //##
    function showSuccess(pos) {
        //##
        //pos also includes pos.timestamp
        //which can be used for discarding spurious results
        //when combined with a calculated distance from origin
        //##
        coord = pos.coords;


        if(mapLoaded === false){
            initMap();

            mapLoaded = true;
        }
        console.log(coord);
        let place = document.querySelector('.toplayer');


        showCurrentLocation(coord);
        var distance = getDistanceFromLatLonInKm(coord.latitude,coord.longitude,target.latitude,target.longitude);

        if ( distance <= target.threshold){
            place.innerHTML= `Within ${target.threshold}m of location!!`;
            sound.fade(0,1,4000);
            sound.audible = true;

        } else {
            place.innerHTML= `${coord.latitude} <br /> ${coord.longitude} <br />Success!<br />${distance}`;
            if (sound.audible){
                sound.fade(1,0,2000);
                sound.audible = false;
            }
        }
    }

    function showError(err){
        console.warn(`ERROR(${err.code}): ${err.message}`);
        let place = document.querySelector('.toplayer');
        place.innerHTML= `Error!`;
    }
}

//##
//Make an initial call on load in order to bring up map data
$(document).ready(getLocation);


//##
//distance calc for anything we put into it
//takes latitude and longitude for each object
//maybe switch this to be passed as objects?
//Outputs a number representing distance in meters
//##
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d * 1000; //Distance in meters
}

//##
//used in the get distance calc in order to use radians
//##
function deg2rad(deg) {
    return deg * (Math.PI/180)
}



//##
//gets called on first location success within getLocation()
//##
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.6348729, lng: -117.7405317},
        zoom: 19,
        disableDefaultUI: true,
        draggable: false,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#242f3e"
              }
            ]
          },
          {
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#242f3e"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#30ff27"
              }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#30ff27"
              },
              {
                "visibility": "on"
              },
              {
                "weight": 8
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#d41d1c"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#38414e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#388924"
              },
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#2f3948"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#265918"
              },
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#17263c"
              }
            ]
          }
        ]
    });

    var iconBase = './assets/images/shaded_dot.png';
    marker = new google.maps.Marker({
        position: {
            lat: 33.6348729,
            lng: -117.7405317
        },
        map: map,
        icon: iconBase
    });
}


//##
//Works to show location, but is not yet handling clearing the marker and replacing it in a new spot
//it just adds another one, Im also uncertain as to whether it is recentering the map?
//##

function showCurrentLocation(loc){
    map.setCenter({lat:loc.latitude, lng:loc.longitude, alt:0});
    marker.setPosition({lat:loc.latitude, lng:loc.longitude, alt:0});
}
