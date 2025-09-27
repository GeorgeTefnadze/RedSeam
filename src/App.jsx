import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./contexts/CartContext";
import CartSidebar from "./components/CartSidebar";

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <CartSidebar />

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/page/:pageNumber" element={<ProductsPage />} />

          <Route
            path="/productdetail/:productId"
            element={<ProductDetailPage />}
          />

          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
