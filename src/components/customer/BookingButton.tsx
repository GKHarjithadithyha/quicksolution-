import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface BookingButtonProps {
  to?: string;
  onClick?: () => void;
  label?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export const BookingButton: React.FC<BookingButtonProps> = ({
  to,
  onClick,
  label = 'Book Now',
  fullWidth = true,
  size = 'md',
  disabled = false,
  type = 'button'
}) => {
  const sizeClasses =
    size === 'lg'
      ? 'min-h-[48px] px-6 text-base'
      : size === 'sm'
      ? 'min-h-[44px] px-4 text-sm'
      : 'min-h-[48px] px-5 text-sm';

  const baseClasses = `inline-flex items-center justify-center gap-1.5 font-semibold rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] active:bg-[#15803D] disabled:opacity-60 text-white transition-all cursor-pointer ${sizeClasses} ${
    fullWidth ? 'w-full' : ''
  }`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        <span>{label}</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      <span>{label}</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  );
};
