var playedColors = [];
var gamePattern = [];
var level = 0;
var progress = 0;
var max_level = 0;
var playing = false ;

function nextSequence() {
  var n = Math.floor(Math.random() * 4);
  var color = bouttonsColors[n]
  $(".btn." + color).fadeOut(100).fadeIn(100);
  playAudioColor(color);
  return n;
}

var bouttonsColors = ["red", "blue", "green", "yellow"];

function fillPattern() {
  level++;
  $("h1").text("LEVEL " + level);
  gamePattern.push(bouttonsColors[nextSequence()]);
}

function playAudioColor(color) {
  var audio = new Audio("sounds\\" + color + ".mp3");
  audio.play();
}

function playFailAudio() {
  var audio = new Audio("sounds\\wrong.mp3");
  audio.play();
}

// Clic bouton
$(document).on('click', ".btn", function() {
  //alert(this.id);

if (level !=0  &&  playing == false){
     playing = true;
    var colorPlayed = this.id;

    $(".btn." + colorPlayed).addClass("pressed");
    playedColors.push(colorPlayed);
    progress++;

    setTimeout(function() {
      $(".btn." + colorPlayed).removeClass("pressed");
    }, 100);

    //Joueur joue

    if (checkAnswer(level)) {
      playAudioColor(colorPlayed);
    } else {
      gameOver();
    }
    setTimeout(function() {
      playing = false;
    }, 200);

  }
});

$("h1").click(function() {
  if (level == 0 ){
    fillPattern();
    $("h1").text("LEVEL " + level);
  }
});

$(document).keypress(function(event) {
  if (level == 0 ){
    fillPattern();
    $("h1").text("LEVEL " + level);
  }
});

function checkAnswer(level) {
  console.log(playedColors[progress-1] + " VS " + gamePattern[progress-1] );
  if (playedColors[progress-1] == gamePattern[progress-1]) {
    console.log("OK progress :" + progress + " at level " + level );
      if (max_level<progress){max_level = progress;}
    if (progress === level) {
      console.log("add after level " + level );

      playedColors = [];
      progress = 0 ;
      setTimeout(function() {
        fillPattern();
      }, 1000);
    }

    return true;
  } else {
    return false;
  }
}

function gameOver (){
  playFailAudio();
  playedColors = [];
  gamePattern = [];
  level  = 0 ;
  progress = 0 ;

  $("body").addClass("game-over");
  $("h1").text("GAME OVER X_X");
  $("h2").text("Your max level is " + max_level);
  setTimeout(function() {
    $("body").removeClass("game-over");
    $("h1").text("PRESS ANY KEY TO RESTART");
  }, 200);

playing = false;

}
