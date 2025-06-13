import { SectionTitle } from "../shared/section-title"
import { Badge } from "@/components/ui/badge"
import { Code, Palette, Gamepad2, Users } from "lucide-react"

export function AboutSection() {
  const tools = [
    "Unity",
    "Unreal Engine",
    "Blender",
    "Maya",
    "Photoshop",
    "Illustrator",
    "C#",
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "Firebase",
  ]

  const values = [
    {
      icon: <Code className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Cutting-Edge Technology",
      description: "Using the latest engines and tools for maximum results",
    },
    {
      icon: <Palette className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Creative Design",
      description: "Experienced artists creating stunning visuals",
    },
    {
      icon: <Gamepad2 className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Engaging Gameplay",
      description: "Focus on user experience and high fun factor",
    },
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Solid Team",
      description: "Passionate developers, artists, and designers",
    },
  ]

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="About Start-G"
          subtitle="Young passionate developer team creating high-quality games"
          sectionCode="ABOUT"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Our Mission</h3>
            <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
              Start-G was founded with the vision of becoming Indonesia&apos;s leading game development studio. We believe
              that games are not just entertainment, but also a medium for storytelling, inspiring, and connecting
              people from all over the world.
            </p>
            <p className="text-gray-300 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
              With a team of experienced developers, artists, and game designers, we are ready to deliver innovative and
              high-quality game development solutions.
            </p>

            <div className="mb-6 md:mb-8">
              <h4 className="text-base md:text-lg font-semibold text-white mb-4">Tools & Technology</h4>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <Badge key={tool} variant="outline" className="border-cyan-500 text-cyan-400">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-4 md:p-6 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors"
              >
                <div className="text-cyan-400 mb-3 md:mb-4">{value.icon}</div>
                <h4 className="text-white font-semibold mb-2 text-sm md:text-base">{value.title}</h4>
                <p className="text-gray-300 text-xs md:text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
