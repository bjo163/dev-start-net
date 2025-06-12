"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { sendChatMessage } from "@/lib/chat-utils"

export function ChatTestComponent() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testMessage = async () => {
    if (!message.trim()) return    setLoading(true)
    try {
      const result = await sendChatMessage(message)
      setResponse(result)
      console.log('Chat Response:', result)    } catch (error) {
      console.error('Chat Error:', error)
      setResponse({ error: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">      <CardHeader>
        <CardTitle>Start-G Chat API Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Test message (e.g., 'Saya butuh server RF Online custom' atau 'coba cek subscription MY000001')"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && testMessage()}
          />
          <Button onClick={testMessage} disabled={loading || !message.trim()}>
            {loading ? 'Sending...' : 'Send Test'}
          </Button>
        </div>

        {response && (
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">API Response:</h3>
            <pre className="text-sm overflow-auto whitespace-pre-wrap">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
