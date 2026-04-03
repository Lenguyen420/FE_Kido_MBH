import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/layout/Header";
import Home from "./pages/Order";
import Login from "./pages/Login";
import Products from "./pages/Products";
import PriceBook from "./pages/PriceBook";
import StockTakes from "./pages/StockTakes";
import Welcome from "./pages/Student/Welcome";

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
              {/* <Header /> */}
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/order" element={<Home />} />
                {/* <Route path="/products" element={<Products />} />
                <Route path="/price-book" element={<PriceBook />} />
                <Route path="/stock-takes" element={<StockTakes />} /> */}
              </Routes>
            </>
          }
        />
      </Routes>
    </>
  );
};

export default App;