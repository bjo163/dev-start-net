"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Zap } from "lucide-react"
import Link from "next/link"
import type { Package } from "@/lib/data/packages"

interface PricingCardProps {
  package: Package
  areaName?: string
  onSelect?: (pkg: Package) => void
  showCTA?: boolean
  className?: string
}

export function PricingCard({ package: pkg, areaName, onSelect, showCTA = true, className = "" }: PricingCardProps) {
  const getColorStyles = () => {
    switch (pkg.color) {
      case "blue":
        return {
          bgGradient: "from-blue-500 to-blue-600",
          lightBg: "bg-blue-900/20",
          borderColor: "border-blue-500/30",
          textColor: "text-blue-400",
          hoverBg: "hover:from-blue-600 hover:to-blue-700",
        }
      case "green":
        return {
          bgGradient: "from-green-500 to-green-600",
          lightBg: "bg-green-900/20",
          borderColor: "border-green-500/30",
          textColor: "text-green-400",
          hoverBg: "hover:from-green-600 hover:to-green-700",
        }
      case "purple":
        return {
          bgGradient: "from-purple-500 to-purple-600",
          lightBg: "bg-purple-900/20",
          borderColor: "border-purple-500/30",
          textColor: "text-purple-400",
          hoverBg: "hover:from-purple-600 hover:to-purple-700",
        }
      case "red":
        return {
          bgGradient: "from-red-500 to-red-600",
          lightBg: "bg-red-900/20",
          borderColor: "border-red-500/30",
          textColor: "text-red-400",
          hoverBg: "hover:from-red-600 hover:to-red-700",
        }
      default:
        return {
          bgGradient: "from-blue-500 to-blue-600",
          lightBg: "bg-blue-900/20",
          borderColor: "border-blue-500/30",
          textColor: "text-blue-400",
          hoverBg: "hover:from-blue-600 hover:to-blue-700",
        }
    }
  }

  const colorStyles = getColorStyles()

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card
        className={`bg-slate-700 border-2 ${pkg.popular ? `${colorStyles.borderColor} shadow-lg` : "border-slate-600"} transition-all duration-300 hover:shadow-2xl group h-full`}
      >
        {pkg.popular && (
          <div className="absolute -right-12 top-6 w-40 transform rotate-45 bg-gradient-to-r from-green-500 to-green-600 py-1 text-center text-xs font-semibold text-white shadow-md z-10">
            Populer
          </div>
        )}

        <CardHeader className={`${colorStyles.lightBg} text-center`}>
          <div className="flex items-center justify-center mb-2">
            <Zap className={`h-6 w-6 ${colorStyles.textColor}`} />
          </div>
          <CardTitle className="text-xl font-bold text-white">
            {areaName ? `${areaName} ` : ""}
            {pkg.type} {pkg.speed}MBPS
          </CardTitle>
          <div className="mt-4 flex items-baseline justify-center">
            <span className="text-3xl font-bold text-white">Rp. {pkg.price}</span>
            <span className="ml-1 text-gray-400">/bulan</span>
          </div>
          {pkg.type === "SOHO DEDICATED" && (
            <Badge variant="secondary" className="mt-2 bg-slate-600 text-white">
              Dedicated Line
            </Badge>
          )}
        </CardHeader>

        <CardContent className="p-6">
          <ul className="mb-6 space-y-3">
            {pkg.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className={`mr-3 rounded-full p-1 ${colorStyles.lightBg}`}>
                  <Check className={`h-4 w-4 ${colorStyles.textColor}`} />
                </div>
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          {showCTA && (
            <div className="space-y-2">
              {onSelect ? (
                <Button
                  onClick={() => onSelect(pkg)}
                  className={`w-full bg-gradient-to-r ${colorStyles.bgGradient} ${colorStyles.hoverBg} text-white transition-all duration-300 shadow-md hover:shadow-lg`}
                >
                  Pilih Paket
                </Button>
              ) : (
                <Link href="/berlangganan">
                  <Button
                    className={`w-full bg-gradient-to-r ${colorStyles.bgGradient} ${colorStyles.hoverBg} text-white transition-all duration-300 shadow-md hover:shadow-lg`}
                  >
                    Berlangganan Sekarang
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>

        <div
          className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${colorStyles.bgGradient} transform transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-left`}
        ></div>
      </Card>
    </motion.div>
  )
}
