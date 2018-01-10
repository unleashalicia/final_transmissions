document.addEventListener("DOMContentLoaded", init);

function init(){
  handleClickEvents();
}

function handleClickEvents(){
  const cancelBtns = document.querySelectorAll('.cancel');
  const landingBtns = document.querySelectorAll('.landingbtn');
  const formBtns = document.querySelectorAll('.formButton');
  assignClickHandlers(landingBtns, handleLandingBtn);
  assignClickHandlers(cancelBtns, handleCancel);
  assignClickHandlers(formBtns, userCall)
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
  console.log('landingbtn clicked');
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

function userCall(event){
  event.preventDefault()
  console.log('user calling from', this.className);
  let inputData={}
  let urlStr=""
  let errorMsg=""
    if(this.classList.contains('btnSign')){
        inputData={
          email: document.querySelector(".sign input[name='email']").value,
          password: document.querySelector(".sign input[name='password']").value,
          user_name: document.querySelector(".sign input[name='user_name']").value
        };
        urlStr="/signup";
        errorMsg="Something has happened signing in to the server";
    }else if(this.classList.contains('btnLog')){
        inputData={
          password: document.querySelector(".sign input[name='password']").value,
          user_name: document.querySelector(".sign input[name='user_name']").value
        };
        urlStr="/login";
        errorMsg="Something has happened logging in to the server";
    }
    axios({
        url: urlStr,
        method: "POST",
        responseType: "document",
        data: inputData
    }).then(function(response) {
        console.log(response);
        console.log("This is the page that will be redirected to: ", response.data.URL);
        window.location = response.data.URL;
    }).catch(function(error) {
        console.error(errorMsg, error);
    });
}

//Kepping all coode for reference;


// function handleSignUp(){                              //just substitute the anonymous function with the imported axios calls when the axios calls gets centralized
//   document.querySelector('.btnSign').addEventListener('click', function(event) {
//     console.log('signing in');
//     axios({
//         url: "/signup",
//         method: "POST",
//         responseType: "document",
//         data: {
//             email: document.querySelector(".sign input[name='email']").value,
//             password: document.querySelector(".sign input[name='password']").value,
//             user_name: document.querySelector(".sign input[name='user_name']").value
//         }
//     }).then(function(response) {
//         console.log(response);
//         console.log("This is the page that will be redirected to: ", response.data.URL);
//         window.location = response.data.URL; // Will need to be modified
//                                              // Essentially is used to redirect when you have a successful response
//     }).catch(function(error) {
//         console.error("Something has happened signing in to the server", error);
//     });
//   });
// }
//
//
// function handleLogIn(){                             //just substitute the anonymous function with the imported axios calls when the axios calls gets centralized
//   document.querySelector('.btnLog').addEventListener('click', function(event) {
//       // function submitSignup() {
//         console.log("logging in");
//         axios({
//             url: "/login",
//             method: "POST",
//             responseType: "document",
//             data: {
//                 password: document.querySelector(".sign input[name='password']").value,
//                 user_name: document.querySelector(".sign input[name='user_name']").value
//             }
//         }).then(function(response) {
//             console.log("this is what the server returns after a successfull call", response);
//             console.log("This is the page that will be redirected to: ", response.data.URL);
//             window.location = response.data.URL; // Will need to be modified
//                                                  // Essentially is used to redirect when you have a successful response
//         }).catch(function(error) {
//             console.error("Something has happened logging in to the server",error);
//         });
//     });
//   }
