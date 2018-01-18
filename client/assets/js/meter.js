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
    numLoaded: 0,
    numToLoad: 3,
    ready: false,
    speakingPlayed: false,
    sources: {
        outerAudio: '',
        innerAudio: '',
        completeAudio: ''
    }
};
var speaking;
var looping;
var effect;
var target = {
    latitude: 0,
    longitude: 0,
    loopThreshold: 0,
    talkThreshold: 0
};
var distance;
var knobMode='med';
var action = '';
//****************************************
//****************************************
//--|
//--|
//########################################
//## Audio controllers  ##################
//########################################
//++
//++
function loadSound(location, setLoop){
    let howl = new Howl({
        src: [location],
        preload: true,
        loop: setLoop,
        autoplay: false,
        volume: 0,
        onload: ()=>{
            sounds.numLoaded++;
            if (sounds.numLoaded >= sounds.numToLoad){
                const loadingBtn = document.querySelector('.loading-btn');
                const headerFade = document.querySelector('#loading h2');

                sounds.ready = true; //used for debugging
                headerFade.classList.add('fade-out');
                loadingBtn.classList.remove('hide');
            }
        }
    });
    return howl;
}
//++
//++
function loadAll(){
    let count = 0;
    for (let i in sounds.sources){
        let loop = false;
        if (i === 'outerAudio'){
            loop = true;
        }
        if (count === 1){
            sounds.numLoaded++;
        } // get rid of this once valid sounds start getting passed from the db
        sounds[count] = loadSound(sounds.sources[i], i);
        count++;
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
    const knobImg = document.getElementById('knobImg');
    const loadingBtn = document.querySelector('.loading-btn');
    const uiSwitch = document.getElementById('switch');
    const nextEvent =  document.querySelector('.next-event');

    loadingBtn.addEventListener('click', fullscreen);

    knobImg.addEventListener('click', function(){
        knobRange(this);
    });//turning the knob for range meter switch;
    uiSwitch.addEventListener('click',flipSwitch);//turns on the gadget

    window.addEventListener('orientationchange',handleOrientation);//switch from meter to camera;
    nextEvent.addEventListener('click', function(){
        console.log('moving on to next event');
    }); //ADD FUNCTION FOR CHANGING TO NEXT CHAPTER HERE
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
    console.log('Switch flipped');
    const uiSwitch = document.getElementById('switch');
    const indicatorLight = document.getElementById('indicator-light');
    const needlegauge = document.querySelector('.needleGauge');

    if (!deviceOn){
        knobLightOn("on")
        noSleep.enable();
        deviceOn = true;
        uiSwitch.classList.toggle('flipped');
        indicatorLight.style.display = 'block';
        indicatorLight.classList.toggle('indicator-glow');
        getLocation();

    } else if (deviceOn){
        knobLightOff()
        noSleep.disable();
        deviceOn = false;
        uiSwitch.classList.toggle('flipped');
        indicatorLight.style.display = 'none';
        indicatorLight.classList.toggle('indicator-glow');

        needlegauge.style.transform = 'translateX(-50%) rotateZ(-75deg)';

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
function knobLightOn(switchCall){
  const knob = document.querySelector('#knobImg')
  if(knob.classList.contains('mid-range-knob')){
    knobLightOff()
    switchCall ?  document.querySelector('.knob-light.mid').classList.add('selected') :  document.querySelector('.knob-light.close').classList.add('selected')
  }else if(knob.classList.contains('long-range-knob')){
    knobLightOff()
    switchCall ?  document.querySelector('.knob-light.long').classList.add('selected') :  document.querySelector('.knob-light.mid').classList.add('selected');
  }else{
    knobLightOff()
    switchCall ?  document.querySelector('.knob-light.close').classList.add('selected') : document.querySelector('.knob-light.long').classList.add('selected');
  }
}
//++
//++
function knobLightOff(){
  const knob = document.querySelector('#knobImg')
  if(knob.classList.contains('mid-range-knob')){
    document.querySelector('.knob-light.mid').classList.remove('selected');
  }else if(knob.classList.contains('long-range-knob')){
    document.querySelector('.knob-light.long').classList.remove('selected');
  }else{
    document.querySelector('.knob-light.close').classList.remove('selected');
  }
}
//++
//++
function knobRange(elem){
    console.log('click knob');
    switch (elem.className) {
        case "close-range-knob":
            if(deviceOn){
              knobLightOn()
              }
              elem.classList.remove("close-range-knob");
              elem.classList.add("long-range-knob");
              knobMode='long';
              handleMeter();
              break;
        case "long-range-knob":
            if(deviceOn){
              knobLightOn()
              }
              elem.classList.remove("long-range-knob");
              elem.classList.add("mid-range-knob");
              knobMode='med';
              handleMeter();
              break;
        case "mid-range-knob":
            if(deviceOn){
              knobLightOn()
              }
              elem.classList.remove("mid-range-knob");
              elem.classList.add("close-range-knob");
              knobMode='short';
              handleMeter();
              break;
    }
}
//++
//++
function handleMeter(){
    const needlegauge = document.querySelector('.needleGauge');

    if (knobMode === 'long'){
        if (distance > 100 && deviceOn){
            needlegauge.style.transform = 'translateX(-50%) rotateZ(-65deg)';
        } else if (distance <= 100 && distance >= 0 && deviceOn){
            let needleAngle = 53 - distance;
            needlegauge.style.transform = 'translateX(-50%) rotateZ('+needleAngle+'deg)';
        }
    } else if (knobMode === 'med') {
        if (distance > 50 && deviceOn){
            needlegauge.style.transform = 'transform','translateX(-50%) rotateZ(-65deg)';
        } else if (distance <= 50 && distance >= 0 && deviceOn){
            let needleAngle = 53 - distance * 2;
            needlegauge.style.transform = 'translateX(-50%) rotateZ('+needleAngle+'deg)';
        }
    } else if (knobMode === 'short') {
        if (distance > 25 && deviceOn){
            needlegauge.style.transform = 'transform','translateX(-50%) rotateZ(-65deg)';
        } else if (distance <= 25 && distance >= 0 && deviceOn){
            let needleAngle = 53 - distance * 4;
            needlegauge.style.transform = 'translateX(-50%) rotateZ('+needleAngle+'deg)';
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
    const gaugeWrapper = document.getElementById('gauge-wrapper');
    const camera = document.getElementById('camera');

    if(screen.orientation.type === 'portrait-primary'){
        gaugeWrapper.classList.remove('hide');
        camera.classList.add('hide');
    }else{
        gaugeWrapper.classList.add('hide');
        camera.classList.remove('hide');
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
document.addEventListener("DOMContentLoaded", onLoad);

function onLoad(){
    handleEventHandlers();
    grabChapterAssets()

};
//****************************************
//****************************************
//-|
//-|
//#################################################################################
//##  Axios call for state/chapter assets and data handler functions  #############
//#################################################################################
function grabChapterAssets(){
    const axiosOptions = {
        url: '/state',
        method: 'GET',
        params: {
            story: 1, // hard coded at the moment. Will need to either grab from local storage or something
        }
    }

    axios(axiosOptions).then( handleStateAssetLoading ).catch( error => {
        console.log(error);
    });
}
//++
//++
function handleStateAssetLoading(data){
    const soundAssets = data.data[1][0];
    const miscAssets = data.data[0][0];

    target.latitude = parseFloat(miscAssets.lat);
    target.longitude = parseFloat(miscAssets.lon);
    target.loopThreshold = miscAssets.outer_threshold;
    target.talkThreshold = miscAssets.inner_threshold;

    action = miscAssets.action

    for (let i in soundAssets){
        sounds.sources[i] = './assets/' + soundAssets[i]
    }

    console.log('Our sound assets: ', sounds);
    console.log('Our other assets: ', target, action);
    loadAll();
    getLocation();
}
//****************************************
//****************************************
//-|
//-|
