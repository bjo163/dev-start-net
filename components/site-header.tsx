"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ExternalLink, Menu, Zap } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-slate-900/95 shadow-lg border-b border-blue-800/30" : "bg-slate-900/90",
      )}
    >
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mycocolink-logo2.png-B2yjQCIBHrLWvz6pgHokXUr94WGHHL.webp"
              alt="MyCocoLink Logo"
              width={150}
              height={40}
              priority
              className="transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="space-x-1">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "font-medium bg-transparent hover:bg-blue-900/50 hover:text-blue-300 transition-all duration-300 text-white",
                    pathname === "/" && "bg-blue-900/70 text-blue-300 font-semibold",
                  )}
                >
                  <span className="relative z-10">Beranda</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/tentang-kami" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "font-medium bg-transparent hover:bg-blue-900/50 hover:text-blue-300 transition-all duration-300 text-white",
                    pathname === "/tentang-kami" && "bg-blue-900/70 text-blue-300 font-semibold",
                  )}
                >
                  <span className="relative z-10">Tentang Kami</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-medium bg-transparent hover:bg-blue-900/50 hover:text-blue-300 transition-all duration-300 text-white">
                <Zap className="mr-2 h-4 w-4" />
                Layanan
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[500px] p-4 bg-slate-900/95 backdrop-blur-lg border border-blue-800/30 shadow-lg">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-blue-700 p-6 no-underline outline-none focus:shadow-md"
                          href="/layanan"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">Paket Internet MyCocoLink</div>
                          <p className="text-sm leading-tight text-white/90">
                            Temukan paket internet terbaik untuk kebutuhan Anda
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </div>

                    {[
                      {
                        href: "/layanan/rumah",
                        title: "Paket Rumah",
                        desc: "Internet stabil untuk kebutuhan rumah tangga",
                      },
                      { href: "/layanan/bisnis", title: "Paket Bisnis", desc: "Solusi internet untuk UMKM dan bisnis" },
                      {
                        href: "/layanan/komunitas",
                        title: "Paket Komunitas",
                        desc: "Solusi internet untuk perumahan dan komunitas",
                      },
                    ].map((item, index) => (
                      <NavigationMenuLink key={index} asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-blue-900/50 hover:text-blue-300 text-white"
                          href={item.href}
                        >
                          <div className="text-sm font-medium leading-none">{item.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-400">{item.desc}</p>
                        </a>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {[
              { href: "/berlangganan", label: "Berlangganan" },
              { href: "/coverage", label: "Area Layanan" },
              { href: "/promo", label: "Promo" },
              { href: "/faq", label: "FAQ" },
              { href: "/hubungi-kami", label: "Hubungi Kami" },
            ].map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "font-medium bg-transparent hover:bg-blue-900/50 hover:text-blue-300 transition-all duration-300 text-white",
                      pathname === item.href && "bg-blue-900/70 text-blue-300 font-semibold",
                    )}
                  >
                    <span className="relative z-10">{item.label}</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-3">
          <Link
            href="https://portal.mycocolink.com/web/login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block"
          >
            <Button
              variant="outline"
              className="bg-transparent border-blue-400 text-blue-300 hover:bg-blue-900/50 hover:text-blue-200 transition-colors"
            >
              <span>Portal Pelanggan</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="/hubungi-kami" className="hidden md:block">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <span>Hubungi Kami</span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden border-blue-400 bg-transparent text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-900/95 backdrop-blur-lg border-blue-800/30">
              <div className="grid gap-4 py-4">
                {[
                  { href: "/", label: "Beranda" },
                  { href: "/tentang-kami", label: "Tentang Kami" },
                  { href: "/layanan", label: "Layanan" },
                  { href: "/berlangganan", label: "Berlangganan" },
                  { href: "/coverage", label: "Area Layanan" },
                  { href: "/promo", label: "Promo" },
                  { href: "/faq", label: "FAQ" },
                  { href: "/hubungi-kami", label: "Hubungi Kami" },
                  { href: "https://portal.mycocolink.com/web/login", label: "Portal Pelanggan", external: true },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex items-center px-4 py-3 text-lg font-medium text-white rounded-lg hover:bg-blue-900/50 hover:text-blue-300 transition-all duration-300"
                  >
                    {item.label}
                    {item.external && <ExternalLink className="ml-2 h-4 w-4 text-blue-400" />}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
