import { SectionTitle } from "../shared/section-title"
import { Lightbulb, Palette, Code, Rocket } from "lucide-react"

export function ProcessSection() {
  const processes = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Concept & Planning",
      description: "Brainstorming ideas, market research, and creating detailed game design documents.",
      duration: "1-2 Weeks",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Design & Prototyping",
      description: "Creating art style, UI mockups, and gameplay prototypes for concept validation.",
      duration: "2-4 Weeks",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Development & Testing",
      description: "Coding, asset integration, and continuous testing to ensure quality.",
      duration: "8-16 Weeks",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Launch & Support",
      description: "Publishing to platforms, marketing support, and post-launch maintenance.",
      duration: "Ongoing",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle title="Our Work Process" subtitle="Proven methodology for delivering high-quality games" />

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-purple-500 hidden lg:block" />

          <div className="space-y-12">
            {processes.map((process, index) => (
              <div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"}`}>
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors">
                    <div className="flex items-center mb-4">
                      <div className="text-cyan-400 mr-4">{process.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{process.title}</h3>
                        <span className="text-sm text-purple-400">{process.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-300">{process.description}</p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="hidden lg:flex w-2/12 justify-center">
                  <div className="w-4 h-4 bg-cyan-500 rounded-full border-4 border-black" />
                </div>

                <div className="w-full lg:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
