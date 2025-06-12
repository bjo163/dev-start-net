"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Power, Wifi, Shield } from "lucide-react"
import { PrimaryButton } from "../shared/primary-button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "HOME", href: "#hero", code: "01" },
    { name: "ABOUT", href: "#about", code: "02" },
    { name: "SERVICES", href: "#services", code: "03" },
    { name: "PORTFOLIO", href: "#portfolio", code: "04" },
    { name: "SHOP", href: "#shop", code: "05" },
    { name: "CONTACT", href: "#contact", code: "06" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md border-b-2 border-cyan-500/30 z-50">
      <div className="container mx-auto px-4">
        {/* HUD Status Bar */}
        <div className="flex justify-between items-center py-2 border-b border-cyan-500/20">
          <div className="flex items-center space-x-3 md:space-x-6 hud-font-primary text-xs">
            <div className="flex items-center space-x-2">
              <Shield className="w-3 h-3 text-cyan-400" />
              <span className="hud-status-online">SECURE</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="w-3 h-3 text-cyan-400" />
              <span className="hud-status-online">CONNECTED</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <span className="hud-label">PING:</span>
              <span className="hud-value text-xs">12ms</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 hud-font-primary text-xs">
            <div className="hidden md:block">
              <span className="hud-label">SYSTEM_TIME:</span>
              <span className="hud-value text-xs ml-2">{new Date().toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Power className="w-3 h-3 text-cyan-400" />
              <span className="hud-status-online">READY</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with HUD Enhancement */}
          <Link href="/" className="flex items-center space-x-3 md:space-x-4">
            <div className="relative">
              <div className="absolute -inset-2 bg-cyan-500/20 rounded-lg blur animate-pulse"></div>
              <div className="relative hud-panel p-2">
                <Image
                  src="/logo-start-g.png"
                  alt="Start-G Logo"
                  width={140}
                  height={40}
                  className="h-8 md:h-12 w-auto"
                />
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="hud-label">GAME_DEV_STUDIO</div>
              <div className="hud-font-primary text-xs text-cyan-300">VERSION_2.1.0</div>
              <div className="hud-font-primary text-xs text-cyan-500 opacity-60">BUILD_20241201</div>
            </div>
          </Link>

          {/* Navigation with HUD Style */}
          <div className="hidden md:flex items-center space-x-1 md:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative hud-panel px-3 py-2 md:px-4 md:py-3 hover:hud-panel-active transition-all duration-300"
              >
                <div className="hud-label text-xs opacity-60">[{item.code}]</div>
                <div className="hud-font-primary text-xs md:text-sm text-cyan-300 group-hover:hud-text-glow">
                  {item.name}
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Action Panel */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="hud-panel p-3 text-right">
              <div className="hud-label text-xs">USER_ACCESS</div>
              <div className="hud-font-primary text-xs text-cyan-300">LEVEL: GUEST</div>
              <div className="hud-font-primary text-xs text-cyan-500 opacity-60">CLEARANCE: PUBLIC</div>
            </div>

            <PrimaryButton
              variant="outline"
              size="sm"
              onClick={() => window.open("https://portal.start-g.net/web/login", "_blank")}
            >
              [LOGIN]
            </PrimaryButton>

            <PrimaryButton size="sm" onClick={() => window.open("https://portal.start-g.net/web/signup", "_blank")}>
              [START_PROJECT]
            </PrimaryButton>
          </div>

          {/* Mobile HUD Menu */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden hud-panel p-2">
            {isOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-cyan-400" />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {isOpen && (
          <div className="md:hidden hud-panel p-4 mb-4">
            <div className="hud-label mb-4">[NAVIGATION_MENU]</div>
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block hud-font-primary text-cyan-300 hover:hud-text-glow transition-colors border-l-2 border-transparent hover:border-cyan-400 pl-3"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="hud-label text-xs">[{item.code}]</span> {item.name}
                </Link>
              ))}

              <div className="border-t border-cyan-500/20 pt-4 space-y-3">
                <PrimaryButton
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("https://portal.start-g.net/web/login", "_blank")}
                  className="w-full"
                >
                  [LOGIN]
                </PrimaryButton>
                <PrimaryButton
                  size="sm"
                  onClick={() => window.open("https://portal.start-g.net/web/signup", "_blank")}
                  className="w-full"
                >
                  [START_PROJECT]
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
