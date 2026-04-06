'use client';

import { Championship, Reign, Wrestler, TagTeam } from '@/lib/types';
import { Trophy, Calendar, Award } from 'lucide-react';
import Image from 'next/image';
import { calculateDaysBetween, formatDate } from '@/lib/utils';
import Link from 'next/link';

export function LineageView({
  championship,
}: {
  championship: Championship & { reigns: (Reign & { wrestler?: Wrestler; tag_team?: TagTeam })[] };
}) {
  const currentReign = championship.reigns.find((r) => r.active);
  const sortedReigns = [...championship.reigns].sort(
    (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );

  const longestReign = [...championship.reigns].sort((a, b) => {
    const daysA = calculateDaysBetween(a.start_date, a.end_date);
    const daysB = calculateDaysBetween(b.start_date, b.end_date);
    return daysB - daysA;
  })[0];

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="glass-effect rounded-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-5xl font-display flex items-center">
                <Trophy className="w-12 h-12 mr-4 text-accent-gold" />
                {championship.name}
              </h1>
              {championship.active && (
                <span className="px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium">
                  Active
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-text-muted mb-1">Introduced</div>
                <div className="font-medium">{championship.introduced_date ? formatDate(championship.introduced_date) : 'N/A'}</div>
              </div>
              <div>
                <div className="text-sm text-text-muted mb-1">Total Reigns</div>
                <div className="font-medium">{championship.reigns.length}</div>
              </div>
              <div>
                <div className="text-sm text-text-muted mb-1">Division</div>
                <div className="font-medium capitalize">{championship.division || 'N/A'}</div>
              </div>
            </div>
          </div>

          {currentReign && (
            <div className="glass-effect rounded-lg p-8 mb-8">
              <h2 className="text-3xl font-display mb-6 flex items-center text-accent-gold">
                <Award className="w-8 h-8 mr-3" />
                Current Champion
              </h2>
              <ReignCard reign={currentReign} isCurrent />
            </div>
          )}

          {longestReign && (
            <div className="glass-effect rounded-lg p-8 mb-8">
              <h2 className="text-3xl font-display mb-6 flex items-center text-accent-gold">
                <Calendar className="w-8 h-8 mr-3" />
                Longest Reign
              </h2>
              <ReignCard reign={longestReign} />
            </div>
          )}

          <div className="glass-effect rounded-lg p-8">
            <h2 className="text-3xl font-display mb-6">Championship Lineage</h2>

            <div className="space-y-4">
              {sortedReigns.map((reign, idx) => (
                <ReignCard key={reign.id} reign={reign} reignNumber={sortedReigns.length - idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReignCard({
  reign,
  isCurrent,
  reignNumber,
}: {
  reign: Reign & { wrestler?: Wrestler; tag_team?: TagTeam };
  isCurrent?: boolean;
  reignNumber?: number;
}) {
  const champion = reign.wrestler || reign.tag_team;
  const days = calculateDaysBetween(reign.start_date, reign.end_date);
  const championLink = reign.wrestler
    ? `/roster/${reign.wrestler.slug}`
    : `/tag-teams/${reign.tag_team?.slug}`;

  return (
    <div className={`p-6 rounded-lg bg-graphite ${isCurrent ? 'border-2 border-accent-gold' : ''}`}>
      <div className="flex items-center space-x-6">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-elevated flex-shrink-0">
          {champion?.image_url && (
            <Image
              src={champion.image_url}
              alt={reign.tag_team ? (champion as TagTeam).name : (champion as Wrestler).ring_name}
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <Link href={championLink}>
              <h3 className="text-2xl font-display hover:text-accent-gold transition-colors">
                {reign.tag_team ? (champion as TagTeam).name : (champion as Wrestler).ring_name}
              </h3>
            </Link>
            {reignNumber && <span className="text-text-muted">Reign #{reignNumber}</span>}
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
              <div className="font-medium">{days} days</div>
            </div>
            {reign.defenses !== undefined && reign.defenses > 0 && (
              <div>
                <div className="text-text-muted">Defenses</div>
                <div className="font-medium">{reign.defenses}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
