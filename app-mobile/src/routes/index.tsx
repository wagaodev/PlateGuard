import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, radii, spacing } from '../theme/tokens';
import { RootStackParamList, BottomTabParamList } from '../types/navigation.types';
import { ScanPlateScreen } from './ScanPlate';
import { FeedbackScreen } from './Feedback';
import { ProfileScreen } from './Profile';
import { VehicleRegistrationScreen } from './VehicleRegistration';
import { commonMessages } from '../locales/pt-BR/common';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab   = createBottomTabNavigator<BottomTabParamList>();

function VehiclesPlaceholder() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Veículos (Fase 2)</Text>
    </View>
  );
}

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Scanner: '📷',
    Vehicles: '🚗',
    Profile: '👤',
  };
  return (
    <View style={styles.tabIconContainer}>
      {focused && <View style={styles.activeIndicator} />}
      <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>
        {icons[label] ?? '•'}
      </Text>
    </View>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Scanner"
        component={ScanPlateScreen}
        options={{
          tabBarLabel: commonMessages.tabs.scanner,
          tabBarIcon: ({ focused }) => <TabIcon label="Scanner" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Vehicles"
        component={VehiclesPlaceholder}
        options={{
          tabBarLabel: commonMessages.tabs.vehicles,
          tabBarIcon: ({ focused }) => <TabIcon label="Vehicles" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: commonMessages.tabs.profile,
          tabBarIcon: ({ focused }) => <TabIcon label="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.surfaceDim },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="VehicleRegistration" component={VehicleRegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surfaceContainerLow,
    borderTopWidth: 0,
    elevation: 0,
    paddingTop: spacing.xs,
    height: 80,
  },
  tabBarLabel: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeLabelSm,
    fontWeight: typography.weightMedium,
  },
  tabIconContainer: {
    alignItems: 'center',
    paddingTop: spacing.xs,
  },
  activeIndicator: {
    position: 'absolute',
    top: -4,
    width: 24,
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: radii.full,
  },
  placeholder: {
    flex: 1,
    backgroundColor: colors.surfaceDim,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: typography.fontBody,
    fontSize: typography.sizeTitleMd,
    color: colors.textSecondary,
  },
});
