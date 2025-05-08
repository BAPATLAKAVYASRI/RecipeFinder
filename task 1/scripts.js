document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchBtn').addEventListener('click', getRecipes);
});

async function getRecipes() {
  const query = document.getElementById('search').value.trim();
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  const recipesDiv = document.getElementById('recipes');
  recipesDiv.innerHTML = ''; // Clear previous results

  if (!query) {
    recipesDiv.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.meals) {
      recipesDiv.innerHTML = `<p>No recipes found for "${query}".</p>`;
      return;
    }

    data.meals.forEach(meal => {
      const recipe = document.createElement('div');
      recipe.className = 'recipe';
      recipe.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
      `;
      recipesDiv.appendChild(recipe);
    });
  } catch (err) {
    recipesDiv.innerHTML = '<p>Error fetching recipes. Try again later.</p>';
    console.error(err);
  }
}
