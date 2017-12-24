
window.addEventListener("devicemotion", handleMotion, true);

function handleMotion(DeviceMotionEvent) {
    var acceleration = DeviceMotionEvent.acceleration;
    var alpha    = DeviceMotionEvent.alpha;
    var beta     = DeviceMotionEvent.beta;
    var gamma    = DeviceMotionEvent.gamma;

    console.log(alpha, beta, gamma);

    $('.accelerometer').text(`x: ${acceleration.x} y: ${acceleration.y} z: ${acceleration.z}`);
    $('.alpha').text(alpha);
    $('.beta').text(beta);
    $('.gamma').text(gamma);
}