$(document).ready(function () {
  
  $('nav #compose_btn').click(function() {
    
    $('.new-tweet').fadeToggle();
    $('.new-tweet textarea').focus();

  })
  
});