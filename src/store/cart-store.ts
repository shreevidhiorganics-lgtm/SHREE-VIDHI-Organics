import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, CartItem, Coupon } from "@/types";

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  addItem: (product: Product, variantId?: string, quantity?: number) => { success: boolean; message: string };
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (coupon: Coupon) => { success: boolean; message: string };
  removeCoupon: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getShippingFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (product: Product, variantId?: string, quantity = 1) => {
        const { items } = get();
        
        // Find variant if selected
        const selectedVariant = variantId
          ? product.variants.find((v) => v.id === variantId)
          : product.variants[0];

        const availableStock = selectedVariant ? selectedVariant.stock : product.stock;
        const price = selectedVariant ? selectedVariant.price : product.salePrice;
        const variantTitle = selectedVariant ? selectedVariant.title : undefined;

        // Unique cart item identifier by product and variant
        const existingIndex = items.findIndex(
          (item) => item.productId === product.id && item.variantId === variantId
        );

        if (existingIndex > -1) {
          const currentQty = items[existingIndex].quantity;
          if (currentQty + quantity > availableStock) {
            return {
              success: false,
              message: `Only ${availableStock} units available in stock.`,
            };
          }
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += quantity;
          set({ items: updatedItems });
          return { success: true, message: `Updated ${product.name} quantity in cart.` };
        } else {
          if (quantity > availableStock) {
            return {
              success: false,
              message: `Only ${availableStock} units available in stock.`,
            };
          }
          const newItem: CartItem = {
            id: `${product.id}-${variantId || "default"}-${Date.now()}`,
            productId: product.id,
            product,
            variantId,
            variantTitle,
            price,
            quantity,
          };
          set({ items: [...items, newItem] });
          return { success: true, message: `Added ${product.name} to your cart.` };
        }
      },

      updateQuantity: (itemId: string, quantity: number) => {
        const { items } = get();
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const targetItem = items.find((i) => i.id === itemId);
        if (targetItem) {
          const variant = targetItem.variantId
            ? targetItem.product.variants.find((v) => v.id === targetItem.variantId)
            : null;
          const maxStock = variant ? variant.stock : targetItem.product.stock;

          if (quantity > maxStock) {
            return;
          }
        }

        set({
          items: items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      removeItem: (itemId: string) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },

      clearCart: () => {
        set({ items: [], coupon: null });
      },

      applyCoupon: (coupon: Coupon) => {
        const subtotal = get().getSubtotal();
        if (subtotal < coupon.minCartValue) {
          return {
            success: false,
            message: `Minimum order value for coupon ${coupon.code} is ₹${coupon.minCartValue}.`,
          };
        }
        set({ coupon });
        return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
      },

      removeCoupon: () => {
        set({ coupon: null });
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getDiscount: () => {
        const { coupon } = get();
        if (!coupon) return 0;
        const subtotal = get().getSubtotal();
        if (subtotal < coupon.minCartValue) return 0;

        if (coupon.discountType === "PERCENTAGE") {
          const discount = (subtotal * coupon.discountValue) / 100;
          return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount;
        } else {
          return Math.min(coupon.discountValue, subtotal);
        }
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= 499 ? 0 : 49;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const discount = get().getDiscount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "shree_vidhi_cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, coupon: state.coupon }),
    }
  )
);
