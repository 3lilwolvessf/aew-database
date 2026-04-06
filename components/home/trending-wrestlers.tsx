'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Wrestler } from '@/lib/types';
import { TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

async function fetchTrendingWrestlers() {
  const { data, error } = await supabase
    .from('wrestlers')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) throw error;
  return data as Wrestler[];
}

export function TrendingWrestlers() {
  const { data: wrestlers, isLoading } = useQuery({
    queryKey: ['trending-wrestlers'],
    queryFn: fetchTrendingWrestlers,
  });

  if (isLoading) {
    return (
      <section>
        <h2 className="text-4xl font-display mb-8 flex items-center">
          <TrendingUp className="w-8 h-8 mr-3 text-accent-gold" />
          Featured Wrestlers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-effect rounded-lg overflow-hidden animate-pulse">
              <div className="aspect-square bg-graphite" />
              <div className="p-3">
                <div className="h-4 bg-graphite rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!wrestlers || wrestlers.length === 0) {
    return (
      <section>
        <h2 className="text-4xl font-display mb-8 flex items-center">
          <TrendingUp className="w-8 h-8 mr-3 text-accent-gold" />
          Featured Wrestlers
        </h2>
        <p className="text-text-muted">No wrestlers available.</p>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-display flex items-center">
          <TrendingUp className="w-8 h-8 mr-3 text-accent-gold" />
          Featured Wrestlers
        </h2>
        <Link
          href="/roster"
          className="text-accent-gold hover:text-accent-gold/80 transition-colors font-medium"
        >
          Full Roster →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {wrestlers.map((wrestler) => (
          <WrestlerCard key={wrestler.id} wrestler={wrestler} />
        ))}
      </div>
    </section>
  );
}

function WrestlerCard({ wrestler }: { wrestler: Wrestler }) {
  return (
    <Link href={`/roster/${wrestler.slug}`}>
      <div className="glass-effect rounded-lg overflow-hidden group hover:bg-accent-gold/5 transition-all duration-300">
        <div className="relative aspect-square bg-graphite">
          {wrestler.image_url && (
            <Image
              src={wrestler.image_url}
              alt={wrestler.ring_name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-1">{wrestler.ring_name}</h3>
          {wrestler.hometown && (
            <p className="text-xs text-text-muted line-clamp-1">{wrestler.hometown}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
