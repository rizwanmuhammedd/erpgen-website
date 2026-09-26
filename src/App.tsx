import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { AppShell } from './components/layout/AppShell';
import { SEO } from './components/seo/SEO';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { InvoiceProductPage } from './pages/InvoiceProductPage';
import { PosProductPage } from './pages/PosProductPage';
import { RestaurantPosPage } from './pages/pos/RestaurantPosPage';
import { BarbershopPosPage } from './pages/pos/BarbershopPosPage';
import { SupermarketPosPage } from './pages/pos/SupermarketPosPage';
import { LaundryPosPage } from './pages/pos/LaundryPosPage';
import { ServicesPage } from './pages/ServicesPage';
import { AiSoftwareDevPage } from './pages/services/AiSoftwareDevPage';
import { WebAppDevPage } from './pages/services/WebAppDevPage';
import { IpTelephonyVoipPage } from './pages/services/IpTelephonyVoipPage';
import { CybersecurityPage } from './pages/services/CybersecurityPage';
import { EnterpriseEmailPage } from './pages/services/EnterpriseEmailPage';
import { ManagedItSupportPage } from './pages/services/ManagedItSupportPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { AdminContactEnquiriesPage } from './pages/admin/AdminContactEnquiriesPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminSuppliersPage } from './pages/admin/AdminSuppliersPage';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute';
import { NotFoundPage } from './pages/NotFoundPage';
import { Footer } from './components/navigation/Footer';

export function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
        <SEO />
        <AppShell>
          <Routes>
            {/* Main Home Route */}
            <Route path="/" element={<HomePage />} />

            {/* Products Routes */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/invoice" element={<InvoiceProductPage />} />
            <Route path="/products/pos" element={<PosProductPage />} />
            <Route path="/products/pos/restaurant" element={<RestaurantPosPage />} />
            <Route path="/products/pos/barbershop" element={<BarbershopPosPage />} />
            <Route path="/products/pos/supermarket" element={<SupermarketPosPage />} />
            <Route path="/products/pos/laundry" element={<LaundryPosPage />} />

            {/* Services Routes */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/ai-software-development" element={<AiSoftwareDevPage />} />
            <Route path="/services/web-app-development" element={<WebAppDevPage />} />
            <Route path="/services/ip-telephony-voip" element={<IpTelephonyVoipPage />} />
            <Route path="/services/cybersecurity" element={<CybersecurityPage />} />
            <Route path="/services/enterprise-email" element={<EnterpriseEmailPage />} />
            <Route path="/services/managed-it-support" element={<ManagedItSupportPage />} />

            {/* Company & Contact Routes */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Authentication & Admin Portal Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<Navigate to="/admin/contact-enquiries" replace />} />
            <Route
              path="/admin/contact-enquiries"
              element={
                <AdminProtectedRoute>
                  <AdminContactEnquiriesPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminProtectedRoute>
                  <AdminProductsPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/inventory"
              element={
                <AdminProtectedRoute>
                  <AdminInventoryPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/customers"
              element={
                <AdminProtectedRoute>
                  <AdminCustomersPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/suppliers"
              element={
                <AdminProtectedRoute>
                  <AdminSuppliersPage />
                </AdminProtectedRoute>
              }
            />

            {/* 404 Dedicated Route and Fallback */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </AppShell>
      </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
