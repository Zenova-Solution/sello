"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { cn, formatCurrency } from "@/lib/utils"
import type { CategorySales } from "@/types"

interface SalesDistributionProps {
  data: CategorySales[]
  className?: string
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const entry = payload[0]
  return (
    <div className="rounded-(--radius-md) border border-(--border) bg-(--card) px-3 py-2 shadow-md">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: entry.payload.color }}
        />
        <span className="text-xs font-medium text-(--foreground)">
          {entry.name}
        </span>
      </div>
      <p className="mt-0.5 text-sm font-semibold text-(--foreground)">
        {entry.value}%
      </p>
    </div>
  )
}

export function SalesDistribution({ data, className }: SalesDistributionProps) {
  const [mounted, setMounted] = useState(false)
  const total = data.reduce((sum, d) => sum + d.value, 0)

  useEffect(() => { setMounted(true) }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className={cn(
        "rounded-(--radius-lg) border border-(--border) bg-(--card) p-5",
        className
      )}
    >
      <h3 className="mb-4 text-sm font-semibold">Sales Distribution</h3>

      <div className="relative flex items-center justify-center">
        <div className="h-[220px] w-full">
          {mounted && <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={92}
                dataKey="value"
                strokeWidth={0}
                cornerRadius={4}
                paddingAngle={3}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>}
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-bold tabular-nums">{total}%</p>
            <p className="text-xs text-(--muted-foreground)">Total</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-xs text-(--muted-foreground)">{item.name}</span>
              <span className="text-xs font-medium tabular-nums">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
