import { useCallback, useEffect, useRef, useState } from 'react';
import { Bell, Menu, Search, Settings, User } from 'lucide-react';

import { LogoMark } from '@/components/layout/LogoMark';
import { SettingsMenu } from '@/components/layout/SettingsMenu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const navItems = ['Explore', 'My Issues', 'Saved'];

const mockNotifications = [
  {
    id: 1,
    title: 'New issue assignment',
    description: 'You have been assigned to #142 on vercel/next.js',
    time: '2m ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Mentioned in PR',
    description: 'You were mentioned in a comment on facebook/react',
    time: '1h ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Issue closed',
    description: 'Issue #84 on rust-lang/rust was closed',
    time: '1d ago',
    unread: false,
  },
];

type TopNavProps = {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  activeItem?: string;
  onSelectItem?: (item: string) => void;
};

export function TopNav({ onToggleSidebar, isSidebarOpen, activeItem, onSelectItem }: TopNavProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const closeSettings = useCallback(() => setShowSettings(false), []);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showNotifications) return;

    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowNotifications(false);
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [showNotifications]);

  return (
    <header className="supports-backdrop-filter:bg-background/15 sticky top-0 z-30 flex flex-col gap-3 bg-transparent px-4 py-3 backdrop-blur sm:px-6">
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
                <span className="from-ctp-green via-ctp-teal to-ctp-peach bg-linear-to-r bg-clip-text text-transparent">
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
                      'text-foreground bg-ctp-surface0 shadow-[0_0_0_1px_rgba(203,166,247,0.2)]',
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
            <Input placeholder="Search issues, repos, labels..." className="pl-10" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Search" className="lg:hidden">
            <Search className="h-4 w-4" />
          </Button>

          <div className="relative" ref={notifRef}>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="bg-ctp-mauve absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-ctp-mauve relative inline-flex h-2 w-2 rounded-full" />
              </span>
            </Button>

            {showNotifications && (
              <div className="border-border/60 bg-card absolute right-0 z-50 mt-2 flex w-80 flex-col gap-3 rounded-xl border p-4 shadow-lg">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground cursor-pointer text-xs transition-colors"
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="app-scrollbar flex max-h-[300px] flex-col gap-2 overflow-y-auto pr-1">
                  {mockNotifications.map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        'border-border/30 flex flex-col gap-1 rounded-lg border p-3 text-left transition-colors',
                        n.unread ? 'bg-ctp-surface0/40' : 'hover:bg-ctp-surface0/20 bg-transparent',
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={cn(
                            'text-sm font-medium',
                            n.unread ? 'text-foreground' : 'text-muted-foreground',
                          )}
                        >
                          {n.title}
                        </span>
                        <span className="text-muted-foreground text-[10px] whitespace-nowrap">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                        {n.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Settings"
              onClick={() => setShowSettings((v) => !v)}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <SettingsMenu open={showSettings} onClose={closeSettings} />
          </div>
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
                isActive &&
                  'text-foreground bg-ctp-surface0 shadow-[0_0_0_1px_rgba(203,166,247,0.2)]',
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
