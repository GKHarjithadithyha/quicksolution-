import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { QuickSolutionLogo } from '../../components/common/QuickSolutionLogo';
import { toast } from 'sonner';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || phone.trim().length < 10) {
      setError('Please complete your name, email, and a valid phone number.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!acceptedTerms) {
      setError('Please accept the Terms and Conditions to continue.');
      return;
    }

    setError('');
    register({ fullName, email, phone });
    toast.success('Account created successfully');
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="max-w-md mx-auto py-4 sm:py-8">
      <div className="bg-white border border-[#E8EAED] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2 text-center">
          <QuickSolutionLogo variant="stacked" theme="light" showTagline size="md" />
          <h1 className="text-2xl font-bold text-[#172B4D] pt-2">Create your account</h1>
          <p className="text-sm text-[#475467]">
            Book trusted home services and track appointments easily
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-[#D94B4B]/10 border border-[#D94B4B]/30 text-xs sm:text-sm text-[#D94B4B]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reg-name" className="block text-sm font-medium text-[#202936] mb-1.5">
              Full name
            </label>
            <input
              id="reg-name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Rohit Gupta"
              className="w-full h-12 px-4 bg-white border border-[#E8EAED] rounded-xl text-sm text-[#202936] outline-none focus:border-[#142D4E]"
            />
          </div>

          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium text-[#202936] mb-1.5">
              Email address
            </label>
            <input
              id="reg-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-12 px-4 bg-white border border-[#E8EAED] rounded-xl text-sm text-[#202936] outline-none focus:border-[#142D4E]"
            />
          </div>

          <div>
            <label htmlFor="reg-phone" className="block text-sm font-medium text-[#202936] mb-1.5">
              Phone number
            </label>
            <input
              id="reg-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full h-12 px-4 bg-white border border-[#E8EAED] rounded-xl text-sm text-[#202936] outline-none focus:border-[#142D4E]"
            />
          </div>

          <div>
            <label htmlFor="reg-password" className="block text-sm font-medium text-[#202936] mb-1.5">
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full h-12 px-4 bg-white border border-[#E8EAED] rounded-xl text-sm text-[#202936] outline-none focus:border-[#142D4E]"
            />
          </div>

          <div>
            <label htmlFor="reg-confirm" className="block text-sm font-medium text-[#202936] mb-1.5">
              Confirm password
            </label>
            <input
              id="reg-confirm"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full h-12 px-4 bg-white border border-[#E8EAED] rounded-xl text-sm text-[#202936] outline-none focus:border-[#142D4E]"
            />
          </div>

          <label className="flex items-start gap-2.5 text-xs sm:text-sm text-[#737D89] cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1 accent-[#142D4E] w-4 h-4 rounded"
            />
            <span>
              I agree to the Terms and Conditions and Privacy Policy.
            </span>
          </label>

          <button
            type="submit"
            className="w-full qs-btn-primary text-base"
          >
            Create Account
          </button>
        </form>

        <div className="text-center text-sm text-[#737D89] pt-2 border-t border-[#E8EAED]">
          Already have an account?{' '}
          <Link
            to={`/login${redirectTo !== '/' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
            className="font-semibold text-[#142D4E] hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
