'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-white">
            Giga
          </Link>
          <div className="flex gap-6">
            <Link 
              href="/social"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/social') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              Social
            </Link>
            <Link 
              href="/create"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/create') 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              Create
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
