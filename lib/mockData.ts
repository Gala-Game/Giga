import { Trade } from '@/types';

export const mockTrades: Trade[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'CryptoTrader99',
    userAvatar: '👨‍💼',
    tradeType: 'long',
    market: 'Attention Market',
    asset: 'GALA',
    entryPrice: 0.045,
    currentPrice: 0.052,
    amount: 10000,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    performance: 15.56,
    comments: [
      {
        id: 'c1',
        userId: 'user2',
        username: 'MarketWatcher',
        userAvatar: '👀',
        content: 'Great entry point! I\'m following this one.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      }
    ],
    reactions: [
      { id: 'r1', userId: 'user2', type: 'fire', timestamp: new Date().toISOString() },
      { id: 'r2', userId: 'user3', type: 'rocket', timestamp: new Date().toISOString() },
    ]
  },
  {
    id: '2',
    userId: 'user2',
    username: 'MarketWatcher',
    userAvatar: '👀',
    tradeType: 'short',
    market: 'Attention Market',
    asset: 'META',
    entryPrice: 485.20,
    currentPrice: 478.50,
    amount: 50,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    performance: 1.38,
    comments: [],
    reactions: [
      { id: 'r3', userId: 'user1', type: 'like', timestamp: new Date().toISOString() },
    ]
  },
  {
    id: '3',
    userId: 'user3',
    username: 'DiamondHands',
    userAvatar: '💎',
    tradeType: 'long',
    market: 'Attention Market',
    asset: 'TSLA',
    entryPrice: 245.00,
    currentPrice: 255.30,
    amount: 25,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    performance: 4.20,
    comments: [
      {
        id: 'c2',
        userId: 'user1',
        username: 'CryptoTrader99',
        userAvatar: '👨‍💼',
        content: 'Nice call! Tesla looking strong.',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'c3',
        userId: 'user4',
        username: 'TechInvestor',
        userAvatar: '🚀',
        content: 'Following your lead on this one.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      }
    ],
    reactions: [
      { id: 'r4', userId: 'user1', type: 'rocket', timestamp: new Date().toISOString() },
      { id: 'r5', userId: 'user2', type: 'fire', timestamp: new Date().toISOString() },
      { id: 'r6', userId: 'user4', type: 'like', timestamp: new Date().toISOString() },
    ]
  },
  {
    id: '4',
    userId: 'user4',
    username: 'TechInvestor',
    userAvatar: '🚀',
    tradeType: 'long',
    market: 'Attention Market',
    asset: 'NVDA',
    entryPrice: 890.00,
    currentPrice: 912.50,
    amount: 15,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    performance: 2.53,
    comments: [],
    reactions: [
      { id: 'r7', userId: 'user3', type: 'rocket', timestamp: new Date().toISOString() },
    ]
  },
  {
    id: '5',
    userId: 'user5',
    username: 'SmartMoney',
    userAvatar: '🧠',
    tradeType: 'short',
    market: 'Attention Market',
    asset: 'AAPL',
    entryPrice: 185.50,
    currentPrice: 182.30,
    amount: 100,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    performance: 1.73,
    comments: [
      {
        id: 'c4',
        userId: 'user1',
        username: 'CryptoTrader99',
        userAvatar: '👨‍💼',
        content: 'Interesting short position. What\'s your thesis?',
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      }
    ],
    reactions: [
      { id: 'r8', userId: 'user1', type: 'thinking', timestamp: new Date().toISOString() },
      { id: 'r9', userId: 'user2', type: 'like', timestamp: new Date().toISOString() },
    ]
  }
];

export function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}
