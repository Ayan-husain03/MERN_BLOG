import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
  loading: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    removeUser(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
