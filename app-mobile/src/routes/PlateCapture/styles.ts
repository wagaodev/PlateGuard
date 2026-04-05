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
  content: {
    paddingHorizontal: spacing.md,
    gap: spacing.lg,
  },

  // ─── Camera ────────────────────────────────────────────────
  cameraContainer: {
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
  },
  camera: {
    height: 320,
    width: '100%',
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBrackets: {
    width: 260,
    height: 80,
    position: 'relative',
  },
  bracket: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: colors.primary,
  },
  bracketTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: radii.sm,
  },
  bracketTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: radii.sm,
  },
  bracketBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: radii.sm,
  },
  bracketBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: radii.sm,
  },
  cameraHintText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.onSurface,
    marginTop: spacing.lg,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  cameraActions: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  captureButton: {
    width: 64,
    height: 64,
    borderRadius: radii.full,
    borderWidth: 3,
    borderColor: colors.onSurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 52,
    height: 52,
    borderRadius: radii.full,
    backgroundColor: colors.onSurface,
  },
  manualEntryLink: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  // ─── Permission ────────────────────────────────────────────
  permissionIcon: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  permissionTitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  permissionMessage: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  permissionButton: {
    backgroundColor: colors.primaryContainer,
    borderRadius: radii.lg,
    paddingVertical: spacing.sm + 4,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  permissionButtonText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    fontWeight: typography.weightSemiBold,
    color: colors.surface,
  },

  // ─── Form ──────────────────────────────────────────────────
  formCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  label: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  plateInput: {
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
  plateInputFocused: {
    borderBottomColor: colors.primary,
    backgroundColor: colors.primaryMuted,
  },
  platePreview: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },

  // ─── Submit ────────────────────────────────────────────────
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
    ...shadows.primaryButtonGlow,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightSemiBold,
    color: colors.surface,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
