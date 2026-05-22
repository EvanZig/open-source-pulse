import { ChevronRight, Filter } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const languages = [
  { label: 'TypeScript', tone: 'bg-ctp-blue' },
  { label: 'Rust', tone: 'bg-ctp-peach' },
  { label: 'JavaScript', tone: 'bg-ctp-yellow' },
  { label: 'Python', tone: 'bg-ctp-green' },
];

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
const activeRepositories = ['vercel/next.js', 'facebook/react', 'rust-lang/rust'];

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn('flex flex-col gap-4', className)}>
      <div className="bg-card/60 rounded-2xl border border-border/60 p-4">
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

      <div className="bg-card/60 rounded-2xl border border-border/60 p-4">
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
              className="text-foreground flex items-center justify-between rounded-xl border border-border/30 bg-ctp-surface0/30 px-3 py-2 text-sm transition hover:border-border/60 hover:bg-ctp-surface0/70"
            >
              <span className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${language.tone}`} />
                {language.label}
              </span>
              <Badge className="text-muted-foreground border-border/60 bg-ctp-surface0/50 text-[10px]">
                24
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card/60 rounded-2xl border border-border/60 p-4">
        <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
          Difficulty Level
        </p>
        <div className="flex flex-col gap-2">
          {difficultyLevels.map((level) => (
            <label
              key={level}
              className="flex cursor-pointer items-center justify-between rounded-xl border border-border/30 bg-ctp-surface0/30 px-3 py-2 text-sm transition-all duration-300 hover:border-border/60 hover:bg-ctp-surface0/70"
            >
              <span className="text-foreground/90 font-medium">{level}</span>
              <input
                type="checkbox"
                className="h-4.5 w-4.5 cursor-pointer appearance-none rounded-md border border-border/70 bg-ctp-base transition-all duration-300 checked:bg-ctp-mauve checked:border-ctp-mauve hover:border-ctp-mauve/60 focus:outline-none relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-[10px] checked:after:font-black checked:after:text-ctp-crust"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="bg-card/60 rounded-2xl border border-border/60 p-4">
        <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
          Active Repositories
        </p>
        <div className="flex flex-col gap-2">
          {activeRepositories.map((repo) => (
            <div
              key={repo}
              className="group text-muted-foreground flex cursor-pointer items-center justify-between rounded-xl border border-border/30 bg-ctp-surface0/30 px-3 py-2 text-xs transition-all duration-300 hover:border-border/60 hover:bg-ctp-surface0/70 hover:text-ctp-mauve"
            >
              <span className="text-foreground/90 text-sm font-medium transition-colors group-hover:text-ctp-mauve">{repo}</span>
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card/60 mt-auto rounded-2xl border border-border/60 p-4">
        <div className="text-muted-foreground/70 flex items-center justify-between text-xs font-medium">
          <span className="cursor-pointer transition-colors hover:text-ctp-mauve">Documentation</span>
          <span className="cursor-pointer transition-colors hover:text-ctp-mauve">Feedback</span>
        </div>
      </div>
    </aside>
  );
}
