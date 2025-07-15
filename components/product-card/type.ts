export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number; // 0-5, can be fractional
  ratingCount?: number;
  isFavorite?: boolean;
  onEdit?: (id: string) => void;
  onToggleFavorite?: (id: string, isFavorite: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface ProductRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
  style?: React.CSSProperties;
}
