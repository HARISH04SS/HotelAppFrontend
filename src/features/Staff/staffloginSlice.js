import { createSlice } from "@reduxjs/toolkit";

const staffLoginSlice = createSlice({
  name: "staffLogin",
  initialState: {
    email: "",
    password: ""
  },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    }
  }
});

export const { setEmail, setPassword } = staffLoginSlice.actions;
export const selectEmail = (state) => state.staffLogin.email;
export const selectPassword = (state) => state.staffLogin.password;
export default staffLoginSlice.reducer;
