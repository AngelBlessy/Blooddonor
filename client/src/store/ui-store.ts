import { create } from 'zustand';

export type AuthDialogTab = 'register' | 'login';

interface UiState {
  authDialogOpen: boolean;
  authDialogTab: AuthDialogTab;
  openAuthDialog: (tab?: AuthDialogTab) => void;
  closeAuthDialog: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  authDialogOpen: false,
  authDialogTab: 'register',
  openAuthDialog: (tab = 'register') => set({ authDialogOpen: true, authDialogTab: tab }),
  closeAuthDialog: () => set({ authDialogOpen: false }),
}));
