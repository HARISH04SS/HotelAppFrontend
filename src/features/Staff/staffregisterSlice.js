import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '', 
  email:'',
  password: '',
  phoneNumber:'',
  role:''
};

const staffRegisterSlice = createSlice({
  name: 'staffRegister',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
        state.email = action.payload;
      },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPhoneNumber: (state, action) => {
        state.phoneNumber = action.payload;
    },
    setRole: (state, action) => {
        state.role = action.payload;
    },
  },
});

export const { setName, setEmail,setPassword,setPhoneNumber,setRole } = staffRegisterSlice.actions;
export const selectName = (state) => state.staffRegister.name;
export const selectEmail = (state) => state.staffRegister.email;
export const selectPassword = (state) => state.staffRegister.password;
export const selectPhoneNumber = (state) => state.staffRegister.phoneNumber;
export const selectRole = (state) => state.staffRegister.role;
export default staffRegisterSlice.reducer;
