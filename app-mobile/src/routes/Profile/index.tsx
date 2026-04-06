import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonMessages } from '../../locales/pt-BR/common';
import { useVehicles } from '../../service/vehicleAccess/useValidatePlate';
import { colors } from '../../theme/tokens';
import { useProfile } from './useProfile';
import { styles } from './styles';

interface VehicleItem {
  plate: string;
  vehicleModel: string | null;
  vehicleColor: string | null;
}

export function ProfileScreen() {
  const { name, role, unit, avatarUri, handlePickAvatar, handleAddVehicle } = useProfile();
  const vehiclesQuery = useVehicles();
  const firstName = name.split(' ')[0];
  const vehicles = (vehiclesQuery.data ?? []) as VehicleItem[];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ─── Hero ──────────────────────────────────────── */}
        <View style={styles.heroSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarOuter}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <Text style={styles.avatarInitial}>{firstName[0]}</Text>
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.editAvatarButton} onPress={handlePickAvatar}>
              <Text style={styles.editAvatarIcon}>{'📷'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.heroName}>{name}</Text>
          <Text style={styles.heroSubtitle}>{role} {'\u2022'} {unit}</Text>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>{commonMessages.profile.active}</Text>
          </View>
        </View>

        {/* ─── Info Rows ─────────────────────────────────── */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>{'📧'}</Text>
            <View style={styles.infoLabelColumn}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>wagner.b@valeti.com.br</Text>
            </View>
          </View>
          <View style={styles.infoDivider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>{'📱'}</Text>
            <View style={styles.infoLabelColumn}>
              <Text style={styles.infoLabel}>Telefone</Text>
              <Text style={styles.infoValue}>(11) 98765-4321</Text>
            </View>
          </View>
          <View style={styles.infoDivider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>{'🏠'}</Text>
            <View style={styles.infoLabelColumn}>
              <Text style={styles.infoLabel}>Unidade</Text>
              <Text style={styles.infoValue}>{unit}</Text>
            </View>
          </View>
        </View>

        {/* ─── Vehicles ──────────────────────────────────── */}
        <View style={styles.vehiclesSection}>
          <Text style={styles.sectionLabel}>{commonMessages.profile.myVehicles}</Text>

          {vehiclesQuery.isLoading ? (
            <ActivityIndicator size="small" color={colors.primary} style={{ padding: 16 }} />
          ) : vehicles.length === 0 ? (
            <Text style={styles.noVehiclesText}>{commonMessages.vehicle.noVehicles}</Text>
          ) : (
            vehicles.map((v: VehicleItem) => (
              <View key={v.plate} style={styles.vehicleCard}>
                <View style={styles.vehicleAccent} />
                <View style={styles.vehicleContent}>
                  <View style={styles.vehicleHeader}>
                    <View style={styles.vehiclePlateBadge}>
                      <Text style={styles.vehiclePlateText}>{v.plate}</Text>
                    </View>
                  </View>
                  <Text style={styles.vehicleModel}>
                    {v.vehicleModel ?? 'Sem modelo'}
                  </Text>
                  {v.vehicleColor ? (
                    <Text style={styles.vehicleDetail}>
                      Cor: {v.vehicleColor}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.vehicleChevron}>
                  <Text style={styles.vehicleChevronText}>{'›'}</Text>
                </View>
              </View>
            ))
          )}

          <TouchableOpacity style={styles.addVehicleButton} onPress={handleAddVehicle}>
            <Text style={styles.addVehicleIcon}>+</Text>
            <Text style={styles.addVehicleText}>{commonMessages.addVehicle}</Text>
          </TouchableOpacity>
        </View>

        {/* ─── Menu ──────────────────────────────────────── */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>{'📜'}</Text>
            <Text style={styles.menuLabel}>{commonMessages.profile.history}</Text>
            <Text style={styles.menuChevron}>{'›'}</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>{'🔔'}</Text>
            <Text style={styles.menuLabel}>{commonMessages.profile.notifications}</Text>
            <View style={styles.menuBadge}>
              <Text style={styles.menuBadgeText}>3</Text>
            </View>
            <Text style={styles.menuChevron}>{'›'}</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>{'⚙️'}</Text>
            <Text style={styles.menuLabel}>{commonMessages.profile.settings}</Text>
            <Text style={styles.menuChevron}>{'›'}</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem}>
            <Text style={[styles.menuIcon, styles.logoutIcon]}>{'🚪'}</Text>
            <Text style={[styles.menuLabel, styles.logoutLabel]}>
              {commonMessages.profile.logout}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
