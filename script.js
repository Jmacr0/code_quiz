var startButton = document.querySelector('#start-button')
var count = document.querySelector('#counter')
var main = document.getElementById("main")
var ul = document.getElementsByTagName('UL')[1];

var correct = document.getElementById('correct');
var wrong = document.getElementById('wrong');

var finalScore = document.getElementById('final-score')
var finalScoreSpan = document.getElementById('final-score').children[0].children[0]
var noTime = document.getElementById('no-time')



//variable to access questions and options
var questionSelect = 0;


//Variables to set the question and options
var question = document.getElementById('question')
var option1 = document.getElementsByTagName('LI')[2];
var option2 = document.getElementsByTagName('LI')[3];
var option3 = document.getElementsByTagName('LI')[4];
var option4 = document.getElementsByTagName('LI')[5];



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
  ///etc.
];

startButton.addEventListener('click', initTimer);


function initTimer() {
  count.innerHTML = 10 * questions.length;
  startButton.setAttribute("style", "display: none;");
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
  console.log(event.target)
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
    if (count.innerHTML > 0) {
      finalScore.setAttribute("style", "display: block;");
      finalScoreSpan.textContent = count.textContent;
    } else {
      noTime.setAttribute("style", "display: block;");

    }
  } else {
    displayQuestion();
  }
}