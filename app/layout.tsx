import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { AuthProvider } from "@/components/auth-provider"
import { SeoProvider } from "@/components/seo-provider"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { StoreProvider } from "@/components/store-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MOANAÀ - منتجات العناية بالبشرة والشعر الطبيعية",
  description:
    "موانا تقدم منتجات العناية بالبشرة والشعر الطبيعية عالية الجودة. اكتشف مجموعتنا من البادي سبلاش، البادي لوشن، زيت الشعر وليب بالم للحصول على بشرة ناعمة ومشرقة وشعر صحي.",
  keywords: "موانا, منتجات طبيعية, العناية بالبشرة, العناية بالشعر, بادي سبلاش, بادي لوشن, زيت الشعر, ليب بالم",
  authors: [{ name: "MOANAÀ" }],
  creator: "MOANAÀ",
  publisher: "MOANAÀ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://moanaa.com"),
  alternates: {
    canonical: "/",
    languages: {
      ar: "/ar",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://moanaa.com",
    title: "MOANAÀ - منتجات العناية بالبشرة والشعر الطبيعية",
    description: "موانا تقدم منتجات العناية بالبشرة والشعر الطبيعية عالية الجودة",
    siteName: "MOANAÀ",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2012.19.32%20PM%20%281%29-Suyg2E0hNVxKlFVpj8OjYJ3PARL6io.jpeg",
        width: 800,
        height: 600,
        alt: "MOANAÀ Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MOANAÀ - منتجات العناية بالبشرة والشعر الطبيعية",
    description: "موانا تقدم منتجات العناية بالبشرة والشعر الطبيعية عالية الجودة",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2012.19.32%20PM%20%281%29-Suyg2E0hNVxKlFVpj8OjYJ3PARL6io.jpeg",
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <StoreProvider>
            <LanguageProvider>
              <AuthProvider>
                <SeoProvider>
                  <AnalyticsProvider>{children}</AnalyticsProvider>
                </SeoProvider>
              </AuthProvider>
            </LanguageProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'