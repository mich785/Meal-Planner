# Meal-Planner

## Introduction
The basic story of the application:
* The Meal Planner is a web-based application that helps users plan their meals for the week.
* The application allows users to select their dietary preferences, choose from a list of recipes, and generate a  meal plan.
* Users can also customize their plan by swapping out meals.
* Users can also search for similar recipes.

## Description
The Core features of the MVP are :
* Ability to select dietary preferences and restrictions
* Recipe database with search functionality
* Generate a  meal plan based on user preferences and dietary restrictions

## API Data
The app uses the Spoonacular API, which provides access to a large database of recipes, nutrition information, and meal planning tools. We will use the API to retrieve recipes and search for recipes based on dietary preferences.

## Technologies
This application was built using:
* HTML
* CSS
* JavaScript

## Setup
To use this application, simply open the index.html file in a web browser.

## Functions

### clearRecipeCards()
This function clears all the recipe cards from the search results section.

### renderRecipeCard(result, type)
This function renders a recipe card with information about the recipe passed in as an argument. The type parameter is used to specify whether the recipe card is being rendered as a search result or a meal plan item.

### AddRecipeToMealPlan(recipeId)
This function adds a recipe to the meal plan section based on the recipeId parameter.

### getSimilarRecipes(recipeId)
This function searches for recipes similar to the recipe with the recipeId parameter and displays them in the search results section.


