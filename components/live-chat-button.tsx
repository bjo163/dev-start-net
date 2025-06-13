"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { getSessionId, sendChatMessage, type ChatMessage } from "@/lib/chat-utils"

export function LiveChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // Helper function to get current time string
  const getCurrentTimeString = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  useEffect(() => {
    // Set mounted state to avoid hydration issues
    setIsMounted(true)
    
    // Initialize messages after mounting to avoid hydration issues
    const initialMessage: ChatMessage = {
      id: '1',
      text: "🎮 Selamat datang di Start-G Live Support! Tim kami siap membantu Anda dengan layanan game development dan hosting server. Ada yang bisa kami bantu?",
      isUser: false,
      time: getCurrentTimeString(),
    }
    setMessages([initialMessage])
    
    // Get session ID when component mounts
    const getSessionInfo = async () => {
      // Wait for session initialization
      setTimeout(async () => {
        try {
          const id = await getSessionId()
          setSessionId(id)
          
          // Add debug info to first message
          if (id) {
            // Add system message with session info
            const systemMessage: ChatMessage = {
              id: 'debug-session',
              text: `✅ Sesi berhasil dibuat dengan ID: ${id.substring(0, 8)}. Koneksi aman aktif, tim support siap membantu!`,
              isUser: false,
              time: getCurrentTimeString()
            }
            
            setMessages(prev => [...prev, systemMessage])
          }
        } catch {
          // Session creation failed, continue without session ID
        }
      }, 2000)
    }
    getSessionInfo()
  }, [])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() || isLoading) return

    const currentTime = getCurrentTimeString()
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      time: currentTime
    }

    // Add user message immediately
    setMessages(prev => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)

    try {
      // Send message to API
      const response = await sendChatMessage(message)
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.content,
        isUser: false,
        time: getCurrentTimeString()
      }

      setMessages(prev => [...prev, botMessage])
    } catch {
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "⚠️ Maaf, terjadi kesalahan koneksi. Tim teknis kami akan segera memperbaikinya. Silakan coba lagi atau hubungi kami via WhatsApp.",
        isUser: false,
        time: getCurrentTimeString()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isMounted && (
        <>
          {/* HUD-styled Live Chat Button */}
          <button
            onClick={toggleChat}
            className="live-chat-button fixed bottom-6 right-6 hud-button h-12 w-12 p-0 group"
            style={{ 
              zIndex: 2147483647,
              isolation: 'isolate',
              position: 'fixed',
              transform: 'translateZ(0)',
              willChange: 'transform',
              borderRadius: '4px'
            }}
          >
            <div className="flex flex-col items-center justify-center">
              {isOpen ? (
                <X className="h-4 w-4 text-cyan-400 group-hover:text-white transition-colors" />
              ) : (
                <MessageCircle className="h-4 w-4 text-cyan-400 group-hover:text-white transition-colors" />
              )}
              <span className="hud-label text-xs mt-0.5">
                {isOpen ? "[CLOSE]" : "[CHAT]"}
              </span>
            </div>
            <span className="sr-only">{isOpen ? "Tutup chat" : "Buka chat"}</span>
          </button>

          {/* HUD-styled Live Chat Widget */}
          {isOpen && (
            <div 
              className="live-chat-widget fixed bottom-20 right-6 w-72 sm:w-80 hud-panel hud-panel-active"
              style={{ 
                zIndex: 2147483647,
                isolation: 'isolate',
                position: 'fixed',
                transform: 'translateZ(0)',
                willChange: 'transform'
              }}
            >
              {/* Scan Lines Effect */}
              <div className="hud-scan-lines absolute inset-0 pointer-events-none"></div>
              
              {/* HUD Header */}
              <div className="bg-black border-b-2 border-cyan-400/30 p-3 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-3 w-3 text-cyan-400" />
                    <span className="hud-font-title text-xs text-cyan-400">[LIVE_SUPPORT]</span>
                  </div>
                  {sessionId && (
                    <div className="flex items-center space-x-1">
                      <span className="hud-label text-xs">SESSION:</span>
                      <span className="hud-terminal text-xs">
                        {sessionId.substring(0, 6)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-1.5 flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="hud-status-online text-xs">ONLINE</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="hud-label text-xs">STATUS:</span>
                    <span className="hud-status-online text-xs">READY</span>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="h-64 overflow-y-auto p-3 space-y-2 bg-black/90 relative">
                {messages.map((msg) => (
                  <div key={msg.id} className={`message-item flex flex-col ${msg.isUser ? "items-end" : "items-start"}`}>
                    <div
                      className={`relative p-2 max-w-[85%] ${
                        msg.isUser 
                          ? "bg-cyan-400/20 border border-cyan-400/50 text-cyan-100" 
                          : "bg-black/80 border border-green-400/50 text-green-100"
                      }`}
                      style={{ borderRadius: '4px' }}
                    >
                      {!msg.isUser && (
                        <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                      <p className="text-xs leading-relaxed font-mono" style={{ textTransform: 'none' }}>{msg.text}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="hud-label text-xs">[{msg.time}]</span>
                      {msg.isUser && <span className="hud-label text-xs">[USER]</span>}
                      {!msg.isUser && <span className="hud-label text-xs">[AGENT]</span>}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex items-start">
                    <div className="typing-indicator bg-black/80 border border-green-400/50 text-green-100 p-2 max-w-[85%] relative" style={{ borderRadius: '4px' }}>
                      <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-3 w-3 animate-spin text-green-400" />
                        <p className="text-xs font-mono" style={{ textTransform: 'none' }}>Agent sedang mengetik...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* HUD Input Area */}
              <div className="p-2.5 bg-black border-t-2 border-cyan-400/30 relative">
                <div className="hud-label text-xs mb-1.5">[MESSAGE_INPUT]</div>
                <form onSubmit={handleSendMessage} className="flex gap-1.5">
                  <input
                    placeholder="Ketik pesan Anda..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-black/80 border border-cyan-400/50 text-cyan-100 font-mono text-xs py-1.5 px-2 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                    style={{ 
                      borderRadius: '4px',
                      textTransform: 'none'
                    }}
                    disabled={isLoading}
                  />
                  <button 
                    type="submit" 
                    className="hud-button px-2 py-1.5 min-w-[50px]"
                    disabled={isLoading || !message.trim()}
                  >
                    {isLoading ? (
                      <Loader2 className="h-3 w-3 animate-spin mx-auto" />
                    ) : (
                      <div className="flex items-center space-x-1">
                        <Send className="h-3 w-3" />
                        <span className="hud-label text-xs">[SEND]</span>
                      </div>
                    )}
                  </button>
                </form>
                
                {/* System Info */}
                <div className="mt-1.5 flex items-center justify-between text-xs">
                  <span className="hud-label">ENCRYPTION: ACTIVE</span>
                  <span className="hud-status-online">SECURE_CHANNEL</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
