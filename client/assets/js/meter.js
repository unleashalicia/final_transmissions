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
var ending;
var effect;
var target = {
    latitude: 0,
    longitude: 0,
    loopThreshold: 0,
    talkThreshold: 0
};
var distance;
var knobMode='long';
var action;
var next = false;
var chapter;
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

                sounds.ready = true;
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
        var loop;
        if (i === 'outerAudio'){
            loop = true;
        } else {
            loop = false;
        }
        if (count === 1 && chapter < 5){
            sounds.numLoaded++;
        }
        sounds[count] = loadSound(sounds.sources[i], loop);
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

    if (dist <= target.talkThreshold && !sounds[1].playing(speaking) && deviceOn) {
        if (!speaking){
            speaking = sounds[1].play();
            sounds[1].fade(0,0.9,1500,speaking);
            sounds[1].on('end',function(){
                sounds.speakingPlayed = true;
            }, speaking);
        } else {
            if (!sounds.speakingPlayed){
                sounds[1].play(speaking);
                sounds[1].fade(0,0.9,1500,speaking);
            }
        }
        document.querySelector('.out-of-range').style.display="none";
    } else if (dist > target.talkThreshold && sounds[1].playing(speaking)){
        sounds[1].fade(0.9,0,1500,speaking).once('fade',function(){
            sounds[1].pause(speaking);
        }, speaking);
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
    const nextEvent = document.querySelector('.next-event');

    loadingBtn.addEventListener('click', fullscreen);

    knobImg.addEventListener('click', function(){
        knobRange(knobImg);
    });
    uiSwitch.addEventListener('click',flipSwitch);

    window.addEventListener('orientationchange',handleOrientation);


    nextEvent.addEventListener('click', moveToNextChapter);
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
    switch (elem.className) {
        case "close-range-knob":
            if(deviceOn){
                knobLightOn();
            }
            elem.classList.remove("close-range-knob");
            elem.classList.add("long-range-knob");
            knobMode='long';
            handleMeter();
            break;
        case "long-range-knob":
            if(deviceOn){
                knobLightOn();
            }
            elem.classList.remove("long-range-knob");
            elem.classList.add("mid-range-knob");
            knobMode='med';
            handleMeter();
            break;
        case "mid-range-knob":
            if(deviceOn){
                knobLightOn();
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
            needlegauge.style.transform = 'translateX(-50%) rotateZ(-65deg)';
        } else if (distance <= 50 && distance >= 0 && deviceOn){
            let needleAngle = 53 - distance * 2;
            needlegauge.style.transform = 'translateX(-50%) rotateZ('+needleAngle+'deg)';
        }
    } else if (knobMode === 'short') {
        if (distance > 25 && deviceOn){
            needlegauge.style.transform = 'translateX(-50%) rotateZ(-65deg)';
        } else if (distance <= 25 && distance >= 0 && deviceOn){
            let needleAngle = 53 - distance * 4;
            needlegauge.style.transform = 'translateX(-50%) rotateZ('+needleAngle+'deg)';
        }
    }


}
//++
//++
function fullscreen(){
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
    const gaugeWrapper = document.getElementById('gauge-wrapper');
    const camera = document.getElementById('camera');
    const tilt = document.querySelector('.tilt');
    const outOfRange = document.querySelector('.out-of-range');

    handleOutOfRange()

    if(screen.orientation.type === 'portrait-primary'){
        gaugeWrapper.style.display="block"
        camera.style.display="none"
        tilt.style.display="none"
        outOfRange.style.display="none"
    }else{
        gaugeWrapper.style.display="none"
        camera.style.display="block"
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
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maxAge: 10000
    };

    if (!coord && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showSuccess,showError,options);
    } else if (navigator.geolocation){
        watchHandler = navigator.geolocation.watchPosition(showSuccess,showError,options);
    }else {
        location = "Geolocation is not supported by this browser.";
    }


    function showSuccess(pos) {
        errorCount = 0;

        coord = pos.coords;

        distance = getDistanceFromLatLonInKm(coord.latitude,coord.longitude,target.latitude,target.longitude);

        //Update the meter needle position
        handleMeter();

        //decide whether to play or stop current audio tracks
        handleAudioPlayback(distance);

        //message to indicate user is out of range on AR module
        handleOutOfRange();
    }

    function showError(err){
        errorCount++;
        console.warn(`ERROR(${err.code}) - (${errorCount}) bad calls`);

        if (errorCount > 10){
            window.location.href = "/profile";
        }
    }
}

function handleOutOfRange(){
    const outOfRange = document.querySelector('.out-of-range');
    if(distance > target.talkThreshold && deviceOn){
        outOfRange.style.display="block";
    }else{
        outOfRange.style.display="none";
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
//########################################
//##  Asset Loading/Axios  ###############
//########################################
function moveToNextChapter(){
    const storyID = sessionStorage.getItem('story_id');

    axios.post('/action',{story: Number(storyID), action: 'proceed'}).then(() => {
        if (chapter !== 5){
            window.location.href = '/play';
        } else {
            window.location.href = '/profile';
        }

    }).catch( error => {
        window.location.href = "/story/id/" + axiosOptions.params.story;
    });
}
//++
//++
function grabChapterAssets(){
    const storyID = sessionStorage.getItem('story_id');

    axios.get('/state',{params : {story: storyID}}).then( handleStateAssetLoading ).catch( error => {
        window.location.href = "/story/id/" + storyID;
    });
}
//++
//++
function handleStateAssetLoading(data){
    const soundAssets = data.data[1][0];
    const miscAssets = data.data[0][0];
    const cam = document.getElementById('camera');
    const storyID = sessionStorage.getItem('story_id');
    chapter = miscAssets.state_id;

    target.latitude = parseFloat(miscAssets.lat);
    target.longitude = parseFloat(miscAssets.lon);
    target.loopThreshold = miscAssets.outer_threshold;
    target.talkThreshold = miscAssets.inner_threshold;

    action = miscAssets.action

    for (let i in soundAssets){
        sounds.sources[i] = './assets/' + soundAssets[i]
    }

    let currentChapter = miscAssets.state_id;

    cam.src = `/assets/AR/${storyID}-${currentChapter}.html`;

    loadAll();
    getLocation();
}
//****************************************
//****************************************
//-|
//-|
//#############################################
//##  AR Display Toggle Function  #############
//#############################################
function makeVisible(number){
    const shapeArray = document.getElementsByClassName('appearingShape');

    for (let i=0; i<shapeArray.length; i++){
        if(number > 0){
            shapeArray[i].classList.remove('hide');
        }else {
            shapeArray[i].classList.add('hide');
        }
    }
}
//++
//++

function handleARvisibility(){
    if (!next && distance < target.talkThreshold){
        next = true;
    }
}
//++
//++
function markerListener(){
    const nextEvent = document.querySelector(".next-event");
    const spectralRangeTooFar = document.querySelector('p.out-of-range');
    const tilt = document.querySelector('.tilt');
    if (chapter === 5) nextEvent.textContent = 'End Story';
    nextEvent.classList.remove("hide");
    spectralRangeTooFar.remove();
    tilt.style.display="block";
    if (chapter == 5){
        ending = sounds[2].play();
        sounds[2].fade(0,0.9,1500,ending);
        sounds[1].fade(0.9,0.5,1500,speaking);
    }
}
//****************************************
//**************END***********************
//****************************************
