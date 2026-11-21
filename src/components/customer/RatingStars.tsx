import React from 'react';
import { Star } from 'lucide-react';
import { ServiceReview } from '../../types';

interface RatingStarsProps {
  rating?: number | null;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showNewBadge?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  reviewCount = 0,
  size = 'sm',
  showNewBadge = true
}) => {
  const hasRealRating = rating !== null && rating !== undefined && reviewCount > 0;

  if (!hasRealRating) {
    if (!showNewBadge) return null;
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F2FAF5] border border-[#16A34A]/20 text-[11px] font-medium text-[#15803D]">
        New service
      </span>
    );
  }

  const iconSize = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  const rounded = Math.round(rating);

  return (
    <div className="inline-flex items-center gap-1.5 flex-wrap">
      <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= rounded
                ? 'fill-[#F59E0B] text-[#F59E0B]'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
      <span
        className={`font-semibold text-[#1F2937] ${
          size === 'lg' ? 'text-base' : 'text-xs sm:text-sm'
        }`}
      >
        {rating.toFixed(1)}
      </span>
      <span className="text-xs text-[#6B7280]">
        ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
      </span>
    </div>
  );
};

export const RatingDistribution: React.FC<{ reviews: ServiceReview[] }> = ({ reviews }) => {
  const total = reviews.length;
  const average =
    total > 0
      ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1))
      : null;

  if (total === 0) {
    return (
      <div className="bg-[#F2FAF5] border border-[#E5E7EB] rounded-xl p-5 text-sm text-[#6B7280]">
        No customer reviews yet for this service. Once customers submit reviews, the rating breakdown will appear here.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5">
      <div className="sm:col-span-4 text-center sm:text-left sm:border-r sm:border-[#E5E7EB] sm:pr-5 space-y-1.5">
        <div className="text-4xl font-bold text-[#1E3A8A]">{average?.toFixed(1)}</div>
        <RatingStars rating={average} reviewCount={total} size="md" showNewBadge={false} />
        <p className="text-xs text-[#6B7280]">Based on {total} customer {total === 1 ? 'review' : 'reviews'}</p>
      </div>

      <div className="sm:col-span-8 space-y-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = reviews.filter((r) => Math.round(r.rating) === star).length;
          const pct = Math.round((count / total) * 100);
          return (
            <div key={star} className="flex items-center gap-3 text-xs">
              <span className="w-10 font-medium text-[#1F2937] shrink-0">{star} star</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F59E0B] rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-[#6B7280] shrink-0">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
