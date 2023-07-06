import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    authToken: null,
  },
  reducers: {
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
    logout(state) {
      state.authToken = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { setAuthToken, logout } = authSlice.actions;
export default authSlice.reducer;
