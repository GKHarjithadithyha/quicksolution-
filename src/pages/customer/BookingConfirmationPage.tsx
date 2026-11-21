import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { bookingService } from '../../services/booking.service';
import { BookingStatusBadge, PaymentStatusBadge } from '../../components/common/StatusBadges';
import { formatCurrency } from '../../lib/utils';
import { CheckCircle2, Clock, MapPin, User, ArrowRight, ShieldCheck } from 'lucide-react';

export const BookingConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const booking = bookingService.getBookingById(bookingId || '');

  if (!booking) {
    return <div className="p-8 text-center">Booking not found</div>;
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Success Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            Booking Received
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Thank You, {booking.customer_name}!</h1>
          <p className="text-xs text-slate-500 mt-1">
            Your service request is confirmed in our system with booking reference:
          </p>
          <div className="mt-2 inline-block font-mono font-bold text-base bg-slate-100 text-slate-800 px-4 py-1.5 rounded-xl border border-slate-200">
            {booking.booking_number}
          </div>
        </div>

        {/* Current Status Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <BookingStatusBadge status={booking.status} />
          <PaymentStatusBadge status={booking.payment.status} />
        </div>

        {/* Details Box */}
        <div className="text-left bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3 text-xs">
          <div className="flex justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Service</span>
            <span className="font-bold text-slate-800">{booking.service_name}</span>
          </div>

          <div className="flex justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Scheduled For</span>
            <span className="font-bold text-slate-800">{new Date(booking.scheduled_at).toLocaleString()}</span>
          </div>

          <div className="flex justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Address</span>
            <span className="font-medium text-slate-800 text-right max-w-xs">{booking.address}, {booking.city}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">UPI Ref Submitted</span>
            <span className="font-mono font-bold text-emerald-800">{booking.payment.transaction_reference || 'Awaiting'}</span>
          </div>
        </div>

        {/* Workflow indicator */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 text-left space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-700" />
            Next Step: Administrator Verification & Partner Allocation
          </div>
          <p className="text-emerald-800 leading-relaxed text-[11px]">
            Our dispatch operations team is verifying your payment and assigning an expert partner in your area. You can switch to the <strong>Admin Role</strong> via the top simulator to verify payment and assign a partner right now!
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            to="/my-bookings"
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            Track in My Bookings
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/"
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors text-center"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
