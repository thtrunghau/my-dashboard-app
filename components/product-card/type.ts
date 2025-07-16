export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string | string[]; // Support for multiple images
  rating: number; // 0-5, can be fractional
  ratingCount?: number;
  isFavorite?: boolean;
  onEdit?: (id: string) => void;
  onToggleFavorite?: (id: string, isFavorite: boolean) => void;
  editProduct?: (id: string) => void;
  onImageChange?: (imageIndex: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface ProductRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
  style?: React.CSSProperties;
}
