document.addEventListener('DOMContentLoaded', function() {
    initEventListeners();
});

var touchStartCoords =  {'x':-1, 'y':-1}, // X and Y coordinates on mousedown or touchstart events.
    touchEndCoords = {'x':-1, 'y':-1},// X and Y coordinates on mouseup or touchend events.
    direction = 'undefined',// Swipe direction
    minDistanceXAxis = 30,// Min distance on mousemove or touchmove on the X axis
    maxDistanceYAxis = 30,// Max distance on mousemove or touchmove on the Y axis
    maxAllowedTime = 1000,// Max allowed time between swipeStart and swipeEnd
    startTime = 0,// Time on swipeStart
    elapsedTime = 0,// Elapsed time between swipeStart and swipeEnd
    el1 = document.querySelector('.el'),// Element to delegate
    el2 = document.querySelector('.el2'),
    el3 = document.querySelector('.el3'),
    elArr = [el2, el1, el3],
    currentSpot = 1,
    newSpot = null,
    triangleLeft = document.querySelector('.triangle-left'),
    triangleRight = document.querySelector('.triangle-right'),
    targetElement = elArr[currentSpot];
    console.log(targetElement);

function swipeStart(e) {
    e = e ? e : window.event;
    e = ('changedTouches' in e)?e.changedTouches[0] : e;
    touchStartCoords = {'x':e.pageX, 'y':e.pageY};
    startTime = new Date().getTime();
    // targetElement.textContent = " ";
}

function swipeMove(e){
    e = e ? e : window.event;
    e.preventDefault();
}

function swipeEnd(e) {
    e = e ? e : window.event;
    e = ('changedTouches' in e)?e.changedTouches[0] : e;
    touchEndCoords = {'x':e.pageX - touchStartCoords.x, 'y':e.pageY - touchStartCoords.y};
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= maxAllowedTime){
        if (Math.abs(touchEndCoords.x) >= minDistanceXAxis && Math.abs(touchEndCoords.y) <= maxDistanceYAxis){
            direction = (touchEndCoords.x < 0)? 'left' : 'right';
            switch(direction){
                case 'left':
                    currentSpot++;
                    if(elArr[currentSpot] === undefined){
                        break;
                    } else {
                        if(elArr[currentSpot + 1] === undefined){
                            triangleRight.classList.remove('show-img');
                            triangleRight.classList.add('hide-img');
                        } else {
                            triangleLeft.classList.add('show-img');
                        }
                        newSpot = elArr[currentSpot];
                        targetElement.classList.remove('show-img');
                        targetElement.classList.add('hide-img');
                        newSpot.classList.remove('hide-img');
                        newSpot.classList.add('show-img');
                        targetElement = newSpot;
                        console.log('currentSpot:', currentSpot);
                        initEventListeners();
                        document.querySelector('.title-text').textContent = "New Title Here";
                        break;
                    }
                case 'right':
                    currentSpot--;
                    if(elArr[currentSpot] === undefined){
                        break;
                    } else {
                        if(elArr[currentSpot - 1] === undefined){
                            triangleLeft.classList.remove('show-img');
                            triangleLeft.classList.add('hide-img');
                        } else {
                            triangleRight.classList.add('show-img');
                        }
                        newSpot = elArr[currentSpot];
                        targetElement.classList.remove('show-img');
                        targetElement.classList.add('hide-img');
                        newSpot.classList.remove('hide-img');
                        newSpot.classList.add('show-img');
                        // targetElement.classList.add('show-img');
                        targetElement = newSpot;
                        console.log(targetElement);
                        initEventListeners();
                        break;
                    }
            }
        }
    }
}

function addMultipleListeners(el, s, fn) {
    var evts = s.split(' ');
    for (var i=0, iLen=evts.length; i<iLen; i++) {
        el.addEventListener(evts[i], fn, false);
    }
}

function initEventListeners(){
    addMultipleListeners(targetElement, 'mousedown touchstart', swipeStart);
    addMultipleListeners(targetElement, 'mousemove touchmove', swipeMove);
    addMultipleListeners(targetElement, 'mouseup touchend', swipeEnd);
}
