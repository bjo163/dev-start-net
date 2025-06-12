import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="container px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mycocolink-logo2.png-B2yjQCIBHrLWvz6pgHokXUr94WGHHL.webp"
                alt="MyCocoLink Logo"
                width={150}
                height={40}
              />
            </Link>
            <p className="max-w-xs text-gray-400">
              PT Lentera Abadi Solusinet - Penyedia layanan internet stabil dan cepat untuk rumah dan bisnis Anda.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Layanan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/layanan/rumah" className="text-gray-400 hover:text-white">
                  Paket Rumah
                </Link>
              </li>
              <li>
                <Link href="/layanan/bisnis" className="text-gray-400 hover:text-white">
                  Paket Bisnis
                </Link>
              </li>
              <li>
                <Link href="/layanan/komunitas" className="text-gray-400 hover:text-white">
                  Paket Komunitas
                </Link>
              </li>
              <li>
                <Link href="/coverage" className="text-gray-400 hover:text-white">
                  Cek Area Layanan
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Perusahaan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tentang-kami" className="text-gray-400 hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/karir" className="text-gray-400 hover:text-white">
                  Karir
                </Link>
              </li>
              <li>
                <Link href="/promo" className="text-gray-400 hover:text-white">
                  Promo
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/hubungi-kami" className="text-gray-400 hover:text-white">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Kontak</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <span className="text-gray-400">Jl. Teknologi No. 123, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">0800-1234-5678</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">info@mycocolink.id</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} PT Lentera Abadi Solusinet. Hak Cipta Dilindungi.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <Link href="/kebijakan-privasi" className="hover:text-white">
                Kebijakan Privasi
              </Link>
              <Link href="/syarat-ketentuan" className="hover:text-white">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>NIB: 1234567890 | Izin Penyelenggara Jasa Internet (ISP): 123/ISP/KOMINFO/2023</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
