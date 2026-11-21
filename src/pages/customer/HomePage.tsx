import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { serviceService } from '../../services/service.service';
import { formatCurrency } from '../../lib/utils';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Star, 
  ChevronRight,
  Wrench,
  Zap,
  Droplets,
  Hammer
} from 'lucide-react';

export const CustomerHomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = serviceService.getCategories();
  const featuredServices = serviceService.getServices().slice(0, 4);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench': return <Wrench className="w-6 h-6 text-emerald-600" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-500" />;
      case 'Droplets': return <Droplets className="w-6 h-6 text-blue-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-500" />;
      case 'Hammer': return <Hammer className="w-6 h-6 text-orange-500" />;
      default: return <Sparkles className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Reliable Certified Home Services
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Expert Help for Every Corner of Your Home
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Transparent pricing, verified background-checked service partners, and instant booking with UPI.
          </p>

          {/* Quick Search */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2 max-w-lg">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search AC servicing, plumbing, cleaning..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-400 shadow-md"
              />
            </div>
            <Link
              to={`/services?search=${encodeURIComponent(searchQuery)}`}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-500/20"
            >
              Search
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Value Prop Badges */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-emerald-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>100% Background-Checked Technicians</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>On-Time Arrival Guarantee</span>
          </div>
          <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Transparent Upfront UPI Pricing</span>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Explore Categories</h2>
            <p className="text-xs sm:text-sm text-slate-500">Select a category to view specialized experts</p>
          </div>
          <Link to="/services" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/services?category=${cat.id}`}
              className="group bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center text-center space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                {getCategoryIcon(cat.icon)}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Most Booked Services</h2>
            <p className="text-xs sm:text-sm text-slate-500">Top-rated home care solutions with instant slot selection</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col hover:shadow-lg transition-all group"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={service.image_url}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {service.rating} ({service.reviews_count})
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-emerald-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {service.description}
                  </p>
                  <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Takes approx {service.duration} mins</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Fixed Price</span>
                    <span className="text-lg font-extrabold text-slate-900">
                      {formatCurrency(service.price)}
                    </span>
                  </div>

                  <Link
                    to={`/service/${service.id}`}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm shadow-emerald-600/20"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
