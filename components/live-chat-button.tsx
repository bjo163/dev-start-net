"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

export function LiveChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chatStarted, setChatStarted] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; time: string }[]>([
    {
      text: "Selamat datang di Live Chat MyCocoLink! Ada yang bisa kami bantu?",
      isUser: false,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    // Tambahkan pesan pengguna
    const newMessages = [...messages, { text: message, isUser: true, time: currentTime }]

    setMessages(newMessages)
    setMessage("")
    setChatStarted(true)

    // Simulasi respons dari agen (setelah jeda singkat)
    setTimeout(() => {
      const responseTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      // Respons otomatis sederhana
      let response =
        "Terima kasih atas pesan Anda. Tim kami akan segera menghubungi Anda. Apakah ada hal lain yang ingin Anda tanyakan?"

      if (message.toLowerCase().includes("paket")) {
        response =
          "Kami memiliki berbagai paket internet untuk rumah dan bisnis. Silakan kunjungi halaman Layanan kami untuk informasi lebih detail, atau beri tahu kami kebutuhan spesifik Anda."
      } else if (message.toLowerCase().includes("harga")) {
        response =
          "Harga paket kami mulai dari Rp299.000/bulan untuk paket rumah dan Rp499.000/bulan untuk paket bisnis. Untuk penawaran khusus, silakan hubungi tim sales kami."
      } else if (message.toLowerCase().includes("gangguan") || message.toLowerCase().includes("masalah")) {
        response =
          "Mohon maaf atas ketidaknyamanannya. Bisakah Anda memberikan detail lebih lanjut tentang masalah yang Anda alami? Tim teknis kami akan segera membantu Anda."
      }

      setMessages([...newMessages, { text: response, isUser: false, time: responseTime }])
    }, 1000)
  }

  return (
    <>
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 h-14 w-14 p-0"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        <span className="sr-only">{isOpen ? "Tutup chat" : "Buka chat"}</span>
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 sm:w-96 shadow-xl border-2 z-50">
          <CardHeader className="bg-blue-600 text-white p-4">
            <CardTitle className="text-lg">Live Chat Support</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex flex-col ${msg.isUser ? "items-end" : "items-start"}`}>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      msg.isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{msg.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-2">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                placeholder="Ketik pesan Anda..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
                <span className="sr-only">Kirim</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
