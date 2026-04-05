import { StyleSheet } from 'react-native';
import { colors, radii, spacing, typography, shadows } from '../../theme/tokens';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 14, 26, 0.85)',
    paddingHorizontal: spacing.lg,
  },
  container: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: spacing.lg,
    ...shadows.alertGlow,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconText: {
    fontSize: 32,
  },
  title: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeHeadlineSm,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  message: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    fontWeight: typography.weightRegular,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: typography.sizeTitleSm * 1.5,
  },
  titleOnly: {
    marginBottom: spacing.lg,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  buttonBase: {
    flex: 1,
    paddingVertical: spacing.md - 2,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDefault: {
    backgroundColor: colors.primaryContainer,
  },
  buttonCancel: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  buttonDestructive: {
    backgroundColor: colors.errorBg,
  },
  buttonTextDefault: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightSemiBold,
    color: colors.surface,
  },
  buttonTextCancel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
  },
  buttonTextDestructive: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
  },
});
