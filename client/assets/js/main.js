document.addEventListener("DOMContentLoaded", init);

function init(){
  handleEvents();
}

function handleEvents(){
  const cancelBtns = document.querySelectorAll('.cancel');
  const landingBtns = document.querySelectorAll('.landingbtn');
  const formBtns = document.querySelectorAll('.formButton');
  const repeatPass = document.querySelector('.repeat-pass');
  const inputs = document.querySelectorAll('input');
  assignEventHandlers(landingBtns,'click', handleLandingBtn);
  assignEventHandlers(cancelBtns,'click', handleCancel);
  assignEventHandlers(inputs, 'change', detectInputChange );
  assignEventHandlers(formBtns, 'click', submitValidation)
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

function submitValidation(){
    console.log('validating shit', this.parentNode.child);
    const inputs = document.querySelectorAll('.formSign input');
    for(let i = 0; i <  inputs.length ; i++){
        if(inputs[i].validity.valueMissing){
            inputs[i].nextElementSibling.innerText="Please fill in the input"
            inputs[i].nextElementSibling.classList.remove('hide')
        }else if(inputs[i].validity.patternMismatch){
            inputs[i].nextElementSibling.innerText=inputs[i].getAttribute('title')
            inputs[i].nextElementSibling.remove('hide')
        }
    }
}
