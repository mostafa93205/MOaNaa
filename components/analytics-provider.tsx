"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"

declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, any>) => void
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This would be replaced with your actual Google Analytics tracking code
    const handleRouteChange = (url: string) => {
      if (typeof window.gtag !== "undefined") {
        window.gtag("config", "G-XXXXXXXXXX", {
          page_path: url,
        })
      }
    }

    // Track page view on route change
    handleRouteChange(`${pathname}${searchParams ? `?${searchParams}` : ""}`)
  }, [pathname, searchParams])

  return (
    <>
      {children}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `,
        }}
      />
    </>
  )
}

