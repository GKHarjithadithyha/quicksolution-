import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { serviceService } from '../../services/service.service';
import { formatCurrency } from '../../lib/utils';
import { Search, Filter, Star, Clock, ArrowRight } from 'lucide-react';

export const ServicesDiscoveryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchTerm, setSearchTerm] = useState<string>(searchParam);

  const categories = serviceService.getCategories();
  const services = serviceService.getServices(
    selectedCategory || undefined,
    searchTerm || undefined
  );

  const handleCategoryClick = (catId: string) => {
    const next = selectedCategory === catId ? '' : catId;
    setSelectedCategory(next);
    if (next) {
      searchParams.set('category', next);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search across all home repair and cleaning services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => handleCategoryClick('')}
            className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedCategory === ''
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Services ({serviceService.getServices().length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-slate-900">
            Available Services ({services.length})
          </h1>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <Filter className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <h3 className="text-base font-bold text-slate-700">No services found</h3>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-all"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {service.rating} ({service.reviews_count})
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{service.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{service.description}</p>
                    <div className="mt-3 text-xs text-slate-500 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{service.duration} mins duration</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">Upfront Price</span>
                      <span className="text-lg font-bold text-slate-900">
                        {formatCurrency(service.price)}
                      </span>
                    </div>

                    <Link
                      to={`/service/${service.id}`}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                    >
                      Book <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
