import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute";

import { CartProvider } from "./contexts/CartContext";
import CartSidebar from "./components/CartSidebar";
import { Toaster } from "react-hot-toast";

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
          {/* unprotected routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          {/* protected routes */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/page/:pageNumber"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/productdetail/:productId"
            element={
              <ProtectedRoute>
                <ProductDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          {/* default route */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            pointerEvents: "none",
          },
        }}
      />
    </CartProvider>
  );
}

export default App;
