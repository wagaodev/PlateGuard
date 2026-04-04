import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { colors, spacing, radii, shadows } from '../../theme/tokens';
import { useSuccessAnimation } from '../../hooks/animations';
import { FeedbackType } from '../../types/vehicleAccess.types';

interface FeedbackIconProps {
  feedbackType: FeedbackType;
}

const iconMap: Record<FeedbackType, { icon: string; glowColor: string }> = {
  ALLOWED:       { icon: '✓',  glowColor: colors.successGlow },
  DENIED:        { icon: '✕',  glowColor: colors.errorGlow },
  NOT_FOUND:     { icon: '?',  glowColor: colors.primaryGlow },
  INVALID_PLATE: { icon: '⊘',  glowColor: 'transparent' },
  SERVER_ERROR:  { icon: '↯',  glowColor: 'transparent' },
};

export function FeedbackIcon({ feedbackType }: FeedbackIconProps) {
  const scaleStyle = useSuccessAnimation(200);
  const config = iconMap[feedbackType];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          shadowColor: config.glowColor === 'transparent'
            ? 'transparent'
            : config.glowColor,
          shadowOpacity: config.glowColor === 'transparent' ? 0 : 0.3,
        },
        scaleStyle,
      ]}
    >
      <Text style={styles.icon}>{config.icon}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 30,
    elevation: 10,
  },
  icon: {
    fontSize: 36,
    color: colors.onSurface,
  },
});
