import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { bookingService } from '../../services/booking.service';
import { BookingStatusBadge, PaymentStatusBadge } from '../../components/common/StatusBadges';
import { BookingTimeline } from '../../components/customer/BookingTimeline';
import { EmptyState } from '../../components/customer/StateViews';
import { formatCurrency } from '../../lib/utils';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  CreditCard,
  AlertCircle
} from 'lucide-react';

export const BookingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const isConfirmationView = searchParams.get('confirmed') === 'true';

  const booking = bookingService.getBookingById(id || '');

  if (!booking) {
    return (
      <EmptyState
        title="Booking not found"
        description="We could not find a booking with this reference. Please check My Bookings."
        actionLabel="Go to My Bookings"
        actionTo="/my-bookings"
      />
    );
  }

  const formattedSchedule = booking.scheduled_date
    ? `${new Date(booking.scheduled_date + 'T00:00:00').toLocaleDateString([], {
        dateStyle: 'medium'
      })}${booking.scheduled_slot ? ` · ${booking.scheduled_slot}` : ''}`
    : new Date(booking.scheduled_at).toLocaleString([], {
        dateStyle: 'medium',
        timeStyle: 'short'
      });

  // Screen 5: Booking Confirmation View (immediately after booking creation)
  if (isConfirmationView) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="bg-white border border-[#E8EAED] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#20A779]/15 text-[#20A779] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-[28px] font-semibold text-[#142D4E]">
              Your booking has been received.
            </h1>
            <p className="text-sm text-[#737D89]">
              Please continue to payment to submit your UPI transaction reference.
            </p>
          </div>

          <div className="bg-[#F5F5F0] border border-[#E8EAED] rounded-xl p-4 sm:p-5 space-y-3 text-sm">
            <div className="flex justify-between gap-2 pb-2.5 border-b border-[#E8EAED]">
              <span className="text-[#737D89]">Booking number</span>
              <span className="font-mono font-semibold text-[#142D4E]">{booking.booking_number}</span>
            </div>
            <div className="flex justify-between gap-2 pb-2.5 border-b border-[#E8EAED]">
              <span className="text-[#737D89]">Service</span>
              <span className="font-medium text-[#202936] text-right">{booking.service_name}</span>
            </div>
            <div className="flex justify-between gap-2 pb-2.5 border-b border-[#E8EAED]">
              <span className="text-[#737D89]">Appointment</span>
              <span className="font-medium text-[#202936] text-right">{formattedSchedule}</span>
            </div>
            <div className="flex justify-between gap-2 pb-2.5 border-b border-[#E8EAED]">
              <span className="text-[#737D89]">Address</span>
              <span className="font-medium text-[#202936] text-right max-w-[230px]">
                {booking.address}, {booking.city} - {booking.pincode}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2.5 border-b border-[#E8EAED]">
              <span className="text-[#737D89]">Current status</span>
              <BookingStatusBadge status={booking.status} />
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-[#737D89] font-medium">Total amount</span>
              <span className="text-2xl font-bold text-[#202936]">
                {formatCurrency(booking.service_price_snapshot)}
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <Link
              to={`/payment/${booking.id}`}
              className="w-full qs-btn-primary text-base flex items-center justify-center"
            >
              Continue to Payment
            </Link>

            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="w-full h-12 bg-white hover:bg-[#F5F5F0] text-[#142D4E] border border-[#E8EAED] font-semibold text-sm rounded-xl transition-colors cursor-pointer"
            >
              View Booking Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Screen 8: Booking Details and Progress
  const needsPaymentAction =
    booking.payment.status === 'unpaid' || booking.payment.status === 'rejected';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/my-bookings"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#142D4E] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to My Bookings
      </Link>

      {/* Top Section: Booking Number, Service Name, Current Status */}
      <div className="bg-white border border-[#E8EAED] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-mono font-semibold text-[#737D89]">
            Booking #{booking.booking_number}
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#142D4E]">
            {booking.service_name}
          </h1>
          <div className="text-sm text-[#737D89] inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formattedSchedule}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <BookingStatusBadge status={booking.status} />
          <PaymentStatusBadge status={booking.payment.status} />
        </div>
      </div>

      {/* Payment Action Banner if unpaid or rejected */}
      {needsPaymentAction && (
        <div className="bg-[#F2A65A]/15 border border-[#F2A65A]/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#9A5B13] shrink-0 mt-0.5" />
            <div className="text-sm text-[#202936]">
              <div className="font-semibold">
                {booking.payment.status === 'rejected'
                  ? 'Payment reference could not be verified'
                  : 'Payment pending for this booking'}
              </div>
              <p className="text-xs sm:text-sm text-[#737D89] mt-0.5">
                Complete UPI payment and submit your transaction reference so we can verify it.
              </p>
            </div>
          </div>
          <Link
            to={`/payment/${booking.id}`}
            className="qs-btn-primary px-5 text-sm inline-flex items-center justify-center shrink-0"
          >
            Continue to Payment
          </Link>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Progress Timeline */}
        <section className="lg:col-span-6 bg-white border border-[#E8EAED] rounded-2xl p-5 sm:p-6 space-y-5">
          <h2 className="text-lg font-semibold text-[#142D4E]">Booking Progress</h2>
          <BookingTimeline booking={booking} />
        </section>

        {/* Additional Details */}
        <div className="lg:col-span-6 space-y-5">
          {/* Assigned Partner */}
          <section className="bg-white border border-[#E8EAED] rounded-2xl p-5 sm:p-6 space-y-3">
            <h2 className="text-base font-semibold text-[#142D4E] flex items-center gap-2">
              <User className="w-4 h-4" />
              Service Partner
            </h2>
            {booking.partner_name ? (
              <div className="space-y-1.5 text-sm">
                <div className="font-semibold text-[#202936]">{booking.partner_name}</div>
                {booking.partner_phone && (
                  <div className="text-[#737D89] inline-flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{booking.partner_phone}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-[#737D89]">
                A verified service partner will be assigned shortly.
              </p>
            )}
          </section>

          {/* Service Address */}
          <section className="bg-white border border-[#E8EAED] rounded-2xl p-5 sm:p-6 space-y-3">
            <h2 className="text-base font-semibold text-[#142D4E] flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Service Address
            </h2>
            <div className="text-sm text-[#202936] space-y-1">
              <p className="font-medium">{booking.address}</p>
              {booking.landmark && <p className="text-[#737D89]">Landmark: {booking.landmark}</p>}
              <p className="text-[#737D89]">
                {booking.city} - {booking.pincode}
              </p>
              {booking.customer_notes && (
                <p className="text-xs text-[#737D89] pt-2 border-t border-[#E8EAED] mt-2">
                  Instructions: {booking.customer_notes}
                </p>
              )}
            </div>
          </section>

          {/* Payment Details */}
          <section className="bg-white border border-[#E8EAED] rounded-2xl p-5 sm:p-6 space-y-3">
            <h2 className="text-base font-semibold text-[#142D4E] flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payment Details
            </h2>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-[#737D89]">Amount</span>
                <span className="font-bold text-lg text-[#202936]">
                  {formatCurrency(booking.payment.amount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#737D89]">Payment status</span>
                <PaymentStatusBadge status={booking.payment.status} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#737D89]">Transaction reference</span>
                <span className="font-mono font-medium text-[#202936]">
                  {booking.payment.transaction_reference || 'Not submitted'}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
