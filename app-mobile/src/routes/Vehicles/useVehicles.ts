import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useVehicles as useVehiclesQuery, useDeleteVehicle } from '../../service/vehicleAccess/useValidatePlate';
import { RootStackParamList } from '../../types/navigation.types';
import { commonMessages } from '../../locales/pt-BR/common';
import { useErrorHandler } from '../../handlers/errorHandler';
import { getStatusBadgeConfig } from '../../constants/vehicles';
import type { StatusBadgeConfig } from '../../constants/vehicles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function useVehiclesList() {
  const navigation = useNavigation<Nav>();
  const vehiclesQuery = useVehiclesQuery();
  const deleteMutation = useDeleteVehicle();
  const { handleDeleteConfirm, handleGenericError, AlertComponent } = useErrorHandler();

  const handleDelete = useCallback((plate: string) => {
    handleDeleteConfirm(async () => {
      try {
        await deleteMutation.mutateAsync(plate);
      } catch {
        handleGenericError(commonMessages.alerts.errorTitle, commonMessages.alerts.deleteError);
      }
    });
  }, [deleteMutation, handleDeleteConfirm, handleGenericError]);

  const handleAddVehicle = useCallback(() => {
    navigation.navigate('PlateCapture');
  }, [navigation]);

  const getStatusBadge = useCallback((status: string): StatusBadgeConfig => {
    return getStatusBadgeConfig(status);
  }, []);

  return {
    vehicles: vehiclesQuery.data ?? [],
    isLoading: vehiclesQuery.isLoading,
    isRefetching: vehiclesQuery.isRefetching,
    refetch: vehiclesQuery.refetch,
    handleDelete,
    handleAddVehicle,
    getStatusBadge,
    AlertComponent,
  };
}
