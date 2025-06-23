"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"

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
            <Image src="/EduGizi.svg" alt="EduGizi Logo" width={40} height={40} className="w-10 h-10" />
            <span className="text-3xl font-extrabold">
              <span style={{ color: '#2196F3' }}>Edu</span><span style={{ color: '#4CAF50' }}>Gizi</span>
            </span>
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
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300",
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
