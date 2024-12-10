import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import SignUp from './page/SignUp';
import Profile from './page/Profile';
import UploadPromotion from './admin/UploadPromotion';
import Index from './page/Index';
import Admindashboard from './admin/Admindashboard';
import CompanyList from './page/CompanyList';
import CompanyDetails from './page/CompanyDetails';
import AdminCompanyCRUD from './admin/AdmincompanyCRUD';
import UserList from './admin/UserList';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/UploadPromotion" element={<UploadPromotion />} />
        <Route path="/" element={<Index/>} />
        <Route path="/Admindashboard" element={<Admindashboard/>} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:id" element={<CompanyDetails />} />
        <Route path="/AdminCompanyCRUD" element={<AdminCompanyCRUD />} />
        <Route path="/UserList" element={<UserList/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);