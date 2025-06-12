import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Target, Award } from "lucide-react"
import { PageWrapper } from "@/components/shared/page-wrapper"

export default function AboutPage() {
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <PageWrapper className="flex flex-col min-h-screen">
        {/* Hero Section with Dark Theme */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Tentang MyCocoLink
                </h1>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  PT Lentera Abadi Solusinet - Penyedia layanan internet terpercaya untuk rumah dan bisnis Anda.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter text-white">Sejarah Kami</h2>
                <p className="text-gray-300 md:text-lg">
                  PT Lentera Abadi Solusinet didirikan pada tahun 2015 dengan visi menjadi penyedia solusi konektivitas
                  terpercaya di Indonesia. Berawal dari melayani area Jakarta dan sekitarnya, kini kami telah berkembang
                  melayani berbagai wilayah di Indonesia.
                </p>
                <p className="text-gray-300 md:text-lg">
                  Dengan pengalaman lebih dari 8 tahun di industri telekomunikasi, kami terus berinovasi untuk
                  memberikan layanan internet berkualitas tinggi dengan dukungan teknis yang handal dan harga yang
                  kompetitif.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter text-white">Visi & Misi</h2>
                <Card className="bg-slate-700 border-slate-600">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-blue-900 p-2 rounded-full">
                        <Target className="h-6 w-6 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Visi</h3>
                    </div>
                    <p className="text-gray-300">
                      Menjadi penyedia solusi konektivitas terpercaya di Indonesia yang menghubungkan masyarakat dengan
                      dunia digital secara handal dan terjangkau.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-700 border-slate-600">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-green-900 p-2 rounded-full">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Misi</h3>
                    </div>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Memberikan layanan internet berkualitas tinggi dengan dukungan teknis yang handal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Menyediakan solusi konektivitas dengan harga yang kompetitif dan transparan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Mengembangkan infrastruktur jaringan yang handal dan modern</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Memberikan pelayanan pelanggan yang responsif dan solusi yang tepat</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Nilai-Nilai Kami
                </h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Prinsip yang menjadi landasan kami dalam memberikan layanan terbaik
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="bg-blue-900 p-3 rounded-full">
                      <Award className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Kualitas</h3>
                    <p className="text-gray-300">
                      Kami berkomitmen untuk memberikan layanan internet berkualitas tinggi dengan performa yang stabil
                      dan andal.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="bg-green-900 p-3 rounded-full">
                      <Users className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Kepuasan Pelanggan</h3>
                    <p className="text-gray-300">
                      Kepuasan pelanggan adalah prioritas utama kami. Kami selalu berusaha memberikan solusi terbaik
                      untuk kebutuhan Anda.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="bg-red-900 p-3 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Integritas</h3>
                    <p className="text-gray-300">
                      Kami menjalankan bisnis dengan kejujuran, transparansi, dan etika yang tinggi dalam setiap aspek
                      layanan kami.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Tim Kami</h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Dipimpin oleh profesional berpengalaman di bidang telekomunikasi dan teknologi
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center space-y-2 text-center">
                  <div className="overflow-hidden rounded-full border-2 border-blue-500">
                    <Image
                      src={`/placeholder.svg?height=150&width=150&text=Team${i}`}
                      width={150}
                      height={150}
                      alt={`Team Member ${i}`}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white">Nama Lengkap</h3>
                  <p className="text-sm text-gray-400">Posisi / Jabatan</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Bergabunglah dengan Kami
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Jadilah bagian dari keluarga MyCocoLink dan nikmati koneksi internet stabil dan cepat
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/layanan">
                  <Button className="bg-white text-blue-900 hover:bg-gray-100">Lihat Paket Internet</Button>
                </Link>
                <Link href="/hubungi-kami">
                  <Button variant="outline" className="text-white border-white hover:bg-blue-800">
                    Hubungi Kami
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    </div>
  )
}
