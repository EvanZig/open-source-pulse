'use client';

import { useEffect, useRef } from 'react';
import {
  ArrowDownNarrowWide,
  Eye,
  EyeOff,
  Grid3X3,
  Key,
  LayoutList,
  RotateCcw,
  Rows3,
  Type,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  useUIStore,
  type CardLayout,
  type DefaultTab,
  type IssuesPerPage,
  type SortOrder,
} from '@/store/uiStore';
import { cn } from '@/lib/utils';

const layoutOptions: { value: CardLayout; label: string; icon: typeof Grid3X3 }[] = [
  { value: 'grid', label: 'Grid', icon: Grid3X3 },
  { value: 'list', label: 'List', icon: LayoutList },
];

const perPageOptions: IssuesPerPage[] = [12, 24, 48];

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: 'recent', label: 'Recently Updated' },
  { value: 'most-comments', label: 'Most Comments' },
  { value: 'oldest', label: 'Oldest First' },
];

const tabOptions: DefaultTab[] = ['Explore', 'My Issues', 'Saved'];

type SettingsMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function SettingsMenu({ open, onClose }: SettingsMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const settings = useUIStore((s) => s.settings);
  const updateSettings = useUIStore((s) => s.updateSettings);
  const resetSettings = useUIStore((s) => s.resetSettings);

  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Settings"
      className="border-border/60 bg-card app-scrollbar absolute right-0 z-50 mt-2 flex max-h-[min(80vh,600px)] w-80 flex-col gap-1 overflow-y-auto rounded-xl border shadow-lg"
    >
      {/* Header */}
      <div className="bg-card sticky top-0 z-10 flex items-center justify-between border-b border-border/30 px-4 py-3">
        <h3 className="text-sm font-semibold">Settings</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {/* — Layout — */}
        <Section title="Layout">
          <SegmentedPicker
            options={layoutOptions.map(({ value, label, icon: Icon }) => ({
              value,
              label: (
                <span className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5" /> {label}
                </span>
              ),
            }))}
            selected={settings.cardLayout}
            onChange={(v) => updateSettings({ cardLayout: v as CardLayout })}
          />

          <ToggleRow
            label="Show labels"
            checked={settings.showLabels}
            onChange={(v) => updateSettings({ showLabels: v })}
            icon={settings.showLabels ? Eye : EyeOff}
          />

          <ToggleRow
            label="Compact cards"
            checked={settings.compactCards}
            onChange={(v) => updateSettings({ compactCards: v })}
            icon={Rows3}
          />

          <ToggleRow
            label="Readable font"
            description="Use Atkinson Hyperlegible for improved legibility"
            checked={settings.useReadableFont}
            onChange={(v) => updateSettings({ useReadableFont: v })}
            icon={Type}
          />
        </Section>

        {/* — Defaults — */}
        <Section title="Defaults">
          <fieldset className="flex flex-col gap-1.5">
            <legend className="text-muted-foreground mb-1 flex items-center gap-1.5 text-[11px] font-medium">
              <ArrowDownNarrowWide className="h-3 w-3" />
              Default sort
            </legend>
            <SegmentedPicker
              options={sortOptions.map(({ value, label }) => ({ value, label }))}
              selected={settings.defaultSort}
              onChange={(v) => updateSettings({ defaultSort: v as SortOrder })}
              compact
            />
          </fieldset>

          <fieldset className="flex flex-col gap-1.5">
            <legend className="text-muted-foreground mb-1 text-[11px] font-medium">
              Landing tab
            </legend>
            <SegmentedPicker
              options={tabOptions.map((t) => ({ value: t, label: t }))}
              selected={settings.defaultTab}
              onChange={(v) => updateSettings({ defaultTab: v as DefaultTab })}
              compact
            />
          </fieldset>

          <fieldset className="flex flex-col gap-1.5">
            <legend className="text-muted-foreground mb-1 text-[11px] font-medium">
              Issues per page
            </legend>
            <SegmentedPicker
              options={perPageOptions.map((n) => ({ value: String(n), label: String(n) }))}
              selected={String(settings.issuesPerPage)}
              onChange={(v) => updateSettings({ issuesPerPage: Number(v) as IssuesPerPage })}
              compact
            />
          </fieldset>
        </Section>

        {/* — GitHub — */}
        <Section title="GitHub Integration">
          <p className="text-muted-foreground/70 text-[11px] leading-relaxed">
            Add a personal access token to increase API rate limits from 60 to 5,000 requests/hr.
          </p>
          <div className="relative">
            <Key className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
            <Input
              type="password"
              placeholder="ghp_..."
            value={settings.githubToken ?? ''}
            onChange={(e) => updateSettings({ githubToken: e.target.value })}
              className="h-8 rounded-xl pl-8 text-xs"
            />
          </div>
        </Section>

        {/* Reset */}
        <button
          type="button"
          onClick={resetSettings}
          className="text-muted-foreground hover:text-foreground hover:bg-ctp-surface0/40 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Reset to defaults
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-muted-foreground text-xs font-semibold tracking-[0.15em] uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}

function SegmentedPicker({
  options,
  selected,
  onChange,
  compact,
}: {
  options: { value: string; label: React.ReactNode }[];
  selected: string;
  onChange: (value: string) => void;
  compact?: boolean;
}) {
  return (
    <div className="bg-ctp-surface0/20 border-border/30 flex gap-1 rounded-lg border p-1">
      {options.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={selected === value}
          onClick={() => onChange(value)}
          className={cn(
            'flex-1 rounded-md text-xs font-medium transition-all',
            compact ? 'px-2 py-1.5' : 'px-3 py-2',
            selected === value
              ? 'bg-ctp-surface0/80 text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
  icon: Icon,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  icon: typeof Eye;
}) {
  return (
    <label className="border-border/30 bg-ctp-surface0/20 hover:bg-ctp-surface0/40 flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2 transition-all">
      <span className="flex min-w-0 items-center gap-2">
        <Icon className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
        <span className="flex flex-col">
          <span className="text-foreground/90 text-xs font-medium">{label}</span>
          {description && (
            <span className="text-muted-foreground/60 text-[10px] leading-snug">{description}</span>
          )}
        </span>
      </span>
      <div className="relative shrink-0">
        <input
          type="checkbox"
          checked={!!checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <div
          className={cn(
            'h-5 w-9 rounded-full border transition-colors',
            checked
              ? 'border-ctp-mauve/60 bg-ctp-mauve/80'
              : 'border-border/60 bg-ctp-surface0/60',
          )}
        />
        <div
          className={cn(
            'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all',
            checked ? 'left-[18px]' : 'left-0.5',
          )}
        />
      </div>
    </label>
  );
}
