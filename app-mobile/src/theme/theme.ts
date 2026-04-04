import { colors, shadows, radii, spacing, typography, animation } from './tokens';

export const theme = { colors, shadows, radii, spacing, typography, animation } as const;

export type Theme = typeof theme;
