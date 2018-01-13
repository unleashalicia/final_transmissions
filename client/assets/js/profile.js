document.addEventListener('DOMContentLoaded', handleEventHandlers);



function handleEventHandlers(){
  //**will segregate these handlers in later configurations**//
  moveGhost();
}


function moveGhost(){
    const ghost = document.querySelector(".ghost")
    setInterval(()=>{
        const x = Math.ceil(Math.random()*290)+"%";
        const y = Math.ceil(Math.random()*-290)+"%";
        ghost.style=`transform: translate(${x},${y})`
    },2000)
}

function loggingOut(){
  window.open("/logout","_self");
}


// function handleSubmit(){
//     event.preventDefault();
//     var usernameInput = document.querySelector(".username").value;
//     var emailInput= document.querySelector(".email").value;
//     var account = document.querySelectorAll(".account-settings")[0];
//     account.classList.add("hide")
//     console.log(".username", usernameInput, "& .email" , emailInput);
//     document.querySelector(".username").value="";
//     document.querySelector(".email").value="";
// }
//
// function handleCancel(){
//   event.preventDefault();
//    document.querySelector(".username").value="";
//    document.querySelector(".email").value="";
//    var account = document.querySelectorAll(".account-settings")[0];
//    account.classList.add("hide")
// }
