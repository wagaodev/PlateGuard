import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';
import { useVehicleLookup } from '../../service/vehicleLookup/useVehicleLookup';
import { isValidPlate } from '../../constants/plate';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function usePlateCapture() {
  const navigation = useNavigation<Nav>();
  const lookupMutation = useVehicleLookup();
  const [plate, setPlate] = useState('');

  const handleSetPlate = useCallback((text: string) => {
    setPlate(text.toUpperCase().replace(/[^A-Z0-9]/g, ''));
  }, []);

  const handleLookup = useCallback(async () => {
    const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (!isValidPlate(cleanPlate)) {
      Alert.alert('Placa inválida', 'Informe uma placa no formato Mercosul (AAA0A00)');
      return;
    }

    try {
      const lookupData = await lookupMutation.mutateAsync(cleanPlate);
      navigation.navigate('VehicleRegistration', { lookupData });
    } catch {
      Alert.alert(
        'Não encontrado',
        'Placa não encontrada na base DETRAN. Verifique e tente novamente.',
      );
    }
  }, [plate, lookupMutation, navigation]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    plate,
    setPlate: handleSetPlate,
    handleLookup,
    handleGoBack,
    isLooking: lookupMutation.isPending,
  };
}
