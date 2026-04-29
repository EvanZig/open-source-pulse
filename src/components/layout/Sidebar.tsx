import { ChevronRight, Filter } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const languages = [
  { label: 'TypeScript', tone: 'bg-sky-500/80' },
  { label: 'Rust', tone: 'bg-orange-500/80' },
  { label: 'JavaScript', tone: 'bg-amber-400/90' },
  { label: 'Python', tone: 'bg-emerald-500/80' },
];

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
const activeRepositories = ['vercel/next.js', 'facebook/react', 'rust-lang/rust'];

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn('flex flex-col gap-4', className)}>
      <div className="bg-card/60 rounded-2xl border border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Explorer</p>
            <p className="text-muted-foreground text-xs">Filter contributions</p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Filters">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-card/60 rounded-2xl border border-white/10 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
            Languages
          </p>
          <ChevronRight className="text-muted-foreground h-4 w-4" />
        </div>
        <div className="flex flex-col gap-3">
          {languages.map((language) => (
            <button
              key={language.label}
              className="text-foreground flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm transition hover:border-white/15 hover:bg-white/10"
            >
              <span className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${language.tone}`} />
                {language.label}
              </span>
              <Badge className="text-muted-foreground border-white/10 bg-white/5 text-[10px]">
                24
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card/60 rounded-2xl border border-white/10 p-4">
        <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
          Difficulty Level
        </p>
        <div className="flex flex-col gap-2">
          {difficultyLevels.map((level) => (
            <label
              key={level}
              className="flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm transition hover:border-white/15 hover:bg-white/10"
            >
              <span>{level}</span>
              <input type="checkbox" className="bg-background h-4 w-4 rounded border-white/30" />
            </label>
          ))}
        </div>
      </div>

      <div className="bg-card/60 rounded-2xl border border-white/10 p-4">
        <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
          Active Repositories
        </p>
        <div className="flex flex-col gap-2">
          {activeRepositories.map((repo) => (
            <div
              key={repo}
              className="text-muted-foreground flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-xs"
            >
              <span className="text-foreground text-sm">{repo}</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card/60 mt-auto rounded-2xl border border-white/10 p-4">
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span>Documentation</span>
          <span>Feedback</span>
        </div>
      </div>
    </aside>
  );
}
