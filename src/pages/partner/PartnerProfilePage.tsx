import React from 'react';
import { partnerService } from '../../services/partner.service';
import { useAuth } from '../../features/auth/AuthContext';
import { User, Phone, Mail, Award, CheckCircle, Shield } from 'lucide-react';

export const PartnerProfilePage: React.FC = () => {
  const { user } = useAuth();
  const partner = partnerService.getPartners().find(p => p.user_id === user.id) || partnerService.getPartners()[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Partner Profile</h1>
        <p className="text-sm text-slate-500">Technician credentials, verification status & verified skills</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-900 font-black text-2xl flex items-center justify-center border-2 border-blue-200">
            {partner.full_name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{partner.full_name}</h2>
            <div className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold mt-1">
              <Shield className="w-3.5 h-3.5" /> ID Verified On-Field Partner
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100 text-center">
          <div className="bg-slate-50 p-3 rounded-2xl">
            <span className="text-xs text-slate-400 block font-medium">Customer Rating</span>
            <span className="text-2xl font-black text-slate-900">{partner.rating} ★</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl">
            <span className="text-xs text-slate-400 block font-medium">Fulfilled Jobs</span>
            <span className="text-2xl font-black text-slate-900">{partner.total_jobs}+</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Certified Skillsets</h3>
          <div className="flex flex-wrap gap-2">
            {partner.skills.map(s => (
              <span key={s} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> {s}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-400" />
            <span>{partner.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-400" />
            <span>{partner.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
