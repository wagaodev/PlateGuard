import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useVehicles as useVehiclesQuery, useDeleteVehicle } from '../../service/vehicleAccess/useValidatePlate';
import { RootStackParamList } from '../../types/navigation.types';
import { commonMessages } from '../../locales/pt-BR/common';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function useVehiclesList() {
  const navigation = useNavigation<Nav>();
  const vehiclesQuery = useVehiclesQuery();
  const deleteMutation = useDeleteVehicle();

  const handleDelete = useCallback((plate: string) => {
    Alert.alert(
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
              Alert.alert('Erro', 'Não foi possível remover o veículo');
            }
          },
        },
      ],
    );
  }, [deleteMutation]);

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
  };
}
