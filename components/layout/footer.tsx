"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Mail, MapPin, Phone, Terminal, Cpu, Database, Wifi } from "lucide-react"

export function Footer() {
  const [systemTime, setSystemTime] = useState<string>("")
  const [currentYear, setCurrentYear] = useState<string>("")
  const [consoleActive, setConsoleActive] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Set mounted state to avoid hydration issues
    setIsMounted(true)
    
    // Initialize time and year
    const updateTime = () => {
      setSystemTime(new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      }))
    }
    
    setCurrentYear(new Date().getFullYear().toString())
    updateTime()
    
    // Update time every second
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const services = [
    { name: "Mobile Games", status: "ACTIVE" },
    { name: "PC/Web Games", status: "ACTIVE" },
    { name: "VR/AR Development", status: "BETA" },
    { name: "2D/3D Assets", status: "ACTIVE" },
  ]

  const contactInfo = [
    { icon: Phone, label: "COMM_LINK", value: "+62 812-3456-7890" },
    { icon: Mail, label: "DATA_STREAM", value: "hello@start-g.com" },
    { icon: MapPin, label: "COORDINATES", value: "Jakarta, Indonesia" },
  ]

  return (
    <footer className="relative border-t-2 border-cyan-500/50 overflow-hidden">
      {/* HUD Grid Background */}
      <div className="absolute inset-0 hud-grid opacity-10" />

      {/* Scan Lines */}
      <div className="absolute inset-0 hud-scan-lines opacity-20" />

      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 w-6 h-6 md:w-8 md:h-8 border-l-2 border-t-2 border-cyan-500/60"></div>
      <div className="absolute top-4 right-4 w-6 h-6 md:w-8 md:h-8 border-r-2 border-t-2 border-cyan-500/60"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 md:w-8 md:h-8 border-l-2 border-b-2 border-cyan-500/60"></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 md:w-8 md:h-8 border-r-2 border-b-2 border-cyan-500/60"></div>

      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {/* Company Info Panel */}
          <div className="hud-panel p-4 md:p-6">
            <div className="flex items-center mb-4">
              <Terminal className="w-4 h-4 text-cyan-400 mr-2" />
              <span className="hud-label">[COMPANY_INFO]</span>
            </div>

            <div className="relative mb-6">
              <div className="absolute -inset-1 bg-cyan-500/20 rounded blur animate-pulse"></div>
              <Image
                src="/logo-start-g.png"
                alt="Start-G Logo"
                width={160}
                height={50}
                className="h-6 md:h-8 w-auto relative z-10"
              />
            </div>

            <div className="hud-font-primary text-xs md:text-sm text-gray-300 mb-6 leading-relaxed">
              <span className="hud-terminal">&gt;</span> Start-G is a game development studio
              <br />
              <span className="hud-terminal">&gt;</span> focused on innovation and quality. We
              <br />
              <span className="hud-terminal">&gt;</span> create memorable gaming experiences
              <br />
              <span className="hud-terminal">&gt;</span> for all platforms.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="hud-label text-xs">SOCIAL_LINKS:</span>
              <Link href="#" className="hud-panel p-2 hover:hud-panel-active transition-all duration-300 group">
                <MessageCircle className="w-4 h-4 text-cyan-400 group-hover:hud-text-glow" />
              </Link>
              <Link href="#" className="hud-panel p-2 hover:hud-panel-active transition-all duration-300 group">
                <Mail className="w-4 h-4 text-cyan-400 group-hover:hud-text-glow" />
              </Link>
            </div>
          </div>

          {/* Services Panel */}
          <div className="hud-panel p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Database className="w-4 h-4 text-cyan-400 mr-2" />
                <span className="hud-label">[SERVICES]</span>
              </div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>

            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Link
                    href="#"
                    className="hud-font-primary text-xs md:text-sm text-gray-300 hover:text-cyan-400 hover:hud-text-glow transition-all duration-300"
                  >
                    <span className="hud-terminal text-xs mr-2">&gt;</span>
                    {service.name}
                  </Link>
                  <span
                    className={`hud-font-primary text-xs px-2 py-1 rounded ${
                      service.status === "ACTIVE"
                        ? "hud-status-online bg-cyan-500/10 border border-cyan-500/30"
                        : "hud-status-warning bg-orange-500/10 border border-orange-500/30"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Service Status */}
            <div className="mt-6 pt-4 border-t border-cyan-500/20">
              <div className="flex items-center justify-between text-xs">
                <span className="hud-label">SERVICE_STATUS:</span>
                <span className="hud-status-online">ALL_SYSTEMS_OPERATIONAL</span>
              </div>
            </div>
          </div>

          {/* Contact Panel */}
          <div className="hud-panel p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Wifi className="w-4 h-4 text-cyan-400 mr-2" />
                <span className="hud-label">[CONTACT]</span>
              </div>
              <div className="hud-font-primary text-xs text-cyan-400">ONLINE</div>
            </div>

            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="hud-panel p-2 mt-0.5">
                    <contact.icon className="w-3 h-3 text-cyan-400" />
                  </div>
                  <div>
                    <div className="hud-label text-xs mb-1">{contact.label}:</div>
                    <div className="hud-font-primary text-xs md:text-sm text-cyan-400 hud-text-glow">
                      {contact.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Connection Status */}
            <div className="mt-6 pt-4 border-t border-cyan-500/20">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="hud-label">PING:</div>
                  <div className="hud-value">12ms</div>
                </div>
                <div>
                  <div className="hud-label">UPTIME:</div>
                  <div className="hud-value">99.9%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="hud-panel p-3 md:p-4 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span className="hud-label">CPU_LOAD:</span>
              <span className="hud-value">23%</span>
              <div className="hidden md:block hud-progress flex-1 ml-2">
                <div className="hud-progress-fill" style={{ width: "23%" }}></div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Database className="w-3 h-3 text-cyan-400" />
              <span className="hud-label">MEM_USAGE:</span>
              <span className="hud-value">67%</span>
              <div className="hidden md:block hud-progress flex-1 ml-2">
                <div className="hud-progress-fill" style={{ width: "67%" }}></div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Wifi className="w-3 h-3 text-cyan-400" />
              <span className="hud-label">NETWORK:</span>
              <span className="hud-status-online">OPTIMAL</span>
            </div>

            <div className="flex items-center space-x-2">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span className="hud-label">SYSTEM_TIME:</span>
              <span className="hud-value">{isMounted ? systemTime : "--:--:--"}</span>
            </div>
          </div>
        </div>

        {/* Copyright & Console */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => setConsoleActive(!consoleActive)}
          >
            <div className="hud-panel p-2 group-hover:hud-panel-active">
              <Terminal className="w-4 h-4 text-cyan-400 group-hover:hud-text-glow" />
            </div>
            <span className="hud-font-primary text-xs text-cyan-400 group-hover:hud-text-glow">
              Console {consoleActive ? "[ACTIVE]" : "[INACTIVE]"}
            </span>
          </div>

          <div className="text-center">
            <div className="hud-font-primary text-xs md:text-sm text-gray-400">
              <span className="hud-terminal">&copy;</span> {isMounted ? currentYear : "2024"} Start-G. All rights reserved.
              <span className="text-red-500 mx-2">❤️</span>
              Made with <span className="hud-status-online">PASSION</span> for gamers.
            </div>
          </div>

          <div className="hud-panel p-2">
            <div className="hud-font-primary text-xs text-cyan-400">BUILD_20241201</div>
          </div>
        </div>
      </div>

      {/* Console Panel (Expandable) */}
      {consoleActive && (
        <div className="absolute bottom-0 left-0 right-0 hud-panel border-t-2 border-cyan-500 p-4 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="hud-label">[DEVELOPER_CONSOLE]</span>
            <button
              onClick={() => setConsoleActive(false)}
              className="hud-font-primary text-xs text-cyan-400 hover:text-red-400"
            >
              [CLOSE]
            </button>
          </div>
          <div className="hud-font-primary text-xs text-green-400 space-y-1">
            <div>&gt; System initialized successfully</div>
            <div>&gt; All modules loaded</div>
            <div>&gt; Ready for input...</div>
            <div className="flex items-center">
              <span>&gt; </span>
              <span className="animate-terminal-blink">█</span>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
