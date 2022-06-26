# JavaScript Code Quiz

A coding quiz game dynamically updated using JavaScript DOM manipulation with scores stored on local storage.

## Description

This web application uses DOM manipulation to dynamically display content to a single page. Users are prompted to start tha quiz and are then presented with a series of 10 randomly ordered  multiple choice questions. A timer that ticks down is used to indicate score. The user can click on buttons to indicate their choice, in which case the correct answer and the next question are shown. Incorrect answers detract 10 seconds from the timer. Once all questions are answered, the final score is shown and the user can submit their initials to save their score. Highscores can be viewed by clicking the button in the top left.

## Installation

Upload all files or fork from the repository to your server or deploy on Github Pages. The website linked below is deployed using Github Pages.

## Usage

Link to deployed site: https://seannoh.github.io/JS-code-quiz/  

Follow the prompts and buttons to navigate the quiz application.

### Preview

![Preview-GIF](assets/images/quiz-game-preview.gif "Preview GIF")

## Technologies Used

- HTML
- CSS
- [JavaScript](www.javascript.com)
- JavaScript Web APIs

## Code Snippets

The shuffleArray() function is an important utility function used to randomly shuffle arrays, including the array of questions and the arrays of options for each question. My implementation is based on the sort(random) function shown at this link: https://bost.ocks.org/mike/shuffle/compare.html. Note that my implementation's complexity varies by JS implementation and is slow for large arrays due to indexOf().

<details>
<summary>Click to see code snippet of shuffleArray()</summary>

```
function shuffleArray(array) {
  // create an array of random numbers 0 to 1 with length of "array"
  var randomMap = array.map(Math.random);
  // sort "array" based on the random map
  array.sort(function(a,b){
    return randomMap[array.indexOf(a)]-randomMap[array.indexOf(b)];
  });
}
```
</details>
<br>

The submitScore() function handles the main writing of highscores to local storage using the localStorage API. It uses JSON.parse() and JSON.stringify() to handle reading and writing to local storage.
<details>
<summary>Click to see code snippet of submitScore()</summary>

```
function submitScore() {
  // ensure that text box is non-empty
  if(!initialsForm.checkValidity()){
    initialsForm.reportValidity();
  } else{
    // variables for current game's score, stored score values, and new stored values
    var highscoreData = {initials: initialsInput.value,
                         score: finalScoreEl.textContent};
    var storedScores = localStorage.getItem("highscores");
    var scoresArr = [];

    // if there isn't existing score data, create new data with current game's score
    // if there is already score data, push new data onto existing data and update
    if(!storedScores){
      scoresArr.push(highscoreData);
    } else {
      scoresArr = JSON.parse(storedScores);
      scoresArr.push(highscoreData);
    }
    localStorage.setItem("highscores", JSON.stringify(scoresArr));
  }
}
```
</details>
<br>

## Credits

This application was built with the support of the resources and staff of the UCB Full Stack Full Time Coding Bootcamp Summer 2022.

### References Used

- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- https://www.w3schools.com/howto/howto_css_modals.asp
- https://developer.mozilla.org/en-US/docs/Web/API/Event
- https://stackoverflow.com/questions/12692089/preventing-double-borders-in-css
- https://www.w3schools.com/cssref/sel_nth-child.asp

## Author

This project was created by Sean Oh. 
- [Github](https://github.com/seannoh)
- [Linkedin](https://www.linkedin.com/in/sean-oh-bb9781241/)
- [Portfolio](https://seannoh.github.io/portfolio)

## License

<details>
<summary>MIT License</summary>

MIT License

Copyright (c) 2022 Sean Oh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

</details>