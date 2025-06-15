const SPOONACULAR_API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions: string;
  analyzedInstructions: Array<{
    name: string;
    steps: Array<{
      number: number;
      step: string;
      ingredients: Array<{
        id: number;
        name: string;
        localizedName: string;
        image: string;
      }>;
      equipment: Array<{
        id: number;
        name: string;
        localizedName: string;
        image: string;
      }>;
    }>;
  }>;
  extendedIngredients: {
    id: number;
    original: string;
  }[];
  nutrition: {
    calories: string;
    carbs: string;
    fat: string;
    protein: string;
    bad: Array<{
      title: string;
      amount: string;
      indented: boolean;
      percentOfDailyNeeds: number;
    }>;
    good: Array<{
      title: string;
      amount: string;
      indented: boolean;
      percentOfDailyNeeds: number;
    }>;
  };
}

export async function searchRecipes(query: string = '', offset: number = 0, number: number = 10) {
  const response = await fetch(
    `${SPOONACULAR_BASE_URL}/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}&addRecipeInformation=true&number=${number}&offset=${offset}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  const data = await response.json();
  return { results: data.results, totalResults: data.totalResults };
}

export async function getRecipeById(id: number) {
  // Get basic recipe information with analyzed instructions
  const recipeResponse = await fetch(
    `${SPOONACULAR_BASE_URL}/${id}/information?apiKey=${SPOONACULAR_API_KEY}&addNutrition=true&addAnalyzedInstructions=true`
  );

  if (!recipeResponse.ok) {
    throw new Error('Failed to fetch recipe details');
  }

  const recipeData = await recipeResponse.json();

  // Get nutrition information
  const nutritionResponse = await fetch(
    `${SPOONACULAR_BASE_URL}/${id}/nutritionWidget.json?apiKey=${SPOONACULAR_API_KEY}`
  );

  if (!nutritionResponse.ok) {
    throw new Error('Failed to fetch nutrition information');
  }

  const nutritionData = await nutritionResponse.json();

  return {
    ...recipeData,
    nutrition: nutritionData
  };
}

export async function searchIngredients(query: string = '', offset: number = 0, number: number = 10) {
  const response = await fetch(
    `https://api.spoonacular.com/food/ingredients/search?apiKey=${SPOONACULAR_API_KEY}&query=${query}&number=${number}&offset=${offset}&metaInformation=true`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch ingredients');
  }
  const data = await response.json();
  return { results: data.results, totalResults: data.totalResults };
}

export async function getIngredientById(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  const response = await fetch(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${apiKey}&amount=100&unit=gram`);
  if (!response.ok) {
    throw new Error('Failed to fetch ingredient information');
  }
  return await response.json();
} 