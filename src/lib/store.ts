import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, ThemeState, CartState } from "./types";

const COUPONS: Record<string, { discount: number; description: string }> = {
  LOTUS10: { discount: 10, description: "10% de descuento" },
  MANGA20: { discount: 20, description: "20% de descuento" },
  BIENVENIDO: { discount: 15, description: "15% de descuento para nuevos" },
};

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: true,
  toggle: () => set((state) => ({ isDark: !state.isDark })),
}));

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      discount: 0,
      couponCode: null,

      addItem: (product: Product) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.productId === product.id
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                coverImage: product.coverImage,
                spineColor: product.spineColor,
              },
            ],
          };
        }),

      removeItem: (productId: number) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      updateQuantity: (productId: number, quantity: number) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => item.productId !== productId
              ),
            };
          }
          return {
            items: state.items.map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            ),
          };
        }),

      clearCart: () => set({ items: [], discount: 0, couponCode: null }),

      applyCoupon: (code: string) => {
        const normalized = code.toUpperCase().trim();
        const coupon = COUPONS[normalized];

        if (!coupon) {
          return { success: false, message: "Codigo de cupon invalido" };
        }

        if (get().couponCode === normalized) {
          return { success: false, message: "Este cupon ya esta aplicado" };
        }

        set({ discount: coupon.discount, couponCode: normalized });
        return {
          success: true,
          message: `Cupon aplicado: ${coupon.description}`,
        };
      },

      removeCoupon: () => set({ discount: 0, couponCode: null }),

      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      discountAmount: () => {
        const subtotal = get().subtotal();
        return subtotal * (get().discount / 100);
      },

      total: () => get().subtotal() - get().discountAmount(),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "lotus-cart",
      partialize: (state) => ({
        items: state.items,
        discount: state.discount,
        couponCode: state.couponCode,
      }),
    }
  )
);
