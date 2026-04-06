import { supabase } from '@/lib/supabase';
import { Championship, Reign, Wrestler, TagTeam } from '@/lib/types';
import { Trophy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { calculateDaysBetween } from '@/lib/utils';

async function fetchChampionships() {
  const { data, error } = await supabase
    .from('championships')
    .select(`
      *,
      reigns(*, wrestler:wrestlers(*), tag_team:tag_teams(*))
    `)
    .eq('active', true)
    .order('introduced_date', { ascending: true });

  if (error) throw error;
  return data as (Championship & { reigns: (Reign & { wrestler?: Wrestler; tag_team?: TagTeam })[] })[];
}

export default async function ChampionshipsPage() {
  const championships = await fetchChampionships();

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-6xl font-display mb-4 flex items-center">
            <Trophy className="w-12 h-12 mr-4 text-accent-gold" />
            CHAMPIONSHIPS
          </h1>
          <p className="text-xl text-text-muted">
            Explore championship lineages and title history
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {championships.map((championship) => {
            const currentReign = championship.reigns.find((r) => r.active);
            const champion = currentReign?.wrestler || currentReign?.tag_team;
            const days = currentReign ? calculateDaysBetween(currentReign.start_date, null) : 0;

            return (
              <Link key={championship.id} href={`/championships/${championship.slug}`}>
                <div className="glass-effect rounded-lg overflow-hidden group hover:bg-accent-gold/5 transition-all duration-300">
                  {championship.image_url && (
                    <div className="relative h-32 bg-graphite flex items-center justify-center">
                      <Image
                        src={championship.image_url}
                        alt={championship.name}
                        width={200}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-display mb-4">{championship.name}</h3>

                    {currentReign && champion && (
                      <div>
                        <div className="text-sm text-accent-gold mb-2">Current Champion</div>
                        <div className="font-medium mb-1">
                          {currentReign.tag_team ? (champion as TagTeam).name : (champion as Wrestler).ring_name}
                        </div>
                        <div className="text-sm text-text-muted">{days} days</div>
                      </div>
                    )}

                    {!currentReign && (
                      <div className="text-sm text-text-muted">Championship Vacant</div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Championships - AEW Atlas',
  description: 'Explore AEW championship lineages and title history',
};
