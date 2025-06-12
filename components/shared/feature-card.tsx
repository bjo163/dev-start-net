"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  color?: "blue" | "green" | "purple" | "red"
  delay?: number
}

export function FeatureCard({ icon, title, description, color = "blue", delay = 0 }: FeatureCardProps) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-100",
      icon: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-100",
      icon: "text-green-600",
      iconBg: "bg-green-100",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-100",
      icon: "text-purple-600",
      iconBg: "bg-purple-100",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-100",
      icon: "text-red-600",
      iconBg: "bg-red-100",
    },
  }

  const colors = colorClasses[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      <Card className={`${colors.bg} ${colors.border} shadow-lg hover:shadow-xl transition-all duration-300 group`}>
        <CardHeader className="text-center pb-3">
          <motion.div
            className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${colors.iconBg}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className={colors.icon}>{icon}</div>
          </motion.div>
          <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-center text-gray-600">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}
