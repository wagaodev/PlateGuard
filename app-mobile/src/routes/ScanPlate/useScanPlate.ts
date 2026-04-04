import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useVehicleAccessStore } from '../../store/vehicleAccessStore';
import { useValidatePlate } from '../../service/vehicleAccess/useValidatePlate';
import { RootStackParamList } from '../../types/navigation.types';
import { ScanMode } from '../../types/vehicleAccess.types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function useScanPlate() {
  const navigation = useNavigation<Nav>();
  const { scanMode, setScanMode, setScanState } = useVehicleAccessStore();
  const validateMutation = useValidatePlate();
  const [manualPlate, setManualPlate] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  const handleModeChange = useCallback((mode: ScanMode) => {
    setScanMode(mode);
  }, [setScanMode]);

  const handleValidate = useCallback(async (plate: string, entryMethod = 'CAMERA') => {
    setScanState('validating');
    const result = await validateMutation.mutateAsync({ plate, entryMethod });
    setScanState('done');
    navigation.navigate('Feedback', { result });
  }, [navigation, setScanState, validateMutation]);

  const handleManualSubmit = useCallback(() => {
    if (manualPlate.replace(/\s/g, '').length >= 7) {
      handleValidate(manualPlate, 'MANUAL');
    }
  }, [manualPlate, handleValidate]);

  const handleSimulatedScan = useCallback((plate: string) => {
    handleValidate(plate, scanMode === 'QR_CODE' ? 'QR_CODE' : 'CAMERA');
  }, [handleValidate, scanMode]);

  return {
    scanMode,
    handleModeChange,
    manualPlate,
    setManualPlate,
    showManualInput,
    setShowManualInput,
    handleManualSubmit,
    handleSimulatedScan,
    isValidating: validateMutation.isPending,
  };
}
