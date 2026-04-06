import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radii } from '../../theme/tokens';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 14, 26, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  container: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  pulseRing: {
    width: 80,
    height: 80,
    borderRadius: radii.full,
    borderWidth: 2,
    borderColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDot: {
    width: 20,
    height: 20,
    borderRadius: radii.full,
    backgroundColor: colors.primaryContainer,
  },
  message: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightMedium,
    color: colors.onSurface,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeBodyMd,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: -spacing.sm,
  },
});
