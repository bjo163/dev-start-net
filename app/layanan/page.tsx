import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Wifi, Building2, Users } from "lucide-react"
import { PageWrapper } from "@/components/shared/page-wrapper"
import { FuturisticProgress } from "@/components/futuristic-effects"

export default function ServicesPage() {
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <PageWrapper className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Layanan Internet MyCocoLink
                </h1>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Pilih paket internet yang sesuai dengan kebutuhan Anda
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-800">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="rumah" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-3 bg-slate-700">
                  <TabsTrigger
                    value="rumah"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
                  >
                    <Wifi className="mr-2 h-4 w-4" />
                    Rumah
                  </TabsTrigger>
                  <TabsTrigger
                    value="bisnis"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300"
                  >
                    <Building2 className="mr-2 h-4 w-4" />
                    Bisnis
                  </TabsTrigger>
                  <TabsTrigger
                    value="komunitas"
                    className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-300"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Komunitas
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="rumah">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Paket Rumah Basic",
                      description: "Untuk kebutuhan internet dasar",
                      price: "Rp199.000",
                      speed: 10,
                      features: ["Kecepatan hingga 10 Mbps", "Unlimited Kuota", "Instalasi Gratis", "Support 24/7"],
                    },
                    {
                      title: "Paket Rumah Standard",
                      description: "Untuk kebutuhan internet sehari-hari",
                      price: "Rp299.000",
                      speed: 30,
                      features: [
                        "Kecepatan hingga 30 Mbps",
                        "Unlimited Kuota",
                        "Instalasi Gratis",
                        "Support 24/7",
                        "Router WiFi Gratis",
                      ],
                      popular: true,
                    },
                    {
                      title: "Paket Rumah Premium",
                      description: "Untuk kebutuhan internet tinggi",
                      price: "Rp499.000",
                      speed: 50,
                      features: [
                        "Kecepatan hingga 50 Mbps",
                        "Unlimited Kuota",
                        "Instalasi Gratis",
                        "Support Prioritas 24/7",
                        "Router WiFi AC Gratis",
                        "IP Statis (Opsional)",
                      ],
                    },
                  ].map((pkg, index) => (
                    <Card
                      key={index}
                      className="relative overflow-hidden bg-slate-700 border-slate-600 hover:bg-slate-600 transition-all duration-300 hover:-translate-y-2"
                    >
                      {pkg.popular && (
                        <div className="absolute right-4 top-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          Populer
                        </div>
                      )}
                      <CardHeader className="bg-blue-900/50 pb-8">
                        <CardTitle className="text-xl text-white">{pkg.title}</CardTitle>
                        <CardDescription className="text-gray-300">{pkg.description}</CardDescription>
                        <div className="flex items-baseline mt-4">
                          <span className="text-3xl font-bold text-white">{pkg.price}</span>
                          <span className="text-sm text-gray-400 ml-1">/bulan</span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <FuturisticProgress value={pkg.speed} max={100} label="Kecepatan" color="blue" />
                        </div>
                        <ul className="space-y-2">
                          {pkg.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-gray-300">
                              <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Link href="/hubungi-kami" className="w-full">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">Berlangganan Sekarang</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="bisnis">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Paket Bisnis Basic",
                      description: "Untuk UMKM dan startup",
                      price: "Rp499.000",
                      speed: 50,
                      features: [
                        "Kecepatan hingga 50 Mbps",
                        "Unlimited Kuota",
                        "IP Statis",
                        "Support Prioritas",
                        "SLA 99.5%",
                      ],
                    },
                    {
                      title: "Paket Bisnis Pro",
                      description: "Untuk bisnis menengah",
                      price: "Rp799.000",
                      speed: 100,
                      features: [
                        "Kecepatan hingga 100 Mbps",
                        "Unlimited Kuota",
                        "IP Statis",
                        "Support Prioritas 24/7",
                        "SLA 99.7%",
                        "Router Bisnis",
                      ],
                      popular: true,
                    },
                    {
                      title: "Paket Bisnis Enterprise",
                      description: "Untuk korporasi dan kebutuhan tinggi",
                      price: "Hubungi Kami",
                      speed: 1000,
                      features: [
                        "Kecepatan hingga 1 Gbps",
                        "Unlimited Kuota",
                        "Multiple IP Statis",
                        "Support Prioritas Dedicated",
                        "SLA 99.9%",
                        "Solusi Jaringan Kustom",
                        "Backup Link",
                      ],
                    },
                  ].map((pkg, index) => (
                    <Card
                      key={index}
                      className="relative overflow-hidden bg-slate-700 border-slate-600 hover:bg-slate-600 transition-all duration-300 hover:-translate-y-2"
                    >
                      {pkg.popular && (
                        <div className="absolute right-4 top-4 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                          Populer
                        </div>
                      )}
                      <CardHeader className="bg-green-900/50 pb-8">
                        <CardTitle className="text-xl text-white">{pkg.title}</CardTitle>
                        <CardDescription className="text-gray-300">{pkg.description}</CardDescription>
                        <div className="flex items-baseline mt-4">
                          <span className="text-3xl font-bold text-white">{pkg.price}</span>
                          {pkg.price !== "Hubungi Kami" && <span className="text-sm text-gray-400 ml-1">/bulan</span>}
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <FuturisticProgress value={pkg.speed} max={1000} label="Kecepatan" color="green" />
                        </div>
                        <ul className="space-y-2">
                          {pkg.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-gray-300">
                              <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Link href="/hubungi-kami" className="w-full">
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            {pkg.price === "Hubungi Kami" ? "Hubungi Kami" : "Berlangganan Sekarang"}
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="komunitas">
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      title: "Paket Perumahan",
                      description: "Untuk kompleks perumahan dan apartemen",
                      features: [
                        "Kecepatan disesuaikan kebutuhan",
                        "Unlimited Kuota",
                        "Harga Khusus Komunitas",
                        "Dukungan Teknis Khusus",
                        "Infrastruktur Jaringan Khusus",
                        "Manajemen Bandwidth",
                      ],
                    },
                    {
                      title: "Paket Institusi",
                      description: "Untuk sekolah, kampus, dan institusi",
                      features: [
                        "Kecepatan disesuaikan kebutuhan",
                        "Unlimited Kuota",
                        "Harga Khusus Institusi",
                        "Dukungan Teknis Khusus",
                        "Manajemen Bandwidth",
                        "Content Filtering",
                        "Solusi WiFi untuk Area Luas",
                      ],
                    },
                  ].map((pkg, index) => (
                    <Card
                      key={index}
                      className="relative overflow-hidden bg-slate-700 border-slate-600 hover:bg-slate-600 transition-all duration-300 hover:-translate-y-2"
                    >
                      <CardHeader className="bg-red-900/50 pb-8">
                        <CardTitle className="text-xl text-white">{pkg.title}</CardTitle>
                        <CardDescription className="text-gray-300">{pkg.description}</CardDescription>
                        <div className="flex items-baseline mt-4">
                          <span className="text-3xl font-bold text-white">Hubungi Kami</span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <ul className="space-y-2">
                          {pkg.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-gray-300">
                              <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Link href="/hubungi-kami" className="w-full">
                          <Button className="w-full bg-red-600 hover:bg-red-700">Hubungi Kami</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Siap untuk berlangganan?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hubungi kami sekarang untuk mendapatkan penawaran terbaik sesuai kebutuhan Anda
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/hubungi-kami">
                  <Button className="bg-white text-blue-900 hover:bg-gray-100">Hubungi Kami</Button>
                </Link>
                <Link href="/coverage">
                  <Button variant="outline" className="text-white border-white hover:bg-blue-800">
                    Cek Ketersediaan
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
