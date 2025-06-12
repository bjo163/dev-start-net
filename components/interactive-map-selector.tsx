"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Crosshair, ZoomIn, ZoomOut } from "lucide-react"

interface Area {
  id: string
  name: string
  color: string
  center: { lat: number; lng: number }
  radius: number
}

// Sample service areas
const serviceAreas: Area[] = [
  {
    id: "jakarta-selatan",
    name: "Jakarta Selatan",
    color: "#ef4444",
    center: { lat: -6.2608, lng: 106.8108 },
    radius: 0.05,
  },
  {
    id: "jakarta-pusat",
    name: "Jakarta Pusat",
    color: "#3b82f6",
    center: { lat: -6.1751, lng: 106.865 },
    radius: 0.04,
  },
  {
    id: "jakarta-barat",
    name: "Jakarta Barat",
    color: "#8b5cf6",
    center: { lat: -6.1683, lng: 106.7588 },
    radius: 0.045,
  },
  {
    id: "jakarta-timur",
    name: "Jakarta Timur",
    color: "#10b981",
    center: { lat: -6.225, lng: 106.9004 },
    radius: 0.05,
  },
  {
    id: "jakarta-utara",
    name: "Jakarta Utara",
    color: "#f59e0b",
    center: { lat: -6.121, lng: 106.8719 },
    radius: 0.04,
  },
  {
    id: "depok",
    name: "Depok",
    color: "#ec4899",
    center: { lat: -6.4025, lng: 106.7942 },
    radius: 0.06,
  },
  {
    id: "tangerang",
    name: "Tangerang",
    color: "#06b6d4",
    center: { lat: -6.1701, lng: 106.6403 },
    radius: 0.055,
  },
  {
    id: "bekasi",
    name: "Bekasi",
    color: "#84cc16",
    center: { lat: -6.2349, lng: 107.0003 },
    radius: 0.05,
  },
]

interface InteractiveMapSelectorProps {
  onCoordinateSelect: (coordinates: { lat: number; lng: number }, area: string | null) => void
}

export function InteractiveMapSelector({ onCoordinateSelect }: InteractiveMapSelectorProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapCenter, setMapCenter] = useState({ lat: -6.2, lng: 106.816 }) // Jakarta center
  const [zoom, setZoom] = useState(11)
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 })

  // Convert lat/lng to pixel coordinates
  const latLngToPixel = (lat: number, lng: number) => {
    const mapWidth = mapRef.current?.clientWidth || 800
    const mapHeight = mapRef.current?.clientHeight || 600

    // Simple mercator-like projection
    const scale = Math.pow(2, zoom) * 100

    const x = (lng - mapCenter.lng) * scale + mapWidth / 2 + mapOffset.x
    const y = (mapCenter.lat - lat) * scale + mapHeight / 2 + mapOffset.y

    return { x, y }
  }

  // Convert pixel coordinates to lat/lng
  const pixelToLatLng = (x: number, y: number) => {
    const mapWidth = mapRef.current?.clientWidth || 800
    const mapHeight = mapRef.current?.clientHeight || 600

    const scale = Math.pow(2, zoom) * 100

    const lng = (x - mapWidth / 2 - mapOffset.x) / scale + mapCenter.lng
    const lat = mapCenter.lat - (y - mapHeight / 2 - mapOffset.y) / scale

    return { lat, lng }
  }

  // Check if a point is inside an area
  const isPointInArea = (point: { lat: number; lng: number }, area: Area) => {
    const distance = Math.sqrt(Math.pow(point.lat - area.center.lat, 2) + Math.pow(point.lng - area.center.lng, 2))
    return distance <= area.radius
  }

  // Handle map click
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return

    const rect = mapRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const coordinates = pixelToLatLng(x, y)
    setSelectedCoordinates(coordinates)

    // Check if click is inside any service area
    let foundArea = null
    for (const area of serviceAreas) {
      if (isPointInArea(coordinates, area)) {
        foundArea = area.name
        break
      }
    }

    setSelectedArea(foundArea)
    onCoordinateSelect(coordinates, foundArea)
  }

  // Handle map drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y

    setMapOffset({
      x: mapOffset.x + dx,
      y: mapOffset.y + dy,
    })

    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle zoom
  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.5, 14))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.5, 9))
  }

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Find area by name
    const area = serviceAreas.find((area) => area.name.toLowerCase().includes(searchQuery.toLowerCase()))

    if (area) {
      setMapCenter(area.center)
      setMapOffset({ x: 0, y: 0 })
    }
  }

  // Reset selection
  const handleReset = () => {
    setSelectedCoordinates(null)
    setSelectedArea(null)
    onCoordinateSelect({ lat: 0, lng: 0 }, null)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Pilih Lokasi di Peta
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Cari lokasi..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Cari</Button>
        </form>

        {/* Map container */}
        <div className="relative border rounded-lg overflow-hidden" style={{ height: "400px" }}>
          <div
            ref={mapRef}
            className="w-full h-full bg-blue-50 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleMapClick}
          >
            {/* Map background with grid */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-blue-100"></div>
              ))}
            </div>

            {/* Service areas */}
            {serviceAreas.map((area) => {
              const { x, y } = latLngToPixel(area.center.lat, area.center.lng)
              const radiusInPixels = area.radius * Math.pow(2, zoom) * 100

              return (
                <div
                  key={area.id}
                  className="absolute rounded-full border-2 border-white shadow-md flex items-center justify-center"
                  style={{
                    backgroundColor: `${area.color}80`,
                    width: `${radiusInPixels * 2}px`,
                    height: `${radiusInPixels * 2}px`,
                    left: `${x - radiusInPixels}px`,
                    top: `${y - radiusInPixels}px`,
                  }}
                >
                  <span className="text-xs font-bold text-white drop-shadow-md">{area.name}</span>
                </div>
              )
            })}

            {/* Selected point */}
            {selectedCoordinates && (
              <div
                className="absolute w-6 h-6 transform -translate-x-3 -translate-y-3 z-20"
                style={{
                  left: latLngToPixel(selectedCoordinates.lat, selectedCoordinates.lng).x,
                  top: latLngToPixel(selectedCoordinates.lat, selectedCoordinates.lng).y,
                }}
              >
                <div className="w-full h-full bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {selectedCoordinates.lat.toFixed(6)}, {selectedCoordinates.lng.toFixed(6)}
                </div>
              </div>
            )}

            {/* Crosshair in center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
              <Crosshair className="h-8 w-8 text-gray-700" />
            </div>
          </div>

          {/* Map controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button size="icon" variant="secondary" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Selected location info */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Lokasi Terpilih:</h3>
              {selectedCoordinates ? (
                <div className="text-sm">
                  <p>
                    Koordinat: {selectedCoordinates.lat.toFixed(6)}, {selectedCoordinates.lng.toFixed(6)}
                  </p>
                  <p>Area: {selectedArea || "Di luar area layanan"}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Klik pada peta untuk memilih lokasi</p>
              )}
            </div>
            {selectedCoordinates && (
              <Button variant="outline" size="sm" onClick={handleReset}>
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-sm text-gray-500">
          <p>Petunjuk:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Klik pada peta untuk memilih lokasi</li>
            <li>Gunakan tombol + dan - untuk memperbesar/memperkecil</li>
            <li>Seret peta untuk melihat area lain</li>
            <li>Cari lokasi menggunakan kotak pencarian</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
