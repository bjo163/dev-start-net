"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2 } from "lucide-react"
import { WhatsappButton } from "@/components/whatsapp-button"
import { PageWrapper } from "@/components/shared/page-wrapper"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulasi pengiriman form
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })

      // Reset status setelah beberapa detik
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
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
                  Hubungi Kami
                </h1>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Kami siap membantu Anda dengan segala pertanyaan seputar layanan MyCocoLink
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter text-white">Kirim Pesan</h2>
                <p className="text-gray-300">Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="text-white">
                        Nama Lengkap
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Masukkan nama lengkap Anda"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Masukkan email Anda"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="phone" className="text-white">
                        Nomor Telepon
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Masukkan nomor telepon Anda"
                        value={formState.phone}
                        onChange={handleChange}
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="subject" className="text-white">
                        Subjek
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Masukkan subjek pesan"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message" className="text-white">
                      Pesan
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Masukkan pesan Anda"
                      value={formState.message}
                      onChange={handleChange}
                      className="min-h-[150px] bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      "Kirim Pesan"
                    )}
                  </Button>
                  {isSubmitted && (
                    <div className="flex items-center p-4 text-green-400 bg-green-900/20 rounded-md border border-green-800">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <p>Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.</p>
                    </div>
                  )}
                </form>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter text-white">Informasi Kontak</h2>
                <p className="text-gray-300">Anda juga dapat menghubungi kami melalui informasi kontak di bawah ini.</p>
                <div className="grid gap-4">
                  <Card className="bg-slate-700 border-slate-600">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-900 p-2 rounded-full mt-1">
                          <MapPin className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">Kantor Pusat</h3>
                          <p className="text-gray-300">Jl. Teknologi No. 123, Jakarta Selatan, Indonesia</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-700 border-slate-600">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-900 p-2 rounded-full mt-1">
                          <Phone className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">Telepon</h3>
                          <p className="text-gray-300">0800-1234-5678 (Bebas Pulsa)</p>
                          <p className="text-gray-300">021-123-4567 (Kantor)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-700 border-slate-600">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-900 p-2 rounded-full mt-1">
                          <Mail className="h-5 w-5 text-red-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">Email</h3>
                          <p className="text-gray-300">info@mycocolink.id</p>
                          <p className="text-gray-300">support@mycocolink.id (Dukungan Teknis)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-700 border-slate-600">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-900 p-2 rounded-full mt-1">
                          <Clock className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">Jam Operasional</h3>
                          <p className="text-gray-300">Senin - Jumat: 08.00 - 17.00 WIB</p>
                          <p className="text-gray-300">Sabtu: 09.00 - 15.00 WIB</p>
                          <p className="text-gray-300">Dukungan Teknis: 24/7</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="mt-6">
                  <h3 className="font-bold mb-2 text-white">Hubungi Kami via WhatsApp</h3>
                  <WhatsappButton />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Kantor Cabang
                </h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Temukan kantor cabang MyCocoLink terdekat di kota Anda
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Jakarta Selatan</CardTitle>
                  <CardDescription className="text-gray-400">Kantor Pusat</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Jl. Teknologi No. 123, Jakarta Selatan, Indonesia</p>
                  <p className="text-gray-300 mt-2">Telepon: 021-123-4567</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Bandung</CardTitle>
                  <CardDescription className="text-gray-400">Kantor Cabang</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Jl. Merdeka No. 45, Bandung, Jawa Barat</p>
                  <p className="text-gray-300 mt-2">Telepon: 022-765-4321</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Tangerang</CardTitle>
                  <CardDescription className="text-gray-400">Kantor Cabang</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Jl. Raya Serpong No. 88, Tangerang Selatan, Banten</p>
                  <p className="text-gray-300 mt-2">Telepon: 021-987-6543</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </PageWrapper>
    </div>
  )
}
