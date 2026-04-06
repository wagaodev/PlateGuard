import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useVehicles as useVehiclesQuery, useDeleteVehicle } from '../../service/vehicleAccess/useValidatePlate';
import { RootStackParamList } from '../../types/navigation.types';
import { commonMessages } from '../../locales/pt-BR/common';
import { useCustomAlert } from '../../hooks/useCustomAlert';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function useVehiclesList() {
  const navigation = useNavigation<Nav>();
  const vehiclesQuery = useVehiclesQuery();
  const deleteMutation = useDeleteVehicle();
  const { alert, AlertComponent } = useCustomAlert();

  const handleDelete = useCallback((plate: string) => {
    alert(
      commonMessages.alerts.removeVehicle,
      commonMessages.vehicle.deleteConfirm,
      [
        { text: commonMessages.alerts.cancel, style: 'cancel' },
        {
          text: commonMessages.alerts.remove,
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMutation.mutateAsync(plate);
            } catch {
              alert(commonMessages.alerts.errorTitle, commonMessages.alerts.deleteError, [
                { text: commonMessages.alerts.ok },
              ], '❌');
            }
          },
        },
      ],
      '🗑️',
    );
  }, [deleteMutation, alert]);

  const handleAddVehicle = useCallback(() => {
    navigation.navigate('PlateCapture');
  }, [navigation]);

  return {
    vehicles: vehiclesQuery.data ?? [],
    isLoading: vehiclesQuery.isLoading,
    isRefetching: vehiclesQuery.isRefetching,
    refetch: vehiclesQuery.refetch,
    handleDelete,
    handleAddVehicle,
    AlertComponent,
  };
}
