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
  const sign = document.querySelector('.sign');
  const cancelBtns = document.querySelectorAll('.cancel');

  open.onclick = function(){ //go to stories to check, leaves landing page
    landingContainer.classList.add('ghostOut').classList.add('fade-out-transition');
    setTimeout(function(){
      landingContainer.classList.remove('ghostOut');
    },3100)
  };

  document.querySelector('.signUp').addEventListener('click', function(){ //clicking the sign up button at the landing page
    greeting.classList.add('fade-out');
    formSign.classList.add('fade-in');
    sign.classList.remove('fade-out');
    sign.classList.remove('ghostOut');
  });

  document.querySelector('.logIn').addEventListener('click', function(){//clicking the log in button at the landing page
    greeting.classList.add('fade-out');
    greeting.classList.remove('fade-in');
    formLog.classList.add('fade-in');
  });

  for(let i = 0; i < cancelBtns.length; i++) {
    cancelBtns[i].addEventListener('click', function (event) {
      event.preventDefault();
      const grandParent = event.target.parentNode.parentNode;
      grandParent.classList.add('fade-out');
      setTimeout(function () {
        grandParent.classList.remove('ghostOut');
        grandParent.classList.remove('fade-in');
        grandParent.classList.remove('fade-out');
      }, 1500);
      greeting.classList.add('fade-in');
      greeting.classList.remove('fade-out');
    });
  }

  document.querySelector('.btnLog').addEventListener('click', function(event) {
    const parent = event.target.parentNode;
    parent.classList.add('ghostOut').classList.add('fade-out');
      setTimeout(function(){
        formLog.classList.remove('ghostOut')
        },2000);
      open.classList.add('fade-in appear');
      greeting.classList.add('fade-in');
      signUp.classList.add('fade-out');
      logIn.classList.add('fade-out');
      document.querySelector('.greeting h1>span').text(document.querySelector('.username').value);
  });

  document.querySelector('.btnSign').addEventListener('click', function(event) {
    const parent = event.target.parentNode;
    parent.classList.add('ghostOut');
    parent.classList.add('fade-out');
    setTimeout(function () {
        formSign.classList.remove('fade-in');
        greeting.classList.remove('fade-out');
        greeting.classList.add('fade-in');
    }, 1500);
  });

}
