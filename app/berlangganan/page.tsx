"use client"

import { useState } from "react"
import { PackageSelector } from "@/components/package-selector"
import { SubscriptionForm } from "@/components/subscription-form"
import { RealMapSelector } from "@/components/real-map-selector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, FileText, Package } from "lucide-react"
import { FuturisticWrapper } from "@/components/shared/futuristic-wrapper"
import { getAreaByName } from "@/lib/data/packages"
import type { ServiceArea, Package as PackageType } from "@/lib/data/packages"

export default function SubscriptionPage() {
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null)
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)

  const handleCoordinateSelect = (coords: { lat: number; lng: number }, areaName: string | null) => {
    setCoordinates(coords)

    // Find the area by name using shared data
    if (areaName) {
      const area = getAreaByName(areaName)
      if (area) {
        setSelectedArea(area)
        setSelectedPackage(null) // Reset package selection when area changes
      }
    } else {
      setSelectedArea(null)
      setSelectedPackage(null)
    }
  }

  const handlePackageSelect = (pkg: PackageType) => {
    setSelectedPackage(pkg)
  }

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <FuturisticWrapper>
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-96 h-96 bg-blue-500/5 rounded-full animate-pulse"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                  animationDelay: `${i * 2}s`,
                }}
              />
            ))}
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Berlangganan MyCocoLink
                </h1>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Pilih lokasi Anda di peta, pilih paket internet yang sesuai, dan lengkapi data untuk berlangganan
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <Card className="bg-slate-700 border-slate-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <MapPin className="h-5 w-5 text-blue-400" />
                      Langkah 1: Pilih Lokasi Anda
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Klik pada peta untuk memilih lokasi Anda. Sistem akan mendeteksi apakah lokasi tersebut berada
                      dalam area layanan kami dan menampilkan paket yang tersedia.
                    </p>
                    <RealMapSelector onCoordinateSelect={handleCoordinateSelect} />
                  </CardContent>
                </Card>

                <Card className="bg-slate-700 border-slate-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Package className="h-5 w-5 text-green-400" />
                      Langkah 2: Pilih Paket Internet
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PackageSelector
                      selectedArea={selectedArea}
                      selectedPackage={selectedPackage}
                      onPackageSelect={handlePackageSelect}
                    />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-slate-700 border-slate-600 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <FileText className="h-5 w-5 text-purple-400" />
                      Langkah 3: Lengkapi Data Berlangganan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SubscriptionForm
                      selectedArea={selectedArea}
                      selectedPackage={selectedPackage}
                      coordinates={coordinates}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter text-white">Langkah Selanjutnya</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Setelah Anda mengirimkan formulir berlangganan, berikut adalah proses yang akan kami lakukan:
              </p>
              <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto mt-8">
                {[
                  {
                    step: "1",
                    title: "Verifikasi Data",
                    description: "Tim kami akan memverifikasi data yang Anda berikan dalam 1x24 jam",
                    color: "blue",
                  },
                  {
                    step: "2",
                    title: "Survei Lokasi",
                    description: "Teknisi akan melakukan survei di lokasi Anda untuk memastikan kelayakan instalasi",
                    color: "green",
                  },
                  {
                    step: "3",
                    title: "Instalasi",
                    description: "Pemasangan perangkat dan aktivasi layanan internet di lokasi Anda",
                    color: "purple",
                  },
                ].map((item, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div
                      className={`w-12 h-12 bg-${item.color}-900 rounded-full flex items-center justify-center mx-auto shadow-lg`}
                    >
                      <span className={`text-${item.color}-400 font-bold`}>{item.step}</span>
                    </div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FuturisticWrapper>
    </div>
  )
}
