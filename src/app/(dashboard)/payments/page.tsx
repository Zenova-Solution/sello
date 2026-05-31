"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  DollarSign,
  CreditCard,
  AlertCircle,
  RotateCcw,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Ban,
} from "lucide-react"

import { cn, formatCurrency, formatDate } from "@/lib/utils"
import { orders } from "@/data/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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

const methodIcons: Record<string, React.ReactNode> = {
  cash: <DollarSign className="h-4 w-4" />,
  card: <CreditCard className="h-4 w-4" />,
  mobile_banking: <Smartphone className="h-4 w-4" />,
  qr: <QrCode className="h-4 w-4" />,
  split: <CreditCard className="h-4 w-4" />,
}

const methodLabels: Record<string, string> = {
  cash: "Cash",
  card: "Card",
  mobile_banking: "Mobile Banking",
  qr: "QR Code",
  split: "Split Payment",
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  completed: {
    label: "Completed",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    className: "bg-(--success)/10 text-(--success)",
  },
  pending: {
    label: "Pending",
    icon: <Clock className="h-3.5 w-3.5" />,
    className: "bg-(--warning)/10 text-(--warning)",
  },
  processing: {
    label: "Processing",
    icon: <Clock className="h-3.5 w-3.5" />,
    className: "bg-(--info)/10 text-(--info)",
  },
  cancelled: {
    label: "Cancelled",
    icon: <Ban className="h-3.5 w-3.5" />,
    className: "bg-(--destructive)/10 text-(--destructive)",
  },
  refunded: {
    label: "Refunded",
    icon: <RotateCcw className="h-3.5 w-3.5" />,
    className: "bg-(--muted) text-(--muted-foreground)",
  },
}

import { Smartphone, QrCode } from "lucide-react"

export default function PaymentsPage() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [methodFilter, setMethodFilter] = React.useState("all")

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || o.status === statusFilter
    const matchesMethod = methodFilter === "all" || o.paymentMethod === methodFilter
    return matchesSearch && matchesStatus && matchesMethod
  })

  const todayStr = new Date().toISOString().split("T")[0]
  const todayOrders = orders.filter((o) => o.createdAt.startsWith(todayStr))
  const totalProcessed = todayOrders.reduce((s, o) => s + o.total, 0)
  const pendingSettlements = orders.filter((o) => o.status === "pending" || o.status === "processing").length
  const failedCount = orders.filter((o) => o.status === "cancelled").length
  const refundedAmount = orders
    .filter((o) => o.status === "refunded")
    .reduce((s, o) => s + o.total, 0)

  const paymentMethodTabs = [
    { label: "All", value: "all" },
    { label: "Card", value: "card" },
    { label: "Cash", value: "cash" },
    { label: "Mobile", value: "mobile_banking" },
    { label: "QR", value: "qr" },
  ]

  return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-semibold tracking-tight">Payments</h1>
          <p className="mt-1 text-sm text-(--muted-foreground)">Track transactions and settlements</p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Today", value: formatCurrency(totalProcessed), icon: DollarSign, color: "text-(--primary)" },
            { label: "Pending", value: pendingSettlements, icon: Clock, color: "text-(--warning)" },
            { label: "Failed", value: failedCount, icon: XCircle, color: "text-(--destructive)" },
            { label: "Refunded", value: formatCurrency(refundedAmount), icon: RotateCcw, color: "text-(--muted-foreground)" },
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

        <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--muted-foreground)" />
            <Input
              placeholder="Search transactions..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList>
                <TabsTrigger value="all" className="max-sm:px-2">All</TabsTrigger>
                <TabsTrigger value="completed" className="max-sm:px-2">Completed</TabsTrigger>
                <TabsTrigger value="pending" className="max-sm:px-2">Pending</TabsTrigger>
                <TabsTrigger value="refunded" className="max-sm:px-2">Refunded</TabsTrigger>
                <TabsTrigger value="cancelled" className="max-sm:px-2">Failed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <Tabs value={methodFilter} onValueChange={setMethodFilter}>
              <TabsList>
                {paymentMethodTabs.map((m) => (
                  <TabsTrigger key={m.value} value={m.value} className="max-sm:px-2">
                    {m.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-0">
              {/* Mobile card view */}
              <div className="block sm:hidden divide-y divide-(--border)">
                {filtered.map((order) => {
                  const status = statusConfig[order.status] || statusConfig.completed
                  return (
                    <div key={order.id} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{order.orderNumber}</p>
                          <code className="mt-0.5 inline-block rounded-(--radius-sm) bg-(--muted) px-2 py-0.5 text-xs font-mono">
                            TXN-{order.id.toUpperCase()}
                          </code>
                        </div>
                        <p className="text-sm font-medium shrink-0">{formatCurrency(order.total)}</p>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                        <div>
                          <p className="text-xs text-(--muted-foreground)">Method</p>
                          <div className="mt-0.5 flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-(--radius-sm) bg-(--muted)">
                              {methodIcons[order.paymentMethod]}
                            </div>
                            <span className="text-xs text-(--muted-foreground)">
                              {methodLabels[order.paymentMethod]}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-(--muted-foreground)">Date</p>
                          <p className="mt-0.5 text-xs text-(--muted-foreground)">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Badge className={cn("text-[10px] px-2 py-0.5 gap-1", status.className)}>
                          {status.icon}
                          {status.label}
                        </Badge>
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
                      <TableHead className="hidden sm:table-cell">Transaction ID</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="hidden md:table-cell">Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((order) => {
                      const status = statusConfig[order.status] || statusConfig.completed
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="hidden sm:table-cell">
                            <code className="rounded-(--radius-sm) bg-(--muted) px-2 py-0.5 text-xs font-mono">
                              TXN-{order.id.toUpperCase()}
                            </code>
                          </TableCell>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell className="font-medium">{formatCurrency(order.total)}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="flex h-7 w-7 items-center justify-center rounded-(--radius-sm) bg-(--muted)">
                                {methodIcons[order.paymentMethod]}
                              </div>
                              <span className="text-xs text-(--muted-foreground)">
                                {methodLabels[order.paymentMethod]}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={cn("text-[10px] px-2 py-0.5 gap-1", status.className)}>
                              {status.icon}
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-xs text-(--muted-foreground)">
                            {formatDate(order.createdAt)}
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
      </motion.div>
  )
}
