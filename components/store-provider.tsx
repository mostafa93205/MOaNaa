"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define product type
export type Product = {
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

// Define order type
export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled"

export type OrderItem = {
  name: string
  nameEn: string
  price: string
  quantity: number
}

export type Order = {
  id: string
  customer: string
  customerEn: string
  date: string
  status: OrderStatus
  total: string
  items: OrderItem[]
  address: string
  addressEn: string
  phone: string
  email: string
}

// Define analytics data type
export type AnalyticsData = {
  totalSales: number
  totalOrders: number
  newCustomers: number
  salesGrowth: number
  ordersGrowth: number
  customersGrowth: number
  salesByPeriod: {
    week: { name: string; sales: number }[]
    month: { name: string; sales: number }[]
    year: { name: string; sales: number }[]
  }
  productDistribution: { name: string; value: number }[]
  topSellingProducts: {
    name: string
    nameEn: string
    units: number
    revenue: number
    icon: string
  }[]
}

// Define the context type
type StoreContextType = {
  products: Product[]
  orders: Order[]
  analytics: AnalyticsData
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  updateOrderStatus: (id: string, status: OrderStatus) => void
  addOrder: (order: Omit<Order, "id">) => void
}

// Create the context
const StoreContext = createContext<StoreContextType | undefined>(undefined)

// Initial products data
const initialProducts: Product[] = [
  {
    id: "1",
    name: "بادي سبلاش موانا",
    arabicName: "بادي سبلاش موانا",
    englishName: "MOANAÀ Body Splash",
    description: "عطرك المفضل في شكل بادي سبلاش",
    arabicDescription: "عطرك المفضل في شكل بادي سبلاش",
    englishDescription: "Your favorite fragrance as a body splash",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-26%20at%209.31.28%20PM-Af1tFS1Hj0jnXfAuduuJRml4HI2tWV.jpeg",
    category: "body-splash",
    price: "٢٥٠ جنيه",
    details:
      "مع موانا بادي سبلاش، هتنسى كل مشاكل العطور التقليدية! ثبات قوي، فوحان مميز، وآمن تمامًا حتى لأصحاب البشرة الحساسة.",
    arabicDetails:
      "مع موانا بادي سبلاش، هتنسى كل مشاكل العطور التقليدية! ثبات قوي، فوحان مميز، وآمن تمامًا حتى لأصحاب البشرة الحساسة.",
    englishDetails:
      "With MOANAÀ Body Splash, you'll forget all traditional perfume problems! Strong longevity, distinctive fragrance, and completely safe even for sensitive skin.",
    isBestseller: true,
  },
  {
    id: "2",
    name: "🎀البادي لوشن",
    arabicName: "🎀البادي لوشن",
    englishName: "🎀Body Lotion",
    description: "لوشن مرطب للجسم",
    arabicDescription: "لوشن مرطب للجسم",
    englishDescription: "Moisturizing body lotion",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/body-lotion-image.jpg-9Nwqxlay3POFbytBeNO04Tadbh9OAC.jpeg",
    category: "body-lotion",
    price: "٢٠٠ جنيه",
    details:
      "يعتبر من أهم منتجات العناية بالبشرة، خاصة في فصل الشتاء، بسبب تأثير العوامل الجوية الباردة التي تسبب جفاف وتشقق البشرة.",
    arabicDetails:
      "يعتبر من أهم منتجات العناية بالبشرة، خاصة في فصل الشتاء، بسبب تأثير العوامل الجوية الباردة التي تسبب جفاف وتشقق البشرة.",
    englishDetails:
      "Considered one of the most important skincare products, especially in winter, due to the effect of cold weather conditions that cause dry and cracked skin.",
  },
  {
    id: "3",
    name: "💋 ليب بالم موانا",
    arabicName: "💋 ليب بالم موانا",
    englishName: "💋 MOANAÀ Lip Balm",
    description: "بلسم مرطب للشفاه",
    arabicDescription: "بلسم مرطب للشفاه",
    englishDescription: "Moisturizing lip balm",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-20%20at%2022.21.53_bcc790a2.jpg-LHiafT3nOsgSp7srS40WDydaU1sIk4.jpeg",
    category: "lip-balm",
    price: "١٥٠ جنيه",
    details:
      "تغير الجو بيعرض الشفايف للحساسيه والتقشر عشان كدا موانا عملتلكم اقوي lip palm ناعم مرطب للشفايف وملمسه خفيف غير دهني.",
    arabicDetails:
      "تغير الجو بيعرض الشفايف للحساسيه والتقشر عشان كدا موانا عملتلكم اقوي lip palm ناعم مرطب للشفايف وملمسه خفيف غير دهني.",
    englishDetails:
      "Weather changes expose lips to sensitivity and peeling, that's why MOANAÀ created the strongest lip balm. Smooth, moisturizing for the lips with a light, non-greasy texture.",
    isNew: true,
  },
  {
    id: "4",
    name: "💗 زيت موانا للشعر",
    arabicName: "💗 زيت موانا للشعر",
    englishName: "💗 MOANAÀ Hair Oil",
    description: "زيت طبيعي للعناية بالشعر",
    arabicDescription: "زيت طبيعي للعناية بالشعر",
    englishDescription: "Natural hair care oil",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-26%20at%209.32.20%20PM-PgtTBblhWco41mjYych8EPuF8B8z7x.jpeg",
    category: "hair-oil",
    price: "١٨٠ جنيه",
    details: "زيت موانا للشعر هو الحل الأمثل للعناية بالشعر وتقويته. يساعد على تكثيف الشعر ويقلل من تساقط الشعر.",
    arabicDetails: "زيت موانا للشعر هو الحل الأمثل للعناية بالشعر وتقويته. يساعد على تكثيف الشعر ويقلل من تساقط الشعر.",
    englishDetails:
      "MOANAÀ hair oil is the perfect solution for hair care and strengthening. It helps thicken hair and reduces hair loss.",
  },
]

// Initial orders data
const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "سارة أحمد",
    customerEn: "Sarah Ahmed",
    date: "2024-04-01",
    status: "pending",
    total: "EGP 450",
    items: [
      { name: "بادي سبلاش موانا", nameEn: "MOANAÀ Body Splash", price: "EGP 250", quantity: 1 },
      { name: "ليب بالم موانا", nameEn: "MOANAÀ Lip Balm", price: "EGP 150", quantity: 1 },
      { name: "زيت موانا للشعر", nameEn: "MOANAÀ Hair Oil", price: "EGP 180", quantity: 1 },
    ],
    address: "شارع المعز، القاهرة، مصر",
    addressEn: "El Moez Street, Cairo, Egypt",
    phone: "+201234567890",
    email: "sarah@example.com",
  },
  {
    id: "ORD-002",
    customer: "محمد علي",
    customerEn: "Mohamed Ali",
    date: "2024-03-30",
    status: "shipped",
    total: "EGP 250",
    items: [{ name: "بادي سبلاش موانا", nameEn: "MOANAÀ Body Splash", price: "EGP 250", quantity: 1 }],
    address: "شارع الهرم، الجيزة، مصر",
    addressEn: "Pyramid Street, Giza, Egypt",
    phone: "+201234567891",
    email: "mohamed@example.com",
  },
  {
    id: "ORD-003",
    customer: "فاطمة محمود",
    customerEn: "Fatima Mahmoud",
    date: "2024-03-28",
    status: "delivered",
    total: "EGP 380",
    items: [
      { name: "بادي لوشن", nameEn: "Body Lotion", price: "EGP 200", quantity: 1 },
      { name: "ليب بالم موانا", nameEn: "MOANAÀ Lip Balm", price: "EGP 150", quantity: 1 },
    ],
    address: "شارع التحرير، القاهرة، مصر",
    addressEn: "Tahrir Street, Cairo, Egypt",
    phone: "+201234567892",
    email: "fatima@example.com",
  },
  {
    id: "ORD-004",
    customer: "أحمد حسن",
    customerEn: "Ahmed Hassan",
    date: "2024-03-25",
    status: "cancelled",
    total: "EGP 180",
    items: [{ name: "زيت موانا للشعر", nameEn: "MOANAÀ Hair Oil", price: "EGP 180", quantity: 1 }],
    address: "شارع المنيل، القاهرة، مصر",
    addressEn: "El Manial Street, Cairo, Egypt",
    phone: "+201234567893",
    email: "ahmed@example.com",
  },
  {
    id: "ORD-005",
    customer: "نورا سعيد",
    customerEn: "Noura Saeed",
    date: "2024-03-22",
    status: "delivered",
    total: "EGP 600",
    items: [
      { name: "بادي سبلاش موانا", nameEn: "MOANAÀ Body Splash", price: "EGP 250", quantity: 1 },
      { name: "بادي لوشن", nameEn: "Body Lotion", price: "EGP 200", quantity: 1 },
      { name: "ليب بالم موانا", nameEn: "MOANAÀ Lip Balm", price: "EGP 150", quantity: 1 },
    ],
    address: "شارع جامعة الدول العربية، القاهرة، مصر",
    addressEn: "Arab League Street, Cairo, Egypt",
    phone: "+201234567894",
    email: "noura@example.com",
  },
]

// Initial analytics data
const initialAnalytics: AnalyticsData = {
  totalSales: 24500,
  totalOrders: 142,
  newCustomers: 38,
  salesGrowth: 12.5,
  ordersGrowth: 8.2,
  customersGrowth: 18.7,
  salesByPeriod: {
    week: [
      { name: "الأحد", sales: 4000 },
      { name: "الإثنين", sales: 3000 },
      { name: "الثلاثاء", sales: 2000 },
      { name: "الأربعاء", sales: 2780 },
      { name: "الخميس", sales: 1890 },
      { name: "الجمعة", sales: 2390 },
      { name: "السبت", sales: 3490 },
    ],
    month: [
      { name: "الأسبوع 1", sales: 12000 },
      { name: "الأسبوع 2", sales: 9800 },
      { name: "الأسبوع 3", sales: 11200 },
      { name: "الأسبوع 4", sales: 14500 },
    ],
    year: [
      { name: "يناير", sales: 35000 },
      { name: "فبراير", sales: 28000 },
      { name: "مارس", sales: 32000 },
      { name: "أبريل", sales: 39000 },
      { name: "مايو", sales: 42000 },
      { name: "يونيو", sales: 35000 },
      { name: "يوليو", sales: 29000 },
      { name: "أغسطس", sales: 33000 },
      { name: "سبتمبر", sales: 37000 },
      { name: "أكتوبر", sales: 45000 },
      { name: "نوفمبر", sales: 48000 },
      { name: "ديسمبر", sales: 52000 },
    ],
  },
  productDistribution: [
    { name: "بادي سبلاش", value: 40 },
    { name: "بادي لوشن", value: 30 },
    { name: "ليب بالم", value: 15 },
    { name: "زيت الشعر", value: 15 },
  ],
  topSellingProducts: [
    {
      name: "بادي سبلاش موانا",
      nameEn: "MOANAÀ Body Splash",
      units: 78,
      revenue: 19500,
      icon: "spray-can-sparkles",
    },
    {
      name: "بادي لوشن",
      nameEn: "Body Lotion",
      units: 54,
      revenue: 10800,
      icon: "pump-soap",
    },
    {
      name: "ليب بالم موانا",
      nameEn: "MOANAÀ Lip Balm",
      units: 42,
      revenue: 6300,
      icon: "kiss-wink-heart",
    },
  ],
}

// Create the provider component
export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with data from localStorage if available, otherwise use initial data
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const savedProducts = localStorage.getItem("moanaa-products")
      return savedProducts ? JSON.parse(savedProducts) : initialProducts
    }
    return initialProducts
  })

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== "undefined") {
      const savedOrders = localStorage.getItem("moanaa-orders")
      return savedOrders ? JSON.parse(savedOrders) : initialOrders
    }
    return initialOrders
  })

  const [analytics, setAnalytics] = useState<AnalyticsData>(initialAnalytics)

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("moanaa-products", JSON.stringify(products))
      localStorage.setItem("moanaa-orders", JSON.stringify(orders))
    }
  }, [products, orders])

  // Update analytics when products or orders change
  useEffect(() => {
    // This would be more sophisticated in a real app
    // For now, we'll just update a few key metrics
    const totalSales = orders.reduce((sum, order) => {
      const amount = Number.parseInt(order.total.replace(/\D/g, ""), 10) || 0
      return sum + amount
    }, 0)

    const productCounts: Record<string, number> = {}
    const productRevenue: Record<string, number> = {}

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const productName = item.name
        productCounts[productName] = (productCounts[productName] || 0) + item.quantity
        const price = Number.parseInt(item.price.replace(/\D/g, ""), 10) || 0
        productRevenue[productName] = (productRevenue[productName] || 0) + price * item.quantity
      })
    })

    // Convert to array and sort by revenue
    const topProducts = Object.keys(productRevenue)
      .map((name) => {
        const product = products.find((p) => p.name === name || p.arabicName === name || p.englishName === name)
        return {
          name,
          nameEn: product?.englishName || name,
          units: productCounts[name] || 0,
          revenue: productRevenue[name] || 0,
          icon: name.includes("سبلاش") ? "spray-can-sparkles" : name.includes("لوشن") ? "pump-soap" : "kiss-wink-heart",
        }
      })
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 3)

    setAnalytics((prev) => ({
      ...prev,
      totalSales,
      totalOrders: orders.length,
      topSellingProducts: topProducts.length > 0 ? topProducts : prev.topSellingProducts,
    }))
  }, [products, orders])

  // Add a new product
  const addProduct = (product: Omit<Product, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newProduct = { id, ...product }
    setProducts((prev) => [...prev, newProduct])
  }

  // Update an existing product
  const updateProduct = (product: Product) => {
    // Create a deep copy of the product to avoid reference issues
    const updatedProduct = JSON.parse(JSON.stringify(product))

    setProducts((prev) => {
      // Find the product index
      const index = prev.findIndex((p) => p.id === updatedProduct.id)

      // If product not found, return the previous state
      if (index === -1) return prev

      // Create a new array with the updated product
      const newProducts = [...prev]
      newProducts[index] = updatedProduct

      // Return the new array
      return newProducts
    })

    // Log the update for debugging
    console.log("Product updated:", updatedProduct)
  }

  // Delete a product
  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      // Filter out the product with the given id
      const newProducts = prev.filter((p) => p.id !== id)

      // Log the deletion for debugging
      console.log("Product deleted:", id)

      // Return the new array
      return newProducts
    })
  }

  // Update order status
  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)))
  }

  // Add a new order
  const addOrder = (order: Omit<Order, "id">) => {
    const id = `ORD-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`
    const newOrder = { id, ...order }
    setOrders((prev) => [...prev, newOrder])
  }

  // Create the context value
  const contextValue: StoreContextType = {
    products,
    orders,
    analytics,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    addOrder,
  }

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>
}

// Create a hook to use the store context
export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}

