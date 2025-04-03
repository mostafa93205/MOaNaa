"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useStore, type OrderStatus } from "@/components/store-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Printer, Download, Filter, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { ar, enUS } from "date-fns/locale"

export function OrdersManagement() {
  const { t, language } = useLanguage()
  const { orders, updateOrderStatus } = useStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isUpdating, setIsUpdating] = useState(false)

  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchQuery.toLowerCase()
    const customerName = language === "ar" ? order.customer : order.customerEn
    const matchesSearch =
      order.id.toLowerCase().includes(searchLower) ||
      customerName.toLowerCase().includes(searchLower) ||
      order.email.toLowerCase().includes(searchLower) ||
      order.phone.includes(searchQuery)

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Sort orders by date (newest first)
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  // Get status badge color
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            {t("قيد الانتظار", "Pending")}
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            {t("تم الشحن", "Shipped")}
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            {t("تم التسليم", "Delivered")}
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            {t("ملغي", "Cancelled")}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, "PPP", { locale: language === "ar" ? ar : enUS })
    } catch (error) {
      return dateString
    }
  }

  // View order details
  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setIsViewDialogOpen(true)
  }

  // Update order status
  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setIsUpdating(true)
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      updateOrderStatus(orderId, newStatus)

      // Update the selected order if it's currently being viewed
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          status: newStatus,
        })
      }
    } finally {
      setIsUpdating(false)
    }
  }

  // Print order
  const handlePrintOrder = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-950 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t("إدارة الطلبات", "Orders Management")}</CardTitle>
            <CardDescription>{t("عرض وإدارة طلبات العملاء", "View and manage customer orders")}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("بحث عن طلب...", "Search orders...")}
                className="w-[250px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t("جميع الحالات", "All Statuses")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("جميع الحالات", "All Statuses")}</SelectItem>
                <SelectItem value="pending">{t("قيد الانتظار", "Pending")}</SelectItem>
                <SelectItem value="shipped">{t("تم الشحن", "Shipped")}</SelectItem>
                <SelectItem value="delivered">{t("تم التسليم", "Delivered")}</SelectItem>
                <SelectItem value="cancelled">{t("ملغي", "Cancelled")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("رقم الطلب", "Order ID")}</TableHead>
                  <TableHead>{t("العميل", "Customer")}</TableHead>
                  <TableHead>{t("التاريخ", "Date")}</TableHead>
                  <TableHead>{t("الحالة", "Status")}</TableHead>
                  <TableHead>{t("المجموع", "Total")}</TableHead>
                  <TableHead className="text-right">{t("الإجراءات", "Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{language === "ar" ? order.customer : order.customerEn}</TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {sortedOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Search className="h-8 w-8 mb-2" />
                        {searchQuery
                          ? t("لا توجد نتائج للبحث عن", "No results found for") + ` "${searchQuery}"`
                          : t("لا توجد طلبات", "No orders found")}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>
                  {t("تفاصيل الطلب", "Order Details")} - {selectedOrder.id}
                </span>
                {getStatusBadge(selectedOrder.status)}
              </DialogTitle>
              <DialogDescription>
                {t("تاريخ الطلب", "Order Date")}: {formatDate(selectedOrder.date)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg border">
                    <h4 className="text-sm font-semibold mb-2">{t("معلومات العميل", "Customer Information")}</h4>
                    <div className="space-y-1">
                      <p className="text-sm flex justify-between">
                        <span className="text-muted-foreground">{t("الاسم", "Name")}:</span>
                        <span className="font-medium">
                          {language === "ar" ? selectedOrder.customer : selectedOrder.customerEn}
                        </span>
                      </p>
                      <p className="text-sm flex justify-between">
                        <span className="text-muted-foreground">{t("البريد الإلكتروني", "Email")}:</span>
                        <span className="font-medium">{selectedOrder.email}</span>
                      </p>
                      <p className="text-sm flex justify-between">
                        <span className="text-muted-foreground">{t("رقم الهاتف", "Phone")}:</span>
                        <span className="font-medium">{selectedOrder.phone}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg border">
                    <h4 className="text-sm font-semibold mb-2">{t("عنوان التوصيل", "Shipping Address")}</h4>
                    <p className="text-sm whitespace-pre-wrap">
                      {language === "ar" ? selectedOrder.address : selectedOrder.addressEn}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border">
                <h4 className="text-sm font-semibold mb-3">{t("المنتجات", "Products")}</h4>
                <div className="rounded-md border bg-background">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("المنتج", "Product")}</TableHead>
                        <TableHead>{t("السعر", "Price")}</TableHead>
                        <TableHead>{t("الكمية", "Quantity")}</TableHead>
                        <TableHead className="text-right">{t("المجموع", "Subtotal")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{language === "ar" ? item.name : item.nameEn}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-right">{item.price}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-semibold">
                          {t("المجموع الكلي", "Total")}:
                        </TableCell>
                        <TableCell className="text-right font-bold">{selectedOrder.total}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border">
                <h4 className="text-sm font-semibold mb-3">{t("تحديث الحالة", "Update Status")}</h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedOrder.status === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedOrder.id, "pending")}
                    disabled={isUpdating || selectedOrder.status === "pending"}
                    className="flex items-center"
                  >
                    {isUpdating && selectedOrder.status !== "pending" && (
                      <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                    )}
                    {t("قيد الانتظار", "Pending")}
                  </Button>
                  <Button
                    variant={selectedOrder.status === "shipped" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedOrder.id, "shipped")}
                    disabled={isUpdating || selectedOrder.status === "shipped"}
                    className="flex items-center"
                  >
                    {isUpdating && selectedOrder.status !== "shipped" && (
                      <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                    )}
                    {t("تم الشحن", "Shipped")}
                  </Button>
                  <Button
                    variant={selectedOrder.status === "delivered" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedOrder.id, "delivered")}
                    disabled={isUpdating || selectedOrder.status === "delivered"}
                    className="flex items-center"
                  >
                    {isUpdating && selectedOrder.status !== "delivered" && (
                      <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                    )}
                    {t("تم التسليم", "Delivered")}
                  </Button>
                  <Button
                    variant={selectedOrder.status === "cancelled" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedOrder.id, "cancelled")}
                    disabled={isUpdating || selectedOrder.status === "cancelled"}
                    className="flex items-center"
                  >
                    {isUpdating && selectedOrder.status !== "cancelled" && (
                      <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                    )}
                    {t("ملغي", "Cancelled")}
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handlePrintOrder} className="gap-2">
                <Printer className="h-4 w-4" />
                {t("طباعة", "Print")}
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                {t("تصدير PDF", "Export PDF")}
              </Button>
              <Button onClick={() => setIsViewDialogOpen(false)}>{t("إغلاق", "Close")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

