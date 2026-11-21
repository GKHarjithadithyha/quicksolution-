import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bookingService } from '../../services/booking.service';
import { paymentService } from '../../services/payment.service';
import { PaymentQRPanel } from '../../components/customer/PaymentQRPanel';
import { TransactionReferenceForm } from '../../components/customer/TransactionReferenceForm';
import { PaymentStatusBadge } from '../../components/common/StatusBadges';
import { EmptyState } from '../../components/customer/StateViews';
import { formatCurrency } from '../../lib/utils';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const PaymentQRPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [refreshTick, setRefreshTick] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const booking = bookingService.getBookingById(id || '');

  if (!booking) {
    return (
      <EmptyState
        title="Booking not found"
        description="We could not locate this booking for payment."
        actionLabel="Go to My Bookings"
        actionTo="/my-bookings"
      />
    );
  }

  const handleReferenceSubmit = (reference: string) => {
    setIsSubmitting(true);
    paymentService.submitTransactionReference(booking.id, reference);
    toast.success('Payment submitted for verification');
    setIsSubmitting(false);
    setRefreshTick((t) => t + 1);
  };

  const isSubmitted = booking.payment.status === 'submitted';
  const isVerified = booking.payment.status === 'verified';

  return (
    <div key={refreshTick} className="max-w-xl mx-auto space-y-6">
      <Link
        to={`/booking/${booking.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#142D4E] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Booking Details
      </Link>

      <div className="space-y-1">
        <h1 className="text-[28px] font-semibold text-[#142D4E] tracking-tight">
          Complete Your Payment
        </h1>
        <p className="text-sm text-[#737D89]">
          Pay via UPI QR and enter your transaction reference below
        </p>
      </div>

      {/* Booking & Amount Summary */}
      <div className="bg-white border border-[#E8EAED] rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E8EAED]">
          <div>
            <div className="text-xs font-mono text-[#737D89]">
              Booking #{booking.booking_number}
            </div>
            <div className="text-base font-medium text-[#202936] mt-0.5">
              {booking.service_name}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-[#737D89]">Amount payable</div>
            <div className="text-2xl font-bold text-[#142D4E]">
              {formatCurrency(booking.service_price_snapshot)}
            </div>
          </div>
        </div>

        {/* Submitted / Verified State */}
        {isSubmitted && (
          <div className="bg-[#F2A65A]/15 border border-[#F2A65A]/40 rounded-xl p-5 space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#9A5B13] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-[#202936]">
                  Payment submitted for verification.
                </h2>
                <p className="text-sm text-[#737D89] leading-relaxed">
                  We have recorded your UPI reference{' '}
                  <strong className="font-mono text-[#202936]">
                    {booking.payment.transaction_reference}
                  </strong>
                  . An administrator will verify the transaction shortly.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#F2A65A]/30">
              <PaymentStatusBadge status={booking.payment.status} />
              <Link
                to={`/booking/${booking.id}`}
                className="text-sm font-semibold text-[#142D4E] hover:underline"
              >
                Track Booking Progress →
              </Link>
            </div>
          </div>
        )}

        {isVerified && (
          <div className="bg-[#20A779]/15 border border-[#20A779]/30 rounded-xl p-5 space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#20A779] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-[#202936]">
                  Payment verified
                </h2>
                <p className="text-sm text-[#737D89]">
                  Reference <span className="font-mono font-medium text-[#202936]">{booking.payment.transaction_reference}</span> has been verified.
                </p>
              </div>
            </div>
            <Link
              to={`/booking/${booking.id}`}
              className="inline-flex items-center justify-center h-11 px-5 bg-[#142D4E] text-white text-sm font-semibold rounded-xl"
            >
              View Booking Details
            </Link>
          </div>
        )}

        {/* QR Code + Instructions + Reference Form when unpaid or rejected */}
        {!isSubmitted && !isVerified && (
          <>
            <PaymentQRPanel />

            <div className="space-y-2.5 text-sm">
              <h2 className="font-semibold text-[#142D4E]">Payment instructions</h2>
              <ol className="list-decimal list-inside space-y-1.5 text-[#737D89]">
                <li>Open any supported UPI payment application.</li>
                <li>Scan the displayed QR code.</li>
                <li>Verify the payment amount ({formatCurrency(booking.service_price_snapshot)}) and recipient.</li>
                <li>Complete payment.</li>
                <li>Return to this page and enter the transaction reference.</li>
              </ol>
            </div>

            <div className="pt-2 border-t border-[#E8EAED]">
              <TransactionReferenceForm
                initialValue={booking.payment.transaction_reference || ''}
                onSubmit={handleReferenceSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
