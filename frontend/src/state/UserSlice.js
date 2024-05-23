import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
  accessToken: localStorage.getItem("accessToken") || null, // Lưu trữ accessToken
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.current = {};
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setCurrent, setAccessToken, logout } = userSlice.actions;
export default userSlice.reducer;
