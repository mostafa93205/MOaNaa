import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://moanaa.com"

  // Define all routes
  const routes = ["", "/products", "/contact"]

  // Create sitemap entries for each route in both languages
  const sitemap: MetadataRoute.Sitemap = []

  // Add Arabic routes
  routes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1.0 : 0.8,
    })
  })

  // Add English routes
  routes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1.0 : 0.8,
    })
  })

  return sitemap
}

