"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Search, RotateCcw, Zap } from "lucide-react"
import { serviceAreas } from "@/lib/data/packages"

interface RealMapSelectorProps {
  onCoordinateSelect: (coordinates: { lat: number; lng: number }, area: string | null) => void
}

declare global {
  interface Window {
    L: any
  }
}

export function RealMapSelector({ onCoordinateSelect }: RealMapSelectorProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const circlesRef = useRef<any[]>([])
  const selectedMarkerRef = useRef<any>(null)

  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  // Load Leaflet CSS and JS
  useEffect(() => {
    const loadLeaflet = async () => {
      // Load CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        link.crossOrigin = ""
        document.head.appendChild(link)
      }

      // Load JS
      if (!window.L) {
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        script.crossOrigin = ""

        script.onload = () => {
          setIsMapLoaded(true)
        }

        document.head.appendChild(script)
      } else {
        setIsMapLoaded(true)
      }
    }

    loadLeaflet()
  }, [])

  // Initialize map
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current || mapInstanceRef.current) return

    // Initialize map centered on Jakarta
    const map = window.L.map(mapRef.current).setView([-6.2, 106.816], 11)

    // Add OpenStreetMap tiles with dark theme
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      className: "map-tiles",
    }).addTo(map)

    // Add service area circles using shared data
    serviceAreas.forEach((area) => {
      const circle = window.L.circle([area.center.lat, area.center.lng], {
        color: area.color,
        fillColor: area.color,
        fillOpacity: 0.2,
        radius: area.radius,
        weight: 2,
        interactive: false,
      }).addTo(map)

      // Enhanced popup with package info
      const packageCount = area.packages.length
      const priceRange =
        area.packages.length > 0
          ? `Rp. ${Math.min(...area.packages.map((p) => Number.parseInt(p.price.replace(".", "")))) / 1000}K - ${Math.max(...area.packages.map((p) => Number.parseInt(p.price.replace(".", "")))) / 1000}K`
          : "Hubungi kami"

      circle.bindPopup(`
        <div class="text-center p-2">
          <strong class="text-lg">${area.name}</strong><br/>
          <span class="text-sm text-gray-600">Area Layanan MyCocoLink</span><br/>
          <span class="text-sm font-medium">${packageCount} paket tersedia</span><br/>
          <span class="text-xs text-blue-600">${priceRange}/bulan</span>
        </div>
      `)

      circlesRef.current.push(circle)
    })

    // Handle map clicks
    map.on("click", (e: any) => {
      const { lat, lng } = e.latlng
      setTimeout(() => {
        handleCoordinateSelect(lat, lng)
      }, 10)
    })

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [isMapLoaded])

  // Check if coordinates are within service area using shared data
  const getAreaForCoordinates = (lat: number, lng: number) => {
    for (const area of serviceAreas) {
      const distance = calculateDistance(lat, lng, area.center.lat, area.center.lng)
      if (distance <= area.radius) {
        return area.name
      }
    }
    return null
  }

  // Calculate distance between two points in meters
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lng2 - lng1) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

  // Handle coordinate selection
  const handleCoordinateSelect = (lat: number, lng: number) => {
    if (!mapInstanceRef.current) return

    // Remove previous marker
    if (selectedMarkerRef.current) {
      mapInstanceRef.current.removeLayer(selectedMarkerRef.current)
    }

    // Add new enhanced marker
    const marker = window.L.marker([lat, lng], {
      icon: window.L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            width: 24px; 
            height: 24px; 
            background: linear-gradient(45deg, #ef4444, #dc2626); 
            border: 3px solid white; 
            border-radius: 50%; 
            box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 4px rgba(239, 68, 68, 0.3);
            animation: pulse 2s infinite, glow 2s ease-in-out infinite alternate;
            position: relative;
          "></div>
          <style>
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.2); }
              100% { transform: scale(1); }
            }
            @keyframes glow {
              from { box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 4px rgba(239, 68, 68, 0.3); }
              to { box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 8px rgba(239, 68, 68, 0.1); }
            }
          </style>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      }),
    }).addTo(mapInstanceRef.current)

    selectedMarkerRef.current = marker

    // Check if in service area
    const area = getAreaForCoordinates(lat, lng)

    // Update state
    const coordinates = { lat, lng }
    setSelectedCoordinates(coordinates)
    setSelectedArea(area)

    // Call callback
    onCoordinateSelect(coordinates, area)

    // Enhanced popup content
    const popupContent = area
      ? `
        <div class="text-center p-3">
          <div class="flex items-center justify-center mb-2">
            <div class="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <strong class="text-green-600">Lokasi Terpilih</strong>
          </div>
          <div class="text-sm space-y-1">
            <p><strong>Area:</strong> ${area}</p>
            <p><strong>Koordinat:</strong> ${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
            <p class="text-green-600 font-medium">✓ Dalam jangkauan layanan</p>
          </div>
        </div>
      `
      : `
        <div class="text-center p-3">
          <div class="flex items-center justify-center mb-2">
            <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <strong class="text-red-600">Lokasi Terpilih</strong>
          </div>
          <div class="text-sm space-y-1">
            <p><strong>Koordinat:</strong> ${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
            <p class="text-red-600 font-medium">⚠ Di luar area layanan</p>
            <p class="text-xs text-gray-500">Hubungi kami untuk informasi ekspansi</p>
          </div>
        </div>
      `

    marker.bindPopup(popupContent).openPopup()
  }

  // Handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim() || !mapInstanceRef.current) return

    setIsSearching(true)

    try {
      // Use Nominatim API for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1&countrycodes=id`,
      )
      const data = await response.json()

      if (data && data.length > 0) {
        const { lat, lon } = data[0]
        const latitude = Number.parseFloat(lat)
        const longitude = Number.parseFloat(lon)

        // Pan to location with animation
        mapInstanceRef.current.flyTo([latitude, longitude], 15, {
          duration: 1.5,
        })

        // Select the coordinates
        setTimeout(() => {
          handleCoordinateSelect(latitude, longitude)
        }, 1500)
      } else {
        alert("Lokasi tidak ditemukan. Coba dengan kata kunci yang lebih spesifik.")
      }
    } catch (error) {
      console.error("Search error:", error)
      alert("Terjadi kesalahan saat mencari lokasi.")
    } finally {
      setIsSearching(false)
    }
  }

  // Reset selection
  const handleReset = () => {
    if (selectedMarkerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(selectedMarkerRef.current)
      selectedMarkerRef.current = null
    }

    setSelectedCoordinates(null)
    setSelectedArea(null)
    onCoordinateSelect({ lat: 0, lng: 0 }, null)

    // Reset map view to Jakarta with animation
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([-6.2, 106.816], 11, {
        duration: 1.5,
      })
    }
  }

  return (
    <Card className="w-full bg-slate-700 border-slate-600">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <MapPin className="h-5 w-5 text-blue-400" />
          Pilih Lokasi di Peta
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Enhanced search bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari alamat atau lokasi..."
              className="pl-9 bg-slate-600 border-slate-500 text-white placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearching}
            />
          </div>
          <Button type="submit" disabled={isSearching || !searchQuery.trim()} className="bg-blue-600 hover:bg-blue-700">
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Mencari...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Cari
              </>
            )}
          </Button>
        </form>

        {/* Enhanced map container */}
        <div
          className="relative border-2 border-slate-600 rounded-lg overflow-hidden shadow-xl"
          style={{ height: "500px" }}
        >
          <div ref={mapRef} className="w-full h-full" style={{ minHeight: "500px" }} />

          {!isMapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
                <p className="text-gray-300">Memuat peta...</p>
              </div>
            </div>
          )}

          {/* Enhanced reset button */}
          {selectedCoordinates && (
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-4 right-4 z-[1000] bg-slate-700 border-slate-500 text-white hover:bg-slate-600"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          )}

          {/* Map legend */}
          <div className="absolute bottom-4 left-4 z-[1000] bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 text-xs text-white">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-blue-500/50 rounded-full"></div>
              <span>Area Layanan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Lokasi Terpilih</span>
            </div>
          </div>
        </div>

        {/* Enhanced selected location info */}
        <div
          className={`p-4 rounded-lg border ${selectedArea ? "bg-green-900/20 border-green-500/30" : selectedCoordinates ? "bg-red-900/20 border-red-500/30" : "bg-slate-600 border-slate-500"}`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-medium text-white mb-2 flex items-center">
                {selectedArea && <Zap className="h-4 w-4 text-green-400 mr-2" />}
                Lokasi Terpilih:
              </h3>
              {selectedCoordinates ? (
                <div className="space-y-1">
                  <p className="text-sm text-gray-300">
                    <strong>Koordinat:</strong> {selectedCoordinates.lat.toFixed(6)},{" "}
                    {selectedCoordinates.lng.toFixed(6)}
                  </p>
                  <p className="text-sm">
                    <strong>Status:</strong>{" "}
                    <span className={selectedArea ? "text-green-400 font-medium" : "text-red-400 font-medium"}>
                      {selectedArea ? `✓ Dalam area layanan ${selectedArea}` : "⚠ Di luar area layanan"}
                    </span>
                  </p>
                  {selectedArea && <p className="text-xs text-green-300">Paket internet tersedia untuk area ini</p>}
                </div>
              ) : (
                <p className="text-sm text-gray-400">Klik pada peta untuk memilih lokasi</p>
              )}
            </div>
            {selectedCoordinates && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="ml-4 border-slate-500 text-gray-300 hover:bg-slate-600"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Enhanced instructions */}
        <div className="text-sm text-gray-400 space-y-1 bg-slate-600/50 p-3 rounded-lg">
          <p className="font-medium text-gray-300">
            <strong>Petunjuk:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Klik pada peta untuk memilih lokasi</li>
            <li>Gunakan scroll mouse untuk zoom in/out</li>
            <li>Drag peta untuk melihat area lain</li>
            <li>Cari lokasi menggunakan kotak pencarian</li>
            <li>Area berwarna menunjukkan jangkauan layanan</li>
            <li>Marker merah menandai lokasi yang dipilih</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
