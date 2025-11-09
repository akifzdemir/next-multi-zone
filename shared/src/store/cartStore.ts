import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartStore {
  items: CartItem[];
  addToCart: (
    product: CartProduct,
    quantity?: number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  removeFromCart: (
    productId: number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  updateQuantity: (
    productId: number,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1, selectedColor, selectedSize) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor === selectedColor &&
              item.selectedSize === selectedSize
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              { product, quantity, selectedColor, selectedSize },
            ],
          };
        });
      },

      removeFromCart: (productId, selectedColor, selectedSize) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize
              )
          ),
        }));
      },

      updateQuantity: (productId, quantity, selectedColor, selectedSize) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, selectedColor, selectedSize);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
