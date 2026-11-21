import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { RatingStars } from './RatingStars';
import { AvailabilityBadge } from './AvailabilityBadge';
import { BookingButton } from './BookingButton';
import { BackgroundVideo } from './BackgroundVideo';
import { Clock } from 'lucide-react';

export const ServicePrice: React.FC<{ price: number; duration?: number; size?: 'md' | 'lg' }> = ({
  price,
  duration,
  size = 'md'
}) => {
  return (
    <div className="flex items-baseline gap-1.5 flex-wrap tabular-nums">
      <span
        className={`font-bold text-[#172B4D] ${
          size === 'lg' ? 'text-2xl' : 'text-base sm:text-xl'
        }`}
      >
        {formatCurrency(price)}
      </span>
      {duration !== undefined && (
        <span className="text-[11px] sm:text-xs text-[#475467] inline-flex items-center gap-0.5">
          <span>·</span>
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>{duration}m</span>
        </span>
      )}
    </div>
  );
};

export const ServiceCard: React.FC<{
  service: ServiceItem;
  categoryName?: string;
}> = ({ service, categoryName }) => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col active:scale-[0.99] sm:hover:border-[#16794B]/40 sm:hover:shadow-lg transition-all">
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
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold tracking-wide uppercase bg-[#172B4D] text-[#B9FF66]">
            {service.badge}
          </span>
        )}
      </Link>

      {/* Card Body — Compact on Mobile (2-col), Roomy on Desktop (4-col) */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between gap-2.5 sm:gap-3">
        <div className="space-y-1 sm:space-y-2">
          {categoryName && (
            <div className="text-[10px] sm:text-[11px] font-semibold text-[#667085] uppercase tracking-wide truncate">
              {categoryName}
            </div>
          )}

          <Link to={`/services/${service.id}`}>
            <h3 className="font-heading text-[13px] sm:text-base font-semibold text-[#172B4D] leading-snug line-clamp-2 sm:line-clamp-1">
              {service.name}
            </h3>
          </Link>

          <p className="hidden sm:block text-xs sm:text-sm text-[#475467] line-clamp-2 leading-relaxed">
            {service.description}
          </p>

          {/* Rating & Availability */}
          <div className="pt-0.5 space-y-1">
            <RatingStars
              rating={service.average_rating}
              reviewCount={service.review_count}
              size="sm"
            />
            <div className="hidden sm:block">
              <AvailabilityBadge isAvailable={service.is_available !== false} />
            </div>
          </div>
        </div>

        {/* Price + Electric Lime Book Now Button */}
        <div className="pt-2 sm:pt-3 border-t border-[#DDE3E8] space-y-2 sm:space-y-3">
          <ServicePrice price={service.price} duration={service.duration} />
          <BookingButton to={`/services/${service.id}`} label="Book" size="sm" />
        </div>
      </div>
    </div>
  );
};
