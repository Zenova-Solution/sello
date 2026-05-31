"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { SalesDistribution } from "@/components/dashboard/sales-distribution"
import { Skeleton } from "@/components/ui/skeleton"
import {
  kpiData,
  revenueData,
  categorySales,
  topProducts,
  activities,
} from "@/data/mock-data"
import { cn, formatCurrency, formatNumber } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const cubicBezier = [0.25, 0.1, 0.25, 1] as const

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: cubicBezier },
  },
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn(
              "h-[124px] rounded-(--radius-lg)",
              i === 6 && "lg:col-span-1"
            )}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Skeleton className="h-[380px] rounded-(--radius-lg) lg:col-span-2" />
        <Skeleton className="h-[380px] rounded-(--radius-lg)" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Skeleton className="h-[320px] rounded-(--radius-lg) lg:col-span-2" />
        <Skeleton className="h-[320px] rounded-(--radius-lg)" />
      </div>
    </div>
  )
}

function DashboardContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* KPI Cards */}
      <motion.div variants={sectionVariants}>
        <div className="mb-4 space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-(--muted-foreground)">
            Overview of your business performance and key metrics.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, i) => (
              <div key={kpi.title}>
                <KpiCard
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                trend={kpi.trend}
                icon={kpi.icon}
                index={i}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Revenue Chart + Activity Feed */}
      <motion.div
        variants={sectionVariants}
        className="grid grid-cols-1 gap-4 lg:grid-cols-3"
      >
        <RevenueChart
          data={revenueData}
          className="lg:col-span-2"
        />
        <ActivityFeed activities={activities} />
      </motion.div>

      {/* Top Products + Sales Distribution */}
      <motion.div
        variants={sectionVariants}
        className="grid grid-cols-1 gap-4 lg:grid-cols-3"
      >
        <div className="rounded-(--radius-lg) border border-(--border) bg-(--card) p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Top Selling Products</h3>
              <p className="mt-0.5 text-xs text-(--muted-foreground)">
                Best performing items this week
              </p>
            </div>
          </div>

          <div className="space-y-1">
            {topProducts.map((product, i) => (
              <div
                key={product.id}
                className="group flex items-center gap-4 rounded-(--radius-md) px-3 py-2.5 transition-colors duration-200 hover:bg-(--muted)/[0.3]"
              >
                <span className="w-5 text-center text-xs font-medium text-(--muted-foreground)">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-(--muted-foreground)">
                    {formatNumber(product.sales)} units sold
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium tabular-nums">
                    {formatCurrency(product.revenue)}
                  </p>
                  <div className="flex items-center justify-end gap-1">
                    {product.growth >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-(--success)" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-(--destructive)" />
                    )}
                    <span
                      className={cn(
                        "text-xs tabular-nums",
                        product.growth >= 0
                          ? "text-(--success)"
                          : "text-(--destructive)"
                      )}
                    >
                      {product.growth >= 0 ? "+" : ""}
                      {product.growth}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <SalesDistribution data={categorySales} />
      </motion.div>
    </motion.div>
  )
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>{loading ? <DashboardSkeleton /> : <DashboardContent />}</>
  )
}
