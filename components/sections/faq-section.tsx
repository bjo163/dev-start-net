"use client"

import { useState } from "react"
import { SectionTitle } from "../shared/section-title"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How long does it take to develop a game?",
      answer:
        "Development time varies depending on game complexity. Simple mobile games can take 2-4 months, while complex PC/console games can take 8-18 months. We will provide a realistic timeline after requirement analysis.",
    },
    {
      question: "Does Start-G provide maintenance services after game launch?",
      answer:
        "Yes, we provide post-launch maintenance and support services including bug fixes, content updates, and technical support. Maintenance packages can be customized according to project needs.",
    },
    {
      question: "What platforms are supported for game development?",
      answer:
        "We develop games for various platforms: Mobile (iOS/Android), PC (Windows/Mac/Linux), Web (WebGL), Console (PlayStation/Xbox/Nintendo Switch), and VR/AR (Oculus/HTC Vive/ARKit/ARCore).",
    },
    {
      question: "How is the payment system for game development projects?",
      answer:
        "We use a milestone-based payment system. Usually 30% at the beginning, 40% at mid-milestone, and 30% at delivery. Payment terms can be adjusted according to client needs.",
    },
    {
      question: "Can I request special features or customization?",
      answer:
        "Of course! We are very open to customization and special features according to project needs. Our team will help analyze feasibility and provide the best solutions.",
    },
    {
      question: "What about intellectual property (IP) of the developed games?",
      answer:
        "IP is fully owned by the client. We only act as developers and do not claim ownership of the games or assets developed. Everything will be regulated in a clear contract.",
    },
    {
      question: "Does Start-G provide publishing and marketing services?",
      answer:
        "Yes, we have partnerships with various publishers and platforms. We also provide marketing strategy consultation, ASO (App Store Optimization), and campaign management.",
    },
    {
      question: "How to start a project with Start-G?",
      answer:
        "Very easy! Contact us through the contact form or WhatsApp for free consultation. We will discuss your ideas, requirements, budget, and project timeline.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Questions frequently asked about our game development services"
        />

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
