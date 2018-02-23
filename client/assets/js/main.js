document.addEventListener("DOMContentLoaded", init);

function init(){
  handleEvents();
}

function handleEvents(){
  const cancelBtns = document.querySelectorAll('.cancel');
  const landingBtns = document.querySelectorAll('.landingbtn');
  const formBtns = document.querySelectorAll('.formButton');
  const inputs = document.querySelectorAll('input');
  const inputErr = document.querySelectorAll('.error');
  const repeatPass = document.querySelector('input.repeat-pass');
  assignEventHandlers(landingBtns,'click', handleLandingBtn);
  assignEventHandlers(cancelBtns,'click', handleCancel);
  assignEventHandlers(inputs, 'change', detectInputChange );
  assignEventHandlers(formBtns, 'click', inputValidation);
  assignEventHandlers(inputErr, 'click', hideError);
  assignEventHandlers(inputs, 'click', hideError);
  assignEventHandlers(inputs, 'keypress', hideError);
  assignEventHandlers(inputs, 'focusout', inputValidation);
  repeatPass.onkeyup = passwordValidation;
  handleLogError()
  disableErrBubbles()
}

function assignEventHandlers(arr, eventTrigger, eventfunction){
  for(let i=0;i<arr.length;i++){
    arr[i].addEventListener(eventTrigger, eventfunction)
  }
}

function handleCancel(event){
    event.preventDefault();
    const grandParent = event.target.parentNode.parentNode;
    const greeting = document.querySelector('.greeting');
    const about = document.querySelector('.about');
    grandParent.classList.add('fade-out');
    document.querySelector('.error-sign').classList.add('hide');
    document.querySelector('.error-log').classList.add('hide');
    setTimeout(function () {
      grandParent.classList.remove('fade-in');
      grandParent.classList.remove('fade-out');
    }, 300);
    greeting.classList.remove('fade-out');
    greeting.classList.add('fade-in');
    about.classList.add('fade-in');
    about.classList.remove('fade-out');
    if(document.querySelector('.log .error').classList.contains('fade-in') || document.querySelector('.sign .error').classList.contains('fade-in')){
        document.querySelector('.error.fade-in').classList.remove('fade-in');
    }
}

function handleLandingBtn(){
  const formLog = document.querySelector('.formLog');
  const formSign = document.querySelector('.formSign');
  const greeting = document.querySelector('.greeting');
  const about = document.querySelector('.about');
  if(this.classList.contains('signUp')){
    formSign.classList.add('fade-in');
  }else if(this.classList.contains('logIn')){
    formLog.classList.add('fade-in');
  }
  greeting.classList.add('fade-out');
  about.classList.add('fade-out');
}


function handleLogError(){
    const path = window.location.pathname;
    const formLog = document.querySelector('.formLog');
    const formSign = document.querySelector('.formSign');
    const greeting = document.querySelector('.greeting');
    if(path === "/signup"){
        formSign.classList.add('fade-in');
        document.querySelector('.error-sign').classList.remove('hide');
        greeting.classList.add('hide');
    }else if(path === "/login"){
        formLog.classList.add('fade-in');
        document.querySelector('.error-log').classList.remove('hide');
        greeting.classList.add('hide');
    }
}


function detectInputChange(){
    document.querySelector('.error-sign').classList.add('hide');
    document.querySelector('.error-log').classList.add('hide');
}

function disableErrBubbles(){
    const inputs = document.querySelectorAll('input');
    for(let i=0;i<inputs.length;i++){
      inputs[i].addEventListener('invalid', function(event){
         event.preventDefault();
      });
    }
}

function inputValidation(){
    let inputs = document.querySelectorAll('.sign input');
    if(this.parentElement.parentElement.classList.contains('log')){
        inputs = document.querySelectorAll('.log input')
    }
    for(let i = 0; i <  inputs.length ; i++){
        const spanSibling = inputs[i].nextElementSibling;
        if(inputs[i].validity.valueMissing){
            if(inputs[i].getAttribute('name')==='password2'){
                spanSibling.innerText="Please repeat previously entered password";
            } else {
                spanSibling.innerText="Please fill in "+ inputs[i].getAttribute('placeholder');
            }
            spanSibling.classList.add('fade-in');
            inputs[i].classList.add('invalid');
          return;
        }else if(inputs[i].validity.patternMismatch){
            spanSibling.innerText=inputs[i].getAttribute('title');
            spanSibling.classList.add('fade-in');
            inputs[i].classList.add('invalid')
          return;
        }
    }
}


function passwordValidation(){
    const password = document.querySelector('input.password');
    const repeatPass = document.querySelector('input.repeat-pass');
    if( password.value !== repeatPass.value ){
        this.classList.add('invalid');
        this.nextElementSibling.innerText="Passwords don't match";
        this.nextElementSibling.classList.add('fade-in');
    }
}

function hideError(){
    if(this.nextElementSibling.classList.contains('fade-in')){
        this.nextElementSibling.classList.remove('fade-in');
        this.classList.remove('invalid');
    }else if(this.classList.contains('fade-in')){
        this.classList.remove('fade-in');
        this.previousElementSibling.classList.remove('invalid');
    }
}
