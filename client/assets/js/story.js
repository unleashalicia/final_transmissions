document.addEventListener('DOMContentLoaded', saveStoryId)

function saveStoryId(){

  if ( typeof Storage !== "undefined" ) {
    let storyId = window.location.pathname.split('/')
    storyId = storyId[storyId.length-1];

    sessionStorage.setItem(storyId);
  } else {
      console.log('local storage is not supported on this browser. Story will not work');
  }
}

var marker;
var map;

const chapter = document.querySelector('.chapter');

function completeChapter(chapter){
    if(chapter.complete){
        chapter.classList.add('chapter-complete');
    }
}
// This function will be adjusted depending on how the data looks on backend
// need to idenfity chapter by id or number so they don't all toggle together

function initMap() {
    console.log('map function called');
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.6348729, lng: -117.7405317},
        zoom: 14,
        disableDefaultUI: false,
        draggable: true,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#373737"
              }
            ]
          },
          {
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "on"
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
                "color": "#0b0b1f"
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

    var iconBase = '../../assets/images/story/raven2.png';
    marker = new google.maps.Marker({
        position: {
            lat: 33.6348729,
            lng: -117.7405317
        },
        map: map,
        icon: iconBase
    });
}
