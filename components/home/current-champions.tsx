'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Reign, Championship, Wrestler, TagTeam } from '@/lib/types';
import { Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { calculateDaysBetween } from '@/lib/utils';

async function fetchCurrentChampions() {
  const { data: reigns, error } = await supabase
    .from('reigns')
    .select(`
      *,
      championship:championships(*),
      wrestler:wrestlers(*),
      tag_team:tag_teams(*)
    `)
    .eq('active', true)
    .order('start_date', { ascending: false });

  if (error) throw error;
  return reigns as (Reign & { championship: Championship; wrestler?: Wrestler; tag_team?: TagTeam })[];
}

export function CurrentChampions() {
  const { data: champions, isLoading } = useQuery({
    queryKey: ['current-champions'],
    queryFn: fetchCurrentChampions,
  });

  if (isLoading) {
    return (
      <section>
        <h2 className="text-4xl font-display mb-8 flex items-center">
          <Trophy className="w-8 h-8 mr-3 text-accent-gold" />
          Current Champions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-effect rounded-lg p-6 animate-pulse">
              <div className="h-48 bg-graphite rounded mb-4" />
              <div className="h-6 bg-graphite rounded w-3/4 mb-2" />
              <div className="h-4 bg-graphite rounded w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!champions || champions.length === 0) {
    return (
      <section>
        <h2 className="text-4xl font-display mb-8 flex items-center">
          <Trophy className="w-8 h-8 mr-3 text-accent-gold" />
          Current Champions
        </h2>
        <p className="text-text-muted">No current champions data available.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-4xl font-display mb-8 flex items-center">
        <Trophy className="w-8 h-8 mr-3 text-accent-gold" />
        Current Champions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {champions.map((reign) => (
          <ChampionCard key={reign.id} reign={reign} />
        ))}
      </div>
    </section>
  );
}

function ChampionCard({
  reign,
}: {
  reign: Reign & { championship: Championship; wrestler?: Wrestler; tag_team?: TagTeam };
}) {
  const champion = reign.wrestler || reign.tag_team;
  const days = calculateDaysBetween(reign.start_date, null);
  const championLink = reign.wrestler
    ? `/roster/${reign.wrestler.slug}`
    : `/tag-teams/${reign.tag_team?.slug}`;

  return (
    <Link href={championLink}>
      <div className="glass-effect rounded-lg overflow-hidden group hover:bg-accent-gold/5 transition-all duration-300">
        <div className="relative h-48 bg-graphite">
          {champion?.image_url && (
            <Image
              src={champion.image_url}
              alt={reign.tag_team ? (champion as TagTeam).name : (champion as Wrestler).ring_name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="p-6">
          <div className="text-sm text-accent-gold mb-2 font-medium">
            {reign.championship.name}
          </div>

          <h3 className="text-xl font-display mb-2">
            {reign.tag_team ? (champion as TagTeam)?.name : (champion as Wrestler)?.ring_name || 'Unknown'}
          </h3>

          <div className="flex items-center justify-between text-sm text-text-muted">
            <span>Reign: {days} days</span>
            {reign.defenses !== undefined && reign.defenses > 0 && (
              <span>{reign.defenses} defenses</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
