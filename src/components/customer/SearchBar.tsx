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
        <Search className="w-5 h-5 text-[#667085] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="search"
          enterKeyHint="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 pl-12 pr-11 bg-white border border-[#DDE3E8] rounded-xl text-base text-[#172B4D] placeholder:text-[#667085] outline-none focus:border-[#172B4D] transition-all"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[#667085] hover:text-[#172B4D] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showButton && (
        <button
          type="submit"
          className="qs-btn-primary px-6 text-sm sm:text-base shrink-0"
        >
          Search
        </button>
      )}
    </form>
  );
};
