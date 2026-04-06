import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radii } from '../../theme/tokens';

export const styles = StyleSheet.create({
  // ─── Layout ──────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },

  // ─── Top gradient area (colored glow at top of screen) ────────
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    borderBottomLeftRadius: radii.xl,
    borderBottomRightRadius: radii.xl,
    opacity: 0.15,
  },

  // ─── Header ──────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 18,
    color: colors.onSurface,
  },
  headerTitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleLg,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
  },
  headerRight: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellIcon: {
    fontSize: 16,
    color: colors.onSurface,
  },

  // ─── Hero Section (icon + title + subtitle) ──────────────────
  heroSection: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  heroIconContainer: {
    width: 80,
    height: 80,
    borderRadius: radii.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  heroIconText: {
    fontSize: 36,
    fontWeight: typography.weightBold,
    color: colors.white,
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
    marginTop: spacing.xs,
  },

  // ─── Plate Section ───────────────────────────────────────────
  plateSection: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  plateLabel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelSm,
    fontWeight: typography.weightSemiBold,
    color: colors.textSecondary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  plateWrapper: {
    borderRadius: radii.md,
    padding: spacing.xs,
    overflow: 'hidden',
  },

  // ─── Details Card ────────────────────────────────────────────
  detailsCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.lg,
    marginHorizontal: spacing.md,
    padding: spacing.lg,
    gap: spacing.sectionGap,
    borderWidth: 1,
    borderColor: colors.ghostBorder,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: radii.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailIconText: {
    fontSize: 14,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelSm,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    fontWeight: typography.weightMedium,
    color: colors.onSurface,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: colors.ghostBorder,
  },

  // ─── Note Box ────────────────────────────────────────────────
  noteBox: {
    flexDirection: 'row',
    borderRadius: radii.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    padding: spacing.md,
    gap: spacing.sm,
    alignItems: 'flex-start',
    borderWidth: 1,
  },
  noteIconWrapper: {
    width: 20,
    height: 20,
    borderRadius: radii.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  noteIcon: {
    fontSize: 10,
    fontWeight: typography.weightBold,
  },
  noteText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeBodySm,
    flex: 1,
    lineHeight: 18,
  },

  // ─── CTA Button ──────────────────────────────────────────────
  ctaSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  ctaButton: {
    backgroundColor: colors.primaryContainer,
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  ctaButtonText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightSemiBold,
    color: colors.white,
  },
  ctaIcon: {
    fontSize: 16,
    color: colors.white,
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  secondaryButtonText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    fontWeight: typography.weightMedium,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },

  // ─── Bottom Nav (static for Feedback screen) ─────────────────
  bottomNav: {
    backgroundColor: colors.surfaceContainerLow,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.ghostBorder,
  },
  navTab: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  navIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelSm,
    color: colors.textSecondary,
  },
  navLabelActive: {
    color: colors.primary,
    fontWeight: typography.weightSemiBold,
  },
});
