import { ViewStyle } from 'react-native';
import { colors, radii, shadows } from './tokens';

export const glassCard: ViewStyle = {
  backgroundColor: colors.surfaceContainer,
  borderRadius:    radii.lg,
  // No traditional shadows — tonal layering only
};

export const glassCardElevated: ViewStyle = {
  backgroundColor: colors.surfaceContainerHigh,
  borderRadius:    radii.xl,
  borderWidth:     1,
  borderColor:     colors.ghostBorder,
  ...shadows.ambientFloat,
};

export const glassCardSuccess: ViewStyle = {
  ...glassCard,
  backgroundColor: colors.successBg,
};

export const glassCardDanger: ViewStyle = {
  ...glassCard,
  backgroundColor: colors.errorBg,
};

export const glassCardWarning: ViewStyle = {
  ...glassCard,
  backgroundColor: colors.warningBg,
};

export const glassFloat: ViewStyle = {
  backgroundColor:  colors.glassBg,
  borderRadius:     radii.xl,
  borderWidth:      1,
  borderColor:      colors.glassBorder,
};

export const glassHeader: ViewStyle = {
  backgroundColor: colors.surfaceContainerLow,
  // No bottom border — color change separates
};

export const glassNavBar: ViewStyle = {
  backgroundColor: colors.surfaceContainerLow,
  // No top border — color change separates
};
