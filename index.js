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
})

