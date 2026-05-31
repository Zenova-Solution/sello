"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Tag,
  Plus,
  Percent,
  DollarSign,
  Calendar,
  Users,
  Copy,
  CheckCircle2,
  XCircle,
} from "lucide-react"

import { cn, formatCurrency, formatDate } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

interface Discount {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  minOrder: number
  used: number
  maxUses: number
  expiresAt: string
  active: boolean
}

const initialDiscounts: Discount[] = [
  {
    id: "d1",
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minOrder: 20,
    used: 45,
    maxUses: 100,
    expiresAt: "2026-06-30",
    active: true,
  },
  {
    id: "d2",
    code: "SAVE5",
    type: "fixed",
    value: 5,
    minOrder: 15,
    used: 128,
    maxUses: 200,
    expiresAt: "2026-06-15",
    active: true,
  },
  {
    id: "d3",
    code: "FREESHIP",
    type: "fixed",
    value: 0,
    minOrder: 50,
    used: 32,
    maxUses: 50,
    expiresAt: "2026-05-31",
    active: false,
  },
  {
    id: "d4",
    code: "HALFOFF",
    type: "percentage",
    value: 50,
    minOrder: 100,
    used: 12,
    maxUses: 25,
    expiresAt: "2026-06-20",
    active: true,
  },
]

export default function DiscountsPage() {
  const [discounts, setDiscounts] = React.useState(initialDiscounts)

  const toggleDiscount = (id: string) => {
    setDiscounts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d))
    )
  }

  const activeDiscounts = discounts.filter((d) => d.active)

  return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Discounts</h1>
            <p className="mt-1 text-sm text-(--muted-foreground)">Create and manage promotional codes</p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Create Discount
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Active Discounts", value: activeDiscounts.length, icon: Tag, color: "text-(--primary)" },
            { label: "Total Codes", value: discounts.length, icon: Percent, color: "text-(--info)" },
            { label: "Total Used", value: discounts.reduce((s, d) => s + d.used, 0), icon: Users, color: "text-(--success)" },
            { label: "Expiring Soon", value: discounts.filter((d) => {
              const days = (new Date(d.expiresAt).getTime() - Date.now()) / (1000 * 86400)
              return days > 0 && days <= 7
            }).length, icon: Calendar, color: "text-(--warning)" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className={cn("rounded-(--radius-md) bg-(--muted) p-2.5", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-(--muted-foreground)">{stat.label}</p>
                  <p className="text-xl font-semibold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {discounts.length === 0 ? (
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="rounded-(--radius-lg) bg-(--muted) p-4">
                  <Tag className="h-8 w-8 text-(--muted-foreground)" />
                </div>
                <p className="mt-4 text-sm font-medium">No discounts yet</p>
                <p className="mt-1 text-xs text-(--muted-foreground)">
                  Create your first discount code to start promoting
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  <Plus className="h-3 w-3" />
                  Create Discount
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {discounts.map((discount) => (
              <Card key={discount.id} className="transition-all duration-200 hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="rounded-(--radius-md) bg-(--muted) p-2.5">
                      {discount.type === "percentage" ? (
                        <Percent className="h-5 w-5 text-(--primary)" />
                      ) : (
                        <DollarSign className="h-5 w-5 text-(--primary)" />
                      )}
                    </div>
                    <Switch
                      checked={discount.active}
                      onCheckedChange={() => toggleDiscount(discount.id)}
                    />
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <code className="rounded-(--radius-sm) bg-(--muted) px-2 py-1 text-sm font-mono font-semibold tracking-wider">
                        {discount.code}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => navigator.clipboard.writeText(discount.code)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="mt-2 text-lg font-semibold">
                      {discount.type === "percentage"
                        ? `${discount.value}% OFF`
                        : discount.value > 0
                          ? `${formatCurrency(discount.value)} OFF`
                          : "Free Shipping"}
                    </p>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-(--muted-foreground)">Min. Order</span>
                      <span className="font-medium">
                        {discount.minOrder > 0 ? formatCurrency(discount.minOrder) : "No minimum"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-(--muted-foreground)">Usage</span>
                      <span className="font-medium">
                        {discount.used} / {discount.maxUses}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-(--muted-foreground)">Expires</span>
                      <span
                        className={cn(
                          "font-medium",
                          new Date(discount.expiresAt) < new Date()
                            ? "text-(--destructive)"
                            : "text-(--foreground)"
                        )}
                      >
                        {formatDate(discount.expiresAt, "short")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-1">
                    {discount.active ? (
                      <Badge variant="success" className="text-[10px] gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px] gap-1">
                        <XCircle className="h-3 w-3" />
                        Inactive
                      </Badge>
                    )}
                    {new Date(discount.expiresAt) < new Date() && (
                      <Badge variant="destructive" className="text-[10px]">
                        Expired
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </motion.div>
  )
}
