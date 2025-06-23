import { apiKeyManager } from '../../lib/api-key-manager';

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
  const url = `${SPOONACULAR_BASE_URL}/complexSearch?query=${query}&addRecipeInformation=true&number=${number}&offset=${offset}`;
  
  const response = await apiKeyManager.makeRequest(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  const data = await response.json();
  return { results: data.results, totalResults: data.totalResults };
}

export async function getRecipeById(id: number) {
  const recipeUrl = `${SPOONACULAR_BASE_URL}/${id}/information?addNutrition=true&addAnalyzedInstructions=true`;
  const nutritionUrl = `${SPOONACULAR_BASE_URL}/${id}/nutritionWidget.json`;

  const [recipeResponse, nutritionResponse] = await Promise.all([
    apiKeyManager.makeRequest(recipeUrl),
    apiKeyManager.makeRequest(nutritionUrl)
  ]);

  if (!recipeResponse.ok) {
    throw new Error('Failed to fetch recipe details');
  }

  if (!nutritionResponse.ok) {
    throw new Error('Failed to fetch nutrition information');
  }

  const [recipeData, nutritionData] = await Promise.all([
    recipeResponse.json(),
    nutritionResponse.json()
  ]);

  return {
    ...recipeData,
    nutrition: nutritionData
  };
}

export async function searchIngredients(query: string = '', offset: number = 0, number: number = 10) {
  const url = `https://api.spoonacular.com/food/ingredients/search?query=${query}&number=${number}&offset=${offset}&metaInformation=true`;
  
  const response = await apiKeyManager.makeRequest(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch ingredients');
  }
  
  const data = await response.json();
  return { results: data.results, totalResults: data.totalResults };
}

export async function getIngredientById(id: number) {
  const url = `https://api.spoonacular.com/food/ingredients/${id}/information?amount=100&unit=gram`;
  
  const response = await apiKeyManager.makeRequest(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch ingredient information');
  }
  
  return await response.json();
}

export function getApiKeyStatus() {
  return apiKeyManager.getApiKeyInfo();
} 