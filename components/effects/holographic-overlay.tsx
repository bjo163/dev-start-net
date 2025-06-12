"use client"

export function HolographicOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Scan lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 255, 0.1) 2px,
            rgba(0, 255, 255, 0.1) 4px
          )`,
          animation: "scan 3s linear infinite",
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-500/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-500/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyan-500/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-500/30" />

      {/* Floating UI elements */}
      <div className="absolute top-1/4 right-12 text-cyan-500/20 text-xs font-mono">
        <div>SYS_STATUS: ONLINE</div>
        <div>NET_CONN: SECURE</div>
        <div>ENC_LEVEL: 256</div>
      </div>

      <div className="absolute bottom-1/4 left-12 text-cyan-500/20 text-xs font-mono">
        <div>PROC_LOAD: 23%</div>
        <div>MEM_USAGE: 67%</div>
        <div>UPTIME: 99.9%</div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  )
}
