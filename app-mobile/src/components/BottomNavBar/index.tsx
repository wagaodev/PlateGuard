import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography, radii } from '../../theme/tokens';
import { commonMessages } from '../../locales/pt-BR/common';

interface TabItem {
  key: string;
  label: string;
  icon: string;
}

interface BottomNavBarProps {
  activeTab: string;
  onTabPress: (key: string) => void;
}

const tabs: TabItem[] = [
  { key: 'Scanner',  label: commonMessages.tabs.scanner,  icon: '📷' },
  { key: 'Vehicles', label: commonMessages.tabs.vehicles, icon: '🚗' },
  { key: 'Profile',  label: commonMessages.tabs.profile,  icon: '👤' },
];

export function BottomNavBar({ activeTab, onTabPress }: BottomNavBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabPress(tab.key)}
          >
            {isActive && <View style={styles.activeIndicator} />}
            <Text style={[styles.icon, isActive && styles.iconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLow,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  tab: {
    alignItems: 'center',
    gap: spacing.xs,
    position: 'relative',
    paddingTop: spacing.sm,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 24,
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: radii.full,
  },
  icon: {
    fontSize: 20,
    opacity: 0.5,
  },
  iconActive: {
    opacity: 1,
  },
  label: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelSm,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: typography.weightSemiBold,
  },
});
