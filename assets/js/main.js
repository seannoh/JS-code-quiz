// Selectors for DOM elements
var viewHighscoresBtn = document.getElementById("view-highscores");
var highscoreModal = document.getElementById("highscore-modal");
var timerEl = document.getElementById("timer");
var startContentEl = document.getElementById("start-content");
var startBtn = document.getElementById("start-btn");
var quizContentEl = document.getElementById("quiz-content");
var endContentEl = document.getElementById("end-content");
var finalScoreEl = document.getElementById("final-score");
var initialsForm = document.getElementById("initials-form");
var initialsInput = document.getElementById("initials-input");
var initialsSubmitBtn = document.getElementById("submit");
var solutionContentEl = document.getElementById("solution-content");
var solutionTextEl = document.getElementById("solution-text");

// Variables

var questions = [
    {
      text: "String literals are enclosed in ____.",
      options: [
        "curly brackets",
        "angle brackets",
        "quotations",
        "parentheses"
      ],
      correctAnswer: "quotations"
    },
    {
      text: "____ correctly prints \"Hello, World!\" to the console in JavaScript.",
      options: [
        "System.out.println(\"Hello, World!\");",
        "print(\"Hello, World!\")",
        "Console.WriteLine(\"Hello, World!\");",
        "console.log(\"Hello, World!\");"
      ],
      correctAnswer: "console.log(\"Hello, World!\");"
    },
    {
      text: "____ correctly adds a comment in JavaScript.",
      options: [
        "/* comment */",
        "<!-- comment -->",
        "# comment",
        "${ comment }"
      ],
      correctAnswer: "/* comment */"
    },
    {
      text: "The logical statement, (!(false || (!(4 < 5) && \"false\"))), evaluates to ____.",
      options: [
        "true",
        "false"
      ],
      correctAnswer: "true"
    },
    {
      text: "____ runs some code if i is less than 3 and greater than 8.",
      options: [
        "if 3 > i < 8: ... ",
        "if(i > 3 && i < 8) { ... }",
        "if(i < 3 && i > 8) { ... }",
        "if i < 3 && i > 8 { ... }"
      ],
      correctAnswer: "if(i < 3 && i > 8) { ... }"
    },
    {
      text: "The correct syntax to create an array is ____",
      options: [
        "var arr = [];",
        "var arr = new Array();",
        "var arr = \"\".split(\"\");",
        "all of these work"
      ],
      correctAnswer: "all of these work"
    },
    {
      text: "Given an array \"arr\" with some element \"find-me\", arr.____ returns the index of \"find-me\" in \"arr\"",
      options: [
        "indexOf(\"find-me\")",
        "findIndex(\"find-me\")",
        "find(\"find-me\")",
        "valueOf(\"find-me\")"
      ],
      correctAnswer: "indexOf(\"find-me\")"
    },
    {
      text: "The statement (typeof []) will return ____.",
      options: [
        "array",
        "object",
        "undefined",
        "null"
      ],
      correctAnswer: "object"
    },
    {
      text: "In JavaScript, ____ is correct syntax for a for-loop header.",
      options: [
        "for (var i = 0; i < LENGTH; i++)",
        "for (i = 0, i < LENGTH, i++)",
        "for (var i = 0, i < LENGTH, i++)",
        "for (var i = 0 < LENGTH; i++)"
      ],
      correctAnswer: "for (var i = 0; i < LENGTH; i++)"
    },
    {
      text: "____ is correct function declaration syntax.",
      options: [
        "var foo = function(){}",
        "function foo(){}",
        "all of these",
        "var foo = new Function();"
      ],
      correctAnswer: "function foo(){}"
    }
];

var timeLeft = 100;
var questionIndex = 0;
var gameOver = false;


// Functions

function initGame(){
  // remove start content, start the timer, shuffle the questions, and display the first question
  startContentEl.style.display = "none";
  startTimer();
  shuffleArray(questions);
  console.log(questions);
  displayQuestion(questionIndex);
}

function startTimer() {
  var timerInterval = setInterval(function() {
    if(gameOver) {
      clearInterval(timerInterval);
      return;
    }
    // display time left in window and decrement
    timeLeft--;
    timerEl.textContent = timeLeft;
    // If the time left is zero, end the quiz
    if(timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function displayQuestion(index) {
  // clear content in quiz-content
  while(quizContentEl.firstChild){
    quizContentEl.removeChild(quizContentEl.firstChild);
  }

  // make visible
  quizContentEl.style.display = "flex";
  
  // create question text
  var questionText = document.createElement("h1");
  questionText.textContent = questions[index].text;
  quizContentEl.appendChild(questionText);

  // create option list
  var optionsList = document.createElement("ul");
  quizContentEl.appendChild(optionsList);

  // shuffle options order
  shuffleArray(questions[index].options);
  // for each option, create a li and button
  for(var i = 0; i < questions[index].options.length; i++){
    var newLi = document.createElement("li");
    optionsList.appendChild(newLi);

    var newBtn = document.createElement("button"); 
    newBtn.textContent = questions[index].options[i];
    newLi.appendChild(newBtn);
  }

}

function displaySolution(isCorrect) {
  // stub
  console.log(isCorrect);
  solutionContentEl.style.display = "block";
  if(isCorrect){
    solutionTextEl.textContent = "Correct! ";
  } else {
    solutionTextEl.textContent = "Wrong! ";
  }
  solutionTextEl.textContent += "The solution was: ";
  var answer = document.createElement("span");
  answer.textContent = questions[questionIndex].correctAnswer;
  answer.setAttribute("style","font-family: monospace; border: 1px solid var(--dark-color); border-radius: 0.5em; padding: 0.25em 0.5em; margin: 0.5em; background-color: var(--highlight-color);")
  solutionTextEl.appendChild(answer);
}

function checkAnswer(event) {
  // grab the element that was clicked
  var element = event.target;
  console.log(element);
  // check if element is a button
  if(element.matches("button")) {
    // check if the answer is correct and display corresponding result
    if(element.textContent === questions[questionIndex].correctAnswer){
      displaySolution(true);
    } else {
      displaySolution(false);
      timeLeft -= 10;
      timerEl.textContent = timeLeft;
    }

    // check if it is the last question, in which case, end the game. Otherwise display the next question
    if(questionIndex === questions.length - 1){
      gameOver = true;
      endQuiz();
    }else { 
      displayQuestion(++questionIndex);
    }
  }
}

function submitScore(event) {
  if(!initialsForm.checkValidity()){
    initialsForm.reportValidity();
  } else{
    var highscoreData = {initials: initialsInput.value,
                         score: finalScoreEl.textContent};
    var storedScores = localStorage.getItem("highscores");
    var scoresArr = [];

    if(!storedScores){
      scoresArr.push(highscoreData);
    } else {
      scoresArr = JSON.parse(storedScores);
      scoresArr.push(highscoreData);
    }
    localStorage.setItem("highscores", JSON.stringify(scoresArr));
  }
}

function endQuiz() {
  quizContentEl.style.display = "none";
  endContentEl.style.display = "flex";
  finalScoreEl.textContent = timeLeft;
}

function displayScores() {
  //stub
  console.log(JSON.parse(localStorage.getItem("highscores")));
}

function handleModalClicks(event) {
  console.log(event.target);
}

function shuffleArray(array) {
  // create an array of random numbers 0 to 1 with length of "array"
  var randomMap = array.map(Math.random);
  // sort "array" based on the random map
  array.sort(function(a,b){
    return randomMap[array.indexOf(a)]-randomMap[array.indexOf(b)];
  });
}

// Function calls

startBtn.addEventListener("click", initGame);
quizContentEl.addEventListener("click", checkAnswer);
initialsSubmitBtn.addEventListener("click", submitScore);
viewHighscoresBtn.addEventListener("click", displayScores);
highscoreModal.addEventListener("click", handleModalClicks);