import { useState, useCallback } from 'react';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation.types';
import { useCreateVehicle } from '../../service/vehicleAccess/useValidatePlate';
import { commonMessages } from '../../locales/pt-BR/common';
import { useCustomAlert } from '../../hooks/useCustomAlert';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'VehicleRegistration'>;

export function useVehicleRegistration() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { lookupData } = route.params;
  const createMutation = useCreateVehicle();
  const [generateQr, setGenerateQr] = useState(true);
  const { alert, AlertComponent } = useCustomAlert();

  const navigateToVehicles = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'BottomTabs', state: { routes: [{ name: 'Scanner' }, { name: 'Vehicles' }, { name: 'Profile' }], index: 1 } }],
      }),
    );
  }, [navigation]);

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
      alert(commonMessages.alerts.vehicleRegistered, commonMessages.alerts.vehicleRegisteredMessage, [
        { text: commonMessages.alerts.viewMyVehicles, onPress: navigateToVehicles },
      ], '✅');
    } catch {
      alert(commonMessages.alerts.errorTitle, commonMessages.alerts.registrationError, [
        { text: commonMessages.alerts.ok },
      ], '❌');
    }
  }, [lookupData, generateQr, createMutation, navigateToVehicles, alert]);

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
    AlertComponent,
  };
}
