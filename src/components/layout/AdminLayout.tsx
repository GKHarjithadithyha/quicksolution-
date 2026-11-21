import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpenCheck, CreditCard, Users, FolderKanban } from 'lucide-react';
import { RoleSwitcher } from '../common/RoleSwitcher';
import { useAuth } from '../../features/auth/AuthContext';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { label: 'Overview', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Bookings & Dispatch', path: '/admin/bookings', icon: <BookOpenCheck className="w-5 h-5" /> },
    { label: 'Payment Verifications', path: '/admin/payments', icon: <CreditCard className="w-5 h-5" /> },
    { label: 'Catalogue & Services', path: '/admin/services', icon: <FolderKanban className="w-5 h-5" /> },
    { label: 'Partners Roster', path: '/admin/partners', icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <RoleSwitcher />

      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight">Admin Operations</div>
              <div className="text-xs text-purple-300">Marketplace Dispatch & Verification</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                    active ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
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
              <div className="text-xs text-purple-300">Administrator</div>
              <div className="text-sm font-medium text-white">{user.full_name}</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-purple-700 text-white font-bold flex items-center justify-center text-sm border border-purple-500">
              {user.full_name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Subnav for mobile admin navigation */}
      <div className="lg:hidden bg-slate-800 overflow-x-auto py-2 px-4 flex gap-2 border-b border-slate-700">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1.5 whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-md ${
                active ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};
