import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

import { toast } from "react-toastify";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  cartQuantity: number;
  discount?: number;
  image?: string;
};

export interface CartState {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

const initialState: CartState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") as string)
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // Check if the product with the same ID already exists in the cart
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex >= 0) {
        // Product exists, increase the quantity
        state.cartItems[existingIndex].cartQuantity += 1;
        toast.info("Increased product quantity", { position: "bottom-left" });
      } else {
        // Product does not exist, add it as a new item
        const tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", { position: "bottom-left" });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0 && state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info("Decreased product quantity", { position: "bottom-left" });
      } else if (
        itemIndex >= 0 &&
        state.cartItems[itemIndex].cartQuantity === 1
      ) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        toast.error("Product removed from cart", { position: "bottom-left" });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      toast.error("Product removed from cart", { position: "bottom-left" });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    getTotals: (state) => {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const discountedPrice = Math.round(
            cartItem.price - (cartItem.price * (cartItem.discount || 0)) / 100
          );
          const itemTotal = discountedPrice * cartItem.cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartItem.cartQuantity;
          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state: RootState) =>
  state.cart.cartTotalAmount;
