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

export function HomeLayout({ issues }: HomeLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute top-[10%] right-[-5%] h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04),_transparent_55%)]" />
      </div>

      <div className="flex min-h-screen">
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
              'bg-background/95 absolute top-0 left-0 h-full w-[85%] max-w-xs border-r border-white/10 backdrop-blur transition-transform duration-300',
              isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            )}
          >
            <Sidebar className="h-full w-full px-4 py-6" />
          </div>
        </div>

        <div
          className={cn(
            'relative hidden shrink-0 overflow-hidden border-r border-white/5 transition-[width] duration-300 lg:block',
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
              'bg-background/70 text-foreground absolute top-6 right-3 z-20 hidden rounded-full border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur lg:inline-flex',
              !isSidebarOpen && 'right-2',
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

        <div className="order-1 flex min-w-0 flex-1 flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:order-2 lg:min-h-screen">
          <TopNav
            onToggleSidebar={() => setMobileSidebarOpen((open) => !open)}
            isSidebarOpen={isMobileSidebarOpen}
          />

          <section className="flex flex-1 flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold">Explore issues</h1>
                <p className="text-muted-foreground text-sm">
                  Found 142 relevant issues matching your developer profile.
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

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {issues.map((issue) => (
                <IssueCard key={`${issue.repo}-${issue.title}`} {...issue} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
