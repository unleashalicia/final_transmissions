document.addEventListener('DOMContentLoaded', handleEventHandlers);



function handleEventHandlers(){
  //**will segregate these handlers in later configurations**//
    var profile = document.querySelectorAll(".profile")[0];
    var stories = document.querySelectorAll(".stories")[0];
    var profileContainer = document.querySelectorAll(".profile-container")[0];
    var account = document.querySelectorAll(".account-settings")[0];
    var edit = document.getElementsByClassName("edit");
    var story = document.getElementsByClassName("story");
    var submitBtn = document.querySelectorAll(".submit")[0];
    var cancelBtn = document.querySelectorAll(".cancel")[0];
    var storylist = document.querySelectorAll(".story-list");
    var logOut = document.getElementsByClassName("log-out")[0];
    var experience = document.querySelectorAll(".experience");
    Array.from(storylist).forEach(elem => elem.addEventListener('click',showStory));
    profile.addEventListener("click", function(){   profileContainer.classList.toggle("hide")});
    stories.addEventListener("click", function(){ profileContainer.classList.add("hide")});
    Array.from(edit).forEach(elem => elem.addEventListener('click', function() {
    account.classList.remove("hide")
    }));
    submitBtn.addEventListener("click",handleSubmit);
    cancelBtn.addEventListener("click",handleCancel);
    logOut.addEventListener("click", function(){
      document.getElementsByClassName("logOut-container")[0].classList.remove("hide");
    });
    document.querySelectorAll(".logOut button")[1].addEventListener("click", function(){
        document.getElementsByClassName("logOut-container")[0].classList.add("hide")
    });
    document.querySelectorAll(".logOut button")[0].addEventListener("click", loggingOut);
    Array.from(experience).forEach(elem => elem.addEventListener('click',goToExperience));
    document.querySelectorAll(".instruction span")[0].addEventListener("click", function(){
      document.querySelectorAll(".instruction")[0].classList.add("hide");
    })
}

function goToExperience(){
  if(window.outerWidth < 750){
    window.open("/play","_self");
  }else{
    document.querySelectorAll(".instruction")[0].classList.remove("hide");
  }
}

function loggingOut(){
  window.open("/logout","_self");
}

function showStory(){
  var story = document.querySelectorAll(".story");
  if(!this.firstElementChild.classList.contains("slideDown")){
    Array.from(story).forEach(elem => elem.classList.remove("slideDown"));
  }
  this.firstElementChild.classList.toggle("slideDown");
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
