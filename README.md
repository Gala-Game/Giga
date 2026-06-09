# Giga - Social Trading & NFT Creation Platform

A modern web application for social trading and AI-powered NFT collection creation.

## Features

### 📊 Social Feed
- **Trade Feed**: Explore recent longs & shorts on attention markets
- **Interactions**: Comment and react to trades from other users
- **Filtering**: Filter by trade type, friends, or top traders
- **Real-time Updates**: Stay current with market activity

### 🎨 NFT Collection Creator
- **AI-Powered Generation**: Create unique NFT collections up to 9,999 items
- **Text Prompts**: Describe your vision and let AI bring it to life
- **Base Images**: Upload reference images for consistency
- **Customization**: Choose style, theme, and custom traits
- **Preview**: See sample NFTs before generating the full collection
- **Metadata Export**: Export collection metadata for minting

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Gala-Game/Giga.git
cd Giga
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
Giga/
├── app/                    # Next.js app directory
│   ├── social/            # Social feed page
│   ├── create/            # NFT creation page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── social/           # Social feed components
│   ├── create/           # NFT creator components
│   └── Navigation.tsx    # Navigation bar
├── lib/                   # Utility functions and mock data
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Deployment**: Ready for Vercel, Netlify, or similar platforms

## Features in Detail

### Social Feed
The social feed displays recent trades with:
- User information and avatars
- Trade type (long/short) with visual indicators
- Asset details and entry/current prices
- Performance metrics with color-coded gains/losses
- Comment threads for discussion
- Reaction system (like, fire, rocket, thinking)
- Filter options for customized views

### NFT Creator
The NFT creation interface allows:
- Text prompt input for AI generation
- Optional base image upload
- Style selection (realistic, cartoon, anime, 3D, pixel art)
- Theme selection (fantasy, sci-fi, cyberpunk, nature, abstract)
- Collection size configuration (1-9,999 items)
- Custom trait definitions with multiple values
- Preview generation before full collection
- Batch generation support
- Metadata export for blockchain minting

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC License - see LICENSE file for details
