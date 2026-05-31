"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Package,
  Plus,
  Search,
  MoreHorizontal,
  Edit3,
  Copy,
  ToggleLeft,
  Beer,
  Coffee,
  Cookie,
  Apple,
  Monitor,
  Shirt,
  PackageIcon,
} from "lucide-react"

import { cn, formatCurrency, formatNumber } from "@/lib/utils"
import { products } from "@/data/mock-data"
import type { ProductCategory } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

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

const categoryIcons: Record<ProductCategory, React.ReactNode> = {
  food: <Beer className="h-3.5 w-3.5" />,
  beverages: <Coffee className="h-3.5 w-3.5" />,
  snacks: <Cookie className="h-3.5 w-3.5" />,
  groceries: <Apple className="h-3.5 w-3.5" />,
  electronics: <Monitor className="h-3.5 w-3.5" />,
  clothing: <Shirt className="h-3.5 w-3.5" />,
  other: <PackageIcon className="h-3.5 w-3.5" />,
}

const categories: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Food", value: "food" },
  { label: "Beverages", value: "beverages" },
  { label: "Snacks", value: "snacks" },
  { label: "Other", value: "other" },
]

function getStockHealth(stock: number, minStock: number) {
  const ratio = stock / Math.max(minStock, 1)
  if (stock === 0) return { color: "bg-(--destructive)", text: "text-(--destructive)", label: "Out of Stock" }
  if (stock <= minStock && stock > 0) return { color: "bg-(--warning)", text: "text-(--warning)", label: "Low Stock" }
  if (ratio <= 1.5) return { color: "bg-(--warning)", text: "text-(--warning)", label: "Low Stock" }
  return { color: "bg-(--success)", text: "text-(--success)", label: "In Stock" }
}

export default function ProductsPage() {
  const [search, setSearch] = React.useState("")
  const [category, setCategory] = React.useState("all")
  const [productList, setProductList] = React.useState(products)

  const filtered = productList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "all" || p.category === category
    return matchesSearch && matchesCategory
  })

  const totalProducts = productList.length
  const activeProducts = productList.filter((p) => p.active).length
  const lowStock = productList.filter((p) => p.stock > 0 && p.stock <= p.minStock).length
  const outOfStock = productList.filter((p) => p.stock === 0).length

  const toggleActive = (id: string) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    )
  }

  return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
            <p className="mt-1 text-sm text-(--muted-foreground)">Manage your product catalog</p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Products", value: totalProducts, icon: Package, color: "text-(--primary)" },
            { label: "Active", value: activeProducts, icon: Package, color: "text-(--success)" },
            { label: "Low Stock", value: lowStock, icon: Package, color: "text-(--warning)" },
            { label: "Out of Stock", value: outOfStock, icon: Package, color: "text-(--destructive)" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className={cn("rounded-(--radius-md) bg-(--muted) p-2.5", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-(--muted-foreground)">{stat.label}</p>
                  <p className="text-xl font-semibold">{formatNumber(stat.value)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--muted-foreground)" />
            <Input
              placeholder="Search products..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Tabs value={category} onValueChange={setCategory}>
            <TabsList>
              {categories.map((c) => (
                <TabsTrigger key={c.value} value={c.value}>
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-0">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="rounded-(--radius-lg) bg-(--muted) p-4">
                    <Package className="h-8 w-8 text-(--muted-foreground)" />
                  </div>
                  <p className="mt-4 text-sm font-medium">No products found</p>
                  <p className="mt-1 text-xs text-(--muted-foreground)">
                    {search ? "Try adjusting your search" : "Add your first product to get started"}
                  </p>
                  {!search && (
                    <Button variant="outline" size="sm" className="mt-4">
                      <Plus className="h-3 w-3" />
                      Add Product
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  {/* Mobile card view */}
                  <div className="block sm:hidden divide-y divide-(--border)">
                    {filtered.map((product) => {
                      const health = getStockHealth(product.stock, product.minStock)
                      const stockPercent = Math.min(
                        (product.stock / Math.max(product.minStock * 2, 1)) * 100,
                        100
                      )
                      return (
                        <div key={product.id} className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-(--radius-md) bg-(--muted)">
                                {categoryIcons[product.category]}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{product.name}</p>
                                <p className="text-xs text-(--muted-foreground) truncate">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={product.active}
                              onCheckedChange={() => toggleActive(product.id)}
                              className="shrink-0"
                            />
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                            <div>
                              <p className="text-xs text-(--muted-foreground)">SKU</p>
                              <code className="mt-0.5 inline-block rounded-(--radius-sm) bg-(--muted) px-2 py-0.5 text-xs font-mono">
                                {product.sku}
                              </code>
                            </div>
                            <div>
                              <p className="text-xs text-(--muted-foreground)">Category</p>
                              <Badge variant="secondary" className="capitalize mt-0.5">
                                {product.category}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-xs text-(--muted-foreground)">Price</p>
                              <p className="mt-0.5 font-medium">{formatCurrency(product.price)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-(--muted-foreground)">Cost</p>
                              <p className="mt-0.5 text-(--muted-foreground)">{formatCurrency(product.cost)}</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-xs text-(--muted-foreground)">Stock</p>
                              <span className={cn("text-xs font-medium", health.text)}>
                                {product.stock} {product.unit}
                              </span>
                            </div>
                            <Progress
                              value={stockPercent}
                              className={cn("h-2", health.color)}
                            />
                          </div>
                          <div className="mt-3 flex items-center justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit3 className="h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <ToggleLeft className="h-4 w-4" />
                                  {product.active ? "Deactivate" : "Activate"}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
                          <TableHead>Name</TableHead>
                          <TableHead className="hidden sm:table-cell">SKU</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="hidden lg:table-cell">Cost</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead className="hidden sm:table-cell">Status</TableHead>
                          <TableHead className="w-10" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filtered.map((product) => {
                          const health = getStockHealth(product.stock, product.minStock)
                          const stockPercent = Math.min(
                            (product.stock / Math.max(product.minStock * 2, 1)) * 100,
                            100
                          )
                          return (
                            <TableRow key={product.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="flex h-9 w-9 items-center justify-center rounded-(--radius-md) bg-(--muted)">
                                    {categoryIcons[product.category]}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{product.name}</p>
                                    <p className="text-xs text-(--muted-foreground) line-clamp-1">
                                      {product.description}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <code className="rounded-(--radius-sm) bg-(--muted) px-2 py-0.5 text-xs font-mono">
                                  {product.sku}
                                </code>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <Badge variant="secondary" className="capitalize">
                                  {product.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">{formatCurrency(product.price)}</TableCell>
                              <TableCell className="hidden lg:table-cell text-(--muted-foreground)">{formatCurrency(product.cost)}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1">
                                    <Progress
                                      value={stockPercent}
                                      className={cn("h-2", health.color)}
                                    />
                                  </div>
                                  <span className={cn("text-xs font-medium", health.text)}>
                                    {product.stock}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Switch
                                  checked={product.active}
                                  onCheckedChange={() => toggleActive(product.id)}
                                />
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Edit3 className="h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Copy className="h-4 w-4" />
                                      Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <ToggleLeft className="h-4 w-4" />
                                      {product.active ? "Deactivate" : "Activate"}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
  )
}
