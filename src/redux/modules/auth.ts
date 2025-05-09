import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  email: string;
  userId: string;
  role: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: "",
  userId: "",
  role: "",
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
    setUserId(state, action: PayloadAction<string>) { // 추가
      state.userId = action.payload;
    },
    setRole(state, action: PayloadAction<string>) { // 추가
      state.role = action.payload;
    },
  },
});

export const { setIsAuthenticated, setUserEmail, setUserId, setRole } = auth.actions;
export default auth.reducer;