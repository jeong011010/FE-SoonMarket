import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  email: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
  },
});

export const { setIsAuthenticated, setUserEmail } = auth.actions;
export default auth.reducer;