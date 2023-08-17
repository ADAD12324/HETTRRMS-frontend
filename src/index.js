import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Packages from './pages/Packages';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Usermain from './userpage/Usermain';
import Adminmain from './adminpage/Adminmain';
import Register from './pages/Register';
import App from './App';
import Sms from './pages/Sms';
import Users from './adminpage/Users'; 
import Addpack from './adminpage/Addpack';
import PackageDetails from './adminpage/PackageDetails';
import Local from './userpage/Local';
import PackageList from './adminpage/PackageList';
import Book from './userpage/Book';
import AdminNotification from './adminpage/AdminNotification';
import AcceptDecline from './adminpage/AcceptDecline';
import Reservation from './adminpage/Reservation';
import National from './userpage/National';
import International from './userpage/International';
import Booking from './userpage/Booking';
import Proof from './userpage/Proof';
import Scheduling from './adminpage/Scheduling';
import UserReservation from './userpage/UserReservation';
import AdminProfile from './adminpage/AdminProfile';
import UserProfile from './userpage/UserProfile';
import CustomerProof from './adminpage/CustomerProof';
import ForgotPassword from './pages/ForgotPassword';
import ClientsRecord from './adminpage/ClientsRecord';
import BusinessPartnerRecord from './adminpage/BusinessPartnerRecord';
import BackupandRestore from './adminpage/BackupandRestore';
import PackageDetails1 from './adminpage/PackageDetails1';


const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
  },
  {
    path:"/About",
    element:<About />,
  },
  {
    path:"/Packages",
    element:<Packages />,
  },
  {
    path:"/ContactUs",
    element:<ContactUs />,
  },
  {
    path:"/Login",
    element:<Login />,
  },
  {
    path:"/forgot-password",
    element:<ForgotPassword />,
  },
  {
    path:"/Register",
    element:<Register />,
  },
  //user
  {
    path:"/User",
    element:<Usermain />,
  },
  {
    path:"/MyReservation",
    element:<UserReservation />,
  },
  {
    path:"/UserProfile",
    element:<UserProfile />,
  },
//admin
{
  path:"/Admin",
  element:<Adminmain />,
},
{
  path:"/Showuser",
  element:<Users />,
},
{
  path:"/AddPackages",
  element:<Addpack />,
},
{
  path:"/packages/:id",
  element:<PackageDetails />,
},
{
  path:"/national/:id",
  element:<PackageDetails />,
},
{
  path:"/international/:id",
  element:<PackageDetails />, 
},
{
  path:"/packages_mainpage/:id",
  element:<PackageDetails1/>,
},
{
  path:"/national_mainpage/:id",
  element:<PackageDetails1/>,
},
{
  path:"/international_mainpage/:id",
  element:<PackageDetails1/>,
},
{
  path:"/Local",
  element:<Local />,
},
{
  path:"/National",
  element:<National/>,
},
{
  path:"/International",
  element:<International/>,
},
{
  path:"/PackageList",
  element:<PackageList />,
},
{
  path:"/AdminProfile",
  element:<AdminProfile />,
},
{
  path:"/CustomersPayment",
  element:<CustomerProof />,
},
//booking
{
  path:"/Book",
  element:<Book/>,
},
//Admin Notifications
{
  path:"/AdminNotification",
  element:<AdminNotification/>,
},
//AcceptDecline
{
  path:"/AcceptDecline",
  element:<AcceptDecline/>,
},
//for reservation
{
  path:"/Reservation",
  element:<Reservation/>,
},
{
  path:"/Booking",
  element:<Booking/>,
},
{
  path:"/ProofofPayment",
  element:<Proof/>,
},
{
  path:"/TravelandTourSchedule",
  element:<Scheduling/>,
},
//sms
{
  path:"/Sms",
  element:<Sms/>,
},
{
  path:"/ClientsRecord",
  element:<ClientsRecord/>,
},
{
  path:"/BusinessPartnerRecord",
  element:<BusinessPartnerRecord/>,
},
{
  path:"/Backup&Restore",
  element:<BackupandRestore/>,
},



]);

const root = ReactDOM.createRoot(document.getElementById('root'));
function AppWithNavigation() {
  const navigate = useNavigate();
  return <App navigate={navigate} />;
}
root.render(

  <RouterProvider router={router}>
  <AppWithNavigation />
</RouterProvider>
 
);


