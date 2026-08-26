import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Layers, Server, ArrowRight } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = '404 — Page Not Found | ERPGen';
  }, []);

  return (
    <div className="min-h-screen py-24 sm:py-32 flex items-center justify-center relative overflow-hidden bg-radial-brand-hero">
      <Container size="md" className="space-y-8 text-center relative z-10">
        <div className="space-y-3">
          <Badge variant="brand" size="md">
            404 Error
          </Badge>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-[#1F1B2D] tracking-tight font-heading">
            Page Not <span className="text-gradient-brand">Found</span>
          </h1>
          <p className="text-sm sm:text-base text-[#625D6B] max-w-lg mx-auto leading-relaxed">
            The page you are looking for does not exist or may have been moved. Return to the homepage or explore our core ERP product modules.
          </p>
        </div>

        <Card variant="default" className="p-8 border border-[#E9E4F1] bg-white shadow-sm space-y-6">
          <h2 className="text-base font-bold text-[#1F1B2D] font-heading">
            Popular ERPGen Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link to="/">
              <Button variant="primary" fullWidth size="sm" icon={<Home className="w-4 h-4" />}>
                Home
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="secondary" fullWidth size="sm" icon={<Layers className="w-4 h-4" />}>
                Products
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary" fullWidth size="sm" icon={<Server className="w-4 h-4" />}>
                Services
              </Button>
            </Link>
          </div>
        </Card>

        <div className="pt-2">
          <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs text-[#6D57A5] hover:text-[#584488] font-semibold transition-colors">
            <span>Need assistance? Contact ERPGen support</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </div>
  );
};
