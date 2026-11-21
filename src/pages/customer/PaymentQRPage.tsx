import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { bookingService } from '../../services/booking.service';
import { paymentService } from '../../services/payment.service';
import { useAuth } from '../../features/auth/AuthContext';
import { PaymentQRPanel } from '../../components/customer/PaymentQRPanel';
import { TransactionReferenceForm } from '../../components/customer/TransactionReferenceForm';
import { PaymentStatusBadge } from '../../components/common/StatusBadges';
import { EmptyState } from '../../components/customer/StateViews';
import { formatCurrency } from '../../lib/utils';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  QrCode,
  CreditCard,
  Banknote,
  ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';

type SelectedMethod = 'UPI' | 'Card' | 'Cash';

export const PaymentQRPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [refreshTick, setRefreshTick] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<SelectedMethod>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Card form state
  const [cardName, setCardName] = useState(user?.full_name || '');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardError, setCardError] = useState('');

  // Require login right before payment
  useEffect(() => {
    if (!user && id) {
      navigate(`/login?redirect=${encodeURIComponent(`/payment/${id}`)}`, { replace: true });
    }
  }, [user, id, navigate]);

  const booking = bookingService.getBookingById(id || '');

  if (!user) return null;

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

  const handleUpiSubmit = (reference: string) => {
    setIsSubmitting(true);
    paymentService.submitPayment(booking.id, 'UPI', reference, user.id);
    toast.success('UPI payment reference submitted for verification');
    setIsSubmitting(false);
    setRefreshTick((t) => t + 1);
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digitsOnly = cardNumber.replace(/\D/g, '');
    if (!cardName.trim()) {
      setCardError('Please enter the cardholder name.');
      return;
    }
    if (digitsOnly.length < 12) {
      setCardError('Please enter a valid card number.');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(cardExpiry.trim())) {
      setCardError('Enter expiry in MM/YY format (e.g. 08/29).');
      return;
    }
    if (cardCvv.replace(/\D/g, '').length < 3) {
      setCardError('Enter a valid 3 or 4 digit CVV.');
      return;
    }

    setCardError('');
    setIsSubmitting(true);
    const last4 = digitsOnly.slice(-4);
    paymentService.submitPayment(booking.id, 'Card', `CARD-****${last4}`, user.id);
    toast.success('Card payment details submitted for confirmation');
    setIsSubmitting(false);
    setRefreshTick((t) => t + 1);
  };

  const handleCashSubmit = () => {
    setIsSubmitting(true);
    paymentService.submitPayment(booking.id, 'Cash', 'CASH-ON-SERVICE', user.id);
    toast.success('Cash on Service selected for your booking');
    setIsSubmitting(false);
    setRefreshTick((t) => t + 1);
  };

  const formatCardNumberInput = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryInput = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const isSubmitted = booking.payment.status === 'submitted';
  const isVerified = booking.payment.status === 'verified';

  const methodOptions: { id: SelectedMethod; label: string; sub: string; icon: React.ReactNode }[] = [
    { id: 'UPI', label: 'UPI', sub: 'QR / UTR', icon: <QrCode className="w-5 h-5" /> },
    { id: 'Card', label: 'Card', sub: 'Debit / Credit', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'Cash', label: 'Cash', sub: 'Pay on service', icon: <Banknote className="w-5 h-5" /> }
  ];

  return (
    <div key={refreshTick} className="max-w-xl mx-auto space-y-6 pb-8">
      <Link
        to={`/booking/${booking.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#172B4D] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Booking Details
      </Link>

      <div className="space-y-1">
        <h1 className="text-[26px] sm:text-[28px] font-bold text-[#172B4D] tracking-tight">
          Complete Your Payment
        </h1>
        <p className="text-sm text-[#475467]">
          Signed in as <strong className="text-[#172B4D]">{user.full_name}</strong> · Choose Cash, Card, or UPI
        </p>
      </div>

      {/* Main Payment Card */}
      <div className="bg-white border border-[#DDE3E8] rounded-2xl p-5 sm:p-6 space-y-6">
        {/* Booking & Amount Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#DDE3E8]">
          <div>
            <div className="text-xs font-mono text-[#667085]">
              Booking #{booking.booking_number}
            </div>
            <div className="text-base font-semibold text-[#172B4D] mt-0.5">
              {booking.service_name}
            </div>
          </div>
          <div className="text-right tabular-nums">
            <div className="text-xs text-[#667085]">Amount payable</div>
            <div className="text-2xl font-bold text-[#172B4D]">
              {formatCurrency(booking.service_price_snapshot)}
            </div>
          </div>
        </div>

        {/* Submitted State */}
        {isSubmitted && (
          <div className="bg-[#FEF3C7]/60 border border-[#F59E0B]/40 rounded-xl p-5 space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#9A6700] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-[#172B4D]">
                  {booking.payment.method === 'Cash'
                    ? 'Cash on Service confirmed.'
                    : 'Payment submitted for verification.'}
                </h2>
                <p className="text-sm text-[#475467] leading-relaxed">
                  {booking.payment.method === 'Cash' ? (
                    <>
                      Please pay{' '}
                      <strong className="text-[#172B4D]">
                        {formatCurrency(booking.service_price_snapshot)}
                      </strong>{' '}
                      in cash directly to the technician after service completion.
                    </>
                  ) : (
                    <>
                      We recorded your <strong>{booking.payment.method}</strong> reference{' '}
                      <strong className="font-mono text-[#172B4D]">
                        {booking.payment.transaction_reference}
                      </strong>
                      . Status will update once verified.
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#F59E0B]/25">
              <PaymentStatusBadge status={booking.payment.status} />
              <Link
                to={`/booking/${booking.id}`}
                className="text-sm font-bold text-[#172B4D] hover:underline"
              >
                Track Booking Progress →
              </Link>
            </div>
          </div>
        )}

        {/* Verified State */}
        {isVerified && (
          <div className="bg-[#ECFDF3] border border-[#16794B]/30 rounded-xl p-5 space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#16794B] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-[#172B4D]">Payment verified</h2>
                <p className="text-sm text-[#475467]">
                  Method: <strong>{booking.payment.method}</strong> · Ref:{' '}
                  <span className="font-mono font-semibold text-[#172B4D]">
                    {booking.payment.transaction_reference}
                  </span>
                </p>
              </div>
            </div>
            <Link
              to={`/booking/${booking.id}`}
              className="qs-btn-primary px-5 text-sm inline-flex items-center justify-center"
            >
              View Booking Details
            </Link>
          </div>
        )}

        {/* Payment Method Selector + Form when unpaid or rejected */}
        {!isSubmitted && !isVerified && (
          <div className="space-y-6">
            {/* Method Picker: UPI / Card / Cash */}
            <div className="space-y-2.5">
              <span className="block text-sm font-semibold text-[#172B4D]">
                Select Payment Method
              </span>
              <div className="grid grid-cols-3 gap-2.5" role="radiogroup" aria-label="Payment method">
                {methodOptions.map((opt) => {
                  const active = selectedMethod === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSelectedMethod(opt.id)}
                      className={`min-h-[76px] p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        active
                          ? 'bg-[#B9FF66] border-[#172B4D] text-[#172B4D] shadow-xs'
                          : 'bg-[#F7F9F4] border-[#DDE3E8] text-[#475467] hover:border-[#172B4D]'
                      }`}
                    >
                      {opt.icon}
                      <span className="text-sm font-bold leading-tight">{opt.label}</span>
                      <span className="text-[11px] opacity-80 leading-tight">{opt.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Option 1: UPI QR */}
            {selectedMethod === 'UPI' && (
              <div className="space-y-5">
                <PaymentQRPanel />

                <div className="space-y-2 text-sm">
                  <h2 className="font-semibold text-[#172B4D]">UPI payment instructions</h2>
                  <ol className="list-decimal list-inside space-y-1.5 text-[#475467]">
                    <li>Open GPay, PhonePe, Paytm, or any UPI app.</li>
                    <li>Scan the QR code or copy the UPI ID above.</li>
                    <li>Pay exact amount ({formatCurrency(booking.service_price_snapshot)}).</li>
                    <li>Enter the UPI transaction reference / UTR number below.</li>
                  </ol>
                </div>

                <div className="pt-2 border-t border-[#DDE3E8]">
                  <TransactionReferenceForm
                    initialValue={booking.payment.transaction_reference || ''}
                    onSubmit={handleUpiSubmit}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
            )}

            {/* Option 2: Card */}
            {selectedMethod === 'Card' && (
              <form onSubmit={handleCardSubmit} className="space-y-4">
                {cardError && (
                  <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#B42318]/25 text-xs sm:text-sm text-[#B42318]">
                    {cardError}
                  </div>
                )}

                <div>
                  <label htmlFor="card-name" className="block text-sm font-medium text-[#172B4D] mb-1.5">
                    Cardholder name
                  </label>
                  <input
                    id="card-name"
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name on card"
                    className="w-full h-12 px-4 bg-white border border-[#DDE3E8] rounded-xl text-base text-[#172B4D] outline-none focus:border-[#172B4D]"
                  />
                </div>

                <div>
                  <label htmlFor="card-number" className="block text-sm font-medium text-[#172B4D] mb-1.5">
                    Card number
                  </label>
                  <input
                    id="card-number"
                    type="text"
                    inputMode="numeric"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumberInput(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    className="w-full h-12 px-4 bg-white border border-[#DDE3E8] rounded-xl text-base font-mono text-[#172B4D] outline-none focus:border-[#172B4D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="card-expiry" className="block text-sm font-medium text-[#172B4D] mb-1.5">
                      Expiry (MM/YY)
                    </label>
                    <input
                      id="card-expiry"
                      type="text"
                      inputMode="numeric"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiryInput(e.target.value))}
                      placeholder="08/29"
                      className="w-full h-12 px-4 bg-white border border-[#DDE3E8] rounded-xl text-base font-mono text-[#172B4D] outline-none focus:border-[#172B4D]"
                    />
                  </div>
                  <div>
                    <label htmlFor="card-cvv" className="block text-sm font-medium text-[#172B4D] mb-1.5">
                      CVV
                    </label>
                    <input
                      id="card-cvv"
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      required
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="•••"
                      className="w-full h-12 px-4 bg-white border border-[#DDE3E8] rounded-xl text-base font-mono text-[#172B4D] outline-none focus:border-[#172B4D]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#667085] bg-[#F7F9F4] p-3 rounded-xl border border-[#DDE3E8]">
                  <ShieldCheck className="w-4 h-4 text-[#16794B] shrink-0" />
                  <span>Card details are validated securely and never stored in browser storage.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full qs-btn-primary text-base"
                >
                  {isSubmitting
                    ? 'Processing...'
                    : `Pay ${formatCurrency(booking.service_price_snapshot)} by Card`}
                </button>
              </form>
            )}

            {/* Option 3: Cash */}
            {selectedMethod === 'Cash' && (
              <div className="space-y-5">
                <div className="bg-[#EEF3EC] border border-[#DDE3E8] rounded-2xl p-5 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-[#172B4D] font-semibold">
                    <Banknote className="w-5 h-5 text-[#16794B]" />
                    <span>Cash on Service</span>
                  </div>
                  <p className="text-sm text-[#475467] leading-relaxed">
                    Pay{' '}
                    <strong className="text-[#172B4D]">
                      {formatCurrency(booking.service_price_snapshot)}
                    </strong>{' '}
                    in cash directly to the service professional once your service is completed.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleCashSubmit}
                  className="w-full qs-btn-primary text-base"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Cash on Service'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
