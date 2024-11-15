// Define the four button colors
var buttonColours = ["red", "blue", "green", "yellow"];
// Store the randomly generated game pattern
var gamePattern = [];
// Store the user's clicked pattern
var userClickedPattern = [];

// Initialize game level and start status
var level = 0;
var started = false;

// Detect key press to start the game
$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

})

// Handle button clicks
$(".btn").click(function() { 
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);    
});

// Check the user's answer against the game pattern
function checkAnswer(currentLevel) {

    // Check if user has completed the current level
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }              
    }
    else {
          playSound("wrong")
          $("body").addClass("game-over");
          setTimeout(function(){
            $("body").removeClass("game-over");
          }, 200);     
          
          $("#level-title").html("Game Over, Press Any Key to Restart <br> <br> You Reached the Level "+ level);

          startOver();
    }
}

// Reset the game variables
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


// Generate the next sequence for the game
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    // Generate random colour patterns
    var randomNumber = Math.floor((Math.random() *4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Flash the chosen button
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

// Play the sound associated with a color
function playSound(name) {
    var soundOfColor = new Audio("sounds/" + name + ".mp3");
    soundOfColor.play();
}

// Animate the button press
function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}
