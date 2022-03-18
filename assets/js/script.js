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

  // * When a user refreshes or returns to the browser page, the win and loss counts should persist.

  // * [MDN Web Docs on KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)

  // * [MDN Web Docs on Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

  // * [MDN Web Docs on loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)

  // * [MDN Web Docs on setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)

  // * [MDN Web Docs on clearInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval)

  // * [MDN Web Docs on localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

  // * How can you add a reset button to set the win and loss counts back to zero?


  // Global variables
  let divEl = $("<div>");
  const startDiv = $("#start");
  const startButton = $(".startBtn");
  const gameDiv = $("#gameBoard");
  const wordDiv = $("#word");
  const messageDiv = $("#message");
  const timerSpan = $("#timeLeft");
  const winSpan = $("#wins");
  const lossSpan = $("#losses");
  const clearButton = $("#clearBtn");
  let timerCount;
  let losses = 0;
  let wins = 0;
  let time;
  let word = "";
  let wordToGuessArr = [];
  let blankArr = [];
  const wordArr = ["sith lord", "tatooine", "luke skywalker", "millenium falcon", "leia organa", "kylo ren", "ewoks", "wookiee", "grogu", "boba fett", "lightsaber", "jedi knight", "padawan", "coruscant", "ahsoka tano", "din djarin", "mandalorian", "darth vader", "anakin skywalker", "the force", "chewbacca", "yoda", "endor", "tusken raider", "obi-wan kenobi", "han solo", "death star", "tie fighter", "alderaan", "lando calrissian", "mos eisley", "jabba the hutt", "sarlacc", "droid", "kuiil", "moff gideon"];

  wins = localStorage.getItem("wins");
  winSpan.text(wins || "0");
  losses = localStorage.getItem("losses");
  lossSpan.text(losses || "0");
  gameDiv.attr("style", "display: none");

  const startGame = () => {
    time = 20;
    blankArr = [];
    gameDiv.attr("style", "display: block;");
    startDiv.attr("style", "display: none");
    timerSpan.text(time);
    wordDiv.text("");
    messageDiv.text("");
    findWord();
  }

  const startTimer = () => {
    timerCount = setInterval(function () {
      $(timerSpan).text(--time);
      if (time <= 0) {
        time = 0;
        timerSpan.text(time);
        losses++
        localStorage.setItem("losses", losses);
        lossSpan.text(losses);
        messageDiv.text("You underestimate the power of the Dark Side.");
        for (let i = 0; i < wordToGuessArr.length; i++) {
          $(`#${i}`).text(wordToGuessArr[i]);
        }
        clearInterval(timerCount);
      }
    }, (1000));
  }

  const findWord = () => {
    const wordIndex = Math.floor(Math.random() * wordArr.length)
    word = wordArr[wordIndex];
    wordToGuessArr = word.split("");
    generateBlanks(word);
  }

  const generateBlanks = (word) => {
    for (let i = 0; i < word.length; i++) {
      let blankEl;
      if (word[i] === " ") {
        blankEl = $("<p>").text(" ").addClass("text-wrap").attr("id", i).css("margin-right", "2rem");
      } else {
        blankEl = $("<p>").text("*").addClass("text-wrap").attr("id", i).css("margin-right", "1rem");
        blankArr.push("_");
      }
      $(wordDiv).append(blankEl);
    }
    startTimer();
  }

  const detectKeypress = (e) => {
    if (!wordToGuessArr.includes(e.key) && !["Shift", " ",].includes(e.key)) {
      time -= 3;
    }
    if (!blankArr.includes(e.key) && e.key !== " " && time > 0) {
      for (let i = 0; i < wordToGuessArr.length; i++) {
        if (wordToGuessArr[i] === e.key.toLowerCase()) {
          $(`#${i}`).text(e.key.toLowerCase());
          blankArr = blankArr.concat(e.key);
          blankArr.shift();
        }
        continue;
      }
    }
    if (!blankArr.includes("_")) {
      clearInterval(timerCount);
      wins++
      localStorage.setItem("wins", wins);
      winSpan.text(wins);
      messageDiv.text("The Force is strong with this one.")
    }
  }

  const clearScores = () => {
    localStorage.clear();
    wins = 0;
    losses = 0;
    winSpan.text(wins);
    lossSpan.text(losses);
  }

  $(document).keyup(detectKeypress)

  $(startButton).on("click", startGame);

  $(clearButton).on("click", clearScores);
});