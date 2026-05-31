import type { Product, Order, Customer, Employee, InventoryMovement, KpiData, SalesDataPoint, CategorySales, HourlySales, TopProduct, Activity, Notification, HeatmapData } from "@/types"

export const kpiData: KpiData[] = [
  { title: "Today's Revenue", value: "$12,482", change: 12.5, trend: "up", icon: "dollar-sign" },
  { title: "Orders Today", value: "186", change: 8.2, trend: "up", icon: "shopping-bag" },
  { title: "Avg Order Value", value: "$67.10", change: -2.4, trend: "down", icon: "receipt" },
  { title: "Active Customers", value: "1,429", change: 18.7, trend: "up", icon: "users" },
  { title: "Inventory Alerts", value: "12", change: 33.3, trend: "up", icon: "alert-triangle" },
  { title: "Refunds", value: "$342", change: -5.1, trend: "down", icon: "rotate-ccw" },
  { title: "Pending Orders", value: "23", change: 9.5, trend: "up", icon: "clock" },
  { title: "Total Orders", value: "1,847", change: 15.2, trend: "up", icon: "shopping-cart" },
]

export const products: Product[] = [
  { id: "p1", name: "Classic Burger", description: "Beef patty with lettuce, tomato, and special sauce", price: 12.99, cost: 4.50, category: "food", sku: "BUR-001", barcode: "8901234567890", stock: 45, minStock: 10, unit: "unit", active: true, createdAt: "2025-01-15" },
  { id: "p2", name: "Margherita Pizza", description: "Fresh mozzarella, tomato sauce, and basil", price: 18.99, cost: 6.20, category: "food", sku: "PIZ-002", barcode: "8901234567891", stock: 28, minStock: 8, unit: "unit", active: true, createdAt: "2025-01-15" },
  { id: "p3", name: "Caesar Salad", description: "Romaine lettuce, croutons, parmesan, caesar dressing", price: 11.49, cost: 3.80, category: "food", sku: "SAL-003", stock: 52, minStock: 15, unit: "unit", active: true, createdAt: "2025-02-01" },
  { id: "p4", name: "French Fries", description: "Crispy golden fries with sea salt", price: 4.99, cost: 1.20, category: "food", sku: "SID-004", stock: 120, minStock: 30, unit: "portion", active: true, createdAt: "2025-01-15" },
  { id: "p5", name: "Coca-Cola", description: "Refreshing cola beverage", price: 2.49, cost: 0.80, category: "beverages", sku: "BEV-005", barcode: "8901234567895", stock: 200, minStock: 50, unit: "unit", active: true, createdAt: "2025-01-15" },
  { id: "p6", name: "Iced Latte", description: "Espresso with cold milk and ice", price: 5.99, cost: 1.50, category: "beverages", sku: "BEV-006", stock: 65, minStock: 20, unit: "unit", active: true, createdAt: "2025-03-01" },
  { id: "p7", name: "Chocolate Chip Cookie", description: "Freshly baked cookie with dark chocolate chips", price: 3.49, cost: 0.90, category: "snacks", sku: "SNK-007", stock: 8, minStock: 15, unit: "unit", active: true, createdAt: "2025-02-15" },
  { id: "p8", name: "Veggie Wrap", description: "Grilled vegetables with hummus in tortilla wrap", price: 10.99, cost: 3.50, category: "food", sku: "WRP-008", stock: 3, minStock: 10, unit: "unit", active: true, createdAt: "2025-03-10" },
  { id: "p9", name: "Mineral Water", description: "Sparkling mineral water 500ml", price: 1.99, cost: 0.50, category: "beverages", sku: "BEV-009", stock: 150, minStock: 40, unit: "unit", active: true, createdAt: "2025-01-15" },
  { id: "p10", name: "Chicken Sandwich", description: "Grilled chicken breast with mayo and lettuce", price: 13.49, cost: 4.20, category: "food", sku: "SND-010", stock: 35, minStock: 10, unit: "unit", active: true, createdAt: "2025-02-20" },
  { id: "p11", name: "Onion Rings", description: "Beer-battered onion rings with dipping sauce", price: 5.99, cost: 1.80, category: "food", sku: "SID-011", stock: 18, minStock: 10, unit: "portion", active: true, createdAt: "2025-03-05" },
  { id: "p12", name: "Green Smoothie", description: "Kale, spinach, banana, and apple juice", price: 6.99, cost: 2.10, category: "beverages", sku: "BEV-012", stock: 2, minStock: 10, unit: "unit", active: true, createdAt: "2025-04-01" },
]

export const orders: Order[] = [
  { id: "o1", orderNumber: "ORD-2025-001", items: [{ productId: "p1", productName: "Classic Burger", quantity: 2, unitPrice: 12.99, totalPrice: 25.98 }, { productId: "p4", productName: "French Fries", quantity: 2, unitPrice: 4.99, totalPrice: 9.98 }, { productId: "p5", productName: "Coca-Cola", quantity: 2, unitPrice: 2.49, totalPrice: 4.98 }], status: "completed", paymentMethod: "card", subtotal: 40.94, tax: 3.28, discount: 0, total: 44.22, cashier: "Sarah Chen", createdAt: "2025-05-30T10:15:00", updatedAt: "2025-05-30T10:20:00" },
  { id: "o2", orderNumber: "ORD-2025-002", items: [{ productId: "p2", productName: "Margherita Pizza", quantity: 1, unitPrice: 18.99, totalPrice: 18.99 }, { productId: "p7", productName: "Chocolate Chip Cookie", quantity: 2, unitPrice: 3.49, totalPrice: 6.98 }], status: "processing", paymentMethod: "cash", subtotal: 25.97, tax: 2.08, discount: 0, total: 28.05, cashier: "Mike Johnson", createdAt: "2025-05-30T11:30:00", updatedAt: "2025-05-30T11:32:00" },
  { id: "o3", orderNumber: "ORD-2025-003", customer: { id: "c1", name: "Emily Davis", email: "emily@example.com", phone: "+1234567890", totalSpent: 1240, orderCount: 34, loyaltyPoints: 340, membershipTier: "gold", tags: ["vip", "frequent"], createdAt: "2024-06-15", lastVisit: "2025-05-30" }, items: [{ productId: "p3", productName: "Caesar Salad", quantity: 1, unitPrice: 11.49, totalPrice: 11.49 }, { productId: "p6", productName: "Iced Latte", quantity: 1, unitPrice: 5.99, totalPrice: 5.99 }], status: "pending", paymentMethod: "mobile_banking", subtotal: 17.48, tax: 1.40, discount: 2.00, total: 16.88, cashier: "Sarah Chen", createdAt: "2025-05-30T12:00:00", updatedAt: "2025-05-30T12:00:00" },
  { id: "o4", orderNumber: "ORD-2025-004", items: [{ productId: "p10", productName: "Chicken Sandwich", quantity: 3, unitPrice: 13.49, totalPrice: 40.47 }, { productId: "p11", productName: "Onion Rings", quantity: 3, unitPrice: 5.99, totalPrice: 17.97 }], status: "completed", paymentMethod: "card", subtotal: 58.44, tax: 4.68, discount: 5.00, total: 58.12, cashier: "Mike Johnson", notes: "Extra sauce on the side", createdAt: "2025-05-30T09:00:00", updatedAt: "2025-05-30T09:08:00" },
  { id: "o5", orderNumber: "ORD-2025-005", items: [{ productId: "p8", productName: "Veggie Wrap", quantity: 1, unitPrice: 10.99, totalPrice: 10.99 }, { productId: "p9", productName: "Mineral Water", quantity: 1, unitPrice: 1.99, totalPrice: 1.99 }], status: "cancelled", paymentMethod: "cash", subtotal: 12.98, tax: 1.04, discount: 0, total: 14.02, cashier: "Sarah Chen", createdAt: "2025-05-29T18:45:00", updatedAt: "2025-05-29T18:50:00" },
  { id: "o6", orderNumber: "ORD-2025-006", items: [{ productId: "p5", productName: "Coca-Cola", quantity: 6, unitPrice: 2.49, totalPrice: 14.94 }, { productId: "p9", productName: "Mineral Water", quantity: 4, unitPrice: 1.99, totalPrice: 7.96 }], status: "completed", paymentMethod: "qr", subtotal: 22.90, tax: 1.83, discount: 0, total: 24.73, cashier: "Mike Johnson", createdAt: "2025-05-29T14:20:00", updatedAt: "2025-05-29T14:25:00" },
  { id: "o7", orderNumber: "ORD-2025-007", customer: { id: "c2", name: "Alex Rivera", email: "alex@example.com", phone: "+1987654321", totalSpent: 3420, orderCount: 87, loyaltyPoints: 870, membershipTier: "platinum", tags: ["wholesale", "vip"], createdAt: "2024-03-01", lastVisit: "2025-05-28" }, items: [{ productId: "p2", productName: "Margherita Pizza", quantity: 4, unitPrice: 18.99, totalPrice: 75.96 }, { productId: "p1", productName: "Classic Burger", quantity: 4, unitPrice: 12.99, totalPrice: 51.96 }, { productId: "p4", productName: "French Fries", quantity: 4, unitPrice: 4.99, totalPrice: 19.96 }], status: "processing", paymentMethod: "card", subtotal: 147.88, tax: 11.83, discount: 10.00, total: 149.71, cashier: "Sarah Chen", createdAt: "2025-05-29T19:00:00", updatedAt: "2025-05-29T19:02:00" },
  { id: "o8", orderNumber: "ORD-2025-008", items: [{ productId: "p6", productName: "Iced Latte", quantity: 1, unitPrice: 5.99, totalPrice: 5.99 }], status: "refunded", paymentMethod: "card", subtotal: 5.99, tax: 0.48, discount: 0, total: 6.47, cashier: "Mike Johnson", notes: "Customer requested refund - incorrect order", createdAt: "2025-05-29T08:15:00", updatedAt: "2025-05-29T08:30:00" },
  { id: "o9", orderNumber: "ORD-2025-009", items: [{ productId: "p7", productName: "Chocolate Chip Cookie", quantity: 12, unitPrice: 3.49, totalPrice: 41.88 }], status: "pending", paymentMethod: "mobile_banking", subtotal: 41.88, tax: 3.35, discount: 0, total: 45.23, cashier: "Sarah Chen", createdAt: "2025-05-30T13:15:00", updatedAt: "2025-05-30T13:15:00" },
  { id: "o10", orderNumber: "ORD-2025-010", items: [{ productId: "p3", productName: "Caesar Salad", quantity: 2, unitPrice: 11.49, totalPrice: 22.98 }, { productId: "p10", productName: "Chicken Sandwich", quantity: 1, unitPrice: 13.49, totalPrice: 13.49 }, { productId: "p6", productName: "Iced Latte", quantity: 2, unitPrice: 5.99, totalPrice: 11.98 }], status: "completed", paymentMethod: "card", subtotal: 48.45, tax: 3.88, discount: 0, total: 52.33, cashier: "Mike Johnson", createdAt: "2025-05-30T08:30:00", updatedAt: "2025-05-30T08:35:00" },
]

export const customers: Customer[] = [
  { id: "c1", name: "Emily Davis", email: "emily@example.com", phone: "+1234567890", totalSpent: 1240.50, orderCount: 34, loyaltyPoints: 340, membershipTier: "gold", tags: ["vip", "frequent"], notes: "Prefers vegetarian options", createdAt: "2024-06-15", lastVisit: "2025-05-30" },
  { id: "c2", name: "Alex Rivera", email: "alex@example.com", phone: "+1987654321", totalSpent: 3420.75, orderCount: 87, loyaltyPoints: 870, membershipTier: "platinum", tags: ["wholesale", "vip", "catering"], createdAt: "2024-03-01", lastVisit: "2025-05-28" },
  { id: "c3", name: "Sophia Kim", email: "sophia@example.com", phone: "+1122334455", totalSpent: 567.25, orderCount: 18, loyaltyPoints: 180, membershipTier: "silver", tags: ["new"], createdAt: "2025-01-10", lastVisit: "2025-05-25" },
  { id: "c4", name: "James Wilson", email: "james@example.com", phone: "+1555666777", totalSpent: 2340.00, orderCount: 56, loyaltyPoints: 560, membershipTier: "gold", tags: ["business", "regular"], createdAt: "2024-09-20", lastVisit: "2025-05-29" },
  { id: "c5", name: "Olivia Martinez", email: "olivia@example.com", phone: "+1444333222", totalSpent: 189.50, orderCount: 5, loyaltyPoints: 50, membershipTier: "bronze", tags: [], createdAt: "2025-04-05", lastVisit: "2025-05-20" },
  { id: "c6", name: "Liam Thompson", email: "liam@example.com", phone: "+1777888999", totalSpent: 4890.25, orderCount: 112, loyaltyPoints: 1120, membershipTier: "platinum", tags: ["catering", "vip", "frequent"], notes: "Prefers contactless payment", createdAt: "2023-11-01", lastVisit: "2025-05-30" },
  { id: "c7", name: "Emma Garcia", email: "emma@example.com", phone: "+1666777888", totalSpent: 890.00, orderCount: 24, loyaltyPoints: 240, membershipTier: "silver", tags: ["student"], createdAt: "2025-02-14", lastVisit: "2025-05-22" },
]

export const employees: Employee[] = [
  { id: "e1", name: "Sarah Chen", email: "sarah@sello.app", phone: "+1111222333", role: "manager", shift: "active", salesAmount: 45890.50, salesCount: 892, rating: 4.9, startDate: "2024-01-15", permissions: ["all"] },
  { id: "e2", name: "Mike Johnson", email: "mike@sello.app", phone: "+1222333444", role: "cashier", shift: "active", salesAmount: 32100.00, salesCount: 654, rating: 4.7, startDate: "2024-03-01", permissions: ["pos", "orders", "customers"] },
  { id: "e3", name: "Jessica Lee", email: "jessica@sello.app", phone: "+1333444555", role: "cashier", shift: "scheduled", salesAmount: 25400.75, salesCount: 512, rating: 4.5, startDate: "2024-06-10", permissions: ["pos", "orders"] },
  { id: "e4", name: "David Park", email: "david@sello.app", phone: "+1444555666", role: "kitchen", shift: "active", salesAmount: 0, salesCount: 0, rating: 4.8, startDate: "2024-02-20", permissions: ["kitchen"] },
  { id: "e5", name: "Rachel Adams", email: "rachel@sello.app", phone: "+1555666777", role: "admin", shift: "completed", salesAmount: 67800.00, salesCount: 1200, rating: 5.0, startDate: "2023-08-01", permissions: ["all"] },
  { id: "e6", name: "Tom Hernandez", email: "tom@sello.app", phone: "+1666777888", role: "cashier", shift: "active", salesAmount: 18700.25, salesCount: 389, rating: 4.3, startDate: "2024-09-15", permissions: ["pos", "orders"] },
  { id: "e7", name: "Nina Patel", email: "nina@sello.app", phone: "+1777888999", role: "support", shift: "active", salesAmount: 0, salesCount: 0, rating: 4.6, startDate: "2024-11-01", permissions: ["customers", "orders"] },
]

export const inventoryMovements: InventoryMovement[] = [
  { id: "m1", productId: "p1", productName: "Classic Burger", type: "out", quantity: 15, reason: "Order fulfillment", createdBy: "Sarah Chen", createdAt: "2025-05-30T10:15:00" },
  { id: "m2", productId: "p5", productName: "Coca-Cola", type: "in", quantity: 100, reason: "Supplier restock", createdBy: "Mike Johnson", createdAt: "2025-05-29T09:00:00" },
  { id: "m3", productId: "p7", productName: "Chocolate Chip Cookie", type: "out", quantity: 5, reason: "Expired - removed from shelf", createdBy: "Jessica Lee", createdAt: "2025-05-28T16:30:00" },
  { id: "m4", productId: "p8", productName: "Veggie Wrap", type: "in", quantity: 25, reason: "Supplier restock", createdBy: "Mike Johnson", createdAt: "2025-05-28T08:00:00" },
  { id: "m5", productId: "p12", productName: "Green Smoothie", type: "in", quantity: 30, reason: "Weekly delivery", createdBy: "Sarah Chen", createdAt: "2025-05-30T07:00:00" },
  { id: "m6", productId: "p3", productName: "Caesar Salad", type: "out", quantity: 8, reason: "Order fulfillment", createdBy: "Mike Johnson", createdAt: "2025-05-30T12:00:00" },
  { id: "m7", productId: "p6", productName: "Iced Latte", type: "adjustment", quantity: -2, reason: "Inventory count adjustment", createdBy: "Sarah Chen", createdAt: "2025-05-29T20:00:00" },
]

export const revenueData: SalesDataPoint[] = [
  { date: "Mon", revenue: 4820, orders: 145, profit: 1930 },
  { date: "Tue", revenue: 5340, orders: 162, profit: 2140 },
  { date: "Wed", revenue: 4980, orders: 151, profit: 1990 },
  { date: "Thu", revenue: 6120, orders: 178, profit: 2450 },
  { date: "Fri", revenue: 7580, orders: 210, profit: 3030 },
  { date: "Sat", revenue: 8920, orders: 245, profit: 3570 },
  { date: "Sun", revenue: 6710, orders: 189, profit: 2680 },
]

export const categorySales: CategorySales[] = [
  { name: "Food", value: 65, color: "#10b981" },
  { name: "Beverages", value: 20, color: "#0ea5e9" },
  { name: "Snacks", value: 10, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#8b5cf6" },
]

export const hourlySales: HourlySales[] = [
  { hour: "8AM", sales: 420, orders: 12 },
  { hour: "9AM", sales: 680, orders: 18 },
  { hour: "10AM", sales: 520, orders: 15 },
  { hour: "11AM", sales: 890, orders: 24 },
  { hour: "12PM", sales: 1450, orders: 38 },
  { hour: "1PM", sales: 1230, orders: 32 },
  { hour: "2PM", sales: 780, orders: 20 },
  { hour: "3PM", sales: 560, orders: 16 },
  { hour: "4PM", sales: 610, orders: 17 },
  { hour: "5PM", sales: 980, orders: 26 },
  { hour: "6PM", sales: 1560, orders: 40 },
  { hour: "7PM", sales: 1420, orders: 36 },
  { hour: "8PM", sales: 980, orders: 25 },
  { hour: "9PM", sales: 540, orders: 14 },
]

export const topProducts: TopProduct[] = [
  { id: "p1", name: "Classic Burger", sales: 342, revenue: 4442.58, growth: 12.5 },
  { id: "p2", name: "Margherita Pizza", sales: 287, revenue: 5449.13, growth: 8.3 },
  { id: "p4", name: "French Fries", sales: 256, revenue: 1277.44, growth: 15.1 },
  { id: "p5", name: "Coca-Cola", sales: 412, revenue: 1025.88, growth: 3.2 },
  { id: "p10", name: "Chicken Sandwich", sales: 198, revenue: 2671.02, growth: -2.1 },
]

export const activities: Activity[] = [
  { id: "a1", type: "order", message: "New order #ORD-2025-003 placed", timestamp: "2025-05-30T12:00:00", user: "Emily Davis" },
  { id: "a2", type: "payment", message: "Payment of $149.71 received via card", timestamp: "2025-05-29T19:02:00", user: "Sarah Chen" },
  { id: "a3", type: "customer", message: "Alex Rivera upgraded to Platinum tier", timestamp: "2025-05-29T15:00:00" },
  { id: "a4", type: "inventory", message: "Coca-Cola restocked - 100 units", timestamp: "2025-05-29T09:00:00", user: "Mike Johnson" },
  { id: "a5", type: "order", message: "Order #ORD-2025-008 refunded - $6.47", timestamp: "2025-05-29T08:30:00", user: "Mike Johnson" },
  { id: "a6", type: "employee", message: "Sarah Chen started shift", timestamp: "2025-05-30T08:00:00" },
  { id: "a7", type: "inventory", message: "Green Smoothie low stock alert - 2 remaining", timestamp: "2025-05-30T07:30:00" },
  { id: "a8", type: "order", message: "Large order #ORD-2025-007 placed - $149.71", timestamp: "2025-05-29T19:00:00", user: "Alex Rivera" },
]

export const notifications: Notification[] = [
  { id: "n1", type: "warning", title: "Low Stock Alert", message: "Green Smoothie (SKU: BEV-012) has only 2 units remaining", read: false, createdAt: "2025-05-30T07:30:00" },
  { id: "n2", type: "success", title: "Payout Complete", message: "Daily settlement of $4,820.00 has been processed", read: false, createdAt: "2025-05-30T06:00:00" },
  { id: "n3", type: "info", title: "New Customer", message: "Olivia Martinez signed up for loyalty program", read: false, createdAt: "2025-05-29T14:20:00" },
  { id: "n4", type: "error", title: "Payment Failed", message: "Transaction for order #ORD-2025-009 requires attention", read: true, createdAt: "2025-05-29T12:00:00" },
  { id: "n5", type: "info", title: "Shift Change", message: "Jessica Lee scheduled for tomorrow at 9:00 AM", read: true, createdAt: "2025-05-29T10:00:00" },
]

export const heatmapData: HeatmapData[] = [
  { day: "Mon", hour: 8, value: 15 }, { day: "Mon", hour: 9, value: 25 }, { day: "Mon", hour: 10, value: 20 }, { day: "Mon", hour: 11, value: 35 }, { day: "Mon", hour: 12, value: 55 }, { day: "Mon", hour: 13, value: 45 }, { day: "Mon", hour: 14, value: 30 }, { day: "Mon", hour: 15, value: 20 }, { day: "Mon", hour: 16, value: 25 }, { day: "Mon", hour: 17, value: 40 }, { day: "Mon", hour: 18, value: 60 }, { day: "Mon", hour: 19, value: 50 }, { day: "Mon", hour: 20, value: 35 }, { day: "Mon", hour: 21, value: 20 },
  { day: "Tue", hour: 8, value: 18 }, { day: "Tue", hour: 9, value: 28 }, { day: "Tue", hour: 10, value: 22 }, { day: "Tue", hour: 11, value: 38 }, { day: "Tue", hour: 12, value: 58 }, { day: "Tue", hour: 13, value: 48 }, { day: "Tue", hour: 14, value: 32 }, { day: "Tue", hour: 15, value: 22 }, { day: "Tue", hour: 16, value: 28 }, { day: "Tue", hour: 17, value: 42 }, { day: "Tue", hour: 18, value: 62 }, { day: "Tue", hour: 19, value: 52 }, { day: "Tue", hour: 20, value: 38 }, { day: "Tue", hour: 21, value: 22 },
  { day: "Wed", hour: 8, value: 12 }, { day: "Wed", hour: 9, value: 22 }, { day: "Wed", hour: 10, value: 18 }, { day: "Wed", hour: 11, value: 32 }, { day: "Wed", hour: 12, value: 52 }, { day: "Wed", hour: 13, value: 42 }, { day: "Wed", hour: 14, value: 28 }, { day: "Wed", hour: 15, value: 18 }, { day: "Wed", hour: 16, value: 22 }, { day: "Wed", hour: 17, value: 38 }, { day: "Wed", hour: 18, value: 58 }, { day: "Wed", hour: 19, value: 48 }, { day: "Wed", hour: 20, value: 32 }, { day: "Wed", hour: 21, value: 18 },
  { day: "Thu", hour: 8, value: 20 }, { day: "Thu", hour: 9, value: 30 }, { day: "Thu", hour: 10, value: 25 }, { day: "Thu", hour: 11, value: 40 }, { day: "Thu", hour: 12, value: 60 }, { day: "Thu", hour: 13, value: 50 }, { day: "Thu", hour: 14, value: 35 }, { day: "Thu", hour: 15, value: 25 }, { day: "Thu", hour: 16, value: 30 }, { day: "Thu", hour: 17, value: 45 }, { day: "Thu", hour: 18, value: 65 }, { day: "Thu", hour: 19, value: 55 }, { day: "Thu", hour: 20, value: 40 }, { day: "Thu", hour: 21, value: 25 },
  { day: "Fri", hour: 8, value: 25 }, { day: "Fri", hour: 9, value: 35 }, { day: "Fri", hour: 10, value: 30 }, { day: "Fri", hour: 11, value: 48 }, { day: "Fri", hour: 12, value: 70 }, { day: "Fri", hour: 13, value: 58 }, { day: "Fri", hour: 14, value: 40 }, { day: "Fri", hour: 15, value: 30 }, { day: "Fri", hour: 16, value: 35 }, { day: "Fri", hour: 17, value: 55 }, { day: "Fri", hour: 18, value: 78 }, { day: "Fri", hour: 19, value: 65 }, { day: "Fri", hour: 20, value: 48 }, { day: "Fri", hour: 21, value: 30 },
  { day: "Sat", hour: 8, value: 10 }, { day: "Sat", hour: 9, value: 18 }, { day: "Sat", hour: 10, value: 22 }, { day: "Sat", hour: 11, value: 35 }, { day: "Sat", hour: 12, value: 55 }, { day: "Sat", hour: 13, value: 65 }, { day: "Sat", hour: 14, value: 50 }, { day: "Sat", hour: 15, value: 40 }, { day: "Sat", hour: 16, value: 48 }, { day: "Sat", hour: 17, value: 60 }, { day: "Sat", hour: 18, value: 75 }, { day: "Sat", hour: 19, value: 68 }, { day: "Sat", hour: 20, value: 55 }, { day: "Sat", hour: 21, value: 35 },
  { day: "Sun", hour: 8, value: 8 }, { day: "Sun", hour: 9, value: 15 }, { day: "Sun", hour: 10, value: 20 }, { day: "Sun", hour: 11, value: 30 }, { day: "Sun", hour: 12, value: 48 }, { day: "Sun", hour: 13, value: 40 }, { day: "Sun", hour: 14, value: 35 }, { day: "Sun", hour: 15, value: 28 }, { day: "Sun", hour: 16, value: 32 }, { day: "Sun", hour: 17, value: 42 }, { day: "Sun", hour: 18, value: 55 }, { day: "Sun", hour: 19, value: 50 }, { day: "Sun", hour: 20, value: 38 }, { day: "Sun", hour: 21, value: 22 },
]

export function getLowStockProducts(): Product[] {
  return products.filter((p) => p.stock <= p.minStock)
}

export function getOrderStats(status: string): number {
  return orders.filter((o) => o.status === status).length
}

export function getRevenueByDay(day: string): number {
  return revenueData.find((d) => d.date === day)?.revenue ?? 0
}
