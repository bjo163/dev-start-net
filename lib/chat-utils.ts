export interface ChatMessage {
  text: string
  isUser: boolean
  time: string
  id: string
}

export interface ChatResponse {
  content: string
  session_id: string
  agent_id: string
  model_id: string
  model_name: string
  metrics?: {
    input_tokens?: number[]
    output_tokens?: number[]
    total_tokens?: number[]
    time?: number[]
  }
}

// Simple and working implementation
async function generateSessionId(): Promise<string> {
  try {
    if (typeof window === 'undefined') {
      return Math.random().toString(36).substring(2, 18)
    }

    const userAgent = navigator.userAgent
    let clientIP = ''    // Try to get real IP
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      if (response.ok) {
        const data = await response.json()
        clientIP = data.ip
      }    } catch {
      clientIP = `fallback_${Date.now()}`
    }

    // Generate hash
    const combined = clientIP + userAgent

    if (window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder()
            const data = encoder.encode(combined)
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      const sessionId = hashHex.substring(0, 16)
      return sessionId
    } else {
      // Simple fallback
      let hash = 0
      for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
      }
      const sessionId = Math.abs(hash).toString(16).substring(0, 16)
      return sessionId
    }  } catch {
    return Math.random().toString(36).substring(2, 18)
  }
}

let cachedSessionId: string | null = null

export async function getSessionId(): Promise<string> {
  if (!cachedSessionId) {
    cachedSessionId = await generateSessionId()
  }
  return cachedSessionId
}

export async function sendChatMessage(message: string): Promise<ChatResponse> {  try {
    const sessionId = await getSessionId()
    
    const requestData = {
      query: message,
      session_id: sessionId,
      agent_type: "custom"
    }

    const response = await fetch('https://agx-api.apps.pundidigitaldynamics.net/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },      body: JSON.stringify(requestData)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch {
    throw new Error('Failed to send message. Please try again.')
  }
}

// For backward compatibility
export const chatSession = {
  getSessionId,
  sendMessage: sendChatMessage
}

export function getChatSession() {
  return {
    getSessionId,
    sendMessage: sendChatMessage
  }
}
