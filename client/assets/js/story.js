document.addEventListener('DOMContentLoaded', function(){
   document.querySelector('.hamburger').addEventListener('click', function (){
       document.querySelector('.menu').classList.toggle('menu-display');
   })
});

var width = 0;
function move() {
    var elem = document.getElementById("barStatus");

    if (width < 100) {
        width += 25;  //width should = 100/# of chapters
        elem.style.width = width + '%';
    }
}
