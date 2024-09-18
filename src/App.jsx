import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeNav from './wrappers/HomeNav';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';
import UserDashboardNav from './wrappers/UserDashboardNav';
import Logout from './components/Logout';
import AdminRegister from './components/Admin/AdminRegister';
import AdminLogin from './components/Admin/AdminLogin';
import AdminNav from './wrappers/AdminNav';
import AdminDashboard from './wrappers/AdminDashboard';
import StaffNav from './wrappers/StaffNav';
import StaffLogin from './components/Staff/StaffLogin';
import StaffRegister from './components/Staff/StaffRegister'
import StaffDashboard from './wrappers/StaffDashboard';

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomeNav />,
    children:[
      {
        path:"",
        element:<Home />
      },
      {
        path:"register",
        element:<Register />
      },
      {
        path:"login",
        element:<Login />
      }
    ]
  },
  {
    path:"dashboard",
    element:<UserDashboardNav />
  },
  {
    path:"logout",
    element:<Logout />
  },
  {
    path: "admin",
    element: <AdminNav />,
    children: [
      {
        path: "login",
        element: <AdminLogin />
      },
      {
        path: "register",
        element: <AdminRegister />
      },
      {
        path:"adminDashboard",
        element:<AdminDashboard />
      }
    ]
  },
  {
    path: "staff",
    element: <StaffNav />,
    children: [
      {
        path: "login",
        element: <StaffLogin />
      },
      {
        path: "register",
        element: <StaffRegister />
      },
      {
        path:"staffDashboard/:staffId",
        element:<StaffDashboard />
      }
    ]
  }
]);
const App = () => {
  return <RouterProvider router={router}/>;
};

export default App;