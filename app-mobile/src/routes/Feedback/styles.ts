import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radii, shadows } from '../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceDim,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 20,
    color: colors.primary,
  },
  headerTitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeHeadlineSm,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
  },
  headerTimestamp: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
    marginLeft: 'auto',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  heroSection: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.lg,
  },
  heroTitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeHeadlineMd,
    fontWeight: typography.weightBold,
    color: colors.onSurface,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    textAlign: 'center',
  },
  chip: {
    borderRadius: radii.full,
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
  },
  chipText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    fontWeight: typography.weightSemiBold,
  },
  plateMonitor: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.ghostBorder,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.ambientFloat,
  },
  plateLabel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
  },
  detailsCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.listItemGap,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailIcon: {
    fontSize: 16,
    color: colors.primary,
    width: 24,
  },
  detailLabel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
    width: 80,
  },
  detailValue: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.onSurface,
    flex: 1,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
    ...shadows.primaryButtonGlow,
  },
  ctaButtonText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightSemiBold,
    color: '#0e1322',
  },
});
