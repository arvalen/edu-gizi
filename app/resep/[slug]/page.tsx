'use client'
import React from 'react'
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { getRecipeById, SpoonacularRecipe } from "../../services/spoonacular"
import { RecipeDetailSkeleton } from "@/components/recipe-detail-skeleton"

interface ApiError extends Error {
  name: string;
  message: string;
}

export default function ResepDetail() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  const [recipe, setRecipe] = useState<SpoonacularRecipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchRecipe = async () => {
        try {
          const data = await getRecipeById(Number(slug));
          setRecipe(data);
        } catch (err) {
          const error = err as ApiError;
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchRecipe();
    }
  }, [slug]);

  if (loading) {
    return <RecipeDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Resep tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-2 relative">
      <button
        onClick={() => router.push('/resep')}
        className="absolute left-6 top-6 flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center">
          <div className="w-full aspect-square rounded-lg overflow-hidden mb-4">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
          <Card className="w-full mb-4">
            <CardContent className="p-4">
              <div className="mb-2 font-semibold text-gray-700">Informasi</div>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <span className="mr-2">⏱️</span>Waktu Memasak: {recipe.readyInMinutes} menit
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <span className="mr-2">👥</span>Porsi: {recipe.servings} orang
              </div>
            </CardContent>
          </Card>
          {recipe.nutrition && (
            <Card className="w-full">
              <CardContent className="p-4">
                <div className="mb-2 font-semibold text-gray-700">Informasi Gizi (per porsi)</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                  <div>Kalori</div><div>{recipe.nutrition.calories}</div>
                  <div>Protein</div><div>{recipe.nutrition.protein}</div>
                  <div>Karbohidrat</div><div>{recipe.nutrition.carbs}</div>
                  <div>Lemak</div><div>{recipe.nutrition.fat}</div>
                </div>
                {recipe.nutrition.good && recipe.nutrition.good.length > 0 && (
                  <div className="mt-4">
                    <div className="font-medium text-green-600 mb-2">Nutrisi Baik</div>
                    <div className="space-y-1">
                      {recipe.nutrition.good.map((item, index) => (
                        <div key={index} className="text-sm">
                          <span className="text-gray-700">{item.title}</span>
                          <span className="text-gray-500 ml-2">{item.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {recipe.nutrition.bad && recipe.nutrition.bad.length > 0 && (
                  <div className="mt-4">
                    <div className="font-medium text-red-600 mb-2">Perlu Diperhatikan</div>
                    <div className="space-y-1">
                      {recipe.nutrition.bad.map((item, index) => (
                        <div key={index} className="text-sm">
                          <span className="text-gray-700">{item.title}</span>
                          <span className="text-gray-500 ml-2">{item.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
          <div className="mb-4">
            <div className="font-semibold text-gray-800 mb-1">Bahan-bahan</div>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {recipe.extendedIngredients.map((ingredient: { id: number; original: string }, index: number) => (
                <li key={index}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gray-800 mb-1">Cara Memasak</div>
            {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
              <div className="space-y-4">
                {recipe.analyzedInstructions[0].steps.map((step) => (
                  <div key={step.number} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm">{step.step}</p>
                      {step.ingredients.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {step.ingredients.map((ingredient) => (
                            <span key={ingredient.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {ingredient.localizedName || ingredient.name}
                            </span>
                          ))}
                        </div>
                      )}
                      {step.equipment.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {step.equipment.map((equipment) => (
                            <span key={equipment.id} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                              {equipment.localizedName || equipment.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div 
                className="text-gray-700 text-sm space-y-2"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
