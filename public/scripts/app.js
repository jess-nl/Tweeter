// -----------------------------------------------
// ------------ Client-Side JS Logic -------------
// -----------------------------------------------

// Iterate through tweets
const renderTweets = function(tweets, effect) {
  for (let tweet of tweets) {
    let $newTweet = createTweetElement(tweet);
    if (effect) {
      $newTweet.hide();
    }
    $(".tweet-container").prepend($newTweet);
  }
};

// Create tweets elements for tweets on submit
const createTweetElement = function(tweet) {

  // Set elements
  let $postContainer = $('<article class="tweet">');
  let $handle = $('<a>');
  let $avatar = `<img src="${tweet.user.avatars}" />`;
  let $name = $('<h1>');
  let $post = $('<p>');
  let $date = $('<h2>');
  let $icons = `<img src="${'../images/icons.png'}" />`;

  // Tweet in three parts
  let $header = $('<header>');
  let $body = $('<body>');
  let $footer = $('<footer>');

  $header.append($handle, $avatar, $name);
  $body.append($post);
  $footer.append($date, $icons);

  // Add data/content to elements
  $handle.text(tweet.user.handle);
  $name.text(tweet.user.name);
  $post.text(tweet.content.text);
  $date.text(new Date(tweet.created_at));

  // Append elements to container
  $postContainer
    .append($header)
    .append($body)
    .append($footer);

  return $postContainer;
};

// Load existing tweets. Tweets already submitted.
const loadTweets = function() {
  $.get("/tweets").then((result) => {
    renderTweets(result, false);
  });
};

// Load current tweets
const loadCurrentTweet = function() {
  $.get("/tweets").then((result) => {
    renderTweets([result[result.length - 1]], true);

    // Sliding effect
    $('article:first').slideDown('slow', () => {});
  });
};

// Tweet submissions
$(document).ready(function() {

  loadTweets();

  // Error message passed to conditional statements below
  let $error = $('<p>');
  $("#error-message").append($error);

  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();

    // Characters typed in real time
    let field = $(event.target).find('textarea').val();

    // Empty field
    if (!field) {
      $error.text("Oh no! Your field is empty!");
      $("#error-message").slideDown().addClass('show_error_msg');
    
      // Reaches maximum amount of typed characters
    } else if (field.length >= 140) {
      $error.text("Oops! You've reached the maximum characters!");
      $("#error-message").slideDown().addClass('show_error_msg');

      // Successful tweet submission
    } else {
      $.post("/tweets", $(event.target).serialize()).then(() => {
        $("#error-message").slideUp().removeClass('show_error_msg');
        loadCurrentTweet();
        $('.new-tweet form textarea').val('');
        $('.counter').text(140);
      });
    }

  });

});