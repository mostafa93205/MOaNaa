"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { useStore } from "@/components/store-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, ShoppingCart, Heart, Share2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { t, language } = useLanguage()
  const { products } = useStore()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const ArrowIcon = language === "ar" ? ArrowRight : ArrowLeft
  const whatsappNumber = "201113375019"

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === params.id)
      if (foundProduct) {
        setProduct(foundProduct)
      } else {
        // Product not found, redirect to products page
        router.push("/#products")
      }
      setLoading(false)
    }
  }, [products, params.id, router])

  const handleOrderNow = () => {
    const productName = language === "ar" ? product.arabicName || product.name : product.englishName || product.name
    const message = encodeURIComponent(`مرحباً، أود طلب: ${productName} - الكمية: ${quantity}`)
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">{t("جاري التحميل...", "Loading...")}</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">{t("المنتج غير موجود", "Product Not Found")}</h1>
          <p className="text-muted-foreground">
            {t("لم يتم العثور على المنتج المطلوب", "The requested product was not found")}
          </p>
          <Link href="/#products">
            <Button>{t("العودة إلى المنتجات", "Back to Products")}</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Get the appropriate name, description and details based on language
  const productName = language === "ar" ? product.arabicName || product.name : product.englishName || product.name
  const productDescription =
    language === "ar"
      ? product.arabicDescription || product.description
      : product.englishDescription || product.description
  const productDetails =
    language === "ar" ? product.arabicDetails || product.details : product.englishDetails || product.details

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowIcon className="h-5 w-5" />
            <span>{t("العودة إلى الرئيسية", "Back to Home")}</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={product.imageUrl || "/placeholder.svg?height=600&width=600"}
                alt={productName}
                fill
                className="object-cover"
                priority
              />
              {product.isNew && <Badge className="absolute top-4 right-4 bg-primary">{t("جديد", "New")}</Badge>}
              {product.isBestseller && (
                <Badge className="absolute top-4 left-4 bg-amber-500">{t("الأكثر مبيعًا", "Bestseller")}</Badge>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{productName}</h1>
                <p className="text-xl font-semibold text-primary mt-2">{product.price}</p>
              </div>

              <p className="text-muted-foreground">{productDescription}</p>

              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">{t("الوصف", "Description")}</TabsTrigger>
                  <TabsTrigger value="details">{t("التفاصيل", "Details")}</TabsTrigger>
                  <TabsTrigger value="shipping">{t("الشحن", "Shipping")}</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4 space-y-4">
                  <p>{productDescription}</p>
                </TabsContent>
                <TabsContent value="details" className="mt-4 space-y-4">
                  <p>{productDetails}</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>{t("منتج طبيعي 100%", "100% natural product")}</li>
                    <li>{t("خالي من المواد الضارة", "Free from harmful substances")}</li>
                    <li>{t("مناسب لجميع أنواع البشرة", "Suitable for all skin types")}</li>
                    <li>{t("تم اختباره سريريًا", "Clinically tested")}</li>
                  </ul>
                </TabsContent>
                <TabsContent value="shipping" className="mt-4 space-y-4">
                  <p>{t("يتم شحن المنتجات في غضون 2-3 أيام عمل.", "Products are shipped within 2-3 business days.")}</p>
                  <p>{t("رسوم الشحن تعتمد على الموقع.", "Shipping fees depend on location.")}</p>
                </TabsContent>
              </Tabs>

              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    -
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10">
                    +
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1" onClick={handleOrderNow}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t("اطلب الآن", "Order Now")}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Heart className="mr-2 h-4 w-4" />
                  {t("أضف للمفضلة", "Add to Favorites")}
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">{t("منتجات ذات صلة", "Related Products")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products
                .filter((p) => p.id !== product.id && p.category === product.category)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Card
                    key={relatedProduct.id}
                    className="overflow-hidden transition-all hover:shadow-lg product-card h-full flex flex-col"
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={relatedProduct.imageUrl || "/placeholder.svg?height=300&width=300"}
                        alt={
                          language === "ar"
                            ? relatedProduct.arabicName || relatedProduct.name
                            : relatedProduct.englishName || relatedProduct.name
                        }
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-lg">
                        {language === "ar"
                          ? relatedProduct.arabicName || relatedProduct.name
                          : relatedProduct.englishName || relatedProduct.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {language === "ar"
                          ? relatedProduct.arabicDescription || relatedProduct.description
                          : relatedProduct.englishDescription || relatedProduct.description}
                      </p>
                      <div className="mt-auto pt-4 flex justify-between items-center">
                        <span className="font-bold text-primary">{relatedProduct.price}</span>
                        <Link href={`/products/${relatedProduct.id}`}>
                          <Button variant="outline" size="sm">
                            {t("عرض المنتج", "View Product")}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container flex flex-col md:flex-row justify-between items-center">
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
      </footer>
    </div>
  )
}

