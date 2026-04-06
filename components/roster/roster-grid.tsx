'use client';

import { Wrestler } from '@/lib/types';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function RosterGrid({ wrestlers }: { wrestlers: Wrestler[] }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');

  let filteredWrestlers = wrestlers;

  if (search) {
    filteredWrestlers = filteredWrestlers.filter((w) =>
      w.ring_name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filter === 'mens') {
    filteredWrestlers = filteredWrestlers.filter((w) => w.gender_division === 'mens');
  } else if (filter === 'womens') {
    filteredWrestlers = filteredWrestlers.filter((w) => w.gender_division === 'womens');
  } else if (filter === 'active') {
    filteredWrestlers = filteredWrestlers.filter((w) => w.status === 'active');
  }

  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search wrestlers..."
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {['all', 'active', 'mens', 'womens'].map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              onClick={() => setFilter(f)}
              size="sm"
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredWrestlers.map((wrestler) => (
          <WrestlerCard key={wrestler.id} wrestler={wrestler} />
        ))}
      </div>
    </>
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
          {wrestler.status !== 'active' && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 rounded-full bg-graphite text-xs font-medium capitalize">
                {wrestler.status}
              </span>
            </div>
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
