import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Cart from "./cart";
import Layout from "./components/landing/landing";
import Product from "./product";
import Products from "./products";

function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />} />
      <Route
        path="cart"
        element={
          <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
            <Cart />
          </Suspense>
        }
      />
      <Route
        path="products"
        element={
          <Suspense fallback={<div>Идёт загрузка...</div>}>
            <Products />
          </Suspense>
        }
      />
      <Route
        path="products/:id"
        element={
          <Suspense fallback={<div>Идёт загрузка...</div>}>
            <Product />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<div>Идёт загрузка...</div>}>
            <div>test</div>
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
