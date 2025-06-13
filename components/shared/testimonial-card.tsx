import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

export function TestimonialCard({ name, role, company, content, rating, avatar }: TestimonialCardProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-current" : "text-gray-600"}`} />
          ))}
        </div>
        <p className="text-gray-300 mb-6 italic">&ldquo;{content}&rdquo;</p>
        <div className="flex items-center">
          <Avatar className="mr-3">
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-white font-semibold">{name}</h4>
            <p className="text-gray-400 text-sm">
              {role} - {company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
