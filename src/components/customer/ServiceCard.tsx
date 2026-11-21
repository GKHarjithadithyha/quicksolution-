import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { RatingStars } from './RatingStars';
import { AvailabilityBadge } from './AvailabilityBadge';
import { BookingButton } from './BookingButton';
import { BackgroundVideo } from './BackgroundVideo';
import { Clock, Users } from 'lucide-react';

export const ServicePrice: React.FC<{ price: number; duration?: number; size?: 'md' | 'lg' }> = ({
  price,
  duration,
  size = 'md'
}) => {
  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span
        className={`font-bold text-[#1E3A8A] ${
          size === 'lg' ? 'text-2xl' : 'text-xl'
        }`}
      >
        {formatCurrency(price)}
      </span>
      {duration !== undefined && (
        <span className="text-xs text-[#6B7280] inline-flex items-center gap-1">
          <span>·</span>
          <Clock className="w-3.5 h-3.5" />
          <span>{duration} mins</span>
        </span>
      )}
    </div>
  );
};

export const ServiceCard: React.FC<{
  service: ServiceItem;
  categoryName?: string;
}> = ({ service, categoryName }) => {
  const bookingCount = service.booking_count || 0;

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-0.5 hover:border-[#16A34A]/50 transition-all duration-300">
      {/* Service Media: Looping Background Video with Photo Poster */}
      <Link
        to={`/services/${service.id}`}
        className="relative block aspect-[4/3] bg-[#E8F5EE] overflow-hidden"
      >
        <BackgroundVideo
          src={service.video_url}
          poster={service.image_url}
          alt={service.name}
          autoPlayAlways
          className="w-full h-full object-cover"
        />

        {service.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase glass-dark text-white">
            {service.badge}
          </span>
        )}
      </Link>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-2">
          {categoryName && (
            <div className="text-[11px] font-semibold text-[#15803D] uppercase tracking-wide">
              {categoryName}
            </div>
          )}

          <Link to={`/services/${service.id}`}>
            <h3 className="text-base font-semibold text-[#1E3A8A] hover:text-[#16A34A] transition-colors leading-snug line-clamp-1">
              {service.name}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-[#4B5563] line-clamp-2 leading-relaxed">
            {service.description}
          </p>

          {/* Rating & Booking Popularity */}
          <div className="pt-1 space-y-1.5">
            <RatingStars
              rating={service.average_rating}
              reviewCount={service.review_count}
              size="sm"
            />

            {bookingCount > 0 && (
              <div className="flex items-center gap-1 text-xs text-[#4B5563]">
                <Users className="w-3.5 h-3.5 text-[#1E3A8A]" />
                <span>
                  {bookingCount} {bookingCount === 1 ? 'person booked' : 'people booked'}
                </span>
              </div>
            )}

            <div>
              <AvailabilityBadge isAvailable={service.is_available !== false} />
            </div>
          </div>
        </div>

        {/* Price + Prominent Book Now Button */}
        <div className="pt-3 border-t border-white/70 space-y-3">
          <ServicePrice price={service.price} duration={service.duration} />
          <BookingButton to={`/services/${service.id}`} label="Book Now" size="sm" />
        </div>
      </div>
    </div>
  );
};
