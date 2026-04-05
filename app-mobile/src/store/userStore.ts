import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  name:      string;
  role:      string;
  unit:      string;
  avatarUri: string | null;
  setAvatar: (uri: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name:      'Wagner Barboza',
      role:      'Morador',
      unit:      'Bloco A, Apto 42',
      avatarUri: null,
      setAvatar: (avatarUri) => set({ avatarUri }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ avatarUri: state.avatarUri }),
    },
  ),
);
