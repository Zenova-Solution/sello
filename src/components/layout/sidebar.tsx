"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  ShoppingCart,
  CreditCard,
  Package,
  Tags,
  Warehouse,
  Users,
  UserCog,
  BarChart3,
  DollarSign,
  Percent,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { useSidebar } from "@/components/layout/sidebar-context"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "POS Terminal", href: "/pos", icon: CreditCard },
  { label: "Products", href: "/products", icon: Package },
  { label: "Categories", href: "/categories", icon: Tags },
  { label: "Inventory", href: "/inventory", icon: Warehouse },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Employees", href: "/employees", icon: UserCog },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Payments", href: "/payments", icon: DollarSign },
  { label: "Discounts", href: "/discounts", icon: Percent },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Settings", href: "/settings", icon: Settings },
]

const sidebarVariants = {
  expanded: {
    width: "auto",
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  collapsed: {
    width: 64,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.03, duration: 0.3, ease: "easeOut" as const },
  }),
} as const

export function Sidebar() {
  const pathname = usePathname()
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar()

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href
    return pathname.startsWith(href)
  }

  const sidebarContent = (
    <div
      className={cn(
        "flex h-full flex-col bg-(--surface) border-r border-(--border)",
        "transition-colors duration-200"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex h-14 items-center border-b border-(--border) shrink-0",
          collapsed ? "justify-center px-0" : "gap-2 px-5"
        )}
      >
        <div className="flex h-9 w-9 items-center justify-center">
          <Image src="/logo.png" alt="Sello" width={36} height={36} className="h-9 w-9" />
        </div>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="text-base font-bold tracking-tight truncate overflow-hidden whitespace-nowrap"
            >
              Sello
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 pt-4 pb-2">
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item, i) => {
            const active = isActive(item.href)
            const Icon = item.icon
            const link = (
              <Link
                href={item.href}
                onClick={() => {
                  if (mobileOpen) setMobileOpen(false)
                }}
                className={cn(
                  "group relative flex items-center gap-3.5 rounded-(--radius-md) px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  collapsed && "justify-center px-0",
                  active
                    ? "bg-(--primary)/10 text-(--primary) dark:bg-(--primary)/15"
                    : "text-(--muted-foreground) hover:bg-(--accent)/60 hover:text-(--foreground)"
                )}
              >
                {/* Active indicator */}
                {active && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-(--primary)"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <Icon
                  className={cn(
                    "h-[18px] w-[18px] shrink-0",
                    "transition-transform duration-200 group-hover:scale-110"
                  )}
                />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <motion.div
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                    >
                      {link}
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={12}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <motion.div
                key={item.href}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
              >
                {link}
              </motion.div>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Collapse toggle */}
      <div
        className={cn(
          "shrink-0 border-t border-(--border) p-3",
          collapsed && "flex justify-center"
        )}
      >
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          className={cn(
            "w-full justify-start gap-2.5 text-(--muted-foreground)",
            collapsed && "w-9 justify-center"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-xs font-medium">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={collapsed ? "collapsed" : "expanded"}
        initial={false}
        className={cn(
          "hidden md:flex h-screen shrink-0 overflow-hidden",
          "bg-(--surface)",
          collapsed ? "" : "max-w-xs"
        )}
      >
        <TooltipProvider delayDuration={300}>{sidebarContent}</TooltipProvider>
      </motion.aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-[260px] md:hidden"
            >
              <TooltipProvider delayDuration={300}>
                {sidebarContent}
              </TooltipProvider>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
