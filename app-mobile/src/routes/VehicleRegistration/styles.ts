import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radii, shadows } from '../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceDim,
  },

  // ─── Header ──────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 20,
    color: colors.primary,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleLg,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
  },
  stepIndicator: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
    width: 36,
    textAlign: 'right',
  },

  // ─── Content ─────────────────────────────────────────────────────
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 40,
    gap: spacing.lg,
  },

  // ─── Section Label ───────────────────────────────────────────────
  sectionLabel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelSm,
    fontWeight: typography.weightMedium,
    color: colors.textSecondary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },

  // ─── Plate Section ──────────────────────────────────────────────
  plateSection: {
    gap: spacing.sm,
  },
  plateInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  plateTextLarge: {
    flex: 1,
    fontFamily: typography.plateFont,
    fontSize: 32,
    fontWeight: typography.weightBold,
    color: colors.onSurface,
    letterSpacing: typography.plateSpacing,
  },
  cameraIconButton: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  cameraIconText: {
    fontSize: 18,
  },
  platePreviewRow: {
    alignItems: 'flex-start',
    marginTop: spacing.xs,
  },

  // ─── Separator ───────────────────────────────────────────────────
  separator: {
    height: 1,
    backgroundColor: colors.outlineVariant,
    opacity: 0.3,
  },

  // ─── Model Section ──────────────────────────────────────────────
  modelSection: {
    gap: spacing.xs,
  },
  modelText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleLg,
    fontWeight: typography.weightMedium,
    color: colors.onSurface,
  },

  // ─── Color Section ──────────────────────────────────────────────
  colorSection: {
    gap: spacing.sm,
  },
  colorDotsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  colorDotWrapper: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorDotWrapperActive: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  colorDotWrapperInactive: {
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorDot: {
    width: 32,
    height: 32,
    borderRadius: radii.full,
  },

  // ─── Vehicle Type Section ───────────────────────────────────────
  typeSection: {
    gap: spacing.sm,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.md,
    padding: 3,
  },
  segmentedButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.sm + 2,
    gap: spacing.xs,
  },
  segmentedButtonActive: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  segmentedIcon: {
    fontSize: 14,
  },
  segmentedText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    fontWeight: typography.weightMedium,
    color: colors.textSecondary,
  },
  segmentedTextActive: {
    color: colors.onSurface,
  },

  // ─── QR Toggle ──────────────────────────────────────────────────
  qrToggle: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  qrIconContainer: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.primaryMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrIcon: {
    fontSize: 22,
  },
  qrTextContainer: {
    flex: 1,
  },
  qrTitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
  },
  qrSubtitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
    marginTop: 2,
  },
  toggleTrack: {
    width: 48,
    height: 28,
    borderRadius: radii.full,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleTrackOn: {
    backgroundColor: colors.primary,
  },
  toggleTrackOff: {
    backgroundColor: colors.outlineVariant,
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
  },
  toggleThumbOn: {
    alignSelf: 'flex-end',
  },
  toggleThumbOff: {
    alignSelf: 'flex-start',
  },

  // ─── Submit Button ──────────────────────────────────────────────
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    ...shadows.primaryButtonGlow,
  },
  submitButtonText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightSemiBold,
    color: colors.surface,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
