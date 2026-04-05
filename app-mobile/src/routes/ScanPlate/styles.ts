import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radii } from '../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceDim,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  toggleWrapper: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: radii.full,
    backgroundColor: colors.primary,
  },
  statusText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
  },
  manualButton: {
    alignSelf: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  manualButtonText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.primary,
  },
  manualInputContainer: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  manualInput: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.sm,
    borderBottomWidth: 2,
    borderBottomColor: colors.outlineVariant,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    fontFamily: typography.plateFont,
    fontSize: typography.plateSize,
    fontWeight: typography.plateWeight,
    letterSpacing: typography.plateSpacing,
    color: colors.onSurface,
    textAlign: 'center',
  },
  manualInputFocused: {
    borderBottomColor: colors.primary,
    backgroundColor: colors.primaryMuted,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
  },
  submitButtonText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightSemiBold,
    color: colors.surface,
  },
  simulateContainer: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  simulateTitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  simulateRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  simulateChip: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  simulateChipText: {
    fontFamily: typography.fontDisplay,
    fontSize: typography.sizeLabelMd,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
    letterSpacing: 1,
  },
});
