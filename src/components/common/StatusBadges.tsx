import React from 'react';
import { BookingStatus, PaymentStatus } from '../../types';

export const BookingStatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
  const configs: Record<BookingStatus, { label: string; classes: string }> = {
    pending: {
      label: 'Awaiting confirmation',
      classes: 'bg-[#F2A65A]/15 text-[#9A5B13] border-[#F2A65A]/40'
    },
    assigned: {
      label: 'Partner assigned',
      classes: 'bg-[#142D4E]/10 text-[#142D4E] border-[#142D4E]/20'
    },
    accepted: {
      label: 'Partner accepted',
      classes: 'bg-[#142D4E]/10 text-[#142D4E] border-[#142D4E]/20'
    },
    rejected: {
      label: 'Reassignment required',
      classes: 'bg-[#D94B4B]/10 text-[#D94B4B] border-[#D94B4B]/30'
    },
    in_progress: {
      label: 'Service in progress',
      classes: 'bg-[#142D4E] text-white border-[#142D4E]'
    },
    completed: {
      label: 'Completed',
      classes: 'bg-[#20A779]/15 text-[#147352] border-[#20A779]/30'
    },
    cancelled: {
      label: 'Cancelled',
      classes: 'bg-[#737D89]/10 text-[#737D89] border-[#E8EAED]'
    }
  };

  const config = configs[status] || configs.pending;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${config.classes}`}>
      {config.label}
    </span>
  );
};

export const PaymentStatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  const configs: Record<PaymentStatus, { label: string; classes: string }> = {
    unpaid: {
      label: 'Payment pending',
      classes: 'bg-[#F2A65A]/15 text-[#9A5B13] border-[#F2A65A]/40'
    },
    submitted: {
      label: 'Pending verification',
      classes: 'bg-[#F2A65A]/15 text-[#9A5B13] border-[#F2A65A]/40'
    },
    verified: {
      label: 'Payment verified',
      classes: 'bg-[#20A779]/15 text-[#147352] border-[#20A779]/30'
    },
    rejected: {
      label: 'Payment rejected',
      classes: 'bg-[#D94B4B]/10 text-[#D94B4B] border-[#D94B4B]/30'
    }
  };

  const config = configs[status] || configs.unpaid;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${config.classes}`}>
      {config.label}
    </span>
  );
};
