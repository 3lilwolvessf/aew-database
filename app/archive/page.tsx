import { supabase } from '@/lib/supabase';
import { Event } from '@/lib/types';
import { EventsGrid } from '@/components/archive/events-grid';
import { Calendar } from 'lucide-react';

async function fetchEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return data as Event[];
}

export default async function ArchivePage() {
  const events = await fetchEvents();

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-6xl font-display mb-4 flex items-center">
            <Calendar className="w-12 h-12 mr-4 text-accent-gold" />
            EVENT ARCHIVE
          </h1>
          <p className="text-xl text-text-muted">
            Complete history of AEW events from the beginning
          </p>
        </div>

        <EventsGrid events={events} />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Event Archive - AEW Atlas',
  description: 'Browse the complete history of AEW events',
};
