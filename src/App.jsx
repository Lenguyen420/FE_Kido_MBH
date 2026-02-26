import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";



const App = () => {
  return (
    <>
    <Toaster position="top-right" />
      <Header />
      
      

      <Routes>      
        <Route path="/" element={<div>Trang chủ</div>} />
         
        <Route path="/profile" element={<div>Cá nhân</div>} />   
        <Route path="/profile-user" element={<div>Thông tin cá nhân</div>} />   
        <Route path="/notifications" element={<div>Thông báo</div>} />   
        <Route path="/login" element={<Login />} />
      </Routes>


     
    </>
  );
};

export default App;