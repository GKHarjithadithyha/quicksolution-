import React from 'react';
import { partnerService } from '../../services/partner.service';
import { useAuth } from '../../features/auth/AuthContext';
import { BookingStatusBadge, PaymentStatusBadge } from '../../components/common/StatusBadges';
import { formatCurrency } from '../../lib/utils';
import { CheckCircle2, Calendar } from 'lucide-react';

export const PartnerHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const partner = partnerService.getPartners().find(p => p.user_id === user.id) || partnerService.getPartners()[0];
  const allJobs = partnerService.getAssignedJobs(partner.id);
  const completed = allJobs.filter(j => j.status === 'completed');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Completed Service History</h1>
        <p className="text-sm text-slate-500">Log of fulfilled customer requests & payouts</p>
      </div>

      {completed.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
          <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-800">No completed jobs yet</h3>
          <p className="text-xs text-slate-400 mt-1">Accept and complete assigned jobs to view your historical record.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {completed.map((job) => (
            <div key={job.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center">
              <div>
                <span className="font-mono text-xs font-bold text-slate-500">{job.booking_number}</span>
                <h3 className="font-bold text-slate-900 text-sm mt-0.5">{job.service_name}</h3>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(job.updated_at).toLocaleDateString()}</span>
                  <span>• Customer: {job.customer_name}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-emerald-700 text-base block">{formatCurrency(job.service_price_snapshot)}</span>
                <BookingStatusBadge status={job.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
