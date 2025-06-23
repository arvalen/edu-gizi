"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import BoyIcon from '@mui/icons-material/Boy';
import GirlIcon from '@mui/icons-material/Girl';
import { addMonths, format } from 'date-fns';

interface CalculatorData {
  gender: "male" | "female"
  birth_date: string
  weight: string
  length: string
  headc: string
}

const dateInputStyles = `
  input[type="date"]::-webkit-datetime-edit-text,
  input[type="date"]::-webkit-datetime-edit-month-field,
  input[type="date"]::-webkit-datetime-edit-day-field,
  input[type="date"]::-webkit-datetime-edit-year-field {
    color: #6b7280;
  }
  
  input[type="date"]:in-range::-webkit-datetime-edit-year-field,
  input[type="date"]:in-range::-webkit-datetime-edit-month-field,
  input[type="date"]:in-range::-webkit-datetime-edit-day-field,
  input[type="date"]:in-range::-webkit-datetime-edit-text {
    color: transparent;
  }
  
  input[type="date"]:focus-within::-webkit-datetime-edit-text,
  input[type="date"]:focus-within::-webkit-datetime-edit-month-field,
  input[type="date"]:focus-within::-webkit-datetime-edit-day-field,
  input[type="date"]:focus-within::-webkit-datetime-edit-year-field,
  input[type="date"]:not(:placeholder-shown)::-webkit-datetime-edit-text,
  input[type="date"]:not(:placeholder-shown)::-webkit-datetime-edit-month-field,
  input[type="date"]:not(:placeholder-shown)::-webkit-datetime-edit-day-field,
  input[type="date"]:not(:placeholder-shown)::-webkit-datetime-edit-year-field {
    color: #111827;
  }
`

export default function Kalkulator() {
  const router = useRouter()
  const [formData, setFormData] = useState<CalculatorData>({
    gender: "male",
    birth_date: "",
    weight: "",
    length: "",
    headc: "",
  })
  const [displayDate, setDisplayDate] = useState("")
  const [loading, setLoading] = useState(false)

  const dateInputRef = useRef<HTMLInputElement>(null)

  const handleDateIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker()
    }
  }

  const isValidDate = (day: number, month: number, year: number) => {
    const date = new Date(year, month - 1, day)
    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year &&
      date <= new Date()
    )
  }

  const handleManualDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const lastChar = inputValue[inputValue.length - 1];
    
    if (inputValue.length < displayDate.length) {
      let newValue = displayDate;
      
      if (newValue.endsWith('/')) {
        newValue = newValue.slice(0, -2);
      } else {
        newValue = newValue.slice(0, -1);
      }
      
      setDisplayDate(newValue);
      
      const numbers = newValue.replace(/\D/g, '');
      if (numbers.length === 8) {
        const day = parseInt(numbers.slice(0, 2));
        const month = parseInt(numbers.slice(2, 4));
        const year = parseInt(numbers.slice(4, 8));
        
        if (isValidDate(day, month, year)) {
          const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          setFormData(prev => ({ ...prev, birth_date: dateStr }));
        } else {
          setFormData(prev => ({ ...prev, birth_date: '' }));
        }
      } else {
        setFormData(prev => ({ ...prev, birth_date: '' }));
      }
      return;
    }

    if (!/^\d$/.test(lastChar)) {
      return;
    }

    let value = (displayDate + lastChar).replace(/\D/g, '') 
    
    let formattedDate = ''
    for (let i = 0; i < value.length && i < 8; i++) {
      if (i === 0) {
        const firstDigit = parseInt(value[i])
        if (firstDigit > 3) {
          value = '0' + value.slice(i)
        }
      }
      if (i === 1) {
        const day = parseInt(value.slice(0, 2))
        if (day > 31) {
          value = '31' + value.slice(2)
        }
      }
      if (i === 2) {
        const firstDigit = parseInt(value[i])
        if (firstDigit > 1) {
          value = value.slice(0, 2) + '0' + value.slice(i + 1)
        }
      }
      if (i === 3) {
        const month = parseInt(value.slice(2, 4))
        if (month > 12) {
          value = value.slice(0, 2) + '12' + value.slice(4)
        }
      }

      formattedDate += value[i]
      
      if (i === 1 || i === 3) {
        formattedDate += '/'
      }
    }

    setDisplayDate(formattedDate)

    if (value.length === 8) {
      const day = parseInt(value.slice(0, 2))
      const month = parseInt(value.slice(2, 4))
      const year = parseInt(value.slice(4, 8))

      if (isValidDate(day, month, year)) {
        const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        setFormData(prev => ({ ...prev, birth_date: dateStr }))
      } else {
        setFormData(prev => ({ ...prev, birth_date: '' }))
      }
    } else {
      setFormData(prev => ({ ...prev, birth_date: '' }))
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setFormData(prev => ({ ...prev, birth_date: newDate }))
    
    const date = new Date(newDate)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    setDisplayDate(`${day}/${month}/${year}`)
  }

  useEffect(() => {
    if (formData.birth_date) {
      const date = new Date(formData.birth_date)
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      setDisplayDate(`${day}/${month}/${year}`)
    }
  }, [])

  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = dateInputStyles
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  const calculateAgeInMonths = (birthDate: string): number => {
    const birth = new Date(birthDate)
    const today = new Date()
    const ageInMs = today.getTime() - birth.getTime()
    const ageInMonths = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 30.44))
    return ageInMonths
  }

  const today = new Date();
  const minDate = format(addMonths(today, -24), 'yyyy-MM-dd');
  const maxDate = format(today, 'yyyy-MM-dd');

  const handleCalculate = async () => {
    if (!formData.birth_date || !formData.weight || !formData.length || !formData.headc) {
      alert("Mohon lengkapi semua data")
      return
    }

    const ageInMonths = calculateAgeInMonths(formData.birth_date)
    if (ageInMonths < 0 || ageInMonths > 24) {
      alert("Usia anak harus antara 0-24 bulan")
      return
    }

    setLoading(true)

    const requestBody = {
      gender: formData.gender,
      birth_date: formData.birth_date,
      weight: parseFloat(formData.weight),
      length: parseFloat(formData.length),
      headc: parseFloat(formData.headc)
    }

    console.log('Sending request:', requestBody)

    try {
      const response = await fetch('/api/growth-charts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          console.log('Could not parse error response as JSON')
        }
        throw new Error(errorMessage)
      }

      const chartsData = await response.json()
      console.log('Received charts data:', chartsData)
      
      sessionStorage.setItem('calculatorFormData', JSON.stringify(formData))
      sessionStorage.setItem('calculatorChartsData', JSON.stringify(chartsData))
      router.push('/kalkulator/result')

    } catch (error) {
      console.error('Error in handleCalculate:', error)
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan jaringan')
      setLoading(false)
    }
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
                  <BoyIcon style={{ fontSize: 48, color: '#2196f3', marginBottom: 8 }} />
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
                  <GirlIcon style={{ fontSize: 48, color: '#e91e63', marginBottom: 8 }} />
                  <span className="text-sm">Perempuan</span>
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label>Tanggal Lahir Anak :</Label>
                <div className="relative flex">
                  <Input
                    type="text"
                    value={displayDate}
                    onChange={handleManualDateInput}
                    className="w-full pr-10"
                    placeholder="DD/MM/YYYY"
                    maxLength={10}
                  />
                  <div 
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={handleDateIconClick}
                  >
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    ref={dateInputRef}
                    type="date"
                    className="sr-only"
                    min={minDate}
                    max={maxDate}
                    onChange={handleDateChange}
                    tabIndex={-1}
                  />
                </div>
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
                  placeholder="0.0"
                  min="0.1"
                  max="30.0"
                />
                <span className="ml-2 px-3 py-2 bg-gray-100 border rounded-md text-sm">Kg</span>
              </div>
            </div>

            <div>
              <Label htmlFor="length" className="text-sm font-medium">
                Tinggi Badan Anak :
              </Label>
              <div className="flex mt-2">
                <Input
                  id="length"
                  type="number"
                  step="0.1"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                  className="flex-1"
                  placeholder="0.0"
                  min="30.0"
                  max="120.0"
                />
                <span className="ml-2 px-3 py-2 bg-gray-100 border rounded-md text-sm">Cm</span>
              </div>
            </div>

            <div>
              <Label htmlFor="headc" className="text-sm font-medium">
                Lingkar Kepala Anak :
              </Label>
              <div className="flex mt-2">
                <Input
                  id="headc"
                  type="number"
                  step="0.1"
                  value={formData.headc}
                  onChange={(e) => setFormData({ ...formData, headc: e.target.value })}
                  className="flex-1"
                  placeholder="0.0"
                  min="20.0"
                  max="60.0"
                />
                <span className="ml-2 px-3 py-2 bg-gray-100 border rounded-md text-sm">Cm</span>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 bg-blue-50 p-3 rounded">
              * Jika anak belum bisa berdiri, maka pengukuran dilakukan dengan cara terlentang
            </div>

            <div className="text-center">
              <Button 
                onClick={handleCalculate} 
                className="bg-green-600 hover:bg-green-700 text-white px-8"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Menghitung...
                  </>
                ) : (
                  "Hitung →"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
