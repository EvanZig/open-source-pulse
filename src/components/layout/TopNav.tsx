import { Bell, Search, Settings, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  active?: boolean;
};

const navItems: NavItem[] = [
  { label: 'Explore', active: true },
  { label: 'My Issues' },
  { label: 'Saved' },
];

export function TopNav() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/80 via-indigo-500/70 to-violet-500/80 text-xs font-semibold text-white">
            OS
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Open Source Pulse</p>
            <p className="text-muted-foreground text-xs">Discover curated issues</p>
          </div>
        </div>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="tab"
              size="sm"
              className={cn(
                'rounded-full px-4',
                item.active &&
                  'text-foreground bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]',
              )}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <div className="relative hidden w-full max-w-md xl:block">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input placeholder="Search issues, repos, labels..." />
        </div>
        <Button variant="ghost" size="icon" aria-label="Search" className="xl:hidden">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Profile">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
