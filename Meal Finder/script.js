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
        console.log(data);
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

// Even Listeners
submitForm.addEventListener("submit", searchMeal);
