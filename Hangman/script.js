const wordEl = document.getElementById("word");
const popupEl = document.getElementById("popup-container");
const wrongLettersEl = document.getElementById("wrong-letters");
const finalMsgEl = document.getElementById("final-message");
const playBtn = document.getElementById("play-button");
const notificationEl = document.getElementById("notification-container");

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

displayWord();
