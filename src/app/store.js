import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/Residents/registerSlice";
import loginReducer from "../features/Residents/loginSlice";
import adminLoginReducer from "../features/Admin/adminloginSlice";
import adminRegisterReducer from "../features/Admin/adminregisterSlice"
import staffloginReducer from "../features/Staff/staffloginSlice";
import staffregisterReducer from "../features/Staff/staffregisterSlice";

const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    adminLogin: adminLoginReducer,
    adminRegister: adminRegisterReducer,
    staffLogin:staffloginReducer,
    staffRegister:staffregisterReducer
  },
});

export default store;
