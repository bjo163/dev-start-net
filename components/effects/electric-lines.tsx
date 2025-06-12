"use client"

import { useEffect, useRef } from "react"

export function ElectricLines() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const createLightning = () => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

      // Random lightning path
      const startX = Math.random() * window.innerWidth
      const startY = 0
      const endX = startX + (Math.random() - 0.5) * 200
      const endY = window.innerHeight

      const midX1 = startX + (Math.random() - 0.5) * 100
      const midY1 = window.innerHeight * 0.3
      const midX2 = endX + (Math.random() - 0.5) * 100
      const midY2 = window.innerHeight * 0.7

      const d = `M ${startX} ${startY} L ${midX1} ${midY1} L ${midX2} ${midY2} L ${endX} ${endY}`

      path.setAttribute("d", d)
      path.setAttribute("stroke", "#00ffff")
      path.setAttribute("stroke-width", "2")
      path.setAttribute("fill", "none")
      path.setAttribute("opacity", "0.8")
      path.style.filter = "drop-shadow(0 0 10px #00ffff)"

      svg.appendChild(path)

      // Animate and remove
      path.animate([{ opacity: 0 }, { opacity: 0.8 }, { opacity: 0 }], {
        duration: 200,
        easing: "ease-in-out",
      }).onfinish = () => {
        if (path.parentNode) {
          path.parentNode.removeChild(path)
        }
      }
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        createLightning()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <svg ref={svgRef} className="fixed inset-0 pointer-events-none z-10 opacity-20" width="100%" height="100%" />
}
