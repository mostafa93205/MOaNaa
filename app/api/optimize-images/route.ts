import { NextResponse } from "next/server"
import sharp from "sharp"

export async function POST(request: Request) {
  try {
    const { imageUrl, width, height, quality } = await request.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    // Fetch the image
    const response = await fetch(imageUrl)
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
    }

    const imageBuffer = await response.arrayBuffer()

    // Process the image with sharp
    let sharpInstance = sharp(Buffer.from(imageBuffer))

    // Resize if dimensions are provided
    if (width || height) {
      sharpInstance = sharpInstance.resize({
        width: width || undefined,
        height: height || undefined,
        fit: "cover",
        position: "center",
      })
    }

    // Set quality (default to 80 if not provided)
    const imageQuality = quality || 80

    // Convert to WebP for better compression
    const optimizedImage = await sharpInstance.webp({ quality: imageQuality }).toBuffer()

    // Return the optimized image as base64
    const base64Image = `data:image/webp;base64,${optimizedImage.toString("base64")}`

    return NextResponse.json({
      optimizedImage: base64Image,
      originalSize: imageBuffer.byteLength,
      optimizedSize: optimizedImage.byteLength,
      compressionRatio: ((optimizedImage.byteLength / imageBuffer.byteLength) * 100).toFixed(2) + "%",
    })
  } catch (error) {
    console.error("Error optimizing image:", error)
    return NextResponse.json({ error: "Failed to optimize image" }, { status: 500 })
  }
}

