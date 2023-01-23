import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice(
  {
    name: "auth",
    initialState: { userId: 1, isLogin: false },
    reducers: {},
  },
);

export default authSlice.reducer;
