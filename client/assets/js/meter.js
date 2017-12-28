//########################################
//## Global Variables  ###################
//########################################
var locationdata;
var coord;
var startPoint;
var deviceOn = false;
var watchHandler;
var soundEngine = new jWebAudio.SoundEngine();
var sounds = {
    loaded: 0,
    ready: false,
    sources: ['../sounds/0951.ogg'],
    objects: {

    }
};
//Out front of lfz:
var target = {
    latitude: 33.6350687,
    longitude: -117.7402043,
    threshold: 8
};
//Out front of apartment:
// var target = {
//     latitude: 33.7523889,
//     longitude: -117.8637263,
//     threshold: 10
// };
//****************************************
//****************************************
//--|
//--|
//########################################
//## Audio controllers  ##################
//########################################
//++
//++
function loadSound(location,loopVal){
    let source = soundEngine.addSoundSource({
        'url': location,
        'loop': loopVal,
        'preLoad': true,
        'fadeIn': true,
        'fadeOut': true,
        'fadeInTime': 10,
        'fadeOutTime': 10,
        'callback': function(){
            sounds.loaded++;
            if (sounds.loaded === sounds.sources.length){
                sounds.ready = true;
            }
        }
    });
    return source;
}
//++
//++
function soundAction(audio,action){
    if (action === 'play'){
        audio.sound.play();
        audio.
    } else if (action === 'pause'){
        audio.sound.pause();
    } else if (action === 'stop'){
        audio.sound.stop();
    }
}
//++
//++
function loadAll(){
    for (let i = 0; i < sounds.sources.length; i++){
        let loop = i === 0 ? true : false;
        sounds.objects[i].file = loadSound(sounds.sources[i],loop);
        sounds.objects[i].playing = false;
    }
}
//****************************************
//****************************************
//-|
//-|
//########################################
//## Click handlers  #####################
//########################################
//++
//++
function handleClickHandlers(){
  $('.range-indicator').on('click', function(){
    knobRange(this);
  });
}
//****************************************
//****************************************
//-|
//-|
//########################################
//## UI Controls  ########################
//########################################
//++
//++
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
//++
//++
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
//++
//++
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
//****************************************
//****************************************
//-|
//-|
//########################################
//## Location Helpers  ###################
//########################################
//++
//++
function getLocation() {
    //our general purpose call for location data
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


    function showSuccess(pos) {
        //pos also includes pos.timestamp if needed later
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
            //play sound here
            if (!sounds.objects[0].playing){
                soundAction(sounds.objects[0].file,'play');
            } else if (distance <= target.threshold/2 && !sounds.objects[1].playing){
                soundAction(sounds.objects[1].file,'play');
            }

        } else {
            console.log(`Success! | ${coord.latitude} | ${coord.longitude} | ${distance} meters`)
            //fade out any playing sounds here
            if (distance > target.threshold/2 && sounds.objects[1].playing){
                soundAction(sounds.objects[1].file,'pause');
            }
            if (sounds.objects[0].playing){
                soundAction(sounds.objects[1].file,'stop');
            }

        }
    }

    function showError(err){
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
}
//++
//++
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
//++
//++
function deg2rad(deg) {
    //used in the get distance calc in order to use radians
    return deg * (Math.PI/180)
}
//****************************************
//****************************************
//-|
//-|
//########################################
//## Entry into app/on load  #############
//########################################
$(document).ready(function(){
  getLocation();
  handleClickHandlers();
});
//****************************************
//****************************************
//-|
//-|
