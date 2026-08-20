import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CardLayout = 'grid' | 'list';
export type IssuesPerPage = 12 | 24 | 48;
export type SortOrder = 'recent' | 'most-comments' | 'oldest';
export type DefaultTab = 'Explore' | 'My Issues' | 'Saved';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Settings {
  cardLayout: CardLayout;
  issuesPerPage: IssuesPerPage;
  showLabels: boolean;
  compactCards: boolean;
  defaultSort: SortOrder;
  defaultTab: DefaultTab;
  useReadableFont: boolean;
  githubToken: string;
}

export interface UIState {
  sidebarOpen: boolean;
  selectedLanguages: string[];
  selectedDifficulties: DifficultyLevel[];
  selectedRepos: string[];
  settings: Settings;

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleLanguage: (language: string) => void;
  toggleDifficulty: (level: DifficultyLevel) => void;
  addSelectedRepo: (repo: string) => void;
  removeSelectedRepo: (repo: string) => void;
  clearAllFilters: () => void;
  updateSettings: (patch: Partial<Settings>) => void;
  resetSettings: () => void;
  reset: () => void;
}

const DEFAULT_SETTINGS: Settings = {
  cardLayout: 'grid',
  issuesPerPage: 12,
  showLabels: true,
  compactCards: false,
  defaultSort: 'recent',
  defaultTab: 'Explore',
  useReadableFont: false,
  githubToken: '',
};

const INITIAL_FILTERS: Pick<
  UIState,
  'sidebarOpen' | 'selectedLanguages' | 'selectedDifficulties' | 'selectedRepos'
> = {
  sidebarOpen: true,
  selectedLanguages: [],
  selectedDifficulties: [],
  selectedRepos: [],
};

const INITIAL_STATE: Pick<
  UIState,
  'sidebarOpen' | 'selectedLanguages' | 'selectedDifficulties' | 'selectedRepos' | 'settings'
> = {
  ...INITIAL_FILTERS,
  settings: DEFAULT_SETTINGS,
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

      toggleLanguage: (language) =>
        set((state) => ({
          selectedLanguages: state.selectedLanguages.includes(language)
            ? state.selectedLanguages.filter((l) => l !== language)
            : [...state.selectedLanguages, language],
        })),

      toggleDifficulty: (level) =>
        set((state) => ({
          selectedDifficulties: state.selectedDifficulties.includes(level)
            ? state.selectedDifficulties.filter((d) => d !== level)
            : [...state.selectedDifficulties, level],
        })),

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

      clearAllFilters: () => set({ ...INITIAL_FILTERS }),

      updateSettings: (patch) => set((state) => ({ settings: { ...state.settings, ...patch } })),
      resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
      reset: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: 'osp:ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        selectedLanguages: state.selectedLanguages,
        selectedDifficulties: state.selectedDifficulties,
        selectedRepos: state.selectedRepos,
        settings: { ...state.settings, githubToken: undefined },
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<UIState> | undefined;
        return {
          ...current,
          ...p,
          settings: { ...DEFAULT_SETTINGS, ...p?.settings },
        };
      },
    },
  ),
);
