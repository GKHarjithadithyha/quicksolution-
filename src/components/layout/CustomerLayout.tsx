import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, CalendarCheck, User, Sparkles } from 'lucide-react';
import { RoleSwitcher } from '../common/RoleSwitcher';
import { useAuth } from '../../features/auth/AuthContext';

export const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { label: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Explore', path: '/services', icon: <Compass className="w-5 h-5" /> },
    { label: 'My Bookings', path: '/my-bookings', icon: <CalendarCheck className="w-5 h-5" /> },
    { label: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-16 md:pb-0">
      <RoleSwitcher />
      
      {/* Desktop / Tablet Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">UrbanEase</span>
              <span className="hidden sm:inline-block ml-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Home Services</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    active ? 'text-emerald-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-500 font-medium">Customer</div>
              <div className="text-sm font-semibold text-slate-800">{user.full_name}</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm border border-emerald-200">
              {user.full_name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
        {children}
      </main>

      {/* Mobile Bottom Navigation (Simulates Capacitor / Android Experience) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 flex justify-around items-center h-16 px-2 md:hidden shadow-lg">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full py-1 text-xs font-medium ${
                active ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className={`p-1 rounded-full ${active ? 'bg-emerald-50' : ''}`}>
                {item.icon}
              </div>
              <span className="mt-0.5 text-[11px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
