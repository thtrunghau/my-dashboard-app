/**
 * Order-related type definitions
 * Based on existing invoice components and DummyJSON API structure
 */

import { Product } from "./products";

// Order status types
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

// Payment method types
export type PaymentMethod =
  | "credit_card"
  | "paypal"
  | "bank_transfer"
  | "cash_on_delivery"
  | "other";

// Order item interface
export interface OrderItem {
  id: number | string;
  productId: number | string;
  product?: Product; // Populated in API responses
  title?: string; // Product title/name
  price: number;
  quantity: number;
  total: number; // price * quantity
  discountPercentage?: number;
  discountedPrice?: number;
  thumbnail?: string; // Product image
}

// Order interface aligned with DummyJSON API
export interface Order {
  id: number | string;
  userId: number | string;
  products: OrderItem[];
  total: number;
  discountedTotal?: number;
  totalProducts: number;
  totalQuantity: number;
  status?: OrderStatus; // Custom field, not in the API
  paymentMethod?: PaymentMethod; // Custom field, not in the API
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
  shippingAddress?: Address; // Custom field, not in the API
  billingAddress?: Address; // Custom field, not in the API
  trackingNumber?: string; // Custom field, not in the API
  notes?: string; // Custom field, not in the API
  customerName?: string; // Custom field, not in the API
  location?: string; // Custom field, from deals details component
  dateTime?: string; // Custom field, from deals details component
}

// Deal data from deals details component
export interface DealData {
  key: string;
  productName: string;
  location: string;
  dateTime: string;
  price: number;
  amount: number;
  status: OrderStatus;
}

// Address interface
export interface Address {
  firstName?: string;
  lastName?: string;
  address: string;
  city: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
}

// Order response from DummyJSON API
export interface OrderResponse {
  orders: Order[]; // Maps from 'carts' in DummyJSON API
  total: number;
  skip: number;
  limit: number;
}

// Order search parameters
export interface OrderSearchParams {
  userId?: number | string; // Filter by user
  limit?: number;
  skip?: number;
  status?: OrderStatus; // Custom filter, not in the API
  startDate?: string; // Custom filter, not in the API
  endDate?: string; // Custom filter, not in the API
  minTotal?: number; // Custom filter, not in the API
  maxTotal?: number; // Custom filter, not in the API
}

// Order creation request
export type CreateOrderRequest = Omit<
  Order,
  "id" | "total" | "totalProducts" | "totalQuantity" | "createdAt" | "updatedAt"
> & {
  products: Array<{
    id: number | string;
    quantity: number;
  }>;
};

// Order update request
export type UpdateOrderRequest = Partial<Omit<Order, "id">>;

// Invoice details structure (based on your Invoice component)
export interface InvoiceDetails {
  id?: string | number;
  invoiceNumber?: string;
  invoiceFrom: {
    name: string;
    address: string;
    email?: string;
    phone?: string;
  };
  invoiceTo: {
    name: string;
    address: string;
    email?: string;
    phone?: string;
  };
  invoiceDate: string;
  dueDate: string;
  items: Array<{
    serialNo: number;
    description: string;
    quantity: number;
    baseCost: number;
    totalCost: number;
    discountPercentage?: number;
  }>;
  subtotal?: number;
  tax?: number;
  discount?: number;
  total?: number;
  notes?: string;
  terms?: string;
  status?: "paid" | "pending" | "overdue";
  paymentMethod?: PaymentMethod;
}

// Function to convert Order to InvoiceDetails (will be in adapters.ts)
// export const mapOrderToInvoice = (order: Order, userDetails: any): InvoiceDetails => ({
//   id: order.id,
//   invoiceNumber: `INV-${order.id}`,
//   invoiceFrom: {
//     name: 'Your Company',
//     address: 'Company Address',
//     email: 'company@example.com',
//     phone: '+1 (555) 123-4567'
//   },
//   invoiceTo: {
//     name: `${userDetails.firstName} ${userDetails.lastName}`,
//     address: order.shippingAddress?.address || 'Customer Address',
//     email: userDetails.email,
//     phone: order.shippingAddress?.phone || userDetails.phone
//   },
//   invoiceDate: order.createdAt || new Date().toISOString().split('T')[0],
//   dueDate: order.updatedAt || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//   items: order.products.map((item, index) => ({
//     serialNo: index + 1,
//     description: item.title || 'Product',
//     quantity: item.quantity,
//     baseCost: item.price,
//     totalCost: item.total,
//     discountPercentage: item.discountPercentage
//   })),
//   subtotal: order.total,
//   discount: order.total - (order.discountedTotal || order.total),
//   total: order.discountedTotal || order.total,
//   status: order.status === 'delivered' ? 'paid' : order.status === 'cancelled' ? 'overdue' : 'pending',
//   paymentMethod: order.paymentMethod
// });
