import { SectionTitle } from "../shared/section-title"
import { ContactForm } from "../shared/contact-form"
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react"

export function ContactSection() {
  const contactInfo = [
    {
      icon: <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />,
      title: "WhatsApp",
      content: "+62 812-3456-7890",
      description: "Direct chat for quick consultation",
    },
    {
      icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Email",
      content: "hello@start-g.com",
      description: "Send your project details",
    },
    {
      icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Location",
      content: "Jakarta, Indonesia",
      description: "Meetings can be arranged as needed",
    },
    {
      icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Working Hours",
      content: "09:00 - 18:00 WIB",
      description: "Monday - Friday (Weekend by appointment)",
    },
  ]

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Contact Us"
          subtitle="Ready to bring your game idea to life? Let&apos;s discuss your dream project with the Start-G team"
          sectionCode="CONTACT"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Let&apos;s Collaborate!</h3>
            <p className="text-gray-300 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
              Have a cool game idea? Or need help developing an existing project? The Start-G team is ready to help
              realize your game vision with cutting-edge technology and unlimited creativity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3 md:space-x-4">
                  <div className="text-cyan-400 mt-1">{info.icon}</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm md:text-base">{info.title}</h4>
                    <p className="text-cyan-400 font-medium mb-1 text-sm md:text-base">{info.content}</p>
                    <p className="text-gray-400 text-xs md:text-sm">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg">
              <h4 className="text-white font-semibold mb-2 text-sm md:text-base">🎮 Free Consultation</h4>
              <p className="text-gray-300 text-xs md:text-sm">
                Free consultation to discuss ideas, budget estimates, and project timeline. No commitment, just pure
                brainstorming session!
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
