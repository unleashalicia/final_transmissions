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
    var account = document.querySelectorAll(".account-settings")[0];
    var edit = document.getElementsByClassName("edit");
    var story = document.getElementsByClassName("story");
    var submitBtn = document.querySelectorAll(".submit")[0];
    var cancelBtn = document.querySelectorAll(".cancel")[0];
    var storylist = document.querySelectorAll(".story-list")[0];
    Array.from(story).forEach(elem => elem.addEventListener('click', function() {
    this.children[0].classList.add("slideDown")
    }));
    profile.addEventListener("click", function(){   profileContainer.classList.toggle("hide")});
    stories.addEventListener("click", function(){ profileContainer.classList.add("hide")});
    Array.from(edit).forEach(elem => elem.addEventListener('click', function() {
    account.classList.remove("hide")
    }));
    submitBtn.addEventListener("click",handleSubmit);
    cancelBtn.addEventListener("click",handleCancel);
    storylist.addEventListener("click",showStory);

}

function showStory(){
  this.firstElementChild.classList.remove("hide");
  this.firstElementChild.classList.add("slideDown");
  console.log(this)
}

function handleSubmit(){
    event.preventDefault();
    var usernameInput = document.querySelector(".username").value;
    var emailInput= document.querySelector(".email").value;
    var account = document.querySelectorAll(".account-settings")[0];
    account.classList.add("hide")
    console.log(".username", usernameInput, "& .email" , emailInput);
    document.querySelector(".username").value="";
    document.querySelector(".email").value="";
}

function handleCancel(){
  event.preventDefault();
   document.querySelector(".username").value="";
   document.querySelector(".email").value="";
   var account = document.querySelectorAll(".account-settings")[0];
   account.classList.add("hide")
}
