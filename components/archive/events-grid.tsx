'use client';

import { Event } from '@/lib/types';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function EventsGrid({ events }: { events: Event[] }) {
  const [filter, setFilter] = useState<string>('all');

  const filteredEvents =
    filter === 'all' ? events : events.filter((e) => e.event_type === filter);

  const eventTypes = ['all', 'PPV', 'Dynamite', 'Collision', 'Rampage', 'Special'];

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {eventTypes.map((type) => (
          <Button
            key={type}
            variant={filter === type ? 'default' : 'outline'}
            onClick={() => setFilter(type)}
            size="sm"
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  );
}

function EventCard({ event }: { event: Event }) {
  const eventTypeColors = {
    PPV: 'bg-accent-crimson',
    Dynamite: 'bg-accent-gold',
    Collision: 'bg-accent-silver',
    Rampage: 'bg-green-600',
    Special: 'bg-purple-600',
    Other: 'bg-graphite',
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
              className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
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
          {event.city && <p className="text-sm text-text-muted mt-1">{event.city}</p>}
        </div>
      </div>
    </Link>
  );
}
