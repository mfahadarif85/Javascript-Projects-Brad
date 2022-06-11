const wordEl = document.getElementById("word");
const popupEl = document.getElementById("popup-container");
const wrongLettersEl = document.getElementById("wrong-letters");
const finalMsgEl = document.getElementById("final-message");
const playBtn = document.getElementById("play-button");
const notificationEl = document.getElementById("notification-container");
const figurePartsEl = document.querySelectorAll("figure-part");

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
const selectedWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];

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
  console.log("update wrong letters element");
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

displayWord();
