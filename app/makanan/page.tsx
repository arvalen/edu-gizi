"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Utensils } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FoodItemCardSkeleton } from "@/components/food-item-card-skeleton"
import { Loader2 } from "lucide-react"

interface FoodItem {
  id: number;
  name: string;
  image?: string;
  categoryPath?: string[];
  aisle?: string;
}

interface ApiError extends Error {
  name: string;
  message: string;
}

export default function Makanan() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const ITEMS_PER_PAGE = 18;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      if (searchQuery !== '') { 
        setHasSearched(true);
      } else {
        setHasSearched(false); 
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const fetchData = async () => {
      try {
        const query = debouncedSearchQuery === '' ? 'fruit' : debouncedSearchQuery;
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const response = await fetch(`/api/makanan?query=${encodeURIComponent(query)}&offset=${offset}&number=${ITEMS_PER_PAGE}`, { signal: controller.signal });
        if (!response.ok) throw new Error('Failed to fetch ingredients');
        const data = await response.json();
        setTotalResults(data.totalResults || 0);
        if (!Array.isArray(data.results) || data.results.length === 0) {
          setFoodItems([]);
        } else {
          setFoodItems(data.results);
        }
      } catch (err) {
        const error = err as ApiError;
        if (error.name !== 'AbortError') setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [debouncedSearchQuery, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery]);

  function toCapitalCase(str: string) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
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
                  <h2 className="text-xl font-bold text-gray-900">Makanan</h2>
                  <p className="text-gray-600">Lihat bahan makanan dan informasinya</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Cari makanan" 
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading && !hasSearched && ( 
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <FoodItemCardSkeleton key={i} />
            ))}
          </div>
        )}

        {loading && hasSearched && ( 
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Memuat makanan...</span>
          </div>
        )}
        
        {!loading && foodItems.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {foodItems.map((item) => (
              <Card key={item.id} className="bg-white hover:shadow-emerald-300 transition-shadow cursor-pointer" onClick={() => router.push(`/makanan/${item.id}`)}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 flex-shrink-0">
                      {item.image ? (
                        <img src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <Utensils className="w-8 h-8 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{toCapitalCase(item.name)}</h3>
                      <p className="text-sm text-gray-600">
                        Kategori: {
                          item.categoryPath && item.categoryPath.length > 0
                            ? item.categoryPath.map(toCapitalCase).join(' > ')
                            : item.aisle
                              ? toCapitalCase(item.aisle)
                              : '-'
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && foodItems.length === 0 && hasSearched && (
          <p>Tidak ada data makanan yang ditemukan.</p>
        )}

        <div className="flex justify-center items-center gap-6 mt-8">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
            variant="outline"
          >
            Previous
          </Button>
          <span className="text-gray-600 text-sm">
            Page {page} of {Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE))}
          </span>
          <Button
            onClick={() => setPage((p) => Math.min(Math.ceil(totalResults / ITEMS_PER_PAGE), p + 1))}
            disabled={page === Math.ceil(totalResults / ITEMS_PER_PAGE) || loading || totalResults === 0}
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
