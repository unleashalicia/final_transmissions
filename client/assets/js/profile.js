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
  profile.addEventListener("click", function(){   profileContainer.classList.toggle("hide"); });
  stories.addEventListener("click", function(){ profileContainer.classList.add("hide")})
}
