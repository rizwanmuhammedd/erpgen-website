import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertCircle, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Determine redirect target
  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || (isAdmin ? '/admin/contact-enquiries' : '/');

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await login(email.trim(), password);
      // navigation handled by useEffect
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Invalid login credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrefill = (prefillEmail: string, prefillPass: string) => {
    setEmail(prefillEmail);
    setPassword(prefillPass);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12">
      <Container size="sm">
        <Card variant="brand-border" className="p-8 sm:p-10 space-y-6 bg-white border border-[#E9E4F1] shadow-lg rounded-2xl">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#6D57A5] font-bold block">
              ERPGen Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F1B2D] font-heading">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-[#625D6B] max-w-xs mx-auto">
              Enter your credentials to access your business operations and management portal.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="login-email" className="text-xs font-semibold text-[#1F1B2D] block">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="admin@erpgen.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#1F1B2D] text-xs placeholder:text-[#625D6B]/50 focus:bg-white focus-ring-purple disabled:opacity-60"
                />
                <Mail className="w-4 h-4 text-[#625D6B]/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="login-password" className="text-xs font-semibold text-[#1F1B2D] block">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#1F1B2D] text-xs placeholder:text-[#625D6B]/50 focus:bg-white focus-ring-purple disabled:opacity-60"
                />
                <Lock className="w-4 h-4 text-[#625D6B]/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              className="w-full shadow-md shadow-[#6D57A5]/20 justify-center"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>

          {/* Quick Demo Fill helper */}
          <div className="pt-4 border-t border-[#E9E4F1] space-y-2">
            <span className="text-[10px] font-mono text-[#625D6B] uppercase tracking-wider block text-center">
              Quick Sign-In Credentials
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handlePrefill('admin@erpgen.com', 'Admin@123456')}
                className="p-2 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] hover:border-[#6D57A5]/50 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-[#6D57A5]" />
                  <span className="text-[11px] font-bold text-[#1F1B2D] group-hover:text-[#6D57A5]">Admin</span>
                </div>
                <span className="text-[9px] font-mono text-[#625D6B] truncate block">admin@erpgen.com</span>
              </button>

              <button
                type="button"
                onClick={() => handlePrefill('testflow_user@erpgen.com', 'SecurePassword123!')}
                className="p-2 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] hover:border-[#17B681]/50 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#17B681]" />
                  <span className="text-[11px] font-bold text-[#1F1B2D] group-hover:text-[#17B681]">Regular User</span>
                </div>
                <span className="text-[9px] font-mono text-[#625D6B] truncate block">testflow_user@...</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-[#6D57A5] hover:underline">
              ← Return to ERPGen Homepage
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};
