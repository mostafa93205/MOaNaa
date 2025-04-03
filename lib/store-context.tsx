"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types for our store data
export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  featured: boolean
  createdAt: Date
}

export type Order = {
  id: string
  customerName: string
  customerEmail: string
  products: {
    productId: string
    quantity: number
    price: number
  }[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: Date
  updatedAt: Date
  shippingAddress: string
  trackingNumber?: string
}

export type Analytics = {
  totalSales: number
  totalOrders: number
  averageOrderValue: number
  topProducts: {
    productId: string
    productName: string
    totalSold: number
  }[]
  recentSales: {
    date: Date
    amount: number
  }[]
  salesByCategory: {
    category: string
    amount: number
  }[]
}

// Mock data for initial state
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Premium Coffee Beans",
    description: "Freshly roasted premium coffee beans from Ethiopia",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Coffee",
    stock: 50,
    featured: true,
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Ceramic Coffee Mug",
    description: "Handcrafted ceramic coffee mug",
    price: 19.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Accessories",
    stock: 30,
    featured: false,
    createdAt: new Date("2023-02-10"),
  },
  {
    id: "3",
    name: "Coffee Grinder",
    description: "Professional grade coffee grinder",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Equipment",
    stock: 15,
    featured: true,
    createdAt: new Date("2023-03-05"),
  },
]

const initialOrders: Order[] = [
  {
    id: "1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    products: [
      { productId: "1", quantity: 2, price: 24.99 },
      { productId: "2", quantity: 1, price: 19.99 },
    ],
    total: 69.97,
    status: "delivered",
    createdAt: new Date("2023-04-10"),
    updatedAt: new Date("2023-04-15"),
    shippingAddress: "123 Main St, Anytown, USA",
    trackingNumber: "TRK123456789",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    products: [{ productId: "3", quantity: 1, price: 89.99 }],
    total: 89.99,
    status: "processing",
    createdAt: new Date("2023-04-18"),
    updatedAt: new Date("2023-04-18"),
    shippingAddress: "456 Oak Ave, Somewhere, USA",
  },
]

const initialAnalytics: Analytics = {
  totalSales: 159.96,
  totalOrders: 2,
  averageOrderValue: 79.98,
  topProducts: [
    { productId: "1", productName: "Premium Coffee Beans", totalSold: 2 },
    { productId: "3", productName: "Coffee Grinder", totalSold: 1 },
    { productId: "2", productName: "Ceramic Coffee Mug", totalSold: 1 },
  ],
  recentSales: [
    { date: new Date("2023-04-10"), amount: 69.97 },
    { date: new Date("2023-04-18"), amount: 89.99 },
  ],
  salesByCategory: [
    { category: "Coffee", amount: 49.98 },
    { category: "Accessories", amount: 19.99 },
    { category: "Equipment", amount: 89.99 },
  ],
}

// Create the context
type StoreContextType = {
  products: Product[]
  orders: Order[]
  analytics: Analytics
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  addOrder: (order: Omit<Order, "id" | "createdAt" | "updatedAt">) => void
  updateOrder: (order: Order) => void
  deleteOrder: (id: string) => void
  refreshAnalytics: () => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

// Provider component
export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [analytics, setAnalytics] = useState<Analytics>(initialAnalytics)

  // Load data from localStorage on mount
  useEffect(() => {
    const storedProducts = localStorage.getItem("products")
    const storedOrders = localStorage.getItem("orders")

    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts)
        // Convert string dates back to Date objects
        const productsWithDates = parsedProducts.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
        }))
        setProducts(productsWithDates)
      } catch (error) {
        console.error("Error parsing stored products:", error)
      }
    }

    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders)
        // Convert string dates back to Date objects
        const ordersWithDates = parsedOrders.map((o: any) => ({
          ...o,
          createdAt: new Date(o.createdAt),
          updatedAt: new Date(o.updatedAt),
        }))
        setOrders(ordersWithDates)
      } catch (error) {
        console.error("Error parsing stored orders:", error)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  // Calculate analytics whenever products or orders change
  useEffect(() => {
    refreshAnalytics()
  }, [products, orders])

  const refreshAnalytics = () => {
    // Calculate total sales
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0)

    // Calculate average order value
    const averageOrderValue = orders.length > 0 ? totalSales / orders.length : 0

    // Calculate top products
    const productSales: Record<string, { productId: string; productName: string; totalSold: number }> = {}

    orders.forEach((order) => {
      order.products.forEach((item) => {
        if (!productSales[item.productId]) {
          const product = products.find((p) => p.id === item.productId)
          productSales[item.productId] = {
            productId: item.productId,
            productName: product?.name || "Unknown Product",
            totalSold: 0,
          }
        }
        productSales[item.productId].totalSold += item.quantity
      })
    })

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5)

    // Calculate recent sales (last 7 days)
    const recentSales = orders
      .filter((order) => {
        const orderDate = new Date(order.createdAt)
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        return orderDate >= sevenDaysAgo
      })
      .map((order) => ({
        date: new Date(order.createdAt),
        amount: order.total,
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())

    // Calculate sales by category
    const categorySales: Record<string, number> = {}

    orders.forEach((order) => {
      order.products.forEach((item) => {
        const product = products.find((p) => p.id === item.productId)
        if (product) {
          if (!categorySales[product.category]) {
            categorySales[product.category] = 0
          }
          categorySales[product.category] += item.price * item.quantity
        }
      })
    })

    const salesByCategory = Object.entries(categorySales).map(([category, amount]) => ({
      category,
      amount,
    }))

    setAnalytics({
      totalSales,
      totalOrders: orders.length,
      averageOrderValue,
      topProducts,
      recentSales,
      salesByCategory,
    })
  }

  // Product CRUD operations
  const addProduct = (product: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setProducts((prevProducts) => [...prevProducts, newProduct])
  }

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
    )
  }

  const deleteProduct = (id: string) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id))
  }

  // Order CRUD operations
  const addOrder = (order: Omit<Order, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date()
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    }
    setOrders((prevOrders) => [...prevOrders, newOrder])
  }

  const updateOrder = (updatedOrder: Order) => {
    const orderWithUpdatedDate = {
      ...updatedOrder,
      updatedAt: new Date(),
    }
    setOrders((prevOrders) => prevOrders.map((order) => (order.id === updatedOrder.id ? orderWithUpdatedDate : order)))
  }

  const deleteOrder = (id: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id))
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        analytics,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrder,
        deleteOrder,
        refreshAnalytics,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

// Custom hook to use the store context
export const useStore = () => {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}

