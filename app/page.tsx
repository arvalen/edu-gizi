import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="bg-white">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Mengenal Stunting - Pengertian, Penyebab, dan Pencegahannya
                </h1>
                <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                  <p>
                    Stunting adalah gangguan pertumbuhan yang terjadi pada anak-anak di bawah 5 tahun dan memiliki
                    dampak terhadap pertumbuhan fisik mereka. Sebagian orang, mungkin belum familiar dengan istilah ini,
                    tetapi kasus stunting sering terjadi di Indonesia.
                  </p>
                  <p>
                    Stunting dapat mengakibatkan anak sekali gizi buruk, tercidera jika berlanjung dalam jangka waktu
                    yang lama. Faktor penyebabnya dapat berasal dari malnutrisi pada ibu hamil dan selama masa
                    pertumbuhan anak.
                  </p>
                  <p>
                    Gejala stunting paling umum yang terlihat pada anak adalah tinggi badan yang lebih pendek dari anak
                    lain dengan usia sebaya. Meskipun postur tubuh anak dipengaruhi oleh berbagai faktor, stunting
                    menunjukkan adanya keterlambatan pertumbuhan yang memerlukan perhatian serius. Untuk informasi lebih
                    lanjut, simak penjelasan selengkapnya di bawah ini.
                  </p>
                  <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Apa itu Stunting?</h2>
                  <p>
                    Stunting adalah gangguan pertumbuhan yang terjadi pada anak-anak di bawah 5 tahun dan memiliki
                    dampak terhadap pertumbuhan fisik mereka. Sebagian orang, mungkin belum familiar dengan istilah ini,
                    tetapi kasus stunting sering terjadi di Indonesia.
                  </p>
                  <p>
                    Stunting dapat mengakibatkan anak sekali gizi buruk, tercidera jika berlanjung dalam jangka waktu
                    yang lama. Faktor penyebabnya dapat berasal dari malnutrisi pada ibu hamil atau selama masa
                    pertumbuhan anak.
                  </p>
                  <p>
                    Gejala stunting paling umum yang terlihat pada anak adalah tinggi badan yang lebih pendek
                    dibandingkan dengan anak-anak sebaya. Meskipun postur tubuh anak dipengaruhi oleh berbagai faktor,
                    stunting menunjukkan adanya keterlambatan pertumbuhan yang memerlukan perhatian serius. Untuk
                    informasi lebih lanjut, simak penjelasan selengkapnya di bawah ini.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/placeholder.svg?height=300&width=250"
                  alt="Child illustration"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
