"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { chatSession } from "@/lib/chat-utils"

export function IPTestComponent() {
  const [ipInfo, setIpInfo] = useState<any>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchIPInfo = async () => {
    setLoading(true)
    try {
      // Get multiple IP services for comparison
      const services = [
        { name: 'ipify', url: 'https://api.ipify.org?format=json' },
        { name: 'ipapi', url: 'https://ipapi.co/json/' },
        { name: 'ip.sb', url: 'https://api.ip.sb/jsonip' },
      ]

      const results = await Promise.allSettled(
        services.map(async service => {
          const response = await fetch(service.url)
          const data = await response.json()
          return { service: service.name, data }
        })
      )

      const successfulResults = results
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<any>).value)

      setIpInfo(successfulResults)

      // Get session ID
      setTimeout(() => {
        setSessionId(chatSession.getSessionId())
      }, 1000)

    } catch (error) {
      console.error('Error fetching IP info:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIPInfo()
  }, [])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>IP Detection & Session Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={fetchIPInfo} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh IP Info'}
        </Button>

        {ipInfo && (
          <div className="space-y-2">
            <h3 className="font-semibold">IP Address Results:</h3>
            {ipInfo.map((result: any, index: number) => (
              <div key={index} className="p-2 bg-gray-100 rounded">
                <strong>{result.service}:</strong> {JSON.stringify(result.data, null, 2)}
              </div>
            ))}
          </div>
        )}

        {sessionId && (
          <div className="p-4 bg-blue-50 rounded">
            <h3 className="font-semibold text-blue-800">Generated Session ID:</h3>
            <p className="font-mono text-sm">{sessionId}</p>
          </div>
        )}

        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">User Agent:</h3>
          <p className="text-sm break-all">{typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
        </div>
      </CardContent>
    </Card>
  )
}
