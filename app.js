// searching food
const searchFood = () => {
  const input = document.getElementById("searchField").value;
  let url = "";
  if (input.length == 1) {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
  } else {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (mealsName) => {
  const handleException = document.getElementById("handle-exception");
  handleException.innerText = "";
  const mealsDiv = document.getElementById("mealsDiv");
  mealsDiv.innerText = "";
  let arr = mealsName;
  // handle exception input
  if (arr == null || arr.length == 0) {
    displayError();
  } else {
    arr.forEach((meal) => {
      const mealDiv = document.createElement("div");
      mealDiv.className = "meal-div";
      const mealInfo = `<div onclick = "displayMealDetails('${meal.idMeal}')">
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${meal.strMealThumb}/preview" alt="Card image cap">
        <div class="card-body">
        <h5>${meal.strMeal}</h5>
        </div>
        </div>
        </div>`;
      mealDiv.innerHTML = mealInfo;
      mealsDiv.appendChild(mealDiv);
    });
  }
};

//display error
function displayError() {
  const handleException = document.getElementById("handle-exception");
  handleException.innerHTML = `<h1 class="text-danger"> Something went wrong! Please enter a valid food name!!! </h1>`;
}

//display meal details
const displayMealDetails = (mealID) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderMealInfo(data.meals[0]));
};

const renderMealInfo = (meal) => {
  const mealDetailsDiv = document.getElementById("mealDetails");
  mealDetailsDiv.innerHTML = `
    <div class="card mx-auto mb-4" style="width: 22rem;">
    <img class="card-img-top" src="${meal.strMealThumb}/preview" alt="Card image cap">
    <div class="card-body">
      <h4>${meal.strMeal}</h4>
      <h5>Ingredient</h5>
      <ul>
        <li>${meal.strMeasure1}, ${meal.strIngredient1}</li>
        <li>${meal.strMeasure2}, ${meal.strIngredient2}</li>
        <li>${meal.strMeasure3}, ${meal.strIngredient3}</li>
        <li>${meal.strMeasure4}, ${meal.strIngredient4}</li>
        <li>${meal.strMeasure5}, ${meal.strIngredient5}</li>
        <li>${meal.strMeasure6}, ${meal.strIngredient6}</li>
        <li>${meal.strMeasure7}, ${meal.strIngredient7}</li>
        
      </ul>
    </div>
  </div>
    `;
};
