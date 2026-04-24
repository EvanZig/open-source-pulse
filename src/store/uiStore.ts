import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

export interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  activeLanguageFilter: string | null;

  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveLanguageFilter: (language: string | null) => void;
  reset: () => void;
}

const INITIAL_STATE: Pick<UIState, 'theme' | 'sidebarOpen' | 'activeLanguageFilter'> = {
  theme: 'system',
  sidebarOpen: true,
  activeLanguageFilter: null,
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

      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setActiveLanguageFilter: (activeLanguageFilter) => set({ activeLanguageFilter }),
      reset: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: 'osp:ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    },
  ),
);
