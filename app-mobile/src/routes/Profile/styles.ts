import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radii } from '../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceDim,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // ─── Hero Section ────────────────────────────────────────────
  heroSection: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatarOuter: {
    borderRadius: radii.full,
    borderWidth: 3,
    borderColor: colors.primaryContainer,
    padding: 3,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: radii.full,
  },
  avatarPlaceholder: {
    backgroundColor: colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontFamily: typography.fontDisplay,
    fontSize: typography.sizeHeadlineLg,
    fontWeight: typography.weightBold,
    color: colors.primary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 2,
    right: -2,
    width: 30,
    height: 30,
    borderRadius: radii.full,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surfaceDim,
  },
  editAvatarIcon: {
    fontSize: 14,
    color: colors.white,
  },
  heroName: {
    fontFamily: typography.fontDisplay,
    fontSize: typography.sizeHeadlineSm,
    fontWeight: typography.weightBold,
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  activeBadge: {
    backgroundColor: colors.successBg,
    borderRadius: radii.full,
    paddingVertical: 3,
    paddingHorizontal: spacing.md,
  },
  activeBadgeText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelSm,
    fontWeight: typography.weightBold,
    color: colors.success,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // ─── Info Section ────────────────────────────────────────────
  infoSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  infoIcon: {
    fontSize: 16,
    width: 28,
    textAlign: 'center',
  },
  infoLabelColumn: {
    flex: 1,
  },
  infoLabel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelSm,
    fontWeight: typography.weightSemiBold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.onSurface,
  },
  infoDivider: {
    height: 1,
    backgroundColor: colors.ghostBorder,
    marginLeft: 36,
  },

  // ─── Vehicles Section ────────────────────────────────────────
  vehiclesSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  sectionLabel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    fontWeight: typography.weightSemiBold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  vehicleCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.lg,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  vehicleAccent: {
    width: 4,
    backgroundColor: colors.primaryContainer,
  },
  vehicleContent: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.xs,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  vehiclePlateBadge: {
    backgroundColor: colors.primaryMuted,
    borderRadius: radii.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  vehiclePlateText: {
    fontFamily: typography.fontDisplay,
    fontSize: typography.sizeLabelMd,
    fontWeight: typography.weightBold,
    color: colors.primary,
    letterSpacing: 1,
  },
  vehicleModel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    fontWeight: typography.weightMedium,
    color: colors.onSurface,
  },
  vehicleDetail: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
  },
  vehicleChevron: {
    justifyContent: 'center',
    paddingRight: spacing.md,
  },
  vehicleChevronText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  addVehicleButton: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    borderStyle: 'dashed',
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  addVehicleIcon: {
    fontSize: 18,
    fontWeight: typography.weightBold,
    color: colors.primary,
  },
  addVehicleText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    fontWeight: typography.weightSemiBold,
    color: colors.primary,
  },
  noVehiclesText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.md,
  },

  // ─── Menu Section ────────────────────────────────────────────
  menuSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: spacing.sm,
  },
  menuIcon: {
    fontSize: 18,
    width: 28,
    textAlign: 'center',
  },
  menuLabel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.onSurface,
    flex: 1,
  },
  menuBadge: {
    backgroundColor: colors.primaryContainer,
    borderRadius: radii.full,
    minWidth: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  menuBadgeText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelSm,
    fontWeight: typography.weightBold,
    color: colors.white,
  },
  menuChevron: {
    fontSize: 14,
    color: colors.textMuted,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.ghostBorder,
    marginLeft: 36,
  },
  logoutLabel: {
    color: colors.error,
  },
  logoutIcon: {
    color: colors.error,
  },
});
