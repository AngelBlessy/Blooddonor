import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/domain';

interface UsersState {
  users: User[];
  upsertUser: (user: User) => void;
  updateUser: (key: string, updates: Partial<User>) => void;
  findByEmail: (email: string) => User | undefined;
  findByKey: (key: string) => User | undefined;
  isEmailOrPhoneTaken: (email: string, phone: string, ignoreKey?: string) => boolean;
}

export const useUsersStore = create<UsersState>()(
  persist(
    (set, get) => ({
      users: [],
      upsertUser: (user) =>
        set((state) => ({ users: [...state.users.filter((entry) => entry.key !== user.key), user] })),
      updateUser: (key, updates) =>
        set((state) => ({
          users: state.users.map((entry) => (entry.key === key ? { ...entry, ...updates } : entry)),
        })),
      findByEmail: (email) => get().users.find((entry) => entry.email === email),
      findByKey: (key) => get().users.find((entry) => entry.key === key),
      isEmailOrPhoneTaken: (email, phone, ignoreKey = '') =>
        get().users.some((entry) => entry.key !== ignoreKey && (entry.email === email || entry.phone === phone)),
    }),
    { name: 'bloodnet.users.v1' }
  )
);
