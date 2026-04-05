const mockStorage = new Map<string, string>();

jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: (key: string) => mockStorage.get(key),
    set: (key: string, value: string) => mockStorage.set(key, value),
    remove: (key: string) => mockStorage.delete(key),
    getAllKeys: () => [...mockStorage.keys()],
    clearAll: () => mockStorage.clear(),
  })),
}));

import { useUserStore } from '../userStore';

const store = useUserStore;

describe('useUserStore', () => {
  beforeEach(() => {
    mockStorage.clear();
    store.setState({
      name: 'Wagner Barboza',
      role: 'Morador',
      unit: 'Bloco A, Apto 42',
      avatarUri: null,
    });
  });

  describe('initial state', () => {
    it('has default name', () => {
      expect(store.getState().name).toBe('Wagner Barboza');
    });

    it('has default role', () => {
      expect(store.getState().role).toBe('Morador');
    });

    it('has default unit', () => {
      expect(store.getState().unit).toBe('Bloco A, Apto 42');
    });

    it('has avatarUri as null', () => {
      expect(store.getState().avatarUri).toBeNull();
    });
  });

  describe('setAvatar', () => {
    it('updates avatarUri with a new value', () => {
      store.getState().setAvatar('file:///photos/avatar.jpg');
      expect(store.getState().avatarUri).toBe('file:///photos/avatar.jpg');
    });

    it('overwrites a previously set avatarUri', () => {
      store.getState().setAvatar('file:///photos/old.jpg');
      store.getState().setAvatar('file:///photos/new.jpg');
      expect(store.getState().avatarUri).toBe('file:///photos/new.jpg');
    });

    it('does not affect other state properties', () => {
      store.getState().setAvatar('file:///photos/avatar.jpg');
      expect(store.getState().name).toBe('Wagner Barboza');
      expect(store.getState().role).toBe('Morador');
      expect(store.getState().unit).toBe('Bloco A, Apto 42');
    });
  });
});
