import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/User/Home";
import LayoutUser from "./components/LayoutUser";
import Login from "./pages/Auth/Login";
import LayputAdmin from "./pages/Admin/LayputAdmin";
import ProductsAdmin from "./pages/Admin/Products/ProductsAdmin";
import ProductAdd from "./pages/Admin/Products/ProductAdd";
import DetailProduct from "./pages/User/DetailProduct";
import LayoutCart from "./pages/cart/LayoutCart";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutUser />}>
            <Route path="" element={<Home />} />
            <Route path="product" element={<DetailProduct />} />
            <Route path=":id/product" element={<DetailProduct />} />
          </Route>
          <Route path="/cart" element={<LayoutCart />}>
            {/* <Route path="" element={<Home />} /> */}
          </Route>

          <Route path="/admin" element={<LayputAdmin />}>
            <Route path="" element={<ProductsAdmin />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="product-add" element={<ProductAdd />} />
            <Route path=":id/edit" element={<ProductAdd />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/product/:id" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
