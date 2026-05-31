"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  ShoppingCart,
  CreditCard,
  Users,
  Settings,
} from "lucide-react"

import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "POS", href: "/pos", icon: CreditCard },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function BottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30 md:hidden",
        "h-16 border-t border-(--border) bg-(--background)/90 backdrop-blur-xl",
        "pb-[env(safe-area-inset-bottom,0px)]"
      )}
    >
      <div className="flex h-full items-center justify-around px-2">
        {navItems.map((item) => {
          const active = isActive(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5",
                "h-full w-14 rounded-(--radius-md) transition-colors duration-200",
                active
                  ? "text-(--primary)"
                  : "text-(--muted-foreground) hover:text-(--foreground)"
              )}
            >
              {active && (
                <motion.div
                  layoutId="bottomNavActive"
                  className="absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-(--primary)"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium leading-none">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
