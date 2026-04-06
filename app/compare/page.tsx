'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Wrestler } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Swords, Search, Shuffle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

async function fetchWrestlers() {
  const { data, error } = await supabase
    .from('wrestlers')
    .select('*')
    .eq('status', 'active')
    .order('ring_name');

  if (error) throw error;
  return data as Wrestler[];
}

export default function ComparePage() {
  const [wrestler1, setWrestler1] = useState<Wrestler | null>(null);
  const [wrestler2, setWrestler2] = useState<Wrestler | null>(null);
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');

  const { data: wrestlers } = useQuery({
    queryKey: ['wrestlers'],
    queryFn: fetchWrestlers,
  });

  const filteredWrestlers1 = wrestlers?.filter(
    (w) => w.ring_name.toLowerCase().includes(search1.toLowerCase()) && w.id !== wrestler2?.id
  );

  const filteredWrestlers2 = wrestlers?.filter(
    (w) => w.ring_name.toLowerCase().includes(search2.toLowerCase()) && w.id !== wrestler1?.id
  );

  const handleRandomize = () => {
    if (!wrestlers || wrestlers.length < 2) return;
    const shuffled = [...wrestlers].sort(() => Math.random() - 0.5);
    setWrestler1(shuffled[0]);
    setWrestler2(shuffled[1]);
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-display mb-4 flex items-center justify-center">
            <Swords className="w-12 h-12 mr-4 text-accent-gold" />
            TALE OF THE TAPE
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Compare two wrestlers side by side with detailed statistics and head-to-head analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <WrestlerSelector
            wrestler={wrestler1}
            onSelect={setWrestler1}
            search={search1}
            onSearchChange={setSearch1}
            filteredWrestlers={filteredWrestlers1}
            label="Wrestler A"
          />

          <WrestlerSelector
            wrestler={wrestler2}
            onSelect={setWrestler2}
            search={search2}
            onSearchChange={setSearch2}
            filteredWrestlers={filteredWrestlers2}
            label="Wrestler B"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={handleRandomize}
            variant="outline"
            className="group"
          >
            <Shuffle className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
            Random Matchup
          </Button>

          {wrestler1 && wrestler2 && (
            <Button size="lg" asChild>
              <Link href={`/compare/${wrestler1.slug}-vs-${wrestler2.slug}`}>
                Compare Wrestlers
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function WrestlerSelector({
  wrestler,
  onSelect,
  search,
  onSearchChange,
  filteredWrestlers,
  label,
}: {
  wrestler: Wrestler | null;
  onSelect: (wrestler: Wrestler | null) => void;
  search: string;
  onSearchChange: (search: string) => void;
  filteredWrestlers?: Wrestler[];
  label: string;
}) {
  return (
    <div className="glass-effect rounded-lg p-6">
      <h2 className="text-2xl font-display mb-4">{label}</h2>

      {!wrestler ? (
        <>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search wrestler..."
              className="pl-10"
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredWrestlers?.slice(0, 10).map((w) => (
              <button
                key={w.id}
                onClick={() => onSelect(w)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-graphite transition-colors text-left"
              >
                <div className="relative w-12 h-12 rounded-full bg-graphite flex-shrink-0">
                  {w.image_url && (
                    <Image
                      src={w.image_url}
                      alt={w.ring_name}
                      fill
                      className="object-cover rounded-full"
                    />
                  )}
                </div>
                <div>
                  <div className="font-medium">{w.ring_name}</div>
                  <div className="text-sm text-text-muted">{w.hometown}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="relative w-48 h-48 mx-auto mb-4 rounded-lg overflow-hidden bg-graphite">
            {wrestler.image_url && (
              <Image
                src={wrestler.image_url}
                alt={wrestler.ring_name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <h3 className="text-2xl font-display mb-2">{wrestler.ring_name}</h3>
          <p className="text-text-muted mb-4">{wrestler.hometown}</p>
          <Button variant="outline" onClick={() => onSelect(null)}>
            Change Wrestler
          </Button>
        </div>
      )}
    </div>
  );
}
