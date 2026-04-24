import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UIState {
  sidebarOpen: boolean;
  activeLanguageFilter: string | null;

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveLanguageFilter: (language: string | null) => void;
  reset: () => void;
}

const INITIAL_STATE: Pick<UIState, 'sidebarOpen' | 'activeLanguageFilter'> = {
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

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setActiveLanguageFilter: (activeLanguageFilter) => set({ activeLanguageFilter }),
      reset: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: 'osp:ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
      }),
    },
  ),
);
