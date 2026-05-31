"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Edit3,
  Trash2,
  Beer,
  Coffee,
  Cookie,
  Apple,
  Monitor,
  Shirt,
  PackageIcon,
  LayoutGrid,
} from "lucide-react"

import { cn, formatCurrency, formatNumber } from "@/lib/utils"
import { products, orders } from "@/data/mock-data"
import type { ProductCategory } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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

interface CategoryInfo {
  key: ProductCategory
  label: string
  icon: React.ReactNode
  color: string
  gradient: string
}

const categoryInfo: CategoryInfo[] = [
  {
    key: "food",
    label: "Food",
    icon: <Beer className="h-6 w-6" />,
    color: "text-(--success)",
    gradient: "from-(--success)/20 to-(--success)/5",
  },
  {
    key: "beverages",
    label: "Beverages",
    icon: <Coffee className="h-6 w-6" />,
    color: "text-(--info)",
    gradient: "from-(--info)/20 to-(--info)/5",
  },
  {
    key: "snacks",
    label: "Snacks",
    icon: <Cookie className="h-6 w-6" />,
    color: "text-(--warning)",
    gradient: "from-(--warning)/20 to-(--warning)/5",
  },
  {
    key: "groceries",
    label: "Groceries",
    icon: <Apple className="h-6 w-6" />,
    color: "text-(--destructive)",
    gradient: "from-(--destructive)/20 to-(--destructive)/5",
  },
  {
    key: "electronics",
    label: "Electronics",
    icon: <Monitor className="h-6 w-6" />,
    color: "text-(--primary)",
    gradient: "from-(--primary)/20 to-(--primary)/5",
  },
  {
    key: "clothing",
    label: "Clothing",
    icon: <Shirt className="h-6 w-6" />,
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    key: "other",
    label: "Other",
    icon: <PackageIcon className="h-6 w-6" />,
    color: "text-(--muted-foreground)",
    gradient: "from-(--muted)/50 to-(--muted)/20",
  },
]

function getCategorySales(key: ProductCategory): number {
  return orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => {
      const hasCategory = o.items.some((item) => {
        const p = products.find((pr) => pr.id === item.productId)
        return p?.category === key
      })
      return sum + (hasCategory ? o.total : 0)
    }, 0)
}

export default function CategoriesPage() {
  const [hovered, setHovered] = React.useState<string | null>(null)

  const categories = categoryInfo.map((cat) => {
    const count = products.filter((p) => p.category === cat.key).length
    const sales = getCategorySales(cat.key)
    return { ...cat, count, sales }
  })

  return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
            <p className="mt-1 text-sm text-(--muted-foreground)">Organize your products by category</p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => (
            <Card
              key={cat.key}
              className={cn(
                "group relative overflow-hidden transition-all duration-200",
                hovered === cat.key && "shadow-md"
              )}
              onMouseEnter={() => setHovered(cat.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-60",
                  cat.gradient
                )}
              />
              <CardContent className="relative p-5">
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "rounded-(--radius-lg) bg-(--background) p-3 shadow-sm",
                      cat.color
                    )}
                  >
                    {cat.icon}
                  </div>
                  <div
                    className={cn(
                      "flex gap-1 opacity-0 transition-opacity",
                      hovered === cat.key && "opacity-100"
                    )}
                  >
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-(--destructive)">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <h3 className="mt-4 text-base font-semibold">{cat.label}</h3>
                <div className="mt-3 flex items-center gap-4 text-xs text-(--muted-foreground)">
                  <span>
                    <span className="font-medium text-(--foreground)">{formatNumber(cat.count)}</span> products
                  </span>
                  <span>
                    <span className="font-medium text-(--foreground)">{formatCurrency(cat.sales)}</span> sales
                  </span>
                </div>
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 flex-1 rounded-full",
                        i < Math.round((cat.count / 7) * 5)
                          ? cat.color.replace("text", "bg")
                          : "bg-(--muted)"
                      )}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-(--radius-lg) bg-(--muted) p-3">
                  <LayoutGrid className="h-5 w-5 text-(--muted-foreground)" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {categories.reduce((sum, c) => sum + c.count, 0)} products across{" "}
                    {categories.length} categories
                  </p>
                  <p className="text-xs text-(--muted-foreground) mt-0.5">
                    Total category sales:{" "}
                    {formatCurrency(categories.reduce((sum, c) => sum + c.sales, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
  )
}
