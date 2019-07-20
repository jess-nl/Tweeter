// -----------------------------------------------
// --------- Toggle Compose Tweet/Form -----------
// -----------------------------------------------

// Hides & expands compose tweet/form when clicking
// on the navigation's right-hand button
$(document).ready(function() {
  
  $('nav #compose_btn').click(function() {
    
    $('.new-tweet').fadeToggle();
    $('.new-tweet textarea').focus();
    
    // Smooth scroll
    $('html, body').animate({
      scrollTop: $(".new-tweet").offset().top - 175
    }, 900);
  });
  
});