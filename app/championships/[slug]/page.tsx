import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Championship, Reign, Wrestler, TagTeam } from '@/lib/types';
import { LineageView } from '@/components/championships/lineage-view';

async function getChampionship(slug: string) {
  const { data, error } = await supabase
    .from('championships')
    .select(`
      *,
      reigns(*, wrestler:wrestlers(*), tag_team:tag_teams(*), won_at_event:events(*), lost_at_event:events(*))
    `)
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data as Championship & { reigns: (Reign & { wrestler?: Wrestler; tag_team?: TagTeam })[] };
}

export default async function ChampionshipPage({ params }: { params: { slug: string } }) {
  const championship = await getChampionship(params.slug);

  if (!championship) notFound();

  return <LineageView championship={championship} />;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const championship = await getChampionship(params.slug);
  return {
    title: `${championship?.name} - Championship Lineage`,
    description: `Complete lineage and history of the ${championship?.name}`,
  };
}
