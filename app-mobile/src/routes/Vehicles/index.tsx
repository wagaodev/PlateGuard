import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrazilianPlate } from '../../components/BrazilianPlate';
import { commonMessages } from '../../locales/pt-BR/common';
import { colors } from '../../theme/tokens';
import { VehicleItem } from '../../types/vehicleAccess.types';
import { useVehiclesList } from './useVehicles';
import { styles } from './styles';

function StatusBadge({ status, getConfig }: { status: string; getConfig: (s: string) => { label: string; styleKey: 'statusAllowed' | 'statusDenied' | 'statusPending' } }) {
  const config = getConfig(status);
  return <Text style={[styles.vehicleStatus, styles[config.styleKey]]}>{config.label}</Text>;
}

export function VehiclesScreen() {
  const { vehicles, isLoading, isRefetching, refetch, handleDelete, handleAddVehicle, getStatusBadge, AlertComponent } = useVehiclesList();

  const renderDeleteAction = (plate: string) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(plate)}>
      <Text style={styles.deleteButtonText}>{'\uD83D\uDDD1'}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: VehicleItem }) => (
    <Swipeable renderRightActions={() => renderDeleteAction(item.plate)}>
      <View style={styles.vehicleCard}>
        <BrazilianPlate plate={item.plate} size="sm" />
        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleModel}>{item.vehicleModel ?? commonMessages.vehicle.noModel}</Text>
          <Text style={styles.vehicleOwner}>{item.ownerName}</Text>
        </View>
        <StatusBadge status={item.status} getConfig={getStatusBadge} />
      </View>
    </Swipeable>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{commonMessages.tabs.vehicles}</Text>
      </View>

      <FlatList
        data={vehicles as VehicleItem[]}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>{'\uD83D\uDE97'}</Text>
            <Text style={styles.emptyText}>{commonMessages.vehicle.noVehicles}</Text>
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.addButton} onPress={handleAddVehicle}>
            <Text style={styles.addButtonText}>{'+ ' + commonMessages.addVehicle}</Text>
          </TouchableOpacity>
        }
      />
      {AlertComponent}
    </SafeAreaView>
  );
}
