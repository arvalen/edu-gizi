"use client"
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { getIngredientById } from "../../services/spoonacular";

interface Nutrient {
  name: string;
  amount: number;
  unit: string;
}

interface Nutrition {
  nutrients: Nutrient[];
}

interface EstimatedCost {
  value: number;
  unit: string;
}

interface Ingredient {
  id: number;
  name: string;
  image?: string;
  categoryPath?: string[];
  aisle?: string;
  original?: string;
  estimatedCost?: EstimatedCost;
  nutrition?: Nutrition;
}

interface ApiError extends Error {
  name: string;
  message: string;
}

export default function MakananDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchIngredient = async () => {
      try {
        const data = await getIngredientById(Number(id));
        setIngredient(data);
      } catch (err) {
        const error = err as ApiError;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchIngredient();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading detail makanan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!ingredient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Makanan tidak ditemukan.</p>
      </div>
    );
  }

  function toCapitalCase(str: string) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-2 relative">
      <button
        onClick={() => router.push('/makanan')}
        className="absolute left-6 top-6 flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-lg overflow-hidden mb-4 bg-gray-100 flex items-center justify-center">
            {ingredient.image ? (
              <img
                src={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`}
                alt={ingredient.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">{toCapitalCase(ingredient.name)}</h1>
          <div className="text-gray-600 text-center mb-2">
            Kategori: {ingredient.categoryPath && ingredient.categoryPath.length > 0 ? ingredient.categoryPath.map(toCapitalCase).join(' > ') : ingredient.aisle ? toCapitalCase(ingredient.aisle) : '-'}
          </div>
          {ingredient.original && (
            <div className="text-gray-500 text-center mb-2">Original: {toCapitalCase(ingredient.original)}</div>
          )}
          {ingredient.estimatedCost && (
            <div className="text-green-700 text-sm mb-2">Perkiraan harga: {ingredient.estimatedCost.value} {ingredient.estimatedCost.unit}</div>
          )}
        </div>
        {ingredient.nutrition && ingredient.nutrition.nutrients && ingredient.nutrition.nutrients.length > 0 && (
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="mb-2 font-semibold text-gray-700">Informasi Gizi (per 100 gram)</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                {ingredient.nutrition.nutrients.map((nutrient: Nutrient, idx: number) => (
                  <React.Fragment key={idx}>
                    <div>{nutrient.name}</div>
                    <div>{nutrient.amount} {nutrient.unit}</div>
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 