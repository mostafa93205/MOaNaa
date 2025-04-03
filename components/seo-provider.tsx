"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-provider"

interface SeoProviderProps {
  children: React.ReactNode
}

export function SeoProvider({ children }: SeoProviderProps) {
  const pathname = usePathname()
  const { language, t } = useLanguage()

  // Base website information
  const siteName = "MOANAÀ"
  const baseUrl = "https://moanaa.com"

  // Default SEO values
  const defaultTitle = t("موانا - منتجات العناية بالبشرة والشعر الطبيعية", "MOANAÀ - Natural Skin & Hair Care Products")

  const defaultDescription = t(
    "موانا تقدم منتجات العناية بالبشرة والشعر الطبيعية عالية الجودة. اكتشف مجموعتنا من البادي سبلاش، البادي لوشن، زيت الشعر وليب بالم للحصول على بشرة ناعمة ومشرقة وشعر صحي.",
    "MOANAÀ offers high-quality natural skin and hair care products. Discover our collection of body splash, body lotion, hair oil, and lip balm for smooth, radiant skin and healthy hair.",
  )

  return <>{children}</>
}

