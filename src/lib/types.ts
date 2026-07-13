export interface Product {
  id: number;
  title: string;
  author: string;
  publisher: string;
  genre: string;
  price: number;
  coverImage: string;
  spineColor: string;
  description: string;
  stock: number;
  rating: number;
  volume?: string;
  format?: string;
  tags?: string[];
}

export interface CartItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  coverImage: string;
  spineColor: string;
}

export interface Coupon {
  code: string;
  discount: number;
  description: string;
}

export interface CartState {
  items: CartItem[];
  discount: number;
  couponCode: string | null;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: () => number;
  discountAmount: () => number;
  total: () => number;
  itemCount: () => number;
}

export interface CheckoutFormData {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  email?: string;
  notes?: string;
}

export interface ThemeState {
  isDark: boolean;
  toggle: () => void;
}
