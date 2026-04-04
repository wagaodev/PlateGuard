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
  headerStep: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
    marginLeft: 'auto',
  },
  content: {
    paddingHorizontal: spacing.md,
  },
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
  textInput: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.sm,
    borderBottomWidth: 2,
    borderBottomColor: colors.outlineVariant,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.onSurface,
  },
  textInputFocused: {
    borderBottomColor: colors.primary,
    backgroundColor: colors.primaryMuted,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  colorPill: {
    borderRadius: radii.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surfaceContainerLow,
  },
  colorPillSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  colorPillText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.onSurface,
  },
  typeRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radii.sm,
    overflow: 'hidden',
  },
  typeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: colors.surfaceContainer,
  },
  typeButtonText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.textSecondary,
  },
  typeButtonTextActive: {
    color: colors.primary,
    fontWeight: typography.weightSemiBold,
  },
  qrToggle: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  qrIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  qrTextContainer: {
    flex: 1,
  },
  qrTitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.onSurface,
  },
  qrSubtitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
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
    backgroundColor: colors.onSurface,
  },
  toggleThumbOn: {
    alignSelf: 'flex-end',
  },
  toggleThumbOff: {
    alignSelf: 'flex-start',
  },
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
  submitButtonText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightSemiBold,
    color: '#0e1322',
  },
});
