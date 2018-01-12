
var count = 0;
var scale;
var glitch = true;

var canvas = document.querySelector('#canvas');
var context = canvas.getContext("2d");
var imageObj = new Image();
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
imageObj.src = './images/raven-transparent.png';
imageObj.onload = function(){
    draw(imageObj,context,imageObj.width,imageObj.height);
}


function draw(video,context,width,height){
    context.clearRect(0,0,width,height);

    count++;
    if (count < 20){
        scale = 20;
    } else if (count < 40){
        scale = 10;
    } else if (count < 60){
        scale = 5;
    } else if (count < 80){
        scale = 2;
    } else {
        glitch = false;
    }
    if (glitch){
        let rand = Math.floor(Math.random() * 100);
        context.filter = 'grayscale('+rand+'%)';
        var imageVerticalSlices = Math.round(height / scale);
        var canvasVerticalSlices = Math.round(canvas.height / scale);
        var maxHorizOffset = 90;


        for (var i = 0; i < imageVerticalSlices; i++)  {
            var horizOffset = getRandom(-Math.abs(maxHorizOffset), maxHorizOffset);
            context.drawImage(video, 0, i * canvasVerticalSlices, canvas.width, i * canvasVerticalSlices + canvasVerticalSlices,  horizOffset, i * imageVerticalSlices, video.width, i * imageVerticalSlices + imageVerticalSlices);
        }
    } else {
        context.drawImage(video,0,0,canvas.width,height,0,0,video.width, height);
    }

    setTimeout(draw,80,video,context,width,height);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
