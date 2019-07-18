$(document).ready(function () {
  
  $('nav #right').click(function() {
    $('html, body').animate({
      scrollTop: $(".new-tweet").offset().top - 145
    }, 900)
  })
  
});