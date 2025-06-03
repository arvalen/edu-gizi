'use client'
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ResepDetail() {
  const router = useRouter()
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
          <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <span className="text-gray-400 text-lg">[IMG]</span>
          </div>
          <Card className="w-full mb-4">
            <CardContent className="p-4">
              <div className="mb-2 font-semibold text-gray-700">Informasi</div>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <span className="mr-2">⏱️</span>Waktu Memasak: 45 menit
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <span className="mr-2">📈</span>Tingkat Kesulitan: Sedang
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">👥</span>Porsi: 4 orang
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent className="p-4">
              <div className="mb-2 font-semibold text-gray-700">Informasi Gizi (per porsi)</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                <div>Kalori</div><div>320 kkal</div>
                <div>Protein</div><div>18g</div>
                <div>Karbohidrat</div><div>42g</div>
                <div>Lemak</div><div>12g</div>
                <div>Serat</div><div>5g</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pepes Ikan Kembung</h1>
          <p className="text-gray-700 mb-4">Hidangan ikan kaya protein dengan bumbu rempah tradisional yang cocok untuk anak.</p>
          <div className="mb-4">
            <div className="font-semibold text-gray-800 mb-1">Bahan-bahan</div>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>4 ekor ikan kembung segar</li>
              <li>4 lembar daun pisang</li>
              <li>2 batang serai</li>
              <li>4 lembar daun salam</li>
              <li>2 lembar daun jeruk</li>
              <li>Bumbu halus (lengkuas, kunyit, jahe)</li>
              <li>Garam dan merica secukupnya</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gray-800 mb-1">Cara Memasak</div>
            <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
              <li>Bersihkan ikan kembung, buang sisik dan isi perutnya</li>
              <li>Haluskan semua bumbu dengan blender atau ulekan</li>
              <li>Lumuri ikan dengan bumbu halus hingga merata</li>
              <li>Siapkan daun pisang, letakkan ikan dan bumbu</li>
              <li>Tambahkan serai, daun salam, dan daun jeruk</li>
              <li>Bungkus rapi dan semat dengan lidi</li>
              <li>Kukus selama 30-45 menit hingga matang</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
} 