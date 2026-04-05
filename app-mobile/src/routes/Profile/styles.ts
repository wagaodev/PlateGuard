import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radii } from '../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceDim,
  },
  heroSection: {
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarWrapper: {
    borderRadius: radii.full,
    borderWidth: 2,
    borderColor: colors.primaryBorder,
    padding: 2,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: radii.full,
  },
  avatarPlaceholder: {
    backgroundColor: colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontFamily: typography.fontDisplay,
    fontSize: typography.sizeHeadlineMd,
    fontWeight: typography.weightBold,
    color: colors.primary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarIcon: {
    fontSize: 14,
    color: colors.primary,
  },
  heroName: {
    fontFamily: typography.fontDisplay,
    fontSize: typography.sizeHeadlineSm,
    fontWeight: typography.weightBold,
    color: colors.onSurface,
  },
  heroSubtitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
  },
  activeBadge: {
    backgroundColor: colors.successBg,
    borderRadius: radii.full,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
  },
  activeBadgeText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelSm,
    fontWeight: typography.weightSemiBold,
    color: colors.success,
  },
  section: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  card: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.listItemGap,
  },
  sectionLabel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    fontWeight: typography.weightSemiBold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rowIcon: {
    fontSize: 16,
    color: colors.primary,
    width: 24,
  },
  rowLabel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
    width: 80,
  },
  rowValue: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.onSurface,
    flex: 1,
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  vehicleItemEven: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
  },
  vehicleModel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.onSurface,
    flex: 1,
  },
  vehicleArrow: {
    fontSize: 16,
    color: colors.primary,
  },
  addVehicleButton: {
    backgroundColor: colors.primaryMuted,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  addVehicleIcon: {
    fontSize: 18,
    color: colors.primary,
  },
  addVehicleText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    fontWeight: typography.weightSemiBold,
    color: colors.primary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  menuIcon: {
    fontSize: 16,
    color: colors.primary,
    width: 24,
  },
  menuLabel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.onSurface,
    flex: 1,
  },
  menuBadge: {
    backgroundColor: colors.primary,
    borderRadius: radii.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  menuBadgeText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelSm,
    fontWeight: typography.weightBold,
    color: colors.surface,
  },
  logoutLabel: {
    color: colors.error,
  },
  logoutIcon: {
    color: colors.error,
  },
});
