"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function OrderTracking() {
  const { t } = useLanguage()
  const [orderNumber, setOrderNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [orderStatus, setOrderStatus] = useState<null | {
    status: string
    date: string
    details: string
  }>(null)
  const [error, setError] = useState("")

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setOrderStatus(null)

    if (!orderNumber.trim()) {
      setError(t("يرجى إدخال رقم الطلب", "Please enter an order number"))
      return
    }

    setIsLoading(true)

    // Simulate API call to track order
    setTimeout(() => {
      // For demo purposes, show a mock result
      if (orderNumber === "123456") {
        setOrderStatus({
          status: t("تم الشحن", "Shipped"),
          date: "2024-04-01",
          details: t("تم شحن طلبك وهو في الطريق إليك", "Your order has been shipped and is on its way to you"),
        })
      } else if (orderNumber === "654321") {
        setOrderStatus({
          status: t("تم التسليم", "Delivered"),
          date: "2024-03-28",
          details: t("تم تسليم طلبك بنجاح", "Your order has been successfully delivered"),
        })
      } else {
        setError(
          t(
            "لم يتم العثور على الطلب. يرجى التحقق من الرقم والمحاولة مرة أخرى",
            "Order not found. Please check the number and try again",
          ),
        )
      }

      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t("تتبع طلبك", "Track Your Order")}</CardTitle>
        <CardDescription>
          {t("أدخل رقم الطلب للتحقق من حالته", "Enter your order number to check its status")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTrackOrder} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder={t("رقم الطلب", "Order Number")}
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("جاري البحث...", "Searching...")}
              </>
            ) : (
              t("تتبع الطلب", "Track Order")
            )}
          </Button>
        </form>

        {orderStatus && (
          <div className="mt-6 p-4 border rounded-md bg-muted/30">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{t("حالة الطلب", "Order Status")}</h3>
              <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary font-medium">
                {orderStatus.status}
              </span>
            </div>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">{t("التاريخ:", "Date:")}</span> {orderStatus.date}
              </p>
              <p>
                <span className="font-medium">{t("التفاصيل:", "Details:")}</span> {orderStatus.details}
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          {t("لأي استفسارات، يرجى التواصل معنا عبر واتساب", "For any inquiries, please contact us via WhatsApp")}
        </p>
      </CardFooter>
    </Card>
  )
}

