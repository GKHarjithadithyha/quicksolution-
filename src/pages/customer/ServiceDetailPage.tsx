import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { serviceService } from '../../services/service.service';
import { useAuth } from '../../features/auth/AuthContext';
import { formatCurrency } from '../../lib/utils';
import { ServicePrice } from '../../components/customer/ServiceCard';
import { RatingStars, RatingDistribution } from '../../components/customer/RatingStars';
import { AvailabilityBadge } from '../../components/customer/AvailabilityBadge';
import { BookingButton } from '../../components/customer/BookingButton';
import { BackgroundVideo } from '../../components/customer/BackgroundVideo';
import { EmptyState } from '../../components/customer/StateViews';
import { Check, Info, ChevronRight, ArrowLeft, Clock, Star } from 'lucide-react';
import { toast } from 'sonner';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [refreshTick, setRefreshTick] = useState(0);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const service = serviceService.getServiceById(id || '');

  if (!service) {
    return (
      <EmptyState
        title="Service not found"
        description="The service you are looking for is unavailable or may have been removed."
        actionLabel="Explore Services"
        actionTo="/services"
      />
    );
  }

  const category = serviceService.getCategoryById(service.category_id);
  const reviews = serviceService.getReviewsForService(service.id);

  const handleBookClick = () => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(`/book/${service.id}`)}`);
      return;
    }
    navigate(`/book/${service.id}`);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(`/services/${service.id}`)}`);
      return;
    }
    if (reviewComment.trim().length < 5) {
      toast.error('Please write a short review (at least 5 characters).');
      return;
    }

    serviceService.addReview({
      serviceId: service.id,
      customerId: user.id,
      customerName: user.full_name,
      rating: reviewRating,
      comment: reviewComment
    });
    setReviewComment('');
    setReviewRating(5);
    setRefreshTick((t) => t + 1);
    toast.success('Thank you for submitting your review!');
  };

  return (
    <div key={refreshTick} className="space-y-6 pb-36 lg:pb-6">
      {/* Desktop Breadcrumb / Mobile Back Link */}
      <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-sm text-[#6B7280]">
        <Link to="/" className="hover:text-[#16A34A]">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/services" className="hover:text-[#16A34A]">Explore Services</Link>
        {category && (
          <>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/services?category=${category.id}`} className="hover:text-[#16A34A]">
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#1E3A8A] font-medium">{service.name}</span>
      </nav>

      <Link
        to="/services"
        className="inline-flex md:hidden items-center gap-1.5 text-sm font-medium text-[#1E3A8A]"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Services
      </Link>

      {/* Main Two-Column Desktop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Service Video Banner, Info, Inclusions, Rating Distribution & Reviews */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="relative aspect-[16/9] bg-slate-900">
              <BackgroundVideo
                src={service.video_url}
                poster={service.image_url}
                alt={service.name}
                autoPlayAlways
                className="w-full h-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
              {category && (
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block text-xs font-semibold text-white glass-dark px-3 py-1 rounded-lg">
                    {category.name}
                  </span>
                </div>
              )}
            </div>

            <div className="p-5 sm:p-6 space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <AvailabilityBadge isAvailable={service.is_available !== false} />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] leading-tight">
                {service.name}
              </h1>

              <RatingStars
                rating={service.average_rating}
                reviewCount={service.review_count}
                size="md"
              />

              <div className="pt-1">
                <ServicePrice price={service.price} duration={service.duration} size="lg" />
              </div>
            </div>
          </div>

          {/* Description */}
          <section className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 space-y-2">
            <h2 className="text-lg sm:text-xl font-semibold text-[#1E3A8A]">
              About this service
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              {service.description}
            </p>
          </section>

          {/* What's Included */}
          <section className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-[#1E3A8A]">
              What&apos;s included
            </h2>
            <ul className="space-y-3">
              {service.included.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#1F2937]">
                  <span className="w-5 h-5 rounded-full bg-[#F2FAF5] border border-[#16A34A]/25 text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Additional Information */}
          {service.additional_info && service.additional_info.length > 0 && (
            <section className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-[#1E3A8A]">
                Additional information
              </h2>
              <ul className="space-y-2.5">
                {service.additional_info.map((info, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#6B7280]">
                    <Info className="w-4 h-4 text-[#6B7280] shrink-0 mt-0.5" />
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Customer Ratings & Reviews Section */}
          <section className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-[#1E3A8A]">
              Customer Ratings & Reviews
            </h2>

            <RatingDistribution reviews={reviews} />

            {/* Review List */}
            {reviews.length > 0 && (
              <div className="space-y-4 divide-y divide-[#E5E7EB]">
                {reviews.map((rev) => (
                  <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-[#1E3A8A]">
                        {rev.customer_name}
                      </span>
                      <span className="text-xs text-[#6B7280]">
                        {new Date(rev.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <RatingStars rating={rev.rating} reviewCount={1} size="sm" showNewBadge={false} />
                    <p className="text-sm text-[#4B5563] leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Write a Review Form */}
            <form onSubmit={handleReviewSubmit} className="pt-4 border-t border-[#E5E7EB] space-y-4">
              <h3 className="text-sm font-semibold text-[#1E3A8A]">Share your experience</h3>

              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    aria-label={`Rate ${star} stars`}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= reviewRating
                          ? 'fill-[#F59E0B] text-[#F59E0B]'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-[#6B7280] ml-2">{reviewRating} / 5</span>
              </div>

              <textarea
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder={
                  user
                    ? 'Write an honest review about this service...'
                    : 'Sign in to submit a review for this service.'
                }
                className="w-full p-3.5 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#1F2937] outline-none focus:border-[#16A34A]"
              />

              <button
                type="submit"
                className="h-10 px-5 rounded-xl bg-[#1E3A8A] hover:bg-[#172E6E] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                {user ? 'Submit Review' : 'Sign In to Review'}
              </button>
            </form>
          </section>
        </div>

        {/* Right: Desktop Sticky Glassmorphic Booking Summary */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24">
          <div className="glass-card-strong rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-[#1E3A8A]">Booking Summary</h2>

            <div className="space-y-3 text-sm border-y border-[#E5E7EB] py-4">
              <div className="flex justify-between gap-2">
                <span className="text-[#6B7280]">Service</span>
                <span className="font-medium text-[#1F2937] text-right">{service.name}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#6B7280]">Estimated duration</span>
                <span className="font-medium text-[#1F2937] inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#16A34A]" />
                  Approx. {service.duration} mins
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-[#E5E7EB]">
                <span className="text-[#6B7280]">Fixed price</span>
                <span className="text-2xl font-bold text-[#1E3A8A]">
                  {formatCurrency(service.price)}
                </span>
              </div>
            </div>

            <BookingButton onClick={handleBookClick} label="Book Now" size="lg" />

            <p className="text-xs text-[#6B7280] text-center leading-relaxed">
              {user
                ? 'Choose your preferred schedule and address on the next step.'
                : 'You will be asked to sign in before confirming your booking.'}
            </p>
          </div>
        </aside>
      </div>

      {/* Mobile Sticky Bottom Booking Panel (Clears Mobile Bottom Nav + Safe Area) */}
      <div className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] left-0 right-0 z-40 glass-nav border-t px-4 py-3 flex items-center justify-between gap-4 lg:hidden shadow-md">
        <div>
          <div className="text-xs text-[#6B7280]">Fixed price</div>
          <div className="text-xl font-bold text-[#1E3A8A] leading-tight">
            {formatCurrency(service.price)}
          </div>
        </div>
        <BookingButton onClick={handleBookClick} label="Book Now" fullWidth={false} size="md" />
      </div>
    </div>
  );
};
