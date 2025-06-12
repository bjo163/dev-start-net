"use client"

import { useState } from "react"
import { SectionTitle } from "../shared/section-title"
import { ProductCard } from "../shared/product-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Server, Code, Shield, Globe, Database } from "lucide-react"

export function ShopSection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    { id: "all", name: "All" },
    { id: "development", name: "Development" },
    { id: "hosting", name: "Hosting" },
    { id: "maintenance", name: "Maintenance" },
    { id: "addons", name: "Add-ons" },
    { id: "premium", name: "Premium" },
  ]

  const products = [
    {
      title: "Standard Build",
      description: "Max Level 50-66, Edit NPC & Drop, Custom Standard Items CCR. Perfect for small servers.",
      price: "Rp 5,000,000",
      originalPrice: "",
      image: "/rf-standard-package.png",
      category: "development",
      rating: 4.5,
      downloads: 45,
      features: [
        "Max Level 50-66",
        "Edit NPC & Drop",
        "Custom Standard Item's CCR",
        "Work Time 1-3 Days",
        "NOT INCLUDE WEB & GAMECP",
        "NOT INCLUDE HACKSHIELD",
      ],
    },
    {
      title: "Custom Build",
      description: "Max Level 50-66, Edit NPC/Cash Shop/Drop, 3 Daily Quest, Include Combine System + VPS 1 Month.",
      price: "Rp 8,000,000",
      originalPrice: "",
      image: "/rf-custom-package.png",
      category: "development",
      rating: 4.7,
      downloads: 32,
      features: [
        "Max Level 50-66",
        "Edit NPC, Cash Shop & Drop",
        "3 Daily Quest",
        "Include Combine System",
        "Max 4 Set Type Costume Items",
        "Work Time 3-5 Days",
        "INCLUDE VPS 1 Month",
        "NOT INCLUDE WEB & GAMECP",
      ],
    },
    {
      title: "Full Custom Build",
      description: "Max Level 50-70, Unlimited Daily Quest & NPC, Unlimited Costume Request, Include VPS 1 Month.",
      price: "Rp 10,000,000",
      originalPrice: "",
      image: "/rf-full-custom.png",
      category: "development",
      rating: 4.8,
      downloads: 28,
      features: [
        "Max Level 50-70",
        "Edit NPC, Cash Shop & Drop",
        "Unlimited Daily Quest",
        "Unlimited NPC Daily",
        "Unlimited Costume Item Request",
        "Include Combine System",
        "Work Time 10-30 Days",
        "INCLUDE VPS 1 Month",
      ],
    },
    {
      title: "VIP Custom Build",
      description:
        "Max Level 50-99, New Map, Unlimited Features, Active Pitboss Event, Include WEB & GAMECP + HACKSHIELD.",
      price: "Rp 20,000,000",
      originalPrice: "",
      image: "/rf-vip-package.png",
      category: "premium",
      rating: 4.9,
      downloads: 15,
      features: [
        "Max Level 50-99",
        "Edit NPC, Cash Shop & Drop",
        "New Map",
        "Unlimited Daily Quest",
        "Unlimited NPC Daily",
        "Unlimited Costume Item Request",
        "Active Pitboss Event",
        "Include Combine System",
        "Work Time 10-30 Days",
        "INCLUDE WEB & GAMECP",
        "HACKSHIELD Free 1 Month OWNDEV",
      ],
    },
    {
      title: "VPS Hosting Premium",
      description: "High-performance VPS hosting specifically for RF Online servers with 99.9% uptime.",
      price: "Rp 500,000",
      originalPrice: "Rp 750,000",
      image: "/rf-hosting-server.png",
      category: "hosting",
      rating: 4.6,
      downloads: 120,
      features: [
        "CPU: 4 Core Intel Xeon",
        "RAM: 8GB DDR4",
        "Storage: 100GB NVMe SSD",
        "Bandwidth: Unlimited",
        "DDoS Protection",
        "24/7 Monitoring",
        "99.9% Uptime Guarantee",
        "Free SSL Certificate",
      ],
    },
    {
      title: "Server Maintenance",
      description: "Monthly maintenance service to keep your RF Online server performance optimal.",
      price: "Rp 1,500,000",
      originalPrice: "",
      image: "/rf-maintenance.png",
      category: "maintenance",
      rating: 4.7,
      downloads: 85,
      features: [
        "Daily Server Monitoring",
        "Weekly Database Optimization",
        "Security Updates",
        "Bug Fixes & Patches",
        "Performance Tuning",
        "24/7 Emergency Support",
        "Monthly Report",
        "Backup Management",
      ],
    },
    {
      title: "Web Panel & GameCP",
      description: "Complete web panel with GameCP for easy and professional RF Online server management.",
      price: "Rp 3,000,000",
      originalPrice: "Rp 4,000,000",
      image: "/rf-web-panel.png",
      category: "addons",
      rating: 4.8,
      downloads: 67,
      features: [
        "Responsive Web Design",
        "User Registration System",
        "Character Management",
        "Item Mall Integration",
        "Donation System",
        "Admin Panel",
        "Statistics Dashboard",
        "Multi-language Support",
      ],
    },
    {
      title: "Advanced GameCP",
      description: "GameCP with complete features for player, item, and server administration management.",
      price: "Rp 2,500,000",
      originalPrice: "",
      image: "/rf-gamecp.png",
      category: "addons",
      rating: 4.6,
      downloads: 89,
      features: [
        "Player Management",
        "Item Management",
        "Character Editor",
        "Guild Management",
        "Ban/Unban System",
        "Server Statistics",
        "Event Management",
        "Real-time Monitoring",
      ],
    },
    {
      title: "HackShield Protection",
      description: "Advanced anti-cheat protection to protect your server from hacks and exploits.",
      price: "Rp 1,000,000",
      originalPrice: "",
      image: "/rf-hackshield.png",
      category: "addons",
      rating: 4.5,
      downloads: 156,
      features: [
        "Real-time Hack Detection",
        "Speed Hack Protection",
        "Memory Protection",
        "Process Monitoring",
        "Auto Ban System",
        "Whitelist Management",
        "Log System",
        "Regular Updates",
      ],
    },
    {
      title: "Database Setup & Config",
      description: "Professional database setup and optimal configuration for maximum server performance.",
      price: "Rp 800,000",
      originalPrice: "Rp 1,200,000",
      image: "/rf-database-setup.png",
      category: "addons",
      rating: 4.4,
      downloads: 78,
      features: [
        "Database Optimization",
        "Index Configuration",
        "Query Optimization",
        "Backup Setup",
        "Security Configuration",
        "Performance Tuning",
        "Monitoring Setup",
        "Documentation",
      ],
    },
    {
      title: "Custom Maps Pack",
      description: "Exclusive custom maps collection to add variety and new gaming experiences.",
      price: "Rp 1,500,000",
      originalPrice: "",
      image: "/rf-custom-maps.png",
      category: "addons",
      rating: 4.7,
      downloads: 94,
      features: [
        "5 Custom Maps",
        "Unique Monsters",
        "Custom NPCs",
        "Special Items",
        "Quest Integration",
        "Balanced Gameplay",
        "High Quality Graphics",
        "Installation Guide",
      ],
    },
    {
      title: "Item Mall System",
      description: "Complete item mall system with payment gateway and easy management.",
      price: "Rp 2,000,000",
      originalPrice: "Rp 2,800,000",
      image: "/rf-item-mall.png",
      category: "addons",
      rating: 4.8,
      downloads: 112,
      features: [
        "Payment Gateway Integration",
        "Item Categories",
        "Discount System",
        "Gift System",
        "Purchase History",
        "Admin Management",
        "Multi-currency Support",
        "Mobile Responsive",
      ],
    },
    {
      title: "Starter Hosting Plan",
      description:
        "Perfect entry-level hosting for small RF Online servers with reliable performance and 24/7 monitoring.",
      price: "Rp 600,000",
      originalPrice: "",
      image: "/hosting-starter-plan.png",
      category: "hosting",
      rating: 4.5,
      downloads: 89,
      features: [
        "Intel Xeon Processor (Node Server)",
        "vCore 3",
        "8GB of RAM",
        "80GB Storage SSD NVMe",
        "1 Public IP Address",
        "No closed port",
        "24/7 Monitoring (Fast Respon)",
        "Public network Up To 100Mbps",
        "Firewall DDoS Protection",
        "OS Windows Server 2016",
        "Money Back Guarantee If Down 24 Hours",
      ],
    },
    {
      title: "Pro Hosting Plan",
      description:
        "Most popular hosting solution with enhanced performance and bandwidth for growing RF Online servers.",
      price: "Rp 900,000",
      originalPrice: "",
      image: "/hosting-pro-plan.png",
      category: "hosting",
      rating: 4.8,
      downloads: 156,
      features: [
        "Intel Xeon Processor (Node Server)",
        "vCore 4",
        "12GB of RAM",
        "150GB Storage SSD NVMe",
        "1 Public IP Address",
        "No closed port",
        "24/7 Monitoring (Fast Respon)",
        "Public network Up To 250Mbps",
        "Firewall DDoS Protection",
        "OS Windows Server 2016",
        "Money Back Guarantee If Down 24 Hours",
      ],
    },
    {
      title: "VIP Hosting Plan",
      description:
        "Premium hosting with maximum performance, bandwidth, and resources for high-traffic RF Online servers.",
      price: "Rp 1,300,000",
      originalPrice: "",
      image: "/hosting-vip-plan.png",
      category: "hosting",
      rating: 4.9,
      downloads: 98,
      features: [
        "Intel Xeon Processor (Node Server)",
        "vCore 6",
        "16GB of RAM",
        "200GB Storage SSD NVMe",
        "1 Public IP Address",
        "No closed port",
        "24/7 Monitoring (Fast Respon)",
        "Public network Up To 500Mbps",
        "Firewall DDoS Protection",
        "OS Windows Server 2016",
        "Money Back Guarantee If Down 24 Hours",
      ],
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="shop" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="RF Online Development"
          subtitle="Professional development and hosting packages for your RF Online server"
          sectionCode="SHOP"
        />

        {/* RF Online Shop Header */}
        <div className="hud-panel p-4 md:p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Code className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mr-2 md:mr-3" />
            <span className="hud-font-display text-lg md:text-xl text-cyan-400 hud-text-glow">
              RF ONLINE DEVELOPMENT SERVICES
            </span>
            <Code className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 ml-2 md:ml-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-center">
            <div className="hud-panel p-2 md:p-3">
              <div className="hud-label text-xs">STATUS</div>
              <div className="hud-value text-sm hud-status-online">ACTIVE</div>
            </div>
            <div className="hud-panel p-2 md:p-3">
              <div className="hud-label text-xs">PROJECTS</div>
              <div className="hud-value text-sm text-cyan-400">50+</div>
            </div>
            <div className="hud-panel p-2 md:p-3">
              <div className="hud-label text-xs">PRODUCTS</div>
              <div className="hud-value text-sm text-cyan-400">{products.length}</div>
            </div>
            <div className="hud-panel p-2 md:p-3">
              <div className="hud-label text-xs">SUPPORT</div>
              <div className="hud-value text-sm hud-status-online">24/7</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-4 h-4" />
            <Input
              placeholder="SEARCH_PACKAGES..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="hud-input pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-300 hud-font-primary ${
                  selectedCategory === category.id
                    ? "bg-cyan-500 text-black hover:bg-cyan-400 hud-text-glow"
                    : "border-cyan-600 text-cyan-300 hover:border-cyan-500 hover:text-cyan-400 hover:hud-text-glow"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                [{category.name.toUpperCase()}]
              </Badge>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="hud-panel p-4 md:p-8 max-w-md mx-auto">
              <div className="hud-label mb-2">[SEARCH_RESULT]</div>
              <p className="hud-font-primary text-gray-400">NO PACKAGES FOUND</p>
              <div className="hud-terminal mt-2">&gt; TRY DIFFERENT KEYWORDS</div>
            </div>
          </div>
        )}

        {/* Service Guarantees */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6">
          <div className="hud-panel p-3 md:p-4 text-center">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
            <div className="hud-label text-xs mb-1 md:mb-2">[GUARANTEE]</div>
            <div className="hud-font-primary text-xs md:text-sm text-cyan-400">100% WORKING</div>
          </div>
          <div className="hud-panel p-3 md:p-4 text-center">
            <Server className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
            <div className="hud-label text-xs mb-1 md:mb-2">[SUPPORT]</div>
            <div className="hud-font-primary text-xs md:text-sm text-cyan-400">LIFETIME</div>
          </div>
          <div className="hud-panel p-3 md:p-4 text-center">
            <Code className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
            <div className="hud-label text-xs mb-1 md:mb-2">[DELIVERY]</div>
            <div className="hud-font-primary text-xs md:text-sm text-cyan-400">ON_TIME</div>
          </div>
          <div className="hud-panel p-3 md:p-4 text-center">
            <Globe className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
            <div className="hud-label text-xs mb-1 md:mb-2">[HOSTING]</div>
            <div className="hud-font-primary text-xs md:text-sm text-cyan-400">GLOBAL</div>
          </div>
          <div className="hud-panel p-3 md:p-4 text-center">
            <Database className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
            <div className="hud-label text-xs mb-1 md:mb-2">[EXPERIENCE]</div>
            <div className="hud-font-primary text-xs md:text-sm text-cyan-400">5+ YEARS</div>
          </div>
        </div>

        {/* Contact for Custom Quote */}
        <div className="mt-12 hud-panel p-4 md:p-8 text-center">
          <div className="hud-label mb-2 md:mb-4">[CUSTOM_DEVELOPMENT]</div>
          <h3 className="hud-font-display text-xl md:text-2xl text-cyan-400 hud-text-glow mb-2 md:mb-4">
            NEED CUSTOM DEVELOPMENT?
          </h3>
          <p className="hud-font-primary text-sm md:text-base text-gray-300 mb-4 md:mb-6 max-w-2xl mx-auto">
            Complete RF Online development packages and premium server hosting solutions with guaranteed performance and
            24/7 support.
          </p>
          <button className="hud-button">[FREE_CONSULTATION]</button>
        </div>
      </div>
    </section>
  )
}
