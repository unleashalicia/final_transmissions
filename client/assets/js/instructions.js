document.addEventListener('DOMContentLoaded', function() {
    initEventListeners();
    targetElement.classList.add('show-img');
    arrowLeft.addEventListener('click', function(){
        handleArrowClickLeft();
    });
    arrowRight.addEventListener('click', function() {
        handleArrowClickRight();
    });


});

var touchStartCoords =  {'x':-1, 'y':-1},
    touchEndCoords = {'x':-1, 'y':-1},
    direction = 'undefined',
    minDistanceXAxis = 30,
    maxDistanceYAxis = 30,
    maxAllowedTime = 1000,
    startTime = 0,
    elapsedTime = 0,
    currentSpot = 0,
    newSpot = null,
    arrowLeft = document.querySelector('.arrow-left'),
    arrowRight = document.querySelector('.arrow-right'),
    page1 = document.querySelector('.page1'),
    page2 = document.querySelector('.page2'),
    page3 = document.querySelector('.page3');
    page4 = document.querySelector('.page4');
    page5 = document.querySelector('.page5');
    elArr = [page1, page2, page3, page4, page5],
    startingImg = elArr[currentSpot],
    startingTitle = elArr[currentSpot],
    targetElement = elArr[currentSpot];

function move(direction){
    if(elArr[currentSpot + direction] === undefined){
        return;
    } else if(direction === -1) {
        if (elArr[currentSpot + direction + direction] === undefined) {
            arrowLeft.classList.remove('show-img');
            arrowLeft.classList.add('hide-img');
        } else if (elArr[currentSpot + direction] === undefined) {
            arrowLeft.classList.remove('show-img');
            arrowLeft.classList.add('hide-img');
            return;
        } else {
            arrowRight.classList.remove('hide-img')
            arrowRight.classList.add('show-img');
        }
    } else if(direction === 1){
        if(elArr[currentSpot + direction + direction] === undefined){
            arrowRight.classList.remove('show-img');
            arrowRight.classList.add('hide-img');
        } else if(elArr[currentSpot + direction] === undefined){
            arrowRight.classList.remove('show-img');
            arrowRight.classList.add('hide-img');
            return;
        } else {
            arrowLeft.classList.remove('hide-img')
            arrowLeft.classList.add('show-img');
        }
    }
    currentSpot += direction;
    newSpot = elArr[currentSpot];
    targetElement.classList.remove('show-img');
    targetElement.classList.add('hide-img');
    newSpot.classList.remove('hide-img');
    newSpot.classList.add('show-img');
    targetElement = newSpot;
    initEventListeners();
}

function handleArrowClickLeft() {
    move(-1);
}

function handleArrowClickRight(){
    move(1);
}

function swipeStart(e) {
    e = e ? e : window.event;
    e = ('changedTouches' in e)?e.changedTouches[0] : e;
    touchStartCoords = {'x':e.pageX, 'y':e.pageY};
    startTime = new Date().getTime();
}

function swipeMove(e){
    e = e ? e : window.event;
    e.preventDefault();
}

function swipeEnd(e) {
    e = e ? e : window.event;
    e = ('changedTouches' in e) ? e.changedTouches[0] : e;

    touchEndCoords = {
        'x' : e.pageX - touchStartCoords.x,
        'y' : e.pageY - touchStartCoords.y
    };

    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= maxAllowedTime){
        if (Math.abs(touchEndCoords.x) >= minDistanceXAxis && Math.abs(touchEndCoords.y) <= maxDistanceYAxis){
            direction = touchEndCoords.x < 0 ? 'left' : 'right';
            if (direction === 'left'){
                move(1);
            } else {
                move(-1);
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
