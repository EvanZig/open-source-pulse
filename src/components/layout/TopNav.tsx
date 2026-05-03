import { Bell, Menu, Search, Settings, User } from 'lucide-react';

import { LogoMark } from '@/components/layout/LogoMark';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const navItems = ['Explore', 'My Issues', 'Saved'];

type TopNavProps = {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  activeItem?: string;
  onSelectItem?: (item: string) => void;
};

export function TopNav({ onToggleSidebar, isSidebarOpen, activeItem, onSelectItem }: TopNavProps) {
  return (
    <header className="supports-[backdrop-filter]:bg-background/15 sticky top-0 z-30 flex flex-col gap-3 bg-transparent px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3">
            {onToggleSidebar ? (
              <Button
                variant="ghost"
                size="icon"
                aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                aria-controls="mobile-sidebar"
                aria-expanded={isSidebarOpen}
                className="h-8 w-8 lg:hidden"
                onClick={onToggleSidebar}
              >
                <Menu className="h-4 w-4" />
              </Button>
            ) : null}
            <LogoMark className="h-10 w-10 sm:h-11 sm:w-11" />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">
                Open Source{' '}
                <span className="bg-gradient-to-r from-emerald-200 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
                  Pulse
                </span>
              </p>
              <p className="text-muted-foreground text-xs">Discover curated issues</p>
            </div>
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const isActive = item === activeItem;

              return (
                <Button
                  key={item}
                  type="button"
                  variant="tab"
                  size="sm"
                  aria-pressed={isActive}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => onSelectItem?.(item)}
                  className={cn(
                    'rounded-full px-4',
                    isActive &&
                      'text-foreground bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]',
                  )}
                >
                  {item}
                </Button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center justify-end gap-3">
          <div className="relative hidden w-full max-w-md lg:block">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="Search issues, repos, labels..." />
          </div>
          <Button variant="ghost" size="icon" aria-label="Search" className="lg:hidden">
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
      </div>

      <nav className="flex items-center gap-2 overflow-x-auto pb-1 md:hidden">
        {navItems.map((item) => {
          const isActive = item === activeItem;

          return (
            <Button
              key={`mobile-${item}`}
              type="button"
              variant="tab"
              size="sm"
              aria-pressed={isActive}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onSelectItem?.(item)}
              className={cn(
                'shrink-0 rounded-full px-4',
                isActive && 'text-foreground bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]',
              )}
            >
              {item}
            </Button>
          );
        })}
      </nav>
    </header>
  );
}
