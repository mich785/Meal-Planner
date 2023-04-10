document.addEventListener("DOMContentLoaded",()=>{

const apiKey = "bf7c0d13a28d48009be18ec64056e56d";
const searchForm = document.querySelector("#recipes");
const searchInput = document.querySelector("#search");
const recipeCards = document.querySelector("#recipe-cards");
const dietInput = document.querySelector("#diet");
const restrictionsInput = document.querySelector("#restrictions");
const mealPlanCards = document.querySelector("#meal-plan");

// Helper function to clear recipe cards
function clearRecipeCards() {
  while (recipeCards.firstChild) {
    recipeCards.removeChild(recipeCards.firstChild);
  }
  // add loader to recipecards
  recipeCards.classList.add("loader");
}

// Event listener for search form submission
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  const diet = dietInput.value;
  const restrictions = restrictionsInput.value;
  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=9`;
  if (diet) {
    url += `&diet=${diet}`;
  }
  if (restrictions) {
    url += `&intolerances=${restrictions}`;
  }
  clearRecipeCards();
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((result) => {
        renderRecipeCard(result, "search");
      });
      recipeCards.classList.remove("loader");
    })
    .catch((error) => console.log(error));
});

//Function to add recipes to meal plan
function AddRecipeToMealPlan(recipeId) {
  const divId = `#recipeCard${recipeId}`;
  // add recipe id to meal plan cards 
  const currentRecipeCard = mealPlanCards.querySelector(divId);
  if (currentRecipeCard) {
    return;
  }

  let url = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderRecipeCard(data, "plan");
    })
    .catch((error) => console.log(error));
}

//Function to render recipe cards
function renderRecipeCard(result, type) {
  const recipeCard = document.createElement("div");
  recipeCard.className = "recipe-card";
  recipeCard.id = `recipeCard${result.id}`;

  recipeCard.innerHTML = `
    <h3>${result.title}</h3>
  `;
  // Condition to render image if it is in the returned results
  if (result.image) {
    recipeCard.innerHTML =
      recipeCard.innerHTML +
      `  <img src="${result.image}" alt="${result.title}">`;
  }
  //Condition to render source url if it is in the returned results
  if (result.sourceUrl) {
    const recipeSourceUrl = document.createElement("a");
    recipeSourceUrl.innerText = result.title;
    recipeSourceUrl.href = result.sourceUrl;
    recipeSourceUrl.target = "blank";
    recipeCard.appendChild(recipeSourceUrl);
  }
  recipeCard.innerHTML = recipeCard.innerHTML + `</br>`;
//Create add plan btn
  const managePlanBtn = document.createElement("button");
  managePlanBtn.className = "recipe-button";
  managePlanBtn.dataset.recipeId = result.id;
  recipeCard.appendChild(managePlanBtn);
  //Add similar recipes
  const similarRecipesBtn = document.createElement("button");
  similarRecipesBtn.textContent = "Similar recipes";
  similarRecipesBtn.dataset.recipeId = result.id;
  similarRecipesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getSimilarRecipes(e.target.dataset.recipeId);
  });
  recipeCard.appendChild(similarRecipesBtn);
  //Conditon if the button is a child of results of search  function
  if (type == "search") {
    managePlanBtn.textContent = "Add to My Plan";
    managePlanBtn.addEventListener("click", (e) => {
      e.preventDefault();
      AddRecipeToMealPlan(e.target.dataset.recipeId);
    });
    recipeCards.appendChild(recipeCard);
  } 
  // Conditon if the button is a child of results of add meal plan function
  else if (type == "plan") {
    managePlanBtn.textContent = "Remove";
    managePlanBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const recipeId = e.target.dataset.recipeId;
      const divId = `#recipeCard${recipeId}`;
      const currentRecipeCard = mealPlanCards.querySelector(divId);
      if (currentRecipeCard) {
        mealPlanCards.removeChild(currentRecipeCard);
      }
    });
    mealPlanCards.appendChild(recipeCard);
  }
}
})

