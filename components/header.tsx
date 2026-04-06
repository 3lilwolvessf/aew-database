'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { SearchModal } from './search-modal';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-3xl font-display tracking-wider gradient-gold bg-clip-text text-transparent">
                AEW ATLAS
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/compare"
                className="text-sm font-medium hover:text-accent-gold transition-colors"
              >
                Compare
              </Link>
              <Link
                href="/archive"
                className="text-sm font-medium hover:text-accent-gold transition-colors"
              >
                Archive
              </Link>
              <Link
                href="/championships"
                className="text-sm font-medium hover:text-accent-gold transition-colors"
              >
                Championships
              </Link>
              <Link
                href="/roster"
                className="text-sm font-medium hover:text-accent-gold transition-colors"
              >
                Roster
              </Link>
            </nav>

            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg glass-effect hover:bg-accent-gold/10 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Search</span>
              <kbd className="hidden sm:inline px-2 py-1 text-xs bg-elevated rounded border border-border">/</kbd>
            </button>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
