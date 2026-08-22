import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Plus, RotateCcw, Search, Sparkles, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useUIStore, type DifficultyLevel } from '@/store/uiStore';
import { cn } from '@/lib/utils';

const languages = [
  { label: 'TypeScript', tone: 'bg-ctp-blue', activeTone: 'border-ctp-blue/50 bg-ctp-blue/15' },
  { label: 'Rust', tone: 'bg-ctp-peach', activeTone: 'border-ctp-peach/50 bg-ctp-peach/15' },
  {
    label: 'JavaScript',
    tone: 'bg-ctp-yellow',
    activeTone: 'border-ctp-yellow/50 bg-ctp-yellow/15',
  },
  { label: 'Python', tone: 'bg-ctp-green', activeTone: 'border-ctp-green/50 bg-ctp-green/15' },
];

const difficultyLevels: { value: DifficultyLevel; color: string }[] = [
  { value: 'Beginner', color: 'bg-ctp-green' },
  { value: 'Intermediate', color: 'bg-ctp-yellow' },
  { value: 'Advanced', color: 'bg-ctp-red' },
];

const suggestedRepos = [
  'vercel/next.js',
  'facebook/react',
  'rust-lang/rust',
  'denoland/deno',
  'microsoft/TypeScript',
];

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const [repoInput, setRepoInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [langCollapsed, setLangCollapsed] = useState(false);
  const [diffCollapsed, setDiffCollapsed] = useState(false);

  const selectedLanguages = useUIStore((s) => s.selectedLanguages);
  const selectedDifficulties = useUIStore((s) => s.selectedDifficulties);
  const selectedRepos = useUIStore((s) => s.selectedRepos);
  const toggleLanguage = useUIStore((s) => s.toggleLanguage);
  const toggleDifficulty = useUIStore((s) => s.toggleDifficulty);
  const addSelectedRepo = useUIStore((s) => s.addSelectedRepo);
  const removeSelectedRepo = useUIStore((s) => s.removeSelectedRepo);
  const clearAllFilters = useUIStore((s) => s.clearAllFilters);

  const totalFilters =
    selectedLanguages.length + selectedDifficulties.length + selectedRepos.length;

  const handleAddRepo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && repoInput.trim()) {
      addSelectedRepo(repoInput.trim());
      setRepoInput('');
    }
  };

  const availableSuggestions = suggestedRepos.filter((r) => !selectedRepos.includes(r));

  return (
    <aside className={cn('flex flex-col gap-3', className)}>
      {/* Active filters summary */}
      {totalFilters > 0 && (
        <div className="bg-ctp-mauve/5 border-ctp-mauve/20 flex items-center justify-between rounded-xl border px-3 py-2.5">
          <span className="text-foreground/90 text-xs font-medium">
            {totalFilters} active filter{totalFilters !== 1 ? 's' : ''}
          </span>
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-ctp-mauve hover:text-ctp-mauve/70 flex items-center gap-1 text-xs font-medium transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Clear all
          </button>
        </div>
      )}

      {/* Languages */}
      <div className="bg-card/60 border-border/60 rounded-2xl border p-4">
        <button
          type="button"
          onClick={() => setLangCollapsed((v) => !v)}
          className="mb-3 flex w-full items-center justify-between"
        >
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
            Languages
            {selectedLanguages.length > 0 && (
              <span className="bg-ctp-mauve/20 text-ctp-mauve ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
                {selectedLanguages.length}
              </span>
            )}
          </p>
          {langCollapsed ? (
            <ChevronDown className="text-muted-foreground h-3.5 w-3.5" />
          ) : (
            <ChevronUp className="text-muted-foreground h-3.5 w-3.5" />
          )}
        </button>
        {!langCollapsed && (
          <div className="flex flex-col gap-2">
            {languages.map((language) => {
              const isActive = selectedLanguages.includes(language.label);
              return (
                <button
                  key={language.label}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggleLanguage(language.label)}
                  className={cn(
                    'flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-all duration-200',
                    isActive
                      ? `${language.activeTone} text-foreground`
                      : 'border-border/30 bg-ctp-surface0/30 text-foreground hover:border-border/60 hover:bg-ctp-surface0/70',
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        'h-2.5 w-2.5 rounded-full transition-transform',
                        language.tone,
                        isActive && 'scale-125',
                      )}
                    />
                    {language.label}
                  </span>
                  {isActive && <Check className="text-ctp-mauve h-3.5 w-3.5" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Difficulty */}
      <div className="bg-card/60 border-border/60 rounded-2xl border p-4">
        <button
          type="button"
          onClick={() => setDiffCollapsed((v) => !v)}
          className="mb-3 flex w-full items-center justify-between"
        >
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
            Difficulty
            {selectedDifficulties.length > 0 && (
              <span className="bg-ctp-mauve/20 text-ctp-mauve ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
                {selectedDifficulties.length}
              </span>
            )}
          </p>
          {diffCollapsed ? (
            <ChevronDown className="text-muted-foreground h-3.5 w-3.5" />
          ) : (
            <ChevronUp className="text-muted-foreground h-3.5 w-3.5" />
          )}
        </button>
        {!diffCollapsed && (
          <div className="flex flex-col gap-2">
            {difficultyLevels.map(({ value, color }) => {
              const isActive = selectedDifficulties.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggleDifficulty(value)}
                  className={cn(
                    'flex items-center justify-between rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'border-ctp-mauve/40 bg-ctp-surface0/70 text-foreground'
                      : 'border-border/30 bg-ctp-surface0/30 text-foreground/90 hover:border-border/60 hover:bg-ctp-surface0/70',
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className={cn('h-2 w-2 rounded-full', color)} />
                    {value}
                  </span>
                  <div
                    className={cn(
                      'flex h-4.5 w-4.5 items-center justify-center rounded-md border transition-all duration-200',
                      isActive
                        ? 'border-ctp-mauve bg-ctp-mauve'
                        : 'border-border/70 bg-ctp-base hover:border-ctp-mauve/60',
                    )}
                  >
                    {isActive && <Check className="text-ctp-crust h-3 w-3" strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Active Repositories */}
      <div className="bg-card/60 border-border/60 rounded-2xl border p-4">
        <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
          Repositories
          {selectedRepos.length > 0 && (
            <span className="bg-ctp-mauve/20 text-ctp-mauve ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
              {selectedRepos.length}
            </span>
          )}
        </p>
        <div className="relative mb-3">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
          <Input
            placeholder="owner/repo + Enter"
            value={repoInput}
            onChange={(e) => setRepoInput(e.target.value)}
            onKeyDown={handleAddRepo}
            className="h-8 rounded-xl pl-8 text-xs"
          />
        </div>

        <div className="flex flex-col gap-2">
          {selectedRepos.map((repo) => (
            <div
              key={repo}
              className="group border-ctp-mauve/20 bg-ctp-mauve/5 flex items-center justify-between rounded-xl border px-3 py-2 transition-all duration-200"
            >
              <span className="text-foreground/90 truncate text-sm font-medium">{repo}</span>
              <button
                type="button"
                className="text-muted-foreground ml-2 shrink-0 transition-colors hover:text-red-400"
                onClick={() => removeSelectedRepo(repo)}
                aria-label={`Remove ${repo}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {selectedRepos.length === 0 && !showSuggestions && (
            <button
              type="button"
              onClick={() => setShowSuggestions(true)}
              className="text-muted-foreground hover:text-ctp-mauve flex items-center justify-center gap-1.5 py-3 text-xs transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Show suggested repos
            </button>
          )}

          {showSuggestions && availableSuggestions.length > 0 && (
            <div className="border-border/30 mt-1 flex flex-col gap-1.5 border-t pt-2">
              <p className="text-muted-foreground/70 mb-0.5 text-[10px] font-semibold tracking-widest uppercase">
                Suggestions
              </p>
              {availableSuggestions.map((repo) => (
                <button
                  key={repo}
                  type="button"
                  onClick={() => addSelectedRepo(repo)}
                  className="text-muted-foreground hover:text-foreground hover:bg-ctp-surface0/50 flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-all"
                >
                  <Plus className="h-3 w-3" />
                  {repo}
                </button>
              ))}
            </div>
          )}

          {showSuggestions && availableSuggestions.length === 0 && selectedRepos.length > 0 && (
            <button
              type="button"
              onClick={() => setShowSuggestions(false)}
              className="text-muted-foreground/60 py-1 text-center text-[10px]"
            >
              All suggested repos added
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-card/60 border-border/60 mt-auto rounded-2xl border p-4">
        <div className="text-muted-foreground/70 flex items-center justify-between text-xs font-medium">
          <a
            href="https://github.com/open-source-pulse/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ctp-mauve transition-colors"
          >
            Documentation
          </a>
          <span className="bg-border/40 h-3 w-px" aria-hidden="true" />
          <a
            href="https://github.com/open-source-pulse/feedback/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ctp-mauve transition-colors"
          >
            Feedback
          </a>
        </div>
      </div>
    </aside>
  );
}
