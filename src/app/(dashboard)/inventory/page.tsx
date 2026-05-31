"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Package,
  AlertTriangle,
  PackageCheck,
  PackageX,
  Plus,
  ArrowDown,
  ArrowUp,
  RefreshCw,
} from "lucide-react"

import { cn, formatCurrency, formatNumber, formatDate } from "@/lib/utils"
import { products, inventoryMovements } from "@/data/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

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

const typeIcons = {
  in: <ArrowDown className="h-4 w-4 text-(--success)" />,
  out: <ArrowUp className="h-4 w-4 text-(--destructive)" />,
  adjustment: <RefreshCw className="h-4 w-4 text-(--warning)" />,
}

const typeColors = {
  in: "text-(--success)" as const,
  out: "text-(--destructive)" as const,
  adjustment: "text-(--warning)" as const,
}

function getStockColor(stock: number, minStock: number): string {
  if (stock === 0) return "bg-(--destructive)"
  if (stock <= minStock) return "bg-(--warning)"
  return "bg-(--success)"
}

function getStockLabel(stock: number, minStock: number): { label: string; className: string } {
  if (stock === 0) return { label: "Out of Stock", className: "text-(--destructive)" }
  if (stock <= minStock) return { label: "Low Stock", className: "text-(--warning)" }
  return { label: "In Stock", className: "text-(--success)" }
}

export default function InventoryPage() {
  const [filter, setFilter] = React.useState("all")

  const filteredProducts = products.filter((p) => {
    if (filter === "low") return p.stock > 0 && p.stock <= p.minStock
    if (filter === "out") return p.stock === 0
    return true
  })

  const totalItems = products.reduce((s, p) => s + p.stock, 0)
  const inStock = products.filter((p) => p.stock > p.minStock).length
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= p.minStock).length
  const outOfStock = products.filter((p) => p.stock === 0).length

  const sortedMovements = [...inventoryMovements].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
            <p className="mt-1 text-sm text-(--muted-foreground)">Track stock levels and movements</p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Add Stock
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Items", value: formatNumber(totalItems), icon: Package, color: "text-(--primary)" },
            { label: "In Stock", value: inStock, icon: PackageCheck, color: "text-(--success)" },
            { label: "Low Stock", value: lowStock, icon: AlertTriangle, color: "text-(--warning)" },
            { label: "Out of Stock", value: outOfStock, icon: PackageX, color: "text-(--destructive)" },
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

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <CardTitle className="text-sm font-medium">Stock Levels</CardTitle>
              <Tabs value={filter} onValueChange={setFilter}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="low">Low Stock</TabsTrigger>
                  <TabsTrigger value="out">Out of Stock</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mobile card view */}
              <div className="block sm:hidden divide-y divide-(--border)">
                {filteredProducts.map((product) => {
                  const stockPercent = Math.min(
                    (product.stock / Math.max(product.minStock * 2, 1)) * 100,
                    100
                  )
                  const health = getStockLabel(product.stock, product.minStock)
                  const stockColor = getStockColor(product.stock, product.minStock)
                  const healthVariant = health.className.includes("success")
                    ? "success"
                    : health.className.includes("warning")
                      ? "warning"
                      : "destructive"
                  return (
                    <div key={product.id} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-(--radius-md) bg-(--muted)">
                            <Package className="h-4 w-4 text-(--muted-foreground)" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{product.name}</p>
                            <p className="text-xs text-(--muted-foreground) capitalize truncate">
                              {product.category}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={product.active ? "default" : "secondary"}
                          className="text-[10px] shrink-0"
                        >
                          {product.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                        <div>
                          <p className="text-xs text-(--muted-foreground)">SKU</p>
                          <code className="mt-0.5 inline-block rounded-(--radius-sm) bg-(--muted) px-2 py-0.5 text-xs font-mono">
                            {product.sku}
                          </code>
                        </div>
                        <div>
                          <p className="text-xs text-(--muted-foreground)">Health</p>
                          <Badge variant={healthVariant} className="mt-0.5 text-[10px]">
                            {health.label}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-(--muted-foreground)">Min Stock</p>
                          <p className="mt-0.5 text-(--muted-foreground)">{product.minStock}</p>
                        </div>
                        <div>
                          <p className="text-xs text-(--muted-foreground)">Last Restocked</p>
                          <p className="mt-0.5 text-(--muted-foreground)">{formatDate(product.createdAt)}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-xs text-(--muted-foreground)">Stock Level</p>
                          <span className="text-xs font-medium">{product.stock}</span>
                        </div>
                        <Progress
                          value={stockPercent}
                          className={cn("h-2", stockColor)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* Desktop table view */}
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="hidden sm:table-cell">SKU</TableHead>
                      <TableHead>Stock Level</TableHead>
                      <TableHead className="hidden md:table-cell">Min Stock</TableHead>
                      <TableHead className="hidden md:table-cell">Health</TableHead>
                      <TableHead className="hidden sm:table-cell">Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Last Restocked</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => {
                      const stockPercent = Math.min(
                        (product.stock / Math.max(product.minStock * 2, 1)) * 100,
                        100
                      )
                      const health = getStockLabel(product.stock, product.minStock)
                      const stockColor = getStockColor(product.stock, product.minStock)
                      return (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-(--radius-md) bg-(--muted)">
                                <Package className="h-4 w-4 text-(--muted-foreground)" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{product.name}</p>
                                <p className="text-xs text-(--muted-foreground) capitalize">
                                  {product.category}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <code className="rounded-(--radius-sm) bg-(--muted) px-2 py-0.5 text-xs font-mono">
                              {product.sku}
                            </code>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={stockPercent}
                                className={cn("h-2 flex-1", stockColor)}
                              />
                              <span className="w-8 text-right text-xs font-medium">
                                {product.stock}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-xs text-(--muted-foreground)">
                            {product.minStock}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge
                              variant={
                                health.className.includes("success")
                                  ? "success"
                                  : health.className.includes("warning")
                                    ? "warning"
                                    : "destructive"
                              }
                              className="text-[10px]"
                            >
                              {health.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge
                              variant={product.active ? "default" : "secondary"}
                              className="text-[10px]"
                            >
                              {product.active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-xs text-(--muted-foreground)">
                            {formatDate(product.createdAt)}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Inventory Movements</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="max-h-[400px]">
                <div className="p-4">
                  {sortedMovements.map((movement, idx) => (
                    <div key={movement.id}>
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-full border bg-(--background)",
                              typeColors[movement.type]
                            )}
                          >
                            {typeIcons[movement.type]}
                          </div>
                          {idx < sortedMovements.length - 1 && (
                            <div className="mt-1 h-full w-px bg-(--border)" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{movement.productName}</p>
                            <Badge variant="secondary" className="text-[10px] capitalize">
                              {movement.type}
                            </Badge>
                          </div>
                          <p className="mt-0.5 text-xs text-(--muted-foreground)">
                            {movement.type === "in"
                              ? `+${movement.quantity} units`
                              : movement.type === "out"
                                ? `-${movement.quantity} units`
                                : `${movement.quantity} units`}{" "}
                            &middot; {movement.reason}
                          </p>
                          <div className="mt-1 flex items-center gap-3 text-[11px] text-(--muted-foreground)">
                            <span>{movement.createdBy}</span>
                            <span>&middot;</span>
                            <span>{formatDate(movement.createdAt, "relative")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
  )
}
