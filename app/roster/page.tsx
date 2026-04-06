import { supabase } from '@/lib/supabase';
import { Wrestler } from '@/lib/types';
import { RosterGrid } from '@/components/roster/roster-grid';
import { Users } from 'lucide-react';

async function fetchWrestlers() {
  const { data, error } = await supabase
    .from('wrestlers')
    .select('*')
    .order('ring_name');

  if (error) throw error;
  return data as Wrestler[];
}

export default async function RosterPage() {
  const wrestlers = await fetchWrestlers();

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-6xl font-display mb-4 flex items-center">
            <Users className="w-12 h-12 mr-4 text-accent-gold" />
            ROSTER
          </h1>
          <p className="text-xl text-text-muted">
            Complete AEW wrestler roster
          </p>
        </div>

        <RosterGrid wrestlers={wrestlers} />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Roster - AEW Atlas',
  description: 'Browse the complete AEW wrestling roster',
};
