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
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280]">
        <span className="w-2 h-2 rounded-full bg-gray-400" />
        {label || 'Currently unavailable'}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#15803D]">
      <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
      {label || 'Available Now'}
    </span>
  );
};
