"use client"

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating geometric shapes */}
      <div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "6s" }}
      />
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-lg rotate-45 animate-pulse"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      />
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "5s" }}
      />
      <div
        className="absolute bottom-20 right-40 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-lg rotate-12 animate-pulse"
        style={{ animationDelay: "3s", animationDuration: "7s" }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "0s", animationDuration: "8s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "2s", animationDuration: "10s" }}
      />
    </div>
  )
}
