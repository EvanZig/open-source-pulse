import { useState } from 'react';
import { ChevronRight, Filter, Search, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';

const languages = [
  { label: 'TypeScript', tone: 'bg-ctp-blue' },
  { label: 'Rust', tone: 'bg-ctp-peach' },
  { label: 'JavaScript', tone: 'bg-ctp-yellow' },
  { label: 'Python', tone: 'bg-ctp-green' },
];

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const [repoInput, setRepoInput] = useState('');
  const selectedRepos = useUIStore((state) => state.selectedRepos);
  const addSelectedRepo = useUIStore((state) => state.addSelectedRepo);
  const removeSelectedRepo = useUIStore((state) => state.removeSelectedRepo);

  const handleAddRepo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && repoInput.trim()) {
      addSelectedRepo(repoInput.trim());
      setRepoInput('');
    }
  };

  return (
    <aside className={cn('flex flex-col gap-4', className)}>
      <div className="bg-card/60 border-border/60 rounded-2xl border p-4">
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

      <div className="bg-card/60 border-border/60 rounded-2xl border p-4">
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
              className="text-foreground border-border/30 bg-ctp-surface0/30 hover:border-border/60 hover:bg-ctp-surface0/70 flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition"
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

      <div className="bg-card/60 border-border/60 rounded-2xl border p-4">
        <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
          Difficulty Level
        </p>
        <div className="flex flex-col gap-2">
          {difficultyLevels.map((level) => (
            <label
              key={level}
              className="border-border/30 bg-ctp-surface0/30 hover:border-border/60 hover:bg-ctp-surface0/70 flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2 text-sm transition-all duration-300"
            >
              <span className="text-foreground/90 font-medium">{level}</span>
              <input
                type="checkbox"
                className="border-border/70 bg-ctp-base checked:bg-ctp-mauve checked:border-ctp-mauve hover:border-ctp-mauve/60 checked:after:text-ctp-crust relative h-4.5 w-4.5 cursor-pointer appearance-none rounded-md border transition-all duration-300 checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-[10px] checked:after:font-black checked:after:content-['✓'] focus:outline-none"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="bg-card/60 border-border/60 rounded-2xl border p-4">
        <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
          Active Repositories
        </p>
        <div className="relative mb-3">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
          <Input
            placeholder="Add repo..."
            value={repoInput}
            onChange={(e) => setRepoInput(e.target.value)}
            onKeyDown={handleAddRepo}
            className="h-8 rounded-xl pl-8 text-xs"
          />
        </div>
        <div className="flex flex-col gap-2">
          {selectedRepos.length === 0 && (
            <p className="text-muted-foreground py-2 text-center text-xs">No repos selected</p>
          )}
          {selectedRepos.map((repo) => (
            <div
              key={repo}
              className="group text-muted-foreground border-border/30 bg-ctp-surface0/30 hover:border-border/60 hover:bg-ctp-surface0/70 flex items-center justify-between rounded-xl border px-3 py-2 text-xs transition-all duration-300"
            >
              <span className="text-foreground/90 text-sm font-medium">{repo}</span>
              <button
                type="button"
                className="text-muted-foreground transition-colors hover:text-red-400"
                onClick={() => removeSelectedRepo(repo)}
                aria-label={`Remove ${repo}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card/60 border-border/60 mt-auto rounded-2xl border p-4">
        <div className="text-muted-foreground/70 flex items-center justify-between text-xs font-medium">
          <span className="hover:text-ctp-mauve cursor-pointer transition-colors">
            Documentation
          </span>
          <span className="hover:text-ctp-mauve cursor-pointer transition-colors">Feedback</span>
        </div>
      </div>
    </aside>
  );
}
