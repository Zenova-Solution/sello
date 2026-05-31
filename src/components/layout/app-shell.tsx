"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { SidebarProvider } from "@/components/layout/sidebar-context"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"

const pageVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
}

const pageTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
}

function ShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen overflow-hidden bg-(--background)">
      {/* Sidebar - hidden on mobile (rendered as overlay) */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0">
        <Header />

        <main
          className={cn(
            "flex-1 overflow-y-auto",
            "pb-20 md:pb-0"
          )}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Mobile bottom nav */}
        <BottomNav />
      </div>
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ShellContent>{children}</ShellContent>
    </SidebarProvider>
  )
}
