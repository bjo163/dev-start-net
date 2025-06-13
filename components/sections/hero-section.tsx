"use client"
import { useState, useEffect } from "react"
import { Gamepad2, Zap, Shield, Target, Cpu, Database } from "lucide-react"

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    setIsMounted(true)
    
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    
    updateTime() // Initial time
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const displayTime = isMounted ? currentTime : "00:00:00"
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 md:pt-32"
    >
      {/* HUD Background Grid - Now visible on mobile */}
      <div className="absolute inset-0 hud-grid opacity-10 md:opacity-20" />

      {/* Scan Lines Effect - Visible on mobile */}
      <div className="absolute inset-0 hud-scan-lines opacity-20 md:opacity-30" />

      {/* Main content */}
      <div className="container mx-auto px-4 text-center relative z-20 pt-4 md:pt-0">
        {/* HUD Header Panel - Mobile optimized */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="hud-panel hud-panel-active p-3 md:p-6 w-full max-w-sm md:max-w-md">
            {/* System Status */}
            <div className="hud-label mb-2 text-xs">[SYSTEM_STATUS]</div>
            <div className="flex items-center justify-center space-x-3 md:space-x-6 mb-3 md:mb-4">
              <div className="flex flex-col items-center">
                <Shield className="w-4 h-4 md:w-6 md:h-6 text-cyan-400 mb-1" />
                <span className="hud-terminal text-xs">SECURE</span>
              </div>
              <div className="flex flex-col items-center">
                <Gamepad2 className="w-5 h-5 md:w-8 md:h-8 hud-text-glow mb-1" />
                <span className="hud-terminal text-xs">ACTIVE</span>
              </div>
              <div className="flex flex-col items-center">
                <Zap className="w-4 h-4 md:w-6 md:h-6 text-cyan-400 mb-1" />
                <span className="hud-terminal text-xs">ONLINE</span>
              </div>
            </div>

            {/* System Info */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="hud-label">CPU</div>
                <div className="hud-value">23%</div>
              </div>
              <div className="text-center">
                <div className="hud-label">MEM</div>
                <div className="hud-value">67%</div>
              </div>
              <div className="text-center">
                <div className="hud-label">NET</div>
                <div className="hud-value hud-status-online">OPTIMAL</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Objective Display - Fixed text sizing */}
        <div className="relative mb-6 md:mb-8">
          <div className="hud-panel p-4 md:p-8 w-full max-w-6xl mx-auto">
            {/* Mission Header */}
            <div className="flex items-center justify-center mb-3 md:mb-4 overflow-hidden">
              <Target className="w-3 h-3 md:w-5 md:h-5 text-cyan-400 mr-2 flex-shrink-0" />
              <span className="hud-label text-xs break-all">[MISSION_OBJ_ALPHA]</span>
              <Target className="w-3 h-3 md:w-5 md:h-5 text-cyan-400 ml-2 flex-shrink-0" />
            </div>

            {/* Main Title - Fixed responsive sizing */}
            <h1 className="hud-font-display mb-3 md:mb-4">
              <span className="hud-text-glow block mb-1 md:mb-2 text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
                BUILD_YOUR_GAME
              </span>
              <span className="text-white block text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl">
                WORLD_OF_THE_FUTURE
              </span>
            </h1>

            {/* Status Indicator */}
            <div className="flex items-center justify-center mt-3 md:mt-4 overflow-hidden">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-400 rounded-full animate-pulse mr-2 flex-shrink-0"></div>
              <span className="hud-label hud-status-online text-xs break-all">[STATUS: READY]</span>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-400 rounded-full animate-pulse ml-2 flex-shrink-0"></div>
            </div>
          </div>
        </div>

        {/* System Description Terminal - Mobile optimized */}
        <div className="relative mb-8 md:mb-12">
          <div className="hud-panel p-3 md:p-6 w-full max-w-4xl mx-auto">
            <div className="flex items-center mb-3 md:mb-4 overflow-hidden">
              <Database className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 mr-2 flex-shrink-0" />
              <span className="hud-label text-xs break-all">[SYS_DESC]</span>
            </div>

            <div className="hud-font-primary text-left space-y-1 md:space-y-2">
              <div className="hud-terminal inline-block text-xs">&gt; INITIALIZING_GAME_DEV_PROTOCOL...</div>
              <p className="text-gray-300 text-xs md:text-base leading-relaxed">
                &gt; WE_CREATE_IMMERSIVE_GAMING_EXPERIENCES
                <br />
                &gt; WITH_CUTTING_EDGE_TECHNOLOGY_AND_INNOVATION
                <br />
                &gt; FROM_CONCEPT_TO_LAUNCH_DEPLOYMENT
                <br />
                &gt; START-G_IS_YOUR_TRUSTED_PARTNER
              </p>
              <div className="hud-terminal inline-block text-xs">&gt; PROTOCOL_LOADED_SUCCESSFULLY</div>
            </div>
          </div>
        </div>

        {/* Action Interface - Mobile optimized */}
        <div className="flex flex-col gap-3 md:gap-6 justify-center items-center mb-8 md:mb-16">
          <div className="relative group w-full max-w-xs">
            <div className="absolute -inset-1 bg-cyan-500/30 rounded blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <button className="hud-button relative w-full group">
              <span className="flex items-center justify-center text-sm">
                <Target className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                [SCAN_PORTFOLIO]
                <span className="ml-2 text-xs opacity-60 hidden md:inline">[F1]</span>
              </span>
            </button>
          </div>

          <div className="relative group w-full max-w-xs">
            <div className="absolute -inset-1 bg-cyan-500/30 rounded blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <button
              className="hud-button relative w-full group"
              onClick={() => window.open("https://portal.start-g.net/web/signup", "_blank")}
            >
              <span className="flex items-center justify-center text-sm">
                <Cpu className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                [INITIATE_PROJECT]
                <span className="ml-2 text-xs opacity-60 hidden md:inline">[F2]</span>
              </span>
            </button>
          </div>
        </div>

        {/* Statistics Display - Mobile optimized */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8 md:mb-12">
          {[
            { label: "GAMES_DEPLOYED", value: "50+", code: "A1", status: "OPERATIONAL" },
            { label: "TOTAL_DOWNLOADS", value: "100K+", code: "B2", status: "EXPANDING" },
            { label: "YEARS_ACTIVE", value: "5+", code: "C3", status: "STABLE" },
          ].map((stat, index) => (
            <div key={index} className="hud-panel p-4 md:p-6 group hover:hud-panel-active">
              {/* Header */}
              <div className="flex justify-between items-center mb-2 md:mb-3">
                <span className="hud-label text-xs">[{stat.code}]</span>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>

              {/* Value */}
              <div className="hud-font-display text-2xl md:text-3xl xl:text-4xl hud-text-glow mb-2">{stat.value}</div>

              {/* Label */}
              <div className="hud-label mb-2 text-xs">{stat.label}</div>

              {/* Status */}
              <div className="text-xs">
                <span className="hud-terminal">{stat.status}</span>
              </div>

              {/* Progress Bar */}
              <div className="hud-progress mt-3">
                <div className="hud-progress-fill" style={{ width: `${85 + index * 5}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* System Information Footer - Mobile optimized */}
        <div className="flex justify-center">
          <div className="hud-panel px-3 md:px-6 py-2 md:py-3 w-full max-w-4xl">
            <div className="hud-font-primary text-xs flex flex-wrap items-center justify-center gap-2 md:gap-4">
              <span className="hud-status-online">SYSTEM_TIME: {displayTime}</span>
              <span className="hidden sm:inline text-gray-500">|</span>
              <span className="hud-status-online">STATUS: OPERATIONAL</span>
              <span className="hidden sm:inline text-gray-500">|</span>
              <span className="hud-status-online">SECURITY: MAXIMUM</span>
              <span className="hidden lg:inline text-gray-500">|</span>
              <span className="hud-status-online">UPTIME: 99.9%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
