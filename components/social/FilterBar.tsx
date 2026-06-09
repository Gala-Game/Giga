'use client';

import { FilterOptions } from '@/types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 mb-6 border border-slate-700">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Trade Type
          </label>
          <select
            value={filters.tradeType}
            onChange={(e) => onFilterChange({ ...filters, tradeType: e.target.value as any })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Trades</option>
            <option value="long">Longs Only</option>
            <option value="short">Shorts Only</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Users
          </label>
          <select
            value={filters.userFilter}
            onChange={(e) => onFilterChange({ ...filters, userFilter: e.target.value as any })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="top-traders">Top Traders</option>
          </select>
        </div>
      </div>
    </div>
  );
}
