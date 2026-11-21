import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { QuickSolutionLogo } from '../../components/common/QuickSolutionLogo';
import { toast } from 'sonner';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('rohit.customer@gmail.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email and password.');
      return;
    }
    setError('');
    login(email, password);
    toast.success('Signed in successfully');
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="max-w-md mx-auto py-6 sm:py-10">
      <div className="bg-white border border-[#E8EAED] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2 text-center">
          <QuickSolutionLogo variant="stacked" theme="light" showTagline size="md" />
          <h1 className="text-2xl font-bold text-[#172B4D] pt-2">
            {redirectTo.startsWith('/payment/') ? 'Sign in to pay' : 'Welcome back'}
          </h1>
          <p className="text-sm text-[#475467]">
            {redirectTo.startsWith('/payment/')
              ? 'Sign in or create an account to choose Cash, Card, or UPI payment'
              : 'Sign in to schedule services and track your bookings'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-[#D94B4B]/10 border border-[#D94B4B]/30 text-xs sm:text-sm text-[#D94B4B]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-[#202936] mb-1.5">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-12 px-4 bg-white border border-[#E8EAED] rounded-xl text-sm text-[#202936] outline-none focus:border-[#142D4E] focus:ring-2 focus:ring-[#142D4E]/15"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="login-password" className="text-sm font-medium text-[#202936]">
                Password
              </label>
              <button
                type="button"
                onClick={() => toast.info('Password reset will be enabled once Supabase Auth is connected.')}
                className="text-xs font-semibold text-[#142D4E] hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full h-12 px-4 bg-white border border-[#E8EAED] rounded-xl text-sm text-[#202936] outline-none focus:border-[#142D4E] focus:ring-2 focus:ring-[#142D4E]/15"
            />
          </div>

          <button
            type="submit"
            className="w-full qs-btn-primary text-base"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm text-[#737D89] pt-2 border-t border-[#E8EAED]">
          Don&apos;t have an account?{' '}
          <Link
            to={`/register${redirectTo !== '/' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
            className="font-semibold text-[#142D4E] hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};
