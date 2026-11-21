import React, { useState } from 'react';
import { adminService } from '../../services/admin.service';
import { partnerService } from '../../services/partner.service';
import { useAuth } from '../../features/auth/AuthContext';
import { BookingStatusBadge, PaymentStatusBadge } from '../../components/common/StatusBadges';
import { formatCurrency } from '../../lib/utils';
import { Booking, PartnerProfile } from '../../types';
import { UserCheck, Clock, MapPin, Search, Filter, Phone, Check } from 'lucide-react';
import { toast } from 'sonner';

export const AdminBookingsPage: React.FC = () => {
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBookingForAssignment, setSelectedBookingForAssignment] = useState<Booking | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const bookings = adminService.getAllBookings();
  const partners = partnerService.getPartners().filter(p => p.is_active);

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = filterStatus === 'all' || b.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      b.booking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.service_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAssignPartner = (partnerId: string) => {
    if (!selectedBookingForAssignment) return;
    adminService.assignPartner(selectedBookingForAssignment.id, partnerId, user.id);
    toast.success('Technician assigned successfully! Dispatched to partner console.');
    setSelectedBookingForAssignment(null);
    setRefreshKey(k => k + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Bookings & Dispatch Operations</h1>
          <p className="text-xs text-slate-500">Monitor all customer requests and assign verified partners</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer, booking ref, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Assignment</option>
            <option value="assigned">Assigned</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected (Needs Reassign)</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5">Booking / Date</th>
                <th className="p-3.5">Customer & Address</th>
                <th className="p-3.5">Service & Amount</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5">Booking Status</th>
                <th className="p-3.5">Assigned Partner</th>
                <th className="p-3.5 text-right">Dispatch Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No bookings found matching filters.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-medium">
                      <div className="font-mono font-bold text-slate-800">{b.booking_number}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {new Date(b.scheduled_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{b.customer_name}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" /> {b.customer_phone}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-xs mt-0.5">
                        {b.address}, {b.city}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-medium text-slate-800">{b.service_name}</div>
                      <div className="font-bold text-purple-700 mt-0.5">
                        {formatCurrency(b.service_price_snapshot)}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <PaymentStatusBadge status={b.payment.status} />
                      {b.payment.transaction_reference && (
                        <div className="font-mono text-[10px] text-slate-500 mt-0.5 truncate max-w-[120px]">
                          Ref: {b.payment.transaction_reference}
                        </div>
                      )}
                    </td>

                    <td className="p-3.5">
                      <BookingStatusBadge status={b.status} />
                    </td>

                    <td className="p-3.5">
                      {b.partner_name ? (
                        <div>
                          <div className="font-bold text-slate-900">{b.partner_name}</div>
                          <div className="text-[10px] text-slate-400">{b.partner_phone}</div>
                        </div>
                      ) : (
                        <span className="text-rose-600 font-bold text-[11px] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          Unassigned
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedBookingForAssignment(b)}
                        className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                      >
                        {b.partner_id ? 'Reassign' : 'Assign Partner'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Modal Drawer */}
      {selectedBookingForAssignment && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Assign Field Partner</h3>
                <p className="text-xs text-slate-500">
                  Booking #{selectedBookingForAssignment.booking_number} ({selectedBookingForAssignment.service_name})
                </p>
              </div>
              <button
                onClick={() => setSelectedBookingForAssignment(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {partners.map((p) => {
                const isCurrent = selectedBookingForAssignment.partner_id === p.id;
                return (
                  <div
                    key={p.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isCurrent ? 'border-purple-500 bg-purple-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        {p.full_name}
                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded font-semibold text-slate-600">
                          {p.rating} ★
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{p.skills.join(', ')}</div>
                      <div className="text-[10px] text-emerald-700 font-medium mt-0.5">{p.availability}</div>
                    </div>

                    <button
                      onClick={() => handleAssignPartner(p.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                        isCurrent 
                          ? 'bg-slate-200 text-slate-700' 
                          : 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm'
                      }`}
                    >
                      {isCurrent ? 'Current' : 'Select & Dispatch'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
