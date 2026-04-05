import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation.types';
import { useCreateVehicle } from '../../service/vehicleAccess/useValidatePlate';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'VehicleRegistration'>;

export function useVehicleRegistration() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { lookupData } = route.params;
  const createMutation = useCreateVehicle();
  const [generateQr, setGenerateQr] = useState(true);

  const handleSubmit = useCallback(async () => {
    try {
      await createMutation.mutateAsync({
        plate: lookupData.plate,
        ownerName: lookupData.owner,
        vehicleType: 'car',
        vehicleModel: `${lookupData.brand} ${lookupData.model}`,
        vehicleColor: lookupData.color,
        generateQrCode: generateQr,
      });
      Alert.alert('Sucesso', 'Veículo cadastrado com sucesso', [
        { text: 'OK', onPress: () => navigation.popToTop() },
      ]);
    } catch {
      Alert.alert('Erro', 'Não foi possível cadastrar o veículo');
    }
  }, [lookupData, generateQr, createMutation, navigation]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    lookupData,
    generateQr,
    setGenerateQr,
    handleSubmit,
    handleGoBack,
    isSubmitting: createMutation.isPending,
  };
}
