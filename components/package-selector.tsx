"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi } from "lucide-react"
import { PricingCard } from "@/components/shared/pricing-card"
import type { ServiceArea, Package } from "@/lib/data/packages"

interface PackageSelectorProps {
  selectedArea: ServiceArea | null
  selectedPackage: Package | null
  onPackageSelect: (pkg: Package) => void
}

export function PackageSelector({ selectedArea, selectedPackage, onPackageSelect }: PackageSelectorProps) {
  if (!selectedArea) {
    return (
      <Card className="bg-slate-700 border-slate-600">
        <CardContent className="p-8 text-center">
          <Wifi className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300">Pilih area layanan terlebih dahulu untuk melihat paket yang tersedia</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-700 border-slate-600">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Wifi className="h-5 w-5 text-blue-400" />
          Paket Tersedia di Area {selectedArea.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {selectedArea.packages.map((pkg, index) => (
            <div
              key={`${pkg.id}-${index}`}
              className={`cursor-pointer transition-all duration-200 ${
                selectedPackage?.id === pkg.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => onPackageSelect(pkg)}
            >
              <PricingCard
                package={pkg}
                areaName={selectedArea.name}
                onSelect={onPackageSelect}
                showCTA={false}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
