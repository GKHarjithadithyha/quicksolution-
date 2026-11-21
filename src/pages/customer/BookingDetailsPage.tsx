import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { bookingService } from '../../services/booking.service';
import { BookingStatusBadge, PaymentStatusBadge } from '../../components/common/StatusBadges';
import { formatCurrency } from '../../lib/utils';
import { ArrowLeft, Clock, MapPin, Phone, User, Calendar, History, ShieldCheck } from 'lucide-react';

export const BookingDetailsPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const booking = bookingService.getBookingById(bookingId || '');

  if (!booking) {
    return <div className="p-8 text-center">Booking not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/my-bookings" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> Back to My Bookings
      </Link>

      {/* Main Status Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase">Booking Ref</div>
            <div className="text-xl font-mono font-black text-slate-900">{booking.booking_number}</div>
          </div>
          <div className="flex items-center gap-2">
            <BookingStatusBadge status={booking.status} />
            <PaymentStatusBadge status={booking.payment.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-semibold">Service Name</span>
            <div className="text-base font-bold text-slate-900">{booking.service_name}</div>
            <div className="text-emerald-700 font-extrabold text-sm mt-0.5">
              {formatCurrency(booking.service_price_snapshot)}
            </div>
          </div>

          <div>
            <span className="text-slate-400 font-semibold">Scheduled Time Slot</span>
            <div className="font-bold text-slate-900 text-sm mt-0.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              {new Date(booking.scheduled_at).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Partner Assignment & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <User className="w-4 h-4 text-blue-600" />
            <span>Assigned Service Partner</span>
          </div>
          {booking.partner_name ? (
            <div className="space-y-1 text-xs">
              <div className="text-base font-bold text-slate-900">{booking.partner_name}</div>
              <div className="text-slate-600 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {booking.partner_phone}
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold mt-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Background Verified
              </div>
            </div>
          ) : (
            <div className="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
              Awaiting dispatch by operations administrator. You can switch to Admin role at the top to assign someone.
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Service Address</span>
          </div>
          <div className="text-xs text-slate-700 space-y-1">
            <p className="font-semibold text-slate-900">{booking.address}</p>
            {booking.landmark && <p className="text-slate-500">Landmark: {booking.landmark}</p>}
            <p className="text-slate-600">{booking.city} - {booking.pincode}</p>
            {booking.customer_notes && (
              <p className="text-slate-500 italic pt-1 border-t border-slate-100">
                Note: "{booking.customer_notes}"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Real-Time Status History Audit Trail (Section 5.1 & Section 7.1) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <History className="w-5 h-5 text-emerald-600" />
          <span>Booking & Dispatch Audit Trail (Realtime Log)</span>
        </div>

        <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {booking.status_history.map((hist, idx) => (
            <div key={hist.id} className="relative pl-8 text-xs space-y-1">
              <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white"></div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  {hist.new_status}
                </span>
                <span className="text-slate-400 text-[10px]">
                  {new Date(hist.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <p className="text-slate-700">{hist.note}</p>
              <div className="text-[10px] text-slate-400">By: {hist.changed_by_name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
