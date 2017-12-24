//geolocation
var locationdata;
var coord;
var startPoint;
var deviceOn = false;
var watchHandler;

//Out front of lfz
var target = {
    latitude: 33.6350687,
    longitude: -117.7402043,
    threshold: 8
};

//Out front of apartment
// var target = {
//     latitude: 33.7523889,
//     longitude: -117.8637263,
//     threshold: 10
// };




// var sound = new Howl ({
//     src: ['./assets/sounds/0951.ogg'],
//     autoplay: true,
//     loop: true,
//     volume: 0,
//     onloaderror: function(){
//         console.log('sound load error');
//     }
// });
// sound.audible = false;
function handleClickHandlers(){
  $('.range-indicator').on('click', function(){
    knobRange(this);
  });
}

function flipSwitch(){
    console.log('touched');
    if (!deviceOn){
        deviceOn = true;
        $('#switch').css('transform','translateX(-50%) rotateX(180deg)');
        $('#indicator-light').show().toggleClass('indicator-glow');
        getLocation();

    } else if (deviceOn){
        deviceOn = false;
        $('#switch').css('transform','translateX(-50%) rotateX(0deg)');
        $('#indicator-light').hide().toggleClass('indicator-glow');
        $('.needleGuage').css('transform','translateX(-50%) rotateZ(-75deg)');
        navigator.geolocation.clearWatch(watchHandler);
    }
}


function knobRange(elem){
  if(deviceOn){
    switch ($(elem).attr('class')) {
      case "range-indicator long":
        $('.knob-light').removeClass('selected');
        $('.knob-light', elem).addClass('selected');
        $('#speaker>img').removeClass();
        $('#speaker>img').addClass('long-range-knob');
        break;
      case "range-indicator mid":
        $('.knob-light').removeClass('selected');
        $('.knob-light', elem).addClass('selected');
        $('#speaker>img').removeClass();
        break;
      case "range-indicator close":
        $('.knob-light').removeClass('selected');
        $('.knob-light', elem).addClass('selected');
        $('#speaker>img').removeClass();
        $('#speaker>img').addClass('close-range-knob');
        break;
    }
  }
}
//##
//our general purpose call for location locationdata
//this could get wrapped up into a player object as a method
//##
function getLocation() {
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
        watchHandler = navigator.geolocation.watchPosition(showSuccess,showError,options);
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
        $('#loading h2').fadeOut();
        $('.loading-btn').removeClass('hide');
        coord = pos.coords;
        console.log(coord);


        var distance = getDistanceFromLatLonInKm(coord.latitude,coord.longitude,target.latitude,target.longitude);

        $('.test-output').text(distance.toFixed(3));

        if (distance > 100 && deviceOn){
            $('.needleGuage').css('transform','translateX(-50%) rotateZ(-75deg)');
        } else if (distance <= 100 && distance >= 0 && deviceOn){
            let needleAngle = 53 - distance;
            $('.needleGuage').css('transform','translateX(-50%) rotateZ('+needleAngle+'deg)');
        }

        if ( distance <= target.threshold){
            console.log(`Within ${target.threshold}m of location!!`);
            // sound.fade(0,1,4000);
            // sound.audible = true;

        } else {
            console.log(`${coord.latitude} <br /> ${coord.longitude} <br />Success!<br />${distance}`)
            // if (sound.audible){
            //     sound.fade(1,0,2000);
            //     sound.audible = false;
            // }
        }
    }

    function showError(err){
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
}


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

function fullscreen(){
  $('#loading').fadeOut();
  var gauge = document.getElementById('gauge-wrapper');
  if(gauge.requestFullscreen){
      gauge.requestFullscreen()
    } else if (gauge.webkitRequestFullscreen) {
    	gauge.webkitRequestFullscreen();
    } else if (gauge.mozRequestFullScreen) {
    	gauge.mozRequestFullScreen();
    } else if (gauge.msRequestFullscreen) {
    	gauge.msRequestFullscreen();
    }
  }

$(document).ready(function(){
  getLocation();
  handleClickHandlers();
});
