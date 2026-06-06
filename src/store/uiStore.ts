import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UIState {
  sidebarOpen: boolean;
  activeLanguageFilter: string | null;
  selectedRepos: string[];

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveLanguageFilter: (language: string | null) => void;
  addSelectedRepo: (repo: string) => void;
  removeSelectedRepo: (repo: string) => void;
  reset: () => void;
}

const INITIAL_STATE: Pick<UIState, 'sidebarOpen' | 'activeLanguageFilter' | 'selectedRepos'> = {
  sidebarOpen: true,
  activeLanguageFilter: null,
  selectedRepos: [],
};

/**
 * Global UI store for cross-cutting, non-server state
 * (theme, sidebar collapse, lightweight filter selection).
 *
 * Server-owned data should live in TanStack Query, not here.
 */
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setActiveLanguageFilter: (activeLanguageFilter) => set({ activeLanguageFilter }),
      addSelectedRepo: (repo) =>
        set((state) => ({
          selectedRepos: state.selectedRepos.includes(repo)
            ? state.selectedRepos
            : [...state.selectedRepos, repo],
        })),
      removeSelectedRepo: (repo) =>
        set((state) => ({
          selectedRepos: state.selectedRepos.filter((r) => r !== repo),
        })),
      reset: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: 'osp:ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        selectedRepos: state.selectedRepos,
      }),
    },
  ),
);
