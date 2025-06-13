"use client"

import { useEffect, useState } from "react"

interface SectionTransitionProps {
  isActive: boolean
  targetSection: string
}

export function SectionTransition({ isActive, targetSection }: SectionTransitionProps) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState<'scanning' | 'loading' | 'complete'>('scanning')

  useEffect(() => {
    if (!isActive) {
      setProgress(0)
      setStage('scanning')
      return
    }

    // Scanning stage
    setStage('scanning')
    setTimeout(() => setStage('loading'), 300)

    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setStage('complete')
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isActive])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 z-[100] section-transition-overlay flex items-center justify-center">
      {/* Background Grid Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXRoIGlkPSJhIiBkPSJNMjAgMjBMMCAyMFYwaDIwdjIweiIvPgogIDwvZGVmcz4KICA8dXNlIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIGhyZWY9IiNhIiBvcGFjaXR5PSIwLjEiLz4KICA8dXNlIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIGhyZWY9IiNhIiB4PSIyMCIgeT0iMjAiIG9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] animate-pulse"></div>
        </div>
      </div>

      {/* Main Loading Interface */}
      <div className="relative z-10 text-center space-y-8">
        {/* Scanning Animation */}
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"></div>
          <div className="absolute inset-2 border-2 border-cyan-500/50 rounded-full"></div>
          <div className="absolute inset-4 border-2 border-cyan-500/70 rounded-full"></div>
          
          {/* Rotating Scanner */}
          <div className="absolute inset-0 scanner-animation">
            <div className="w-full h-full border-t-2 border-cyan-400 rounded-full"></div>
          </div>
          
          {/* Center Pulse */}
          <div className="absolute inset-8 bg-cyan-500/20 rounded-full animate-pulse"></div>
          
          {/* Target Section Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-cyan-400/20 rounded border border-cyan-400 flex items-center justify-center">
              <div className="w-2 h-2 bg-cyan-400 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-2">
          <div className="hud-font-primary text-cyan-400 text-lg">
            {stage === 'scanning' && '[SCANNING_TARGET]'}
            {stage === 'loading' && '[INITIALIZING_SECTION]'}
            {stage === 'complete' && '[TRANSFER_COMPLETE]'}
          </div>
          
          <div className="hud-label text-cyan-300 uppercase tracking-wider">
            TARGET: {targetSection}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto space-y-2">
          <div className="flex justify-between hud-font-primary text-xs text-cyan-300">
            <span>PROGRESS</span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          <div className="relative h-2 bg-gray-800 border border-cyan-500/30 rounded">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded transition-all duration-100 ease-out progress-glow"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute top-0 right-0 w-4 h-full bg-cyan-300 opacity-75 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Data Stream Effect */}
        <div className="flex justify-center space-x-1">
          {Array.from({ length: 8 }).map((_, i) => {
            const heights = [15, 25, 12, 28, 18, 22, 16, 30]
            const durations = [800, 900, 850, 950, 820, 1000, 880, 920]
            
            return (
              <div
                key={i}
                className="w-1 bg-cyan-400 data-stream-bar"
                style={{ 
                  height: `${heights[i]}px`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: `${durations[i]}ms`
                }}
              ></div>
            )
          })}
        </div>

        {/* System Messages */}
        <div className="hud-font-primary text-xs text-cyan-500 opacity-60 space-y-1">
          {stage === 'scanning' && (
            <>
              <div>» Analyzing target coordinates...</div>
              <div>» Establishing quantum link...</div>
            </>
          )}
          {stage === 'loading' && (
            <>
              <div>» Loading section data...</div>
              <div>» Synchronizing UI elements...</div>
              <div>» Optimizing render pipeline...</div>
            </>
          )}
          {stage === 'complete' && (
            <div>» Ready for navigation transfer</div>
          )}
        </div>
      </div>
    </div>
  )
}
