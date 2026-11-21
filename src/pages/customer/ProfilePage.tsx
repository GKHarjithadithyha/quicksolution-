import React from 'react';
import { useAuth } from '../../features/auth/AuthContext';
import { User, Mail, Phone, ShieldCheck, MapPin } from 'lucide-react';

export const CustomerProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Customer Profile</h1>
        <p className="text-sm text-slate-500">Manage account information & saved preferences</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 font-black text-2xl flex items-center justify-center border-2 border-emerald-200">
            {user.full_name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{user.full_name}</h2>
            <div className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Customer Account
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100 text-sm">
          <div className="flex items-center gap-3 text-slate-700">
            <Mail className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-xs text-slate-400 block">Email Address</span>
              <span className="font-medium">{user.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-700">
            <Phone className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-xs text-slate-400 block">Mobile Number</span>
              <span className="font-medium">{user.phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-700">
            <MapPin className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-xs text-slate-400 block">Primary City</span>
              <span className="font-medium">Bengaluru (Karnataka)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
