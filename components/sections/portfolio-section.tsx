import { SectionTitle } from "../shared/section-title"
import { PortfolioCard } from "../shared/portfolio-card"

export function PortfolioSection() {
  const projects = [
    {
      title: "Neon Runner",
      description: "Endless runner game with stunning cyberpunk visuals and addictive gameplay.",
      image: "/portfolio-neon-runner.png",
      platform: "Mobile",
      category: "Action",
      videoUrl: "#",
    },
    {
      title: "RF Online",
      description: "Sci-fi MMORPG with faction war system, mech combat, and complex mining mechanics.",
      image: "/portfolio-rf-online.png",
      platform: "PC",
      category: "MMORPG",
      videoUrl: "#",
    },
    {
      title: "Space Defender VR",
      description: "Tower defense game in virtual reality with immersive experience.",
      image: "/portfolio-space-defender.png",
      platform: "VR",
      category: "Strategy",
      videoUrl: "#",
    },
    {
      title: "Puzzle Quest",
      description: "Puzzle game with innovative mechanics and challenging level design.",
      image: "/portfolio-puzzle-quest.png",
      platform: "Web",
      category: "Puzzle",
      videoUrl: "#",
    },
    {
      title: "Racing Legends",
      description: "Racing game with realistic physics and deep customization.",
      image: "/portfolio-racing-legends.png",
      platform: "Mobile",
      category: "Racing",
      videoUrl: "#",
    },
    {
      title: "Dungeon Crawler",
      description: "Roguelike dungeon crawler with procedural generation and loot system.",
      image: "/portfolio-dungeon-crawler.png",
      platform: "PC",
      category: "Roguelike",
      videoUrl: "#",
    },
  ]

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Portfolio"
          subtitle="Collection of games we've developed across various genres and platforms"
          sectionCode="PORTFOLIO"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <PortfolioCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
