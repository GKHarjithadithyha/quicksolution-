import React from 'react';
import { BookingStatus, PaymentStatus } from '../../types';

export const BookingStatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
  const configs: Record<BookingStatus, { label: string; classes: string }> = {
    pending: {
      label: 'Awaiting confirmation',
      classes: 'bg-[#FEF3C7] text-[#9A6700] border-[#F59E0B]/30'
    },
    assigned: {
      label: 'Partner assigned',
      classes: 'bg-[#EEF3EC] text-[#172B4D] border-[#DDE3E8]'
    },
    accepted: {
      label: 'Partner accepted',
      classes: 'bg-[#EEF3EC] text-[#172B4D] border-[#DDE3E8]'
    },
    rejected: {
      label: 'Reassignment required',
      classes: 'bg-[#FEF2F2] text-[#B42318] border-[#B42318]/25'
    },
    in_progress: {
      label: 'Service in progress',
      classes: 'bg-[#172B4D] text-[#B9FF66] border-[#172B4D]'
    },
    completed: {
      label: 'Completed',
      classes: 'bg-[#ECFDF3] text-[#16794B] border-[#16794B]/25'
    },
    cancelled: {
      label: 'Cancelled',
      classes: 'bg-[#F3F4F6] text-[#475467] border-[#DDE3E8]'
    }
  };

  const config = configs[status] || configs.pending;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${config.classes}`}>
      {config.label}
    </span>
  );
};

export const PaymentStatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  const configs: Record<PaymentStatus, { label: string; classes: string }> = {
    unpaid: {
      label: 'Payment pending',
      classes: 'bg-[#FEF3C7] text-[#9A6700] border-[#F59E0B]/30'
    },
    submitted: {
      label: 'Pending verification',
      classes: 'bg-[#FEF3C7] text-[#9A6700] border-[#F59E0B]/30'
    },
    verified: {
      label: 'Payment verified',
      classes: 'bg-[#ECFDF3] text-[#16794B] border-[#16794B]/25'
    },
    rejected: {
      label: 'Payment rejected',
      classes: 'bg-[#FEF2F2] text-[#B42318] border-[#B42318]/25'
    }
  };

  const config = configs[status] || configs.unpaid;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${config.classes}`}>
      {config.label}
    </span>
  );
};
