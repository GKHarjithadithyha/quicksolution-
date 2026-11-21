import React from 'react';

interface AvailabilityBadgeProps {
  isAvailable?: boolean;
  label?: string;
}

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({
  isAvailable = true,
  label
}) => {
  if (!isAvailable) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#667085]">
        <span className="w-2 h-2 rounded-full bg-[#667085]" />
        {label || 'Currently unavailable'}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16794B]">
      <span className="w-2 h-2 rounded-full bg-[#16794B]" />
      {label || 'Available Now'}
    </span>
  );
};
