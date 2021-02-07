// searching food
document.getElementById("searchBtn").addEventListener("click", function () {
  const input = document.getElementById("searchField").value;
  let url = "";
  if (input.length == 1) {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
  } else {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data));
});

displayMeals = (mealsName) => {
  const mealsDiv = document.getElementById("mealsDiv");

  let arr = mealsName.meals;
  // handle exception input
  if (arr == null || arr.length == 0) {
    const handleException = document.getElementById("handle-exception");
    handleException.innerHTML = `<h1 class="text-white"> Please enter a valid food name!!! </h1>`;
  } else {
    arr.forEach((meal) => {
      const mealDiv = document.createElement("div");
      mealDiv.className = "meal-div";

      const mealInfo = `<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${meal.strMealThumb}/preview" alt="Card image cap">
  <div class="card-body">
    <h5>${meal.strMeal}</h5>
    <button onclick = "displayMealDetails('${meal.strMeal}')">Details</button>
  </div>
</div>`;
      mealDiv.innerHTML = mealInfo;
      mealsDiv.appendChild(mealDiv);
    });
  }
};

//display meal details
displayMealDetails = (mealName) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderMealInfo(data));
};

function renderMealInfo(meal) {
  const mealDetailsDiv = document.getElementById("mealDetails");
  console.log(meal);
  mealDetailsDiv.innerHTML = `
    <div class="card" style="width: 22rem;">
    <img class="card-img-top" src="${meal.meals[0].strMealThumb}/preview" alt="Card image cap">
    <div class="card-body">
      <h4>${meal.meals[0].strMeal}</h4>
      <h5>Ingredient</h5>
      <ul>
        <li>${meal.meals[0].strMeasure1}, ${meal.meals[0].strIngredient1}</li>
        <li>${meal.meals[0].strMeasure2}, ${meal.meals[0].strIngredient2}</li>
        <li>${meal.meals[0].strMeasure3}, ${meal.meals[0].strIngredient3}</li>
        <li>${meal.meals[0].strMeasure4}, ${meal.meals[0].strIngredient4}</li>
        <li>${meal.meals[0].strMeasure5}, ${meal.meals[0].strIngredient5}</li>
        <li>${meal.meals[0].strMeasure6}, ${meal.meals[0].strIngredient6}</li>
        <li>${meal.meals[0].strMeasure7}, ${meal.meals[0].strIngredient7}</li>
        
      </ul>
    </div>
  </div>
    `;
}
