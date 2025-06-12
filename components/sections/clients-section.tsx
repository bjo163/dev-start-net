import { SectionTitle } from "../shared/section-title"
import Image from "next/image"

export function ClientsSection() {
  const clients = [
    {
      name: "Epic Arena",
      logo: "/client-epic-arena.png",
      description: "RF Online Private Server",
    },
    {
      name: "Unity Technologies",
      logo: "/client-unity.png",
      description: "Game Engine Development",
    },
    {
      name: "Epic52",
      logo: "/client-epic52.png",
      description: "Gaming Community",
    },
    {
      name: "BigWar",
      logo: "/client-bigwar.png",
      description: "MMORPG Server Network",
    },
    {
      name: "RFace",
      logo: "/client-rface.png",
      description: "RF Online Platform",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Trusted Clients"
          subtitle="Leading gaming companies and communities that trust Start-G for their development needs"
          sectionCode="CLIENTS"
        />

        {/* Client Stats */}
        <div className="hud-panel p-4 md:p-6 mb-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="hud-panel p-3">
              <div className="hud-font-display text-2xl md:text-3xl text-cyan-400 hud-text-glow mb-1">50+</div>
              <div className="hud-label text-xs">ACTIVE_CLIENTS</div>
            </div>
            <div className="hud-panel p-3">
              <div className="hud-font-display text-2xl md:text-3xl text-cyan-400 hud-text-glow mb-1">100+</div>
              <div className="hud-label text-xs">PROJECTS_COMPLETED</div>
            </div>
            <div className="hud-panel p-3">
              <div className="hud-font-display text-2xl md:text-3xl text-cyan-400 hud-text-glow mb-1">5+</div>
              <div className="hud-label text-xs">YEARS_EXPERIENCE</div>
            </div>
            <div className="hud-panel p-3">
              <div className="hud-font-display text-2xl md:text-3xl text-cyan-400 hud-text-glow mb-1">99%</div>
              <div className="hud-label text-xs">CLIENT_SATISFACTION</div>
            </div>
          </div>
        </div>

        {/* Client Logos Grid - Updated for 5 clients */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
          {clients.map((client, index) => (
            <div
              key={index}
              className="hud-panel p-4 md:p-6 hover:hud-panel-active transition-all duration-300 group text-center"
            >
              {/* Logo Container */}
              <div className="relative mb-4 h-16 md:h-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  width={120}
                  height={80}
                  className="max-h-full w-auto object-contain relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Client Info */}
              <div className="space-y-2">
                <h3 className="hud-font-title text-sm md:text-base text-cyan-400 group-hover:hud-text-glow transition-all duration-300">
                  {client.name}
                </h3>
                <p className="hud-font-primary text-xs text-gray-400">{client.description}</p>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-center mt-3">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse mr-2"></div>
                <span className="hud-label text-xs hud-status-online">ACTIVE</span>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Benefits */}
        <div className="hud-panel p-6 md:p-8 text-center">
          <div className="hud-label mb-4">[PARTNERSHIP_BENEFITS]</div>
          <h3 className="hud-font-display text-xl md:text-2xl text-cyan-400 hud-text-glow mb-4">
            JOIN OUR SUCCESS NETWORK
          </h3>
          <p className="hud-font-primary text-sm md:text-base text-gray-300 mb-6 max-w-3xl mx-auto">
            Partner with Start-G and join a network of successful gaming companies. We provide dedicated support,
            priority development, and exclusive access to our latest technologies and innovations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="hud-panel p-4">
              <div className="hud-label text-xs mb-2">PRIORITY_SUPPORT</div>
              <div className="hud-font-primary text-sm text-cyan-400">24/7 Dedicated Team</div>
            </div>
            <div className="hud-panel p-4">
              <div className="hud-label text-xs mb-2">EXCLUSIVE_ACCESS</div>
              <div className="hud-font-primary text-sm text-cyan-400">Latest Technologies</div>
            </div>
            <div className="hud-panel p-4">
              <div className="hud-label text-xs mb-2">CUSTOM_SOLUTIONS</div>
              <div className="hud-font-primary text-sm text-cyan-400">Tailored Development</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
