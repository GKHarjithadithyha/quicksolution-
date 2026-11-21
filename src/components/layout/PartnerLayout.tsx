import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wrench, CheckCircle2, Clock, User, LogOut } from 'lucide-react';
import { RoleSwitcher } from '../common/RoleSwitcher';
import { useAuth } from '../../features/auth/AuthContext';

export const PartnerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { label: 'Assigned Jobs', path: '/partner/jobs', icon: <Clock className="w-5 h-5" /> },
    { label: 'Completed History', path: '/partner/history', icon: <CheckCircle2 className="w-5 h-5" /> },
    { label: 'Partner Profile', path: '/partner/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-16 md:pb-0">
      <RoleSwitcher />

      <header className="sticky top-0 z-40 bg-blue-900 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center text-white">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold leading-tight">Partner Console</div>
              <div className="text-xs text-blue-200">On-field Service App</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    active ? 'text-white bg-blue-800 px-3 py-1.5 rounded-lg' : 'text-blue-200 hover:text-white'
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
              <div className="text-xs text-blue-300">Verified Partner</div>
              <div className="text-sm font-semibold">{user.full_name}</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-sm border border-blue-500">
              {user.full_name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
        {children}
      </main>

      {/* Mobile Bottom Bar for Service Technicians */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 flex justify-around items-center h-16 px-2 md:hidden shadow-lg">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full py-1 text-xs font-medium ${
                active ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className={`p-1 rounded-full ${active ? 'bg-blue-50' : ''}`}>
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
