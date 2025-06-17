import { Card, CardContent } from "@/components/ui/card"

export function RecipeDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-2 relative animate-pulse">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center">
          <div className="w-full aspect-square rounded-lg overflow-hidden mb-4 bg-gray-200"></div>
          <Card className="w-full mb-4">
            <CardContent className="p-4">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent className="p-4">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <div className="h-4 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="mt-4">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="mb-4">
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
            <ul className="space-y-1">
              <li className="h-4 bg-gray-200 rounded w-full"></li>
              <li className="h-4 bg-gray-200 rounded w-5/6"></li>
              <li className="h-4 bg-gray-200 rounded w-full"></li>
            </ul>
          </div>
          <div>
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/5"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
