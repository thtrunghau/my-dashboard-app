/**
 * Data adapter utilities for transforming API data
 */

import { Product, User, Order } from "../types";

/**
 * Type for raw DummyJSON product response
 */
interface RawProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: string[];
  [key: string]: unknown;
}

/**
 * Adapter for transforming DummyJSON product response to our Product model
 * @param data Raw product data from API
 * @returns Transformed product data
 */
export const productAdapter = (data: RawProductData): Product => {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    price: data.price,
    discountPercentage: data.discountPercentage,
    rating: data.rating,
    stock: data.stock,
    brand: data.brand,
    category: data.category,
    thumbnail: data.thumbnail,
    images: data.images || [],
    // Add any additional transformations or defaults here
  };
};

/**
 * Type for raw DummyJSON user response
 */
interface RawUserData {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  username: string;
  email: string;
  phone?: string;
  birthDate?: string;
  image?: string;
  address?: {
    address?: string;
    city?: string;
    postalCode?: string;
    state?: string;
    coordinates?: {
      lat?: number;
      lng?: number;
    };
  };
  [key: string]: unknown;
}

/**
 * Adapter for transforming DummyJSON user response to our User model
 * @param data Raw user data from API
 * @returns Transformed user data
 */
export const userAdapter = (data: RawUserData): User => {
  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    maidenName: data.maidenName || "",
    username: data.username,
    email: data.email,
    phone: data.phone || "",
    birthDate: data.birthDate || "",
    image: data.image || "",
    address: data.address
      ? {
          address: data.address.address || "",
          city: data.address.city || "",
          postalCode: data.address.postalCode || "",
          state: data.address.state || "",
          coordinates: {
            lat: data.address.coordinates?.lat ?? 0,
            lng: data.address.coordinates?.lng ?? 0,
          },
        }
      : {
          address: "",
          city: "",
          postalCode: "",
          state: "",
          coordinates: { lat: 0, lng: 0 },
        },
    // Add any additional transformations or defaults here
  };
};

/**
 * Type for raw DummyJSON product in cart
 */
interface RawCartProduct {
  id: number;
  title?: string;
  price?: number;
  quantity?: number;
  total?: number;
  discountPercentage?: number;
  discountedPrice?: number;
  [key: string]: unknown;
}

/**
 * Type for raw DummyJSON cart response
 */
interface RawCartData {
  id: number;
  userId: number;
  products?: RawCartProduct[];
  total?: number;
  discountedTotal?: number;
  totalProducts?: number;
  totalQuantity?: number;
  [key: string]: unknown;
}

/**
 * Adapter for transforming DummyJSON cart response to our Order model
 * @param data Raw cart data from API
 * @returns Transformed order data
 */
export const orderAdapter = (data: RawCartData): Order => {
  return {
    id: data.id,
    userId: data.userId,
    products: Array.isArray(data.products)
      ? data.products.map((product: RawCartProduct) => ({
          id: product.id,
          productId: product.id, // Same as id for DummyJSON API
          title: product.title || "",
          price: product.price || 0,
          quantity: product.quantity || 1,
          total:
            product.total || (product.price || 0) * (product.quantity || 1),
          discountPercentage: product.discountPercentage || 0,
          discountedPrice: product.discountedPrice || product.price,
        }))
      : [],
    total: data.total || 0,
    discountedTotal: data.discountedTotal || 0,
    totalProducts: data.totalProducts || 0,
    totalQuantity: data.totalQuantity || 0,
    // Add any additional transformations or defaults here
  };
};

/**
 * Type for raw paginated response
 */
interface RawPaginatedData {
  total?: number;
  limit?: number;
  skip?: number;
  products?: unknown[];
  users?: unknown[];
  orders?: unknown[]; // Previously carts in DummyJSON API
  [key: string]: unknown;
}

/**
 * Parse pagination data from DummyJSON responses
 * @param data Raw paginated response data
 * @returns Structured pagination data
 */
export const paginationAdapter = (data: RawPaginatedData) => {
  const items = data.products || data.users || data.orders;

  return {
    total: data.total || 0,
    limit: data.limit || 0,
    skip: data.skip || 0,
    count: Array.isArray(items) ? items.length : 0,
  };
};
