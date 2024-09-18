import { createSlice } from "@reduxjs/toolkit";

const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState: {
    username: "",
    password: ""
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    }
  }
});

export const { setUsername, setPassword } = adminLoginSlice.actions;
export const selectUsername = (state) => state.adminLogin.username;
export const selectPassword = (state) => state.adminLogin.password;
export default adminLoginSlice.reducer;
