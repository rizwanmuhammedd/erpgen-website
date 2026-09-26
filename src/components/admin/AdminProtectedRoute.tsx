import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, Loader2, ArrowLeft } from 'lucide-react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#6D57A5] animate-spin" />
        <p className="text-xs font-mono text-[#625D6B] uppercase tracking-wider">
          Verifying administrative authorization...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <Container size="md" className="py-20">
        <Card variant="brand-border" className="p-8 text-center space-y-5 bg-white border border-[#E9E4F1] shadow-sm max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-rose-600 uppercase tracking-wider font-bold">
              HTTP 403 — Forbidden
            </span>
            <h2 className="text-2xl font-bold text-[#1F1B2D] font-heading">
              Administrator Privileges Required
            </h2>
            <p className="text-xs text-[#625D6B] leading-relaxed max-w-md mx-auto">
              You are signed in as <span className="font-semibold text-[#1F1B2D]">{user?.email}</span> ({user?.roles?.join(', ')}), but this area requires an authorized <strong>Admin</strong> account.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <Link to="/">
              <Button variant="outline" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
                Return to Home
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="primary" size="sm">
                Sign In as Admin
              </Button>
            </Link>
          </div>
        </Card>
      </Container>
    );
  }

  return <>{children}</>;
};
