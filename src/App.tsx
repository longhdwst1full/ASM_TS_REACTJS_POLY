import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutUser from "./components/LayoutUser";
import Dashboard from "./pages/Admin/Dashboard";
import Addcate from "./pages/Admin/category/AddCate";
import ListCate from "./pages/Admin/category/ListCate";
import Addproduct from "./pages/Admin/products/Addproduct";
import ListProduct from "./pages/Admin/products/ListProduct";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import LayoutCart from "./pages/cart/LayoutCart";
import MainLayout from "./pages/Admin/layouts/MainLayout";
import DetailProduct from "./pages/Product/DetailProduct";
import ProductList from "./pages/Product/ProductList";
import Home from "./pages/User/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutUser />}>
          <Route path="" element={<Home />} />
          <Route path="category" element={<DetailProduct />} />
          <Route path="product" element={<ProductList />} />
          <Route path=":id/product" element={<DetailProduct />} />
        </Route>
        <Route path="/cart" element={<LayoutCart />}>
          {/* <Route path="" element={<Home />} /> */}
        </Route>

        <Route path="/admin" element={<MainLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="products" element={<ListProduct />} />
          <Route path="product/add" element={<Addproduct />} />
          <Route path="product/:id/edit" element={<Addproduct />} />
          {/* cate */}
          <Route path="category" element={<ListCate />} />
          <Route path="category/:id/edit" element={<Addcate />} />
          <Route path="category/add" element={<Addcate />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
