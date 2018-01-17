document.addEventListener("DOMContentLoaded", init);

function init(){
  handleEvents();
}

function handleEvents(){
  const cancelBtns = document.querySelectorAll('.cancel');
  const landingBtns = document.querySelectorAll('.landingbtn');
  const formBtns = document.querySelectorAll('.formButton');
  const repeatPass = document.querySelector('.repeat-pass');
  assignClickHandlers(landingBtns, handleLandingBtn); //SignUp & LogIn
  assignClickHandlers(cancelBtns, handleCancel); // Cancel Buttons for both Forms
  assignClickHandlers(formBtns, validation) // Submit forms for both formSign

}

function assignClickHandlers(arr, eventfunction){
  for(let i=0;i<arr.length;i++){
    arr[i].addEventListener('click', eventfunction)
  }
}

function handleCancel(event){
    event.preventDefault();
    const grandParent = event.target.parentNode.parentNode;
    const greeting = document.querySelector('.greeting');
    grandParent.classList.add('fade-out');
    setTimeout(function () {
      grandParent.classList.remove('ghostOut');
      grandParent.classList.remove('fade-in');
      grandParent.classList.remove('fade-out');
    }, 1500);
    greeting.classList.add('fade-in');
    greeting.classList.remove('fade-out');
}

function handleLandingBtn(){
  const formLog = document.querySelector('.formLog');
  const formSign = document.querySelector('.formSign');
  const greeting = document.querySelector('.greeting');
  if(this.classList.contains('signUp')){
    formSign.classList.add('fade-in');
    greeting.classList.add('fade-out');
  }else if(this.classList.contains('logIn')){
    formLog.classList.add('fade-in');
    greeting.classList.add('fade-out');
  }
}

function checkValidity(elemArr){ //core function checking any element arr for any invalid element inputs
    let invalidElems=[];
    elemArr.forEach(function(elem){
        if(!elem.validity.valid){
            invalidElems.push(elem.name)
        }
    })
    return invalidElems;
}

function generateErrorMsg(invalidArr){ //generates the proper error msg depending on what input is invalid
    const error = document.getElementById("error")
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    if(error.children[1]){
        error.removeChild(error.children[1]);
    }
    invalidArr.forEach(function(elem){
        const li = document.createElement('li');
            if(elem==="username"){
                li.textContent="• "+elem+" has to be 4-20 characters long"
            }else if(elem==="password"){
                li.textContent="• "+elem+" has to be 8-25 characters long with atleast one uppercase letter, one number and one special character"
            }else if(elem==="password2"){
                li.textContent="• Both passwords has to match"
            }else{
                li.textContent="• "+elem+" has to be in valid email format"
            }
            ul.appendChild(li)
        });
    fragment.appendChild(ul);
    error.appendChild(fragment);
    error.style="display:block";
}

function validation(event){ //checks for any invalid inputs and displays what needs to be corrected
    event.preventDefault();
    const inputs = document.querySelectorAll('.sign input')
    const invalidInputs = checkValidity(inputs);
    let inputData={};
    let urlStr=""
    let errorMsg=""
    if(invalidInputs.length){
        generateErrorMsg(invalidInputs)
        return;
    }else{
        if(this.classList.contains('btnSign')){
            inputData={
              email: document.querySelector(".sign input[name='email']").value,
              password: document.querySelector(".sign input[name='password']").value,
              user_name: document.querySelector(".sign input[name='username']").value
            };
            urlStr="/signup";
            errorMsg="Something has happened signing in to the server";
        }else if(this.classList.contains('btnLog')){
            inputData={
              password: document.querySelector(".formLog input[name='password']").value,
              user_name: document.querySelector(".formLog input[name='username']").value
            };
            urlStr="/login";
            errorMsg="Something has happened logging in to the server";
        }
        userCall(inputData,urlStr,errorMsg)
    }
}

function userCall(input, url, msg){ //axios call for both sign and login
    console.log('input',input, 'url', url,'msg',msg);
    axios({
        url: url,
        method: "POST",
        responseType: "document",
        data: input
    }).then(function(response) {
        console.log(response);
        console.log("This is the page that will be redirected to: ", response.data.URL);
        window.location = response.data.URL;
    }).catch(function(error) {
        console.error(msg, error);
    });
}
