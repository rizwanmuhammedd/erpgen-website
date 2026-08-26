import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { NotFoundPage } from './pages/NotFoundPage';
import { Footer } from './components/navigation/Footer';

export function App() {
  return (
    <Router>
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

          {/* 404 Dedicated Route and Fallback */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </AppShell>
    </Router>
  );
}

export default App;
