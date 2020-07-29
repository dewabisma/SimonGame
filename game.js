var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var currentLevel = 0;
var gameOver = false;
var start = true;
var clickTimes = 0;

$(document).keypress(function () {
  if (start) {
    gameStart();
    start = false;
  }
});

$('div.btn').click(function () {
  var clickedButton = this;
  var userChosenColour;
  clickTimes++;
  userChosenColour = $(clickedButton).attr('id');
  userClickedPattern.push(userChosenColour);
  $(clickedButton).addClass('pressed');
  checkAnswer();
  makeSound($(clickedButton).attr('id'));
  setTimeout(function () {
    $(clickedButton).removeClass('pressed');
  }, 100);
});

function makeSound(event) {
  switch (event) {
    case 'blue':
      new Audio('sounds/blue.mp3').play();
      break;
    case 'green':
      new Audio('sounds/green.mp3').play();
      break;
    case 'red':
      new Audio('sounds/red.mp3').play();
      break;
    case 'yellow':
      new Audio('sounds/yellow.mp3').play();
      break;
    default:
      new Audio('sounds/wrong.mp3').play();
  }
}

function gameStart() {
  userClickedPattern = [];
  currentLevel++;
  var randNumber = Math.floor(Math.random() * 4);
  var randChosenColor = buttonColors[randNumber];
  $('h1').text('Level ' + currentLevel);
  gamePattern.push(randChosenColor);
  $('#' + randChosenColor).addClass('fade');
  makeSound(randChosenColor);
  setTimeout(function () {
    $('#' + randChosenColor).removeClass('fade');
  }, 100);
}

function gameOverr() {
  gamePattern = [];
  currentLevel = 0;
  $('h1').text('Game Over, press any key to play again!');
  $('body').addClass('game-over');
  makeSound();
  setTimeout(function () {
    $('body').removeClass('game-over');
  }, 100);
  start = true;
}

function checkAnswer() {
  if (userClickedPattern[clickTimes - 1] === gamePattern[clickTimes - 1]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        clickTimes = 0;
        gameStart();
      }, 1000);
    }
  } else {
    clickTimes = 0;
    gameOverr();
  }
}
