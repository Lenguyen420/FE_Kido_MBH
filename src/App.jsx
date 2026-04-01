import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        {/* LOGIN (KHÔNG CÓ HEADER) */}
        <Route path="/login" element={<Login />} />

        {/* CÁC TRANG CÓ HEADER */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </>
  );
};

export default App;