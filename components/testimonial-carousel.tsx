"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Testimonial = {
  id: number
  name: string
  location: string
  package: string
  avatar: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Budi Santoso",
    location: "Jakarta Selatan",
    package: "Paket Rumah 30 Mbps",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Saya sudah berlangganan MyCocoLink selama 2 tahun dan sangat puas dengan kecepatan dan stabilitas koneksinya. Layanan pelanggan juga sangat responsif ketika ada kendala.",
  },
  {
    id: 2,
    name: "Siti Rahayu",
    location: "Depok",
    package: "Paket Bisnis 50 Mbps",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    text: "Bisnis kafe saya sangat terbantu dengan koneksi internet yang stabil dari MyCocoLink. Pelanggan saya bisa bekerja dengan nyaman menggunakan WiFi kami.",
  },
  {
    id: 3,
    name: "Ahmad Hidayat",
    location: "Tangerang",
    package: "Paket Komunitas",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Perumahan kami menggunakan layanan MyCocoLink untuk seluruh penghuni. Harga yang ditawarkan sangat kompetitif dengan kualitas yang sangat baik.",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    location: "Jakarta Timur",
    package: "Paket Rumah 20 Mbps",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    text: "Sebagai content creator, saya membutuhkan koneksi yang stabil untuk upload video. MyCocoLink tidak pernah mengecewakan saya selama ini.",
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const maxIndex = testimonials.length - 1

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === maxIndex ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, maxIndex])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === maxIndex ? 0 : prev + 1))
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{testimonial.package}</p>
                    </div>
                  </div>
                  <p className="italic">&ldquo;{testimonial.text}&rdquo;</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6 gap-2">
        <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${index === current ? "bg-primary" : "bg-gray-300"} transition-colors`}
              onClick={() => {
                setAutoplay(false)
                setCurrent(index)
              }}
            >
              <span className="sr-only">Testimonial {index + 1}</span>
            </button>
          ))}
        </div>
        <Button variant="outline" size="icon" onClick={next} className="rounded-full">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}
