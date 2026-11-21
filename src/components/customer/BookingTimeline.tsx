import React from 'react';
import { Booking } from '../../types';
import { Check, Clock, AlertCircle } from 'lucide-react';

interface TimelineStep {
  key: string;
  label: string;
  state: 'completed' | 'pending' | 'attention';
  detail?: string;
}

export const BookingTimeline: React.FC<{ booking: Booking }> = ({ booking }) => {
  const statusRank: Record<string, number> = {
    pending: 0,
    rejected: 0,
    assigned: 1,
    accepted: 2,
    in_progress: 3,
    completed: 4,
    cancelled: -1
  };

  const rank = statusRank[booking.status] ?? 0;

  const paymentVerified = booking.payment.status === 'verified';
  const paymentSubmitted = booking.payment.status === 'submitted';
  const paymentRejected = booking.payment.status === 'rejected';

  const steps: TimelineStep[] = [
    {
      key: 'received',
      label: 'Booking received',
      state: 'completed',
      detail: new Date(booking.created_at).toLocaleString([], {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    },
    {
      key: 'payment',
      label: 'Payment verified',
      state: paymentVerified
        ? 'completed'
        : paymentRejected
        ? 'attention'
        : 'pending',
      detail: paymentVerified
        ? booking.payment.verified_at
          ? `Verified on ${new Date(booking.payment.verified_at).toLocaleString([], {
              dateStyle: 'medium',
              timeStyle: 'short'
            })}`
          : 'Verified'
        : paymentSubmitted
        ? 'Payment reference submitted — awaiting verification'
        : paymentRejected
        ? 'Payment reference was rejected — please resubmit'
        : 'Awaiting payment submission'
    },
    {
      key: 'assigned',
      label: 'Partner assigned',
      state:
        rank >= 1 && booking.partner_name
          ? 'completed'
          : booking.status === 'rejected'
          ? 'attention'
          : 'pending',
      detail:
        rank >= 1 && booking.partner_name
          ? `${booking.partner_name} assigned`
          : booking.status === 'rejected'
          ? 'Reassignment in progress'
          : 'Awaiting partner assignment'
    },
    {
      key: 'accepted',
      label: 'Partner accepted',
      state: rank >= 2 ? 'completed' : 'pending',
      detail: rank >= 2 ? 'Partner confirmed your appointment' : 'Waiting for partner confirmation'
    },
    {
      key: 'started',
      label: 'Service started',
      state: rank >= 3 ? 'completed' : 'pending',
      detail: rank >= 3 ? 'Work is underway at your address' : 'Not started yet'
    },
    {
      key: 'completed',
      label: 'Service completed',
      state: rank >= 4 ? 'completed' : 'pending',
      detail: rank >= 4 ? 'Service completed' : 'Pending completion'
    }
  ];

  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <div key={step.key} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && (
              <div
                className={`absolute left-[13px] top-7 bottom-0 w-0.5 ${
                  step.state === 'completed' ? 'bg-[#20A779]' : 'bg-[#E8EAED]'
                }`}
              />
            )}

            <div
              className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                step.state === 'completed'
                  ? 'bg-[#20A779] border-[#20A779] text-white'
                  : step.state === 'attention'
                  ? 'bg-[#D94B4B]/10 border-[#D94B4B] text-[#D94B4B]'
                  : 'bg-white border-[#E8EAED] text-[#737D89]'
              }`}
            >
              {step.state === 'completed' ? (
                <Check className="w-4 h-4" />
              ) : step.state === 'attention' ? (
                <AlertCircle className="w-4 h-4" />
              ) : (
                <Clock className="w-3.5 h-3.5" />
              )}
            </div>

            <div className="pt-0.5">
              <div
                className={`text-sm font-medium ${
                  step.state === 'completed'
                    ? 'text-[#202936]'
                    : step.state === 'attention'
                    ? 'text-[#D94B4B]'
                    : 'text-[#737D89]'
                }`}
              >
                {step.label}
              </div>
              {step.detail && (
                <div className="text-xs text-[#737D89] mt-0.5">{step.detail}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
