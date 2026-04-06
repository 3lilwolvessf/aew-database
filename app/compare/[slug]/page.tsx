import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Wrestler } from '@/lib/types';
import { CompareView } from '@/components/compare/compare-view';

async function getWrestlerBySlug(slug: string): Promise<Wrestler | null> {
  const { data, error } = await supabase
    .from('wrestlers')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function getWrestlerStats(wrestlerId: string) {
  const { data: participations, error } = await supabase
    .from('match_participants')
    .select('*, match:matches(*)')
    .eq('wrestler_id', wrestlerId);

  if (error) throw error;

  const totalMatches = participations?.length || 0;
  const wins = participations?.filter((p) => p.winner).length || 0;
  const losses = participations?.filter((p) => !p.winner).length || 0;

  return {
    totalMatches,
    wins,
    losses,
    winRate: totalMatches > 0 ? ((wins / totalMatches) * 100).toFixed(1) : '0',
  };
}

async function getWrestlerReigns(wrestlerId: string) {
  const { data: reigns, error } = await supabase
    .from('reigns')
    .select('*, championship:championships(*)')
    .eq('champion_wrestler_id', wrestlerId);

  if (error) throw error;
  return reigns || [];
}

export default async function ComparePage({ params }: { params: { slug: string } }) {
  const slugs = params.slug.split('-vs-');
  if (slugs.length !== 2) notFound();

  const [wrestler1, wrestler2] = await Promise.all([
    getWrestlerBySlug(slugs[0]),
    getWrestlerBySlug(slugs[1]),
  ]);

  if (!wrestler1 || !wrestler2) notFound();

  const [stats1, stats2, reigns1, reigns2] = await Promise.all([
    getWrestlerStats(wrestler1.id),
    getWrestlerStats(wrestler2.id),
    getWrestlerReigns(wrestler1.id),
    getWrestlerReigns(wrestler2.id),
  ]);

  return (
    <CompareView
      wrestler1={{ ...wrestler1, stats: stats1, reigns: reigns1 }}
      wrestler2={{ ...wrestler2, stats: stats2, reigns: reigns2 }}
    />
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slugs = params.slug.split('-vs-');
  const [wrestler1, wrestler2] = await Promise.all([
    getWrestlerBySlug(slugs[0]),
    getWrestlerBySlug(slugs[1]),
  ]);

  return {
    title: `${wrestler1?.ring_name} vs ${wrestler2?.ring_name} - Tale of the Tape`,
    description: `Compare ${wrestler1?.ring_name} and ${wrestler2?.ring_name} head-to-head`,
  };
}
