"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  User,
  FileText,
  CreditCard,
  Banknote,
  Smartphone,
  QrCode,
  Split,
  ChevronDown,
  X,
  Package,
  AlertTriangle,
  Zap,
} from "lucide-react"

import { cn, formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { products, customers } from "@/data/mock-data"
import type { Product, PaymentMethod, Customer } from "@/types"

type CartItem = {
  product: Product
  quantity: number
}

const categories = [
  { value: "all", label: "All Products" },
  { value: "food", label: "Food" },
  { value: "beverages", label: "Beverages" },
  { value: "snacks", label: "Snacks" },
  { value: "groceries", label: "Groceries" },
]

const paymentMethods: { value: PaymentMethod; label: string; icon: React.ElementType }[] = [
  { value: "cash", label: "Cash", icon: Banknote },
  { value: "card", label: "Card", icon: CreditCard },
  { value: "mobile_banking", label: "Mobile Banking", icon: Smartphone },
  { value: "qr", label: "QR Payment", icon: QrCode },
  { value: "split", label: "Split", icon: Split },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

const cartItemVariants = {
  initial: { opacity: 0, x: 40, height: 0 },
  animate: {
    opacity: 1,
    x: 0,
    height: "auto",
    transition: { type: "spring" as const, stiffness: 300, damping: 28 },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2 },
  },
}

function getStockStatus(product: Product) {
  if (product.stock <= 0) return { label: "Out of Stock", color: "bg-(--destructive)", text: "text-(--destructive)" }
  if (product.stock <= product.minStock) return { label: "Low Stock", color: "bg-(--warning)", text: "text-(--warning)" }
  return null
}

function ProductCard({
  product,
  onAdd,
}: {
  product: Product
  onAdd: () => void
}) {
  const stockStatus = getStockStatus(product)

  return (
    <motion.button
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onAdd}
      disabled={product.stock <= 0}
      className={cn(
        "relative flex flex-col items-start rounded-(--radius-lg) border border-(--border) bg-(--card) p-4 text-left shadow-sm transition-colors",
        "hover:border-(--primary)/30 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-sm disabled:hover:border-(--border)",
        "cursor-pointer touch-manipulation"
      )}
    >
      {stockStatus && (
        <div className="absolute right-2 top-2 z-10">
          <div className="flex items-center gap-1 rounded-full bg-(--background) px-2 py-0.5 shadow-xs">
            <AlertTriangle className={cn("h-3 w-3", stockStatus.text)} />
            <span className={cn("text-[10px] font-medium", stockStatus.text)}>
              {stockStatus.label}
            </span>
          </div>
        </div>
      )}

      <div
        className={cn(
          "flex h-16 w-full items-center justify-center rounded-(--radius-md) text-lg font-bold text-white",
          product.category === "food" && "bg-gradient-to-br from-amber-400 to-orange-500",
          product.category === "beverages" && "bg-gradient-to-br from-sky-400 to-blue-500",
          product.category === "snacks" && "bg-gradient-to-br from-rose-400 to-pink-500",
          product.category === "groceries" && "bg-gradient-to-br from-emerald-400 to-green-500",
        )}
      >
        {product.name.charAt(0)}
      </div>

      <div className="mt-3 flex w-full flex-col gap-1">
        <span className="text-xs font-medium text-(--muted-foreground) uppercase tracking-wider">
          {product.category}
        </span>
        <span className="text-sm font-semibold leading-tight text-(--foreground) line-clamp-2">
          {product.name}
        </span>
        <span className="mt-0.5 text-base font-bold text-(--primary)">
          {formatCurrency(product.price)}
        </span>
      </div>
    </motion.button>
  )
}

function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem
  onUpdateQuantity: (id: string, qty: number) => void
  onRemove: (id: string) => void
}) {
  const deleteBgRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className="relative overflow-hidden rounded-(--radius-md)">
      <div
        ref={deleteBgRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-end rounded-(--radius-md) bg-(--destructive) pr-4"
        style={{ opacity: 0 }}
      >
        <Trash2 className="h-5 w-5 text-white" />
      </div>
      <motion.div
        layout
        drag="x"
        dragConstraints={{ left: -80, right: 0 }}
        dragElastic={{ left: 0.15, right: 0 }}
        onDrag={(_, info) => {
          if (deleteBgRef.current) {
            deleteBgRef.current.style.opacity = String(Math.min(1, Math.abs(info.offset.x) / 80))
          }
        }}
        onDragEnd={(_, info) => {
          if (deleteBgRef.current) deleteBgRef.current.style.opacity = "0"
          if (info.offset.x < -60) {
            onRemove(item.product.id)
          }
        }}
        variants={cartItemVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="group relative flex items-start gap-3 rounded-(--radius-md) bg-(--background) p-2 transition-colors hover:bg-(--muted)/50"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-(--radius-md) bg-(--primary)/10 text-sm font-bold text-(--primary)">
          {item.product.name.charAt(0)}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <span className="truncate text-sm font-medium leading-tight">
              {item.product.name}
            </span>
            <button
              onClick={() => onRemove(item.product.id)}
              className="shrink-0 rounded-(--radius-sm) p-0.5 text-(--muted-foreground) opacity-0 transition-all hover:bg-(--destructive)/10 hover:text-(--destructive) group-hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 rounded-(--radius-md) border border-(--border) bg-(--background)">
              <button
                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-(--radius-sm) text-(--muted-foreground) transition-colors hover:bg-(--accent) hover:text-(--foreground) touch-manipulation"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="flex h-7 min-w-[2rem] items-center justify-center text-xs font-semibold tabular-nums">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-(--radius-sm) text-(--muted-foreground) transition-colors hover:bg-(--accent) hover:text-(--foreground) touch-manipulation"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <div className="text-right">
              <span className="text-sm font-semibold tabular-nums">
                {formatCurrency(item.product.price * item.quantity)}
              </span>
              <div className="text-[10px] text-(--muted-foreground)">
                {formatCurrency(item.product.price)} / ea
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function PosPage() {
  const [mounted, setMounted] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [cart, setCart] = React.useState<CartItem[]>([])
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | undefined>()
  const [selectedPayment, setSelectedPayment] = React.useState<PaymentMethod>("cash")
  const [notes, setNotes] = React.useState("")
  const [quickFilter, setQuickFilter] = React.useState<"all" | "low" | "popular">("all")
  const [cartOpen, setCartOpen] = React.useState(false)

  React.useEffect(() => { setMounted(true) }, [])

  const filteredProducts = React.useMemo(() => {
    let result = [...products]

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      )
    }

    if (quickFilter === "low") {
      result = result.filter((p) => p.stock <= p.minStock)
    }

    if (quickFilter === "popular") {
      result = result.sort((a, b) => b.stock - a.stock).slice(0, 8)
    }

    return result
  }, [selectedCategory, searchQuery, quickFilter])

  const addItem = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeItem = (productId: string) => {
    setCart((prev) => {
      return prev.filter((item) => item.product.id !== productId)
    })
  }

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    )
  }

  const clearCart = () => {
    if (cart.length === 0) return
    setCart([])
    setSelectedCustomer(undefined)
    setNotes("")
  }

  const chargeOrder = () => {
    if (cart.length === 0) return
    const totalFormatted = formatCurrency(total)
    setCart([])
    setSelectedCustomer(undefined)
    setNotes("")
  }

  const subtotal = React.useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  )

  const taxRate = 0.08
  const tax = subtotal * taxRate
  const discount = selectedCustomer ? subtotal * 0.05 : 0
  const total = subtotal + tax - discount
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="flex h-full min-h-0 gap-4 lg:gap-6">
      {/* Left Panel - Categories */}
      <div className="hidden w-56 shrink-0 flex-col lg:flex">
        <div className="relative px-0 pb-3 pt-0">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--muted-foreground)" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-8 text-sm"
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  "flex items-center gap-2 rounded-(--radius-md) px-3 py-2 text-sm font-medium transition-all",
                  selectedCategory === cat.value
                    ? "bg-(--primary) text-(--primary-foreground) shadow-sm"
                    : "text-(--muted-foreground) hover:bg-(--accent) hover:text-(--foreground)"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <Separator className="my-1" />

          <div className="flex flex-col gap-1">
            <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-(--muted-foreground)">
              Quick Filters
            </span>
            <button
              onClick={() => setQuickFilter(quickFilter === "low" ? "all" : "low")}
              className={cn(
                "flex items-center gap-2 rounded-(--radius-md) px-3 py-2 text-sm font-medium transition-all",
                quickFilter === "low"
                  ? "bg-(--warning)/15 text-(--warning)"
                  : "text-(--muted-foreground) hover:bg-(--accent) hover:text-(--foreground)"
              )}
            >
              <AlertTriangle className="h-4 w-4" />
              Low Stock
            </button>
            <button
              onClick={() => setQuickFilter(quickFilter === "popular" ? "all" : "popular")}
              className={cn(
                "flex items-center gap-2 rounded-(--radius-md) px-3 py-2 text-sm font-medium transition-all",
                quickFilter === "popular"
                  ? "bg-(--primary)/10 text-(--primary)"
                  : "text-(--muted-foreground) hover:bg-(--accent) hover:text-(--foreground)"
              )}
            >
              <Zap className="h-4 w-4" />
              Popular
            </button>
          </div>
        </div>

        <div className="mt-3 rounded-(--radius-lg) border border-(--border) bg-(--card) p-3">
          <div className="flex items-center gap-2 text-xs text-(--muted-foreground)">
            <Package className="h-3.5 w-3.5" />
            <span>
              <strong className="text-(--foreground)">{filteredProducts.length}</strong> products
            </span>
          </div>
        </div>
      </div>

      {/* Center Panel - Product Grid */}
      <div className="flex flex-1 flex-col min-w-0 min-h-0">
        {/* Mobile Search + Category Bar */}
        <div className="flex flex-col gap-3 mb-3 lg:hidden">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--muted-foreground)" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-8 text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  "shrink-0 rounded-(--radius-md) px-3 py-1.5 text-sm font-medium transition-all whitespace-nowrap",
                  selectedCategory === cat.value
                    ? "bg-(--primary) text-(--primary-foreground) shadow-sm"
                    : "bg-(--muted) text-(--muted-foreground) hover:bg-(--accent)"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-(--foreground)">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : selectedCategory === "all"
                ? "All Products"
                : categories.find((c) => c.value === selectedCategory)?.label}
          </h2>
          <span className="text-xs text-(--muted-foreground)">
            {filteredProducts.length} items
          </span>
        </div>

        <ScrollArea className="flex-1 min-h-0 pr-2 pb-14 md:pb-0">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Package className="h-12 w-12 text-(--muted-foreground)/40" />
              <p className="mt-3 text-sm font-medium text-(--muted-foreground)">
                No products found
              </p>
              <p className="mt-1 text-xs text-(--muted-foreground)/60">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={() => addItem(product)}
                />
              ))}
            </motion.div>
          )}
        </ScrollArea>
      </div>

      {/* Right Panel - Cart */}
      <div className="hidden w-96 shrink-0 flex-col md:flex min-h-0 md:h-[calc(100vh-6.5rem)] lg:h-[calc(100vh-7.5rem)]">
        <Card className="flex h-full min-h-0 flex-col overflow-hidden">
          {/* Cart Header */}
          <div className="flex items-center justify-between border-b border-(--border) px-4 py-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-(--primary)" />
              <span className="text-sm font-semibold">Current Order</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </Badge>
          </div>

          {/* Cart Items */}
          <ScrollArea className="flex-1 min-h-0 px-4 py-2">
            <AnimatePresence mode="popLayout">
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <ShoppingCart className="h-12 w-12 text-(--muted-foreground)/30" />
                  <p className="mt-3 text-sm font-medium text-(--muted-foreground)">
                    Cart is empty
                  </p>
                  <p className="mt-1 text-xs text-(--muted-foreground)/50">
                    Tap a product to add it
                  </p>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-1">
                  {cart.map((item) => (
                    <CartItemRow
                      key={item.product.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="border-t border-(--border) px-4 py-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-(--muted-foreground)">Subtotal</span>
                  <span className="font-medium tabular-nums">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-(--muted-foreground)">Tax (8%)</span>
                  <span className="font-medium tabular-nums">{formatCurrency(tax)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-(--success)">Discount (5%)</span>
                    <span className="font-medium text-(--success) tabular-nums">
                      -{formatCurrency(discount)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Total</span>
                  <span className="text-lg font-bold text-(--primary) tabular-nums">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Customer & Notes */}
          {cart.length > 0 && (
            <div className="border-t border-(--border) px-4 py-3">
              <div className="space-y-2">
                <Select
                  value={selectedCustomer?.id ?? "none"}
                  onValueChange={(val) =>
                    setSelectedCustomer(val === "none" ? undefined : customers.find((c) => c.id === val))
                  }
                >
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder="Select customer..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Walk-in Customer</SelectItem>
                    {customers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <textarea
                  placeholder="Order notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="h-16 w-full resize-none rounded-(--radius-md) border border-(--border) bg-(--background) px-3 py-2 text-xs placeholder:text-(--muted-foreground) focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--ring)"
                />
              </div>
            </div>
          )}

          {/* Payment Controls */}
          {cart.length > 0 && (
            <div className="border-t border-(--border)">
              <div className="grid grid-cols-5 gap-1 px-4 py-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  const isActive = selectedPayment === method.value
                  return (
                    <button
                      key={method.value}
                      onClick={() => setSelectedPayment(method.value)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-(--radius-md) py-2 text-[10px] font-medium transition-all touch-manipulation",
                        isActive
                          ? "bg-(--primary) text-(--primary-foreground) shadow-sm"
                          : "bg-(--muted) text-(--muted-foreground) hover:bg-(--accent) hover:text-(--foreground)"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="leading-tight">{method.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="flex gap-2 px-4 pb-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={clearCart}
                  className="flex-1 text-xs"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </Button>
                <Button
                  size="lg"
                  onClick={chargeOrder}
                  className="flex-1 gap-1 text-xs font-semibold shadow-md min-w-0"
                >
                  <CreditCard className="h-4 w-4 shrink-0" />
                  <span className="truncate">Charge {formatCurrency(total)}</span>
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Mobile Cart FAB + Portal */}
      {mounted && createPortal(
        <>
          {/* FAB button */}
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className={cn(
              "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg md:hidden hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_18px_-2px_var(--primary)]",
              cartOpen ? "bg-(--muted) text-(--foreground)" : "bg-(--primary) text-(--primary-foreground)"
            )}
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-(--destructive) text-[10px] font-bold text-(--destructive-foreground)">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Cart Side Panel */}
          <AnimatePresence>
            {cartOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setCartOpen(false)}
                  className="fixed inset-0 z-50 bg-black md:hidden"
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-sm flex-col bg-(--background) shadow-xl md:hidden"
                >
                  {/* Cart Header */}
                  <div className="flex items-center justify-between border-b border-(--border) px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4 text-(--primary)" />
                      <span className="text-sm font-semibold">Current Order</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {itemCount} {itemCount === 1 ? "item" : "items"}
                      </Badge>
                      <button onClick={() => setCartOpen(false)} className="rounded-(--radius-md) p-1 hover:bg-(--accent)">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Cart Items */}
                  <ScrollArea className="flex-1 px-4 py-2">
                    <AnimatePresence mode="popLayout">
                      {cart.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center py-16 text-center"
                        >
                          <ShoppingCart className="h-12 w-12 text-(--muted-foreground)/30" />
                          <p className="mt-3 text-sm font-medium text-(--muted-foreground)">
                            Cart is empty
                          </p>
                          <p className="mt-1 text-xs text-(--muted-foreground)/50">
                            Tap a product to add it
                          </p>
                        </motion.div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          {cart.map((item) => (
                            <CartItemRow
                              key={item.product.id}
                              item={item}
                              onUpdateQuantity={updateQuantity}
                              onRemove={removeItem}
                            />
                          ))}
                        </div>
                      )}
                    </AnimatePresence>
                  </ScrollArea>

                  {/* Cart Summary */}
                  {cart.length > 0 && (
                    <div className="border-t border-(--border) px-4 py-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-(--muted-foreground)">Subtotal</span>
                          <span className="font-medium tabular-nums">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-(--muted-foreground)">Tax (8%)</span>
                          <span className="font-medium tabular-nums">{formatCurrency(tax)}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-(--success)">Discount (5%)</span>
                            <span className="font-medium text-(--success) tabular-nums">
                              -{formatCurrency(discount)}
                            </span>
                          </div>
                        )}
                        <Separator />
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">Total</span>
                          <span className="text-lg font-bold text-(--primary) tabular-nums">
                            {formatCurrency(total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Customer & Notes */}
                  {cart.length > 0 && (
                    <div className="border-t border-(--border) px-4 py-3">
                      <div className="space-y-2">
                        <Select
                          value={selectedCustomer?.id ?? "none"}
                          onValueChange={(val) =>
                            setSelectedCustomer(val === "none" ? undefined : customers.find((c) => c.id === val))
                          }
                        >
                          <SelectTrigger className="h-9 text-xs">
                            <SelectValue placeholder="Select customer..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Walk-in Customer</SelectItem>
                            {customers.map((c) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <textarea
                          placeholder="Order notes..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="h-16 w-full resize-none rounded-(--radius-md) border border-(--border) bg-(--background) px-3 py-2 text-xs placeholder:text-(--muted-foreground) focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--ring)"
                        />
                      </div>
                    </div>
                  )}

                  {/* Payment Controls */}
                  {cart.length > 0 && (
                    <div className="border-t border-(--border)">
                      <div className="grid grid-cols-5 gap-1 px-4 py-3">
                        {paymentMethods.map((method) => {
                          const Icon = method.icon
                          const isActive = selectedPayment === method.value
                          return (
                            <button
                              key={method.value}
                              onClick={() => setSelectedPayment(method.value)}
                              className={cn(
                                "flex flex-col items-center gap-1 rounded-(--radius-md) py-2 text-[10px] font-medium transition-all touch-manipulation",
                                isActive
                                  ? "bg-(--primary) text-(--primary-foreground) shadow-sm"
                                  : "bg-(--muted) text-(--muted-foreground) hover:bg-(--accent) hover:text-(--foreground)"
                              )}
                            >
                              <Icon className="h-4 w-4" />
                              <span className="leading-tight">{method.label}</span>
                            </button>
                          )
                        })}
                      </div>
                      <div className="flex gap-2 px-4 pb-4">
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => { clearCart(); setCartOpen(false) }}
                          className="flex-1 text-xs"
                        >
                          <Trash2 className="h-4 w-4" />
                          Clear
                        </Button>
                        <Button
                          size="lg"
                          onClick={() => { chargeOrder(); setCartOpen(false) }}
                          className="flex-1 gap-1 text-xs font-semibold shadow-md min-w-0"
                        >
                          <CreditCard className="h-4 w-4 shrink-0" />
                          <span className="truncate">Charge {formatCurrency(total)}</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}
    </div>
  )
}
