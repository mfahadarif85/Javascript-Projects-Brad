//API
//https://jsonplaceholder.typicode.com/posts?_limit=3&_page=2

//Get DOM Elements

const postsContainerEl = document.getElementById("posts-container");
const loadingEl = document.querySelector(".loader");
const filterEl = document.getElementById("filter");

let limit = 3;
let page = 1;

//functiont to call api and return data

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

// function to show posts in DOM

async function showPosts() {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class="post">
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>
    `;
    postsContainerEl.appendChild(postEl);
  });
}

// Show loader and fetch more posts
function showLoading() {
  loadingEl.classList.add("show");
  setTimeout(() => {
    loadingEl.classList.remove("show");
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// show filtered posts
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const titleContent = post
      .querySelector(".post-title")
      .innerText.toUpperCase();
    const bodyContent = post
      .querySelector(".post-body")
      .innerText.toUpperCase();

    if (titleContent.indexOf(term) > -1 || bodyContent.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

//Show initial posts
showPosts();

//Event Listeners

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filterEl.addEventListener("input", filterPosts);
