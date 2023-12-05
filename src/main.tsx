import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Store from "./store.tsx";
import Product from "./product.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/store" element={<Store />}></Route>
      <Route path="/store/:id" element={<Product />} />
    </Routes>
  </BrowserRouter>
);
