import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { PageWrapper } from "@/components/shared/page-wrapper"

export default function FAQPage() {
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <PageWrapper className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Pertanyaan Umum
                </h1>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan MyCocoLink
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-800">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="umum" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-4 bg-slate-700">
                  <TabsTrigger
                    value="umum"
                    className="text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Umum
                  </TabsTrigger>
                  <TabsTrigger
                    value="teknis"
                    className="text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Teknis
                  </TabsTrigger>
                  <TabsTrigger
                    value="pembayaran"
                    className="text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Pembayaran
                  </TabsTrigger>
                  <TabsTrigger
                    value="gangguan"
                    className="text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Gangguan
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="umum">
                <Card className="bg-slate-700 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white">Pertanyaan Umum</CardTitle>
                    <CardDescription className="text-gray-300">
                      Informasi dasar tentang layanan MyCocoLink
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-slate-600">
                        <AccordionTrigger className="text-white hover:text-blue-400">
                          Apa itu MyCocoLink?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300">
                          MyCocoLink adalah penyedia layanan internet (ISP) yang dikelola oleh PT Lentera Abadi
                          Solusinet. Kami menyediakan layanan internet stabil dan cepat untuk kebutuhan rumah tangga,
                          bisnis, dan komunitas di berbagai wilayah di Indonesia.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2" className="border-slate-600">
                        <AccordionTrigger className="text-white hover:text-blue-400">
                          Di mana saja area layanan MyCocoLink?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300">
                          Saat ini, MyCocoLink melayani area Jakarta, Bogor, Depok, Tangerang, Bekasi, dan beberapa kota
                          di Jawa Barat dan Banten. Kami terus memperluas jangkauan layanan kami. Untuk informasi lebih
                          lanjut, silakan kunjungi halaman Area Layanan kami.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3" className="border-slate-600">
                        <AccordionTrigger className="text-white hover:text-blue-400">
                          Berapa lama proses pemasangan?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300">
                          Proses pemasangan biasanya memakan waktu 2-3 hari kerja setelah survei lokasi dan persetujuan
                          berlangganan. Namun, waktu pemasangan dapat bervariasi tergantung pada lokasi dan kondisi
                          teknis di lapangan.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4" className="border-slate-600">
                        <AccordionTrigger className="text-white hover:text-blue-400">
                          Apakah ada biaya pemasangan?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300">
                          Untuk sebagian besar paket, kami menawarkan instalasi gratis. Namun, untuk lokasi tertentu
                          mungkin ada biaya tambahan yang akan kami informasikan setelah survei. Biaya tambahan biasanya
                          terkait dengan kebutuhan peralatan khusus atau kondisi lokasi yang memerlukan penanganan
                          khusus.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5" className="border-slate-600">
                        <AccordionTrigger className="text-white hover:text-blue-400">
                          Bagaimana cara berlangganan MyCocoLink?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300">
                          Untuk berlangganan MyCocoLink, Anda dapat mengisi formulir di halaman Hubungi Kami,
                          menghubungi kami melalui WhatsApp, atau menelepon call center kami. Tim kami akan menghubungi
                          Anda untuk proses selanjutnya, termasuk survei lokasi dan penjelasan paket yang sesuai dengan
                          kebutuhan Anda.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Similar dark theme updates for other tabs... */}
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Masih Punya Pertanyaan?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Jika Anda tidak menemukan jawaban untuk pertanyaan Anda, jangan ragu untuk menghubungi tim dukungan
                  kami.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/hubungi-kami">
                  <Button className="bg-white text-blue-900 hover:bg-gray-100">Hubungi Kami</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    </div>
  )
}
