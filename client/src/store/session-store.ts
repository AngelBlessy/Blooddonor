import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Session, User } from '@/types/domain';

interface SessionState {
  session: Session | null;
  login: (user: User) => void;
  logout: () => void;
  updateSessionUser: (updates: Partial<User>) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      login: (user) => set({ session: { userKey: user.key, user } }),
      logout: () => set({ session: null }),
      updateSessionUser: (updates) =>
        set((state) =>
          state.session ? { session: { ...state.session, user: { ...state.session.user, ...updates } } } : state
        ),
    }),
    { name: 'bloodnet.session.v1' }
  )
);
