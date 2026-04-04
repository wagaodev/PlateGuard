import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrazilianPlate } from '../../components/BrazilianPlate';
import { commonMessages } from '../../locales/pt-BR/common';
import { useProfile } from './useProfile';
import { styles } from './styles';

const MOCK_VEHICLES = [
  { plate: 'BRA2E19', model: 'Honda Civic' },
  { plate: 'ABC3D45', model: 'Toyota Corolla' },
];

export function ProfileScreen() {
  const { name, role, unit, avatarUri, handlePickAvatar, handleAddVehicle } = useProfile();
  const firstName = name.split(' ')[0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.heroSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <Text style={styles.avatarInitial}>{firstName[0]}</Text>
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.editAvatarButton} onPress={handlePickAvatar}>
              <Text style={styles.editAvatarIcon}>📷</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.heroName}>{name}</Text>
          <Text style={styles.heroSubtitle}>{role} · {unit}</Text>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>{commonMessages.profile.active}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{commonMessages.profile.personalInfo}</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowIcon}>👤</Text>
              <Text style={styles.rowLabel}>Nome</Text>
              <Text style={styles.rowValue}>{name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowIcon}>🏠</Text>
              <Text style={styles.rowLabel}>Unidade</Text>
              <Text style={styles.rowValue}>{unit}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowIcon}>🔑</Text>
              <Text style={styles.rowLabel}>Função</Text>
              <Text style={styles.rowValue}>{role}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{commonMessages.profile.myVehicles}</Text>
          <View style={styles.card}>
            {MOCK_VEHICLES.map((v, i) => (
              <View
                key={v.plate}
                style={[styles.vehicleItem, i % 2 === 1 && styles.vehicleItemEven]}
              >
                <BrazilianPlate plate={v.plate} size="sm" />
                <Text style={styles.vehicleModel}>{v.model}</Text>
                <Text style={styles.vehicleArrow}>→</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.addVehicleButton} onPress={handleAddVehicle}>
              <Text style={styles.addVehicleIcon}>+</Text>
              <Text style={styles.addVehicleText}>{commonMessages.addVehicle}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>📜</Text>
              <Text style={styles.menuLabel}>{commonMessages.profile.history}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>🔔</Text>
              <Text style={styles.menuLabel}>{commonMessages.profile.notifications}</Text>
              <View style={styles.menuBadge}>
                <Text style={styles.menuBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuIcon}>⚙️</Text>
              <Text style={styles.menuLabel}>{commonMessages.profile.settings}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={[styles.menuIcon, styles.logoutIcon]}>🚪</Text>
              <Text style={[styles.menuLabel, styles.logoutLabel]}>
                {commonMessages.profile.logout}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
