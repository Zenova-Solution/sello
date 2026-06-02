"use client"

import { useEffect, useState } from "react"
import { animate } from "framer-motion"
import {
  DollarSign,
  ShoppingBag,
  ShoppingCart,
  Receipt,
  Users,
  AlertTriangle,
  RotateCcw,
  Clock,
  Coins,
  TrendingUp,
  TrendingDown,
  Minus,
  type LucideIcon,
} from "lucide-react"
import { cn, formatCurrency, formatNumber } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  "dollar-sign": DollarSign,
  "shopping-bag": ShoppingBag,
  "shopping-cart": ShoppingCart,
  receipt: Receipt,
  users: Users,
  "alert-triangle": AlertTriangle,
  "rotate-ccw": RotateCcw,
  clock: Clock,
  coins: Coins,
}

function parseNumericValue(value: string): number {
  const cleaned = value.replace(/[^0-9.-]/g, "")
  return Number.parseFloat(cleaned) || 0
}

function useAnimatedCounter(target: number, duration = 1.5) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return controls.stop
  }, [target, duration])

  return display
}

interface KpiCardProps {
  title: string
  value: string
  change: number
  trend: "up" | "down" | "neutral"
  icon: string
}

export function KpiCard({ title, value, change, trend, icon }: KpiCardProps) {
  const Icon = iconMap[icon] || DollarSign
  const numericValue = parseNumericValue(value)
  const animatedValue = useAnimatedCounter(numericValue)

  const isCurrency = value.startsWith("$")
  const displayValue = isCurrency
    ? formatCurrency(animatedValue)
    : formatNumber(animatedValue)

  return (
    <div
      className="group relative overflow-hidden rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="absolute inset-0 bg-linear-to-br from-(--primary)/3 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <p className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">
            {displayValue}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            {trend === "up" && (
              <TrendingUp className="h-3.5 w-3.5 text-success" />
            )}
            {trend === "down" && (
              <TrendingDown className="h-3.5 w-3.5 text-destructive" />
            )}
            {trend === "neutral" && (
              <Minus className="h-3.5 w-3.5 text-muted-foreground" />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                trend === "up" && "text-success",
                trend === "down" && "text-destructive",
                trend === "neutral" && "text-muted-foreground"
              )}
            >
              {change >= 0 ? "+" : ""}
              {change}%
            </span>
            <span className="text-xs text-muted-foreground">vs last week</span>
          </div>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-(--radius-md) bg-(--primary)/8 text-primary transition-colors duration-300 group-hover:bg-(--primary)/12">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
