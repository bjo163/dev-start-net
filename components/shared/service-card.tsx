import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ElectricBorder } from "../effects/electric-border"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  className?: string
}

export function ServiceCard({ icon, title, description, features, className }: ServiceCardProps) {
  return (
    <ElectricBorder className="rounded-lg">
      <Card
        className={cn(
          "bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/20",
          className,
        )}
      >
        <CardContent className="p-6">
          <div className="text-cyan-500 mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
          <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-400 flex items-center">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </ElectricBorder>
  )
}
