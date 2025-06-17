import { Card, CardContent } from "@/components/ui/card"

export function FoodItemDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-2 relative animate-pulse">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-lg overflow-hidden mb-4 bg-gray-200"></div>
          <div className="h-7 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="h-4 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
