$(document).ready(init)


function init(){
  handleClickEvents();
}

function handleClickEvents(){
  $('.open').on('click', function(){ //go to stories to check, leaves landing page
    $('#landing-container').addClass('ghostOut').fadeOut(3000)
    setTimeout(function(){
      $('#landing-container').removeClass('ghostOut')
    },3100)
  });

  $('.experience').on('click', function(){ //go to map and camera
    if(window.outerWidth < 750 ){
      window.open('meter-index.html','_self')
    }else{
      $('.instruction').fadeIn();
    }
  });

  $('.story').click(function(){ //shows the story summary
    $('.caption', this).slideDown('linear');
  });

  $('.story').mouseleave(function(){//hidesthe story summary
    $('.caption',this).slideUp('linear');
  });

  $('.signUp').on('click',function(){ //clicking the sign up button at the landing page
    $('.greeting').fadeOut();
    $('.formSign').fadeIn();
  });

  $('.logIn').on('click',function(){//clicking the log in button at the landing page
    $('.greeting').fadeOut();
    $('.formLog').fadeIn()
  });

  $('.cancel').on('click',function(){ // clicking the cancel on the sign up and log in forms
    $(this).parent().parent().addClass('ghostOut').fadeOut(2500)
    setTimeout(function(){
        $('.formSign, .formLog').removeClass('ghostOut')
    },3100)
    $('.greeting').fadeIn();
  });

  $('.btnLog').on('click',function(){ //clicking the log in button on the log in form
    $(this).parent().parent().addClass('ghostOut').fadeOut(2500)
    setTimeout(function(){
        $('.formLog').removeClass('ghostOut')
    },3100);
    $('.open').fadeIn(4000).addClass('appear');
    $('.greeting').fadeIn();
    $('.signUp').fadeOut();
    $('.logIn').fadeOut();
    $('.greeting h1>span').text($('.log div input').val());
  });

  $('.btnSign').on('click',function(){ //clicking the log in button on the sign up form
    $(this).parent().parent().addClass('ghostOut').fadeOut(2500)
    setTimeout(function(){
      $('.formSign').removeClass('ghostOut')
      },3100);
    $('.greeting').fadeIn();
    $('.signUp').fadeOut();
  });

  $('.instruction div div span').on('click', function(){ // closing the instruction div on the story page
    $('.instruction').fadeOut();
  })
}
