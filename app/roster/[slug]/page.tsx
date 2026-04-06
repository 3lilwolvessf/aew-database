import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Wrestler, Reign, Championship } from '@/lib/types';
import Image from 'next/image';
import { MapPin, TrendingUp, Trophy, Award } from 'lucide-react';
import { formatDate, calculateDaysBetween } from '@/lib/utils';
import Link from 'next/link';

async function getWrestler(slug: string): Promise<Wrestler | null> {
  const { data, error } = await supabase
    .from('wrestlers')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function getWrestlerStats(wrestlerId: string) {
  const { data: participations } = await supabase
    .from('match_participants')
    .select('*, match:matches(*)')
    .eq('wrestler_id', wrestlerId);

  const totalMatches = participations?.length || 0;
  const wins = participations?.filter((p) => p.winner).length || 0;
  const losses = participations?.filter((p) => !p.winner).length || 0;

  return { totalMatches, wins, losses, winRate: totalMatches > 0 ? ((wins / totalMatches) * 100).toFixed(1) : '0' };
}

async function getWrestlerReigns(wrestlerId: string) {
  const { data } = await supabase
    .from('reigns')
    .select('*, championship:championships(*)')
    .eq('champion_wrestler_id', wrestlerId)
    .order('start_date', { ascending: false });

  return (data || []) as (Reign & { championship: Championship })[];
}

export default async function WrestlerPage({ params }: { params: { slug: string } }) {
  const wrestler = await getWrestler(params.slug);
  if (!wrestler) notFound();

  const [stats, reigns] = await Promise.all([
    getWrestlerStats(wrestler.id),
    getWrestlerReigns(wrestler.id),
  ]);

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="glass-effect rounded-lg p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-graphite mb-4">
                  {wrestler.image_url && (
                    <Image
                      src={wrestler.image_url}
                      alt={wrestler.ring_name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                {wrestler.bio && (
                  <div className="text-center text-accent-gold font-medium">{wrestler.bio}</div>
                )}
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-5xl font-display mb-2">{wrestler.ring_name}</h1>
                  {wrestler.full_name && (
                    <p className="text-xl text-text-muted">{wrestler.full_name}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {wrestler.hometown && (
                    <div>
                      <div className="text-sm text-text-muted mb-1 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Hometown
                      </div>
                      <div className="font-medium">{wrestler.hometown}</div>
                    </div>
                  )}
                  {wrestler.billed_height && (
                    <div>
                      <div className="text-sm text-text-muted mb-1">Height</div>
                      <div className="font-medium">{wrestler.billed_height}</div>
                    </div>
                  )}
                  {wrestler.billed_weight && (
                    <div>
                      <div className="text-sm text-text-muted mb-1">Weight</div>
                      <div className="font-medium">{wrestler.billed_weight} lbs</div>
                    </div>
                  )}
                  {wrestler.alignment && (
                    <div>
                      <div className="text-sm text-text-muted mb-1">Alignment</div>
                      <div className="font-medium capitalize">{wrestler.alignment}</div>
                    </div>
                  )}
                  {wrestler.status && (
                    <div>
                      <div className="text-sm text-text-muted mb-1">Status</div>
                      <div className="font-medium capitalize">{wrestler.status}</div>
                    </div>
                  )}
                  {wrestler.debut_date && (
                    <div>
                      <div className="text-sm text-text-muted mb-1">AEW Debut</div>
                      <div className="font-medium">{formatDate(wrestler.debut_date)}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard icon={<TrendingUp />} label="Total Matches" value={stats.totalMatches.toString()} />
            <StatCard icon={<Award />} label="Wins" value={stats.wins.toString()} color="text-green-500" />
            <StatCard icon={<Award />} label="Losses" value={stats.losses.toString()} color="text-red-500" />
            <StatCard icon={<TrendingUp />} label="Win Rate" value={`${stats.winRate}%`} />
          </div>

          {reigns.length > 0 && (
            <div className="glass-effect rounded-lg p-8">
              <h2 className="text-3xl font-display mb-6 flex items-center text-accent-gold">
                <Trophy className="w-8 h-8 mr-3" />
                Championship History
              </h2>

              <div className="space-y-4">
                {reigns.map((reign) => (
                  <div key={reign.id} className="p-6 rounded-lg bg-graphite">
                    <div className="flex items-center justify-between mb-2">
                      <Link href={`/championships/${reign.championship.slug}`}>
                        <h3 className="text-xl font-display hover:text-accent-gold transition-colors">
                          {reign.championship.name}
                        </h3>
                      </Link>
                      {reign.active && (
                        <span className="px-3 py-1 rounded-full bg-accent-gold text-background text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm">
                      <div>
                        <div className="text-text-muted">Started</div>
                        <div className="font-medium">{formatDate(reign.start_date)}</div>
                      </div>
                      {reign.end_date && (
                        <div>
                          <div className="text-text-muted">Ended</div>
                          <div className="font-medium">{formatDate(reign.end_date)}</div>
                        </div>
                      )}
                      <div>
                        <div className="text-text-muted">Duration</div>
                        <div className="font-medium">
                          {calculateDaysBetween(reign.start_date, reign.end_date)} days
                        </div>
                      </div>
                      {reign.defenses !== undefined && reign.defenses > 0 && (
                        <div>
                          <div className="text-text-muted">Defenses</div>
                          <div className="font-medium">{reign.defenses}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color = 'text-text' }: { icon: React.ReactNode; label: string; value: string; color?: string }) {
  return (
    <div className="glass-effect rounded-lg p-6 text-center">
      <div className="flex justify-center mb-2 text-accent-gold">{icon}</div>
      <div className={`text-3xl font-display mb-1 ${color}`}>{value}</div>
      <div className="text-sm text-text-muted">{label}</div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const wrestler = await getWrestler(params.slug);
  return {
    title: `${wrestler?.ring_name} - AEW Atlas`,
    description: wrestler?.bio || `Profile for ${wrestler?.ring_name}`,
  };
}
