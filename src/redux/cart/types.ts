export type CartItem = {
  id: number;
  brand: string;
  category: string;
  count: number;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
