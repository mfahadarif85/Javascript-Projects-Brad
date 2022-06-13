// get DOM elements
const searchInpt = document.getElementById("search"),
  submitForm = document.getElementById("submit"),
  randomBtn = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeadingEl = document.getElementById("result-heading"),
  singleMealEl = document.getElementById("single-meal"),
  errorMsg = document.getElementById("error");

// Functions

// Search Meals and Fetch from API
function searchMeal(e) {
  e.preventDefault();
  // clear single meal results
  singleMealEl.innerHTML = "";
  // get search term
  const term = searchInpt.value;
  // check for empty and get results from API
  if (term.trim()) {
    errorMsg.style.display = "none";
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}
`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        resultHeadingEl.innerHTML = `<h2>Search results for '${term}':</h2>`;
        if (data.meals === null) {
          resultHeadingEl.innerHTML = `<h2>There are no search results. Try Again!</h2>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
            `
            )
            .join("");
        }
      });
    //clear search text
    searchInpt.value = "";
  } else {
    errorMsg.style.display = "flex";
  }
}

// fetch meal from API by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// fetch random meal from API
function getRandomMeal() {
  // clear meals and headings
  mealsEl.innerHTML = "";
  resultHeadingEl.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// dislay single meal in DOM
function addMealToDOM(meal) {
  // //clear search results
  // mealsEl.innerHTML = "";
  // resultHeadingEl.innerHTML = ";"

  // console.log(meal);
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `
        ${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}        
        `
      );
    } else {
      break;
    }
  }

  singleMealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
 
    <div class="single-meal-info">
    <h4>Category</h4>  
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
    <h4>Area</h4>
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
    <h2>Ingredients</h2>
    <ul>
      ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>
    </div>
   </div>
  `;
}

// Even Listeners
submitForm.addEventListener("submit", searchMeal);
randomBtn.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealId");
    getMealById(mealID);
  }
});
