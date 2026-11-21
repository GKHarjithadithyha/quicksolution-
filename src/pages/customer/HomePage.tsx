import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { serviceService } from '../../services/service.service';
import { useAuth } from '../../features/auth/AuthContext';
import { HERO_BACKGROUND_VIDEOS } from '../../lib/mock-data';
import { SearchBar } from '../../components/customer/SearchBar';
import { ServiceCard } from '../../components/customer/ServiceCard';
import { RatingStars } from '../../components/customer/RatingStars';
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
  ArrowRight
} from 'lucide-react';

export const CustomerHomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { location } = useAuth();

  const servicesProvided = serviceService.getServices().slice(0, 4);
  const allReviews = serviceService.getAllReviews().slice(0, 3);
  const ratingStats = serviceService.getOverallRatingStats();

  const handleSearch = () => {
    const q = searchQuery.trim();
    navigate(q ? `/services?search=${encodeURIComponent(q)}` : '/services');
  };

  const whyChooseItems = [
    {
      icon: <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-[#172B4D]" />,
      title: 'Fixed Pricing',
      description: 'Know the exact service price and scope before you book.'
    },
    {
      icon: <CalendarClock className="w-4 h-4 sm:w-5 sm:h-5 text-[#172B4D]" />,
      title: 'Flexible Slots',
      description: 'Pick a date and convenient 2-hour window.'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#172B4D]" />,
      title: 'Trained Pros',
      description: 'Skilled technicians for everyday home repairs.'
    },
    {
      icon: <BellRing className="w-4 h-4 sm:w-5 sm:h-5 text-[#172B4D]" />,
      title: 'Live Updates',
      description: 'Track booking, payment, and job progress.'
    }
  ];

  const howItWorksSteps = [
    { step: '01', title: 'Choose Service', description: 'Compare fixed prices and what is included.' },
    { step: '02', title: 'Pick Slot & Address', description: 'Select appointment time and service address.' },
    { step: '03', title: 'Sign In & Pay', description: 'Pay via UPI, Card, or Cash on Service.' },
    { step: '04', title: 'Job Completed', description: 'Track status updates until completion.' }
  ];

  return (
    <div className="w-full overflow-x-clip">
      {/* MOBILE ANDROID APP TOP EXPERIENCE (< md): Search Bar + Compact Rounded Video Card */}
      <div className="md:hidden px-3.5 pt-3 pb-2 space-y-3 bg-[#F7F9F4]">
        {/* Sticky-feel App Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleSearch}
          placeholder="Search AC, plumbing, cleaning..."
        />

        {/* Compact Rounded Hero Video Card (Leaves Services Visible Above the Fold!) */}
        <div className="relative h-[190px] rounded-2xl overflow-hidden border border-[#DDE3E8] shadow-sm">
          <BackgroundVideo
            src={HERO_BACKGROUND_VIDEOS.cleaning}
            poster="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80"
            alt="Home service workers performing home services"
            autoPlayAlways
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#172B4D]/80 via-[#172B4D]/45 to-transparent" />

          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-[#172B4D]/65 backdrop-blur-sm border border-white/20 text-[11px] font-semibold text-[#B9FF66]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B9FF66]" />
              Available in {location}
            </div>

            <div className="space-y-2 max-w-[240px]">
              <h1 className="text-xl font-bold text-white leading-tight">
                Every Need.{' '}
                <span className="text-[#B9FF66]">One Quick Solution.</span>
              </h1>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-[#B9FF66] active:bg-[#8AD42B] text-[#172B4D] text-xs font-bold shadow-xs"
              >
                Explore Services
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP HERO (>= md) */}
      <section className="hidden md:flex relative min-h-[580px] lg:min-h-[640px] items-center overflow-hidden border-b border-[#DDE3E8]">
        <div className="absolute inset-0 z-0">
          <BackgroundVideo
            src={HERO_BACKGROUND_VIDEOS.cleaning}
            poster="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85"
            alt="Home service workers performing home services"
            autoPlayAlways
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#172B4D]/75 via-[#172B4D]/35 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-16">
          <div className="max-w-xl bg-[#172B4D]/35 backdrop-blur-md border border-white/25 rounded-3xl p-9 space-y-6 shadow-2xl">
            <div className="inline-flex flex-wrap items-center gap-3 px-3 py-1.5 rounded-full bg-[#172B4D]/60 border border-white/25 text-sm text-white">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#B9FF66]" />
                Serving {location}
              </span>
              <span className="text-white/30">|</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#B9FF66]">
                <span className="w-2 h-2 rounded-full bg-[#B9FF66]" />
                Available Now
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-5xl font-bold text-white tracking-tight leading-[1.14]">
                Every Need.{' '}
                <span className="text-[#B9FF66]">One Quick Solution.</span>
              </h1>
              <p className="text-base text-white/90 leading-relaxed">
                Book trusted professionals for AC servicing, plumbing, electrical, cleaning, and everyday home repairs with upfront fixed pricing.
              </p>
            </div>

            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={handleSearch}
              placeholder="Search for cleaning, AC repair, plumbing..."
              showButton
            />

            <div className="flex flex-wrap items-center gap-3">
              <BookingButton
                to="/services"
                label="Explore Services"
                fullWidth={false}
                size="lg"
              />
              <a
                href="#how-it-works"
                className="min-h-[48px] px-6 inline-flex items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/35 text-white font-semibold text-base transition-colors"
              >
                How It Works
              </a>
            </div>

            <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/90">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#B9FF66]" />
                Upfront fixed prices
              </span>
              {ratingStats.average !== null && ratingStats.totalReviews > 0 && (
                <div className="bg-white px-2.5 py-1 rounded-lg">
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

      {/* 2. Services Provided — Green & White Glassmorphism Theme */}
      <section className="relative py-5 sm:py-14 qs-white-green-surface border-b border-[#16794B]/10 overflow-hidden">
        <div className="pointer-events-none absolute -top-10 -right-10 w-56 h-56 rounded-full bg-[#B9FF66]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-10 w-56 h-56 rounded-full bg-[#16794B]/12 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-3xl font-bold text-[#172B4D]">
                Services Provided
              </h2>
              <p className="text-xs sm:text-sm text-[#16794B] font-medium mt-0.5">
                Transparent fixed-price home services
              </p>
            </div>
            <Link
              to="/services"
              className="h-9 sm:h-11 px-3 sm:px-4 rounded-xl glass-card text-[#172B4D] hover:border-[#16794B]/50 text-xs sm:text-sm font-bold inline-flex items-center gap-1 shrink-0 active:opacity-80"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4 text-[#16794B]" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {servicesProvided.map((service) => {
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

      {/* 3. Why Choose Quick Solution — Green & White Glassmorphism */}
      <section className="relative py-5 sm:py-14 qs-green-surface border-b border-[#16794B]/10 overflow-hidden">
        <div className="pointer-events-none absolute top-4 left-1/4 w-64 h-64 rounded-full bg-[#B9FF66]/25 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-3xl font-bold text-[#172B4D]">
            Why Choose Quick Solution
          </h2>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-1 -mx-3.5 px-3.5 no-scrollbar sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
            {whyChooseItems.map((item) => (
              <div
                key={item.title}
                className="snap-start shrink-0 w-[210px] sm:w-auto glass-card rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-3"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#B9FF66] border border-[#16794B]/15 flex items-center justify-center shadow-2xs">
                  {item.icon}
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-[#172B4D]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works — Green & White Glassmorphism */}
      <section id="how-it-works" className="relative py-5 sm:py-14 qs-white-green-surface border-b border-[#16794B]/10 overflow-hidden">
        <div className="pointer-events-none absolute -bottom-10 right-1/4 w-64 h-64 rounded-full bg-[#16794B]/12 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-3xl font-bold text-[#172B4D]">
            How It Works
          </h2>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-1 -mx-3.5 px-3.5 no-scrollbar sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {howItWorksSteps.map((item) => (
              <div
                key={item.step}
                className="snap-start shrink-0 w-[200px] sm:w-auto glass-card rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-3"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#16794B] text-[#B9FF66] text-xs sm:text-sm font-bold shadow-xs">
                  {item.step}
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-[#172B4D]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Customer Reviews — Green & White Glassmorphism */}
      {allReviews.length > 0 && (
        <section className="relative py-5 sm:py-14 qs-green-surface border-b border-[#16794B]/10 overflow-hidden">
          <div className="pointer-events-none absolute -top-10 left-12 w-56 h-56 rounded-full bg-[#B9FF66]/25 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-3xl font-bold text-[#172B4D]">
              Customer Reviews
            </h2>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-1 -mx-3.5 px-3.5 no-scrollbar md:mx-0 md:px-0 md:pb-0 md:overflow-visible md:grid md:grid-cols-3 md:gap-5">
              {allReviews.map((review) => {
                const srv = serviceService.getServiceById(review.service_id);
                return (
                  <div
                    key={review.id}
                    className="snap-start shrink-0 w-[270px] md:w-auto glass-card rounded-2xl p-4 sm:p-6 space-y-2.5"
                  >
                    <RatingStars rating={review.rating} reviewCount={1} size="sm" showNewBadge={false} />
                    <p className="text-xs sm:text-sm text-[#172B4D] leading-relaxed">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                    <div className="pt-2 border-t border-[#16794B]/15 flex items-center justify-between text-xs text-[#475467]">
                      <span className="font-semibold text-[#172B4D]">{review.customer_name}</span>
                      {srv && <span className="truncate max-w-[140px] text-[#16794B] font-medium">{srv.name}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. FAQ */}
      <section className="py-5 sm:py-14 bg-[#F7F9F4]">
        <div className="max-w-4xl mx-auto px-3.5 sm:px-6 space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-3xl font-bold text-[#172B4D] sm:text-center">
            Frequently Asked Questions
          </h2>
          <FAQSection />
        </div>
      </section>
    </div>
  );
};
