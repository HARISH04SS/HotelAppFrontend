import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
    name:'register',
    initialState:{
        name:"",
        email:"",
        phonenumber:"",
        password:""
    },
    reducers:{
        setName:(state,action) =>{
            state.name = action.payload
        },
        setEmail:(state,action) =>{
            state.email = action.payload
        },
        setPhonenumber:(state,action)=>{
            state.phonenumber = action.payload
        },
        setPassword:(state,action)=>{
            state.password = action.payload
        }
    }
});

export const {setName,setEmail,setPhonenumber,setPassword} = registerSlice.actions;

export const selectName = state => state.register.name;
export const selectEmail = state => state.register.email;
export const selectPhonenumber = state=> state.register.phonenumber;
export const selectPassword = state => state.register.password;

export default registerSlice.reducer; 