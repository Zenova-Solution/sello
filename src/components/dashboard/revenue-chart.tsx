"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { cn, formatCurrency } from "@/lib/utils"
import type { SalesDataPoint } from "@/types"

interface RevenueChartProps {
  data: SalesDataPoint[]
  className?: string
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-(--radius-md) border border-(--border) bg-(--card) px-3 py-2 shadow-md">
      <p className="text-xs font-medium text-(--muted-foreground)">{label}</p>
      <p className="text-sm font-semibold text-(--foreground)">
        {formatCurrency(payload[0].value)}
      </p>
      {payload[1] && (
        <p className="text-xs text-(--muted-foreground)">
          Orders: {payload[1].value}
        </p>
      )}
    </div>
  )
}

export function RevenueChart({ data, className }: RevenueChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        "rounded-(--radius-lg) border border-(--border) bg-(--card) p-5",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Revenue Overview</h3>
          <p className="mt-0.5 text-xs text-(--muted-foreground)">
            Last 7 days
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-(--primary)" />
            <span className="text-xs text-(--muted-foreground)">Revenue</span>
          </div>
        </div>
      </div>

      <div className="h-[280px]">
        {mounted && <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              strokeOpacity={0.5}
              vertical={false}
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
              dx={-4}
            />

            <Tooltip content={<CustomTooltip />} cursor={false} />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#revenueFill)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "var(--primary)",
                stroke: "var(--card)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>}
      </div>
    </motion.div>
  )
}
