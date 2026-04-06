'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Wrestler, Reign, Championship } from '@/lib/types';
import { Trophy, TrendingUp, Award, MapPin } from 'lucide-react';
import { calculateDaysBetween } from '@/lib/utils';

type WrestlerWithStats = Wrestler & {
  stats: {
    totalMatches: number;
    wins: number;
    losses: number;
    winRate: string;
  };
  reigns: (Reign & { championship: Championship })[];
};

export function CompareView({
  wrestler1,
  wrestler2,
}: {
  wrestler1: WrestlerWithStats;
  wrestler2: WrestlerWithStats;
}) {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      <div className="relative">
        <HeroSection wrestler1={wrestler1} wrestler2={wrestler2} />

        <div className="container mx-auto px-6 py-12">
          <ComparisonGrid wrestler1={wrestler1} wrestler2={wrestler2} />
        </div>
      </div>
    </div>
  );
}

function HeroSection({
  wrestler1,
  wrestler2,
}: {
  wrestler1: WrestlerWithStats;
  wrestler2: WrestlerWithStats;
}) {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-gradient-radial from-accent-gold/5 via-transparent to-transparent" />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <div className="relative w-64 h-64 mx-auto mb-6 rounded-lg overflow-hidden bg-graphite">
              {wrestler1.image_url && (
                <Image
                  src={wrestler1.image_url}
                  alt={wrestler1.ring_name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <h2 className="text-4xl font-display mb-2">{wrestler1.ring_name}</h2>
            {wrestler1.hometown && (
              <p className="text-text-muted flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-2" />
                {wrestler1.hometown}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-6xl font-display gradient-gold bg-clip-text text-transparent">
              VS
            </div>
            <p className="text-text-muted mt-4">Tale of the Tape</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <div className="relative w-64 h-64 mx-auto mb-6 rounded-lg overflow-hidden bg-graphite">
              {wrestler2.image_url && (
                <Image
                  src={wrestler2.image_url}
                  alt={wrestler2.ring_name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <h2 className="text-4xl font-display mb-2">{wrestler2.ring_name}</h2>
            {wrestler2.hometown && (
              <p className="text-text-muted flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-2" />
                {wrestler2.hometown}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ComparisonGrid({
  wrestler1,
  wrestler2,
}: {
  wrestler1: WrestlerWithStats;
  wrestler2: WrestlerWithStats;
}) {
  const comparisons = [
    {
      category: 'Physical Stats',
      icon: <TrendingUp className="w-5 h-5" />,
      rows: [
        {
          label: 'Height',
          value1: wrestler1.billed_height || 'N/A',
          value2: wrestler2.billed_height || 'N/A',
        },
        {
          label: 'Weight',
          value1: wrestler1.billed_weight ? `${wrestler1.billed_weight} lbs` : 'N/A',
          value2: wrestler2.billed_weight ? `${wrestler2.billed_weight} lbs` : 'N/A',
        },
      ],
    },
    {
      category: 'Career Record',
      icon: <Award className="w-5 h-5" />,
      rows: [
        {
          label: 'Total Matches',
          value1: wrestler1.stats.totalMatches.toString(),
          value2: wrestler2.stats.totalMatches.toString(),
          winner: (wrestler1.stats.totalMatches > wrestler2.stats.totalMatches ? 'left' : wrestler1.stats.totalMatches < wrestler2.stats.totalMatches ? 'right' : null) as 'left' | 'right' | null,
        },
        {
          label: 'Wins',
          value1: wrestler1.stats.wins.toString(),
          value2: wrestler2.stats.wins.toString(),
          winner: (wrestler1.stats.wins > wrestler2.stats.wins ? 'left' : wrestler1.stats.wins < wrestler2.stats.wins ? 'right' : null) as 'left' | 'right' | null,
        },
        {
          label: 'Losses',
          value1: wrestler1.stats.losses.toString(),
          value2: wrestler2.stats.losses.toString(),
          winner: (wrestler1.stats.losses < wrestler2.stats.losses ? 'left' : wrestler1.stats.losses > wrestler2.stats.losses ? 'right' : null) as 'left' | 'right' | null,
        },
        {
          label: 'Win Rate',
          value1: `${wrestler1.stats.winRate}%`,
          value2: `${wrestler2.stats.winRate}%`,
          winner: (parseFloat(wrestler1.stats.winRate) > parseFloat(wrestler2.stats.winRate) ? 'left' : parseFloat(wrestler1.stats.winRate) < parseFloat(wrestler2.stats.winRate) ? 'right' : null) as 'left' | 'right' | null,
        },
      ],
    },
    {
      category: 'Championship Pedigree',
      icon: <Trophy className="w-5 h-5" />,
      rows: [
        {
          label: 'Total Reigns',
          value1: wrestler1.reigns.length.toString(),
          value2: wrestler2.reigns.length.toString(),
          winner: (wrestler1.reigns.length > wrestler2.reigns.length ? 'left' : wrestler1.reigns.length < wrestler2.reigns.length ? 'right' : null) as 'left' | 'right' | null,
        },
        {
          label: 'Current Champion',
          value1: wrestler1.reigns.some((r) => r.active) ? 'Yes' : 'No',
          value2: wrestler2.reigns.some((r) => r.active) ? 'Yes' : 'No',
          winner: (wrestler1.reigns.some((r) => r.active) && !wrestler2.reigns.some((r) => r.active) ? 'left' : !wrestler1.reigns.some((r) => r.active) && wrestler2.reigns.some((r) => r.active) ? 'right' : null) as 'left' | 'right' | null,
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {comparisons.map((section, idx) => (
        <motion.div
          key={section.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="glass-effect rounded-lg p-6"
        >
          <h3 className="text-2xl font-display mb-6 flex items-center text-accent-gold">
            {section.icon}
            <span className="ml-3">{section.category}</span>
          </h3>

          <div className="space-y-4">
            {section.rows.map((row, rowIdx) => (
              <ComparisonRow key={rowIdx} {...row} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ComparisonRow({
  label,
  value1,
  value2,
  winner,
}: {
  label: string;
  value1: string;
  value2: string;
  winner?: 'left' | 'right' | null;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 items-center">
      <div
        className={`text-right p-4 rounded-lg ${
          winner === 'left' ? 'bg-accent-gold/20 font-bold' : 'bg-graphite'
        }`}
      >
        {value1}
      </div>

      <div className="text-center text-text-muted font-medium">{label}</div>

      <div
        className={`text-left p-4 rounded-lg ${
          winner === 'right' ? 'bg-accent-gold/20 font-bold' : 'bg-graphite'
        }`}
      >
        {value2}
      </div>
    </div>
  );
}
