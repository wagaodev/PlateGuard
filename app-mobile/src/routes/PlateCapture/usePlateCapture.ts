import { useState, useCallback, useRef, useEffect } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { RootStackParamList } from '../../types/navigation.types';
import { useVehicleLookup } from '../../service/vehicleLookup/useVehicleLookup';
import { isValidPlate } from '../../constants/plate';
import { useCustomAlert } from '../../hooks/useCustomAlert';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function usePlateCapture() {
  const navigation = useNavigation<Nav>();
  const lookupMutation = useVehicleLookup();
  const [plate, setPlate] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const { alert, AlertComponent } = useCustomAlert();
  const cameraRef = useRef<Camera>(null);

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const handleSetPlate = useCallback((text: string) => {
    setPlate(text.toUpperCase().replace(/[^A-Z0-9]/g, ''));
  }, []);

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current) return;

    try {
      await cameraRef.current.takePhoto({ enableShutterSound: true });
      // Photo captured — show manual input for plate entry
      // OCR auto-detection will be Phase 2
      setShowManualInput(true);
    } catch {
      setShowManualInput(true);
    }
  }, []);

  const handleToggleManualInput = useCallback(() => {
    setShowManualInput(true);
  }, []);

  const handleOpenSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  const handleLookup = useCallback(async () => {
    const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (!isValidPlate(cleanPlate)) {
      alert('Placa inválida', 'Informe uma placa no formato Mercosul (AAA0A00)', [
        { text: 'OK' },
      ], '⚠️');
      return;
    }

    try {
      const lookupData = await lookupMutation.mutateAsync(cleanPlate);
      navigation.navigate('VehicleRegistration', { lookupData });
    } catch {
      alert(
        'Não encontrado',
        'Placa não encontrada na base DETRAN. Verifique e tente novamente.',
        [{ text: 'OK' }],
        '🔍',
      );
    }
  }, [plate, lookupMutation, navigation, alert]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    plate,
    setPlate: handleSetPlate,
    handleLookup,
    handleGoBack,
    handleCapture,
    handleToggleManualInput,
    handleOpenSettings,
    isLooking: lookupMutation.isPending,
    showManualInput,
    hasPermission,
    device,
    cameraRef,
    AlertComponent,
  };
}
