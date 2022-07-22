$(document).ready(function() {
  $( "#tweet-text" ).on("input", function(event) {
    const maxChar = 140;
    const inputChar = $(this).val().length;
    const charCounter = maxChar - inputChar;
    $("#char-counter").html(charCounter);

    if (inputChar > maxChar) {
      $("#char-counter").css("color", "red");
    } else {
      $("#char-counter").css("color", "black");
    }
  })
});