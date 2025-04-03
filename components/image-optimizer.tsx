"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ImageOptimizerProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function ImageOptimizer({ src, alt, width, height, className = "", priority = false }: ImageOptimizerProps) {
  const [optimizedSrc, setOptimizedSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Skip optimization for placeholder images or already optimized images
    if (src.includes("placeholder.svg") || src.startsWith("data:image/webp")) {
      setOptimizedSrc(src)
      setIsLoading(false)
      return
    }

    const optimizeImage = async () => {
      try {
        setIsLoading(true)

        const response = await fetch("/api/optimize-images", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: src,
            width,
            height,
            quality: 80,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to optimize image")
        }

        const data = await response.json()
        setOptimizedSrc(data.optimizedImage)
      } catch (err) {
        console.error("Error optimizing image:", err)
        setError("Failed to optimize image")
        setOptimizedSrc(src) // Fallback to original source
      } finally {
        setIsLoading(false)
      }
    }

    optimizeImage()
  }, [src, width, height])

  if (isLoading) {
    return <div className={`bg-muted animate-pulse ${className}`} style={{ width, height }} />
  }

  if (error) {
    console.warn(`Image optimization error: ${error}. Using original source.`)
  }

  return (
    <Image
      src={optimizedSrc || src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}

