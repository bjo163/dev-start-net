import { SectionTitle } from "../shared/section-title"
import { TestimonialCard } from "../shared/testimonial-card"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Andi Pratama",
      role: "CEO",
      company: "GameStudio Indonesia",
      content:
        "Start-G successfully developed our mobile game with quality that exceeded expectations. Their team is very professional and responsive to feedback.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Sarah Wijaya",
      role: "Product Manager",
      company: "TechCorp",
      content:
        "The experience working with Start-G was very satisfying. They not only develop games, but also provide valuable insights for monetization strategy.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Budi Santoso",
      role: "Indie Developer",
      company: "Solo Game Dev",
      content:
        "As an indie developer, I was greatly helped by Start-G's assets and plugins. The quality is top and the price is very reasonable!",
      rating: 4,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Maya Sari",
      role: "Creative Director",
      company: "Digital Agency",
      content:
        "Start-G team understands our vision well and is able to translate it into engaging gameplay. Highly recommended!",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Rizki Hakim",
      role: "Startup Founder",
      company: "EduTech Startup",
      content:
        "The educational game developed by Start-G received positive response from users. They really understand user experience and engagement.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Dina Kartika",
      role: "Marketing Manager",
      company: "Entertainment Co",
      content:
        "Transparent development process and satisfying results. Start-G is a reliable partner for long-term projects.",
      rating: 4,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Client Testimonials"
          subtitle="What they say about those who have entrusted their game projects to us"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
