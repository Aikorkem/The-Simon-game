var gamePattern = [];
var clickedPattern = [];
var colors = ["red", "blue", "green", "yellow"];
var level = 0;
var correct = 0;

//Detecting the first key press, calling nextSequence and changing the title
$("body").one("keypress", function () {
  $("h1").text("Level 0");
  nextSequence();
  //setTimeout(nextSequence,100);
});

//The sequence
function nextSequence() {
  var ranN = Math.floor(Math.random() * 4);
  var randomColor = colors[ranN];
  gamePattern.push(randomColor);
  $(".btn#" + randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
  animationPress($(".btn#" + randomColor));
  level++;
  $("h1").text("Level " + level);
  clickedPattern = [];
}

//Button clicked
$(".btn").click(function () {
  var chosenColor = $(this).attr("id");
  clickedPattern.push(chosenColor);
  playSound(chosenColor);
  animationPress($(this));
  checkAnswer(clickedPattern.length-1);

  //Checking whether the pattern clicked is right or not thru loop
  correct = 0;
  for (var i = 0; i < clickedPattern.length; i++) {
    if (clickedPattern[i] != gamePattern[i]) {
      gameOver();
      startOver();
    } else {
      correct++;
    }
  }
  if (correct === gamePattern.length) {
    setTimeout(nextSequence, 600);
  }
});

//Playing corresponding sound
function playSound(name) {
  var name = new Audio("sounds/" + name + ".mp3");
  name.play();
}

//Adding class pressed
function animationPress(currentColor) {
  var color = currentColor.addClass("pressed");
  setTimeout(function () {
    color.removeClass("pressed");
  }, 100);
}

//Checking whether the last button clicked is right or not
//this function is not used
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === clickedPattern[currentLevel]){
        if(gamePattern.length === clickedPattern.length){
            setTimeout(nextSequence, 1000);
        }
    }else{
        gameOver();
        startOver();
    }
}

//Fail
function gameOver() {
  playSound("wrong");
  $("h1").text("Game Over");
  var fail = $("body").addClass("game-over");
  setTimeout(function () {
    fail.removeClass("game-over");
  }, 200);
}

//Start Over
function startOver() {
    gamePattern = [];
    level = 0;
}
