"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

// Network Illustration Component
export function NetworkIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] ${className}`}>
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background Elements */}
        <circle cx="200" cy="150" r="120" fill="url(#networkGradient)" fillOpacity="0.1" />
        <circle cx="200" cy="150" r="80" fill="url(#networkGradient)" fillOpacity="0.15" />

        {/* Connection Lines */}
        {[
          { x1: 200, y1: 150, x2: 120, y2: 100 },
          { x1: 200, y1: 150, x2: 280, y2: 100 },
          { x1: 200, y1: 150, x2: 120, y2: 200 },
          { x1: 200, y1: 150, x2: 280, y2: 200 },
          { x1: 120, y1: 100, x2: 120, y2: 200 },
          { x1: 280, y1: 100, x2: 280, y2: 200 },
          { x1: 120, y1: 100, x2: 280, y2: 100 },
          { x1: 120, y1: 200, x2: 280, y2: 200 },
        ].map((line, index) => (
          <g key={index} className="animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}>
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="animate-dash"
            />
          </g>
        ))}

        {/* Network Nodes */}
        {[
          { cx: 200, cy: 150, r: 15, color: "#3B82F6" },
          { cx: 120, cy: 100, r: 10, color: "#8B5CF6" },
          { cx: 280, cy: 100, r: 10, color: "#8B5CF6" },
          { cx: 120, cy: 200, r: 10, color: "#8B5CF6" },
          { cx: 280, cy: 200, r: 10, color: "#8B5CF6" },
        ].map((node, index) => (
          <g key={index} className="animate-pulse" style={{ animationDelay: `${index * 0.3}s` }}>
            <circle cx={node.cx} cy={node.cy} r={node.r + 5} fill={node.color} fillOpacity="0.2" />
            <circle cx={node.cx} cy={node.cy} r={node.r} fill={node.color} />
            <circle cx={node.cx} cy={node.cy} r={node.r - 5} fill="white" fillOpacity="0.3" />
          </g>
        ))}

        {/* Data Packets */}
        {[
          { path: "M200,150 L120,100", delay: 0 },
          { path: "M200,150 L280,100", delay: 1 },
          { path: "M200,150 L120,200", delay: 2 },
          { path: "M200,150 L280,200", delay: 3 },
        ].map((packet, index) => (
          <circle
            key={index}
            r="3"
            fill="#10B981"
            className="animate-packet"
            style={{ animationDelay: `${packet.delay}s` }}
          >
            <animateMotion
              path={packet.path}
              dur="3s"
              repeatCount="indefinite"
              rotate="auto"
              begin={`${packet.delay}s`}
            />
          </circle>
        ))}

        {/* Gradients */}
        <defs>
          <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Speed Test Illustration
export function SpeedTestIllustration({ className = "" }: { className?: string }) {
  const [speed, setSpeed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => {
        if (prev >= 100) return 0
        return prev + 1
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative w-full h-full min-h-[300px] ${className}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background Circle */}
            <circle cx="50" cy="50" r="45" fill="transparent" stroke="#E5E7EB" strokeWidth="8" />

            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="url(#speedGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45 * (speed / 100)} ${2 * Math.PI * 45}`}
              transform="rotate(-90 50 50)"
            />

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Speed Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {speed}
            </div>
            <div className="text-sm text-gray-500">Mbps</div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ultra-Fast Fiber
          </div>
          <div className="text-sm text-gray-500">Kecepatan stabil hingga 1 Gbps</div>
        </div>
      </div>
    </div>
  )
}

// Server Rack Illustration
export function ServerRackIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] ${className}`}>
      <svg
        viewBox="0 0 200 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Server Rack Cabinet */}
        <rect x="50" y="50" width="100" height="200" rx="5" fill="#1F2937" />
        <rect x="55" y="55" width="90" height="190" rx="3" fill="#111827" />

        {/* Server Units */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <g key={i}>
            <rect
              x="60"
              y={65 + i * 22}
              width="80"
              height="18"
              rx="2"
              fill="#374151"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
            <circle
              cx="70"
              cy={74 + i * 22}
              r="3"
              fill="#10B981"
              className="animate-ping"
              style={{ animationDelay: `${i * 0.3 + 1}s` }}
            />
            <circle
              cx="80"
              cy={74 + i * 22}
              r="3"
              fill="#3B82F6"
              className="animate-ping"
              style={{ animationDelay: `${i * 0.3 + 0.5}s` }}
            />
            <rect x="90" y={70 + i * 22} width="40" height="2" rx="1" fill="#6B7280" />
            <rect x="90" y={74 + i * 22} width="30" height="2" rx="1" fill="#6B7280" />
            <rect x="90" y={78 + i * 22} width="35" height="2" rx="1" fill="#6B7280" />
          </g>
        ))}

        {/* Network Cables */}
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M140,${74 + i * 44} C170,${74 + i * 44} 170,${96 + i * 44} 140,${96 + i * 44}`}
            stroke={i % 2 === 0 ? "#3B82F6" : "#8B5CF6"}
            strokeWidth="2"
            fill="transparent"
          />
        ))}

        {/* Data Flow Animation */}
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} r="2" fill="white" opacity="0.8">
            <animateMotion
              path={`M140,${74 + i * 44} C170,${74 + i * 44} 170,${96 + i * 44} 140,${96 + i * 44}`}
              dur="3s"
              repeatCount="indefinite"
              rotate="auto"
              begin={`${i * 0.5}s`}
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}

// Wifi Signal Illustration
export function WifiSignalIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] flex items-center justify-center ${className}`}>
      <div className="relative w-64 h-64">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`absolute rounded-full border-4 border-blue-500 opacity-20 animate-ping`}
            style={{
              width: `${i * 25}%`,
              height: `${i * 25}%`,
              left: `${50 - (i * 25) / 2}%`,
              top: `${50 - (i * 25) / 2}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: "3s",
            }}
          ></div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

// Ganti CubeAnimation dengan HolographicDisplay yang lebih ringan
export function HolographicDisplay({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] flex items-center justify-center ${className}`}>
      <div className="relative w-64 h-64">
        {/* Holographic Base */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-pulse"></div>
        <div
          className="absolute inset-4 rounded-full border border-purple-500/20 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute inset-8 rounded-full border border-blue-500/20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Holographic Grid */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-30">
          {/* Vertical Lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`v-${i}`}
              x1={40 + i * 30}
              y1="40"
              x2={40 + i * 30}
              y2="160"
              stroke="url(#holoGradient)"
              strokeWidth="1"
              strokeDasharray="2,2"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
          {/* Horizontal Lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`h-${i}`}
              x1="40"
              y1={40 + i * 30}
              x2="160"
              y2={40 + i * 30}
              stroke="url(#holoGradient)"
              strokeWidth="1"
              strokeDasharray="2,2"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2 + 0.1}s` }}
            />
          ))}

          {/* Center Hologram */}
          <circle
            cx="100"
            cy="100"
            r="20"
            fill="none"
            stroke="url(#holoGradient)"
            strokeWidth="2"
            className="animate-pulse"
          />
          <circle
            cx="100"
            cy="100"
            r="15"
            fill="url(#holoGradient)"
            fillOpacity="0.1"
            className="animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />

          {/* Floating Data Points */}
          {[
            { cx: 70, cy: 70, r: 3 },
            { cx: 130, cy: 70, r: 3 },
            { cx: 70, cy: 130, r: 3 },
            { cx: 130, cy: 130, r: 3 },
          ].map((point, index) => (
            <circle
              key={index}
              cx={point.cx}
              cy={point.cy}
              r={point.r}
              fill="#3B82F6"
              className="animate-ping"
              style={{ animationDelay: `${index * 0.3}s`, animationDuration: "2s" }}
            />
          ))}

          <defs>
            <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-500/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

// Data Visualization Chart
export function DataVisualizationChart({ className = "" }: { className?: string }) {
  const chartData = [25, 40, 30, 50, 65, 45, 70, 60, 75, 55, 80, 90]
  const maxValue = Math.max(...chartData)

  return (
    <div className={`w-full h-full min-h-[300px] flex flex-col ${className}`}>
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Performa Jaringan
        </h3>
        <p className="text-sm text-gray-500">Monitoring real-time 24/7</p>
      </div>

      <div className="flex-1 flex items-end space-x-2">
        {chartData.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(value / maxValue) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-md relative group"
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {value}ms
              </div>
            </motion.div>
            <div className="text-xs text-gray-400 mt-1">{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Radar Animation
export function RadarAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64">
          {/* Radar Circles */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border border-blue-500/30"
              style={{
                width: `${i * 25}%`,
                height: `${i * 25}%`,
                left: `${50 - (i * 25) / 2}%`,
                top: `${50 - (i * 25) / 2}%`,
              }}
            ></div>
          ))}

          {/* Radar Lines */}
          {[0, 45, 90, 135].map((angle) => (
            <div
              key={angle}
              className="absolute top-1/2 left-1/2 w-1/2 h-px bg-blue-500/30 origin-left"
              style={{ transform: `rotate(${angle}deg)` }}
            ></div>
          ))}

          {/* Radar Sweep */}
          <div className="absolute top-1/2 left-1/2 w-1/2 h-px bg-gradient-to-r from-blue-500 to-transparent origin-left animate-radar-sweep"></div>

          {/* Signal Dots */}
          {[
            { x: 70, y: 30, size: 3 },
            { x: 40, y: 60, size: 4 },
            { x: 80, y: 70, size: 3 },
            { x: 30, y: 40, size: 5 },
            { x: 60, y: 80, size: 4 },
          ].map((dot, index) => (
            <div
              key={index}
              className="absolute rounded-full bg-blue-500 animate-ping"
              style={{
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                animationDelay: `${index * 0.5}s`,
                animationDuration: "3s",
              }}
            ></div>
          ))}

          {/* Center Point */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  )
}

// Digital Circuit Board
export function CircuitBoardIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] ${className}`}>
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="300" fill="#111827" fillOpacity="0.05" />

        {/* Circuit Lines */}
        <path
          d="M50,50 L150,50 L150,100 L200,100 L200,150 L250,150 L250,200 L350,200"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-dash"
        />
        <path
          d="M50,100 L100,100 L100,200 L200,200 L200,250 L350,250"
          stroke="#8B5CF6"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-dash"
          style={{ animationDelay: "1s" }}
        />
        <path
          d="M50,150 L100,150 L100,50 L250,50 L250,100 L350,100"
          stroke="#10B981"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-dash"
          style={{ animationDelay: "2s" }}
        />
        <path
          d="M50,200 L75,200 L75,250 L150,250 L150,150 L300,150 L300,50 L350,50"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-dash"
          style={{ animationDelay: "3s" }}
        />

        {/* Circuit Nodes */}
        {[
          { x: 50, y: 50 },
          { x: 150, y: 50 },
          { x: 150, y: 100 },
          { x: 200, y: 100 },
          { x: 200, y: 150 },
          { x: 250, y: 150 },
          { x: 250, y: 200 },
          { x: 350, y: 200 },
          { x: 50, y: 100 },
          { x: 100, y: 100 },
          { x: 100, y: 200 },
          { x: 200, y: 200 },
          { x: 200, y: 250 },
          { x: 350, y: 250 },
          { x: 50, y: 150 },
          { x: 100, y: 150 },
          { x: 100, y: 50 },
          { x: 250, y: 50 },
          { x: 250, y: 100 },
          { x: 350, y: 100 },
          { x: 50, y: 200 },
          { x: 75, y: 200 },
          { x: 75, y: 250 },
          { x: 150, y: 250 },
          { x: 150, y: 150 },
          { x: 300, y: 150 },
          { x: 300, y: 50 },
          { x: 350, y: 50 },
        ].map((node, index) => (
          <circle
            key={index}
            cx={node.x}
            cy={node.y}
            r="4"
            fill={index % 4 === 0 ? "#3B82F6" : index % 4 === 1 ? "#8B5CF6" : index % 4 === 2 ? "#10B981" : "#F59E0B"}
            className="animate-pulse"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}

        {/* Data Packets */}
        {[
          { path: "M50,50 L150,50 L150,100 L200,100 L200,150 L250,150 L250,200 L350,200", color: "#3B82F6" },
          { path: "M50,100 L100,100 L100,200 L200,200 L200,250 L350,250", color: "#8B5CF6" },
          { path: "M50,150 L100,150 L100,50 L250,50 L250,100 L350,100", color: "#10B981" },
          { path: "M50,200 L75,200 L75,250 L150,250 L150,150 L300,150 L300,50 L350,50", color: "#F59E0B" },
        ].map((packet, index) => (
          <circle key={index} r="3" fill={packet.color}>
            <animateMotion path={packet.path} dur="5s" repeatCount="indefinite" rotate="auto" begin={`${index * 1}s`} />
          </circle>
        ))}

        {/* Chip Components */}
        {[
          { x: 175, y: 75, width: 50, height: 30 },
          { x: 275, y: 125, width: 50, height: 30 },
          { x: 125, y: 175, width: 50, height: 30 },
          { x: 225, y: 225, width: 50, height: 30 },
        ].map((chip, index) => (
          <g key={index}>
            <rect
              x={chip.x}
              y={chip.y}
              width={chip.width}
              height={chip.height}
              rx="2"
              fill="#1F2937"
              stroke={
                index % 4 === 0 ? "#3B82F6" : index % 4 === 1 ? "#8B5CF6" : index % 4 === 2 ? "#10B981" : "#F59E0B"
              }
              strokeWidth="1"
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={chip.x + 5 + i * 8}
                y={chip.y + chip.height - 5}
                width="4"
                height="8"
                fill={
                  index % 4 === 0 ? "#3B82F6" : index % 4 === 1 ? "#8B5CF6" : index % 4 === 2 ? "#10B981" : "#F59E0B"
                }
              />
            ))}
            <circle
              cx={chip.x + 10}
              cy={chip.y + 10}
              r="3"
              fill={index % 4 === 0 ? "#3B82F6" : index % 4 === 1 ? "#8B5CF6" : index % 4 === 2 ? "#10B981" : "#F59E0B"}
              className="animate-ping"
              style={{ animationDuration: "2s" }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

// Tambahkan Electric Effect Component
export function ElectricEffect({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] ${className}`}>
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Electric Bolts */}
        {[
          {
            path: "M50,150 L80,120 L110,140 L140,110 L170,130 L200,100 L230,120 L260,90 L290,110 L320,80 L350,100",
            color: "#3B82F6",
          },
          {
            path: "M50,180 L75,160 L100,180 L125,160 L150,180 L175,160 L200,180 L225,160 L250,180 L275,160 L300,180 L325,160 L350,180",
            color: "#8B5CF6",
          },
          {
            path: "M50,120 L85,140 L120,120 L155,140 L190,120 L225,140 L260,120 L295,140 L330,120 L350,140",
            color: "#10B981",
          },
        ].map((bolt, index) => (
          <g key={index}>
            <path
              d={bolt.path}
              stroke={bolt.color}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-electric"
              style={{ animationDelay: `${index * 0.5}s` }}
            />
            <path
              d={bolt.path}
              stroke="white"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-electric"
              style={{ animationDelay: `${index * 0.5 + 0.1}s` }}
            />
          </g>
        ))}

        {/* Electric Nodes */}
        {[
          { cx: 50, cy: 150, color: "#3B82F6" },
          { cx: 200, cy: 100, color: "#8B5CF6" },
          { cx: 350, cy: 100, color: "#10B981" },
          { cx: 50, cy: 180, color: "#F59E0B" },
          { cx: 350, cy: 180, color: "#EF4444" },
        ].map((node, index) => (
          <g key={index}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r="8"
              fill={node.color}
              className="animate-electric-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r="12"
              fill="none"
              stroke={node.color}
              strokeWidth="2"
              opacity="0.5"
              className="animate-electric-ring"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          </g>
        ))}

        {/* Electric Sparks */}
        {[
          { x: 100, y: 130 },
          { x: 250, y: 170 },
          { x: 150, y: 90 },
          { x: 300, y: 140 },
        ].map((spark, index) => (
          <g key={index} className="animate-electric-spark" style={{ animationDelay: `${index * 0.7}s` }}>
            <line x1={spark.x - 5} y1={spark.y} x2={spark.x + 5} y2={spark.y} stroke="#FBBF24" strokeWidth="2" />
            <line x1={spark.x} y1={spark.y - 5} x2={spark.x} y2={spark.y + 5} stroke="#FBBF24" strokeWidth="2" />
            <line
              x1={spark.x - 3}
              y1={spark.y - 3}
              x2={spark.x + 3}
              y2={spark.y + 3}
              stroke="#FBBF24"
              strokeWidth="1"
            />
            <line
              x1={spark.x - 3}
              y1={spark.y + 3}
              x2={spark.x + 3}
              y2={spark.y - 3}
              stroke="#FBBF24"
              strokeWidth="1"
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

// Tambahkan Quantum Field Effect
export function QuantumField({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] flex items-center justify-center ${className}`}>
      <div className="relative w-64 h-64">
        {/* Quantum Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-500 rounded-full animate-quantum-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Quantum Waves */}
        <div className="absolute inset-0">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-blue-500/20 animate-quantum-wave"
              style={{
                animationDelay: `${i * 0.8}s`,
                animationDuration: "4s",
              }}
            />
          ))}
        </div>

        {/* Center Quantum Core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-quantum-pulse flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full opacity-80 animate-ping"></div>
            </div>
            <div className="absolute inset-0 w-16 h-16 border-2 border-blue-400 rounded-full animate-spin-slow"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
