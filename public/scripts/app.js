/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let $newTweet = createTweetElement(tweet);
    $(".tweet-container ").append($newTweet);
  }
}

const createTweetElement = function(tweet) {
  let $post_container = $('<article>');
  let $handle = $('<a>');
  let $avatar = $(`<img src="${tweet.user.avatars}" />`);
  let $name = $('<h1>');
  let $post = $('<p>');
  let $date = $('<h2>');

  $handle.text(tweet.user.handle);
  $name.text(tweet.user.name);
  $post.text(tweet.content.text);
  $date.text(new Date(tweet.created_at));

  $post_container
    .append($handle)
    .append($avatar)
    .append($name)
    .append($post)
    .append($date)

  return $post_container;
}

const loadTweets = function() {
  $.get("/tweets").then(renderTweets);
}

$(document).ready(function() {
  loadTweets();

  $('.new-tweet form').on('submit', function (event) {
    event.preventDefault();


    let field = $(event.target).find('textarea').val();
    console.log("Field:", field);

    if (!field) {
      alert("Oh no! Your field is empty!");
    } else if (field.length >= 140) {
      alert("Oops! You've reached the maximum characters!");
    } else {
      alert("You're good!");
      $.post( "/tweets", $(event.target).serialize());
    }

    // $('.new-tweet form textarea').val('');
    // $('.counter').text(140);

  })

});