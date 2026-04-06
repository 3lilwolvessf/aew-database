'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Event } from '@/lib/types';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';

async function fetchRecentEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })
    .limit(4);

  if (error) throw error;
  return data as Event[];
}

export function RecentEvents() {
  const { data: events, isLoading } = useQuery({
    queryKey: ['recent-events'],
    queryFn: fetchRecentEvents,
  });

  if (isLoading) {
    return (
      <section>
        <h2 className="text-4xl font-display mb-8 flex items-center">
          <Calendar className="w-8 h-8 mr-3 text-accent-gold" />
          Recent Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-effect rounded-lg overflow-hidden animate-pulse">
              <div className="h-48 bg-graphite" />
              <div className="p-4">
                <div className="h-6 bg-graphite rounded w-3/4 mb-2" />
                <div className="h-4 bg-graphite rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!events || events.length === 0) {
    return (
      <section>
        <h2 className="text-4xl font-display mb-8 flex items-center">
          <Calendar className="w-8 h-8 mr-3 text-accent-gold" />
          Recent Events
        </h2>
        <p className="text-text-muted">No recent events available.</p>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-display flex items-center">
          <Calendar className="w-8 h-8 mr-3 text-accent-gold" />
          Recent Events
        </h2>
        <Link
          href="/archive"
          className="text-accent-gold hover:text-accent-gold/80 transition-colors font-medium"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}

function EventCard({ event }: { event: Event }) {
  const eventTypeColors = {
    PPV: 'text-accent-crimson',
    Dynamite: 'text-accent-gold',
    Collision: 'text-accent-silver',
    Rampage: 'text-green-500',
    Special: 'text-purple-500',
    Other: 'text-text-muted',
  };

  return (
    <Link href={`/archive/${event.slug}`}>
      <div className="glass-effect rounded-lg overflow-hidden group hover:bg-accent-gold/5 transition-all duration-300">
        <div className="relative h-48 bg-graphite">
          {event.image_url && (
            <Image
              src={event.image_url}
              alt={event.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium glass-effect ${
                eventTypeColors[event.event_type]
              }`}
            >
              {event.event_type}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-display text-lg mb-2 line-clamp-1">{event.name}</h3>
          <p className="text-sm text-text-muted">{formatDate(event.date)}</p>
          {event.city && (
            <p className="text-sm text-text-muted mt-1">{event.city}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
