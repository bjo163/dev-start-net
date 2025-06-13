"use client"

import { useState, useEffect } from "react"

interface NetworkStats {
  ping: number
  isLoading: boolean
}

export function useNetworkStats(): NetworkStats {
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    ping: 0,
    isLoading: true
  })

  useEffect(() => {
    const measurePing = async () => {
      try {
        // Use multiple endpoints for more accurate measurement
        const endpoints = [
          'https://www.google.com/favicon.ico',
          'https://www.cloudflare.com/favicon.ico',
          'https://www.github.com/favicon.ico'
        ]

        const measurements: number[] = []

        for (const endpoint of endpoints) {
          try {
            const startTime = performance.now()
            
            // Use fetch with no-cache to ensure real network request
            await fetch(endpoint, {
              method: 'HEAD',
              mode: 'no-cors',
              cache: 'no-cache'
            })
            
            const endTime = performance.now()
            const latency = Math.round(endTime - startTime)
            measurements.push(latency)
          } catch (error) {
            // Skip failed measurements
            continue
          }
        }

        if (measurements.length > 0) {
          // Calculate average ping from successful measurements
          const averagePing = Math.round(
            measurements.reduce((sum, ping) => sum + ping, 0) / measurements.length
          )
          
          setNetworkStats({
            ping: averagePing,
            isLoading: false
          })
        } else {
          // Fallback if all measurements fail
          setNetworkStats({
            ping: 999,
            isLoading: false
          })
        }
      } catch (error) {
        setNetworkStats({
          ping: 999,
          isLoading: false
        })
      }
    }

    // Initial measurement
    measurePing()

    // Re-measure every 30 seconds
    const interval = setInterval(measurePing, 30000)

    return () => clearInterval(interval)
  }, [])

  return networkStats
}
