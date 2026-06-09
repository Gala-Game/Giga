'use client';

import { useState } from 'react';
import { mockTrades } from '@/lib/mockData';
import TradeCard from '@/components/social/TradeCard';
import FilterBar from '@/components/social/FilterBar';
import { FilterOptions } from '@/types';

export default function SocialPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    tradeType: 'all',
    userFilter: 'all',
  });

  const filteredTrades = mockTrades.filter(trade => {
    if (filters.tradeType !== 'all' && trade.tradeType !== filters.tradeType) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Social Feed</h1>
        <p className="text-gray-400">
          Explore recent trades from the community on attention markets
        </p>
      </div>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      <div className="space-y-6">
        {filteredTrades.map(trade => (
          <TradeCard key={trade.id} trade={trade} />
        ))}
      </div>
    </div>
  );
}
