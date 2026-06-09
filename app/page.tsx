import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-white">
      <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Welcome to Giga
      </h1>
      <p className="text-xl mb-8 text-gray-300 max-w-2xl text-center">
        Explore dynamic feeds of recent trades on attention markets and create stunning AI-powered NFT collections
      </p>
      <div className="flex gap-4">
        <Link 
          href="/social"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
        >
          Social Feed
        </Link>
        <Link 
          href="/create"
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
        >
          Create NFT Collection
        </Link>
      </div>
    </div>
  );
}
