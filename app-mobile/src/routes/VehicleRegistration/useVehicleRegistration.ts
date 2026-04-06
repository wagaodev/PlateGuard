import { useState, useCallback, useMemo } from 'react';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation.types';
import { useCreateVehicle } from '../../service/vehicleAccess/useValidatePlate';
import { commonMessages } from '../../locales/pt-BR/common';
import { useErrorHandler } from '../../handlers/errorHandler';
import {
  VEHICLE_COLOR_DOTS,
  VEHICLE_TYPES,
  resolveActiveColor,
  resolveVehicleType,
} from '../../constants/vehicles';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'VehicleRegistration'>;

export function useVehicleRegistration() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { lookupData } = route.params;
  const createMutation = useCreateVehicle();
  const [generateQr, setGenerateQr] = useState(true);
  const { handleNetworkError, handleSuccess, AlertComponent } = useErrorHandler();

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
      handleSuccess(commonMessages.alerts.vehicleRegistered, commonMessages.alerts.vehicleRegisteredMessage, [
        { text: commonMessages.alerts.viewMyVehicles, onPress: navigateToVehicles },
      ]);
    } catch {
      handleNetworkError();
    }
  }, [lookupData, generateQr, createMutation, navigateToVehicles, handleSuccess, handleNetworkError]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Computed values for the UI
  const activeColorHex = useMemo(
    () => resolveActiveColor(lookupData.color),
    [lookupData.color],
  );

  const activeType = useMemo(
    () => resolveVehicleType(lookupData.model),
    [lookupData.model],
  );

  const modelDisplay = `${lookupData.brand} ${lookupData.model}`.trim();

  return {
    lookupData,
    generateQr,
    setGenerateQr,
    handleSubmit,
    handleGoBack,
    isSubmitting: createMutation.isPending,
    activeColorHex,
    activeType,
    modelDisplay,
    colorDots: VEHICLE_COLOR_DOTS,
    vehicleTypes: VEHICLE_TYPES,
    AlertComponent,
  };
}
