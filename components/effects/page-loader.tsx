"use client"

import { useEffect, useState } from "react"
import { usePageLoader } from "../../hooks/use-page-loader"
import { AudioVisualizer } from "./audio-visualizer"

export function PageLoader() {
  const { isPageLoading, loadProgress } = usePageLoader()
  const [loadingStage, setLoadingStage] = useState<'init' | 'assets' | 'ui' | 'complete'>('init')
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Update loading stage based on progress
    if (loadProgress < 25) {
      setLoadingStage('init')
    } else if (loadProgress < 60) {
      setLoadingStage('assets')
    } else if (loadProgress < 90) {
      setLoadingStage('ui')
    } else {
      setLoadingStage('complete')
    }

    // Start exit animation when loading is complete
    if (!isPageLoading && !isExiting) {
      setIsExiting(true)
    }
  }, [loadProgress, isPageLoading, isExiting])

  // Don't render if both loading is done and exit animation is complete
  if (!isPageLoading && isExiting) {
    // Use setTimeout to allow exit animation to complete
    setTimeout(() => {
      if (document.querySelector('.page-loader-container')) {
        document.querySelector('.page-loader-container')?.remove()
      }
    }, 800)
  }

  if (!isPageLoading && !isExiting) return null

  const getStageText = () => {
    switch (loadingStage) {
      case 'init': return 'INITIALIZING SYSTEM'
      case 'assets': return 'LOADING ASSETS'
      case 'ui': return 'RENDERING INTERFACE'
      case 'complete': return 'SYSTEM READY'
      default: return 'LOADING'
    }
  }

  const getSystemMessages = () => {
    switch (loadingStage) {
      case 'init':
        return [
          '» Booting quantum processor...',
          '» Establishing neural link...',
          '» Calibrating HUD systems...'
        ]
      case 'assets':
        return [
          '» Loading visual elements...',
          '» Downloading textures...',
          '» Caching resources...'
        ]
      case 'ui':
        return [
          '» Building interface components...',
          '» Initializing animations...',
          '» Preparing user experience...'
        ]
      case 'complete':
        return [
          '» All systems operational',
          '» Ready for user interaction',
          '» Welcome to START-G'
        ]
      default:
        return ['» Processing...']
    }
  }

  return (
    <div className={`page-loader-container fixed inset-0 z-[200] section-transition-overlay flex items-center justify-center ${isExiting ? 'page-loader-exit' : ''}`}>
      {/* Background Grid Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXRoIGlkPSJhIiBkPSJNMjAgMjBMMCAyMFYwaDIwdjIweiIvPgogIDwvZGVmcz4KICA8dXNlIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIGhyZWY9IiNhIiBvcGFjaXR5PSIwLjEiLz4KICA8dXNlIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIGhyZWY9IiNhIiB4PSIyMCIgeT0iMjAiIG9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] animate-pulse"></div>
        </div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center space-y-8 max-w-md mx-auto px-6">
        {/* Scanning Animation - Same as section transition */}
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
          
          {/* Center Progress with Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 bg-cyan-400/20 rounded border border-cyan-400 flex items-center justify-center mx-auto mb-2">
                <div className="w-2 h-2 bg-cyan-400 rounded animate-pulse"></div>
              </div>
              <div className="hud-font-display text-cyan-400 text-sm font-bold">START-G</div>
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-2">
          <div className="hud-font-primary text-cyan-400 text-lg">
            [{getStageText()}]
          </div>
          
          <div className="hud-label text-cyan-300 uppercase tracking-wider">
            PROGRESS: {Math.round(loadProgress)}%
          </div>
          
          {/* Audio Visualizer */}
          <div className="flex justify-center mt-3">
            <AudioVisualizer isActive={true} intensity={loadProgress / 100} />
          </div>
        </div>

        {/* Progress Bar - Same style as section transition */}
        <div className="w-80 mx-auto space-y-2">
          <div className="flex justify-between hud-font-primary text-xs text-cyan-300">
            <span>SYSTEM STATUS</span>
            <span>{Math.round(loadProgress)}%</span>
          </div>
          
          <div className="relative h-2 bg-gray-800 border border-cyan-500/30 rounded">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded transition-all duration-100 ease-out progress-glow"
              style={{ width: `${loadProgress}%` }}
            >
              <div className="absolute top-0 right-0 w-4 h-full bg-cyan-300 opacity-75 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Data Stream Effect - Same as section transition */}
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
              />
            )
          })}
        </div>

        {/* System Messages */}
        <div className="hud-font-primary text-xs text-cyan-500 opacity-60 space-y-1">
          {getSystemMessages().map((message, index) => (
            <div 
              key={index} 
              className="animate-pulse"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
