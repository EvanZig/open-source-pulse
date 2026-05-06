'use client';

import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

import { IssueCard, type IssueCardProps } from '@/components/layout/IssueCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type HomeLayoutProps = {
  issues: IssueCardProps[];
};

type NavItemLabel = 'Explore' | 'My Issues' | 'Saved';

export function HomeLayout({ issues }: HomeLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<NavItemLabel>('Explore');
  const isExploreView = activeNavItem === 'Explore';

  const navCopy: Record<NavItemLabel, { title: string; description: string }> = {
    Explore: {
      title: 'Explore issues',
      description: 'Found 142 relevant issues matching your developer profile.',
    },
    'My Issues': {
      title: 'My issues',
      description: 'Track issues you are actively contributing to right now.',
    },
    Saved: {
      title: 'Saved issues',
      description: 'Your shortlist of issues to revisit is waiting here.',
    },
  };

  return (
    <main className="relative h-screen overflow-x-visible overflow-y-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute top-[10%] right-[-5%] h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04),_transparent_55%)]" />
      </div>

      <div className="flex h-screen overflow-x-visible overflow-y-hidden">
        <div
          className={cn(
            'fixed inset-0 z-40 transition lg:hidden',
            isMobileSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none',
          )}
          aria-hidden={!isMobileSidebarOpen}
        >
          <button
            type="button"
            className={cn(
              'absolute inset-0 bg-black/50 transition-opacity',
              isMobileSidebarOpen ? 'opacity-100' : 'opacity-0',
            )}
            aria-label="Close sidebar"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div
            id="mobile-sidebar"
            className={cn(
              'sidebar-scrollbar bg-background/95 absolute top-0 left-0 z-99 h-full w-[85%] max-w-xs overflow-y-auto border-r border-white/10 backdrop-blur transition-transform duration-300',
              isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            )}
          >
            <Sidebar className="h-full w-full px-4 py-6" />
          </div>
        </div>

        <div
          className={cn(
            'sidebar-scrollbar relative hidden shrink-0 overflow-x-visible overflow-y-auto border-r border-white/5 transition-[width] duration-300 lg:block lg:h-screen',
            isSidebarOpen ? 'lg:w-72' : 'lg:w-14',
          )}
        >
          <Sidebar
            className={cn(
              'h-full w-72 px-4 py-8 transition-all duration-300',
              isSidebarOpen
                ? 'lg:translate-x-0 lg:opacity-100'
                : 'lg:pointer-events-none lg:-translate-x-4 lg:opacity-0',
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={isSidebarOpen}
            className={cn(
              'bg-background/80 text-foreground absolute top-93 right-[-1] z-99 hidden rounded-full border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur lg:inline-flex',
            )}
            onClick={() => setSidebarOpen((open) => !open)}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="app-scrollbar order-1 flex min-h-0 min-w-0 flex-1 flex-col gap-6 overflow-y-auto px-4 pt-0 pb-6 sm:gap-8 sm:px-6 sm:pt-0 sm:pb-8 lg:order-2">
          <TopNav
            onToggleSidebar={() => setMobileSidebarOpen((open) => !open)}
            isSidebarOpen={isMobileSidebarOpen}
            activeItem={activeNavItem}
            onSelectItem={(item) => setActiveNavItem(item as NavItemLabel)}
          />

          <section className="flex flex-1 flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold">{navCopy[activeNavItem].title}</h1>
                <p className="text-muted-foreground text-sm">
                  {navCopy[activeNavItem].description}
                </p>
              </div>
              <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                <Button variant="outline" size="sm" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  Recently Updated
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {isExploreView ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {issues.map((issue) => (
                  <IssueCard key={issue.id} {...issue} />
                ))}
              </div>
            ) : (
              <div className="bg-card/40 text-muted-foreground flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-white/10 px-6 text-center text-sm">
                <p className="text-foreground text-base font-semibold">
                  {activeNavItem === 'My Issues' ? 'No active issues yet.' : 'Nothing saved yet.'}
                </p>
                <p className="mt-2 max-w-md">
                  {activeNavItem === 'My Issues'
                    ? 'Once you start contributing, your working issues will appear here.'
                    : 'Save issues from Explore to build a shortlist you can revisit later.'}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
