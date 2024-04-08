import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutUser from "./components/LayoutUser";
import LayputAdmin from "./pages/Admin/LayputAdmin";
import ProductAdd from "./pages/Admin/Products/ProductAdd";
import ProductsAdmin from "./pages/Admin/Products/ProductsAdmin";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DetailProduct from "./pages/User/DetailProduct";
import Home from "./pages/User/Home";
import LayoutCart from "./pages/cart/LayoutCart";

function App() {
  return (
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
  );
}

export default App;
