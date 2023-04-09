document.addEventListener("DOMContentLoaded",()=>{
    dietaryPrefrences()
    getRecipes()
})

// Function to set dietary prefrences
const dietaryPrefrences =()=>{
    const form = document.querySelector('form')

    form.addEventListener("submit",(event)=>{
     event.preventDefault();

     const diet= document.querySelector('#diet')
     const restrictions= document.querySelector('#restrictions')

     const requestBody = {
        diet: diet,
        restrictions: restrictions
      };

      // POST request to the API
      fetch('https://api.spoonacular.com/recipes/diet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => response.json())
  .then(data => {
    console.log('API response:', data);
  })
  .catch(error => {
    console.error('API request failed:', error);
  });
  
  form.reset();
    })
}
// GET request for recipes

const getRecipes = async(url)=>{
  const response = await fetch(url):
  const recipes = await response.json()
  renderRecipes(recipes);
}
// Function to render recipes after searching
renderRecipes