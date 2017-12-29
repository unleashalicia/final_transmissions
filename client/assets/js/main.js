document.addEventListener("DOMContentLoaded", init);

function init(){
  handleClickEvents();
}

function handleClickEvents(){
  const greeting = document.querySelector('.greeting');
  const landingContainer = document.getElementById('#landing-container');
  const open = document.querySelector('.open');
  const signUp = document.querySelector('.signUp');
  const logIn = document.querySelector('.logIn');
  const formLog = document.querySelector('.formLog');
  const formSign = document.querySelector('.formSign');
  const instruction = document.querySelector('.instruction');
  const sign = document.querySelector('.sign');

  open.onclick = function(){ //go to stories to check, leaves landing page
    landingContainer.classList.add('ghostOut').classList.add('fade-out-transition');
    setTimeout(function(){
      landingContainer.classList.remove('ghostOut');
    },3100)
  };

  document.querySelector('.experience').onclick = function(){ //go to map and camera
    if(window.outerWidth < 750 ){
      window.open('meter-index.html','_self')
    }else{
      instruction.classList.add('fade-in');
    }
  };

  document.querySelector('.signUp').onclick = function(){ //clicking the sign up button at the landing page
    greeting.classList.add('fade-out');
    formSign.classList.add('fade-in');
    sign.classList.remove('fade-out');
    sign.classList.remove('ghostOut');
  };

  document.querySelector('.logIn').onclick = function(){//clicking the log in button at the landing page
    greeting.classList.add('fade-out');
    formLog.classList.add('fade-in');
  };

  document.querySelector('.cancel').onclick = function (event) {
    const parent = event.target.parentNode;
    parent.classList.add('ghostOut');
    parent.classList.add('fade-out');
      setTimeout(function(){
          (formSign).classList.remove('ghostOut');
          formSign.classList.remove('fade-in');
          (formLog).classList.remove('ghostOut')
          }, 1000)
      greeting.classList.add('fade-in');
      greeting.classList.remove('fade-out');
  }

  document.querySelector('.btnLog').onclick = function(event) {
    const parent = event.target.parentNode;
    parent.classList.add('ghostOut').classList.add('fade-out');
      setTimeout(function(){
        formLog.classList.remove('ghostOut')
        },2500);
      open.classList.add('fade-in, appear');
      greeting.classList.add('fade-in');
      signUp.classList.add('fade-out');
      logIn.classList.add('fade-out');
      document.querySelector('.greeting h1>span').text(document.querySelector('.username').value);
  }

  document.querySelector('.btnSign').onclick = function(event) {
    const parent = event.target.parentNode;
    parent.classList.add('ghostOut');
    parent.classList.add('fade-out');
    setTimeout(function () {
        formSign.classList.remove('fade-in')
    }, 2500);
    greeting.classList.add('fade-in');
    signUp.classList.add('fade-out');
  }

  document.querySelector('.instruction div div span').onclick = function() {
    instruction.classList.add('fade-out');
  }
}
