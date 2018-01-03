//########################################
//## Global Variables  ###################
//########################################
var locationdata;
var coord;
var startPoint;
var deviceOn = false;
var watchHandler;
var errorCount = 0;
var noSleep = new NoSleep();
var sounds = {
    0: null,
    1: null,
    2: null,
    numLoaded: 0,
    ready: false,
    speakingPlayed: false,
    sources: ['./assets/sounds/CH1-MUSIC.ogg','./assets/sounds/CH1-READING.ogg']
};
var speaking;
var looping;
var effect;
//Out front of lfz:
var target = {
    latitude: 33.6350687,
    longitude: -117.7402043,
    loopThreshold: 40,
    talkThreshold: 9
};
//Out front of apartment
// var target = {
//     latitude: 33.7523889,
//     longitude: -117.8637263,
//     threshold: 10
// };
var distance;
var knobMode='med';
//****************************************
//****************************************
//--|
//--|
//########################################
//## Audio controllers  ##################
//########################################
//++
//++
function loadSound(location,position){
    var setLoop = position === 0 ? true : false;
    let howl = new Howl({
        src: [location],
        preload: true,
        loop: setLoop,
        autoplay: false,
        volume: 0,
        onload: ()=>{
            sounds.numLoaded++;
            if (sounds.numLoaded >= sounds.sources.length){
                sounds.ready = true; //used for debugging
                $('#loading h2').fadeOut();
                $('.loading-btn').removeClass('hide');
            }
        }
    });
    return howl;
}
//++
//++
function loadAll(){
    for (let i = 0; i < sounds.sources.length; i++){
        sounds[i] = loadSound(sounds.sources[i],i);
    }
}
//++
//++
function handleAudioPlayback(dist){
    if (dist <= target.loopThreshold && deviceOn){
        if (!looping){
            looping = sounds[0].play();
            sounds[0].fade(0,0.7,1500,looping);
        } else if (sounds[0].volume(looping) < 0.7){
            sounds[0].fade(sounds[0].volume(looping),0.7,1500,looping);
        }
    } else if (dist > target.loopThreshold && sounds[0].playing(looping) && sounds[0].volume(looping) === 0.7){
        sounds[0].fade(0.7,0,1000,looping);
    }

    if (dist <= target.talkThreshold && !sounds[1].playing(speaking) && !sounds.speakingPlayed && deviceOn) {
        if (!speaking){
            speaking = sounds[1].play();
            sounds[1].on('end',function(){
                sounds.speakingPlayed = true;
            },speaking);
        } else {
            sounds[1].play(speaking);
        }
        sounds[1].fade(0,0.9,1500,speaking);
    } else if (dist > target.talkThreshold && sounds[1].playing(speaking)){
        sounds[1].fade(0.9,0,1500,speaking).once('fade',function(){
            sounds[1].pause(speaking);
        },speaking);
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
function handleEventHandlers(){
  $('#knobImg').on('click touch',function(){
    knobRange(this);
  });
  $('.loading-btn').on('click',fullscreen)
  $('#switch').on('click touch',flipSwitch);

  $(window).on('orientationchange',handleOrientation); //orientation change
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
        noSleep.enable();
        deviceOn = true;
        $('#switch').css('transform','translateX(-50%) rotateX(180deg)');
        $('#indicator-light').show().toggleClass('indicator-glow');
        getLocation();

    } else if (deviceOn){
        noSleep.disable();
        deviceOn = false;
        $('#switch').css('transform','translateX(-50%) rotateX(0deg)');
        $('#indicator-light').hide().toggleClass('indicator-glow');
        $('.needleGuage').css('transform','translateX(-50%) rotateZ(-75deg)');
        navigator.geolocation.clearWatch(watchHandler);
        if (sounds[1].playing(speaking)){
            sounds[1].pause(speaking);
        }
        if (sounds[0].playing(looping)){
            sounds[0].fade(sounds[0].volume(looping),0,100,looping);
        }
    }
}
//++
//++
function knobRange(elem){
  debugger;
    switch ($(elem).attr('class')) {
      case "close-range-knob":
         if(deviceOn){
            $('.knob-light').removeClass('selected');
            $(".long .knob-light").addClass('selected');
          }
          $(elem).removeClass("close-range-knob");
          $(elem).addClass("long-range-knob");
          knobMode='long';
          handleMeter();
          break;
      case "long-range-knob":
          if(deviceOn){
              $('.knob-light').removeClass('selected');
              $(".mid .knob-light").addClass('selected');
            }
          $('#knobImg').removeClass("long-range-knob");
          $('#knobImg').addClass("mid-range-knob");
          knobMode='med';
          handleMeter();
          break;
      case "mid-range-knob":
          if(deviceOn){
            $('.knob-light').removeClass('selected');
            $(".close .knob-light").addClass('selected');
          }
          $(elem).removeClass("mid-range-knob");
          $(elem).addClass("close-range-knob");
          knobMode='short';
          handleMeter();
          break;
    }
}
//++
//++
function handleMeter(){
    if (knobMode === 'long'){
        if (distance > 100 && deviceOn){
            $('.needleGuage').css('transform','translateX(-50%) rotateZ(-65deg)');
        } else if (distance <= 100 && distance >= 0 && deviceOn){
            let needleAngle = 53 - distance;
            $('.needleGuage').css('transform','translateX(-50%) rotateZ('+needleAngle+'deg)');
        }
    } else if (knobMode === 'med') {
        if (distance > 50 && deviceOn){
            $('.needleGuage').css('transform','translateX(-50%) rotateZ(-65deg)');
        } else if (distance <= 50 && distance >= 0 && deviceOn){
            let needleAngle = 53 - distance * 2;
            $('.needleGuage').css('transform','translateX(-50%) rotateZ('+needleAngle+'deg)');
        }
    } else if (knobMode === 'short') {
        if (distance > 25 && deviceOn){
            $('.needleGuage').css('transform','translateX(-50%) rotateZ(-65deg)');
        } else if (distance <= 25 && distance >= 0 && deviceOn){
            let needleAngle = 53 - distance * 4;
            $('.needleGuage').css('transform','translateX(-50%) rotateZ('+needleAngle+'deg)');
        }
    }
}
//++
//++
function fullscreen(){
    //use to check if fullscreen is available by asking user permission by clicking on the "READY" (#loading ) multiple ifs for each type of browser
    document.getElementById('loading').classList.add('hide');
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
//++
//++
function handleOrientation(event){
    //use to listen for device orientation change to switch from ESR or Ghost CAM
    if(screen.orientation.type === 'portrait-primary'){
        $('#gauge-wrapper').removeClass('hide');
        $('#camera').addClass('hide');
    }else{
        $('#gauge-wrapper').addClass('hide');
        $('#camera').removeClass('hide');
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
        //Since we succeeded, clear the errors
        errorCount = 0;

        //pos also includes pos.timestamp if needed later
        //moved ready modal details into audio load callback
        coord = pos.coords;
        console.log(coord);


        distance = getDistanceFromLatLonInKm(coord.latitude,coord.longitude,target.latitude,target.longitude);

        //This will output the distance to the main point from where you are to the screen
        //used for testing purposes
        // $('.test-output').text(distance.toFixed(3));

        //Update the meter needle position
        handleMeter();

        //decide whether to play or stop current audio tracks
        handleAudioPlayback(distance);
    }

    function showError(err){
        errorCount++;
        console.warn(`ERROR(${err.code}) - (${errorCount}) bad calls`);

        if (errorCount > 10){
            //tell the user they are having issues with their gps connection
            //possibly end app usage for later resume
        }
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
  handleEventHandlers();
  loadAll();
  getLocation();
});
//****************************************
//****************************************
//-|
//-|
