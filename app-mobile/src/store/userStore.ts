import { create } from 'zustand';

interface UserState {
  name:      string;
  role:      string;
  unit:      string;
  avatarUri: string | null;
  setAvatar: (uri: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  name:      'Wagner Barboza',
  role:      'Morador',
  unit:      'Bloco A, Apto 42',
  avatarUri: null,
  setAvatar: (avatarUri) => set({ avatarUri }),
}));
