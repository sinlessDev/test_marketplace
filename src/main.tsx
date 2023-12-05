import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./products.tsx";
import Product from "./product.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/store" element={<Products />}></Route>
      <Route path="/store/:id" element={<Product />} />
    </Routes>
  </BrowserRouter>
);
