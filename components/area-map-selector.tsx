"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface AreaData {
  id: string
  name: string
  color: string
  bounds: {
    lat: [number, number]
    lng: [number, number]
  }
  packages: {
    speed: string
    price: string
    type: string
  }[]
}

const areas: AreaData[] = [
  {
    id: "bni",
    name: "BNI",
    color: "#ef4444",
    bounds: { lat: [-6.25, -6.2], lng: [106.78, 106.83] },
    packages: [
      { speed: "50", price: "179.500", type: "HOME BROADBAND" },
      { speed: "100", price: "254.500", type: "HOME BROADBAND" },
    ],
  },
  {
    id: "ciledug",
    name: "CILEDUG",
    color: "#8b5cf6",
    bounds: { lat: [-6.24, -6.19], lng: [106.7, 106.75] },
    packages: [
      { speed: "50", price: "139.500", type: "HOME BROADBAND" },
      { speed: "100", price: "203.500", type: "HOME BROADBAND" },
    ],
  },
  {
    id: "jagakarsa",
    name: "JAGAKARSA",
    color: "#ec4899",
    bounds: { lat: [-6.35, -6.3], lng: [106.82, 106.87] },
    packages: [
      { speed: "50", price: "139.500", type: "HOME BROADBAND" },
      { speed: "100", price: "203.500", type: "HOME BROADBAND" },
    ],
  },
  {
    id: "sdk",
    name: "SDK",
    color: "#06b6d4",
    bounds: { lat: [-6.22, -6.17], lng: [106.75, 106.8] },
    packages: [
      { speed: "50", price: "104.500", type: "HOME BROADBAND" },
      { speed: "100", price: "203.500", type: "HOME BROADBAND" },
      { speed: "150", price: "1.504.500", type: "SOHO DEDICATED" },
    ],
  },
]

interface MapSelectorProps {
  onAreaSelect: (area: AreaData, coordinates: { lat: number; lng: number }) => void
  selectedArea?: AreaData | null
}

export function AreaMapSelector({ onAreaSelect, selectedArea }: MapSelectorProps) {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)
  const [clickedCoordinates, setClickedCoordinates] = useState<{ lat: number; lng: number } | null>(null)

  const handleAreaClick = (area: AreaData, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Convert click position to approximate coordinates
    const lat = area.bounds.lat[0] + (area.bounds.lat[1] - area.bounds.lat[0]) * (1 - y / rect.height)
    const lng = area.bounds.lng[0] + (area.bounds.lng[1] - area.bounds.lng[0]) * (x / rect.width)

    const coordinates = { lat, lng }
    setClickedCoordinates(coordinates)
    onAreaSelect(area, coordinates)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Pilih Area Layanan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: "400px" }}>
            {/* Simplified Map Visualization */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
              {areas.map((area) => (
                <div
                  key={area.id}
                  className={`absolute cursor-pointer transition-all duration-200 rounded-lg border-2 ${
                    selectedArea?.id === area.id
                      ? "border-white shadow-lg scale-105 z-10"
                      : hoveredArea === area.id
                        ? "border-white shadow-md scale-102 z-10"
                        : "border-transparent"
                  }`}
                  style={{
                    backgroundColor: area.color + "80",
                    left:
                      area.id === "bni"
                        ? "60%"
                        : area.id === "ciledug"
                          ? "20%"
                          : area.id === "jagakarsa"
                            ? "70%"
                            : "40%",
                    top:
                      area.id === "bni"
                        ? "20%"
                        : area.id === "ciledug"
                          ? "30%"
                          : area.id === "jagakarsa"
                            ? "60%"
                            : "45%",
                    width: "120px",
                    height: "80px",
                  }}
                  onMouseEnter={() => setHoveredArea(area.id)}
                  onMouseLeave={() => setHoveredArea(null)}
                  onClick={(e) => handleAreaClick(area, e)}
                >
                  <div className="flex items-center justify-center h-full">
                    <span className="text-white font-bold text-sm text-center px-2">{area.name}</span>
                  </div>
                </div>
              ))}

              {/* Coordinate Marker */}
              {clickedCoordinates && selectedArea && (
                <div
                  className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"
                  style={{
                    left:
                      selectedArea.id === "bni"
                        ? "65%"
                        : selectedArea.id === "ciledug"
                          ? "25%"
                          : selectedArea.id === "jagakarsa"
                            ? "75%"
                            : "45%",
                    top:
                      selectedArea.id === "bni"
                        ? "25%"
                        : selectedArea.id === "ciledug"
                          ? "35%"
                          : selectedArea.id === "jagakarsa"
                            ? "65%"
                            : "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
              <h4 className="font-semibold text-sm mb-2">Area Layanan:</h4>
              <div className="space-y-1">
                {areas.map((area) => (
                  <div key={area.id} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: area.color }} />
                    <span>{area.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {selectedArea && clickedCoordinates && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Area Terpilih: {selectedArea.name}</h4>
              <p className="text-sm text-blue-700">
                Koordinat: {clickedCoordinates.lat.toFixed(6)}, {clickedCoordinates.lng.toFixed(6)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
