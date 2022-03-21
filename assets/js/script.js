$(document).ready(function () {

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
  const wordArr = ["sith lord", "tatooine", "luke skywalker", "millenium falcon", "leia organa", "kylo ren", "ewok", "wookiee", "grogu", "boba fett", "lightsaber", "jedi knight", "padawan", "coruscant", "ahsoka tano", "din djarin", "mandalorian", "darth vader", "anakin skywalker", "the force", "chewbacca", "yoda", "endor", "tusken raider", "obi-wan kenobi", "han solo", "death star", "tie fighter", "alderaan", "lando calrissian", "mos eisley", "jabba the hutt", "sarlacc", "droid", "kuiil", "moff gideon", "x-wing fighter", "blaster", "clone wars", "empire", "rebel alliance", "galaxy", "star cruiser", "stormtrooper", "tauntaun", "padme amidala", "uncle owen", "aunt beru", "palpatine", "jawa", "darth maul", "darth sidious", "dagobah", "midi-chlorians", "beskar", "hyperdrive", "bantha", "admiral ackbar", "rancor", "count dooku", "darksaber", "mace windu", "hoth", "naboo", "mudhorn", "porg", "wampa", "greedo"];

  // Gets data from local storage on page load and sets data to wins & losses variables
  // Hides the gameBoard div on page load
  wins = localStorage.getItem("wins");
  winSpan.text(wins || "0");
  losses = localStorage.getItem("losses");
  lossSpan.text(losses || "0");
  gameDiv.attr("style", "display: none");
  startDiv.attr("style", "display: none");
  // $(".results").append("<input type='text' id='hidden'");
  // $("#hidden").css({"position": "fixed", "left": "120%"}).focus();
  
  const startGame = () => {
    time = 20;
    blankArr = [];
    gameDiv.attr("style", "display: block;");
    timerSpan.text(time);
    wordDiv.text("");
    messageDiv.text("");
    findWord();
    $(document).on("touchstart", keepFocus)
  }

  const keepFocus = () => {
    setTimeout(function() {
      $(document).find("#hidden").focus();
    }, 100);
  }

  const startTimer = () => {
    timerCount = setInterval(function () {
      $(timerSpan).text(--time);
      if (time <= 0) {
        clearInterval(timerCount);
        loseGame();
      }
    }, (1000));
  }

  const findWord = () => {
    const wordIndex = Math.floor(Math.random() * wordArr.length);
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
    if (e.key !== " ") {
      if (!wordToGuessArr.includes(e.key) && e.key !== "Shift") {
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
        winGame();
      }
    }
  }

  const winGame = () => {
    clearInterval(timerCount);
    wins++;
    localStorage.setItem("wins", wins);
    winSpan.text(wins);
    messageDiv.text("The Force is strong with this one.");
  }

  const loseGame = () => {
    time = 0;
    timerSpan.text(time);
    losses++;
    localStorage.setItem("losses", losses);
    lossSpan.text(losses);
    messageDiv.text("You underestimate the power of the Dark Side.");
    for (let i = 0; i < wordToGuessArr.length; i++) {
      $(`#${i}`).text(wordToGuessArr[i]);
    }
  }

  const clearScores = () => {
    localStorage.clear();
    wins = 0;
    losses = 0;
    winSpan.text(wins);
    lossSpan.text(losses);
  }

  $(document).keyup(detectKeypress);

  $(startButton).on("click", startGame);

  $(clearButton).on("click", clearScores);
});