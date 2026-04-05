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
      'Remover veículo',
      commonMessages.vehicle.deleteConfirm,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMutation.mutateAsync(plate);
            } catch {
              alert('Erro', 'Não foi possível remover o veículo', [
                { text: 'OK' },
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
