import { GenerationConfig, NFTItem, Trait } from '@/types';

/**
 * Generate unique trait combinations for NFT collection
 */
export function generateTraitCombinations(
  traits: Trait[],
  count: number
): Record<string, string>[] {
  const combinations: Record<string, string>[] = [];
  const usedCombinations = new Set<string>();

  // Calculate total possible combinations
  const totalPossible = traits.reduce((acc, trait) => acc * trait.values.length, 1);
  
  if (count > totalPossible) {
    console.warn(`Requested ${count} items but only ${totalPossible} unique combinations possible`);
  }

  let attempts = 0;
  const maxAttempts = count * 10; // Prevent infinite loops

  while (combinations.length < count && attempts < maxAttempts) {
    attempts++;
    
    const combination: Record<string, string> = {};
    
    // Generate random trait values
    for (const trait of traits) {
      const randomIndex = Math.floor(Math.random() * trait.values.length);
      combination[trait.name] = trait.values[randomIndex];
    }

    // Create a hash to check for duplicates
    const hash = JSON.stringify(
      Object.keys(combination)
        .sort()
        .map(key => `${key}:${combination[key]}`)
    );

    if (!usedCombinations.has(hash)) {
      usedCombinations.add(hash);
      combinations.push(combination);
    }
  }

  return combinations;
}

/**
 * Calculate rarity score for an NFT based on trait rarity
 */
export function calculateRarity(
  attributes: Record<string, string>,
  allCombinations: Record<string, string>[]
): number {
  let rarityScore = 0;

  for (const [traitName, traitValue] of Object.entries(attributes)) {
    // Count how many times this trait value appears
    const occurrences = allCombinations.filter(
      combo => combo[traitName] === traitValue
    ).length;
    
    // Rarity is inversely proportional to frequency
    const traitRarity = (1 / occurrences) * allCombinations.length;
    rarityScore += traitRarity;
  }

  return rarityScore;
}

/**
 * Generate metadata for a single NFT (ERC-721 standard)
 */
export function generateNFTMetadata(
  tokenId: number,
  attributes: Record<string, string>,
  config: GenerationConfig,
  rarityScore?: number
): {
  name: string;
  description: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string }>;
  properties?: {
    rarity_score?: number;
  };
} {
  return {
    name: `${config.prompt || 'NFT'} #${tokenId}`,
    description: `${config.prompt} - A unique ${config.style} style NFT with ${config.theme} theme`,
    image: `${tokenId}.png`,
    attributes: Object.entries(attributes).map(([trait_type, value]) => ({
      trait_type,
      value,
    })),
    properties: rarityScore
      ? {
          rarity_score: Math.round(rarityScore * 100) / 100,
        }
      : undefined,
  };
}

/**
 * Generate complete NFT collection with metadata
 */
export function generateCollection(config: GenerationConfig): {
  items: NFTItem[];
  metadata: Record<string, any>[];
  collectionMetadata: any;
} {
  // Generate unique trait combinations
  const combinations = generateTraitCombinations(config.traits, config.collectionSize);

  // Create NFT items
  const items: NFTItem[] = combinations.map((attributes, index) => {
    const tokenId = index + 1;
    const rarityScore = calculateRarity(attributes, combinations);

    return {
      id: `nft-${tokenId}`,
      tokenId,
      imageUrl: `${tokenId}.png`,
      attributes,
    };
  });

  // Generate metadata for each item
  const metadata = items.map(item =>
    generateNFTMetadata(
      item.tokenId,
      item.attributes,
      config,
      calculateRarity(item.attributes, combinations)
    )
  );

  // Collection-level metadata
  const collectionMetadata = {
    name: config.prompt || 'Unnamed Collection',
    description: `AI-generated NFT collection with ${config.style} style and ${config.theme} theme`,
    image: 'collection.png',
    external_link: '',
    seller_fee_basis_points: 250, // 2.5% royalty
    fee_recipient: '',
    size: config.collectionSize,
    traits: config.traits,
    generation_config: {
      style: config.style,
      theme: config.theme,
      prompt: config.prompt,
    },
  };

  return {
    items,
    metadata,
    collectionMetadata,
  };
}

/**
 * Generate SVG image for an NFT based on traits
 */
export function generateNFTImage(
  tokenId: number,
  attributes: Record<string, string>,
  config: GenerationConfig
): string {
  const width = 600;
  const height = 600;

  // Color schemes based on theme
  const themeColors: Record<string, { bg: string; accent: string; text: string }> = {
    fantasy: { bg: '#4a1d96', accent: '#9333ea', text: '#e9d5ff' },
    'sci-fi': { bg: '#0c4a6e', accent: '#0ea5e9', text: '#bae6fd' },
    cyberpunk: { bg: '#831843', accent: '#f0abfc', text: '#fae8ff' },
    nature: { bg: '#14532d', accent: '#4ade80', text: '#dcfce7' },
    abstract: { bg: '#7c2d12', accent: '#fb923c', text: '#fed7aa' },
  };

  const colors = themeColors[config.theme] || themeColors.fantasy;

  // Create gradient background
  const gradient = `
    <defs>
      <linearGradient id="grad${tokenId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${colors.accent};stop-opacity:0.8" />
      </linearGradient>
      <radialGradient id="radial${tokenId}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:${colors.bg};stop-opacity:0" />
      </radialGradient>
    </defs>
  `;

  // Generate geometric patterns based on attributes
  const patterns: string[] = [];
  const attrEntries = Object.entries(attributes);
  
  attrEntries.forEach(([traitName, value], idx) => {
    const hash = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const x = (hash * 137.5) % width;
    const y = ((hash * 2) % height);
    const size = 50 + (hash % 100);
    const rotation = hash % 360;
    
    if (idx % 3 === 0) {
      patterns.push(`<circle cx="${x}" cy="${y}" r="${size}" fill="${colors.accent}" opacity="0.2" />`);
    } else if (idx % 3 === 1) {
      patterns.push(`<rect x="${x - size/2}" y="${y - size/2}" width="${size}" height="${size}" fill="${colors.accent}" opacity="0.15" transform="rotate(${rotation} ${x} ${y})" />`);
    } else {
      patterns.push(`<polygon points="${x},${y-size} ${x+size},${y+size} ${x-size},${y+size}" fill="${colors.accent}" opacity="0.25" />`);
    }
  });

  // Add trait labels
  const traitLabels = attrEntries
    .map(([name, value], idx) => {
      const y = 80 + idx * 60;
      return `
        <text x="300" y="${y}" font-family="Arial, sans-serif" font-size="18" fill="${colors.text}" text-anchor="middle" opacity="0.9">
          ${name}: ${value}
        </text>
      `;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${gradient}
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#grad${tokenId})" />
  <rect width="${width}" height="${height}" fill="url(#radial${tokenId})" />
  
  <!-- Patterns -->
  ${patterns.join('\n  ')}
  
  <!-- Content -->
  <text x="300" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${colors.text}" text-anchor="middle">
    ${config.prompt || 'NFT'} #${tokenId}
  </text>
  
  ${traitLabels}
  
  <!-- Style and Theme -->
  <text x="300" y="${height - 40}" font-family="Arial, sans-serif" font-size="14" fill="${colors.text}" text-anchor="middle" opacity="0.7">
    ${config.style} • ${config.theme}
  </text>
</svg>`;
}
