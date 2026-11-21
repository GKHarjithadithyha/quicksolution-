import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { serviceService } from '../../services/service.service';
import { useAuth } from '../../features/auth/AuthContext';
import { HERO_BACKGROUND_VIDEOS } from '../../lib/mock-data';
import { SearchBar } from '../../components/customer/SearchBar';
import { CategoryGrid } from '../../components/customer/CategoryGrid';
import { ServiceCard } from '../../components/customer/ServiceCard';
import { RatingStars } from '../../components/customer/RatingStars';
import { AvailabilityBadge } from '../../components/customer/AvailabilityBadge';
import { BookingButton } from '../../components/customer/BookingButton';
import { BackgroundVideo } from '../../components/customer/BackgroundVideo';
import { FAQSection } from '../../components/customer/FAQSection';
import {
  ChevronRight,
  IndianRupee,
  CalendarClock,
  ShieldCheck,
  BellRing,
  MapPin,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

export const CustomerHomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { location } = useAuth();

  const categories = serviceService.getCategories();
  const popularServices = serviceService.getServices().slice(0, 8);
  const topRatedServices = serviceService.getTopRatedServices(4);
  const allReviews = serviceService.getAllReviews().slice(0, 3);
  const ratingStats = serviceService.getOverallRatingStats();

  const handleSearch = () => {
    const q = searchQuery.trim();
    navigate(q ? `/services?search=${encodeURIComponent(q)}` : '/services');
  };

  const whyChooseItems = [
    {
      icon: <IndianRupee className="w-5 h-5 text-[#16A34A]" />,
      title: 'Transparent Fixed Pricing',
      description: 'Know the exact service price and what is included before you book.'
    },
    {
      icon: <CalendarClock className="w-5 h-5 text-[#16A34A]" />,
      title: 'Flexible Time Slots',
      description: 'Choose a date and convenient 2-hour window that suits your schedule.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#16A34A]" />,
      title: 'Trained Professionals',
      description: 'Skilled technicians equipped for everyday home repair and maintenance.'
    },
    {
      icon: <BellRing className="w-5 h-5 text-[#16A34A]" />,
      title: 'Clear Status Tracking',
      description: 'Follow booking confirmation, payment verification, and job progress.'
    }
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Choose a Service',
      description: 'Browse categories and review fixed pricing and task inclusions.'
    },
    {
      step: '02',
      title: 'Pick Date & Address',
      description: 'Select your preferred appointment slot and enter your service address.'
    },
    {
      step: '03',
      title: 'Confirm & Pay via UPI',
      description: 'Complete payment with UPI QR and submit your transaction reference.'
    },
    {
      step: '04',
      title: 'Service Completed',
      description: 'Track partner assignment and service updates from start to finish.'
    }
  ];

  return (
    <div className="w-full overflow-x-clip">
      {/* 1. Full-Bleed Background Video Hero with Transparent Glass Left Panel */}
      <section className="relative min-h-[470px] sm:min-h-[580px] lg:min-h-[650px] flex items-center overflow-hidden border-b border-white/40">
        {/* User's Attached Background Looping Video */}
        <div className="absolute inset-0 z-0">
          <BackgroundVideo
            src={HERO_BACKGROUND_VIDEOS.cleaning}
            poster="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85"
            alt="Home service workers performing home services"
            autoPlayAlways
            className="w-full h-full object-cover"
          />
          {/* Light left-to-right scrim so video stays bright and clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/25 to-transparent" />
        </div>

        {/* Left-Aligned Transparent Glass Panel (Right Side Left Open for Video) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-7 sm:py-16">
          <div className="max-w-xl bg-slate-950/25 backdrop-blur-md border border-white/25 rounded-2xl sm:rounded-3xl p-5 sm:p-9 space-y-4 sm:space-y-6 shadow-2xl">
            {/* Location & Availability Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-xs sm:text-sm text-white">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#4ADE80]" />
                Serving {location}
              </span>
              <span className="text-white/30">|</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[#86EFAC]">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                Available Now
              </span>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <h1 className="text-[26px] sm:text-5xl font-bold text-white tracking-tight leading-[1.14] drop-shadow-sm">
                Reliable Home Services,{' '}
                <span className="text-[#4ADE80]">Right at Your Doorstep</span>
              </h1>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Book trusted professionals for AC servicing, plumbing, electrical, cleaning, and everyday home repairs with upfront fixed pricing.
              </p>
            </div>

            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={handleSearch}
              placeholder="Search for cleaning, AC repair, plumbing..."
              showButton
            />

            {/* Two CTA Buttons */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3">
              <BookingButton
                to="/services"
                label="Explore Services"
                fullWidth={false}
                size="lg"
              />
              <a
                href="#how-it-works"
                className="min-h-[48px] px-6 inline-flex items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 active:opacity-80 backdrop-blur-md border border-white/35 text-white font-semibold text-base transition-colors"
              >
                How It Works
              </a>
            </div>

            {/* Trust Indicators & Real Overall Rating */}
            <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/90">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
                Upfront fixed prices
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
                {categories.length} service categories
              </span>
              {ratingStats.average !== null && ratingStats.totalReviews > 0 && (
                <div className="bg-white/90 px-2.5 py-1 rounded-lg">
                  <RatingStars
                    rating={ratingStats.average}
                    reviewCount={ratingStats.totalReviews}
                    size="sm"
                    showNewBadge={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Service Categories */}
      <section className="relative py-12 sm:py-16">
        <div className="pointer-events-none absolute -top-12 right-10 w-72 h-72 rounded-full bg-[#16A34A]/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A]">
                Service Categories
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">
                Choose a category to explore available home services
              </p>
            </div>
            <Link
              to="/services"
              className="text-sm font-semibold text-[#16A34A] hover:text-[#15803D] inline-flex items-center gap-1 shrink-0"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <CategoryGrid categories={categories} />
        </div>
      </section>

      {/* 3. Popular Services — 4 Cards Per Row */}
      <section className="relative py-12 sm:py-16 bg-[#ECFDF5]/60 border-y border-white/80">
        <div className="pointer-events-none absolute top-10 left-8 w-80 h-80 rounded-full bg-[#1E3A8A]/8 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-8 w-80 h-80 rounded-full bg-[#16A34A]/12 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A]">
                Popular Home Services
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">
                Everyday maintenance and repair services at transparent fixed prices
              </p>
            </div>
            <Link
              to="/services"
              className="text-sm font-semibold text-[#16A34A] hover:text-[#15803D] inline-flex items-center gap-1 shrink-0"
            >
              Browse All Services
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularServices.map((service) => {
              const cat = serviceService.getCategoryById(service.category_id);
              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  categoryName={cat?.name}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Top-Rated Services */}
      <section className="relative py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A]">
                Top-Rated Services
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">
                Featured services highlighted by customer feedback and demand
              </p>
            </div>
            <Link
              to="/services"
              className="text-sm font-semibold text-[#16A34A] hover:text-[#15803D] inline-flex items-center gap-1 shrink-0"
            >
              See All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {topRatedServices.map((service) => {
              const cat = serviceService.getCategoryById(service.category_id);
              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  categoryName={cat?.name}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="relative py-12 sm:py-16 bg-[#ECFDF5]/60 border-y border-white/80">
        <div className="pointer-events-none absolute -bottom-16 left-1/3 w-96 h-96 rounded-full bg-[#16A34A]/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A]">
              Why Choose QuickSolution
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] mt-1.5">
              Built for clarity, reliability, and peace of mind every time you book a service.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 -mx-4 px-4 no-scrollbar sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
            {whyChooseItems.map((item) => (
              <div
                key={item.title}
                className="snap-start shrink-0 w-[260px] sm:w-auto glass-card rounded-2xl p-5 sm:p-6 space-y-3"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F2FAF5] border border-[#16A34A]/20 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-[#1E3A8A]">{item.title}</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. How It Works */}
      <section id="how-it-works" className="relative py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A]">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] mt-1.5">
              Schedule a home service in four simple steps.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 -mx-4 px-4 no-scrollbar sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {howItWorksSteps.map((item) => (
              <div
                key={item.step}
                className="snap-start shrink-0 w-[250px] sm:w-auto glass-card rounded-2xl p-5 sm:p-6 space-y-3"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#16A34A] text-white text-sm font-bold shadow-sm">
                  {item.step}
                </span>
                <h3 className="text-base font-semibold text-[#1E3A8A]">{item.title}</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews */}
      <section className="relative py-12 sm:py-16 bg-[#ECFDF5]/60 border-y border-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A]">
              Customer Reviews
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Verified feedback submitted by customers who used our services
            </p>
          </div>

          {allReviews.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F2FAF5] text-[#16A34A] flex items-center justify-center mx-auto">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-[#1E3A8A]">
                Customer reviews will appear here
              </h3>
              <p className="text-sm text-[#4B5563] max-w-md mx-auto">
                We only display real customer feedback. Select any service to view details or share your experience after booking.
              </p>
              <div className="pt-1">
                <BookingButton to="/services" label="Explore Services" fullWidth={false} size="sm" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {allReviews.map((review) => {
                const srv = serviceService.getServiceById(review.service_id);
                return (
                  <div
                    key={review.id}
                    className="glass-card rounded-2xl p-6 space-y-3"
                  >
                    <RatingStars rating={review.rating} reviewCount={1} size="sm" showNewBadge={false} />
                    <p className="text-sm text-[#1F2937] leading-relaxed">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                    <div className="pt-2 border-t border-white/70 flex items-center justify-between text-xs text-[#6B7280]">
                      <span className="font-semibold text-[#1E3A8A]">{review.customer_name}</span>
                      {srv && <span>{srv.name}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#6B7280]">
              Everything you need to know about pricing, scheduling, and payments
            </p>
          </div>

          <FAQSection />
        </div>
      </section>
    </div>
  );
};
