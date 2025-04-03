"use client"

import { useLanguage } from "@/components/language-provider"

interface ProductSchemaProps {
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
    category: string
  }
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const { language } = useLanguage()
  const baseUrl = "https://moanaa.com"

  // Format price for structured data
  const priceValue = product.price ? product.price.replace(/[^\d]/g, "") : "0"

  // Get the appropriate name and description based on language
  const productName = language === "ar" ? product.arabicName || product.name : product.englishName || product.name

  const productDescription =
    language === "ar"
      ? product.arabicDescription || product.description
      : product.englishDescription || product.description

  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: productName,
    description: productDescription,
    image: product.imageUrl,
    sku: `MOANAA-${product.id}`,
    mpn: `MOANAA-${product.id}`,
    brand: {
      "@type": "Brand",
      name: "MOANAÀ",
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/products/${product.id}`,
      priceCurrency: "EGP",
      price: priceValue,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      availability: "https://schema.org/InStock",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}

