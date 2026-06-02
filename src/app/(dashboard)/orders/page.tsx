"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  ShoppingBag,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Loader2,
  Printer,
  Download,
  User,
  Banknote,
  CreditCard,
  Smartphone,
  QrCode,
  Split,
  ArrowLeft,
  Package,
  MoreHorizontal,
  FileText,
  ChevronDown,
  Filter,
} from "lucide-react"

import { cn, formatCurrency, formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { orders } from "@/data/mock-data"
import type { Order, OrderStatus, PaymentMethod } from "@/types"

type FilterStatus = "all" | OrderStatus

const statusFilters: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "refunded", label: "Refunded" },
  { value: "cancelled", label: "Cancelled" },
]

const statusConfig: Record<
  OrderStatus,
  { label: string; variant: "warning" | "default" | "success" | "destructive" | "secondary"; icon: React.ElementType }
> = {
  pending: { label: "Pending", variant: "warning", icon: Clock },
  processing: { label: "Processing", variant: "default", icon: Loader2 },
  completed: { label: "Completed", variant: "success", icon: CheckCircle2 },
  refunded: { label: "Refunded", variant: "secondary", icon: RotateCcw },
  cancelled: { label: "Cancelled", variant: "destructive", icon: XCircle },
}

const paymentIcons: Record<PaymentMethod, React.ElementType> = {
  cash: Banknote,
  card: CreditCard,
  mobile_banking: Smartphone,
  qr: QrCode,
  split: Split,
}

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.25, ease: "easeOut" as const },
  }),
}

const statusBadgeVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const timelineItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" as const },
  }),
}

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

const statusCounts = orders.reduce(
  (acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    acc.all = (acc.all || 0) + 1
    return acc
  },
  {} as Record<string, number>
)

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-5 w-28" />
      <Skeleton className="h-5 w-12" />
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-14" />
      <Skeleton className="h-5 w-20" />
      <Skeleton className="h-5 w-20" />
    </div>
  )
}

function TimelineEvent({
  icon: Icon,
  label,
  timestamp,
  active,
  last,
  index = 0,
}: {
  icon: React.ElementType
  label: string
  timestamp: string
  active?: boolean
  last?: boolean
  index?: number
}) {
  return (
    <motion.div
      custom={index}
      variants={timelineItemVariants}
      initial="hidden"
      animate="visible"
      className="flex gap-3"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.05, type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full",
            active
              ? "bg-(--primary) text-(--primary-foreground)"
              : "bg-(--muted) text-(--muted-foreground)"
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </motion.div>
        {!last && <div className="mt-1 h-full w-px bg-(--border)" />}
      </div>
      <div className={cn("pb-4", last && "pb-0")}>
        <p className={cn("text-sm font-medium", active && "text-(--foreground)")}>
          {label}
        </p>
        <p className="text-xs text-(--muted-foreground)">{formatDate(timestamp, "long")}</p>
      </div>
    </motion.div>
  )
}

function OrderDetailPanel({
  order,
  onClose,
}: {
  order: Order
  onClose: () => void
}) {
  const StatusIcon = statusConfig[order.status].icon

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 right-0 z-50 w-full border-l border-(--border) bg-(--card) shadow-2xl sm:w-[480px] lg:w-[520px]"
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex items-center justify-between border-b border-(--border) px-5 py-4"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-(--radius-md) text-(--muted-foreground) transition-colors hover:bg-(--accent) hover:text-(--foreground)"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h3 className="text-sm font-semibold">{order.orderNumber}</h3>
              <p className="text-xs text-(--muted-foreground)">
                {formatDate(order.createdAt, "long")}
              </p>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 20 }}
          >
            <Badge variant={statusConfig[order.status].variant} className="gap-1 text-xs">
              <StatusIcon
                className={cn(
                  "h-3 w-3",
                  order.status === "processing" && "animate-spin"
                )}
              />
              {statusConfig[order.status].label}
            </Badge>
          </motion.div>
        </motion.div>

        <ScrollArea className="flex-1">
          <div className="space-y-6 p-5">
            {/* Timeline */}
            <motion.div custom={0} variants={sectionVariants} initial="hidden" animate="visible">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-(--muted-foreground)">
                Order Timeline
              </h4>
              <TimelineEvent
                icon={ShoppingBag}
                label="Order Placed"
                timestamp={order.createdAt}
                active={order.status !== "cancelled"}
                index={0}
              />
              <TimelineEvent
                icon={Loader2}
                label="Processing"
                timestamp={order.updatedAt}
                active={order.status === "processing" || order.status === "completed"}
                index={1}
              />
              <TimelineEvent
                icon={CheckCircle2}
                label="Completed"
                timestamp={order.updatedAt}
                active={order.status === "completed"}
                index={2}
              />
              {(order.status === "refunded" || order.status === "cancelled") && (
                <TimelineEvent
                  icon={order.status === "refunded" ? RotateCcw : XCircle}
                  label={order.status === "refunded" ? "Refunded" : "Cancelled"}
                  timestamp={order.updatedAt}
                  active
                  last
                  index={3}
                />
              )}
              {order.status !== "refunded" && order.status !== "cancelled" && (
                <TimelineEvent
                  icon={CheckCircle2}
                  label="Delivered"
                  timestamp={order.updatedAt}
                  last
                  index={3}
                />
              )}
            </motion.div>

            <Separator />

            {/* Line Items */}
            <motion.div custom={1} variants={sectionVariants} initial="hidden" animate="visible">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-(--muted-foreground)">
                Items ({order.items.length})
              </h4>
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.25 }}
                    className="flex items-center justify-between rounded-(--radius-md) bg-(--muted)/40 px-3 py-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-(--radius-md) bg-(--primary)/10 text-xs font-bold text-(--primary)">
                        {item.productName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{item.productName}</p>
                        <p className="text-xs text-(--muted-foreground)">
                          {item.quantity} x {formatCurrency(item.unitPrice)}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <Separator />

            {/* Payment Breakdown */}
            <motion.div custom={2} variants={sectionVariants} initial="hidden" animate="visible">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-(--muted-foreground)">
                Payment Details
              </h4>
              <div className="space-y-1.5 rounded-(--radius-md) bg-(--muted)/30 px-4 py-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-(--muted-foreground)">Subtotal</span>
                  <span className="tabular-nums">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-(--muted-foreground)">Tax</span>
                  <span className="tabular-nums">{formatCurrency(order.tax)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-(--success)">Discount</span>
                    <span className="tabular-nums text-(--success)">-{formatCurrency(order.discount)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Total</span>
                  <motion.span
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                    className="text-base font-bold text-(--primary) tabular-nums"
                  >
                    {formatCurrency(order.total)}
                  </motion.span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.3 }}
                className="mt-3 flex items-center gap-2 rounded-(--radius-md) bg-(--muted)/30 px-4 py-2.5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-(--radius-md) bg-(--background)">
                  {React.createElement(paymentIcons[order.paymentMethod], {
                    className: "h-4 w-4 text-(--muted-foreground)",
                  })}
                </div>
                <div>
                  <p className="text-xs font-medium capitalize">
                    {order.paymentMethod.replace("_", " ")}
                  </p>
                  <p className="text-[10px] text-(--muted-foreground)">Payment Method</p>
                </div>
              </motion.div>
            </motion.div>

            <Separator />

            {/* Customer Info */}
            <motion.div custom={3} variants={sectionVariants} initial="hidden" animate="visible">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-(--muted-foreground)">
                Customer
              </h4>
              {order.customer ? (
                <div className="flex items-center gap-3 rounded-(--radius-md) bg-(--muted)/30 px-4 py-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-(--primary)/10 text-(--primary) text-xs font-bold">
                      {order.customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{order.customer.name}</p>
                    <p className="text-xs text-(--muted-foreground)">{order.customer.email}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-(--radius-md) bg-(--muted)/30 px-4 py-3 text-sm text-(--muted-foreground)">
                  <User className="h-4 w-4" />
                  Walk-in Customer
                </div>
              )}
            </motion.div>

            {order.notes && (
              <>
                <Separator />
                <motion.div custom={4} variants={sectionVariants} initial="hidden" animate="visible">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-(--muted-foreground)">
                    Notes
                  </h4>
                  <p className="text-sm text-(--muted-foreground)">{order.notes}</p>
                </motion.div>
              </>
            )}

            {order.cashier && (
              <>
                <Separator />
                <motion.div custom={5} variants={sectionVariants} initial="hidden" animate="visible">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-(--muted-foreground)">
                    Cashier
                  </h4>
                  <p className="text-sm font-medium">{order.cashier}</p>
                </motion.div>
              </>
            )}
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="border-t border-(--border) px-5 py-4"
        >
          <div className="flex flex-wrap gap-2">
            {order.status === "pending" && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="sm" className="gap-1.5 text-xs">
                  <Loader2 className="h-3.5 w-3.5" />
                  Mark as Processing
                </Button>
              </motion.div>
            )}
            {order.status === "processing" && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="sm" className="gap-1.5 bg-(--success) text-(--primary-foreground) text-xs hover:bg-(--success)/90">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Mark as Completed
                </Button>
              </motion.div>
            )}
            {order.status === "completed" && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="sm" variant="secondary" className="gap-1.5 text-xs">
                  <RotateCcw className="h-3.5 w-3.5" />
                  Refund
                </Button>
              </motion.div>
            )}
            {(order.status === "pending" || order.status === "processing") && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="sm" variant="destructive" className="gap-1.5 text-xs">
                  <XCircle className="h-3.5 w-3.5" />
                  Cancel
                </Button>
              </motion.div>
            )}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                <Printer className="h-3.5 w-3.5" />
                Print Receipt
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                <Download className="h-3.5 w-3.5" />
                Download Invoice
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function OrdersPage() {
  const [loading, setLoading] = React.useState(true)
  const [statusFilter, setStatusFilter] = React.useState<FilterStatus>("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null)

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const filteredOrders = React.useMemo(() => {
    let result = [...orders]

    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.cashier?.toLowerCase().includes(q) ||
          o.customer?.name.toLowerCase().includes(q) ||
          o.items.some((item) => item.productName.toLowerCase().includes(q))
      )
    }

    return result.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }, [statusFilter, searchQuery])

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      {/* Top Bar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Orders</h1>
          <p className="text-xs text-(--muted-foreground)">
            {filteredOrders.length} of {orders.length} orders
          </p>
        </div>

        <div className="relative flex items-center gap-2">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--muted-foreground)" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full pl-8 text-xs sm:w-60"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1">
        {statusFilters.map((f) => (
          <motion.button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative flex shrink-0 items-center gap-1.5 rounded-(--radius-md) px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap",
              statusFilter === f.value
                ? "text-(--primary-foreground)"
                : "bg-(--muted) text-(--muted-foreground) hover:bg-(--accent) hover:text-(--foreground)"
            )}
          >
            {statusFilter === f.value && (
              <motion.div
                layoutId="activeFilterTab"
                className="absolute inset-0 rounded-(--radius-md) bg-(--primary) shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{f.label}</span>
            <motion.span
              layout
              className={cn(
                "relative z-10 flex h-4 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-[10px] font-semibold",
                statusFilter === f.value
                  ? "bg-(--primary-foreground)/20 text-(--primary-foreground)"
                  : "bg-(--border) text-(--muted-foreground)"
              )}
            >
              {statusCounts[f.value] || 0}
            </motion.span>
          </motion.button>
        ))}
      </div>

      {/* Orders Table */}
      <Card className="flex flex-1 flex-col overflow-hidden">
        {/* Column Headers */}
        <div className="hidden border-b border-(--border) px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-(--muted-foreground) lg:grid lg:grid-cols-[1fr_140px_1fr_80px_120px_100px_130px_120px]">
          <span>Order</span>
          <span>Status</span>
          <span>Customer</span>
          <span>Items</span>
          <span>Total</span>
          <span>Payment</span>
          <span>Date</span>
          <span>Cashier</span>
        </div>

        <ScrollArea className="flex-1">
          {loading ? (
            <div className="space-y-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShoppingBag className="h-14 w-14 text-(--muted-foreground)/30" />
              <p className="mt-4 text-sm font-medium text-(--muted-foreground)">
                {searchQuery || statusFilter !== "all"
                  ? "No orders match your search"
                  : "No orders yet"}
              </p>
              <p className="mt-1 text-xs text-(--muted-foreground)/60">
                {searchQuery || statusFilter !== "all"
                  ? "Try different keywords or filters"
                  : "Orders will appear here once customers start buying"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-(--border)">
              {filteredOrders.map((order, i) => {
                const StatusIcon = statusConfig[order.status].icon
                const PaymentIcon = paymentIcons[order.paymentMethod]

                return (
                  <motion.button
                    key={order.id}
                    custom={i}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => setSelectedOrder(order)}
                    className={cn(
                      "w-full px-4 py-3 text-left transition-colors hover:bg-(--muted)/40",
                      "grid grid-cols-1 gap-2 lg:grid-cols-[1fr_140px_1fr_80px_120px_100px_130px_120px] lg:items-center",
                      selectedOrder?.id === order.id && "bg-(--primary)/5"
                    )}
                  >
                    {/* Order Number - visible on all screens */}
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-(--radius-md) bg-(--primary)/10 text-xs font-bold text-(--primary)">
                        #{order.orderNumber.split("-").pop()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{order.orderNumber}</p>
                        <p className="text-xs text-(--muted-foreground) lg:hidden">
                          {formatDate(order.createdAt, "relative")}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center lg:justify-start">
                      <motion.div
                        variants={statusBadgeVariants}
                        initial="initial"
                        animate="animate"
                      >
                        <Badge
                          variant={statusConfig[order.status].variant}
                          className="gap-1 text-xs"
                        >
                          <StatusIcon
                            className={cn(
                              "h-3 w-3",
                              order.status === "processing" && "animate-spin"
                            )}
                          />
                          {statusConfig[order.status].label}
                        </Badge>
                      </motion.div>
                    </div>

                    {/* Customer */}
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--muted) text-xs font-medium text-(--muted-foreground)">
                        {order.customer
                          ? order.customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                          : "—"}
                      </div>
                      <span className="text-sm truncate">
                        {order.customer?.name ?? "Walk-in"}
                      </span>
                    </div>

                    {/* Items */}
                    <span className="text-sm tabular-nums text-(--muted-foreground)">
                      {order.items.length}
                    </span>

                    {/* Total */}
                    <span className="text-sm font-semibold tabular-nums">
                      {formatCurrency(order.total)}
                    </span>

                    {/* Payment */}
                    <div className="flex items-center gap-1.5">
                      <PaymentIcon className="h-3.5 w-3.5 text-(--muted-foreground)" />
                      <span className="text-xs capitalize text-(--muted-foreground)">
                        {order.paymentMethod.replace("_", " ")}
                      </span>
                    </div>

                    {/* Date */}
                    <span className="hidden text-sm text-(--muted-foreground) lg:block">
                      {formatDate(order.createdAt, "relative")}
                    </span>

                    {/* Cashier */}
                    <span className="hidden text-sm text-(--muted-foreground) lg:block">
                      {order.cashier ?? "—"}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          )}
        </ScrollArea>
      </Card>

      {/* Order Detail Slide-over */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setSelectedOrder(null)}
            />
            <OrderDetailPanel
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
