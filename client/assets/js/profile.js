document.addEventListener('DOMContentLoaded', handleEventHandlers);



function handleEventHandlers(){
  //**will segregate these handlers in later configurations**//

  const confirm = document.querySelector(".log-out");
  const noBtn = document.querySelector(".no");
  const logOutModal = document.querySelector(".logOut-container");
  const editText = document.querySelector(".edit-text");


  editText.addEventListener("click", function(){
      makeInput(this)
  })
  noBtn.addEventListener("click",function(){
     logOutModal.classList.add("hide");
 }); //gets the user back to the profile page


  confirm.addEventListener("click", function(){
      logOutModal.classList.remove("hide")
  }); // shows log out confirm modal.
}

//
// function moveGhost(){
//     const ghost = document.querySelector(".ghost")
//     setInterval(()=>{
//         const x = Math.ceil(Math.random()*290)+"%";
//         const y = Math.ceil(Math.random()*-290)+"%";
//         ghost.style=`transform: translate(${x},${y})`
//     },3000)
// }

//the email is replaced with an input element .
function makeInput(){
    const fragment = document.createDocumentFragment();
    const form = document.createElement("form")
    const input = document.createElement("input")
    const submit = document.createElement("button")
    const cancel = document.createElement("button")
    form.classList.add("email-container");
    input.type="email";
    input.placeholder=event.target.previousSibling.innerHTML;
    input.pattern="^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
    input.required=true;
    input.classList.add("email-input");
    submit.textContent="Submit";
    cancel.type="button";
    cancel.classList.add("cancel");
    submit.onclick=function(){
        if(this.previousSibling.value.match(/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            document.querySelector('.modal').classList.remove('hide');
            console.log(this.previousSibling.value)
        }
    }
    cancel.onclick=function(){
        revertInput();
    }
    cancel.textContent="Cancel"
    form.appendChild(input);
    form.appendChild(submit);
    form.appendChild(cancel)
    fragment.appendChild(form);
    event.target.parentNode.replaceWith(fragment);
}
//function reverting the input back to email
function revertInput(){
    const fragment = document.createDocumentFragment();
    const paragraph = document.createElement('p');
    const emailSpan = document.createElement('span');
    const userSpan = document.createElement('span');
    const editImg = document.createElement('img');
    emailSpan.classList.add("profile-details");
    paragraph.classList.add("email");
    userSpan.classList.add("user-details-email");
    editImg.classList.add("edit-text");
    emailSpan.textContent="EMAIL: ";
    userSpan.textContent=document.querySelector('.email-container input').placeholder
    editImg.src="assets/images/profile/edittext.png";
    editImg.onclick=makeInput;
    paragraph.appendChild(emailSpan);
    paragraph.appendChild(userSpan);
    paragraph.appendChild(editImg);
    fragment.appendChild(paragraph);
    event.target.parentNode.replaceWith(fragment);
}

/******************************************/
/******** AXIOS CALL ***********************/
/*****************************************/
function updateEmail(elem){
const inputData = elem.previousSibling.value
    axios.put({
        url: "/email",
        method: "POST",
        responseType: "document",
        data: inputData
    }).then(function(response) {
        document.querySelector('.modal').classList.add('hide');
        console.log(response);
        console.log("This is the page that will be redirected to: ", response.data.URL);
        window.location = response.data.URL;
    }).catch(function(error) {
        console.error(errorMsg, error);
    });
}

/******************************************/
/******** AXIOS CALL ***********************/
/*****************************************/

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
