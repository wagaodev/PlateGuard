import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radii } from '../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceDim,
  },

  // ─── Header ────────────────────────────────────────────────────
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerCameraMode: {
    gap: spacing.xs,
  },
  headerQrMode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLabel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelSm,
    fontWeight: typography.weightSemiBold,
    color: colors.textSecondary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  headerGreeting: {
    fontFamily: typography.fontDisplay,
    fontSize: typography.sizeHeadlineSm,
    fontWeight: typography.weightBold,
    color: colors.onSurface,
  },
  headerQrLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: radii.full,
    borderWidth: 2,
    borderColor: 'rgba(255, 120, 50, 0.6)',
  },
  headerAvatarPlaceholder: {
    backgroundColor: colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatarText: {
    fontFamily: typography.fontDisplay,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightBold,
    color: colors.onSurface,
  },
  headerQrTextContainer: {
    gap: 2,
  },
  headerQrTitle: {
    fontFamily: typography.fontDisplay,
    fontSize: typography.sizeTitleLg,
    fontWeight: typography.weightBold,
    color: colors.onSurface,
  },
  headerQrSubtitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    fontWeight: typography.weightMedium,
    color: colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headerBellContainer: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBellIcon: {
    fontSize: 20,
  },

  // ─── Content ───────────────────────────────────────────────────
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },

  // ─── Toggle ────────────────────────────────────────────────────
  toggleWrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  toggleContainer: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.full,
    flexDirection: 'row',
    padding: spacing.xs,
  },
  toggleTouchable: {
    flex: 1,
  },
  toggleButton: {
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  toggleTextActive: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
  },
  toggleTextInactive: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    fontWeight: typography.weightRegular,
    color: colors.textSecondary,
  },
  toggleIcon: {
    fontSize: 14,
  },

  // ─── Viewfinder ────────────────────────────────────────────────
  viewfinderOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  viewfinderContainer: {
    width: '100%',
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.ghostBorder,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewfinderCamera: {
    height: 200,
  },
  viewfinderQr: {
    height: 240,
    aspectRatio: 1,
    width: undefined,
  },
  bracket: {
    position: 'absolute',
    width: 36,
    height: 36,
  },
  scanLine: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    height: 2,
    backgroundColor: colors.primary,
    opacity: 0.5,
    borderRadius: radii.full,
  },
  pulseRingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    borderRadius: radii.xl,
    borderWidth: 1,
  },
  viewfinderContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrIconText: {
    fontSize: 40,
  },

  // ─── Status ────────────────────────────────────────────────────
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: radii.full,
    backgroundColor: '#FF6B35',
  },
  statusText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.textSecondary,
  },

  // ─── Utility Icons (QR mode) ───────────────────────────────────
  utilityRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  utilityButton: {
    width: 44,
    height: 44,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.ghostBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  utilityIcon: {
    fontSize: 18,
  },

  // ─── Manual Button ─────────────────────────────────────────────
  manualButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainer,
    marginTop: spacing.xs,
  },
  manualButtonIcon: {
    fontSize: 16,
  },
  manualButtonText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    fontWeight: typography.weightMedium,
    color: colors.onSurface,
  },

  // ─── Manual Input ──────────────────────────────────────────────
  manualInputContainer: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    marginTop: spacing.xs,
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
    borderBottomColor: '#FF6B35',
    backgroundColor: 'rgba(255, 107, 53, 0.06)',
  },
  manualPlatePreview: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  submitButton: {
    backgroundColor: '#FF6B35',
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
  },

  // ─── Recent Access Section ─────────────────────────────────────
  recentSection: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  recentTitle: {
    fontFamily: typography.fontDisplay,
    fontSize: typography.sizeTitleSm,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
  },
  recentViewAll: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    fontWeight: typography.weightSemiBold,
    color: '#FF6B35',
    letterSpacing: 0.5,
  },
  recentCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.lg,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  recentIconContainer: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(74, 225, 118, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentIcon: {
    fontSize: 16,
  },
  recentInfo: {
    flex: 1,
    gap: 2,
  },
  recentPlate: {
    fontFamily: typography.fontDisplay,
    fontSize: typography.sizeTitleSm,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
  },
  recentMeta: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
  },
  recentArrow: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  // ─── Simulate POC ──────────────────────────────────────────────
  simulateContainer: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
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
