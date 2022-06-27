const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");
const errorText = document.getElementById("errorText");

const apiURL = "https://api.lyrics.ovh";

// Searc by song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  showData(data);
}

//Show songs and artist in DOM
function showData(data) {
  return true;
}

//Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  if (!searchTerm) {
    errorText.style.opacity = 1;
  } else {
    errorText.style.opacity = 0;
    searchSongs(searchTerm);
  }
});
