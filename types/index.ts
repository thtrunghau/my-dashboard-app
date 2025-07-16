
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  rating: number; // 0-5 stars
  reviewCount?: number;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onFavoriteToggle?: (productId: string, isFavorite: boolean) => void;
  onImageChange?: (imageIndex: number) => void;
  isFavorite?: boolean;
  showNavigation?: boolean;
  className?: string;
  style?: React.CSSProperties;
}