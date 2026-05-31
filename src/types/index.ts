export type OrderStatus = "pending" | "processing" | "completed" | "refunded" | "cancelled"
export type PaymentMethod = "cash" | "card" | "mobile_banking" | "qr" | "split"
export type ProductCategory = "food" | "beverages" | "snacks" | "groceries" | "electronics" | "clothing" | "other"
export type EmployeeRole = "cashier" | "manager" | "admin" | "kitchen" | "support"
export type ShiftStatus = "active" | "completed" | "scheduled"
export type MembershipTier = "bronze" | "silver" | "gold" | "platinum"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  cost: number
  category: ProductCategory
  image?: string
  sku: string
  barcode?: string
  stock: number
  minStock: number
  unit: string
  active: boolean
  createdAt: string
}

export interface Order {
  id: string
  orderNumber: string
  customer?: Customer
  items: OrderItem[]
  status: OrderStatus
  paymentMethod: PaymentMethod
  subtotal: number
  tax: number
  discount: number
  total: number
  cashier?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  discount?: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  totalSpent: number
  orderCount: number
  loyaltyPoints: number
  membershipTier: MembershipTier
  tags: string[]
  notes?: string
  createdAt: string
  lastVisit: string
}

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  role: EmployeeRole
  avatar?: string
  shift: ShiftStatus
  salesAmount: number
  salesCount: number
  rating: number
  startDate: string
  permissions: string[]
}

export interface InventoryMovement {
  id: string
  productId: string
  productName: string
  type: "in" | "out" | "adjustment"
  quantity: number
  reason: string
  createdBy: string
  createdAt: string
}

export interface KpiData {
  title: string
  value: string
  change: number
  trend: "up" | "down" | "neutral"
  icon: string
}

export interface SalesDataPoint {
  date: string
  revenue: number
  orders: number
  profit: number
}

export interface CategorySales {
  name: string
  value: number
  color: string
}

export interface HourlySales {
  hour: string
  sales: number
  orders: number
}

export interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  growth: number
}

export interface Activity {
  id: string
  type: "order" | "payment" | "customer" | "inventory" | "employee"
  message: string
  timestamp: string
  user?: string
}

export interface Notification {
  id: string
  type: "info" | "warning" | "success" | "error"
  title: string
  message: string
  read: boolean
  createdAt: string
}

export interface HeatmapData {
  day: string
  hour: number
  value: number
}
