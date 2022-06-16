const musicContainerEl = document.getElementById("music-container");
const playBtnEl = document.getElementById("play");
const prevBtnEl = document.getElementById("prev");
const nextBtnEl = document.getElementById("next");
const audioEl = document.getElementById("audio");
const progressEl = document.getElementById("progress");
const progressContainerEl = document.getElementById("progress-container");
const titleEl = document.getElementById("title");
const coverEl = document.getElementById("cover");

//Song titles Array
const songs = ["hey", "summer", "ukulele"];

// keep track of song
let songIndex = 2;

// initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  titleEl.innerText = song;
  audioEl.src = `music/${song}.mp3`;
  coverEl.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainerEl.classList.add("play");
  playBtnEl.querySelector("i.fa-solid").classList.remove("fa-play");
  playBtnEl.querySelector("i.fa-solid").classList.add("fa-pause");
  audio.play();
}
// Pause song
function pauseSong() {
  musicContainerEl.classList.remove("play");
  playBtnEl.querySelector("i.fa-solid").classList.add("fa-play");
  playBtnEl.querySelector("i.fa-solid").classList.remove("fa-pause");
  audio.pause();
}

//Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${progressPercent}%`;
}

// set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtnEl.addEventListener("click", () => {
  const isPlaying = musicContainerEl.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// change song
prevBtnEl.addEventListener("click", prevSong);
nextBtnEl.addEventListener("click", nextSong);

// Time song update
audioEl.addEventListener("timeupdate", updateProgress);

//Click on progress bar
progressContainerEl.addEventListener("click", setProgress);

// song ends
audio.addEventListener("ended", nextSong);
