"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  BarChart3,
  PieChart,
  Activity,
  Clock,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
} from "recharts"

import { cn, formatCurrency, formatNumber } from "@/lib/utils"
import {
  revenueData,
  hourlySales,
  topProducts,
  categorySales,
  heatmapData,
} from "@/data/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

const paymentData = [
  { name: "Card", value: 55, color: "#0d9488" },
  { name: "Cash", value: 25, color: "#f59e0b" },
  { name: "Mobile Banking", value: 12, color: "#0ea5e9" },
  { name: "QR", value: 5, color: "#8b5cf6" },
  { name: "Split", value: 3, color: "#ef4444" },
]

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const hours = Array.from({ length: 14 }, (_, i) => i + 8)

const timeRanges = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
]

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-(--radius-md) border border-(--border) bg-(--card) p-3 shadow-md">
      <p className="text-xs font-medium text-(--muted-foreground) mb-1">{label}</p>
      {payload.map((entry: any, idx: number) => (
        <p key={idx} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  )
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-(--radius-md) border border-(--border) bg-(--card) p-2 shadow-md">
      <p className="text-xs font-medium">{label}</p>
      {payload.map((entry: any, idx: number) => (
        <p key={idx} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.name === "Sales" ? formatCurrency(entry.value) : entry.value}
        </p>
      ))}
    </div>
  )
}

function getHeatColor(value: number): string {
  if (value >= 70) return "bg-(--primary)"
  if (value >= 50) return "bg-(--primary)/70"
  if (value >= 30) return "bg-(--primary)/40"
  if (value >= 15) return "bg-(--primary)/20"
  return "bg-(--muted)"
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = React.useState("week")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => { setMounted(true) }, [])

  return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
            <p className="mt-1 text-sm text-(--muted-foreground)">Insights and performance metrics</p>
          </div>
          <Tabs value={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              {timeRanges.map((r) => (
                <TabsTrigger key={r.value} value={r.value}>
                  {r.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Revenue", value: "$38,470", change: "+12.5%", up: true, icon: DollarSign },
            { label: "Total Orders", value: "1,280", change: "+8.2%", up: true, icon: ShoppingBag },
            { label: "Avg Order Value", value: "$30.05", change: "+3.1%", up: true, icon: BarChart3 },
            { label: "Customer Growth", value: "+18.7%", change: "+18.7%", up: true, icon: Users },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="rounded-(--radius-md) bg-(--muted) p-2">
                    <stat.icon className="h-4 w-4 text-(--primary)" />
                  </div>
                  <Badge
                    variant={stat.up ? "success" : "destructive"}
                    className="text-[10px]"
                  >
                    {stat.change}
                  </Badge>
                </div>
                <p className="mt-3 text-lg font-semibold">{stat.value}</p>
                <p className="text-xs text-(--muted-foreground)">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="h-4 w-4 text-(--primary)" />
                  Revenue & Profit Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[300px]">
                  {mounted && <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                      <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "var(--primary)" }}
                        name="Revenue"
                      />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="var(--success)"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "var(--success)" }}
                        name="Profit"
                      />
                    </LineChart>
                  </ResponsiveContainer>}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Activity className="h-4 w-4 text-(--info)" />
                  Hourly Sales
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[300px]">
                  {mounted && <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlySales}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="hour" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                      <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar dataKey="sales" fill="var(--primary)" radius={[4, 4, 0, 0]} name="Sales" />
                    </BarChart>
                  </ResponsiveContainer>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Activity className="h-4 w-4 text-(--warning)" />
                Sales Heatmap
              </CardTitle>
              <CardDescription>Day vs Hour sales intensity</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <div className="inline-flex flex-col gap-1">
                  <div className="flex items-center gap-1 pl-16">
                    {hours.map((h) => (
                      <div
                        key={h}
                        className="flex h-6 w-8 items-center justify-center text-[10px] text-(--muted-foreground)"
                      >
                        {h}h
                      </div>
                    ))}
                  </div>
                  {days.map((day) => (
                    <div key={day} className="flex items-center gap-1">
                      <div className="flex h-8 w-16 items-center text-[11px] font-medium text-(--muted-foreground)">
                        {day}
                      </div>
                      {hours.map((hour) => {
                        const cell = heatmapData.find(
                          (d) => d.day === day && d.hour === hour
                        )
                        const value = cell?.value ?? 0
                        return (
                          <div
                            key={`${day}-${hour}`}
                            className={cn(
                              "h-8 w-8 rounded-(--radius-sm) transition-colors",
                              getHeatColor(value)
                            )}
                            title={`${day} ${hour}:00 - ${value} orders`}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[10px] text-(--muted-foreground)">
                <span>Low</span>
                <div className="flex gap-0.5">
                  {[0, 15, 30, 50, 70].map((v) => (
                    <div
                      key={v}
                      className={cn("h-3 w-5 rounded-(--radius-xs)", getHeatColor(v))}
                    />
                  ))}
                </div>
                <span>High</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <BarChart3 className="h-4 w-4 text-(--primary)" />
                  Best Selling Products
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[280px]">
                  {mounted && <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topProducts} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis type="number" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 10 }}
                        stroke="var(--muted-foreground)"
                        width={100}
                      />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar dataKey="revenue" fill="var(--primary)" radius={[0, 4, 4, 0]} name="Revenue" />
                    </BarChart>
                  </ResponsiveContainer>}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <PieChart className="h-4 w-4 text-(--success)" />
                  Category Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[280px]">
                  {mounted && <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={categorySales}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {categorySales.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => (
                          <span className="text-xs text-(--foreground)">{value}</span>
                        )}
                      />
                    </RePieChart>
                  </ResponsiveContainer>}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <PieChart className="h-4 w-4 text-(--info)" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[280px]">
                  {mounted && <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={paymentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {paymentData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => (
                          <span className="text-xs text-(--foreground)">{value}</span>
                        )}
                      />
                    </RePieChart>
                  </ResponsiveContainer>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
  )
}
