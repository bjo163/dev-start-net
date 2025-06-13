import { cn } from "@/lib/utils"
import { Target, Zap } from "lucide-react"

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
  centered?: boolean
  sectionCode?: string
}

export function SectionTitle({ title, subtitle, className, centered = true, sectionCode }: SectionTitleProps) {
  return (
    <div className={cn("mb-12 w-full", centered && "text-center", className)}>
      <div className="relative w-full">
        {/* Section Header Panel */}
        <div className="hud-panel p-4 md:p-6 w-full max-w-5xl mx-auto">
          {/* Section Code */}
          <div className="flex items-center justify-center mb-4">
            <Target className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="hud-label">[SECTION_{sectionCode || "DATA"}]</span>
            <Target className="w-4 h-4 text-cyan-400 ml-2" />
          </div>

          {/* Main Title */}
          <h2 className="hud-font-display text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 break-all">
            <span className="hud-text-glow">{title.toUpperCase().replace(/ /g, "_")}</span>
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <div className="mt-4">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-3 h-3 text-cyan-400 mr-2" />
                <span className="hud-label text-xs">[DESCRIPTION]</span>
                <Zap className="w-3 h-3 text-cyan-400 ml-2" />
              </div>
              <div className="hud-font-primary text-lg text-gray-300">
                <span className="hud-terminal">&gt;</span> {subtitle.toUpperCase()}
              </div>
            </div>
          )}

          {/* Status Indicator */}
          <div className="flex items-center justify-center mt-4">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2"></div>
            <span className="hud-label hud-status-online text-xs">[SECTION_LOADED]</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse ml-2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
