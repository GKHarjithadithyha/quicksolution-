import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Clock,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';
import { QuickSolutionLogo, QuickSolutionMark } from '../common/QuickSolutionLogo';

export const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const locationRoute = useLocation();
  const navigate = useNavigate();
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

  // Native Android inner-screen title for mobile app bar
  const getMobilePageTitle = (): string | null => {
    const p = locationRoute.pathname;
    if (p === '/') return null;
    if (p === '/services') return 'Explore Services';
    if (p.startsWith('/services/') || p.startsWith('/service/')) return 'Service Details';
    if (p.startsWith('/book/')) return 'Book Service';
    if (p.startsWith('/payment/')) return 'Payment';
    if (p.startsWith('/booking/')) return 'Booking Details';
    if (p === '/my-bookings') return 'My Bookings';
    if (p === '/profile') return 'Profile';
    if (p === '/login') return 'Sign In';
    if (p === '/register') return 'Create Account';
    return 'Quick Solution';
  };

  const mobileTitle = getMobilePageTitle();
  const isTopLevelTab =
    locationRoute.pathname === '/' ||
    locationRoute.pathname === '/services' ||
    locationRoute.pathname === '/my-bookings' ||
    locationRoute.pathname === '/profile';

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
    <div className={`min-h-screen bg-[#F7F9F4] text-[#172B4D] flex flex-col ${hideMobileNav ? '' : 'pb-20 md:pb-0'}`}>
      {/* Mobile Native Android App Bar (< md) */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#DDE3E8] pt-safe md:hidden">
        <div className="px-3.5 h-14 flex items-center justify-between gap-2">
          {isHomePage ? (
            <>
              {/* Left: Mark + Compact Two-Line Location Picker */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <Link to="/" aria-label="Quick Solution Home" className="shrink-0">
                  <QuickSolutionMark size={34} framed />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setLocationInput(location);
                    setIsLocationModalOpen(true);
                  }}
                  className="flex flex-col text-left min-w-0 py-1 active:opacity-75 cursor-pointer"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#667085] leading-none">
                    Quick Solution · Serving
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-[#172B4D] leading-tight mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#16794B] shrink-0" />
                    <span className="truncate max-w-[175px]">{location}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#667085] shrink-0" />
                  </span>
                </button>
              </div>

              {/* Right: Compact Account Avatar / Sign-In Button */}
              {user ? (
                <Link
                  to="/profile"
                  aria-label="Profile"
                  className="w-10 h-10 rounded-full bg-[#172B4D] text-[#B9FF66] font-bold flex items-center justify-center text-sm shrink-0 active:scale-95 transition-transform"
                >
                  {user.full_name.charAt(0).toUpperCase()}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="h-9 px-3.5 inline-flex items-center justify-center rounded-xl bg-[#EEF3EC] border border-[#DDE3E8] text-[#172B4D] text-xs font-bold shrink-0 active:opacity-80"
                >
                  Sign In
                </Link>
              )}
            </>
          ) : (
            /* Native Android Inner-Screen App Bar (Back Arrow + Title) */
            <div className="flex items-center gap-2 min-w-0 w-full">
              {!isTopLevelTab && (
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  aria-label="Go back"
                  className="w-10 h-10 -ml-1.5 rounded-full flex items-center justify-center text-[#172B4D] active:bg-[#EEF3EC] cursor-pointer shrink-0"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <span className="font-heading text-base font-bold text-[#172B4D] truncate">
                {mobileTitle}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Desktop Top Navigation Header (>= md) */}
      <header className="hidden md:block sticky top-0 z-40 glass-nav border-b border-[#DDE3E8]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5 min-w-0">
            <Link to="/" className="shrink-0" aria-label="Quick Solution Home">
              <QuickSolutionLogo variant="horizontal" theme="light" showTagline size="sm" />
            </Link>

            <div className="h-5 w-px bg-[#DDE3E8]" />

            <button
              type="button"
              onClick={() => {
                setLocationInput(location);
                setIsLocationModalOpen(true);
              }}
              className="flex items-center gap-1.5 text-left min-w-0 min-h-[40px] px-3 py-1.5 rounded-xl bg-[#EEF3EC] hover:bg-[#E2EBE0] border border-[#DDE3E8] transition-colors cursor-pointer"
              title="Change service location"
            >
              <MapPin className="w-4 h-4 text-[#172B4D] shrink-0" />
              <span className="text-sm font-semibold text-[#172B4D] truncate max-w-[175px]">
                {location}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#475467] shrink-0" />
            </button>
          </div>

          <nav aria-label="Primary Navigation" className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isNavActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={active ? 'page' : undefined}
                  className={`px-3.5 py-2 rounded-xl text-sm transition-colors ${
                    active
                      ? 'bg-[#B9FF66] text-[#172B4D] font-bold'
                      : 'text-[#475467] hover:text-[#172B4D] hover:bg-[#EEF3EC] font-medium'
                  }`}
                >
                  {item.desktopLabel}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <Link
                to="/profile"
                className="flex items-center gap-2.5 px-2 py-1 rounded-xl hover:bg-[#EEF3EC] transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#172B4D] text-[#B9FF66] font-bold flex items-center justify-center text-sm">
                  {user.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-sm font-semibold text-[#172B4D] leading-tight">
                    {user.full_name}
                  </div>
                  <div className="text-xs text-[#667085]">My Account</div>
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="h-11 px-4 inline-flex items-center justify-center rounded-xl border border-[#172B4D] bg-white hover:bg-[#EEF3EC] text-[#172B4D] text-sm font-semibold transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/services"
                  className="h-11 px-4 inline-flex items-center justify-center rounded-xl bg-[#B9FF66] hover:bg-[#A4ED45] active:bg-[#8AD42B] text-[#172B4D] text-sm font-bold transition-colors"
                >
                  Book a Service
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={isHomePage ? 'flex-1 w-full' : 'flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 py-4 sm:py-8'}>
        {children}
      </main>

      {/* Desktop Footer (Hidden on Mobile/Android App) */}
      {!hideMobileNav && (
        <footer className="hidden md:block bg-[#172B4D] text-white mt-12">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
            <div className="space-y-3">
              <QuickSolutionLogo variant="horizontal" theme="dark" showTagline size="md" />
              <p className="text-white/75 leading-relaxed pt-1">
                Fast, reliable, fixed-price home services scheduled at your convenience.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2 text-white/75">
                <li><Link to="/" className="hover:text-[#B9FF66] transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-[#B9FF66] transition-colors">Explore Services</Link></li>
                <li><Link to="/my-bookings" className="hover:text-[#B9FF66] transition-colors">My Bookings</Link></li>
                <li><Link to="/profile" className="hover:text-[#B9FF66] transition-colors">Account & Profile</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading font-semibold text-white">Services</h3>
              <ul className="space-y-2 text-white/75">
                <li><Link to="/services?category=cat-ac" className="hover:text-[#B9FF66] transition-colors">AC Services</Link></li>
                <li><Link to="/services?category=cat-plumbing" className="hover:text-[#B9FF66] transition-colors">Plumbing</Link></li>
                <li><Link to="/services?category=cat-electrical" className="hover:text-[#B9FF66] transition-colors">Electrical</Link></li>
                <li><Link to="/services?category=cat-cleaning" className="hover:text-[#B9FF66] transition-colors">Deep Cleaning</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading font-semibold text-white">Contact & Support</h3>
              <ul className="space-y-2.5 text-white/80">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#B9FF66] shrink-0" />
                  <span>+91 80 4123 4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#B9FF66] shrink-0" />
                  <span>support@quicksolution.in</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B9FF66] shrink-0" />
                  <span>Mon – Sun, 8:00 AM – 8:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-white/65">
              <span>© {new Date().getFullYear()} Quick Solution. Every Need. One Quick Solution.</span>
              <div className="flex items-center gap-4">
                <Link to="/profile" className="hover:text-[#B9FF66]">Terms & Conditions</Link>
                <Link to="/profile" className="hover:text-[#B9FF66]">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Mobile Material-3 Style Fixed Bottom Navigation Bar */}
      {!hideMobileNav && (
        <nav
          aria-label="Mobile Navigation"
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#DDE3E8] pb-safe md:hidden shadow-[0_-4px_16px_rgba(23,43,77,0.06)]"
        >
          <div className="flex justify-around items-center h-16 px-1">
            {navItems.map((item) => {
              const active = isNavActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={active ? 'page' : undefined}
                  className={`flex flex-col items-center justify-center flex-1 min-h-[48px] gap-0.5 text-[11px] font-medium select-none active:scale-95 transition-transform ${
                    active ? 'text-[#172B4D]' : 'text-[#667085]'
                  }`}
                >
                  <div
                    className={`px-4 py-1 rounded-full transition-colors ${
                      active ? 'bg-[#B9FF66] text-[#172B4D]' : ''
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className={active ? 'font-bold text-[#172B4D]' : ''}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Location Selector Bottom Sheet */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#172B4D]/50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white border border-[#DDE3E8] rounded-t-3xl sm:rounded-2xl max-w-md w-full p-5 sm:p-6 pb-safe space-y-5 shadow-xl">
            <div className="w-10 h-1 bg-[#DDE3E8] rounded-full mx-auto sm:hidden" />
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#172B4D]">Select your service location</h2>
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(false)}
                className="w-10 h-10 -mr-2 flex items-center justify-center text-[#475467] hover:text-[#172B4D] cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLocation} className="space-y-4 pb-2 sm:pb-0">
              <div>
                <label htmlFor="locality-input" className="block text-sm font-semibold text-[#172B4D] mb-1.5">
                  Area, locality, or city
                </label>
                <input
                  id="locality-input"
                  type="text"
                  required
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="e.g. Indiranagar, Bengaluru"
                  className="w-full h-12 px-4 bg-white border border-[#DDE3E8] rounded-xl text-base text-[#172B4D] outline-none focus:border-[#172B4D]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {['Bengaluru', 'Indiranagar, Bengaluru', 'Koramangala, Bengaluru', 'Mumbai', 'Hyderabad'].map(
                  (preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setLocationInput(preset)}
                      className="min-h-[38px] text-xs px-3 py-2 rounded-xl bg-[#EEF3EC] hover:bg-[#B9FF66] active:opacity-80 text-[#172B4D] font-semibold transition-colors cursor-pointer"
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
                  className="flex-1 sm:flex-none qs-btn-secondary px-4 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none qs-btn-primary px-5 text-sm"
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
