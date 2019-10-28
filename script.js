var highScores = document.querySelector('#high-scores')
// var highScoresReturn = document.querySelector('#high-scores-return')


var showHighScorers = document.querySelector('#show-high-scorers')
var message = document.querySelector('#message')

var startButton = document.querySelector('#start-button')
var count = document.querySelector('#counter')
var main = document.getElementById("main")
var ul = document.getElementsByTagName('UL')[1];

var correct = document.getElementById('correct');
var wrong = document.getElementById('wrong');

var finalScore = document.querySelector('#final-score')
var finalScoreSpan = document.querySelector('#final-score').children[0].children[0]

var noTime = document.querySelector('#no-time')
var userName = document.querySelector('#user-name')

var submitButton = document.querySelector('#submit')


//variable to access questions and options
var questionSelect = 0;


//Variables to set the question and options
var question = document.getElementById('question')
var option1 = document.getElementsByTagName('LI')[2];
var option2 = document.getElementsByTagName('LI')[3];
var option3 = document.getElementsByTagName('LI')[4];
var option4 = document.getElementsByTagName('LI')[5];


var user = {
  player: userName.value.trim(),
  playerScore: finalScoreSpan.innerHTML,

};



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
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  ///etc.
];



startButton.addEventListener('click', initTimer);


function initTimer() {
  count.innerHTML = 10 * questions.length;
  startButton.setAttribute("style", "display: none;");
  message.setAttribute("style", "display: none;")
  showHighScorers.setAttribute("style", "display: none;")
  timer();
}



function timer() {
  displayQuestion();


  setInterval(() => {
    if (questionSelect === questions.length) {
      clearInterval();

    } else if (count.innerHTML > 0) {
      count.innerHTML--
    }
    else {
      //gameover
      clearInterval();
    }
  }, 1000);

}



function displayQuestion() {


  main.setAttribute("style", "display: block;")


  question.innerHTML = questions[questionSelect]["title"];
  option1.innerHTML = questions[questionSelect]["choices"][0];
  option2.innerHTML = questions[questionSelect]["choices"][1];
  option3.innerHTML = questions[questionSelect]["choices"][2];
  option4.innerHTML = questions[questionSelect]["choices"][3];

}





ul.addEventListener('click', selectOption);

function selectOption() {

  correct.setAttribute("style", "display: none;")
  wrong.setAttribute("style", "display: none;")

  if (event.target.textContent === questions[questionSelect]["answer"]) {
    correct.setAttribute("style", "display: block;")
    questionSelect++
    displayScore();
  } else {
    wrong.setAttribute("style", "display: block;")
    if (count.innerHTML < 5) {
      count.innerHTML = 0;
    } else {
      count.innerHTML = count.innerHTML - 5
      questionSelect++
      displayScore();
    }

  }
}


function displayScore() {
  //if all questions answered or time runs out then execute this
  if (questionSelect === questions.length) {
    main.setAttribute("style", "display: none;")
    if (count.innerHTML > 0) {
      finalScoreSpan.textContent = count.textContent;
      finalScore.setAttribute("style", "display: block;");
      userName.setAttribute("style", "display: block;");
      submitButton.setAttribute("style", "display: block;")
    } else {
      noTime.setAttribute("style", "display: block;");

    }
  } else {
    displayQuestion();
  }
}

submitButton.addEventListener('click', storeScore);




function storeScore() {
  event.preventDefault();
  questionSelect = 0;

  user.player = userName.value.trim()
  user.playerScore = finalScoreSpan.innerHTML


  if (user.player === "") {
    message.setAttribute("style", "display: block;")
    message.innerHTML = "Name cannot be blank!"
    return;
  } else if (user.playerScore < parseInt(JSON.parse(localStorage.getItem("user")).playerScore)) {
    finalScore.setAttribute("style", "display: none;");
    userName.setAttribute("style", "display: none;");
    submitButton.setAttribute("style", "display: none;")

    message.setAttribute("style", "display: block;")
    message.innerHTML = "Sorry you didn't beat the High Score!"

    startButton.setAttribute("style", "display: block;");
  }
  else {
    localStorage.setItem("user", JSON.stringify(user))
    finalScore.setAttribute("style", "display: none;");
    userName.setAttribute("style", "display: none;");
    submitButton.setAttribute("style", "display: none;")
    message.setAttribute("style", "display: block;")
    message.innerHTML = "Score Saved!"

    startButton.setAttribute("style", "display: block;");



  }



}


highScores.addEventListener('click', showScores);

function showScores() {
  showHighScorers.innerHTML = JSON.parse(localStorage.getItem("user")).player + ": " + JSON.parse(localStorage.getItem("user")).playerScore
  showHighScorers.setAttribute("style", "display: block;")
  startButton.setAttribute("style", "display: block;");
  message.setAttribute("style", "display: none;")
  finalScore.setAttribute("style", "display: none;");
  userName.setAttribute("style", "display: none;");
  submitButton.setAttribute("style", "display: none;")
  highScores.setAttribute("style", "display: none;")
  // highScoresReturn.setAttribute("style", "display: block;")

}

// highScoresReturn.addEventListener('click', function(){
//   startButton.setAttribute("style", "display: block");
//   highScores.setAttribute("style", "display: block;")
//   highScoresReturn.setAttribute("style", "display: none;")
//   showHighScorers.setAttribute("style", "display: none;")
// })