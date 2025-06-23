"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

interface CalculatorData {
  gender: "male" | "female"
  birth_date: string
  weight: string
  length: string
  headc: string
}

interface GrowthChartsResponse {
  age_weight: string
  age_length: string
  age_headc: string
  length_weight: string
}

interface CalculatorResultState {
  charts: GrowthChartsResponse
  loading: boolean
  error: string | null
}

const plotlyStyles = `
  .plotly-chart {
    margin-top: 30px !important;
  }
  .js-plotly-plot .plotly .modebar {
    top: -30px !important;
    right: 0 !important;
  }
`

export default function KalkulatorResult() {
  const router = useRouter()
  const [formData, setFormData] = useState<CalculatorData | null>(null)
  const [results, setResults] = useState<CalculatorResultState>({
    charts: {
      age_weight: "",
      age_length: "",
      age_headc: "",
      length_weight: ""
    },
    loading: false,
    error: null
  })
  const [displayDate, setDisplayDate] = useState("")

  useEffect(() => {
    const storedFormData = sessionStorage.getItem('calculatorFormData')
    const storedChartsData = sessionStorage.getItem('calculatorChartsData')

    if (storedFormData && storedChartsData) {
      const parsedFormData: CalculatorData = JSON.parse(storedFormData)
      const parsedChartsData: GrowthChartsResponse = JSON.parse(storedChartsData)
      
      setFormData(parsedFormData)
      setResults(prev => ({
        ...prev,
        charts: parsedChartsData,
        loading: false,
        error: null
      }))

      const date = new Date(parsedFormData.birth_date)
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      setDisplayDate(`${day}/${month}/${year}`)

    } else {
      router.replace('/kalkulator')
    }
  }, [router])

  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = plotlyStyles
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

  function getNearestIndex(arr: number[], value: number): number {
    let nearestIdx = 0;
    let minDiff = Math.abs(arr[0] - value);
    for (let i = 1; i < arr.length; i++) {
      const diff = Math.abs(arr[i] - value);
      if (diff < minDiff) {
        minDiff = diff;
        nearestIdx = i;
      }
    }
    return nearestIdx;
  }

  function getDetailedStatus(childY: number, percentiles: Record<string, number>) {
    const p2 = percentiles["2nd"];
    const p5 = percentiles["5th"];
    const p10 = percentiles["10th"];
    const p25 = percentiles["25th"];
    const p75 = percentiles["75th"];
    const p90 = percentiles["90th"];
    const p95 = percentiles["95th"];
    const p98 = percentiles["98th"];

    if (childY < p2) return { label: "Sangat Kurang", color: "#e53935" };
    if (childY < p5) return { label: "Kurang", color: "#fb8c00" };
    if (childY < p10) return { label: "Sedikit di Bawah Normal", color: "#fbc02d" };
    if (childY < p25) return { label: "Di Bawah Normal", color: "#fdd835" };
    if (childY < p75) return { label: "Normal", color: "#43a047" };
    if (childY < p90) return { label: "Di Atas Normal", color: "#1e88e5" };
    if (childY < p95) return { label: "Sedikit di Atas Normal", color: "#3949ab" };
    if (childY < p98) return { label: "Lebih", color: "#8e24aa" };
    return { label: "Sangat Lebih", color: "#d81b60" };
  }

  interface ChartTrace {
    name?: string;
    x: number[];
    y: number[];
  }

  const renderChart = (chartData: string, title: string, subtitle: string) => {
    if (!chartData) return null

    try {
      const parsedChart = JSON.parse(chartData)
      const childTrace = (parsedChart.data as ChartTrace[]).find((d) => d.name === "Child")
      const childX = childTrace?.x?.[0]
      const childY = childTrace?.y?.[0]
      const percentiles: Record<string, number> = {}
      let p50Value: number | undefined = undefined
      for (const trace of parsedChart.data as ChartTrace[]) {
        if (trace.name && trace.name.includes("percentile")) {
          const match = trace.name.match(/(\d+)(st|nd|rd|th)/)
          if (match && typeof childX === 'number') {
            const perc = match[1] + "th"; // always use th for easier mapping
            const idx = getNearestIndex(trace.x, childX)
            percentiles[perc] = trace.y[idx]
            if (perc === "50th") {
              p50Value = trace.y[idx]
            }
          }
        }
      }
      let status = null
      if (childY !== undefined && Object.keys(percentiles).length > 0) {
        status = getDetailedStatus(childY, percentiles)
      }
      let rekomendasi = null
      if (typeof p50Value === 'number') {
        if (title.toLowerCase().includes('berat badan menurut usia')) {
          rekomendasi = `Berat badan ideal untuk usia ini adalah ${p50Value.toFixed(2)} kg`;
        } else if (title.toLowerCase().includes('tinggi badan menurut usia')) {
          rekomendasi = `Tinggi badan ideal untuk usia ini adalah ${p50Value.toFixed(2)} cm`;
        } else if (title.toLowerCase().includes('lingkar kepala menurut usia')) {
          rekomendasi = `Lingkar kepala ideal untuk usia ini adalah ${p50Value.toFixed(2)} cm`;
        } else if (title.toLowerCase().includes('berat badan menurut tinggi badan')) {
          rekomendasi = `Berat badan ideal untuk tinggi ini adalah ${p50Value.toFixed(2)} kg`;
        }
      }
      return (
        <div className="bg-white rounded border border-gray-400 shadow-lg p-4 flex flex-col">
          <h4 className="font-semibold text-sm mb-1">{title}</h4>
          <p className="text-xs text-gray-500 mb-2">{subtitle}</p>
          {status && (
            <div className="mb-2">
              <span className={`px-3 py-1 rounded-md text-xs font-semibold`} style={{backgroundColor: status.color, color: 'white'}}>
                Status: {status.label}
              </span>
            </div>
          )}
          <div className="h-[300px] w-full max-w-full">
            <Plot
              data={parsedChart.data}
              layout={{
                ...parsedChart.layout,
                autosize: true,
                width: undefined,
                height: 270,
                margin: { l: 50, r: 50, t: 50, b: 50 },
                showlegend: true,
                legend: {
                  orientation: 'h',
                  y: -0.2,
                  xanchor: 'center',
                  x: 0.5
                },
                font: { size: 10 },
                hovermode: 'closest',
                spikedistance: -1,
                xaxis: {
                  ...parsedChart.layout.xaxis,
                  showspikes: true,
                  spikemode: 'across',
                  spikesnap: 'cursor',
                  showline: true,
                  spikecolor: '#999',
                  spikethickness: 1
                },
                yaxis: {
                  ...parsedChart.layout.yaxis,
                  showspikes: true,
                  spikemode: 'across',
                  spikesnap: 'cursor',
                  showline: true,
                  spikecolor: '#999',
                  spikethickness: 1
                }
              }}
              config={{ 
                responsive: true,
                displayModeBar: true,
                displaylogo: false,
                scrollZoom: true,
                modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d'],
                toImageButtonOptions: {
                  format: 'png',
                  filename: 'chart',
                  height: 500,
                  width: 700,
                  scale: 2
                }
              }}
              useResizeHandler={true}
              style={{
                width: '100%',
                height: '100%'
              }}
            />
          </div>
          {rekomendasi && (
            <div className="mt-3 text-xs text-gray-700 font-medium bg-green-50 rounded px-3 py-2 border border-gray-200">
              {rekomendasi}
            </div>
          )}
        </div>
      )
    } catch {
      return (
        <div className="bg-white rounded border p-4 flex flex-col">
          <h4 className="font-semibold text-sm mb-1">{title}</h4>
          <p className="text-xs text-gray-500 mb-2">{subtitle}</p>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-red-600 text-xs">⚠️</span>
              </div>
              <p className="text-xs text-gray-600">Grafik tidak tersedia</p>
              <p className="text-xs text-gray-500 mt-1">Data tidak valid</p>
            </div>
          </div>
        </div>
      )
    }
  }

  const handleNewData = () => {
    sessionStorage.removeItem('calculatorFormData')
    sessionStorage.removeItem('calculatorChartsData')
    router.push('/kalkulator')
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin mr-2" />
        <span>Memuat hasil...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-2 py-8">
        <Card className="bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Hasil Perhitungan</CardTitle>
            <p className="text-sm text-gray-600">Status Perkembangan Gizi Anak</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Jenis Kelamin</p>
                <p className="font-semibold">{formData.gender === "male" ? "Laki-laki" : "Perempuan"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tanggal Lahir</p>
                <p className="font-semibold">{displayDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Usia</p>
                <p className="font-semibold">{calculateAgeInMonths(formData.birth_date)} Bulan</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Berat Badan</p>
                <p className="font-semibold">{formData.weight} Kg</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tinggi Badan</p>
                <p className="font-semibold">{formData.length} Cm</p>
              </div>
            </div>

            {results.loading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span>Menghitung grafik pertumbuhan...</span>
              </div>
            )}

            {results.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-center">{results.error}</p>
              </div>
            )}

            {!results.loading && !results.error && (
              <div className="flex flex-col gap-6">
                {renderChart(results.charts.age_weight, "Berat Badan Menurut Usia", "Age vs Weight")}
                {renderChart(results.charts.age_length, "Tinggi Badan Menurut Usia", "Age vs Length")}
                {renderChart(results.charts.age_headc, "Lingkar Kepala Menurut Usia", "Age vs Head Circumference")}
                {renderChart(results.charts.length_weight, "Berat Badan Menurut Tinggi Badan", "Length vs Weight")}
              </div>
            )}

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
