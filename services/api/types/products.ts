/**
 * Product-related type definitions
 * Based on both the existing ProductCard component and DummyJSON API structure
 */

// Product category for categorization
export type ProductCategory =
  | "smartphones"
  | "laptops"
  | "fragrances"
  | "skincare"
  | "groceries"
  | "home-decoration"
  | "furniture"
  | "tops"
  | "womens-dresses"
  | "womens-shoes"
  | "mens-shirts"
  | "mens-shoes"
  | "mens-watches"
  | "womens-watches"
  | "womens-bags"
  | "womens-jewellery"
  | "sunglasses"
  | "automotive"
  | "motorcycle"
  | "lighting"
  | string; // Allow for custom categories

// Product interface aligned with DummyJSON API
export interface Product {
  id: number | string; // Support both number (API) and string (client) formats
  title: string; // Called 'name' in your components
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number; // 0-5, can be fractional as in your components
  stock: number;
  brand: string;
  category: ProductCategory;
  thumbnail: string; // Main product image
  images: string[]; // Multiple product images
  tags?: string[]; // Additional tags for searching/filtering
  isFavorite?: boolean; // Custom field for UI state, not in the API
  ratingCount?: number; // Custom field, not in the API
}

// Product response from DummyJSON API
export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Product request for creating/updating products
export type CreateProductRequest = Omit<Product, "id">;
export type UpdateProductRequest = Partial<Omit<Product, "id">>;

// Product search parameters
export interface ProductSearchParams {
  q?: string; // Search query
  limit?: number;
  skip?: number;
  select?: string; // Comma-separated list of fields to include
  category?: ProductCategory; // Filter by category
  brand?: string; // Filter by brand
  minPrice?: number; // Filter by minimum price
  maxPrice?: number; // Filter by maximum price
  minRating?: number; // Filter by minimum rating
}

// Product filter options for UI
export interface ProductFilterOptions {
  categories: ProductCategory[];
  brands: string[];
  priceRange: {
    min: number;
    max: number;
  };
  ratingRange: {
    min: number;
    max: number;
  };
}

// Convert from API product to UI product
export interface UIProduct {
  id: string;
  name: string; // Maps to title in API
  price: number;
  image: string | string[]; // Maps to thumbnail or images in API
  rating: number;
  ratingCount?: number;
  isFavorite: boolean;
  description?: string;
  brand?: string;
  category?: string;
  stock?: number;
  discount?: number; // Maps to discountPercentage
}

// Featured product from main dashboard
export interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  images: string[];
  description?: string;
  rating?: number;
  discount?: number;
  featured?: boolean;
}

// Product stock interface from product-stock page
export interface ProductStock {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
  totalValue: number;
  category: string;
  reorderLevel: number; // Minimum stock level before reordering
  supplier?: string;
  lastRestocked?: string; // ISO date string
  location?: string; // Warehouse location
  sku?: string; // Stock keeping unit
  barcode?: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}
