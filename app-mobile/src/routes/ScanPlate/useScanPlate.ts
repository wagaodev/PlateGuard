import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useVehicleAccessStore } from '../../store/vehicleAccessStore';
import { useValidatePlate } from '../../service/vehicleAccess/useValidatePlate';
import { useErrorHandler } from '../../handlers/errorHandler';
import { RootStackParamList } from '../../types/navigation.types';
import { ScanMode } from '../../types/vehicleAccess.types';
import { DEMO_PLATES } from '../../constants/scanner';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function useScanPlate() {
  const navigation = useNavigation<Nav>();
  const { scanMode, setScanMode, setScanState } = useVehicleAccessStore();
  const validateMutation = useValidatePlate();
  const { handleApiError, AlertComponent } = useErrorHandler();
  const [manualPlate, setManualPlateRaw] = useState('');

  const setManualPlate = useCallback((text: string) => {
    setManualPlateRaw(text.toUpperCase().replace(/[^A-Z0-9]/g, ''));
  }, []);
  const [showManualInput, setShowManualInput] = useState(false);

  const handleModeChange = useCallback((mode: ScanMode) => {
    setScanMode(mode);
  }, [setScanMode]);

  const handleValidate = useCallback(async (plate: string, entryMethod = 'CAMERA') => {
    setScanState('validating');
    const result = await validateMutation.mutateAsync({ plate, entryMethod });
    setScanState('done');

    if (result.feedbackType === 'SERVER_ERROR' || result.feedbackType === 'INVALID_PLATE') {
      handleApiError(result);
      return;
    }

    navigation.navigate('Feedback', { result });
  }, [navigation, setScanState, validateMutation, handleApiError]);

  const handleManualSubmit = useCallback(() => {
    if (manualPlate.replace(/\s/g, '').length >= 7) {
      handleValidate(manualPlate, 'MANUAL');
    }
  }, [manualPlate, handleValidate]);

  const handleSimulatedScan = useCallback((plate: string) => {
    handleValidate(plate, scanMode === 'QR_CODE' ? 'QR_CODE' : 'CAMERA');
  }, [handleValidate, scanMode]);

  const handleScanPlate = useCallback(() => {
    navigation.navigate('PlateCapture');
  }, [navigation]);

  return {
    scanMode,
    handleModeChange,
    manualPlate,
    setManualPlate,
    showManualInput,
    setShowManualInput,
    handleManualSubmit,
    handleSimulatedScan,
    handleScanPlate,
    isValidating: validateMutation.isPending,
    demoPlates: DEMO_PLATES,
    AlertComponent,
  };
}
