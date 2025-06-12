"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Real-time Performance Monitor
export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    latency: 5,
    bandwidth: 95,
    uptime: 99.9,
    connections: 1247,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        latency: Math.floor(Math.random() * 10) + 3,
        bandwidth: Math.floor(Math.random() * 20) + 80,
        uptime: 99.9,
        connections: Math.floor(Math.random() * 500) + 1000,
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-gray-900 text-white border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Network Performance</span>
          <Badge variant="outline" className="text-green-400 border-green-400">
            ONLINE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Latency</div>
            <div className="text-2xl font-bold text-green-400">{metrics.latency}ms</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Bandwidth</div>
            <div className="text-2xl font-bold text-blue-400">{metrics.bandwidth}%</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Uptime</div>
            <div className="text-2xl font-bold text-purple-400">{metrics.uptime}%</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Active Connections</div>
            <div className="text-2xl font-bold text-yellow-400">{metrics.connections.toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Network Status Indicator
export function NetworkStatusIndicator() {
  const [status, setStatus] = useState<"excellent" | "good" | "fair" | "poor">("excellent")

  useEffect(() => {
    const statuses: Array<"excellent" | "good" | "fair" | "poor"> = ["excellent", "good", "fair", "poor"]
    const interval = setInterval(() => {
      setStatus(statuses[Math.floor(Math.random() * statuses.length)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    switch (status) {
      case "excellent":
        return "text-green-500"
      case "good":
        return "text-blue-500"
      case "fair":
        return "text-yellow-500"
      case "poor":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusBars = () => {
    const bars = 4
    const activeBars = status === "excellent" ? 4 : status === "good" ? 3 : status === "fair" ? 2 : 1

    return [...Array(bars)].map((_, i) => (
      <div
        key={i}
        className={`w-2 bg-gray-300 rounded-full transition-all duration-300 ${
          i < activeBars ? getStatusColor().replace("text-", "bg-") : ""
        }`}
        style={{ height: `${(i + 1) * 6}px` }}
      />
    ))
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-end space-x-1">{getStatusBars()}</div>
      <div className={`font-semibold ${getStatusColor()}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</div>
    </div>
  )
}
