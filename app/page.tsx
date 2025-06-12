"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ProcessSection } from "@/components/sections/process-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { ShopSection } from "@/components/sections/shop-section"
import { ClientsSection } from "@/components/sections/clients-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { FAQSection } from "@/components/sections/faq-section"
import { ContactSection } from "@/components/sections/contact-section"

// Import background effects
import { QuantumGrid } from "@/components/effects/quantum-grid"
import { DataStreams } from "@/components/effects/data-streams"
import { GeometricField } from "@/components/effects/geometric-field"
import { CyberGrid } from "@/components/effects/cyber-grid"
import { HolographicOverlay } from "@/components/effects/holographic-overlay"
import { MovingLines } from "@/components/effects/moving-lines"

// Import HUD components
import { RadarScanner } from "@/components/hud/radar-scanner"
import { StatusBars } from "@/components/hud/status-bars"
import { TargetingCrosshair } from "@/components/hud/targeting-crosshair"
import { TerminalOverlay } from "@/components/hud/terminal-overlay"
import { HUDFrame } from "@/components/hud/hud-frame"

export default function HomePage() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden cursor-none">
      {/* Background Effects - These will now apply to the entire page */}
      <div className="fixed inset-0 z-0">
        <QuantumGrid />
        <DataStreams />
        <GeometricField />
        <CyberGrid />
        <HolographicOverlay />
        <MovingLines />
      </div>

      {/* HUD Interface Elements */}
      <HUDFrame />
      <RadarScanner />
      <StatusBars />
      <TargetingCrosshair />
      <TerminalOverlay />

      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <ShopSection />
        <ClientsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
