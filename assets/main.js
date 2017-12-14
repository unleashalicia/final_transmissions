$(document).ready(init)


function init(){
  $('.open').on('click', function(){
    $('#landing-container').addClass('ghostOut').fadeOut(3000)
  });
  $('.experience').on('click', function(){
    if(window.outerWidth < 750 ){
      window.open('map.html')
    }else{
      console.log('modal open')
      // $('.info').fadeIn();
    }
  })
  $('.story').click(function(){
    console.log('yolo')
    $('.caption', this).slideDown('linear');
  })
  $('.story').mouseleave(function(){
    console.log('yolo')
    $('.caption',this).slideUp('linear');
  })
}
