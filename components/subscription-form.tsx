"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle, User, CreditCard, Sparkles } from "lucide-react"
import type { ServiceArea, Package } from "@/lib/data/packages"

interface SubscriptionFormProps {
  selectedArea: ServiceArea | null
  selectedPackage: Package | null
  coordinates: { lat: number; lng: number } | null
}

export function SubscriptionForm({ selectedArea, selectedPackage, coordinates }: SubscriptionFormProps) {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    npwp: "",
    phone: "",
    whatsapp: "",
    email: "",
    alamat: "",
    usernameLogin: "",
    passwordLogin: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission with enhanced feedback
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          nama: "",
          nik: "",
          npwp: "",
          phone: "",
          whatsapp: "",
          email: "",
          alamat: "",
          usernameLogin: "",
          passwordLogin: "",
        })
      }, 5000)
    }, 2000)
  }

  if (!selectedArea || !selectedPackage) {
    return (
      <Card className="bg-slate-700 border-slate-600">
        <CardContent className="p-8 text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300">Pilih area dan paket terlebih dahulu untuk melanjutkan pendaftaran</p>
        </CardContent>
      </Card>
    )
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-500/30">
          <CardContent className="p-8 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold text-green-300 mb-2">Pendaftaran Berhasil!</h3>
            <p className="text-gray-300 mb-4">
              Terima kasih telah mendaftar. Tim kami akan segera menghubungi Anda untuk proses instalasi.
            </p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-green-900/30 p-4 rounded-lg text-left border border-green-500/30"
            >
              <h4 className="font-semibold text-green-300 mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Detail Pendaftaran:
              </h4>
              <div className="space-y-1 text-sm text-green-200">
                <p>Area: {selectedArea.name}</p>
                <p>
                  Paket: {selectedPackage.type} {selectedPackage.speed}MBPS
                </p>
                <p>Harga: Rp. {selectedPackage.price}/bulan</p>
                {coordinates && (
                  <p>
                    Koordinat: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                  </p>
                )}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <Card className="bg-slate-700 border-slate-600">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <CreditCard className="h-5 w-5 text-purple-400" />
          Daftar Billing
        </CardTitle>
        <p className="text-sm text-red-400">(tanda bintang wajib di isi)</p>
      </CardHeader>
      <CardContent>
        {/* Enhanced Package Summary */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/30"
        >
          <h4 className="font-semibold text-blue-300 mb-2 flex items-center">
            <Sparkles className="h-4 w-4 mr-2" />
            Paket yang Dipilih:
          </h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">
                {selectedArea.name} {selectedPackage.type} {selectedPackage.speed}MBPS
              </p>
              <p className="text-sm text-blue-300">Area: {selectedArea.name}</p>
              {coordinates && (
                <p className="text-xs text-blue-400">
                  Koordinat: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-400">Rp. {selectedPackage.price}</div>
              <div className="text-sm text-blue-300">/bulan</div>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <Label htmlFor="nama" className="text-gray-300">
                Nama *
              </Label>
              <Input
                id="nama"
                placeholder="tidak boleh kosong"
                value={formData.nama}
                onChange={(e) => handleInputChange("nama", e.target.value)}
                required
                className="bg-slate-600 border-slate-500 text-white placeholder:text-gray-400"
              />
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <Label htmlFor="nik" className="text-gray-300">
                NIK
              </Label>
              <Input
                id="nik"
                placeholder="boleh kosong"
                value={formData.nik}
                onChange={(e) => handleInputChange("nik", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white placeholder:text-gray-400"
              />
            </motion.div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <Label htmlFor="npwp" className="text-gray-300">
                NPWP
              </Label>
              <Input
                id="npwp"
                placeholder="boleh kosong"
                value={formData.npwp}
                onChange={(e) => handleInputChange("npwp", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white placeholder:text-gray-400"
              />
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <Label htmlFor="phone" className="text-gray-300">
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="boleh kosong"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white placeholder:text-gray-400"
              />
            </motion.div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="whatsapp" className="text-gray-300">
                Whatsapp *
              </Label>
              <Input
                id="whatsapp"
                placeholder="tidak boleh kosong"
                value={formData.whatsapp}
                onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                required
                className="bg-slate-600 border-slate-500 text-white placeholder:text-gray-400"
              />
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="boleh kosong"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-slate-600 border-slate-500 text-white placeholder:text-gray-400"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-2"
          >
            <Label htmlFor="alamat" className="text-gray-300">
              Alamat
            </Label>
            <Textarea
              id="alamat"
              placeholder="boleh kosong"
              value={formData.alamat}
              onChange={(e) => handleInputChange("alamat", e.target.value)}
              className="min-h-[100px] bg-slate-600 border-slate-500 text-white placeholder:text-gray-400"
            />
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-2"
            >
              <Label htmlFor="usernameLogin" className="text-gray-300">
                Username Login *
              </Label>
              <Input
                id="usernameLogin"
                placeholder="tidak boleh kosong"
                value={formData.usernameLogin}
                onChange={(e) => handleInputChange("usernameLogin", e.target.value)}
                required
                className="bg-slate-600 border-slate-500 text-white placeholder:text-gray-400"
              />
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="space-y-2"
            >
              <Label htmlFor="passwordLogin" className="text-gray-300">
                Password Login *
              </Label>
              <Input
                id="passwordLogin"
                type="password"
                placeholder="tidak boleh kosong"
                value={formData.passwordLogin}
                onChange={(e) => handleInputChange("passwordLogin", e.target.value)}
                required
                className="bg-slate-600 border-slate-500 text-white placeholder:text-gray-400"
              />
            </motion.div>
          </div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.0 }}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses Pendaftaran...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Daftar Sekarang
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}
