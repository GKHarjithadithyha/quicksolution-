import React from 'react';
import { BookingStatus, PaymentStatus } from '../../types';

export const BookingStatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
  const configs: Record<BookingStatus, { label: string; bg: string; text: string; border: string }> = {
    pending: { label: 'Pending Assignment', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    assigned: { label: 'Partner Assigned', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    accepted: { label: 'Partner Confirmed', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
    rejected: { label: 'Needs Reassignment', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
    in_progress: { label: 'Service In Progress', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    completed: { label: 'Completed', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    cancelled: { label: 'Cancelled', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' }
  };

  const config = configs[status] || configs.pending;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
      {config.label}
    </span>
  );
};

export const PaymentStatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  const configs: Record<PaymentStatus, { label: string; bg: string; text: string; border: string }> = {
    unpaid: { label: 'Unpaid / Pending Ref', bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' },
    submitted: { label: 'Ref Submitted (Pending Admin)', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    verified: { label: 'Payment Verified', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    rejected: { label: 'Payment Rejected', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' }
  };

  const config = configs[status] || configs.unpaid;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
      {config.label}
    </span>
  );
};
