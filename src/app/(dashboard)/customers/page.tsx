"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  Plus,
  Search,
  X,
  Star,
  ShoppingBag,
  DollarSign,
  Award,
  Phone,
  Mail,
  Calendar,
  Tag,
  MessageSquare,
} from "lucide-react"

import { cn, formatCurrency, formatNumber, formatDate, getInitials } from "@/lib/utils"
import { customers, orders } from "@/data/mock-data"
import type { MembershipTier } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

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

const tierConfig: Record<MembershipTier, { label: string; className: string; color: string }> = {
  bronze: { label: "Bronze", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400", color: "bg-amber-500" },
  silver: { label: "Silver", className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300", color: "bg-gray-400" },
  gold: { label: "Gold", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", color: "bg-yellow-500" },
  platinum: { label: "Platinum", className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400", color: "bg-purple-500" },
}

function getTierProgress(points: number): number {
  if (points < 100) return (points / 100) * 25
  if (points < 300) return 25 + ((points - 100) / 200) * 25
  if (points < 600) return 50 + ((points - 300) / 300) * 25
  return Math.min(100, 75 + ((points - 600) / 400) * 25)
}

function getNextTier(tier: MembershipTier, points: number): { name: string; pointsNeeded: number } {
  const tiers: MembershipTier[] = ["bronze", "silver", "gold", "platinum"]
  const currentIdx = tiers.indexOf(tier)
  if (currentIdx >= tiers.length - 1) return { name: "Platinum (Max)", pointsNeeded: 0 }
  const nextName = tiers[currentIdx + 1]
  const thresholds = [0, 100, 300, 600, 1000]
  return { name: nextName.charAt(0).toUpperCase() + nextName.slice(1), pointsNeeded: thresholds[currentIdx + 2] - points }
}

export default function CustomersPage() {
  const [search, setSearch] = React.useState("")
  const [selected, setSelected] = React.useState<string | null>(null)

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

  const activeThisMonth = customers.filter(
    (c) => new Date(c.lastVisit).getMonth() === new Date().getMonth()
  ).length
  const avgSpending =
    customers.reduce((s, c) => s + c.totalSpent, 0) / customers.length
  const loyaltyMembers = customers.filter((c) => c.membershipTier !== "bronze").length

  const selectedCustomer = selected ? customers.find((c) => c.id === selected) : null
  const customerOrders = selectedCustomer
    ? orders.filter((o) => o.customer?.id === selectedCustomer.id)
    : []

  return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
            <p className="mt-1 text-sm text-(--muted-foreground)">Manage your customer relationships</p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Customers", value: customers.length, icon: Users, color: "text-(--primary)" },
            { label: "Active This Month", value: activeThisMonth, icon: Star, color: "text-(--success)" },
            { label: "Avg Spending", value: formatCurrency(avgSpending), icon: DollarSign, color: "text-(--info)" },
            { label: "Loyalty Members", value: loyaltyMembers, icon: Award, color: "text-(--warning)" },
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

        <motion.div variants={itemVariants} className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--muted-foreground)" />
          <Input
            placeholder="Search customers..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </motion.div>

        <div className="flex gap-6">
          <motion.div variants={itemVariants} className={cn("flex-1", selected && "hidden lg:block")}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((customer) => {
                const tier = tierConfig[customer.membershipTier]
                return (
                  <Card
                    key={customer.id}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-md",
                      selected === customer.id && "ring-2 ring-(--ring)"
                    )}
                    onClick={() => setSelected(customer.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={customer.avatar} />
                          <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium truncate">{customer.name}</p>
                            <Badge className={cn("text-[10px] px-1.5 py-0", tier.className)}>
                              {tier.label}
                            </Badge>
                          </div>
                          <p className="text-xs text-(--muted-foreground) truncate">{customer.email}</p>
                          <div className="mt-2 flex items-center gap-3 text-xs text-(--muted-foreground)">
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {formatCurrency(customer.totalSpent)}
                            </span>
                            <span className="flex items-center gap-1">
                              <ShoppingBag className="h-3 w-3" />
                              {customer.orderCount}
                            </span>
                          </div>
                          {customer.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {customer.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </motion.div>

          <AnimatePresence>
            {selectedCustomer && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                  onClick={() => setSelected(null)}
                />
                <motion.div
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed inset-y-0 right-0 z-50 w-full border-l border-(--border) bg-(--card) shadow-2xl lg:relative lg:inset-auto lg:z-auto lg:w-[420px] lg:border-none lg:shadow-none lg:shrink-0"
                >
                <Card className="flex h-full flex-col">
                  <ScrollArea className="flex-1">
                  <CardHeader className="sticky top-0 z-10 bg-(--card) border-b border-(--border) p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Customer Details</CardTitle>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSelected(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={selectedCustomer.avatar} />
                          <AvatarFallback className="text-lg">{getInitials(selectedCustomer.name)}</AvatarFallback>
                        </Avatar>
                        <h3 className="mt-3 text-base font-semibold">{selectedCustomer.name}</h3>
                        <Badge className={cn("mt-1", tierConfig[selectedCustomer.membershipTier].className)}>
                          {tierConfig[selectedCustomer.membershipTier].label}
                        </Badge>
                        <p className="mt-1 text-xs text-(--muted-foreground)">Member since {formatDate(selectedCustomer.createdAt, "long")}</p>
                      </div>

                      <div className="mt-4 flex items-center gap-4 rounded-(--radius-md) bg-(--muted) p-3 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-(--muted-foreground)" />
                          <span>{selectedCustomer.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-(--muted-foreground)" />
                          <span>{selectedCustomer.phone}</span>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <h4 className="text-xs font-medium text-(--muted-foreground) uppercase tracking-wider mb-3">
                        Spending Analytics
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "Total Spent", value: formatCurrency(selectedCustomer.totalSpent), icon: DollarSign },
                          { label: "Avg Order", value: formatCurrency(selectedCustomer.totalSpent / Math.max(selectedCustomer.orderCount, 1)), icon: ShoppingBag },
                          { label: "Orders", value: formatNumber(selectedCustomer.orderCount), icon: ShoppingBag },
                        ].map((item) => (
                          <div key={item.label} className="rounded-(--radius-md) bg-(--muted) p-3 text-center">
                            <item.icon className="mx-auto h-4 w-4 text-(--muted-foreground)" />
                            <p className="mt-1 text-sm font-semibold">{item.value}</p>
                            <p className="text-[10px] text-(--muted-foreground)">{item.label}</p>
                          </div>
                        ))}
                      </div>

                      <Separator className="my-4" />

                      <h4 className="text-xs font-medium text-(--muted-foreground) uppercase tracking-wider mb-3">
                        Loyalty Points
                      </h4>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{formatNumber(selectedCustomer.loyaltyPoints)} points</span>
                        {(() => {
                          const next = getNextTier(selectedCustomer.membershipTier, selectedCustomer.loyaltyPoints)
                          return (
                            <span className="text-xs text-(--muted-foreground)">
                              {next.pointsNeeded > 0 ? `${next.pointsNeeded} pts to ${next.name}` : next.name}
                            </span>
                          )
                        })()}
                      </div>
                      <Progress
                        value={getTierProgress(selectedCustomer.loyaltyPoints)}
                        className={cn("mt-2 h-2", tierConfig[selectedCustomer.membershipTier].color)}
                      />
                      <div className="mt-1 flex justify-between text-[10px] text-(--muted-foreground)">
                        <span>Bronze</span>
                        <span>Silver</span>
                        <span>Gold</span>
                        <span>Platinum</span>
                      </div>

                      <Separator className="my-4" />

                      <h4 className="text-xs font-medium text-(--muted-foreground) uppercase tracking-wider mb-3">
                        Recent Orders
                      </h4>
                      {customerOrders.length === 0 ? (
                        <p className="text-xs text-(--muted-foreground)">No orders yet</p>
                      ) : (
                        <div className="space-y-2">
                          {customerOrders.slice(0, 5).map((order) => (
                            <div
                              key={order.id}
                              className="flex items-center justify-between rounded-(--radius-md) bg-(--muted) p-3"
                            >
                              <div>
                                <p className="text-xs font-medium">{order.orderNumber}</p>
                                <p className="text-[10px] text-(--muted-foreground)">
                                  {formatDate(order.createdAt, "relative")}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-medium">{formatCurrency(order.total)}</p>
                                <Badge variant="secondary" className="text-[10px] capitalize">
                                  {order.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <Separator className="my-4" />

                      <h4 className="text-xs font-medium text-(--muted-foreground) uppercase tracking-wider mb-2">
                        Notes
                      </h4>
                      <div className="flex items-start gap-2 rounded-(--radius-md) bg-(--muted) p-3">
                        <MessageSquare className="mt-0.5 h-3.5 w-3.5 text-(--muted-foreground)" />
                        <p className="text-xs text-(--muted-foreground)">
                          {selectedCustomer.notes || "No notes added yet."}
                        </p>
                      </div>
                    </CardContent>
                  </ScrollArea>
                </Card>
              </motion.div>
            </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
  )
}
