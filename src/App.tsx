import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/features/auth/AuthContext";
import ProtectedRoute from "@/features/auth/ProtectedRoute";
import LoginPage from "@/features/auth/LoginPage";
import AppLayout from "@/shared/components/layout/AppLayout";
import ProductListPage from "@/features/catalog/ProductListPage";
import ProductDetailPage from "@/features/catalog/ProductDetailPage";
import OrderListPage from "@/features/orders/OrderListPage";
import CreateOrderPage from "@/features/orders/CreateOrderPage";
import OrderDetailPage from "@/features/orders/OrderDetailPage";

function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="mt-4 text-lg text-gray-500">Page not found</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<ProductListPage />} />
            <Route path="/products/:code" element={<ProductDetailPage />} />
            <Route path="/orders" element={<OrderListPage />} />
            <Route path="/orders/new" element={<CreateOrderPage />} />
            <Route path="/orders/:orderNumber" element={<OrderDetailPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
