// Get Dom Elements
const wordEl = document.getElementById("word");
const textInput = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settingsEl = document.getElementById("settings");
const settingsFormEl = document.getElementById("settings-form");
const difficultySelectEl = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

// initialize difficulty with local storage or default
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//Set difficulty to select value
difficultySelectEl.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// focus on text input on start
textInput.focus();

// start counding down
const timeInterval = setInterval(updateTime, 1000);

// Generate a random word from the words array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  wordEl.innerHTML = randomWord;
}

//Update Score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update Time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";
  if (time === 0) {
    clearInterval();
    //end game
    gameOver();
  }
}

//Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Times Up</h1>
    <p>Your Final Score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
  endgameEl.style.display = "flex";
}

// display word to DOM
addWordToDOM();

// Event Listeners
//typing input
textInput.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    //clear the input
    e.target.value = "";
    //increment time on correct word input as per difficulty
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medimum") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

// settings btn click
settingsBtn.addEventListener("click", () => {
  settingsEl.classList.toggle("hide");
});

// settings select
settingsFormEl.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
