import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Play } from "lucide-react"

interface PortfolioCardProps {
  title: string
  description: string
  image: string
  platform: string
  category: string
  videoUrl?: string
}

export function PortfolioCard({ title, description, image, platform, category, videoUrl }: PortfolioCardProps) {
  return (
    <div className="hud-panel hover:hud-panel-active transition-all duration-300 group">
      <Card className="bg-transparent border-none overflow-hidden">
        <div className="relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {videoUrl && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Play className="w-12 h-12 text-white" />
            </div>
          )}
          <Badge className="absolute top-3 right-3 bg-cyan-500 text-black">{platform}</Badge>
        </div>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg md:text-xl font-bold text-cyan-400 hud-text-glow">{title}</h3>
            <Badge variant="outline" className="border-purple-500 text-purple-400">
              {category}
            </Badge>
          </div>
          <p className="text-gray-300 text-sm md:text-base">{description}</p>
        </CardContent>
      </Card>
    </div>
  )
}
