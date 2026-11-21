import React, { useState } from 'react';
import { adminService } from '../../services/admin.service';
import { paymentService } from '../../services/payment.service';
import { useAuth } from '../../features/auth/AuthContext';
import { formatCurrency } from '../../lib/utils';
import { PaymentStatusBadge } from '../../components/common/StatusBadges';
import { Check, X, ShieldAlert, CreditCard, Search, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const AdminPaymentsPage: React.FC = () => {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const bookings = adminService.getAllBookings();

  // Pending submissions first
  const paymentQueue = [...bookings].sort((a, b) => {
    if (a.payment.status === 'submitted' && b.payment.status !== 'submitted') return -1;
    if (b.payment.status === 'submitted' && a.payment.status !== 'submitted') return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const handleVerify = (bookingId: string, verified: boolean) => {
    paymentService.verifyPayment(bookingId, user.id, verified);
    if (verified) {
      toast.success('Payment verified! Revenue updated in dashboard.');
    } else {
      toast.error('Payment rejected! Customer status updated.');
    }
    setRefreshKey(k => k + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Manual UPI Payment Verifications</h1>
        <p className="text-xs text-slate-500">
          Match bank transaction references (UTR) submitted by customers against your static QR account
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5">Booking No</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Amount Due</th>
                <th className="p-3.5">Submitted UTR Reference</th>
                <th className="p-3.5">Submission Time</th>
                <th className="p-3.5">Verification Status</th>
                <th className="p-3.5 text-right">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paymentQueue.map((b) => {
                const pay = b.payment;
                const isPending = pay.status === 'submitted';

                return (
                  <tr key={b.id} className={isPending ? 'bg-amber-50/40' : 'hover:bg-slate-50/70'}>
                    <td className="p-3.5 font-mono font-bold text-slate-800">{b.booking_number}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{b.customer_name}</div>
                      <div className="text-[10px] text-slate-400">{b.customer_phone}</div>
                    </td>
                    <td className="p-3.5 font-extrabold text-emerald-700 text-sm">
                      {formatCurrency(pay.amount)}
                    </td>
                    <td className="p-3.5">
                      {pay.transaction_reference ? (
                        <div className="font-mono bg-white px-2.5 py-1 rounded border border-slate-200 font-bold text-slate-800 inline-block shadow-xs">
                          {pay.transaction_reference}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No reference entered</span>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-500 text-[11px]">
                      {pay.submitted_at 
                        ? new Date(pay.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : '—'
                      }
                    </td>
                    <td className="p-3.5">
                      <PaymentStatusBadge status={pay.status} />
                    </td>
                    <td className="p-3.5 text-right">
                      {isPending ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleVerify(b.id, false)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                            title="Reject Payment"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleVerify(b.id, true)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                          >
                            <Check className="w-4 h-4" /> Verify UTR
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">
                          {pay.status === 'verified' ? '✓ Verified in Bank' : 'Processed'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
