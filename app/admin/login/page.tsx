"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { t, language } = useLanguage()
  const { login } = useAuth()

  const ArrowIcon = language === "ar" ? ArrowRight : ArrowLeft

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)

      if (success) {
        router.push("/admin/dashboard")
      } else {
        setError(t("البريد الإلكتروني أو كلمة المرور غير صحيحة", "Email or password is incorrect"))
      }
    } catch (error) {
      setError(
        t("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.", "An error occurred during login. Please try again."),
      )
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2">
            <ArrowIcon className="h-4 w-4" />
            <span>{t("العودة إلى الموقع", "Back to Website")}</span>
          </Link>
          <div className="ml-auto">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-19%20at%2012.19.32%20PM%20%281%29-Suyg2E0hNVxKlFVpj8OjYJ3PARL6io.jpeg"
                alt="MOANAÀ Logo"
                width={100}
                height={100}
                className="h-20 w-auto"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {t("تسجيل الدخول إلى لوحة التحكم", "Admin Panel Login")}
            </CardTitle>
            <CardDescription className="text-center">
              {t("أدخل بيانات الدخول للوصول إلى لوحة التحكم", "Enter your credentials to access the admin panel")}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && <div className="bg-destructive/15 text-destructive text-center p-2 rounded-md">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="email">{t("البريد الإلكتروني", "Email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("أدخل البريد الإلكتروني", "Enter your email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("كلمة المرور", "Password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("أدخل كلمة المرور", "Enter your password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="bg-background pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              {/* Login form instructions */}
              <div className="text-sm text-muted-foreground">
                <p>
                  {t(
                    "* أدخل بيانات الدخول الخاصة بك للوصول إلى لوحة التحكم",
                    "* Enter your credentials to access the admin panel",
                  )}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("جاري تسجيل الدخول...", "Logging in...")}
                  </>
                ) : (
                  t("تسجيل الدخول", "Login")
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

