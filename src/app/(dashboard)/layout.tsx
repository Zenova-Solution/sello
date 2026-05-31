"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-(--background)">
        <Sidebar />
        <div className="flex flex-1 flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
            <div className="flex min-h-full flex-col p-4 sm:p-6 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                  className="flex flex-1 flex-col"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
          <BottomNav />
        </div>
      </div>
    </SidebarProvider>
  )
}
