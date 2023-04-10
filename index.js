/**document.addEventListener("DOMContentLoaded",()=>{
  

// Function to set dietary prefrences
function dietaryPreferences(){
    const diet = document.querySelector('#selection')

    diet.addEventListener("submit",(event)=>{
     event.preventDefault();

     const diet= document.querySelector('#diet')
     const restrictions= document.querySelector('#restrictions')

     const requestBody = {
        diet: diet,
        restrictions: restrictions
      };
  
  diet.reset();
    })
}
// Search Function
function searchRecipes(){
const recipe = document.getElementById('recipes')
 //GET request for recipes
const getRecipes = async(url)=>{
  const response = await fetch(url);
  const recipes = await response.json();
    renderRecipes(recipes);}
recipe.addEventListener('submit',(event)=>{
  event.preventDefault();
  const recipeIdInput = document.querySelector('#recipe-id');
  getRecipes(`https://api.spoonacular.com/recipes/{id}/information?apiKey=bf7c0d13a28d48009be18ec64056e56d`)
})
}
// Function to render recipes after searching
function renderRecipes(recipes){
  const recipeCards = document.querySelector('#recipe-cards');
  recipes.forEach(recipe => {
    const mealTitle = document.getElementById('title');
    const mealImage = document.getElementById('picture');
    const link = document.getElementById('link');
    const addButton = document.getElementById('add')
    mealTitle.textContent = recipe.title;
    mealImage.src = recipe.image;
    link.href = recipe.sourceUrl;
    link.textContent = recipe.sourceUrl;
    addButton.addEventListener('click',addMeal)
})
}
function addMeal(){
 
}
})**/

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

function AddRecipeToMealPlan(recipeId) {
  const divId = `#recipeCard${recipeId}`;
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

function renderRecipeCard(result, type) {
  console.log(result);
  const recipeCard = document.createElement("div");
  recipeCard.className = "recipe-card";
  recipeCard.id = `recipeCard${result.id}`;

  recipeCard.innerHTML = `
    <h3>${result.title}</h3>
  `;
  if (result.image) {
    recipeCard.innerHTML =
      recipeCard.innerHTML +
      `  <img src="${result.image}" alt="${result.title}">`;
  }
  if (result.sourceUrl) {
    const recipeSourceUrl = document.createElement("a");
    recipeSourceUrl.innerText = result.title;
    recipeSourceUrl.href = result.sourceUrl;
    recipeSourceUrl.target = "blank";
    recipeCard.appendChild(recipeSourceUrl);
  }
  recipeCard.innerHTML = recipeCard.innerHTML + `</br>`;

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

  if (type == "search") {
    managePlanBtn.textContent = "Add to My Plan";
    managePlanBtn.addEventListener("click", (e) => {
      e.preventDefault();
      AddRecipeToMealPlan(e.target.dataset.recipeId);
    });
    recipeCards.appendChild(recipeCard);
  } else if (type == "plan") {
    managePlanBtn.textContent = "Remove";
    managePlanBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const recipeId = e.target.dataset.recipeId;
      const divId = `#recipeCard${recipeId}`;
      const currentRecipeCard = mealPlanCards.querySelector(divId);
      if (currentRecipeCard) {
        mealPlanCards.removeChild(currentRecipeCard);
      }

      // removeFromMealPlan(e.target.dataset.recipeId);
    });
    mealPlanCards.appendChild(recipeCard);
  }
}
function getSimilarRecipes(recipeId) {
  let url = `https://api.spoonacular.com/recipes/${recipeId}/similar?apiKey=${apiKey}`;
  clearRecipeCards();
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((result) => {
        renderRecipeCard(result, "search");
      });
      recipeCards.classList.remove("loader");
    })
    .catch((error) => console.log(error));
}
