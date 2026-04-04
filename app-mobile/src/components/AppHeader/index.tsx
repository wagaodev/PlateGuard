import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, spacing, typography, radii } from '../../theme/tokens';
import { useUserStore } from '../../store/userStore';
import { commonMessages } from '../../locales/pt-BR/common';

export function AppHeader() {
  const { name, avatarUri } = useUserStore();
  const firstName = name.split(' ')[0];

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarWrapper}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>{firstName[0]}</Text>
            </View>
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>
            {commonMessages.greeting}, {firstName}
          </Text>
          <Text style={styles.subtitle}>{commonMessages.location}</Text>
        </View>
      </View>
      <View style={styles.notificationIcon}>
        <Text style={styles.bellIcon}>{'🔔'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLow,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatarWrapper: {
    borderRadius: radii.full,
    borderWidth: 2,
    borderColor: colors.primaryBorder,
    padding: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radii.full,
  },
  avatarPlaceholder: {
    backgroundColor: colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: typography.fontDisplay,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightBold,
    color: colors.primary,
  },
  textContainer: {
    gap: 2,
  },
  greeting: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleMd,
    fontWeight: typography.weightSemiBold,
    color: colors.onSurface,
  },
  subtitle: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelMd,
    color: colors.textSecondary,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellIcon: {
    fontSize: 18,
  },
});
