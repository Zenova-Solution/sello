"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Package,
  Users,
  Briefcase,
  Receipt,
  DollarSign,
  ArrowRight,
  BarChart3,
} from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

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

const reportTypes = [
  {
    title: "Sales Report",
    description: "Daily, weekly, and monthly sales performance with trends and comparisons",
    icon: TrendingUp,
    color: "text-(--primary)",
    gradient: "from-(--primary)/20 to-(--primary)/5",
  },
  {
    title: "Inventory Report",
    description: "Stock levels, movements, and reorder recommendations",
    icon: Package,
    color: "text-(--success)",
    gradient: "from-(--success)/20 to-(--success)/5",
  },
  {
    title: "Customer Report",
    description: "Customer demographics, spending patterns, and retention metrics",
    icon: Users,
    color: "text-(--info)",
    gradient: "from-(--info)/20 to-(--info)/5",
  },
  {
    title: "Employee Performance",
    description: "Staff sales, efficiency ratings, and shift productivity",
    icon: Briefcase,
    color: "text-(--warning)",
    gradient: "from-(--warning)/20 to-(--warning)/5",
  },
  {
    title: "Tax Summary",
    description: "Tax collected, filings, and compliance documentation",
    icon: Receipt,
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    title: "Profit & Loss",
    description: "Revenue, costs, and profitability analysis with margin breakdown",
    icon: DollarSign,
    color: "text-(--destructive)",
    gradient: "from-(--destructive)/20 to-(--destructive)/5",
  },
]

const recentReports = [
  { name: "Monthly Sales Report - May 2026", type: "Sales", date: "2026-05-30", size: "2.4 MB" },
  { name: "Weekly Inventory Summary", type: "Inventory", date: "2026-05-28", size: "1.1 MB" },
  { name: "Q2 Customer Analytics", type: "Customer", date: "2026-05-25", size: "4.6 MB" },
  { name: "Tax Filing - April 2026", type: "Tax", date: "2026-05-20", size: "0.8 MB" },
  { name: "Employee Performance Review", type: "Employee", date: "2026-05-15", size: "3.2 MB" },
]

export default function ReportsPage() {
  return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
            <p className="mt-1 text-sm text-(--muted-foreground)">Generate and download business reports</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Calendar className="h-4 w-4" />
              Last 30 Days
            </Button>
            <Button size="sm" className="text-xs">
              <BarChart3 className="h-4 w-4" />
              Custom Report
            </Button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reportTypes.map((report) => (
            <Card
              key={report.title}
              className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className={cn("absolute inset-0 bg-gradient-to-br opacity-30", report.gradient)}
              />
              <CardContent className="relative p-5">
                <div className={cn("rounded-(--radius-lg) bg-(--background) p-3 shadow-sm w-fit", report.color)}>
                  <report.icon className="h-5 w-5" />
                </div>
                <CardTitle className="mt-4 text-sm font-semibold">{report.title}</CardTitle>
                <CardDescription className="mt-1 text-xs leading-relaxed">
                  {report.description}
                </CardDescription>
                <div className="mt-4 flex items-center gap-2">
                  <Button size="sm" className="h-8 text-xs gap-1">
                    <FileText className="h-3.5 w-3.5" />
                    Generate
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                    View
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Download className="h-4 w-4 text-(--muted-foreground)" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-(--border)">
                {recentReports.map((report, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 transition-colors hover:bg-(--muted)/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-(--radius-md) bg-(--muted) p-2">
                        <FileText className="h-4 w-4 text-(--muted-foreground)" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{report.name}</p>
                        <div className="flex items-center gap-2 text-xs text-(--muted-foreground)">
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            {report.type}
                          </Badge>
                          <span>{formatDate(report.date, "short")}</span>
                          <span>&middot;</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

  )
}
