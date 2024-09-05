import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface CartItem {
  _id: string;
  domain: string;
  availability: boolean;
  userQuantity: number;
  [key: string]: any;
}
export interface UserState {
  cartItems: CartItem[];
  userTotalQuantity: number;
}

const initialState: UserState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  userTotalQuantity: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newUser = action.payload;

      // Check if the user can be added
      const existingIndex = state.cartItems.findIndex(
        (item) =>
          item.domain === newUser.domain &&
          item.availability === newUser.availability
      );

      if (existingIndex >= 0) {
        toast.info("User with this domain is already added", {
          position: "bottom-left",
        });
      } else if (!newUser.availability) {
        toast.info("User is not available", { position: "bottom-left" });
      } else {
        state.cartItems.push({ ...newUser, userQuantity: 1 });
        toast.success("User added", { position: "bottom-left" });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action: PayloadAction<{ _id: string }>) => {
      const nextCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("User removed", { position: "bottom-left" });
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = userSlice.actions;
export default userSlice.reducer;
