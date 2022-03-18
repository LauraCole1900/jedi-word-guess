$(document).ready(function () {
  // ## Instructions

  // The completed application should meet the following criteria:

  // * As a user, I want to start the game by clicking on a button. 
  // * As a user, I want to try and guess a word by filling in a number of blanks that match the number of letters in that word.
  // * As a user, I want the game to be timed. 
  // * As a user, I want to win the game when I have guessed all the letters in the word.
  // * As a user, I want to lose the game when the timer runs out before I have guessed all the letters.
  // * As a user, I want to see my total wins and losses on the screen. 

  // ### Specifications

  // * When a user presses a letter key, the user's guess should be captured as a key event.

  // * When a user correctly guesses a letter, the corresponding blank "_" should be replaced by the letter. For example, if the user correctly selects "a", then "a _ _ a _" should appear. 

  // * When a user wins or loses a game, a message should appear and the timer should stop. 

  // * When a user clicks the start button, the timer should reset. 

  // * When a user refreshes or returns to the brower page, the win and loss counts should persist.

  // * [MDN Web Docs on KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)

  // * [MDN Web Docs on Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

  // * [MDN Web Docs on loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)

  // * [MDN Web Docs on setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)

  // * [MDN Web Docs on clearInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval)

  // * [MDN Web Docs on localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

  // * How can you add a reset button to set the win and loss counts back to zero?

  // Needs an array of words
  // Words are randomly selected from the array -> random number generator
  // Needs a timer
  // Needs to show wins & losses
  // Needs variables to store time elapsed, wins, losses
  // Needs to generate a number of blanks equal to the length of the word
  // Needs to show wrong guesses
  // Needs to detect key events -> keyup? keydown?
  // If the character code for the key pressed is included in the word, blank(s) turn(s) to that letter
  // .includes() and indexOf(), probably
  // also, .toLowerCase()?


  // Global variables
  let divEl = $("<div>");
  const gameDiv = $("#gameBoard");
  const wordDiv = $("#word");
  const letterDiv = $("#letters");
  let losses = 0;
  let wins = 0;
  let time = 0;
  let word = "";
  let wordToGuessArr = [];
  let blankArr = [];
  const wordArr = ["sith lord", "tatooine", "luke skywalker", "millenium falcon", "leia organa", "kylo ren", "ewoks", "wookiee", "grogu", "boba fett", "lightsaber", "jedi knight", "padawan", "coruscant", "ahsoka tano", "din djarin", "mandalorian", "darth vader", "anakin skywalker", "the force", "chewbacca", "yoda", "endor", "tusken raider", "obi-wan kenobi", "han solo", "death star", "tie fighter", "alderaan", "lando calrissian", "mos eisley", "jabba the hutt", "sarlacc", "droid", "kuiil", "moff gideon"]

  const findWord = () => {
    const wordIndex = Math.floor(Math.random() * wordArr.length)
    word = wordArr[wordIndex];
    console.log({ word });
    wordToGuessArr = word.split("");
    console.log({ wordToGuessArr });
    generateBlanks(word);
  }

  const generateBlanks = (word) => {
    for (let i = 0; i < word.length; i++) {
      let blankEl;
      if (word[i] === " ") {
        blankEl = $("<p>").text(" ").addClass("text-wrap").attr("id", i).css("margin-right", "2rem");
      } else {
        blankEl = $("<p>").text("__").addClass("text-wrap").attr("id", i).css("margin-right", "1rem");
        blankArr.push("_");
      }
      $(wordDiv).append(blankEl);
      console.log({ blankArr });
    }
  }

  const detectKeypress = (e) => {
    if (!blankArr.includes(e.key)) {
      for (let i = 0; i < wordToGuessArr.length; i++) {
        if (wordToGuessArr[i] === e.key.toLowerCase()) {
          $(`#${i}`).text(e.key);
          blankArr = blankArr.concat(e.key);
          blankArr.shift();
          console.log({ blankArr });
        }
        continue;
      }
    }
    if (!blankArr.includes("_")) {
      wins++
      console.log({ wins });
    }
  }

  $(document).keyup(detectKeypress)

  findWord();

});