import React from 'react';
import { partnerService } from '../../services/partner.service';
import { ShieldCheck, Star, Phone, Mail, Award } from 'lucide-react';

export const AdminPartnersPage: React.FC = () => {
  const partners = partnerService.getPartners();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Service Partners Roster</h1>
        <p className="text-xs text-slate-500">Verified on-field technicians, ratings and live skillsets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {partners.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-900 font-black text-lg flex items-center justify-center">
                {p.full_name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{p.full_name}</h3>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl flex justify-between text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Rating</span>
                <span className="font-bold text-slate-900">{p.rating} ★</span>
              </div>
              <div className="w-px bg-slate-200"></div>
              <div>
                <span className="text-[10px] text-slate-400 block">Jobs Done</span>
                <span className="font-bold text-slate-900">{p.total_jobs}</span>
              </div>
              <div className="w-px bg-slate-200"></div>
              <div>
                <span className="text-[10px] text-slate-400 block">Status</span>
                <span className="font-bold text-emerald-700">Available</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400">Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {p.skills.map(s => (
                  <span key={s} className="px-2 py-0.5 bg-slate-100 rounded text-[11px] text-slate-700 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{p.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{p.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
