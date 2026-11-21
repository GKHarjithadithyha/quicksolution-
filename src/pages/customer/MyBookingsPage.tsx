import React from 'react';
import { Link } from 'react-router-dom';
import { bookingService } from '../../services/booking.service';
import { useAuth } from '../../features/auth/AuthContext';
import { BookingStatusBadge, PaymentStatusBadge } from '../../components/common/StatusBadges';
import { formatCurrency } from '../../lib/utils';
import { Calendar, Clock, MapPin, ChevronRight, User, AlertCircle } from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const { user } = useAuth();
  const bookings = bookingService.getBookings(); // Show all active bookings for easy demo exploration

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900">My Bookings</h1>
        <p className="text-sm text-slate-500">Track current status, assigned technicians, and service history</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No active bookings yet</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">Explore our catalogue and book an on-demand technician</p>
          <Link
            to="/services"
            className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-700 transition-colors"
          >
            Explore Services
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                    {booking.booking_number}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">
                    Created {new Date(booking.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <BookingStatusBadge status={booking.status} />
                  <PaymentStatusBadge status={booking.payment.status} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 uppercase font-semibold text-[10px]">Service</span>
                  <h3 className="font-bold text-sm text-slate-900 mt-0.5">{booking.service_name}</h3>
                  <div className="text-emerald-700 font-extrabold text-sm mt-0.5">
                    {formatCurrency(booking.service_price_snapshot)}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 uppercase font-semibold text-[10px]">Schedule & Location</span>
                  <div className="flex items-center gap-1.5 font-medium text-slate-800 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(booking.scheduled_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 mt-1 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{booking.address}, {booking.city}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 uppercase font-semibold text-[10px]">Assigned Partner</span>
                  {booking.partner_name ? (
                    <div className="mt-0.5">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        {booking.partner_name}
                      </div>
                      <div className="text-slate-500 text-[11px]">{booking.partner_phone}</div>
                    </div>
                  ) : (
                    <div className="text-amber-700 font-medium mt-0.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Pending admin dispatch
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {booking.status_history[0]?.note || 'Order placed'}
                </span>

                <Link
                  to={`/booking/${booking.id}`}
                  className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  View Details & Audit Trail <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
