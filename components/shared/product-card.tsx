import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PrimaryButton } from "./primary-button"
import Image from "next/image"
import { Star, ShoppingCart, Eye, Clock, CheckCircle } from "lucide-react"

interface ProductCardProps {
  title: string
  description: string
  price: string
  originalPrice?: string
  image: string
  category: string
  rating: number
  downloads: number
  features?: string[]
}

export function ProductCard({
  title,
  description,
  price,
  originalPrice,
  image,
  category,
  rating,
  downloads,
  features = [],
}: ProductCardProps) {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "development":
        return "bg-blue-500/20 border-blue-500 text-blue-400"
      case "hosting":
        return "bg-green-500/20 border-green-500 text-green-400"
      case "maintenance":
        return "bg-orange-500/20 border-orange-500 text-orange-400"
      case "premium":
        return "bg-purple-500/20 border-purple-500 text-purple-400"
      case "addons":
        return "bg-yellow-500/20 border-yellow-500 text-yellow-400"
      default:
        return "bg-cyan-500/20 border-cyan-500 text-cyan-400"
    }
  }

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "development":
        return "DEV"
      case "hosting":
        return "HOST"
      case "maintenance":
        return "MAINT"
      case "premium":
        return "VIP"
      case "addons":
        return "ADD"
      default:
        return "PKG"
    }
  }

  return (
    <div className="hud-panel hover:hud-panel-active transition-all duration-300 group">
      <Card className="bg-transparent border-none">
        <div className="relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={300}
            height={200}
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <Badge className={`absolute top-3 left-3 hud-font-primary ${getCategoryColor(category)}`}>
            [{getCategoryIcon(category)}]
          </Badge>

          {originalPrice && (
            <div className="absolute top-3 right-3 hud-panel p-1">
              <span className="hud-font-primary text-xs text-red-400">PROMO</span>
            </div>
          )}

          {/* Popularity indicator */}
          <div className="absolute bottom-3 right-3 hud-panel p-1">
            <span className="hud-font-primary text-xs text-cyan-400">{downloads} ORDERS</span>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Product Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="hud-font-title text-base md:text-lg text-cyan-400 hud-text-glow">{title}</h3>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="hud-value text-xs">{rating}</span>
            </div>
          </div>

          <p className="hud-font-primary text-xs md:text-sm text-gray-300 mb-4 line-clamp-2">{description}</p>

          {/* Features List */}
          {features.length > 0 && (
            <div className="mb-4">
              <div className="hud-label text-xs mb-2">[FEATURES]</div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center text-xs">
                    <CheckCircle className="w-3 h-3 text-cyan-400 mr-2 flex-shrink-0" />
                    <span className="hud-font-primary text-gray-300">{feature}</span>
                  </div>
                ))}
                {features.length > 4 && (
                  <div className="hud-font-primary text-xs text-cyan-400">+{features.length - 4} more features...</div>
                )}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="hud-font-display text-lg md:text-xl hud-price">{price}</span>
              {originalPrice && (
                <span className="hud-font-primary text-xs md:text-sm text-gray-500 line-through">{originalPrice}</span>
              )}
            </div>
            <div className="flex items-center text-xs text-green-400">
              <Clock className="w-3 h-3 mr-1" />
              <span className="hud-font-primary">FAST_DELIVERY</span>
            </div>
          </div>

          {/* Action Buttons - Fixed centering */}
          <div className="flex flex-col sm:flex-row gap-2">
            <PrimaryButton size="sm" className="flex-1 hud-font-primary justify-center">
              <ShoppingCart className="w-3 h-3 mr-1" />
              [ORDER_NOW]
            </PrimaryButton>
            <PrimaryButton variant="outline" size="sm" className="flex-1 hud-font-primary justify-center">
              <Eye className="w-3 h-3 mr-1" />
              [DETAILS]
            </PrimaryButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
