// -----------------------------------------------
// --------- Compose Tweet/Form Counter ----------
// -----------------------------------------------

$(document).ready(function() {
  $('.new-tweet > form > textarea').on('keyup', function() {
    let count = $(this).val().length;
    let counter = $('.counter').text(140 - count);

    if (count >= 140) {
      $('.counter').css({"color": "#F56566"});
    } else {
      $('.counter').css({"color": "#545149"});
    }
    console.log(counter);
  });
});