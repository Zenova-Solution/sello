"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Menu,
  Search,
  Bell,
  LogOut,
  User,
  Settings,
  HelpCircle,
} from "lucide-react"

import { cn, withBasePath } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { useSidebar } from "@/components/layout/sidebar-context"

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/orders": "Orders",
  "/pos": "POS Terminal",
  "/products": "Products",
  "/categories": "Categories",
  "/inventory": "Inventory",
  "/customers": "Customers",
  "/employees": "Employees",
  "/analytics": "Analytics",
  "/payments": "Payments",
  "/discounts": "Discounts",
  "/reports": "Reports",
  "/settings": "Settings",
}

function getPageTitle(pathname: string): string {
  if (routeTitles[pathname]) return routeTitles[pathname]
  const base = pathname.split("/")[1]
  if (!base) return "Dashboard"
  return routeTitles[`/${base}`] || base.charAt(0).toUpperCase() + base.slice(1)
}

export function Header() {
  const pathname = usePathname()
  const { setMobileOpen } = useSidebar()
  const [unreadNotifications] = React.useState(3)
  const avatarSrc = withBasePath("/avatars/default.svg")

  const title = getPageTitle(pathname)

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-(--border) bg-(--background)/80 backdrop-blur-xl px-4",
        "transition-colors duration-200"
      )}
    >
      {/* Left section */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9 shrink-0"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Page title */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 min-w-0"
        >
          <h1 className="text-sm font-semibold tracking-tight truncate">
            {title}
          </h1>
        </motion.div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1">
        {/* Search */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-(--muted-foreground) hover:text-(--foreground)"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 text-(--muted-foreground) hover:text-(--foreground)"
        >
          <Bell className="h-4 w-4" />
          {unreadNotifications > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-(--destructive) px-1 text-[10px] font-bold leading-none text-(--destructive-foreground)">
              {unreadNotifications}
            </span>
          )}
        </Button>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* User avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={avatarSrc}
                  alt="User avatar"
                />
                <AvatarFallback className="text-xs bg-(--primary)/10 text-(--primary)">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8} className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Alex D.</p>
                <p className="text-xs leading-none text-(--muted-foreground)">
                  alex@sello.app
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <HelpCircle className="h-4 w-4" />
              Help
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-(--destructive)">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
