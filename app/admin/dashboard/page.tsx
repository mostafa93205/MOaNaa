"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useAuth } from "@/components/auth-provider"
import { StoreProvider } from "@/components/store-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  ArrowLeft,
  ArrowRight,
  MoreVertical,
  Package,
  Users,
  Settings,
  LogOut,
  Menu,
  BarChart2,
  ShoppingBag,
} from "lucide-react"
import { DashboardAnalytics } from "./analytics"
import { OrdersManagement } from "./orders"
import { ProductManagement } from "./products"
import { ThemeToggle } from "@/components/theme-toggle"

// Define product type
type Product = {
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
}

// Simple translation API mock - in a real app, you would use a proper translation API
const translateText = async (text: string, targetLang: "ar" | "en"): Promise<string> => {
  // This is a mock function - in a real app, you would call a translation API
  // For demo purposes, we'll just add a prefix to show it's translated
  if (!text) return ""

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Simple mock translations for demo purposes
  const mockTranslations: Record<string, Record<string, string>> = {
    "Body Splash": { ar: "بادي سبلاش" },
    "Body Lotion": { ar: "البادي لوشن" },
    "Lip Balm": { ar: "ليب بالم" },
    "Hair Oil": { ar: "زيت الشعر" },
    "بادي سبلاش": { en: "Body Splash" },
    "البادي لوشن": { en: "Body Lotion" },
    "ليب بالم": { en: "Lip Balm" },
    "زيت الشعر": { en: "Hair Oil" },
  }

  // Check if we have a mock translation
  if (mockTranslations[text]?.[targetLang]) {
    return mockTranslations[text][targetLang]
  }

  // Otherwise return a placeholder translation
  return targetLang === "ar" ? `${text} (مترجم)` : `${text} (translated)`
}

export default function AdminDashboard() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const { user, logout, isLoading } = useAuth()
  const ArrowIcon = language === "ar" ? ArrowRight : ArrowLeft
  const [activeTab, setActiveTab] = useState("analytics")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [products, setProducts] = useState<Product[]>([
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
      arabicDetails:
        "زيت موانا للشعر هو الحل الأمثل للعناية بالشعر وتقويته. يساعد على تكثيف الشعر ويقلل من تساقط الشعر.",
      englishDetails:
        "MOANAÀ hair oil is the perfect solution for hair care and strengthening. It helps thicken hair and reduces hair loss.",
    },
  ])

  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    arabicName: "",
    englishName: "",
    description: "",
    arabicDescription: "",
    englishDescription: "",
    imageUrl: "",
    category: "",
    price: "",
    details: "",
    arabicDetails: "",
    englishDetails: "",
  })

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [activeLanguage, setActiveLanguage] = useState<"ar" | "en">("ar")
  const [simplifiedForm, setSimplifiedForm] = useState(true)

  // Check if user is authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/admin/login")
    }
  }, [user, isLoading, router])

  // If still loading or no user, show loading state
  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">{t("جاري التحميل...", "Loading...")}</p>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
  }

  // Auto-translate function for new product
  const handleAutoTranslate = async () => {
    setIsTranslating(true)
    try {
      if (simplifiedForm) {
        // Determine which language to translate from/to based on activeLanguage
        if (activeLanguage === "ar") {
          // Translate from Arabic to English
          const translatedName = await translateText(newProduct.name, "en")
          const translatedDescription = await translateText(newProduct.description, "en")
          const translatedDetails = await translateText(newProduct.details || "", "en")

          setNewProduct({
            ...newProduct,
            englishName: translatedName,
            englishDescription: translatedDescription,
            englishDetails: translatedDetails,
          })
        } else {
          // Translate from English to Arabic
          const translatedName = await translateText(newProduct.name, "ar")
          const translatedDescription = await translateText(newProduct.description, "ar")
          const translatedDetails = await translateText(newProduct.details || "", "ar")

          setNewProduct({
            ...newProduct,
            arabicName: translatedName,
            arabicDescription: translatedDescription,
            arabicDetails: translatedDetails,
          })
        }
      } else {
        // Handle translation for non-simplified form
        if (activeLanguage === "ar") {
          setNewProduct({
            ...newProduct,
            englishName: await translateText(newProduct.arabicName || "", "en"),
            englishDescription: await translateText(newProduct.arabicDescription || "", "en"),
            englishDetails: await translateText(newProduct.arabicDetails || "", "en"),
          })
        } else {
          setNewProduct({
            ...newProduct,
            arabicName: await translateText(newProduct.englishName || "", "ar"),
            arabicDescription: await translateText(newProduct.englishDescription || "", "ar"),
            arabicDetails: await translateText(newProduct.englishDetails || "", "ar"),
          })
        }
      }
    } catch (error) {
      console.error("Translation error:", error)
    } finally {
      setIsTranslating(false)
    }
  }

  // Auto-translate function for editing product
  const handleEditAutoTranslate = async () => {
    if (!editingProduct) return

    setIsTranslating(true)
    try {
      if (simplifiedForm) {
        // Determine which language to translate from/to based on activeLanguage
        if (activeLanguage === "ar") {
          // Translate from Arabic to English
          const translatedName = await translateText(editingProduct.name, "en")
          const translatedDescription = await translateText(editingProduct.description, "en")
          const translatedDetails = await translateText(editingProduct.details || "", "en")

          setEditingProduct({
            ...editingProduct,
            englishName: translatedName,
            englishDescription: translatedDescription,
            englishDetails: translatedDetails,
          })
        } else {
          // Translate from English to Arabic
          const translatedName = await translateText(editingProduct.name, "ar")
          const translatedDescription = await translateText(editingProduct.description, "ar")
          const translatedDetails = await translateText(editingProduct.details || "", "ar")

          setEditingProduct({
            ...editingProduct,
            arabicName: translatedName,
            arabicDescription: translatedDescription,
            arabicDetails: translatedDetails,
          })
        }
      } else {
        // Handle translation for non-simplified form
        if (activeLanguage === "ar") {
          setEditingProduct({
            ...editingProduct,
            englishName: await translateText(editingProduct.arabicName || "", "en"),
            englishDescription: await translateText(editingProduct.arabicDescription || "", "en"),
            englishDetails: await translateText(editingProduct.arabicDetails || "", "en"),
          })
        } else {
          setEditingProduct({
            ...editingProduct,
            arabicName: await translateText(editingProduct.englishName || "", "ar"),
            arabicDescription: await translateText(editingProduct.englishDescription || "", "ar"),
            arabicDetails: await translateText(editingProduct.englishDetails || "", "ar"),
          })
        }
      }
    } catch (error) {
      console.error("Translation error:", error)
    } finally {
      setIsTranslating(false)
    }
  }

  const handleAddProduct = () => {
    const id = Math.random().toString(36).substring(2, 9)

    // Set the name based on the current language
    let productToAdd = { ...newProduct }

    if (simplifiedForm) {
      // In simplified form, we use the single field values and the translated values
      productToAdd = {
        ...productToAdd,
        arabicName: activeLanguage === "ar" ? newProduct.name : newProduct.arabicName,
        englishName: activeLanguage === "en" ? newProduct.name : newProduct.englishName,
        arabicDescription: activeLanguage === "ar" ? newProduct.description : newProduct.arabicDescription,
        englishDescription: activeLanguage === "en" ? newProduct.description : newProduct.englishDescription,
        arabicDetails: activeLanguage === "ar" ? newProduct.details : newProduct.arabicDetails,
        englishDetails: activeLanguage === "en" ? newProduct.details : newProduct.englishDetails,
      }
    }

    // Set the name based on the current language for display
    const name = language === "ar" ? productToAdd.arabicName : productToAdd.englishName
    const description = language === "ar" ? productToAdd.arabicDescription : productToAdd.englishDescription
    const details = language === "ar" ? productToAdd.arabicDetails : productToAdd.englishDetails

    setProducts([
      ...products,
      {
        id,
        ...productToAdd,
        name: name || "",
        description: description || "",
        details: details || "",
      },
    ])

    // Reset form
    setNewProduct({
      name: "",
      arabicName: "",
      englishName: "",
      description: "",
      arabicDescription: "",
      englishDescription: "",
      imageUrl: "",
      category: "",
      price: "",
      details: "",
      arabicDetails: "",
      englishDetails: "",
    })
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return

    let productToUpdate = { ...editingProduct }

    if (simplifiedForm) {
      // In simplified form, we use the single field values and the translated values
      productToUpdate = {
        ...productToUpdate,
        arabicName: activeLanguage === "ar" ? editingProduct.name : editingProduct.arabicName,
        englishName: activeLanguage === "en" ? editingProduct.name : editingProduct.englishName,
        arabicDescription: activeLanguage === "ar" ? editingProduct.description : editingProduct.arabicDescription,
        englishDescription: activeLanguage === "en" ? editingProduct.description : editingProduct.englishDescription,
        arabicDetails: activeLanguage === "ar" ? editingProduct.details : editingProduct.arabicDetails,
        englishDetails: activeLanguage === "en" ? editingProduct.details : editingProduct.englishDetails,
      }
    }

    // Update the name based on the current language for display
    const name = language === "ar" ? productToUpdate.arabicName : productToUpdate.englishName
    const description = language === "ar" ? productToUpdate.arabicDescription : productToUpdate.englishDescription
    const details = language === "ar" ? productToUpdate.arabicDetails : productToUpdate.englishDetails

    setProducts(
      products.map((product) =>
        product.id === productToUpdate.id
          ? {
              ...productToUpdate,
              name: name || productToUpdate.name,
              description: description || productToUpdate.description,
              details: details || productToUpdate.details,
            }
          : product,
      ),
    )

    setEditingProduct(null)
  }

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete))
      setIsDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  const filteredProducts = products.filter((product) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.arabicName?.toLowerCase().includes(searchLower) ||
      product.englishName?.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    )
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, you would upload to a server or cloud storage
    // For this demo, we'll simulate an upload with a delay
    setIsUploading(true)

    setTimeout(() => {
      // Create a local URL for the image
      const imageUrl = URL.createObjectURL(file)

      if (editingProduct) {
        setEditingProduct({
          ...editingProduct,
          imageUrl,
        })
      } else {
        setNewProduct({
          ...newProduct,
          imageUrl,
        })
      }

      setIsUploading(false)
    }, 1000)
  }

  // Handle input change for simplified form
  const handleSimplifiedInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "name" | "description" | "details" | "category" | "price",
  ) => {
    const value = e.target.value

    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [field]: value,
      })
    } else {
      setNewProduct({
        ...newProduct,
        [field]: value,
      })
    }
  }

  return (
    <StoreProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <ArrowIcon className="h-5 w-5" />
              <span>{t("العودة إلى الموقع", "Back to Website")}</span>
            </Link>
            <div className="ml-auto flex items-center gap-4">
              <ThemeToggle />
              <LanguageSwitcher />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className={`${language === "ar" ? "ml-2" : "mr-2"} h-4 w-4`} />
                    <span>{t("تسجيل الخروج", "Logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className="flex flex-1">
          <aside className="hidden w-64 border-r bg-muted/40 lg:block">
            <div className="flex h-full flex-col gap-2 p-4">
              <div className="flex h-14 items-center border-b px-4 font-semibold">
                <div className="flex items-center gap-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2012.19.32%20PM%20%281%29-Suyg2E0hNVxKlFVpj8OjYJ3PARL6io.jpeg"
                    alt="MOANAÀ Logo"
                    width={30}
                    height={30}
                    className="h-8 w-auto rounded-full"
                  />
                  <span>{t("لوحة التحكم", "Admin Panel")}</span>
                </div>
              </div>
              <Button
                variant={activeTab === "analytics" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("analytics")}
              >
                <BarChart2 className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5`} />
                {t("التحليلات", "Analytics")}
              </Button>
              <Button
                variant={activeTab === "products" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("products")}
              >
                <Package className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5`} />
                {t("المنتجات", "Products")}
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <ShoppingBag className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5`} />
                {t("الطلبات", "Orders")}
              </Button>
              <Button
                variant={activeTab === "customers" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("customers")}
              >
                <Users className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5`} />
                {t("العملاء", "Customers")}
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5`} />
                {t("الإعدادات", "Settings")}
              </Button>
            </div>
          </aside>

          {/* Mobile menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetContent side={language === "ar" ? "right" : "left"} className="w-64">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2012.19.32%20PM%20%281%29-Suyg2E0hNVxKlFVpj8OjYJ3PARL6io.jpeg"
                    alt="MOANAÀ Logo"
                    width={30}
                    height={30}
                    className="h-8 w-auto rounded-full"
                  />
                  <span>{t("لوحة التحكم", "Admin Panel")}</span>
                </SheetTitle>
                <SheetDescription>{t("إدارة متجرك", "Manage your store")}</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-4">
                <Button
                  variant={activeTab === "analytics" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    setActiveTab("analytics")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <BarChart2 className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5`} />
                  {t("التحليلات", "Analytics")}
                </Button>
                <Button
                  variant={activeTab === "products" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    setActiveTab("products")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Package className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5`} />
                  {t("المنتجات", "Products")}
                </Button>
                <Button
                  variant={activeTab === "orders" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    setActiveTab("orders")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <ShoppingBag className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5`} />
                  {t("الطلبات", "Orders")}
                </Button>
                <Button
                  variant={activeTab === "customers" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    setActiveTab("customers")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Users className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5`} />
                  {t("العملاء", "Customers")}
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    setActiveTab("settings")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Settings className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5`} />
                  {t("الإعدادات", "Settings")}
                </Button>
                <Button variant="ghost" className="justify-start text-destructive" onClick={handleLogout}>
                  <LogOut className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5`} />
                  {t("تسجيل الخروج", "Logout")}
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <main className="flex-1 overflow-auto p-4 md:p-6">
            {activeTab === "analytics" && <DashboardAnalytics />}
            {activeTab === "products" && <ProductManagement />}
            {activeTab === "orders" && <OrdersManagement />}
            {activeTab === "customers" && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{t("إدارة العملاء", "Customer Management")}</h1>
                    <p className="text-muted-foreground">
                      {t("عرض وإدارة بيانات العملاء", "View and manage customer data")}
                    </p>
                  </div>
                </div>

                {/* Placeholder for customer management UI */}
                <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">
                    {t("قسم إدارة العملاء قيد التطوير", "Customer management section is under development")}
                  </p>
                </div>
              </div>
            )}
            {activeTab === "settings" && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{t("إعدادات المتجر", "Store Settings")}</h1>
                    <p className="text-muted-foreground">{t("تخصيص إعدادات متجرك", "Customize your store settings")}</p>
                  </div>
                </div>

                {/* Placeholder for settings UI */}
                <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">
                    {t("قسم الإعدادات قيد التطوير", "Settings section is under development")}
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </StoreProvider>
  )
}

