import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import SignUp from './page/SignUp';
import Profile from './page/Profile'
import UploadPromotion from './admin/UploadPromotion';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Profile />} />
        <Route path="/UploadPromotion" element={<UploadPromotion />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);