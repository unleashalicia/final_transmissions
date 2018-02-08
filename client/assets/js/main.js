document.addEventListener("DOMContentLoaded", init);

function init(){
  handleEvents();
}

function handleEvents(){
  const cancelBtns = document.querySelectorAll('.cancel');
  const landingBtns = document.querySelectorAll('.landingbtn');
  const formBtns = document.querySelectorAll('.formButton');
  const repeatPass = document.querySelector('.repeat-pass');
  assignClickHandlers(landingBtns, handleLandingBtn);
  assignClickHandlers(cancelBtns, handleCancel);

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
      grandParent.classList.remove('fade-in');
      grandParent.classList.remove('fade-out');
  }, 300);
    greeting.classList.remove('fade-out');
    greeting.classList.add('fade-in');

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
