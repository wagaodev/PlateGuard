import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors, spacing, typography, radii, animation } from '../../theme/tokens';
import { ScanMode } from '../../types/vehicleAccess.types';

interface ScanModeToggleProps {
  activeMode: ScanMode;
  onModeChange: (mode: ScanMode) => void;
}

const modes: { key: ScanMode; label: string }[] = [
  { key: 'CAMERA',  label: 'Câmera' },
  { key: 'QR_CODE', label: 'QR Code' },
];

function TabButton({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      isActive ? colors.surfaceContainerHigh : 'transparent',
      { duration: animation.durationNormal },
    ),
  }));

  return (
    <TouchableOpacity onPress={onPress} style={styles.tabTouchable}>
      <Animated.View style={[styles.tabButton, animatedStyle]}>
        <Text
          style={[
            styles.tabText,
            isActive ? styles.tabTextActive : styles.tabTextInactive,
          ]}
        >
          {label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export function ScanModeToggle({ activeMode, onModeChange }: ScanModeToggleProps) {
  return (
    <View style={styles.container}>
      {modes.map((mode) => (
        <TabButton
          key={mode.key}
          label={mode.label}
          isActive={activeMode === mode.key}
          onPress={() => onModeChange(mode.key)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.full,
    flexDirection: 'row',
    padding: spacing.xs,
  },
  tabTouchable: {
    flex: 1,
  },
  tabButton: {
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    alignItems: 'center',
  },
  tabText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleSm,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: typography.weightSemiBold,
  },
  tabTextInactive: {
    color: colors.textSecondary,
    fontWeight: typography.weightRegular,
  },
});
