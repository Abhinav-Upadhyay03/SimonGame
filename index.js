var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var started = false;
var level = 0;
$(document).keydown(function(){
  if(started === false){
    var displayLevel = level + 1;
    $("#level-title").text("Level " + displayLevel);
    nextSequence();
    started = true;
  }
  started = true;

});
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4)  ;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  var displayLevel = level + 1;
  $("#level-title").text("Level "+displayLevel);
  level++;


}
function playSound(name){
  var audio = new Audio("music/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
   $("#"+currentColour).removeClass('pressed');
 }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  }else{
    playSound("game-over");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1500);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    started = false;
    level = 0;
    gamePattern=[];

  }
}
