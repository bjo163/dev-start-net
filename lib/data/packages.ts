export interface Package {
  id: string
  speed: string
  price: string
  type: "HOME BROADBAND" | "SOHO DEDICATED" | "BUSINESS"
  features: string[]
  popular?: boolean
  color?: "blue" | "green" | "purple" | "red"
}

export interface ServiceArea {
  id: string
  name: string
  color: string
  center: { lat: number; lng: number }
  bounds: {
    lat: [number, number]
    lng: [number, number]
  }
  radius: number
  packages: Package[]
}

// Shared package data
export const basePackages: Package[] = [
  {
    id: "home-50",
    speed: "50",
    price: "179.500",
    type: "HOME BROADBAND",
    features: [
      "Kecepatan hingga 50 Mbps",
      "Unlimited kuota",
      "Free instalasi",
      "24/7 customer support",
      "Modem WiFi gratis",
    ],
    color: "blue",
  },
  {
    id: "home-100",
    speed: "100",
    price: "254.500",
    type: "HOME BROADBAND",
    features: [
      "Kecepatan hingga 100 Mbps",
      "Unlimited kuota",
      "Free instalasi",
      "24/7 customer support",
      "Modem WiFi gratis",
      "Priority support",
    ],
    popular: true,
    color: "green",
  },
  {
    id: "home-200",
    speed: "200",
    price: "354.500",
    type: "HOME BROADBAND",
    features: [
      "Kecepatan hingga 200 Mbps",
      "Unlimited kuota",
      "Free instalasi",
      "24/7 customer support",
      "Modem WiFi gratis",
      "Priority support",
      "Static IP",
    ],
    color: "purple",
  },
  {
    id: "soho-150",
    speed: "150",
    price: "1.504.500",
    type: "SOHO DEDICATED",
    features: [
      "Dedicated line 150 Mbps",
      "Guaranteed bandwidth",
      "SLA 99.9%",
      "24/7 technical support",
      "Free managed router",
      "Static IP included",
      "Priority installation",
    ],
    color: "red",
  },
]

// Service areas with shared packages
export const serviceAreas: ServiceArea[] = [
  {
    id: "jakarta-selatan",
    name: "Jakarta Selatan",
    color: "#ef4444",
    center: { lat: -6.2608, lng: 106.8108 },
    bounds: { lat: [-6.35, -6.15], lng: [106.75, 106.85] },
    radius: 5000,
    packages: [
      basePackages[0], // 50 Mbps
      basePackages[1], // 100 Mbps
      basePackages[2], // 200 Mbps
    ],
  },
  {
    id: "jakarta-pusat",
    name: "Jakarta Pusat",
    color: "#3b82f6",
    center: { lat: -6.1751, lng: 106.865 },
    bounds: { lat: [-6.22, -6.12], lng: [106.82, 106.92] },
    radius: 4000,
    packages: [basePackages[0], basePackages[1], basePackages[2]],
  },
  {
    id: "jakarta-barat",
    name: "Jakarta Barat",
    color: "#8b5cf6",
    center: { lat: -6.1683, lng: 106.7588 },
    bounds: { lat: [-6.22, -6.12], lng: [106.7, 106.8] },
    radius: 4500,
    packages: [
      { ...basePackages[0], price: "139.500" }, // Discounted
      { ...basePackages[1], price: "203.500" }, // Discounted
    ],
  },
  {
    id: "jakarta-timur",
    name: "Jakarta Timur",
    color: "#10b981",
    center: { lat: -6.225, lng: 106.9004 },
    bounds: { lat: [-6.28, -6.18], lng: [106.85, 106.95] },
    radius: 5000,
    packages: [
      { ...basePackages[0], price: "139.500" },
      { ...basePackages[1], price: "203.500" },
    ],
  },
  {
    id: "jakarta-utara",
    name: "Jakarta Utara",
    color: "#f59e0b",
    center: { lat: -6.121, lng: 106.8719 },
    bounds: { lat: [-6.15, -6.05], lng: [106.82, 106.92] },
    radius: 4000,
    packages: [basePackages[0], basePackages[1]],
  },
  {
    id: "depok",
    name: "Depok",
    color: "#ec4899",
    center: { lat: -6.4025, lng: 106.7942 },
    bounds: { lat: [-6.45, -6.35], lng: [106.75, 106.85] },
    radius: 6000,
    packages: [
      { ...basePackages[0], price: "139.500" },
      { ...basePackages[1], price: "203.500" },
    ],
  },
  {
    id: "tangerang",
    name: "Tangerang",
    color: "#06b6d4",
    center: { lat: -6.1701, lng: 106.6403 },
    bounds: { lat: [-6.22, -6.12], lng: [106.6, 106.7] },
    radius: 5500,
    packages: [
      { ...basePackages[0], price: "104.500" }, // Best price
      { ...basePackages[1], price: "203.500" },
      basePackages[3], // SOHO Dedicated
    ],
  },
  {
    id: "bekasi",
    name: "Bekasi",
    color: "#84cc16",
    center: { lat: -6.2349, lng: 107.0003 },
    bounds: { lat: [-6.28, -6.18], lng: [106.95, 107.05] },
    radius: 5000,
    packages: [
      { ...basePackages[0], price: "139.500" },
      { ...basePackages[1], price: "203.500" },
    ],
  },
]

// Utility functions
export const getAreaById = (id: string): ServiceArea | undefined => {
  return serviceAreas.find((area) => area.id === id)
}

export const getPackageById = (id: string): Package | undefined => {
  return basePackages.find((pkg) => pkg.id === id)
}

export const getAreaByName = (name: string): ServiceArea | undefined => {
  return serviceAreas.find((area) => area.name === name)
}
