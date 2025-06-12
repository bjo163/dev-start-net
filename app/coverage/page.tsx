"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckAvailability } from "@/components/check-availability"
import { MapPin } from "lucide-react"
import { RealMapSelector } from "@/components/real-map-selector"
import Link from "next/link"
import { PageWrapper } from "@/components/shared/page-wrapper"

export default function CoveragePage() {
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  const handleCoordinateSelect = (coordinates: { lat: number; lng: number }, area: string | null) => {
    setSelectedCoordinates(coordinates)
    setSelectedArea(area)
  }

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <PageWrapper className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Area Layanan
                </h1>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Periksa apakah layanan MyCocoLink tersedia di area Anda menggunakan peta interaktif
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter mb-4 text-white">Cek Ketersediaan dengan Peta</h2>
                  <p className="text-gray-300 mb-6">
                    Gunakan peta interaktif di bawah ini untuk memilih lokasi Anda. Sistem akan secara otomatis
                    mendeteksi apakah lokasi tersebut berada dalam area layanan MyCocoLink.
                  </p>
                  <RealMapSelector onCoordinateSelect={handleCoordinateSelect} />
                </div>

                {selectedCoordinates && selectedArea && (
                  <Card className="border-green-600 bg-green-900/20">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Layanan Tersedia!
                      </CardTitle>
                      <CardDescription className="text-green-300">
                        Lokasi Anda berada di area layanan {selectedArea}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-green-300 mb-4">
                        Selamat! Kami menyediakan layanan internet berkualitas tinggi di lokasi Anda. Silakan lihat
                        paket yang tersedia dan daftar sekarang untuk menikmati internet super cepat!
                      </p>
                      <div className="flex gap-2">
                        <Link href="/berlangganan">
                          <Button className="bg-green-600 hover:bg-green-700">Lihat Paket & Berlangganan</Button>
                        </Link>
                        <Link href="/layanan">
                          <Button variant="outline" className="border-green-400 text-green-400 hover:bg-green-900/50">
                            Info Layanan
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedCoordinates && !selectedArea && (
                  <Card className="border-red-600 bg-red-900/20">
                    <CardHeader>
                      <CardTitle className="text-red-400 flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Layanan Belum Tersedia
                      </CardTitle>
                      <CardDescription className="text-red-300">
                        Lokasi yang Anda pilih berada di luar area layanan kami saat ini
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-red-300 mb-4">
                        Mohon maaf, saat ini kami belum melayani area tersebut. Namun, kami terus memperluas jangkauan
                        layanan kami. Daftarkan diri Anda di waitlist untuk mendapat notifikasi ketika layanan tersedia!
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" className="border-red-400 text-red-400 hover:bg-red-900/50">
                          Daftar Waitlist
                        </Button>
                        <Link href="/hubungi-kami">
                          <Button variant="outline" className="border-red-400 text-red-400 hover:bg-red-900/50">
                            Hubungi Kami
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter mb-4 text-white">Cek dengan Alamat</h2>
                  <p className="text-gray-300 mb-6">
                    Jika Anda lebih suka mencari berdasarkan alamat lengkap, gunakan form di bawah ini untuk memeriksa
                    ketersediaan layanan.
                  </p>
                  <CheckAvailability />
                </div>

                <Card className="bg-slate-700 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white">Area Jangkauan Kami</CardTitle>
                    <CardDescription className="text-gray-300">
                      Saat ini, MyCocoLink melayani area-area berikut:
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card className="bg-slate-800 border-slate-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-white">Jakarta</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-center text-gray-300">
                              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                              <span>Jakarta Selatan</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                              <span>Jakarta Pusat</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                              <span>Jakarta Barat</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                              <span>Jakarta Timur</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                              <span>Jakarta Utara</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-800 border-slate-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-white">Bodetabek</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-center text-gray-300">
                              <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                              <span>Depok</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                              <div className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></div>
                              <span>Tangerang</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                              <div className="w-3 h-3 bg-lime-500 rounded-full mr-2"></div>
                              <span>Bekasi</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                    <p className="text-sm text-gray-400 mt-4">
                      Area berwarna pada peta menunjukkan jangkauan layanan kami. Klik pada area tersebut untuk melihat
                      detail.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ingin MyCocoLink hadir di area Anda?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Beri tahu kami jika Anda ingin MyCocoLink hadir di area Anda. Kami akan memprioritaskan ekspansi
                  berdasarkan permintaan pelanggan.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-white text-blue-900 hover:bg-gray-100">Ajukan Area Baru</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                  Lihat Rencana Ekspansi
                </Button>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    </div>
  )
}
