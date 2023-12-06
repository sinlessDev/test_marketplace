import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "./pages/cart";
import Landing from "./pages/landing";
import Product from "./pages/product";
import Products from "./pages/products";
import Signin from "./pages/signin";
import SignUp from "./pages/signup";
import PrivateRoutes from "./lib/privateRoutes";
import { AuthProvider } from "./lib/authContext";
import Profile from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="products" element={<Products />} />

          {/* Private routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="profile" element={<Profile />} />
            <Route path="products/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
          </Route>

          {/* Not Found page */}
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
