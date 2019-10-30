var highScores = $('#high-scores')
var highScoresReturn = $('#high-scores-return')

var showHighScorers = $('#show-high-scorers')
var message = $('#message')

var startButton = $('#start-button')
var count = $('#counter')
var main = $('#main')
var ul = document.getElementsByTagName('UL')[0];

var correct = $('#correct');
var wrong = $('#wrong');

var finalScore = $('#final-score')
var finalScoreSpan = document.querySelector('#final-score').children[0].children[0]

var noTime = $('#no-time')


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
  playerScore: finalScoreSpan.innerHTML,

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
  message.attr("style", "display: none;")
  showHighScorers.attr("style", "display: none;")
  //reset hiddencounter and set displayed count to hiddencounter
  hiddenCounter = hiddenCounter * questions.length * 10;
  count.html(hiddenCounter)

  //start timer
  var timer = setInterval(() => {
    if(hiddenCounter === 0){
      clearInterval(timer)
    } else {
      hiddenCounter--
      count.html(hiddenCounter)
    }
  }, 1000);


  displayQuestion();

  // var timer = setInterval(() => {
  //   //all questions asked then clear timer
  //   if (questionSelect === questions.length) {
  //     clearInterval(timer);
  //     console.log("hi")
  //   //otherwise if hiddenCount > 0, increment -1
  //   } else if (hiddenCounter > 0) {
  //     hiddenCounter--
  //     count.html(hiddenCounter)
  //   }
  //   else {
  //     //gameover
  //     clearInterval(timer);
  //     main.attr("style", "display: none;")
  //     noTime.attr("style", "display: block;");

  //     setTimeout(() => {
  //       noTime.attr("style", "display: none;");
  //     }, 2000);

  //     setTimeout(() => {
  //       startButton.attr("style", "display: block;");
  //     }, 2000);
  //   }
  // }, 1000);

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

  correct.attr("style", "display: none;")
  wrong.attr("style", "display: none;")

  if (event.target.textContent === questions[questionSelect]["answer"]) {
    correct.attr("style", "display: block;")
    setTimeout(() => {
      correct.attr("style", "display: none;")
    }, 1000);
    questionSelect++
    displayScore();

  } else {
    wrong.attr("style", "display: block;")
    setTimeout(() => {
      wrong.attr("style", "display: none;")
    }, 1000);

    if (hiddenCounter < 5) {
      hiddenCounter = 0;
    } else {
      hiddenCounter -= 5
      questionSelect++
      displayScore();
    }

  }
}


function displayScore() {
  //if all questions answered or time runs out then execute this
  if (questionSelect === questions.length) {
    main.attr("style", "display: none;")
    if (count.innerHTML > 0) {
      finalScoreSpan.textContent = count.textContent;
      finalScore.attr("style", "display: block;");
      userName.attr("style", "display: block;");
      submitButton.attr("style", "display: block;")
    } else {
      noTime.attr("style", "display: block;");

      setTimeout(() => {
        noTime.attr("style", "display: none;");
      }, 2000);

      setTimeout(() => {
        startButton.attr("style", "display: block;");
      }, 2000);

    }
  } else {
    displayQuestion();
  }
}

submitButton.on('click', storeScore);




function storeScore() {
  event.preventDefault();

  questionSelect = 0;

  user.player = $.trim(userName.val())
  user.playerScore = finalScoreSpan.innerHTML


  if (user.player === "") {
    $('#message').attr("style", "display: block;")
    message.innerHTML = "Name cannot be blank!"
    return;
  } else if (localStorage.getItem("user") === null || user.playerScore > parseInt(JSON.parse(localStorage.getItem("user")).playerScore)) {
    console.log('no score saved')
    localStorage.setItem("user", JSON.stringify(user))
    finalScore.setAttribute("style", "display: none;");
    userName.attr("style", "display: none;");
    submitButton.setAttribute("style", "display: none;")
    $('#message').attr("style", "display: block;")

    setTimeout(() => {
      message.innerHTML = "Score Saved!"
    }, 1000);


    setTimeout(() => {
      startButton.attr("style", "display: block;");
    }, 1000);



  }
  else {
    finalScore.setAttribute("style", "display: none;");
    userName.attr("style", "display: none;");
    submitButton.setAttribute("style", "display: none;")

    message.attr("style", "display: block;")
    message.html("Sorry you didn't beat the High Score!")

    setTimeout(() => {
      message.attr("style", "display: none;")
    }, 2000);

    startButton.attr("style", "display: none;");

    setTimeout(() => {
      startButton.attr("style", "display: block;");
    }, 2000);

    count.innerHTML = 0
  }

}

highScores.on('click', showScores);

function showScores() {
  show - high - scorers.html(JSON.parse(localStorage.getItem("user")).player + ": " + JSON.parse(localStorage.getItem("user")).playerScore);
  show - high - scorers.attr("style", "display: block;")
  startButton.attr("style", "display: none;");
  message.attr("style", "display: none;")
  finalScore.attr("style", "display: none;");
  userName.attr("style", "display: none;");
  submitButton.setAttribute("style", "display: none;")
  highScores.attr("style", "display: none;")
  highScoresReturn.attr("style", "display: block;")

}

highScoresReturn.on('click', function () {
  startButton.attr("style", "display: block");
  highScores.attr("style", "display: block;")
  highScoresReturn.attr("style", "display: none;")
  showHighScorers.attr("style", "display: none;")
})


