"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/" },
  { name: "Makanan", href: "/makanan" },
  { name: "Resep", href: "/resep" },
  { name: "Kalkulator", href: "/kalkulator" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center py-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">📚</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">EduGizi</span>
          </div>
        </div>
        <nav className="border-t border-purple-200">
          <div className="flex justify-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-8 py-3 text-sm font-medium border-b-2 transition-colors",
                  pathname === item.href
                    ? "border-purple-500 text-purple-600 bg-purple-50"
                    : "border-transparent text-gray-600 hover:text-purple-600 hover:border-purple-300",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
