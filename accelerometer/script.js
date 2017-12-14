
window.addEventListener("devicemotion", handleMotion, true);

function handleMotion(DeviceMotionEvent) {
    var acceleration = DeviceMotionEvent.acceleration;
    // var alpha    = DeviceMotionEvent.alpha;
    // var beta     = DeviceMotionEvent.beta;
    // var gamma    = DeviceMotionEvent.gamma;

    console.log("value pertaining to acceleration: ", acceleration);
    // console.log("value pertaining to alpha: ", alpha);
    // console.log("value pertaining to beta: ", beta);
    // console.log("value pertaining to gamma: ", gamma);
}