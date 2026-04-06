'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-accent-gold/10 via-transparent to-transparent" />

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect mb-6">
            <Zap className="w-4 h-4 text-accent-gold" />
            <span className="text-sm font-medium">The Ultimate Wrestling Archive</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-display tracking-wider mb-6">
            <span className="gradient-gold bg-clip-text text-transparent">
              AEW ATLAS
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
            Explore AEW history through cinematic Tale of the Tape comparisons,
            comprehensive event archives, and championship lineage tracking
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="group">
              <Link href="/compare">
                Start Tale of the Tape
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/archive">
                Browse Archive
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <StatsCard number="50+" label="Active Wrestlers" />
          <StatsCard number="30+" label="Historic Events" />
          <StatsCard number="8+" label="Championships" />
        </motion.div>
      </div>
    </section>
  );
}

function StatsCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="glass-effect rounded-lg p-6 hover:bg-accent-gold/5 transition-colors">
      <div className="text-4xl font-display gradient-gold bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-text-muted">{label}</div>
    </div>
  );
}
