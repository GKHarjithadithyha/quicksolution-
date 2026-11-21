import React from 'react';
import { useAuth } from '../../features/auth/AuthContext';
import { UserRole } from '../../types';
import { ShieldCheck, UserCheck, Wrench } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { user, switchRole } = useAuth();

  const roles: { role: UserRole; label: string; icon: React.ReactNode; color: string }[] = [
    { role: 'customer', label: 'Customer', icon: <UserCheck className="w-4 h-4" />, color: 'bg-emerald-600' },
    { role: 'partner', label: 'Partner', icon: <Wrench className="w-4 h-4" />, color: 'bg-blue-600' },
    { role: 'admin', label: 'Operations Admin', icon: <ShieldCheck className="w-4 h-4" />, color: 'bg-purple-600' }
  ];

  return (
    <div className="bg-slate-900 text-white text-xs px-4 py-2 flex flex-wrap items-center justify-between border-b border-slate-800 gap-2">
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-semibold text-slate-300">Prototype Role Simulator:</span>
        <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-emerald-400">
          {user.full_name} ({user.role})
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-slate-400 mr-1 hidden sm:inline">Switch Role:</span>
        {roles.map((r) => {
          const isActive = user.role === r.role;
          return (
            <button
              key={r.role}
              onClick={() => switchRole(r.role)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                isActive 
                  ? `${r.color} text-white shadow-sm ring-1 ring-white/20` 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {r.icon}
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
