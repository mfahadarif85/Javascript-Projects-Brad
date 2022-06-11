const wordEl = document.getElementById("word");
const popupEl = document.getElementById("popup-container");
const wrongLettersEl = document.getElementById("wrong-letters");
const finalMsgEl = document.getElementById("final-message");
const playBtn = document.getElementById("play-button");
const notificationEl = document.getElementById("notification-container");
const figurePartsEl = document.querySelectorAll(".figure-part");

const wordsArr = [
  "apple",
  "ball",
  "cat",
  "dog",
  "elephant",
  "fish",
  "grass",
  "house",
  "ink",
  "jelly",
  "kite",
];

let selectedWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];

let correctLetters = [];
let wrongLetters = [];

//Show hidden word

function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</span>`
    )
    .join("")}`;
  let innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMsgEl.innerText = "Congratulations! You Won!";
    popupEl.style.display = "flex";
  }
}

//show notification for double key press
function showNotification() {
  notificationEl.classList.add("show");
  setTimeout(() => {
    notificationEl.classList.remove("show");
  }, 2500);
}

// update the wrong letters element
function updateWrongLettersEl() {
  //Display wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong Letters</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  //Display Hangman Parts
  figurePartsEl.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  //check if lost
  if (wrongLetters.length === figurePartsEl.length) {
    finalMsgEl.innerText = "Sorry, You Loose!";
    popupEl.style.display = "flex";
  }
}

// key down event listener
window.addEventListener("keydown", (e) => {
  if (e.key.charCodeAt() >= 97 && e.key.charCodeAt() <= 122) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

//Restart Game and Play Again
playBtn.addEventListener("click", () => {
  //Empty Arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];

  displayWord();
  updateWrongLettersEl();
  popupEl.style.display = "none";
});

displayWord();
