"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Users,
  UserCheck,
  UserCog,
  UserRound,
  Star,
  Clock,
  Calendar,
  Search,
  MoreHorizontal,
} from "lucide-react"

import { cn, formatCurrency, formatNumber, formatDate, getInitials } from "@/lib/utils"
import { employees } from "@/data/mock-data"
import type { EmployeeRole } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
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

const roleConfig: Record<EmployeeRole, { label: string; color: string }> = {
  manager: { label: "Manager", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
  cashier: { label: "Cashier", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  admin: { label: "Admin", color: "bg-(--primary)/10 text-(--primary)" },
  kitchen: { label: "Kitchen", color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" },
  support: { label: "Support", color: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400" },
}

const shiftConfig = {
  active: { label: "Active", color: "bg-(--success)/10 text-(--success)" },
  completed: { label: "Completed", color: "bg-(--muted) text-(--muted-foreground)" },
  scheduled: { label: "Scheduled", color: "bg-(--info)/10 text-(--info)" },
}

const todayShifts = [
  { name: "Sarah Chen", role: "Manager", time: "8:00 AM - 4:00 PM", status: "active" as const },
  { name: "Mike Johnson", role: "Cashier", time: "8:00 AM - 4:00 PM", status: "active" as const },
  { name: "David Park", role: "Kitchen", time: "10:00 AM - 6:00 PM", status: "active" as const },
  { name: "Tom Hernandez", role: "Cashier", time: "12:00 PM - 8:00 PM", status: "active" as const },
  { name: "Nina Patel", role: "Support", time: "9:00 AM - 5:00 PM", status: "active" as const },
  { name: "Jessica Lee", role: "Cashier", time: "2:00 PM - 10:00 PM", status: "scheduled" as const },
  { name: "Rachel Adams", role: "Admin", time: "8:00 AM - 4:00 PM", status: "completed" as const },
]

export default function EmployeesPage() {
  const [search, setSearch] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState("all")

  const filtered = employees.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === "all" || e.role === roleFilter
    return matchesSearch && matchesRole
  })

  const roles: { label: string; value: string }[] = [
    { label: "All", value: "all" },
    { label: "Managers", value: "manager" },
    { label: "Cashiers", value: "cashier" },
    { label: "Kitchen", value: "kitchen" },
    { label: "Support", value: "support" },
  ]

  return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Employees</h1>
            <p className="mt-1 text-sm text-(--muted-foreground)">Manage your staff and shifts</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Staff", value: employees.length, icon: Users, color: "text-(--primary)" },
            { label: "Active Now", value: employees.filter((e) => e.shift === "active").length, icon: UserCheck, color: "text-(--success)" },
            { label: "Managers", value: employees.filter((e) => e.role === "manager").length, icon: UserCog, color: "text-(--info)" },
            { label: "Cashiers", value: employees.filter((e) => e.role === "cashier").length, icon: UserRound, color: "text-(--warning)" },
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
              placeholder="Search employees..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Tabs value={roleFilter} onValueChange={setRoleFilter}>
            <TabsList>
              {roles.map((r) => (
                <TabsTrigger key={r.value} value={r.value}>
                  {r.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filtered.map((employee) => {
                const role = roleConfig[employee.role]
                const shift = shiftConfig[employee.shift]
                return (
                  <Card key={employee.id} className="transition-all duration-200 hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-11 w-11">
                            <AvatarImage src={employee.avatar} />
                            <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{employee.name}</p>
                              <Badge className={cn("text-[10px] px-1.5 py-0", role.color)}>
                                {role.label}
                              </Badge>
                            </div>
                            <p className="text-xs text-(--muted-foreground)">{employee.email}</p>
                            <div className="mt-2 flex items-center gap-3">
                              <Badge className={cn("text-[10px] px-1.5 py-0", shift.color)}>
                                {shift.label}
                              </Badge>
                              <span className="flex items-center gap-1 text-xs text-(--muted-foreground)">
                                <Star className="h-3 w-3 fill-(--warning) text-(--warning)" />
                                {employee.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                            <DropdownMenuItem>View Schedule</DropdownMenuItem>
                            <DropdownMenuItem>View Sales</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-(--muted-foreground)">Sales: {formatCurrency(employee.salesAmount)}</span>
                        <span className="text-(--muted-foreground)">{employee.salesCount} orders</span>
                        <span className="text-(--muted-foreground)">Since {formatDate(employee.startDate, "short")}</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4 text-(--muted-foreground)" />
                  Today's Shifts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {todayShifts.map((shift, idx) => {
                    const sConfig = shiftConfig[shift.status]
                    return (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-full",
                              sConfig.color
                            )}
                          >
                            <Clock className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{shift.name}</p>
                            <p className="text-[11px] text-(--muted-foreground)">
                              {shift.role} &middot; {shift.time}
                            </p>
                          </div>
                        </div>
                        <Badge className={cn("text-[10px] px-1.5 py-0", sConfig.color)}>
                          {sConfig.label}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
  )
}
