"use client"

import { useState, useEffect } from "react"

interface SystemInfo {
  ipAddress: string
  userAgent: string
  browserName: string
  osName: string
  connectionType: string
  ispName: string
  isLoading: boolean
}

export function useSystemInfo(): SystemInfo {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    ipAddress: "----.----.----.----",
    userAgent: "",
    browserName: "UNKNOWN",
    osName: "UNKNOWN",
    connectionType: "ETHERNET",
    ispName: "RESOLVING...",
    isLoading: true
  })

  useEffect(() => {
    const getBrowserName = (userAgent: string): string => {
      if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) return "CHROME"
      if (userAgent.includes("Firefox")) return "FIREFOX"
      if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "SAFARI"
      if (userAgent.includes("Edg")) return "EDGE"
      if (userAgent.includes("Opera")) return "OPERA"
      return "UNKNOWN"
    }

    const getOSName = (userAgent: string): string => {
      if (userAgent.includes("Windows")) return "WINDOWS"
      if (userAgent.includes("Mac OS")) return "MACOS"
      if (userAgent.includes("Linux")) return "LINUX"
      if (userAgent.includes("Android")) return "ANDROID"
      if (userAgent.includes("iOS")) return "IOS"
      return "UNKNOWN"
    }

    const getConnectionType = (): string => {
      // @ts-ignore - navigator.connection might not be available in all browsers
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      if (connection) {
        if (connection.type === 'wifi') return "WIFI"
        if (connection.type === 'cellular') return "CELLULAR"
        if (connection.effectiveType === '4g') return "4G"
        if (connection.effectiveType === '3g') return "3G"
      }
      return "ETHERNET"
    }

    const getSystemInfo = async () => {
      try {
        // Get user agent immediately
        const userAgent = navigator.userAgent
        const browserName = getBrowserName(userAgent)
        const osName = getOSName(userAgent)
        const connectionType = getConnectionType()
        
        setSystemInfo(prev => ({
          ...prev,
          userAgent,
          browserName,
          osName,
          connectionType,
        }))

        // Try to get IP address and ISP info from a free service
        try {
          // First try ipapi.co which provides ISP info
          const ipResponse = await fetch('https://ipapi.co/json/')
          const ipData = await ipResponse.json()
          
          if (ipData.ip && ipData.org) {
            setSystemInfo(prev => ({
              ...prev,
              ipAddress: ipData.ip,
              ispName: ipData.org.toUpperCase().replace(/AS\d+\s+/g, ''), // Remove AS number prefix
              isLoading: false
            }))
          } else {
            // Fallback to simple IP service
            const fallbackResponse = await fetch('https://api.ipify.org?format=json')
            const fallbackData = await fallbackResponse.json()
            
            setSystemInfo(prev => ({
              ...prev,
              ipAddress: fallbackData.ip,
              ispName: "UNKNOWN ISP",
              isLoading: false
            }))
          }
        } catch (ipError) {
          console.error('IP fetch error:', ipError)
          // Final fallback if all IP services fail
          setSystemInfo(prev => ({
            ...prev,
            ipAddress: "LOCAL.HOST",
            ispName: "LOCAL NETWORK",
            isLoading: false
          }))
        }
      } catch (error) {
        console.error('System info error:', error)
        setSystemInfo(prev => ({
          ...prev,
          ipAddress: "ERROR.FETCH",
          ispName: "NETWORK ERROR",
          isLoading: false
        }))
      }
    }

    getSystemInfo()
  }, [])

  return systemInfo
}
