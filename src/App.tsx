import { Route, Routes } from "react-router-dom";

import Cart from "./pages/cart";
import Layout from "./components/landing/landing";
import Product from "./pages/product";
import Products from "./pages/products";

function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />} />
      <Route path="cart" element={<Cart />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<Product />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
