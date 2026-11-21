import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceCategory } from '../../types';
import {
  Zap,
  Droplets,
  Wind,
  Sparkles,
  Hammer,
  Paintbrush,
  Bug,
  Wrench,
  HardHat,
  Flower2,
  Truck,
  Home
} from 'lucide-react';

export const CategoryIcon: React.FC<{ name: string; className?: string }> = ({
  name,
  className = 'w-6 h-6 text-[#16A34A]'
}) => {
  switch (name) {
    case 'Zap': return <Zap className={className} />;
    case 'Droplets': return <Droplets className={className} />;
    case 'Wind': return <Wind className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Hammer': return <Hammer className={className} />;
    case 'Paintbrush': return <Paintbrush className={className} />;
    case 'Bug': return <Bug className={className} />;
    case 'Wrench': return <Wrench className={className} />;
    case 'HardHat': return <HardHat className={className} />;
    case 'Flower2': return <Flower2 className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'Home': return <Home className={className} />;
    default: return <Wrench className={className} />;
  }
};

export const CategoryTile: React.FC<{ category: ServiceCategory }> = ({ category }) => {
  return (
    <Link
      to={`/services?category=${category.id}`}
      className="group glass-card hover:border-[#16A34A]/60 hover:shadow-md active:scale-[0.97] rounded-2xl p-3 sm:p-4 min-h-[96px] flex flex-col items-center justify-center text-center gap-2 sm:gap-3 transition-all"
    >
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F2FAF5]/90 border border-[#16A34A]/15 group-hover:bg-[#16A34A] flex items-center justify-center transition-colors">
        <CategoryIcon
          name={category.icon}
          className="w-5 h-5 text-[#16A34A] group-hover:text-white transition-colors"
        />
      </div>
      <span className="text-[11px] sm:text-sm font-semibold text-[#1E3A8A] leading-tight line-clamp-2">
        {category.name}
      </span>
    </Link>
  );
};

export const CategoryGrid: React.FC<{ categories: ServiceCategory[] }> = ({ categories }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4">
      {categories.map((cat) => (
        <CategoryTile key={cat.id} category={cat} />
      ))}
    </div>
  );
};
