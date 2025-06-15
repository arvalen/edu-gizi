'use client'

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Utensils } from "lucide-react"
import { useRouter } from "next/navigation"
import { searchRecipes, SpoonacularRecipe } from "../services/spoonacular"
import { Button } from "@/components/ui/button"

interface ApiError extends Error {
  name: string;
  message: string;
}

export default function Resep() {
  const router = useRouter()
  const [recipes, setRecipes] = useState<SpoonacularRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const RECIPES_PER_PAGE = 10;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (loading) return; // skip on initial mount
    setFetching(true);
    const fetchRecipes = async () => {
      try {
        const offset = (page - 1) * RECIPES_PER_PAGE;
        const data = await searchRecipes(debouncedSearchQuery, offset, RECIPES_PER_PAGE);
        setRecipes(data.results);
        setTotalResults(data.totalResults);
      } catch (err) {
        const error = err as ApiError;
        setError(error.message);
      } finally {
        setFetching(false);
      }
    };
    fetchRecipes();
  }, [debouncedSearchQuery, page]);

  useEffect(() => {
    // initial mount fetch
    const fetchInitial = async () => {
      try {
        const data = await searchRecipes('', 0, RECIPES_PER_PAGE);
        setRecipes(data.results);
        setTotalResults(data.totalResults);
      } catch (err) {
        const error = err as ApiError;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitial();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const totalPages = Math.ceil(totalResults / RECIPES_PER_PAGE);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading resep...</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Utensils className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Resep</h2>
                  <p className="text-gray-600">Temukan resep makanan sehat</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Cari resep" 
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="bg-white hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(`/resep/${recipe.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img 
                        src={recipe.image} 
                        alt={recipe.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{recipe.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>⏱️ {recipe.readyInMinutes} menit</span>
                        <span>👥 {recipe.servings} porsi</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>Tidak ada data resep yang tersedia.</p>
          )}
        </div>
        <div className="flex justify-center items-center gap-6 mt-8">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
            variant="outline"
          >
            Previous
          </Button>
          <span className="text-gray-600 text-sm">
            Page {page} of {totalPages > 0 ? totalPages : 1}
          </span>
          <Button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || loading || totalPages === 0}
            variant="outline"
          >
            Next
          </Button>
        </div>
        {fetching && (
          <div className="flex justify-center py-8">
            <p>Loading resep...</p>
          </div>
        )}
      </div>
    </div>
  )
}
