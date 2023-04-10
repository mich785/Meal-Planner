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

})

