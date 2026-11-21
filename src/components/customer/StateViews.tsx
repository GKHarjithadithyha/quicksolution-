import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Inbox } from 'lucide-react';

export const EmptyState: React.FC<{
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
}> = ({ title, description, actionLabel, actionTo, onAction }) => {
  return (
    <div className="bg-white border border-[#E8EAED] rounded-2xl p-8 sm:p-12 text-center space-y-3">
      <div className="w-12 h-12 rounded-xl bg-[#F5F5F0] text-[#737D89] flex items-center justify-center mx-auto">
        <Inbox className="w-6 h-6" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-[#202936]">{title}</h3>
      <p className="text-sm text-[#737D89] max-w-md mx-auto">{description}</p>
      {actionLabel && actionTo && (
        <div className="pt-2">
          <Link
            to={actionTo}
            className="inline-flex items-center justify-center qs-btn-primary px-5 text-sm"
          >
            {actionLabel}
          </Link>
        </div>
      )}
      {actionLabel && onAction && !actionTo && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center justify-center qs-btn-primary px-5 text-sm"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export const ErrorState: React.FC<{
  title?: string;
  description?: string;
  onRetry?: () => void;
}> = ({
  title = 'Something went wrong',
  description = 'We could not load this information right now. Please try again.',
  onRetry
}) => {
  return (
    <div className="bg-white border border-[#D94B4B]/30 rounded-2xl p-8 text-center space-y-3">
      <div className="w-12 h-12 rounded-xl bg-[#D94B4B]/10 text-[#D94B4B] flex items-center justify-center mx-auto">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-[#202936]">{title}</h3>
      <p className="text-sm text-[#737D89] max-w-md mx-auto">{description}</p>
      {onRetry && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center justify-center h-11 px-5 bg-[#142D4E] hover:bg-[#0F233D] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white border border-[#E8EAED] rounded-2xl overflow-hidden animate-pulse">
          <div className="aspect-[16/10] bg-[#E8EAED]" />
          <div className="p-5 space-y-3">
            <div className="h-5 bg-[#E8EAED] rounded w-3/4" />
            <div className="h-4 bg-[#E8EAED] rounded w-full" />
            <div className="h-6 bg-[#E8EAED] rounded w-1/3" />
            <div className="h-11 bg-[#E8EAED] rounded-xl w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
