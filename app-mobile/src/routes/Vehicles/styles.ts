import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radii } from '../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceDim,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  headerTitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeHeadlineSm,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 100,
    gap: spacing.sm,
  },
  vehicleCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  vehicleInfo: {
    flex: 1,
    gap: 2,
  },
  vehicleModel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.onSurface,
    fontWeight: typography.weightMedium,
  },
  vehicleOwner: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
  },
  vehicleStatus: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelSm,
    fontWeight: typography.weightMedium,
  },
  statusAllowed: {
    color: colors.success,
  },
  statusDenied: {
    color: colors.error,
  },
  statusPending: {
    color: colors.warning,
  },
  deleteButton: {
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: radii.lg,
    marginLeft: spacing.sm,
  },
  deleteButtonText: {
    color: colors.onSurface,
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    gap: spacing.md,
  },
  emptyIcon: {
    fontSize: 48,
    opacity: 0.4,
  },
  emptyText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.textSecondary,
  },
  addButton: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    borderStyle: 'dashed',
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
    color: colors.primary,
    fontWeight: typography.weightMedium,
  },
});
