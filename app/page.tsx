"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { useStore } from "@/components/store-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const { t, language } = useLanguage()
  const { products } = useStore()
  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight
  const whatsappNumber = "201113375019"

  const handleOrderNow = (productName: string) => {
    const message = encodeURIComponent(`مرحباً، أود طلب: ${productName}`)
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2012.19.32%20PM%20%281%29-Suyg2E0hNVxKlFVpj8OjYJ3PARL6io.jpeg"
              alt="MOANAÀ Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              {t("الرئيسية", "Home")}
            </Link>
            <Link href="#products" className="text-sm font-medium transition-colors hover:text-primary">
              {t("المنتجات", "Products")}
            </Link>
            <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
              {t("اتصل بنا", "Contact")}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <Link href="/admin/login">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                {t("لوحة التحكم", "Admin Panel")}
                <ArrowIcon className={`${language === "ar" ? "mr-1" : "ml-1"} h-4 w-4`} />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 hero-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
                  MOANAÀ
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t("منتجات العناية بالبشرة والشعر الطبيعية ١٠٠٪", "100% Natural Skin & Hair Care Products")}
                </p>
                <p className="mx-auto max-w-[600px] text-muted-foreground">
                  {t(
                    "منتجات خالية من المواد الكيميائية الضارة، مصنوعة من مكونات طبيعية عالية الجودة",
                    "Free from harmful chemicals, made with high-quality natural ingredients",
                  )}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                <Link href="#products">
                  <Button className="w-full btn-primary-gradient" size="lg">
                    {t("تصفح منتجاتنا", "Browse Our Products")}
                  </Button>
                </Link>
                <Link href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full" variant="outline" size="lg">
                    <i className="fab fa-whatsapp mr-2"></i>
                    {t("تواصل معنا", "Contact Us")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg transition-all hover:bg-background">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <i className="fas fa-leaf text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold">{t("١٠٠٪ طبيعي", "100% Natural")}</h3>
                <p className="text-muted-foreground">
                  {t(
                    "منتجاتنا مصنوعة من مكونات طبيعية عالية الجودة",
                    "Our products are made with high-quality natural ingredients",
                  )}
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg transition-all hover:bg-background">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <i className="fas fa-heart text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold">{t("آمن للبشرة", "Skin-Friendly")}</h3>
                <p className="text-muted-foreground">
                  {t(
                    "خالٍ من المواد الكيميائية الضارة ومناسب لجميع أنواع البشرة",
                    "Free from harmful chemicals and suitable for all skin types",
                  )}
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg transition-all hover:bg-background">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <i className="fas fa-award text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold">{t("جودة عالية", "Premium Quality")}</h3>
                <p className="text-muted-foreground">
                  {t(
                    "منتجات مختبرة ومضمونة لتقديم أفضل النتائج",
                    "Tested and guaranteed products for the best results",
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                  {t("منتجاتنا", "Our Products")}
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t(
                    "اكتشف مجموعتنا من منتجات العناية بالبشرة والشعر الطبيعية عالية الجودة",
                    "Discover our collection of high-quality natural skin and hair care products",
                  )}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="block h-full">
                  <ProductCard product={product} onOrderNow={handleOrderNow} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                  {t("آراء عملائنا", "Customer Testimonials")}
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t("اكتشف ما يقوله عملاؤنا عن منتجاتنا", "Discover what our customers say about our products")}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="bg-muted/20 p-6 rounded-lg border shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t("سارة أحمد", "Sarah Ahmed")}</h4>
                    <div className="text-yellow-500">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {t(
                    "استخدمت بادي سبلاش موانا وأحببت الرائحة! تدوم طوال اليوم وهي لطيفة على بشرتي الحساسة.",
                    "I used MOANAÀ Body Splash and loved the fragrance! It lasts all day and is gentle on my sensitive skin.",
                  )}
                </p>
              </div>
              <div className="bg-muted/20 p-6 rounded-lg border shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t("نورا محمد", "Noura Mohamed")}</h4>
                    <div className="text-yellow-500">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {t(
                    "زيت الشعر من موانا غير شعري تمامًا! أصبح أكثر نعومة ولمعانًا، وقل تساقط الشعر بشكل ملحوظ.",
                    "MOANAÀ Hair Oil completely transformed my hair! It's smoother, shinier, and hair fall has noticeably reduced.",
                  )}
                </p>
              </div>
              <div className="bg-muted/20 p-6 rounded-lg border shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t("ليلى خالد", "Layla Khaled")}</h4>
                    <div className="text-yellow-500">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {t(
                    "ليب بالم موانا هو المنقذ لشفاهي في فصل الشتاء! يرطب بعمق ويدوم لفترة طويلة.",
                    "MOANAÀ Lip Balm is a savior for my lips in winter! It deeply moisturizes and lasts for a long time.",
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                  {t("الأسئلة الشائعة", "Frequently Asked Questions")}
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t("إجابات على الأسئلة الأكثر شيوعًا", "Answers to the most common questions")}
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-8 space-y-4">
              <div className="bg-background p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                  {t("هل منتجات موانا مناسبة للبشرة الحساسة؟", "Are MOANAÀ products suitable for sensitive skin?")}
                </h3>
                <p className="text-muted-foreground">
                  {t(
                    "نعم، جميع منتجاتنا مصنوعة من مكونات طبيعية وخالية من المواد الكيميائية القاسية، مما يجعلها مناسبة للبشرة الحساسة.",
                    "Yes, all our products are made with natural ingredients and free from harsh chemicals, making them suitable for sensitive skin.",
                  )}
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                  {t("كم تستغرق عملية التوصيل؟", "How long does delivery take?")}
                </h3>
                <p className="text-muted-foreground">
                  {t(
                    "يتم التوصيل عادة خلال 2-5 أيام عمل، اعتمادًا على موقعك.",
                    "Delivery usually takes 2-5 business days, depending on your location.",
                  )}
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                  {t("هل يمكنني إرجاع المنتج إذا لم يناسبني؟", "Can I return a product if it doesn't suit me?")}
                </h3>
                <p className="text-muted-foreground">
                  {t(
                    "نعم، لدينا سياسة إرجاع لمدة 14 يومًا. يرجى التواصل معنا عبر واتساب للحصول على تفاصيل الإرجاع.",
                    "Yes, we have a 14-day return policy. Please contact us via WhatsApp for return details.",
                  )}
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                  {t("هل منتجاتكم مختبرة على الحيوانات؟", "Are your products tested on animals?")}
                </h3>
                <p className="text-muted-foreground">
                  {t(
                    "لا، منتجاتنا غير مختبرة على الحيوانات. نحن نؤمن بالجمال الأخلاقي والمستدام.",
                    "No, our products are not tested on animals. We believe in ethical and sustainable beauty.",
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                  {t("تواصل معنا", "Contact Us")}
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t("نحن هنا للإجابة على استفساراتك", "We're here to answer your questions")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-[#25D366] hover:bg-[#128C7E]">
                    <i className="fab fa-whatsapp mr-2"></i>
                    {t("واتساب", "WhatsApp")}
                  </Button>
                </Link>
                <Link href="https://www.instagram.com/moan_aa2021" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-[#E1306C] hover:bg-[#C13584]">
                    <i className="fab fa-instagram mr-2"></i>
                    {t("انستجرام", "Instagram")}
                  </Button>
                </Link>
                <Link href={`tel:+${whatsappNumber}`}>
                  <Button className="w-full">
                    <i className="fas fa-phone mr-2"></i>
                    {t("اتصل بنا", "Call Us")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-primary">
                  {t("انضم إلى قائمتنا البريدية", "Join Our Newsletter")}
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground">
                  {t(
                    "اشترك للحصول على آخر الأخبار والعروض الحصرية والنصائح للعناية بالبشرة والشعر",
                    "Subscribe for the latest news, exclusive offers, and skin & hair care tips",
                  )}
                </p>
              </div>
              <div className="w-full max-w-md">
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder={t("أدخل بريدك الإلكتروني", "Enter your email")}
                    className="flex-1"
                    required
                  />
                  <Button type="submit">{t("اشتراك", "Subscribe")}</Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2">
                  {t("لن نشارك بريدك الإلكتروني مع أي جهة خارجية.", "We'll never share your email with anyone else.")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-8 md:py-12 bg-muted/20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2012.19.32%20PM%20%281%29-Suyg2E0hNVxKlFVpj8OjYJ3PARL6io.jpeg"
                  alt="MOANAÀ Logo"
                  width={80}
                  height={80}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {t("منتجات العناية بالبشرة والشعر الطبيعية ١٠٠٪", "100% Natural Skin & Hair Care Products")}
              </p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <Link
                  href="https://www.instagram.com/moan_aa2021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <i className="fab fa-instagram text-xl"></i>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                  <span className="sr-only">WhatsApp</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <i className="fab fa-facebook text-xl"></i>
                  <span className="sr-only">Facebook</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">{t("روابط سريعة", "Quick Links")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary">
                    {t("الرئيسية", "Home")}
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-muted-foreground hover:text-primary">
                    {t("المنتجات", "Products")}
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-muted-foreground hover:text-primary">
                    {t("اتصل بنا", "Contact Us")}
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="text-muted-foreground hover:text-primary">
                    {t("لوحة التحكم", "Admin Panel")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">{t("منتجاتنا", "Our Products")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#products" className="text-muted-foreground hover:text-primary">
                    {t("بادي سبلاش", "Body Splash")}
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-muted-foreground hover:text-primary">
                    {t("بادي لوشن", "Body Lotion")}
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-muted-foreground hover:text-primary">
                    {t("ليب بالم", "Lip Balm")}
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-muted-foreground hover:text-primary">
                    {t("زيت الشعر", "Hair Oil")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">{t("تواصل معنا", "Contact Us")}</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-2 text-primary"></i>
                  <span className="text-muted-foreground">{t("القاهرة، مصر", "Cairo, Egypt")}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-phone mt-1 mr-2 text-primary"></i>
                  <Link href={`tel:+${whatsappNumber}`} className="text-muted-foreground hover:text-primary">
                    {`+${whatsappNumber}`}
                  </Link>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-envelope mt-1 mr-2 text-primary"></i>
                  <Link href="mailto:info@moanaa.com" className="text-muted-foreground hover:text-primary">
                    info@moanaa.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {t("© 2024 MOANAÀ. جميع الحقوق محفوظة.", "© 2024 MOANAÀ. All rights reserved.")}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                {t("سياسة الخصوصية", "Privacy Policy")}
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                {t("الشروط والأحكام", "Terms & Conditions")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProductCard({
  product,
  onOrderNow,
}: {
  product: {
    id: string
    name: string
    arabicName?: string
    englishName?: string
    description: string
    arabicDescription?: string
    englishDescription?: string
    imageUrl: string
    price?: string
    isNew?: boolean
    isBestseller?: boolean
    details?: string
  }
  onOrderNow: (productName: string) => void
}) {
  const { t, language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  // Get the appropriate name and description based on language
  const productName = language === "ar" ? product.arabicName || product.name : product.englishName || product.name
  const productDescription =
    language === "ar"
      ? product.arabicDescription || product.description
      : product.englishDescription || product.description

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg product-card h-full flex flex-col">
      <div className="aspect-square relative">
        <Image
          src={product.imageUrl || "/placeholder.svg?height=300&width=300"}
          alt={productName}
          fill
          className="object-cover"
        />
        {product.isNew && <Badge className="absolute top-2 right-2 bg-primary">{t("جديد", "New")}</Badge>}
      </div>

      <CardContent className="p-4 flex flex-col justify-between flex-grow">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold line-clamp-1">{productName}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{productDescription}</p>
          {product.isBestseller && <Badge variant="secondary">{t("الأكثر مبيعًا", "Bestseller")}</Badge>}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-bold">{product.price}</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                {t("المزيد", "More")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{productName}</DialogTitle>
                <DialogDescription>
                  {productDescription}
                  <br />
                  {product.details}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    {t("الاسم", "Name")}
                  </label>
                  <Input id="name" value="Customer Name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right">
                    {t("البريد الإلكتروني", "Email")}
                  </label>
                  <Input id="email" value="test@example.com" className="col-span-3" />
                </div>
              </div>
              <Button onClick={() => onOrderNow(productName)}>{t("اطلب الآن", "Order Now")}</Button>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

