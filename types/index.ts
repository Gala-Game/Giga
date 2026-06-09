export interface Trade {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  tradeType: 'long' | 'short';
  market: string;
  asset: string;
  entryPrice: number;
  currentPrice: number;
  amount: number;
  timestamp: string;
  performance: number;
  comments: Comment[];
  reactions: Reaction[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}

export interface Reaction {
  id: string;
  userId: string;
  type: 'like' | 'fire' | 'rocket' | 'thinking';
  timestamp: string;
}

export interface FilterOptions {
  tradeType?: 'all' | 'long' | 'short';
  userFilter?: 'all' | 'friends' | 'top-traders';
}

export interface NFTCollection {
  id: string;
  name: string;
  description: string;
  size: number;
  style: string;
  theme: string;
  traits: Trait[];
  items: NFTItem[];
}

export interface Trait {
  name: string;
  values: string[];
}

export interface NFTItem {
  id: string;
  tokenId: number;
  imageUrl: string;
  attributes: Record<string, string>;
}

export interface GenerationConfig {
  prompt: string;
  baseImage?: File;
  style: string;
  theme: string;
  collectionSize: number;
  traits: Trait[];
}
