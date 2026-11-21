import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookingService } from '../../services/booking.service';
import { useAuth } from '../../features/auth/AuthContext';
import { BookingStatusBadge, PaymentStatusBadge } from '../../components/common/StatusBadges';
import { EmptyState } from '../../components/customer/StateViews';
import { formatCurrency } from '../../lib/utils';
import { Calendar, User, ChevronRight } from 'lucide-react';

type BookingTab = 'all' | 'active' | 'completed' | 'cancelled';

export const MyBookingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<BookingTab>('all');

  const allBookings = bookingService.getBookings();

  const filteredBookings = useMemo(() => {
    return allBookings.filter((b) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'active') {
        return b.status !== 'completed' && b.status !== 'cancelled';
      }
      if (activeTab === 'completed') return b.status === 'completed';
      if (activeTab === 'cancelled') return b.status === 'cancelled';
      return true;
    });
  }, [allBookings, activeTab]);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto">
        <EmptyState
          title="Sign in to view your bookings"
          description="Track active service requests, check payment verification status, and view past bookings."
          actionLabel="Sign In"
          actionTo="/login?redirect=/my-bookings"
        />
      </div>
    );
  }

  const tabs: { id: BookingTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-[28px] sm:text-[32px] font-semibold text-[#142D4E] tracking-tight">
          My Bookings
        </h1>
        <p className="text-sm text-[#737D89] mt-1">
          Manage and follow your current and previous service requests
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8EAED] overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'border-[#142D4E] text-[#142D4E] font-semibold'
                  : 'border-transparent text-[#737D89] hover:text-[#202936]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Bookings List or Empty State */}
      {filteredBookings.length === 0 ? (
        <EmptyState
          title={
            activeTab === 'active'
              ? 'No active bookings'
              : activeTab === 'completed'
              ? 'No completed bookings yet'
              : activeTab === 'cancelled'
              ? 'No cancelled bookings'
              : 'You have not made any bookings yet'
          }
          description="Browse available home services to schedule your first appointment."
          actionLabel="Explore Services"
          actionTo="/services"
        />
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const formattedDate = booking.scheduled_date
              ? `${new Date(booking.scheduled_date + 'T00:00:00').toLocaleDateString([], {
                  dateStyle: 'medium'
                })}${booking.scheduled_slot ? ` · ${booking.scheduled_slot}` : ''}`
              : new Date(booking.scheduled_at).toLocaleString([], {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                });

            return (
              <div
                key={booking.id}
                className="bg-white border border-[#E8EAED] rounded-2xl p-5 space-y-4 hover:border-[#142D4E]/40 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E8EAED]">
                  <span className="font-mono text-xs font-semibold text-[#737D89]">
                    Booking #{booking.booking_number}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <BookingStatusBadge status={booking.status} />
                    <PaymentStatusBadge status={booking.payment.status} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-[#737D89]">Service</div>
                    <div className="font-medium text-base text-[#202936] mt-0.5">
                      {booking.service_name}
                    </div>
                    <div className="font-bold text-lg text-[#142D4E] mt-1">
                      {formatCurrency(booking.service_price_snapshot)}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-[#737D89]">Appointment</div>
                    <div className="text-[#202936] font-medium mt-1 flex items-start gap-1.5">
                      <Calendar className="w-4 h-4 text-[#737D89] shrink-0 mt-0.5" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-[#737D89]">Partner assignment</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[#202936] font-medium">
                      <User className="w-4 h-4 text-[#737D89] shrink-0" />
                      <span>{booking.partner_name || 'Not assigned yet'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8EAED] flex flex-wrap items-center justify-between gap-3">
                  {booking.payment.status === 'unpaid' ? (
                    <Link
                      to={`/payment/${booking.id}`}
                      className="text-sm font-semibold text-[#142D4E] hover:underline"
                    >
                      Complete Payment →
                    </Link>
                  ) : (
                    <span className="text-xs text-[#737D89]">
                      Last updated {new Date(booking.updated_at).toLocaleDateString()}
                    </span>
                  )}

                  <Link
                    to={`/booking/${booking.id}`}
                    className="inline-flex items-center gap-1 h-10 px-4 rounded-xl bg-[#F5F5F0] hover:bg-[#E8EAED] text-[#142D4E] text-sm font-semibold transition-colors"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
