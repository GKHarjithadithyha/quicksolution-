import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { EmptyState } from '../../components/customer/StateViews';
import {
  Mail,
  Phone,
  User,
  CalendarCheck,
  LogOut,
  FileText,
  Shield,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

export const CustomerProfilePage: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [infoModal, setInfoModal] = useState<'contact' | 'terms' | 'privacy' | null>(null);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto space-y-4">
        <EmptyState
          title="Sign in to manage your profile"
          description="Access your personal details, booking history, and account preferences."
          actionLabel="Sign In"
          actionTo="/login?redirect=/profile"
        />
        <div className="text-center text-sm text-[#737D89]">
          New here?{' '}
          <Link to="/register" className="font-semibold text-[#142D4E] hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || phone.trim().length < 10) {
      toast.error('Please enter a valid name and phone number');
      return;
    }
    updateProfile({ full_name: fullName, phone });
    setIsEditing(false);
    toast.success('Profile updated');
  };

  const handleSignOut = () => {
    logout();
    toast.success('You have been signed out');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-[28px] sm:text-[32px] font-semibold text-[#142D4E] tracking-tight">
          Profile
        </h1>
        <p className="text-sm text-[#737D89] mt-1">
          Personal information, account actions, and support
        </p>
      </div>

      {/* Personal Information */}
      <section className="bg-white border border-[#E8EAED] rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-[#142D4E]">Personal Information</h2>
          {!isEditing && (
            <button
              type="button"
              onClick={() => {
                setFullName(user.full_name);
                setPhone(user.phone);
                setIsEditing(true);
              }}
              className="text-sm font-semibold text-[#142D4E] hover:underline cursor-pointer"
            >
              Edit profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label htmlFor="profile-name" className="block text-sm font-medium text-[#202936] mb-1.5">
                Full name
              </label>
              <input
                id="profile-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-[#E8EAED] rounded-xl text-sm text-[#202936] outline-none focus:border-[#142D4E]"
              />
            </div>

            <div>
              <label htmlFor="profile-phone" className="block text-sm font-medium text-[#202936] mb-1.5">
                Phone number
              </label>
              <input
                id="profile-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-[#E8EAED] rounded-xl text-sm text-[#202936] outline-none focus:border-[#142D4E]"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                className="h-11 px-5 bg-[#142D4E] hover:bg-[#0F233D] text-white text-sm font-semibold rounded-xl cursor-pointer"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="h-11 px-5 border border-[#E8EAED] text-[#202936] text-sm font-semibold rounded-xl hover:bg-[#F5F5F0] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#F5F5F0] text-[#142D4E] flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#737D89]">Name</div>
                <div className="font-medium text-[#202936]">{user.full_name}</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#F5F5F0] text-[#142D4E] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#737D89]">Email</div>
                <div className="font-medium text-[#202936]">{user.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#F5F5F0] text-[#142D4E] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#737D89]">Phone number</div>
                <div className="font-medium text-[#202936]">{user.phone}</div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Account Actions */}
      <section className="bg-white border border-[#E8EAED] rounded-2xl overflow-hidden divide-y divide-[#E8EAED]">
        <div className="px-5 sm:px-6 py-3.5 bg-[#F5F5F0]/60 text-xs font-semibold uppercase tracking-wider text-[#737D89]">
          Account
        </div>

        <Link
          to="/my-bookings"
          className="px-5 sm:px-6 py-4 flex items-center justify-between hover:bg-[#F5F5F0] transition-colors text-sm font-medium text-[#202936]"
        >
          <span className="flex items-center gap-3">
            <CalendarCheck className="w-5 h-5 text-[#142D4E]" />
            View bookings
          </span>
          <ChevronRight className="w-4 h-4 text-[#737D89]" />
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between hover:bg-[#D94B4B]/5 transition-colors text-sm font-medium text-[#D94B4B] cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <LogOut className="w-5 h-5" />
            Sign out
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </section>

      {/* Support and Information */}
      <section className="bg-white border border-[#E8EAED] rounded-2xl overflow-hidden divide-y divide-[#E8EAED]">
        <div className="px-5 sm:px-6 py-3.5 bg-[#F5F5F0]/60 text-xs font-semibold uppercase tracking-wider text-[#737D89]">
          Support and Information
        </div>

        <button
          type="button"
          onClick={() => setInfoModal('contact')}
          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between hover:bg-[#F5F5F0] transition-colors text-sm font-medium text-[#202936] cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-[#142D4E]" />
            Contact information
          </span>
          <ChevronRight className="w-4 h-4 text-[#737D89]" />
        </button>

        <button
          type="button"
          onClick={() => setInfoModal('terms')}
          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between hover:bg-[#F5F5F0] transition-colors text-sm font-medium text-[#202936] cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#142D4E]" />
            Terms and conditions
          </span>
          <ChevronRight className="w-4 h-4 text-[#737D89]" />
        </button>

        <button
          type="button"
          onClick={() => setInfoModal('privacy')}
          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between hover:bg-[#F5F5F0] transition-colors text-sm font-medium text-[#202936] cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#142D4E]" />
            Privacy policy
          </span>
          <ChevronRight className="w-4 h-4 text-[#737D89]" />
        </button>
      </section>

      {/* Info Modal */}
      {infoModal && (
        <div className="fixed inset-0 z-50 bg-[#202936]/50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8EAED] rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#142D4E]">
              {infoModal === 'contact'
                ? 'Contact Support'
                : infoModal === 'terms'
                ? 'Terms and Conditions'
                : 'Privacy Policy'}
            </h3>
            <div className="text-sm text-[#737D89] leading-relaxed space-y-2">
              {infoModal === 'contact' && (
                <>
                  <p>For assistance with bookings or payment verification, contact our operations desk:</p>
                  <p className="text-[#202936] font-medium">Email: support@quicksolution.local</p>
                  <p className="text-[#202936] font-medium">Phone: +91 80 4123 4567 (9 AM – 7 PM)</p>
                </>
              )}
              {infoModal === 'terms' && (
                <p>
                  All listed service prices cover the tasks explicitly described on the service details page.
                  Spare parts or additional scope outside the listed service are agreed separately before work begins.
                </p>
              )}
              {infoModal === 'privacy' && (
                <p>
                  Your contact details and service address are used solely to coordinate your booked appointment
                  and shared only with the assigned service partner.
                </p>
              )}
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setInfoModal(null)}
                className="h-10 px-5 bg-[#142D4E] text-white text-sm font-semibold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
