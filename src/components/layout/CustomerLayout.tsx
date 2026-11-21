import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Compass,
  CalendarCheck,
  User,
  MapPin,
  ChevronDown,
  X,
  Phone,
  Mail,
  Clock
} from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';

export const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const locationRoute = useLocation();
  const { user, location, setLocation } = useAuth();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationInput, setLocationInput] = useState(location);

  const navItems = [
    { label: 'Home', desktopLabel: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Explore', desktopLabel: 'Explore Services', path: '/services', icon: <Compass className="w-5 h-5" /> },
    { label: 'Bookings', desktopLabel: 'My Bookings', path: '/my-bookings', icon: <CalendarCheck className="w-5 h-5" /> },
    { label: 'Profile', desktopLabel: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> }
  ];

  const hideMobileNav =
    locationRoute.pathname.startsWith('/payment/') ||
    locationRoute.pathname.startsWith('/book/') ||
    locationRoute.pathname === '/login' ||
    locationRoute.pathname === '/register';

  const isHomePage = locationRoute.pathname === '/';

  const isNavActive = (path: string) => {
    if (path === '/') return locationRoute.pathname === '/';
    return locationRoute.pathname.startsWith(path);
  };

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(locationInput);
    setIsLocationModalOpen(false);
  };

  return (
    <div className={`min-h-screen bg-transparent text-[#1F2937] flex flex-col ${hideMobileNav ? '' : 'pb-24 md:pb-0'}`}>
      {/* Top Navigation Header (Glassmorphic + Safe Area) */}
      <header className="sticky top-0 z-40 glass-nav border-b shadow-xs pt-safe">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Brand Logo + Location Selector */}
          <div className="flex items-center gap-3 sm:gap-5 min-w-0">
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[#16A34A] text-white font-bold text-base flex items-center justify-center">
                QS
              </div>
              <div className="leading-tight">
                <span className="text-lg font-bold tracking-tight text-[#1E3A8A] block">
                  QuickSolution
                </span>
                <span className="text-[10px] font-medium text-[#16A34A] hidden sm:block">
                  Home Services Marketplace
                </span>
              </div>
            </Link>

            <div className="h-5 w-px bg-[#E5E7EB] hidden sm:block" />

            <button
              type="button"
              onClick={() => {
                setLocationInput(location);
                setIsLocationModalOpen(true);
              }}
              className="flex items-center gap-1.5 text-left min-w-0 min-h-[40px] px-2.5 py-1.5 rounded-xl bg-[#F2FAF5] hover:bg-[#DCFCE7] active:opacity-80 border border-[#16A34A]/20 transition-colors cursor-pointer"
              title="Change service location"
            >
              <MapPin className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-[#1E3A8A] truncate max-w-[105px] sm:max-w-[180px]">
                {location}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
            </button>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isNavActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'text-[#16A34A] bg-[#F2FAF5] font-semibold'
                      : 'text-[#4B5563] hover:text-[#1E3A8A] hover:bg-gray-50'
                  }`}
                >
                  {item.desktopLabel}
                </Link>
              );
            })}
          </nav>

          {/* Right: Account / Sign In */}
          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <Link
                to="/profile"
                className="flex items-center gap-2.5 px-2 py-1 rounded-xl hover:bg-[#F2FAF5] transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#1E3A8A] text-white font-semibold flex items-center justify-center text-sm">
                  {user.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-sm font-semibold text-[#1E3A8A] leading-tight">
                    {user.full_name}
                  </div>
                  <div className="text-xs text-[#6B7280]">My Account</div>
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-[#E5E7EB] hover:border-[#1E3A8A] text-[#1E3A8A] text-sm font-semibold transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/services"
                  className="hidden sm:inline-flex h-10 px-4 items-center justify-center rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-semibold transition-colors"
                >
                  Book a Service
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={isHomePage ? 'flex-1 w-full' : 'flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8'}>
        {children}
      </main>

      {/* Footer with Contact & Support Details */}
      {!hideMobileNav && (
        <footer className="bg-[#F2FAF5] border-t border-[#E5E7EB] mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#16A34A] text-white font-bold text-sm flex items-center justify-center">
                  QS
                </div>
                <span className="text-lg font-bold text-[#1E3A8A]">QuickSolution</span>
              </div>
              <p className="text-[#6B7280] leading-relaxed">
                Reliable, fixed-price home maintenance and repair services scheduled at your convenience.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#1E3A8A]">Quick Links</h3>
              <ul className="space-y-2 text-[#6B7280]">
                <li><Link to="/" className="hover:text-[#16A34A]">Home</Link></li>
                <li><Link to="/services" className="hover:text-[#16A34A]">Explore Services</Link></li>
                <li><Link to="/my-bookings" className="hover:text-[#16A34A]">My Bookings</Link></li>
                <li><Link to="/profile" className="hover:text-[#16A34A]">Account & Profile</Link></li>
              </ul>
            </div>

            {/* Popular Categories */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#1E3A8A]">Categories</h3>
              <ul className="space-y-2 text-[#6B7280]">
                <li><Link to="/services?category=cat-ac" className="hover:text-[#16A34A]">AC Services</Link></li>
                <li><Link to="/services?category=cat-plumbing" className="hover:text-[#16A34A]">Plumbing</Link></li>
                <li><Link to="/services?category=cat-electrical" className="hover:text-[#16A34A]">Electrical</Link></li>
                <li><Link to="/services?category=cat-cleaning" className="hover:text-[#16A34A]">Deep Cleaning</Link></li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#1E3A8A]">Contact & Support</h3>
              <ul className="space-y-2.5 text-[#6B7280]">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>+91 80 4123 4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>support@quicksolution.in</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Mon – Sun, 8:00 AM – 8:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#E5E7EB]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#6B7280]">
              <span>© {new Date().getFullYear()} QuickSolution Home Services. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <Link to="/profile" className="hover:text-[#1E3A8A]">Terms & Conditions</Link>
                <Link to="/profile" className="hover:text-[#1E3A8A]">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Mobile Fixed Bottom Navigation (Glassmorphic + Safe Area) */}
      {!hideMobileNav && (
        <nav
          aria-label="Mobile Navigation"
          className="fixed bottom-0 left-0 right-0 z-50 glass-nav border-t pb-safe md:hidden shadow-lg"
        >
          <div className="flex justify-around items-center h-16 px-1">
            {navItems.map((item) => {
              const active = isNavActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={active ? 'page' : undefined}
                  className={`flex flex-col items-center justify-center flex-1 min-h-[48px] gap-0.5 text-[11px] font-medium active:opacity-70 transition-colors ${
                    active ? 'text-[#16A34A]' : 'text-[#6B7280]'
                  }`}
                >
                  <div
                    className={`px-3.5 py-1 rounded-full transition-colors ${
                      active ? 'bg-[#F2FAF5] text-[#16A34A]' : ''
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className={active ? 'font-semibold' : ''}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Manual Location Selector Modal (Bottom Sheet on Mobile) */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white border border-[#E5E7EB] rounded-t-3xl sm:rounded-2xl max-w-md w-full p-5 sm:p-6 pb-safe space-y-5 shadow-xl">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto sm:hidden" />
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1E3A8A]">Select your service location</h2>
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(false)}
                className="w-10 h-10 -mr-2 flex items-center justify-center text-[#6B7280] hover:text-[#1F2937] cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLocation} className="space-y-4 pb-2 sm:pb-0">
              <div>
                <label htmlFor="locality-input" className="block text-sm font-medium text-[#1F2937] mb-1.5">
                  Area, locality, or city
                </label>
                <input
                  id="locality-input"
                  type="text"
                  required
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="e.g. Indiranagar, Bengaluru"
                  className="w-full h-12 px-4 bg-white border border-[#E5E7EB] rounded-xl text-base text-[#1F2937] outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/15"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {['Bengaluru', 'Indiranagar, Bengaluru', 'Koramangala, Bengaluru', 'Mumbai', 'Hyderabad'].map(
                  (preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setLocationInput(preset)}
                      className="min-h-[38px] text-xs px-3 py-2 rounded-xl bg-[#F2FAF5] hover:bg-[#DCFCE7] active:opacity-80 text-[#1E3A8A] font-medium cursor-pointer"
                    >
                      {preset}
                    </button>
                  )
                )}
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(false)}
                  className="flex-1 sm:flex-none h-12 px-4 rounded-xl border border-[#E5E7EB] text-sm font-semibold text-[#1F2937] hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none h-12 px-5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white text-sm font-semibold cursor-pointer"
                >
                  Save Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
