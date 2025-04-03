"use client"

import { useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { ProductSchema } from "@/components/product-schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface ProductCardProps {
  product: {
    id: string
    name: string
    arabicName?: string
    englishName?: string
    description: string
    arabicDescription?: string
    englishDescription?: string
    imageUrl: string
    category: string
    price?: string
    details?: string
    arabicDetails?: string
    englishDetails?: string
    isNew?: boolean
    isBestseller?: boolean
  }
  onOrderNow: (productName: string) => void
}

export function ProductCard({ product, onOrderNow }: ProductCardProps) {
  const { t, language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  // Get the appropriate name, description and details based on language
  const productName = language === "ar" ? product.arabicName || product.name : product.englishName || product.name

  const productDescription =
    language === "ar"
      ? product.arabicDescription || product.description
      : product.englishDescription || product.description

  const productDetails =
    language === "ar" ? product.arabicDetails || product.details : product.englishDetails || product.details

  return (
    <>
      <ProductSchema product={product} />
      <Card className="overflow-hidden transition-all hover:shadow-lg product-card h-full flex flex-col">
        <div className="aspect-square relative">
          <Image src={product.imageUrl || "/placeholder.svg"} alt={productName} fill className="object-cover" />
          {product.isNew && <Badge className="absolute top-2 right-2 bg-primary">{t("جديد", "New")}</Badge>}
          {product.isBestseller && (
            <Badge className="absolute top-2 left-2 bg-amber-500">{t("الأكثر مبيعًا", "Bestseller")}</Badge>
          )}
        </div>
        <CardContent className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg">{productName}</h3>
          <p className="text-sm text-muted-foreground mb-2">{productDescription}</p>
          <div className="mt-auto pt-4 flex justify-between items-center">
            <span className="font-bold text-primary text-lg">{product.price}</span>
            <div className="flex gap-2">
              <Link href={`/products/${product.id}`}>
                <Button variant="outline">{t("عرض المنتج", "View Product")}</Button>
              </Link>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">{t("عرض التفاصيل", "View Details")}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">{productName}</DialogTitle>
                    <DialogDescription className="text-base">{productDescription}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 space-y-4">
                    <div className="relative h-60 w-full rounded-md overflow-hidden">
                      <Image
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">{t("مميزات المنتج", "Product Features")}</h4>
                      <p className="text-muted-foreground">{productDetails}</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>{t("منتج طبيعي 100%", "100% natural product")}</li>
                        <li>{t("خالي من المواد الضارة", "Free from harmful substances")}</li>
                        <li>{t("مناسب لجميع أنواع البشرة", "Suitable for all skin types")}</li>
                        <li>{t("تم اختباره سريريًا", "Clinically tested")}</li>
                      </ul>
                    </div>
                    <div className="pt-4 flex justify-between items-center border-t">
                      <span className="font-bold text-primary text-lg">{product.price}</span>
                      <Button
                        onClick={() => {
                          onOrderNow(productName)
                          setIsOpen(false)
                        }}
                      >
                        {t("اطلب الآن", "Order Now")}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

