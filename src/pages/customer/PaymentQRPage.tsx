import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingService } from '../../services/booking.service';
import { paymentService } from '../../services/payment.service';
import { formatCurrency } from '../../lib/utils';
import { 
  QrCode, 
  Copy, 
  Check, 
  AlertCircle, 
  ShieldAlert, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export const PaymentQRPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const booking = bookingService.getBookingById(bookingId || '');

  const [transactionRef, setTransactionRef] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!booking) {
    return <div className="p-8 text-center">Booking not found</div>;
  }

  const upiId = 'homeservices.prototype@upi';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast.success('UPI ID copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionRef.trim()) {
      toast.error('Please enter the 12-digit UPI reference ID / UTR number');
      return;
    }

    setSubmitting(true);
    paymentService.submitTransactionReference(booking.id, transactionRef.trim());
    toast.success('Payment reference submitted successfully!');
    setSubmitting(false);

    navigate(`/confirmation/${booking.id}`);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-1">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Step 2 of 2: Payment
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-2">Static UPI QR Payment</h1>
        <p className="text-xs text-slate-500">Scan using any UPI App (GPay, PhonePe, Paytm, BHIM)</p>
      </div>

      {/* Payment Summary Box */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase">Booking No</div>
            <div className="text-sm font-mono font-bold text-slate-800">{booking.booking_number}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 font-semibold uppercase">Payable Amount</div>
            <div className="text-2xl font-black text-emerald-700">
              {formatCurrency(booking.service_price_snapshot)}
            </div>
          </div>
        </div>

        {/* QR Code Canvas Mockup */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div className="p-4 bg-white rounded-2xl shadow-md border border-slate-200 text-center">
            {/* SVG Generative QR Code representation */}
            <div className="w-52 h-52 bg-white flex flex-col items-center justify-center relative p-2">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                <rect x="0" y="0" width="30" height="30" fill="currentColor" rx="4" />
                <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                <rect x="10" y="10" width="10" height="10" fill="currentColor" />

                <rect x="70" y="0" width="30" height="30" fill="currentColor" rx="4" />
                <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                <rect x="80" y="10" width="10" height="10" fill="currentColor" />

                <rect x="0" y="70" width="30" height="30" fill="currentColor" rx="4" />
                <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                <rect x="10" y="80" width="10" height="10" fill="currentColor" />

                {/* Random QR Pattern Dots */}
                <rect x="40" y="5" width="8" height="8" fill="currentColor" />
                <rect x="52" y="15" width="8" height="8" fill="currentColor" />
                <rect x="40" y="25" width="8" height="8" fill="currentColor" />
                <rect x="15" y="40" width="8" height="8" fill="currentColor" />
                <rect x="28" y="48" width="8" height="8" fill="currentColor" />
                <rect x="45" y="45" width="12" height="12" fill="#059669" rx="2" />
                <rect x="65" y="40" width="8" height="8" fill="currentColor" />
                <rect x="80" y="52" width="8" height="8" fill="currentColor" />
                <rect x="40" y="65" width="8" height="8" fill="currentColor" />
                <rect x="55" y="75" width="8" height="8" fill="currentColor" />
                <rect x="75" y="70" width="8" height="8" fill="currentColor" />
                <rect x="85" y="85" width="8" height="8" fill="currentColor" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-1 rounded-md shadow border border-slate-200">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="text-[11px] font-bold text-slate-500 mt-2">SCAN & PAY WITH ANY UPI APP</div>
          </div>

          {/* Copyable UPI ID */}
          <div className="w-full flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs">
            <span className="font-mono text-slate-600 select-all">{upiId}</span>
            <button
              onClick={copyToClipboard}
              type="button"
              className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Business Rule / Instructions Note */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-blue-700" />
            Payment Process Instructions
          </div>
          <p className="text-blue-800 leading-relaxed">
            1. Open GPay / PhonePe / Paytm and scan the QR code.<br/>
            2. Pay <strong>{formatCurrency(booking.service_price_snapshot)}</strong>.<br/>
            3. Copy the 12-digit UPI Reference / UTR Number from your banking app.<br/>
            4. Paste it below and tap submit. Admin will manually verify and dispatch technician.
          </p>
        </div>

        {/* Transaction Reference Submission Form */}
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Enter 12-Digit UPI Transaction Reference / UTR Number *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 412356789012 or UPI/402839/PAY"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono tracking-wider outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            Submit Transaction Reference
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
