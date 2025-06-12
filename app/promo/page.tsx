import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays } from "lucide-react"
import { PageWrapper } from "@/components/shared/page-wrapper"

export default function PromoPage() {
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <PageWrapper className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Promo dan Berita
                </h1>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Temukan penawaran spesial dan informasi terbaru dari MyCocoLink
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-white">Promo Terbaru</h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Dapatkan penawaran spesial untuk berlangganan layanan MyCocoLink
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden bg-slate-700 border-slate-600 hover:bg-slate-600 transition-colors">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Promo Diskon 50%"
                    className="w-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-red-600">Terbatas</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-white">Diskon 50% Biaya Berlangganan</CardTitle>
                  <CardDescription className="flex items-center text-gray-300">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Berlaku hingga 31 Desember 2023
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Dapatkan diskon 50% untuk 3 bulan pertama berlangganan paket internet rumah atau bisnis. Promo
                    berlaku untuk pelanggan baru yang mendaftar sebelum 31 Desember 2023.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/hubungi-kami" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Dapatkan Promo</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden bg-slate-700 border-slate-600 hover:bg-slate-600 transition-colors">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Promo Gratis Instalasi"
                    className="w-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-600">Populer</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-white">Gratis Biaya Instalasi</CardTitle>
                  <CardDescription className="flex items-center text-gray-300">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Berlaku hingga 31 Januari 2024
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Berlangganan paket internet MyCocoLink dan dapatkan gratis biaya instalasi senilai Rp500.000. Promo
                    berlaku untuk semua paket internet rumah dan bisnis.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/hubungi-kami" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Dapatkan Promo</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden bg-slate-700 border-slate-600 hover:bg-slate-600 transition-colors">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    width={400}
                    height={200}
                    alt="Promo Upgrade Kecepatan"
                    className="w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-white">Upgrade Kecepatan Gratis</CardTitle>
                  <CardDescription className="flex items-center text-gray-300">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Berlaku hingga 28 Februari 2024
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Pelanggan lama dapat menikmati upgrade kecepatan internet gratis hingga 2x lipat tanpa biaya
                    tambahan. Hubungi tim kami untuk informasi lebih lanjut.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/hubungi-kami" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Dapatkan Promo</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Dapatkan Informasi Terbaru
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Berlangganan newsletter kami untuk mendapatkan informasi terbaru tentang promo dan berita MyCocoLink
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan email Anda"
                    type="email"
                  />
                  <Button type="submit" className="bg-white text-blue-900 hover:bg-gray-100">
                    Langganan
                  </Button>
                </form>
                <p className="text-xs text-gray-300">
                  Kami tidak akan mengirimkan spam. Anda dapat berhenti berlangganan kapan saja.
                </p>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    </div>
  )
}
