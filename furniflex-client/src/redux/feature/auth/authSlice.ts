import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Define the user type
export type TUser = {
  email: string;
  profilePhoto: string;
  role: string;
 
};

// Define the authentication state type
type TAuthState = {
  user: TUser | null; // Allow user to be null
  token: string | null;
};

// Initial state
const initialState: TAuthState = {
  user: null,
  token: null,
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: TUser | null; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions and reducer
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

// Selector functions
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
