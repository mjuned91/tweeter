/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const renderTweets = function(tweets) {
  $('.tweet-container').empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('.tweet-container').append($tweet);
  }
};

const createTweetElement = function(tweetData) {
  let $tweet =`
  <article class="tweet-displayed">
    <header class="tweet-header">
      <div>
        <img class="tweet-image" src="${tweetData.user.avatars}">
        <span class="tweet-name">${tweetData.user.name}</span>
      </div>
      <span class="username">${tweetData.user.handle}</span>
    </header>
    <div class="tweet-content">${tweetData.content.text}</div>
    <footer class="tweet-footer">
      <div class="tweet-date">${timeago.format(tweetData.created_at)}</div>
      <div class="tweet-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`;
  return $tweet;
};

const loadTweets = function() {
  $.get("/tweets/", function(loadedTweets) {
    renderTweets(loadedTweets.reverse());
  });
};

loadTweets();

$("#new-tweet-form").submit(function(event) {
  event.preventDefault();

  const newTweet = $(this).serialize();
    $.post("/tweets/", newTweet, () => {
      $(this).find("#tweet-text").val("");
      $(this).find(".counter").val(maxChar);
      loadTweets();
    });
});

});