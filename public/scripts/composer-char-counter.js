// // Double click anywhere on the screen
// document.addEventListener("dblclick", (event) => {
//   console.log(event);
// });

// // Log all textarea's JQuery events
// $(document).ready(function() {
//   $('textarea').on('scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave load resize scroll unload error keydown keypress keyup blur focus focusin focusout change select submit', function(event) {
//     console.log(event);
//   });
// });

$(document).ready(function() {
  $('.new-tweet > form > textarea').on('keyup', function(event) {
    let count = $(this).val().length;
    let counter = $('.counter').text(140-count);

    if (count >= 140) {
      $('.counter').css({"color": "#F56566"});
    } else {
      $('.counter').css({"color": "#545149"});
    }
    console.log(counter);
  });
});