import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { serviceService } from '../../services/service.service';
import { SearchBar } from '../../components/customer/SearchBar';
import { ServiceCard } from '../../components/customer/ServiceCard';
import { EmptyState } from '../../components/customer/StateViews';
import { SlidersHorizontal } from 'lucide-react';

type PriceRange = 'all' | 'under-500' | '500-1000' | 'above-1000';
type SortOption = 'recommended' | 'price-asc' | 'price-desc';

export const ServicesDiscoveryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  const categories = serviceService.getCategories();
  const allServices = serviceService.getServices();

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const next = new URLSearchParams(searchParams);
    if (catId) next.set('category', catId);
    else next.delete('category');
    setSearchParams(next);
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
    setPriceRange('all');
    setSortBy('recommended');
    setSearchParams(new URLSearchParams());
  };

  const filteredServices = useMemo(() => {
    let list = allServices.filter((s) => {
      if (selectedCategory && s.category_id !== selectedCategory) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const catName = serviceService.getCategoryById(s.category_id)?.name.toLowerCase() || '';
        const matches =
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          catName.includes(q);
        if (!matches) return false;
      }
      if (priceRange === 'under-500' && s.price >= 500) return false;
      if (priceRange === '500-1000' && (s.price < 500 || s.price > 1000)) return false;
      if (priceRange === 'above-1000' && s.price <= 1000) return false;
      return true;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [allServices, selectedCategory, searchTerm, priceRange, sortBy]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] sm:text-[32px] font-bold text-[#172B4D] tracking-tight">
          Explore Services
        </h1>
        <p className="text-sm text-[#475467] mt-1">
          Browse, filter, and compare fixed-price home services
        </p>
      </div>

      {/* Search, Quick Mobile Category Pills & Filter Controls */}
      <div className="bg-white border border-[#DDE3E8] rounded-2xl p-4 sm:p-5 space-y-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search for plumbing, cleaning, AC repair..."
        />

        {/* Quick 1-Tap Scrollable Category Pills (Thumb-friendly on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5 -mx-1 px-1">
          <button
            type="button"
            onClick={() => handleCategoryChange('')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === ''
                ? 'bg-[#B9FF66] text-[#172B4D]'
                : 'bg-[#EEF3EC] border border-[#DDE3E8] text-[#172B4D] hover:border-[#172B4D]'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#B9FF66] text-[#172B4D]'
                  : 'bg-[#EEF3EC] border border-[#DDE3E8] text-[#172B4D] hover:border-[#172B4D]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label htmlFor="category-filter" className="block text-xs font-medium text-[#4B5563] mb-1">
              Category
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#1F2937] outline-none focus:border-[#16A34A]"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price-filter" className="block text-xs font-medium text-[#4B5563] mb-1">
              Price Range
            </label>
            <select
              id="price-filter"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as PriceRange)}
              className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#1F2937] outline-none focus:border-[#16A34A]"
            >
              <option value="all">All Prices</option>
              <option value="under-500">Under ₹500</option>
              <option value="500-1000">₹500 – ₹1,000</option>
              <option value="above-1000">Above ₹1,000</option>
            </select>
          </div>

          <div>
            <label htmlFor="sort-select" className="block text-xs font-medium text-[#4B5563] mb-1">
              Sort By
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#1F2937] outline-none focus:border-[#16A34A]"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-[#6B7280]">
          <SlidersHorizontal className="w-4 h-4 text-[#16A34A]" />
          <span>
            Showing <strong className="text-[#1E3A8A]">{filteredServices.length}</strong>{' '}
            {filteredServices.length === 1 ? 'service' : 'services'}
          </span>
        </div>

        {(selectedCategory || searchTerm || priceRange !== 'all') && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-sm font-semibold text-[#16A34A] hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* 2-Column Mobile App Grid / 4-Column Desktop Grid */}
      {filteredServices.length === 0 ? (
        <EmptyState
          title="No services match your search"
          description="Try clearing your filters or searching with a different service name or category."
          actionLabel="Reset Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredServices.map((service) => {
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
      )}
    </div>
  );
};
