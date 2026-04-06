import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Event } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { Calendar, MapPin, Building } from 'lucide-react';

async function getEvent(slug: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);

  if (!event) notFound();

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {event.image_url && (
            <div className="relative h-96 rounded-lg overflow-hidden mb-8 bg-graphite">
              <Image src={event.image_url} alt={event.name} fill className="object-cover" />
            </div>
          )}

          <div className="glass-effect rounded-lg p-8">
            <span className="inline-block px-4 py-2 rounded-full bg-accent-gold text-background text-sm font-medium mb-4">
              {event.event_type}
            </span>

            <h1 className="text-5xl font-display mb-6">{event.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-accent-gold" />
                <div>
                  <div className="text-sm text-text-muted">Date</div>
                  <div className="font-medium">{formatDate(event.date)}</div>
                </div>
              </div>

              {event.venue && (
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-accent-gold" />
                  <div>
                    <div className="text-sm text-text-muted">Venue</div>
                    <div className="font-medium">{event.venue}</div>
                  </div>
                </div>
              )}

              {event.city && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-accent-gold" />
                  <div>
                    <div className="text-sm text-text-muted">Location</div>
                    <div className="font-medium">{event.city}</div>
                  </div>
                </div>
              )}
            </div>

            {event.description && <p className="text-text-muted leading-relaxed">{event.description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  return {
    title: `${event?.name} - AEW Atlas`,
    description: event?.description || `Details for ${event?.name}`,
  };
}
