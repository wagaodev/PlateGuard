import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { colors, radii, spacing, shadows } from '../../theme/tokens';

type Variant = 'default' | 'elevated' | 'success' | 'danger' | 'warning';

interface GlassCardProps {
  children: React.ReactNode;
  style?:   ViewStyle;
  variant?: Variant;
  padding?: number;
}

export function GlassCard({
  children,
  style,
  variant = 'default',
  padding = spacing.lg,
}: GlassCardProps) {
  return (
    <View style={[styles.base, variantStyles[variant], { padding }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.lg,
  },
});

const variantStyles: Record<Variant, ViewStyle> = {
  default: {
    backgroundColor: colors.surfaceContainer,
  },
  elevated: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius:    radii.xl,
    borderWidth:     1,
    borderColor:     colors.ghostBorder,
    ...shadows.ambientFloat,
  },
  success: {
    backgroundColor: colors.successBg,
  },
  danger: {
    backgroundColor: colors.errorBg,
  },
  warning: {
    backgroundColor: colors.warningBg,
  },
};
