"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export function CheckAvailability() {
  const [searchMethod, setSearchMethod] = useState("address")
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<"available" | "unavailable" | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsChecking(true)

    // Simulasi pengecekan ketersediaan
    setTimeout(() => {
      // Untuk demo, kita akan menghasilkan hasil acak
      const isAvailable = Math.random() > 0.3
      setResult(isAvailable ? "available" : "unavailable")
      setIsChecking(false)
    }, 1500)
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight mb-4">Cek Ketersediaan Layanan</h3>
        <RadioGroup
          defaultValue="address"
          className="flex flex-col sm:flex-row gap-4 mb-6"
          onValueChange={setSearchMethod}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="address" id="address" />
            <Label htmlFor="address">Berdasarkan Alamat</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="postal" id="postal" />
            <Label htmlFor="postal">Berdasarkan Kode Pos</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="area" id="area" />
            <Label htmlFor="area">Berdasarkan Wilayah</Label>
          </div>
        </RadioGroup>

        <form onSubmit={handleSubmit} className="space-y-4">
          {searchMethod === "address" && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="street">Alamat Lengkap</Label>
                <Input id="street" placeholder="Masukkan alamat lengkap Anda" required />
              </div>
            </div>
          )}

          {searchMethod === "postal" && (
            <div className="grid gap-2">
              <Label htmlFor="postal-code">Kode Pos</Label>
              <Input id="postal-code" placeholder="Masukkan kode pos Anda" required />
            </div>
          )}

          {searchMethod === "area" && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="province">Provinsi</Label>
                <Select>
                  <SelectTrigger id="province">
                    <SelectValue placeholder="Pilih provinsi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dki">DKI Jakarta</SelectItem>
                    <SelectItem value="jabar">Jawa Barat</SelectItem>
                    <SelectItem value="jateng">Jawa Tengah</SelectItem>
                    <SelectItem value="jatim">Jawa Timur</SelectItem>
                    <SelectItem value="banten">Banten</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">Kota/Kabupaten</Label>
                <Select>
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Pilih kota/kabupaten" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jakarta-selatan">Jakarta Selatan</SelectItem>
                    <SelectItem value="jakarta-pusat">Jakarta Pusat</SelectItem>
                    <SelectItem value="jakarta-barat">Jakarta Barat</SelectItem>
                    <SelectItem value="jakarta-timur">Jakarta Timur</SelectItem>
                    <SelectItem value="jakarta-utara">Jakarta Utara</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="district">Kecamatan</Label>
                <Select>
                  <SelectTrigger id="district">
                    <SelectValue placeholder="Pilih kecamatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pancoran">Pancoran</SelectItem>
                    <SelectItem value="tebet">Tebet</SelectItem>
                    <SelectItem value="setiabudi">Setiabudi</SelectItem>
                    <SelectItem value="mampang">Mampang Prapatan</SelectItem>
                    <SelectItem value="kebayoran">Kebayoran Baru</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isChecking}>
            {isChecking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memeriksa...
              </>
            ) : (
              "Cek Ketersediaan"
            )}
          </Button>
        </form>

        {result && (
          <div className="mt-6 p-4 rounded-lg border">
            {result === "available" ? (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                <div>
                  <p className="font-medium">Layanan tersedia di area Anda!</p>
                  <p className="text-sm text-muted-foreground">
                    Silakan hubungi tim kami untuk informasi lebih lanjut dan pemasangan.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <XCircle className="h-5 w-5 mr-2" />
                <div>
                  <p className="font-medium">Maaf, layanan belum tersedia di area Anda.</p>
                  <p className="text-sm text-muted-foreground">
                    Kami sedang memperluas jangkauan kami. Silakan tinggalkan kontak Anda untuk pemberitahuan.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
