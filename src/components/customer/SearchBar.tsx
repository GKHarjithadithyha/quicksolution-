import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  showButton?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search for plumbing, cleaning, AC repair...',
  showButton = false
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full">
      <div className="relative flex-1">
        <Search className="w-5 h-5 text-[#6B7280] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="search"
          enterKeyHint="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 pl-12 pr-11 bg-white border border-[#E5E7EB] rounded-xl text-base text-[#1F2937] placeholder:text-[#6B7280] outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/15 transition-all"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[#6B7280] hover:text-[#1F2937] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showButton && (
        <button
          type="submit"
          className="h-12 px-6 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-sm sm:text-base rounded-xl transition-colors cursor-pointer shrink-0"
        >
          Search
        </button>
      )}
    </form>
  );
};
