import { SectionTitle } from "../shared/section-title"
import { ServiceCard } from "../shared/service-card"
import { Smartphone, Monitor, Headset, Palette } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: <Smartphone className="w-10 h-10 md:w-12 md:h-12" />,
      title: "Mobile Games",
      description: "iOS and Android mobile game development with optimal performance and addictive gameplay.",
      features: [
        "Native iOS & Android",
        "Cross-platform Unity",
        "Monetization Strategy",
        "App Store Optimization",
        "Live Ops & Analytics",
      ],
    },
    {
      icon: <Monitor className="w-10 h-10 md:w-12 md:h-12" />,
      title: "PC/Web Games",
      description: "Desktop and web game development with high-quality graphics and complex gameplay.",
      features: [
        "Steam Integration",
        "WebGL Optimization",
        "Multiplayer Support",
        "Cloud Save System",
        "Achievement System",
      ],
    },
    {
      icon: <Headset className="w-10 h-10 md:w-12 md:h-12" />,
      title: "VR/AR Development",
      description: "Immersive experiences with cutting-edge Virtual and Augmented Reality technology.",
      features: ["Oculus & HTC Vive", "ARCore & ARKit", "Hand Tracking", "Spatial Audio", "Performance Optimization"],
    },
    {
      icon: <Palette className="w-10 h-10 md:w-12 md:h-12" />,
      title: "2D/3D Assets",
      description: "High-quality asset creation for various game development needs.",
      features: ["Character Design", "Environment Art", "UI/UX Design", "Animation & Rigging", "Texture & Materials"],
    },
  ]

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Services"
          subtitle="Complete solutions for all your game development needs"
          sectionCode="SERVICES"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
