import React from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/admin.service';
import { formatCurrency } from '../../lib/utils';
import { 
  DollarSign, 
  BookOpenCheck, 
  CreditCard, 
  Users, 
  ArrowUpRight, 
  Clock, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const metrics = adminService.getMetrics();
  const recentBookings = adminService.getAllBookings().slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Marketplace Operations Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Real-time snapshot of bookings, payments verification, and field partner capacity
        </p>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-slate-400">Total Bookings</span>
            <div className="text-2xl font-black text-slate-900">{metrics.totalBookings}</div>
            <span className="text-[11px] text-emerald-600 font-semibold">{metrics.completedJobs} fulfilled</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <BookOpenCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-slate-400">Verified Revenue</span>
            <div className="text-2xl font-black text-emerald-600">{formatCurrency(metrics.verifiedRevenue)}</div>
            <span className="text-[11px] text-slate-400 font-semibold">Bank confirmed</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-slate-400">UPI Verifications</span>
            <div className="text-2xl font-black text-amber-600">{metrics.pendingPaymentVerifications}</div>
            <Link to="/admin/payments" className="text-[11px] text-amber-700 font-bold hover:underline flex items-center gap-0.5">
              Review queue <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-slate-400">Pending Dispatch</span>
            <div className="text-2xl font-black text-rose-600">{metrics.pendingAssignments}</div>
            <Link to="/admin/bookings" className="text-[11px] text-rose-700 font-bold hover:underline flex items-center gap-0.5">
              Assign partner <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Alerts */}
      {(metrics.pendingPaymentVerifications > 0 || metrics.pendingAssignments > 0) && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>
              <strong>Operations Alert:</strong> You have <strong>{metrics.pendingPaymentVerifications}</strong> pending UPI verification(s) and <strong>{metrics.pendingAssignments}</strong> unassigned booking(s) waiting for technician assignment.
            </span>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/payments" className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">
              Verify Payments
            </Link>
            <Link to="/admin/bookings" className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">
              Dispatch
            </Link>
          </div>
        </div>
      )}

      {/* Recent Bookings Stream */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Customer Bookings</h2>
            <p className="text-xs text-slate-400">Live order intake</p>
          </div>
          <Link to="/admin/bookings" className="text-xs font-bold text-purple-600 hover:underline">
            View All Bookings →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Booking ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Service</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3">Partner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80">
                  <td className="p-3 font-mono font-bold text-slate-800">{b.booking_number}</td>
                  <td className="p-3 font-medium text-slate-800">{b.customer_name}</td>
                  <td className="p-3 text-slate-600">{b.service_name}</td>
                  <td className="p-3 font-bold text-slate-900">{formatCurrency(b.service_price_snapshot)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      b.payment.status === 'verified' ? 'bg-emerald-50 text-emerald-700' :
                      b.payment.status === 'submitted' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {b.payment.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-slate-700 uppercase text-[11px]">{b.status}</span>
                  </td>
                  <td className="p-3 text-slate-600">
                    {b.partner_name || <span className="text-rose-600 font-semibold italic">Unassigned</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
