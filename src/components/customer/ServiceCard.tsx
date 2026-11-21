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
    <div className="flex items-baseline gap-2 flex-wrap tabular-nums">
      <span
        className={`font-bold text-[#172B4D] ${
          size === 'lg' ? 'text-2xl' : 'text-xl'
        }`}
      >
        {formatCurrency(price)}
      </span>
      {duration !== undefined && (
        <span className="text-xs text-[#475467] inline-flex items-center gap-1">
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
    <div className="bg-white border border-[#DDE3E8] rounded-2xl overflow-hidden flex flex-col hover:border-[#172B4D]/50 hover:shadow-md transition-all">
      {/* Service Media: Looping Background Video with Photo Poster */}
      <Link
        to={`/services/${service.id}`}
        className="relative block aspect-[4/3] bg-[#EEF3EC] overflow-hidden"
      >
        <BackgroundVideo
          src={service.video_url}
          poster={service.image_url}
          alt={service.name}
          autoPlayAlways
          className="w-full h-full object-cover"
        />

        {service.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase bg-[#172B4D] text-[#B9FF66]">
            {service.badge}
          </span>
        )}
      </Link>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-2">
          {categoryName && (
            <div className="text-[11px] font-semibold text-[#667085] uppercase tracking-wide">
              {categoryName}
            </div>
          )}

          <Link to={`/services/${service.id}`}>
            <h3 className="font-heading text-base font-semibold text-[#172B4D] hover:underline leading-snug line-clamp-1">
              {service.name}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-[#475467] line-clamp-2 leading-relaxed">
            {service.description}
          </p>

          {/* Rating & Availability */}
          <div className="pt-1 space-y-1.5">
            <RatingStars
              rating={service.average_rating}
              reviewCount={service.review_count}
              size="sm"
            />

            {bookingCount > 0 && (
              <div className="flex items-center gap-1 text-xs text-[#475467]">
                <Users className="w-3.5 h-3.5 text-[#172B4D]" />
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

        {/* Price + Prominent Electric Lime Book Now Button */}
        <div className="pt-3 border-t border-[#DDE3E8] space-y-3">
          <ServicePrice price={service.price} duration={service.duration} />
          <BookingButton to={`/services/${service.id}`} label="Book Now" size="sm" />
        </div>
      </div>
    </div>
  );
};
