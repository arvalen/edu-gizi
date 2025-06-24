import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <Card className="bg-white h-full">
            <CardContent className="p-8 h-full flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Pengenalan Stunting
              </h1>
              <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                <p>
                  Stunting adalah masalah kurang gizi kronis yang disebabkan oleh asupan gizi yang kurang dalam waktu cukup lama akibat pemberian makanan yang tidak sesuai dengan kebutuhan gizi. Stunting dapat terjadi mulai janin masih dalam kandungan dan baru nampak saat anak berusia dua tahun (Kementerian Kesehatan Republik Indonesia, 2016).
                </p>
                <p>
                  Stunting dan kekurangan gizi lainnya yang terjadi pada 1.000 HPK tidak hanya menyebabkan hambatan pertumbuhan fisik dan meningkatkan kerentanan terhadap penyakit, tetapi juga mengancam perkembangan kognitif yang akan berpengaruh pada tingkat kecerdasan saat ini dan produktivitas anak di masa dewasanya.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white h-full flex justify-center items-center">
            <CardContent className="flex justify-center items-center p-8 h-full">
              <Image
                src="/Info.png"
                alt="Child illustration"
                width={400}
                height={320}
                className="rounded-lg shadow-lg"
              />
            </CardContent>
          </Card>
        </div>
        <Card className="bg-white">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Cara Mencegah Stunting pada Anak
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  1. Pemberian pola asuh yang tepat
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Langkah pertama adalah memberikan pola asuh yang tepat untuk anak. Ini meliputi Inisiasi Menyusui Dini atau IMD dan memberikan ASI eksklusif untuk bayi hingga usianya genap 6 bulan, dan lanjutkan hingga usianya 2 tahun.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  2. Memberikan MPASI yang optimal
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  United Nations Children&apos;s Fund (UNICEF) bersama dengan World Health Organization (WHO) merekomendasikan, bayi yang berusia 6 sampai 23 bulan memperoleh asupan makanan pendamping ASI atau MPASI yang tepat dan optimal.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Aturan pemberian makanan pendamping ASI mengandung setidaknya 4 atau lebih dari 7 macam makanan. Ini termasuk umbi atau serealia, produk olahan susu, kacang-kacangan, sumber protein, dan makanan dengan kandungan vitamin A.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Selain itu, ibu juga perlu memperhatikan batas frekuensi pemberian makan minimal untuk bayi mulai dari 6-23 bulan yang mendapat atau tidak mendapat ASI. Aturannya yaitu 2 kali sehari atau lebih untuk usia 6-8 bulan bayi dengan ASI, dan 3 kali sehari atau lebih untuk bayi usia 9-23 bulan dengan ASI.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Sementara itu, bayi usia 6-23 bulan yang tidak mendapatkan ASI setidaknya harus makan minimal 4 kali dalam sehari dengan porsi yang sesuai.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  3. Mengobati penyakit yang dialami anak
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Berbagai kondisi medis yang dialami anak bisa membuatnya mengalami penurunan nafsu makan. Misalnya, anak mengalami demam, batuk, pilek, flu, sembelit, hingga masalah pencernaan dan kondisi lain seperti TBC. Jika demikian, sebaiknya berikan penanganan utama pada kondisi medis tersebut. Lalu, ibu bisa melanjutkan dengan kembali memperbaiki asupan gizi sang buah hati.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  4. Perbaikan kebersihan lingkungan dan penerapan hidup bersih keluarga
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Pencegahan terakhir berupa menerapkan pola hidup bersih dan sehat, baik di lingkungan rumah maupun luar rumah. Membersihkan rumah bisa membantu menunjang kesehatan tubuh anak dan keluarga secara menyeluruh.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
