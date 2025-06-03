"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"

interface CalculatorData {
  gender: "male" | "female"
  age: string
  weight: string
  height: string
}

interface CalculatorResult {
  status: string
  recommendation: string
  charts: {
    weightForAge: string
    heightForAge: string
    weightForHeight: string
  }
}

export default function Kalkulator() {
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState<CalculatorData>({
    gender: "male",
    age: "",
    weight: "",
    height: "",
  })
  const [results, setResults] = useState<CalculatorResult | null>(null)

  const handleCalculate = () => {
    if (!formData.age || !formData.weight || !formData.height) {
      alert("Mohon lengkapi semua data")
      return
    }

    // Simple calculation logic for demo
    const weight = Number.parseFloat(formData.weight)
    const height = Number.parseFloat(formData.height)

    let status = "Normal"
    let recommendation = "Pertahankan pola makan sehat dan aktivitas fisik yang cukup."

    // Simple BMI-like calculation for children
    const heightInM = height / 100
    const bmi = weight / (heightInM * heightInM)

    if (bmi < 14) {
      status = "Underweight"
      recommendation = "Konsultasikan dengan dokter untuk program peningkatan berat badan yang sehat."
    } else if (bmi > 25) {
      status = "Overweight"
      recommendation = "Perhatikan pola makan dan tingkatkan aktivitas fisik."
    }

    setResults({
      status,
      recommendation,
      charts: {
        weightForAge: "Normal",
        heightForAge: "Normal",
        weightForHeight: status,
      },
    })
    setShowResults(true)
  }

  const handleNewData = () => {
    setShowResults(false)
    setFormData({
      gender: "male",
      age: "",
      weight: "",
      height: "",
    })
    setResults(null)
  }

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="bg-white">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Kalkulator Perhitungan</CardTitle>
              <p className="text-sm text-gray-600">Status Perkembangan Gizi Anak</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Jenis Kelamin</p>
                  <p className="font-semibold">{formData.gender === "male" ? "Laki-laki" : "Perempuan"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Usia</p>
                  <p className="font-semibold">{formData.age} Bulan</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Berat Badan</p>
                  <p className="font-semibold">{formData.weight} Kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tinggi Badan</p>
                  <p className="font-semibold">{formData.height} Cm</p>
                </div>
              </div>

              {/* Chart sections */}
              <div className="space-y-6">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Berat Badan Menurut Usia</h3>
                    <span className="bg-yellow-200 px-3 py-1 rounded text-sm">Status: Normal</span>
                  </div>
                  <div className="h-48 bg-white rounded border flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-full h-32 bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 to-blue-200 rounded mb-2 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">Rekomendasi Berat Badan: 7.8 - 11.8 kg</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Tinggi Badan Menurut Usia</h3>
                    <span className="bg-green-200 px-3 py-1 rounded text-sm">Status: Normal</span>
                  </div>
                  <div className="h-48 bg-white rounded border flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-full h-32 bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 to-blue-200 rounded mb-2 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">Rekomendasi Tinggi Badan: 75 - 85 cm</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Berat Badan Menurut Tinggi Badan</h3>
                    <span className="bg-yellow-200 px-3 py-1 rounded text-sm">Status: Normal</span>
                  </div>
                  <div className="h-48 bg-white rounded border flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-full h-32 bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 to-blue-200 rounded mb-2 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">Rekomendasi Berat Badan: 8.5 - 10.5 kg</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button onClick={handleNewData} className="bg-green-600 hover:bg-green-700 text-white px-8">
                  Data Baru
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Kalkulator Perhitungan</CardTitle>
            <p className="text-sm text-gray-600">Status Perkembangan Gizi Anak</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium">Jenis Kelamin :</Label>
              <div className="flex justify-center gap-8 mt-4">
                <button
                  onClick={() => setFormData({ ...formData, gender: "male" })}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors min-w-[140px] min-h-[140px] ${
                    formData.gender === "male" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <User className="w-12 h-12 mb-2" />
                  <span className="text-sm">Laki-laki</span>
                </button>
                <button
                  onClick={() => setFormData({ ...formData, gender: "female" })}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors min-w-[140px] min-h-[140px] ${
                    formData.gender === "female"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <User className="w-12 h-12 mb-2" />
                  <span className="text-sm">Perempuan</span>
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="age" className="text-sm font-medium">
                Usia Anak (0-60 Bulan) :
              </Label>
              <div className="flex mt-2">
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="flex-1"
                  placeholder="0"
                />
                <span className="ml-2 px-3 py-2 bg-gray-100 border rounded-md text-sm">Bulan</span>
              </div>
            </div>

            <div>
              <Label htmlFor="weight" className="text-sm font-medium">
                Berat Badan Anak :
              </Label>
              <div className="flex mt-2">
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="flex-1"
                  placeholder="0"
                />
                <span className="ml-2 px-3 py-2 bg-gray-100 border rounded-md text-sm">Kg</span>
              </div>
            </div>

            <div>
              <Label htmlFor="height" className="text-sm font-medium">
                Tinggi Badan Anak :
              </Label>
              <div className="flex mt-2">
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="flex-1"
                  placeholder="0"
                />
                <span className="ml-2 px-3 py-2 bg-gray-100 border rounded-md text-sm">Cm</span>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 bg-blue-50 p-3 rounded">
              * Jika anak belum bisa berdiri, maka pengukuran dilakukan dengan cara terlentang
            </div>

            <div className="text-center">
              <Button onClick={handleCalculate} className="bg-green-600 hover:bg-green-700 text-white px-8">
                Hitung →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
