import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '', 
  password: '',
};

const adminRegisterSlice = createSlice({
  name: 'adminRegister',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setUsername, setPassword } = adminRegisterSlice.actions;
export const selectUsername = (state) => state.adminRegister.username;
export const selectPassword = (state) => state.adminRegister.password;
export default adminRegisterSlice.reducer;
