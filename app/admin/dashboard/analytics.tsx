"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useStore } from "@/components/store-provider"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Activity,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

export function DashboardAnalytics() {
  const { t, language } = useLanguage()
  const { analytics, products, orders } = useStore()
  const [period, setPeriod] = useState("week")

  // Colors for charts
  const COLORS = ["#E11D48", "#9333EA", "#3B82F6", "#10B981"]
  const AREA_COLORS = ["#E11D48", "#9333EA"]

  // Format currency
  const formatCurrency = (value: number) => {
    return `EGP ${value.toLocaleString()}`
  }

  // Calculate recent sales trend
  const recentSales = analytics.salesByPeriod.week.slice(-3).reduce((sum, item) => sum + item.sales, 0)
  const previousSales = analytics.salesByPeriod.week.slice(-6, -3).reduce((sum, item) => sum + item.sales, 0)
  const salesTrend = ((recentSales - previousSales) / previousSales) * 100

  // Calculate recent orders trend
  const pendingOrders = orders.filter((order) => order.status === "pending").length
  const shippedOrders = orders.filter((order) => order.status === "shipped").length
  const deliveredOrders = orders.filter((order) => order.status === "delivered").length

  // Calculate revenue by category
  const revenueByCategory = products.reduce(
    (acc, product) => {
      const category = product.category
      const price = Number.parseInt(product.price?.replace(/\D/g, "") || "0", 10)
      acc[category] = (acc[category] || 0) + price
      return acc
    },
    {} as Record<string, number>,
  )

  const categoryRevenueData = Object.entries(revenueByCategory).map(([category, revenue]) => ({
    name: t(
      category === "body-splash"
        ? "بادي سبلاش"
        : category === "body-lotion"
          ? "بادي لوشن"
          : category === "lip-balm"
            ? "ليب بالم"
            : "زيت الشعر",
      category === "body-splash"
        ? "Body Splash"
        : category === "body-lotion"
          ? "Body Lotion"
          : category === "lip-balm"
            ? "Lip Balm"
            : "Hair Oil",
    ),
    value: revenue,
  }))

  // Prepare data for the area chart
  const areaChartData = analytics.salesByPeriod[period as keyof typeof analytics.salesByPeriod].map((item) => ({
    name: item.name,
    sales: item.sales,
    orders: item.sales / 250, // Approximate number of orders based on average order value
  }))

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("إجمالي المبيعات", "Total Sales")}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics.totalSales)}</div>
            <div className="flex items-center pt-1 text-xs">
              {analytics.salesGrowth > 0 ? (
                <>
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{analytics.salesGrowth}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  <span className="text-red-500">{analytics.salesGrowth}%</span>
                </>
              )}
              <span className="ml-1 text-muted-foreground">{t("من الشهر الماضي", "from last month")}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("الطلبات", "Orders")}</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalOrders}</div>
            <div className="flex items-center pt-1 text-xs">
              {analytics.ordersGrowth > 0 ? (
                <>
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{analytics.ordersGrowth}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  <span className="text-red-500">{analytics.ordersGrowth}%</span>
                </>
              )}
              <span className="ml-1 text-muted-foreground">{t("من الشهر الماضي", "from last month")}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("العملاء الجدد", "New Customers")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.newCustomers}</div>
            <div className="flex items-center pt-1 text-xs">
              {analytics.customersGrowth > 0 ? (
                <>
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{analytics.customersGrowth}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  <span className="text-red-500">{analytics.customersGrowth}%</span>
                </>
              )}
              <span className="ml-1 text-muted-foreground">{t("من الشهر الماضي", "from last month")}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("حالة الطلبات", "Order Status")}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 mr-2">
                    {pendingOrders}
                  </Badge>
                  <span className="text-sm">{t("قيد الانتظار", "Pending")}</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 mr-2">
                    {shippedOrders}
                  </Badge>
                  <span className="text-sm">{t("تم الشحن", "Shipped")}</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 mr-2">
                    {deliveredOrders}
                  </Badge>
                  <span className="text-sm">{t("تم التسليم", "Delivered")}</span>
                </div>
              </div>
              <div className="text-2xl font-bold">{orders.length}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Analytics Chart */}
      <Card className="bg-white dark:bg-gray-950 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("تحليل المبيعات والطلبات", "Sales & Orders Analytics")}</CardTitle>
              <CardDescription>
                {t("تحليل المبيعات والطلبات حسب الفترة الزمنية", "Sales and orders analysis by time period")}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {salesTrend > 0 ? (
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />+{salesTrend.toFixed(1)}%
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  {salesTrend.toFixed(1)}%
                </Badge>
              )}
            </div>
          </div>
          <Tabs defaultValue="week" onValueChange={setPeriod} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
              <TabsTrigger value="week">{t("أسبوع", "Week")}</TabsTrigger>
              <TabsTrigger value="month">{t("شهر", "Month")}</TabsTrigger>
              <TabsTrigger value="year">{t("سنة", "Year")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={areaChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={AREA_COLORS[0]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={AREA_COLORS[0]} stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={AREA_COLORS[1]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={AREA_COLORS[1]} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke={AREA_COLORS[0]} />
              <YAxis yAxisId="right" orientation="right" stroke={AREA_COLORS[1]} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                name={t("المبيعات", "Sales")}
                stroke={AREA_COLORS[0]}
                fillOpacity={1}
                fill="url(#colorSales)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                name={t("الطلبات", "Orders")}
                stroke={AREA_COLORS[1]}
                fillOpacity={1}
                fill="url(#colorOrders)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Product Distribution and Top Selling Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-950 shadow-sm">
          <CardHeader>
            <CardTitle>{t("توزيع المنتجات", "Product Distribution")}</CardTitle>
            <CardDescription>
              {t("توزيع المبيعات حسب فئات المنتجات", "Sales distribution by product categories")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.productDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {analytics.productDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => [`${value}%`, t("النسبة", "Percentage")]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-950 shadow-sm">
          <CardHeader>
            <CardTitle>{t("أفضل المنتجات مبيعًا", "Top Selling Products")}</CardTitle>
            <CardDescription>
              {t("المنتجات الأكثر مبيعًا حسب الإيرادات", "Best selling products by revenue")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analytics.topSellingProducts.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                      <i className={`fas fa-${product.icon}`}></i>
                    </div>
                    <div>
                      <p className="font-medium">{language === "ar" ? product.name : product.nameEn}</p>
                      <p className="text-sm text-muted-foreground">
                        {t(`${product.units} وحدة`, `${product.units} units`)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(product.revenue)}</p>
                    <div className="text-xs text-muted-foreground">{t("الإيرادات", "Revenue")}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Category */}
      <Card className="bg-white dark:bg-gray-950 shadow-sm">
        <CardHeader>
          <CardTitle>{t("الإيرادات حسب الفئة", "Revenue by Category")}</CardTitle>
          <CardDescription>
            {t(
              "مقارنة الإيرادات بين فئات المنتجات المختلفة",
              "Revenue comparison between different product categories",
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={categoryRevenueData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [formatCurrency(value as number), t("الإيرادات", "Revenue")]} />
              <Bar dataKey="value" name={t("الإيرادات", "Revenue")} fill="#E11D48" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity and Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-950 shadow-sm">
          <CardHeader>
            <CardTitle>{t("النشاط الأخير", "Recent Activity")}</CardTitle>
            <CardDescription>
              {t("آخر الأنشطة والإجراءات في المتجر", "Latest activities and actions in the store")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order, index) => (
                <div key={index} className="flex items-start pb-4 last:pb-0 last:border-0 border-b">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "shipped"
                          ? "bg-blue-100 text-blue-600"
                          : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                    }`}
                  >
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{language === "ar" ? order.customer : order.customerEn}</p>
                      <span className="text-xs text-muted-foreground">{order.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t(`طلب جديد بقيمة ${order.total}`, `New order for ${order.total}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-950 shadow-sm">
          <CardHeader>
            <CardTitle>{t("الأداء الشهري", "Monthly Performance")}</CardTitle>
            <CardDescription>
              {t("مقارنة الأداء الشهري للمبيعات", "Monthly sales performance comparison")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={analytics.salesByPeriod.year}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(value as number), t("المبيعات", "Sales")]} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  name={t("المبيعات", "Sales")}
                  stroke="#E11D48"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

