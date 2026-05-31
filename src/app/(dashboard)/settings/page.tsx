"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Settings2,
  Store,
  Palette,
  Bell,
  Users,
  CreditCard,
  Save,
  Sun,
  Moon,
  Monitor,
  Mail,
  ShoppingBag,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Building2,
  MapPin,
  Globe,
  Clock,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

const teamMembers = [
  { name: "Sarah Chen", role: "Manager", email: "sarah@sello.app" },
  { name: "Mike Johnson", role: "Cashier", email: "mike@sello.app" },
  { name: "Rachel Adams", role: "Admin", email: "rachel@sello.app" },
]

export default function SettingsPage() {
  return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-(--muted-foreground)">Manage your store preferences</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue="general">
            <div className="mb-6 overflow-x-auto">
              <TabsList>
                <TabsTrigger value="general">
                  <Store className="h-4 w-4" />
                  General
                </TabsTrigger>
                <TabsTrigger value="appearance">
                  <Palette className="h-4 w-4" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="team">
                  <Users className="h-4 w-4" />
                  Team
                </TabsTrigger>
                <TabsTrigger value="billing">
                  <CreditCard className="h-4 w-4" />
                  Billing
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="general">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                      <Store className="h-4 w-4 text-(--muted-foreground)" />
                      Store Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-(--foreground)">Store Name</label>
                      <Input defaultValue="Sello Store" className="h-9" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-(--foreground)">Address</label>
                      <Input defaultValue="123 Main Street, New York, NY 10001" className="h-9" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-(--foreground)">Currency</label>
                        <Select defaultValue="usd">
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (€)</SelectItem>
                            <SelectItem value="gbp">GBP (£)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-(--foreground)">Timezone</label>
                        <Select defaultValue="est">
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="est">EST (UTC-5)</SelectItem>
                            <SelectItem value="pst">PST (UTC-8)</SelectItem>
                            <SelectItem value="cst">CST (UTC-6)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button size="sm" className="mt-2 gap-1">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4 text-(--muted-foreground)" />
                      Tax & Receipt
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-(--foreground)">Tax Rate (%)</label>
                      <Input type="number" defaultValue="8" className="h-9" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-(--foreground)">Receipt Footer</label>
                      <Input defaultValue="Thank you for your visit!" className="h-9" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Auto-print Receipt</p>
                        <p className="text-xs text-(--muted-foreground)">Print receipts automatically after each sale</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Button size="sm" className="mt-2 gap-1">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="appearance">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium">
                    <Palette className="h-4 w-4 text-(--muted-foreground)" />
                    Appearance Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-6">
                  <div>
                    <label className="text-xs font-medium text-(--foreground)">Theme</label>
                    <p className="text-xs text-(--muted-foreground) mb-3">Choose your preferred color scheme</p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "light", icon: Sun, label: "Light" },
                        { value: "dark", icon: Moon, label: "Dark" },
                        { value: "system", icon: Monitor, label: "System" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={cn(
                            "flex flex-col items-center gap-2 rounded-(--radius-lg) border-2 p-4 transition-all",
                            "hover:border-(--primary) hover:bg-(--muted)/50",
                            option.value === "light"
                              ? "border-(--primary) bg-(--primary)/5"
                              : "border-(--border) bg-(--card)"
                          )}
                        >
                          <option.icon className="h-6 w-6 text-(--muted-foreground)" />
                          <span className="text-xs font-medium">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <label className="text-xs font-medium text-(--foreground)">Font Size</label>
                    <p className="text-xs text-(--muted-foreground) mb-3">Adjust the interface text size</p>
                    <Select defaultValue="medium">
                      <SelectTrigger className="h-9 w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium">
                    <Bell className="h-4 w-4 text-(--muted-foreground)" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {[
                    {
                      icon: Mail,
                      title: "Email Notifications",
                      desc: "Receive email updates about your store",
                      defaultChecked: true,
                    },
                    {
                      icon: ShoppingBag,
                      title: "Order Alerts",
                      desc: "Get notified when new orders are placed",
                      defaultChecked: true,
                    },
                    {
                      icon: AlertTriangle,
                      title: "Low Stock Alerts",
                      desc: "Receive alerts when products run low",
                      defaultChecked: true,
                    },
                    {
                      icon: FileText,
                      title: "Daily Summary",
                      desc: "Get a daily summary of store performance",
                      defaultChecked: false,
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-(--radius-md) bg-(--muted) p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-(--radius-md) bg-(--background) p-2">
                          <item.icon className="h-4 w-4 text-(--muted-foreground)" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-(--muted-foreground)">{item.desc}</p>
                        </div>
                      </div>
                      <Switch defaultChecked={item.defaultChecked} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium">
                    <Users className="h-4 w-4 text-(--muted-foreground)" />
                    Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-(--border)">
                    {teamMembers.map((member, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 transition-colors hover:bg-(--muted)/50"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="text-xs">
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-(--muted-foreground)">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{member.role}</Badge>
                          <Select defaultValue="active">
                            <SelectTrigger className="h-7 w-24 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                      <CreditCard className="h-4 w-4 text-(--muted-foreground)" />
                      Current Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="rounded-(--radius-lg) border-2 border-(--primary) bg-(--primary)/5 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold">Premium Plan</p>
                          <p className="text-xs text-(--muted-foreground)">$49.00 / month</p>
                        </div>
                        <Badge variant="default" className="text-[10px]">
                          <CheckCircle2 className="h-3 w-3" />
                          Active
                        </Badge>
                      </div>
                      <Separator className="my-3" />
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-(--muted-foreground)">Users</span>
                          <span className="font-medium">10 / 15</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-(--muted-foreground)">Storage</span>
                          <span className="font-medium">45 GB / 100 GB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-(--muted-foreground)">Support</span>
                          <span className="font-medium">Priority</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Upgrade Plan
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                      <CreditCard className="h-4 w-4 text-(--muted-foreground)" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-3 rounded-(--radius-md) bg-(--muted) p-3">
                      <div className="rounded-(--radius-md) bg-(--background) p-2">
                        <CreditCard className="h-5 w-5 text-(--primary)" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Visa ending in 4242</p>
                        <p className="text-xs text-(--muted-foreground)">Expires 12/28</p>
                      </div>
                      <Badge variant="success" className="text-[10px]">
                        Default
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4 text-(--muted-foreground)" />
                      Invoices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-(--border)">
                      {[
                        { date: "May 1, 2026", amount: "$49.00", status: "Paid" },
                        { date: "Apr 1, 2026", amount: "$49.00", status: "Paid" },
                        { date: "Mar 1, 2026", amount: "$49.00", status: "Paid" },
                        { date: "Feb 1, 2026", amount: "$49.00", status: "Paid" },
                      ].map((inv, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 transition-colors hover:bg-(--muted)/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="rounded-(--radius-md) bg-(--muted) p-2">
                              <FileText className="h-4 w-4 text-(--muted-foreground)" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{inv.date}</p>
                              <p className="text-xs text-(--muted-foreground)">{inv.amount}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="success" className="text-[10px]">
                              {inv.status}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>

  )
}
