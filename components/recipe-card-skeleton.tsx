import { Card, CardContent } from "@/components/ui/card"

export function RecipeCardSkeleton() {
  return (
    <Card className="bg-white animate-pulse">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
