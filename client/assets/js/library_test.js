document.addEventListener('DOMContentLoaded', function() {
    initEventListeners();
    image.setAttribute('src', startingImg);
    title.textContent = startingTitle;
});

var touchStartCoords =  {'x':-1, 'y':-1}, // X and Y coordinates on mousedown or touchstart events.
    touchEndCoords = {'x':-1, 'y':-1},// X and Y coordinates on mouseup or touchend events.
    direction = 'undefined',// Swipe direction
    minDistanceXAxis = 30,// Min distance on mousemove or touchmove on the X axis
    maxDistanceYAxis = 30,// Max distance on mousemove or touchmove on the Y axis
    maxAllowedTime = 1000,// Max allowed time between swipeStart and swipeEnd
    startTime = 0,// Time on swipeStart
    elapsedTime = 0,// Elapsed time between swipeStart and swipeEnd
    image = document.querySelector('.image'),
    title = document.querySelector('.title-text'),
    elArr = [
        {
            title: 'Story X',
            img: 'assets/images/library/hallway.jpg'
        },
        {
            title: 'Story Z',
            img: 'assets/images/library/powerplant.jpg'
        },
        {
            title: 'Prologue',
            img: 'assets/images/library/stairs.jpg'
        },
        {
            title: 'Story W',
            img: 'assets/images/library/hallway2.jpg'
        },
        {
            title: 'Story Y',
            img: 'assets/images/library/woods.jpg'
        }
    ],
    currentSpot = Math.floor(elArr.length/2),
    newSpot = null,
    startingImg = elArr[currentSpot].img,
    startingTitle = elArr[currentSpot].title,
    triangleLeft = document.querySelector('.triangle-left'),
    triangleRight = document.querySelector('.triangle-right');

    // newImg = elArr[currentSpot].img;

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
                        image.setAttribute('src', newSpot.img);
                        title.textContent = newSpot.title;
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
                        image.setAttribute('src', newSpot.img);
                        title.textContent = newSpot.title;
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
    addMultipleListeners(image, 'mousedown touchstart', swipeStart);
    addMultipleListeners(image, 'mousemove touchmove', swipeMove);
    addMultipleListeners(image, 'mouseup touchend', swipeEnd);
}
