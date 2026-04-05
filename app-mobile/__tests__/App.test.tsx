/**
 * Basic smoke test for app configuration.
 * Full App rendering requires native modules (GestureHandler, Reanimated)
 * which are only available in device/emulator environment.
 */

import { colors } from '../src/theme/tokens';
import { commonMessages } from '../src/locales/pt-BR/common';

describe('App configuration', () => {
  it('has theme tokens defined', () => {
    expect(colors.primary).toBeDefined();
    expect(colors.surface).toBeDefined();
    expect(colors.onSurface).toBeDefined();
  });

  it('has locale messages defined', () => {
    expect(commonMessages.tabs.scanner).toBe('Scanner');
    expect(commonMessages.tabs.vehicles).toBe('Veículos');
    expect(commonMessages.tabs.profile).toBe('Perfil');
  });
});
