'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, User, Calendar, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Wrestler, Event, Championship } from '@/lib/types';
import Link from 'next/link';

type SearchResult = {
  type: 'wrestler' | 'event' | 'championship';
  data: Wrestler | Event | Championship;
};

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !open) {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!query.trim() || !open) {
      setResults([]);
      return;
    }

    const searchTimeout = setTimeout(async () => {
      setLoading(true);
      try {
        const searchTerm = `%${query}%`;

        const [wrestlersRes, eventsRes, championshipsRes] = await Promise.all([
          supabase
            .from('wrestlers')
            .select('*')
            .ilike('ring_name', searchTerm)
            .limit(5),
          supabase
            .from('events')
            .select('*')
            .ilike('name', searchTerm)
            .limit(5),
          supabase
            .from('championships')
            .select('*')
            .ilike('name', searchTerm)
            .limit(5),
        ]);

        const newResults: SearchResult[] = [
          ...(wrestlersRes.data || []).map(w => ({ type: 'wrestler' as const, data: w })),
          ...(eventsRes.data || []).map(e => ({ type: 'event' as const, data: e })),
          ...(championshipsRes.data || []).map(c => ({ type: 'championship' as const, data: c })),
        ];

        setResults(newResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, open]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'wrestler':
        return <User className="w-4 h-4" />;
      case 'event':
        return <Calendar className="w-4 h-4" />;
      case 'championship':
        return <Trophy className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  const getLink = (result: SearchResult) => {
    switch (result.type) {
      case 'wrestler':
        return `/roster/${(result.data as Wrestler).slug}`;
      case 'event':
        return `/archive/${(result.data as Event).slug}`;
      case 'championship':
        return `/championships/${(result.data as Championship).slug}`;
    }
  };

  const getName = (result: SearchResult) => {
    switch (result.type) {
      case 'wrestler':
        return (result.data as Wrestler).ring_name;
      case 'event':
        return (result.data as Event).name;
      case 'championship':
        return (result.data as Championship).name;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-elevated border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Search Atlas</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search wrestlers, events, championships..."
            className="pl-10 h-12 bg-background border-border"
            autoFocus
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto space-y-2">
          {loading && (
            <div className="text-center py-8 text-text-muted">
              Searching...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-8 text-text-muted">
              No results found for "{query}"
            </div>
          )}

          {!loading && results.map((result, idx) => (
            <Link
              key={`${result.type}-${idx}`}
              href={getLink(result)}
              onClick={onClose}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-graphite transition-colors"
            >
              <div className="text-accent-gold">
                {getIcon(result.type)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{getName(result)}</div>
                <div className="text-sm text-text-muted capitalize">{result.type}</div>
              </div>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
