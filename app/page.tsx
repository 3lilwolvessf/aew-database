import { HeroSection } from '@/components/home/hero-section';
import { CurrentChampions } from '@/components/home/current-champions';
import { RecentEvents } from '@/components/home/recent-events';
import { TrendingWrestlers } from '@/components/home/trending-wrestlers';

export default function HomePage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      <HeroSection />

      <div className="container mx-auto px-6 py-12 space-y-16">
        <CurrentChampions />
        <RecentEvents />
        <TrendingWrestlers />
      </div>
    </div>
  );
}
