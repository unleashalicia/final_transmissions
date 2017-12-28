(function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
})(handleEventHandlers)


function handleEventHandlers(){
  var profile = document.querySelectorAll(".profile")[0];
  var stories = document.querySelectorAll(".stories")[0];
  var profileContainer = document.querySelectorAll(".profile-container")[0];
  var story = document.getElementsByClassName("story");
  Array.from(story).forEach(elem => elem.addEventListener('click', function() {
  this.children[0].classList.add("slideDown")
  }));
  profile.addEventListener("click", function(){   profileContainer.classList.toggle("hide")});
  stories.addEventListener("click", function(){ profileContainer.classList.add("hide")});
}
