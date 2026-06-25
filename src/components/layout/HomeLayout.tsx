'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, Frown } from 'lucide-react';

import { IssueCard, type IssueCardProps } from '@/components/layout/IssueCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';
import { Button } from '@/components/ui/button';
import { useUIStore, type DefaultTab } from '@/store/uiStore';
import { cn } from '@/lib/utils';

type HomeLayoutProps = {
  issues: IssueCardProps[];
};

export function HomeLayout({ issues }: HomeLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const defaultTab = useUIStore((s) => s.settings.defaultTab);
  const [activeNavItem, setActiveNavItem] = useState<DefaultTab>(defaultTab);
  const isExploreView = activeNavItem === 'Explore';

  const selectedRepos = useUIStore((s) => s.selectedRepos);
  const selectedLanguages = useUIStore((s) => s.selectedLanguages);

  const filteredIssues = useMemo(() => {
    if (!isExploreView) return issues;
    let result = issues;
    if (selectedRepos.length > 0) {
      result = result.filter((issue) => selectedRepos.includes(issue.repo));
    }
    if (selectedLanguages.length > 0) {
      result = result.filter((issue) => issue.tags.some((tag) => selectedLanguages.includes(tag)));
    }
    return result;
  }, [issues, isExploreView, selectedRepos, selectedLanguages]);

  const navCopy: Record<DefaultTab, { title: string; description: string }> = {
    Explore: {
      title: 'Explore issues',
      description: `Found ${filteredIssues.length} relevant issues matching your filters.`,
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
        <div className="bg-ctp-pink/10 absolute top-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full blur-[120px]" />
        <div className="bg-ctp-mauve/10 absolute top-[10%] right-[-5%] h-[420px] w-[420px] rounded-full blur-[130px]" />
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
              'sidebar-scrollbar bg-background/95 border-border/60 absolute top-0 left-0 z-99 h-full w-[85%] max-w-xs overflow-y-auto border-r backdrop-blur transition-transform duration-300',
              isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            )}
          >
            <Sidebar className="h-full w-full px-4 py-6" />
          </div>
        </div>

        <div
          className={cn(
            'sidebar-scrollbar border-border/30 relative hidden shrink-0 overflow-x-visible overflow-y-auto border-r transition-[width] duration-300 lg:block lg:h-screen',
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
              'bg-background/80 text-foreground border-border/60 absolute top-93 right-[-1] z-99 hidden rounded-full border shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur lg:inline-flex',
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
            onSelectItem={(item) => setActiveNavItem(item as DefaultTab)}
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
              filteredIssues.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredIssues.map((issue) => (
                    <IssueCard key={issue.id} {...issue} />
                  ))}
                </div>
              ) : (
                <div className="bg-card/40 text-muted-foreground border-border/60 flex min-h-[260px] flex-col items-center justify-center rounded-2xl border px-6 text-center text-sm">
                  <Frown className="text-muted-foreground/50 mb-4 h-10 w-10" />
                  <p className="text-foreground text-base font-semibold">No issues found</p>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Try adding or removing some active repositories from the sidebar.
                  </p>
                </div>
              )
            ) : (
              <div className="bg-card/40 text-muted-foreground border-border/60 flex min-h-[260px] flex-col items-center justify-center rounded-2xl border px-6 text-center text-sm">
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
