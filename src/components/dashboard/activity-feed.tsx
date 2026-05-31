"use client"

import { motion } from "framer-motion"
import {
  ShoppingCart,
  DollarSign,
  UserPlus,
  Package,
  UserCog,
  ChevronRight,
} from "lucide-react"
import { cn, formatDate } from "@/lib/utils"
import type { Activity } from "@/types"

const activityIconMap = {
  order: ShoppingCart,
  payment: DollarSign,
  customer: UserPlus,
  inventory: Package,
  employee: UserCog,
} as const

const activityColors = {
  order: "text-(--primary)",
  payment: "text-(--success)",
  customer: "text-(--info)",
  inventory: "text-(--warning)",
  employee: "text-(--accent-foreground)",
} as const

const activityBgColors = {
  order: "bg-(--primary)/[0.08]",
  payment: "bg-(--success)/[0.08]",
  customer: "bg-(--info)/[0.08]",
  inventory: "bg-(--warning)/[0.08]",
  employee: "bg-(--muted)",
} as const

interface ActivityFeedProps {
  activities: Activity[]
  className?: string
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  const sorted = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  return (
    <div className={cn("rounded-(--radius-lg) border border-(--border) bg-(--card)", className)}>
      <div className="flex items-center justify-between border-b border-(--border) px-5 py-4">
        <h3 className="text-sm font-semibold">Recent Activity</h3>
        <span className="text-xs text-(--muted-foreground)">Live</span>
      </div>

      <div className="max-h-[360px] overflow-y-auto">
        {sorted.map((activity, i) => {
          const Icon = activityIconMap[activity.type]
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="group flex items-start gap-3 border-b border-(--border)/50 px-5 py-3.5 transition-colors duration-200 last:border-b-0 hover:bg-(--muted)/[0.3]"
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-(--radius-md)",
                  activityBgColors[activity.type]
                )}
              >
                <Icon className={cn("h-4 w-4", activityColors[activity.type])} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug text-(--foreground)">
                  {activity.message}
                </p>
                <div className="mt-0.5 flex items-center gap-2">
                  {activity.user && (
                    <span className="text-xs font-medium text-(--muted-foreground)">
                      {activity.user}
                    </span>
                  )}
                  <span className="text-xs text-(--muted-foreground)">
                    {formatDate(activity.timestamp, "relative")}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-between border-t border-(--border) px-5 py-3 text-xs font-medium text-(--muted-foreground) transition-colors duration-200 hover:text-(--foreground)"
      >
        View all activity
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
