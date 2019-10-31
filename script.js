//nav links to view high score and to go back
var highScores = $('#high-scores')
var highScoresReturn = $('#high-scores-return')

//insert high scorers name and score to be displayed
var showHighScorers = $('#show-high-scorers')

//insert messages that are change dynamically with DOM
var message = $('#message')

//button to start quiz
var startButton = $('#start-button')
//visual representation of the timer on the page
var count = $('#counter')
//main container holding questions and options
var main = $('#main')
//variable targeting the unordered list tag to set event delegation
var ul = document.getElementsByTagName('UL')[0];

//display if user selection is correct or incorrect
var correct = $('#correct');
var wrong = $('#wrong');

//displays final score when game is over
var finalScore = $('#final-score')
var finalScoreSpan = $('span')
//displays if user ran out of time 
var noTime = $('#no-time')

//targets user input for their entered name and submit button for storing to local storage
var submitButton = $('#submit')
var userName = $('#user-name')

//variable to access questions and options
var questionSelect = 0;

//variables to set the question and options
var question = $('#question')
var option1 = document.getElementsByTagName('LI')[0];
var option2 = document.getElementsByTagName('LI')[1];
var option3 = document.getElementsByTagName('LI')[2];
var option4 = document.getElementsByTagName('LI')[3];

//variable to save user to local storage using JSON
var user = {
  player: $.trim(userName.val()),
  playerScore: parseInt(finalScoreSpan.html()),

};


//an array of objects that have the question, options, and answers. These used to access, show to the user, and checked selections against answer if correct
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "The DOM refers to:",
    choices: ["delegation of macs", "directive object model", "document object model", "differing on management"],
    answer: "document object model"
  },
  {
    title: "An array variable is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "square brackets"
  },
  ///etc.
];

//hidden javascript counter
var hiddenCounter = 1;

//listening for a click on the start button
startButton.click(initTimer)

//reset and set length of timer
function initTimer() {


  //hide all displays
  startButton.attr("style", "display: none;");
  message.attr("style", "display: none;");
  showHighScorers.attr("style", "display: none;");
  //reset hiddencounter and set displayed count to hiddencounter
  hiddenCounter = 1;
  hiddenCounter = hiddenCounter * questions.length * 10;
  //set count and hiddencounter-- in this scope to start timer correctly (var timer does not start straight away)
  count.html(hiddenCounter);
  hiddenCounter--

  //start timer
  var timer = setInterval(() => {
    count.html(hiddenCounter);
    hiddenCounter--
    if (hiddenCounter === 0) clearInterval(timer);
    if (questionSelect === questions.length - 1) clearInterval(timer);
  }, 1000);

  //display the question and options
  displayQuestion();

}



function displayQuestion() {

  main.attr("style", "display: block;")


  question.html(questions[questionSelect]["title"]);
  option1.innerHTML = questions[questionSelect]["choices"][0];
  option2.innerHTML = questions[questionSelect]["choices"][1];
  option3.innerHTML = questions[questionSelect]["choices"][2];
  option4.innerHTML = questions[questionSelect]["choices"][3];

}


ul.addEventListener('click', selectOption);

function selectOption() {
  //reset messages
  correct.attr("style", "display: none;")
  wrong.attr("style", "display: none;")

  //check if selection is equal to answer
  if (event.target.textContent === questions[questionSelect]["answer"]) {
    //set message to correct
    correct.attr("style", "display: block;")
    setTimeout(() => {
      correct.attr("style", "display: none;")
    }, 1000);
    //add 1 to questionSelect (my indexer for questions array)
    questionSelect++
    //call scoreCheck to check if game end or continue
    scoreCheck();

  } else {
    //set message to
    wrong.attr("style", "display: block;")
    setTimeout(() => {
      wrong.attr("style", "display: none;")
    }, 1000);
    hiddenCounter -= 5

    //increment questions array indexer
    questionSelect++
    //check if gameover or continue
    scoreCheck();
  }

};



function scoreCheck() {
  //check if all questions answered
  if (questionSelect === questions.length) {
    //set the players final score equal to hidden counter
    user.playerScore = hiddenCounter
    main.attr("style", "display: none;")
    finalScoreSpan.html(hiddenCounter);
    finalScore.attr("style", "display: block;");
    //check if final score is higher than current high score
    if (parseInt(JSON.parse(localStorage.getItem('user'))).playerScore === null || user.playerScore < parseInt(JSON.parse(localStorage.getItem('user'))).playerScore) {
      //display message if high score not beaten
      message.attr("style", "display: block;")
      message.html("Sorry you didn't beat the High Score!")
      setTimeout(() => {
        startButton.attr("style", "display: block;");
      }, 2000);
    } else {
      //show submit button if high score beaten
      userName.attr("style", "display: block;");
      submitButton.attr("style", "display: block;")
    }
    //reset indexer
    questionSelect = 0;

  } else if (hiddenCounter === 0) {
    //check if ran out of time
    noTime.attr("style", "display: block;");
    setTimeout(() => {
      noTime.attr("style", "display: none;");
    }, 2000);
    //reset indexer
    questionSelect = 0;
    //show start quiz button
    setTimeout(() => {
      startButton.attr("style", "display: block;");
    }, 2000);
  } else {
    //else display the next question
    displayQuestion();

  }
}

//event listener on submit button
submitButton.on('click', storeScore);

function storeScore() {
  event.preventDefault();

  //set user variable object values
  user.player = $.trim(userName.val())
  user.playerScore = hiddenCounter

  //if user enters blank name
  if (user.player === "") {
    message.attr("style", "display: block;")
    message.html("Name cannot be blank!")
    return;
  } else {
    //set user in local storage as highest scorer
    localStorage.setItem("user", JSON.stringify(user))
    finalScore.attr("style", "display: none;");
    userName.attr("style", "display: none;");
    submitButton.attr("style", "display: none;")
    message.attr("style", "display: block;")
    message.html("Score saved!")

    setTimeout(() => {
      message.attr("style", "display: none;")
    }, 2000);

    startButton.attr("style", "display: none;");

    setTimeout(() => {
      startButton.attr("style", "display: block;");
    }, 2000);

    hiddenCounter = 0

  }

}

//click to view high score
highScores.on('click', showScores);

function showScores() {
  questionSelect = 0;
  hiddenCounter = 0;
  count.html(hiddenCounter)
  //if no high score on local storage, return "no high score"
  if (JSON.parse(localStorage.getItem("user")) === null) {
    highScores.attr("style", "display: none;")
    highScoresReturn.attr("style", "display: block;")
    startButton.attr("style", "display: none;");
    main.attr("style", "display: none;")
    message.attr("style", "display: block;")
    message.html("No High Score!")
    setTimeout(() => {
      message.attr("style", "display: none;")
    }, 2000);
  } else {
    //otherwise display the high scorer
    showHighScorers.html(JSON.parse(localStorage.getItem("user")).player + ": " + JSON.parse(localStorage.getItem("user")).playerScore);
    showHighScorers.attr("style", "display: block;")
    main.attr("style", "display: none;")
    startButton.attr("style", "display: none;");
    message.attr("style", "display: none;")
    finalScore.attr("style", "display: none;");
    userName.attr("style", "display: none;");
    submitButton.attr("style", "display: none;")
    highScores.attr("style", "display: none;")
    highScoresReturn.attr("style", "display: block;")
  }
}

//return button takes user back from viewing high score to start quiz
highScoresReturn.on('click', function () {
  startButton.attr("style", "display: block");
  highScores.attr("style", "display: block;")
  highScoresReturn.attr("style", "display: none;")
  showHighScorers.attr("style", "display: none;")
})


