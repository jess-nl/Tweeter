/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//  iterate through tweets
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let $newTweet = createTweetElement(tweet);
    $(".tweet-container").append($newTweet);
  }
}

// 
const createTweetElement = function(tweet) {
  // set tags
  let $post_container = $('<article>');
  let $handle = $('<a>');
  let $avatar = $(`<img src="${tweet.user.avatars}" />`);
  let $name = $('<h1>');
  let $post = $('<p>');
  let $date = $('<h2>');

  // calling value from tweets object
  $handle.text(tweet.user.handle);
  $name.text(tweet.user.name);
  $post.text(tweet.content.text);
  $date.text(new Date(tweet.created_at));

  // append to post_container class
  $post_container
    .append($handle)
    .append($avatar)
    .append($name)
    .append($post)
    .append($date)

  return $post_container;
}

// existing tweets. tweets already submitted
const loadTweets = function() {
  $.get("/tweets").then((result) => {
    renderTweets(result);
  });
}

// current tweets
const loadCurrentTweet = function() {
  $.get("/tweets").then((result) => {
    renderTweets([result[result.length - 1]]);
  });
}

$(document).ready(function() {
  loadTweets();

  $('.new-tweet form').on('submit', function (event) {
    event.preventDefault();

    let field = $(event.target).find('textarea').val();
    console.log("Field:", field);

    if (!field) {
      // alert("Oh no! Your field is empty!");
    } else if (field.length >= 140) {
      // alert("Oops! You've reached the maximum characters!");
    } else {
      // alert("You're good!");
      $.post( "/tweets", $(event.target).serialize()).then(() => {
        loadCurrentTweet();
      });
    }

  })

});