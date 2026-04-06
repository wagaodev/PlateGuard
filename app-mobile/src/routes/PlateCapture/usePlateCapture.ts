import { useState, useCallback, useRef, useEffect } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import MlkitOcr from 'react-native-mlkit-ocr';
import axios from 'axios';
import { RootStackParamList } from '../../types/navigation.types';
import { useVehicleLookup } from '../../service/vehicleLookup/useVehicleLookup';
import { isValidPlate } from '../../constants/plate';
import { extractPlateFromOcrResult } from '../../utils/extractPlateFromOcr';
import { useErrorHandler } from '../../handlers/errorHandler';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function usePlateCapture() {
  const navigation = useNavigation<Nav>();
  const lookupMutation = useVehicleLookup();
  const [plate, setPlate] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);
  const { handleNotFound, handlePlateNotDetected, handleInvalidPlate, handleNetworkError, AlertComponent } = useErrorHandler();
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
      const photo = await cameraRef.current.takePhoto({ enableShutterSound: true });
      const photoUri = `file://${photo.path}`;

      setIsProcessingOcr(true);

      const ocrResult = await MlkitOcr.detectFromUri(photoUri);
      const foundPlate = extractPlateFromOcrResult(ocrResult);

      setIsProcessingOcr(false);

      if (foundPlate) {
        setPlate(foundPlate);
        try {
          const lookupData = await lookupMutation.mutateAsync(foundPlate);
          navigation.navigate('VehicleRegistration', { lookupData });
        } catch (error: unknown) {
          setShowManualInput(true);
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            handleNotFound();
          } else if (axios.isAxiosError(error) && !error.response) {
            handleNetworkError();
          } else {
            handleNotFound();
          }
        }
      } else {
        setShowManualInput(true);
        handlePlateNotDetected();
      }
    } catch {
      setIsProcessingOcr(false);
      setShowManualInput(true);
    }
  }, [lookupMutation, navigation, handleNotFound, handlePlateNotDetected, handleNetworkError]);

  const handleToggleManualInput = useCallback(() => {
    setShowManualInput(true);
  }, []);

  const handleOpenSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  const handleLookup = useCallback(async () => {
    const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (!isValidPlate(cleanPlate)) {
      handleInvalidPlate();
      return;
    }

    try {
      const lookupData = await lookupMutation.mutateAsync(cleanPlate);
      navigation.navigate('VehicleRegistration', { lookupData });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        handleNotFound();
      } else if (axios.isAxiosError(error) && !error.response) {
        handleNetworkError();
      } else {
        handleNotFound();
      }
    }
  }, [plate, lookupMutation, navigation, handleInvalidPlate, handleNotFound, handleNetworkError]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const isValidLength = plate.length === 7;

  return {
    plate,
    setPlate: handleSetPlate,
    isValidLength,
    handleLookup,
    handleGoBack,
    handleCapture,
    handleToggleManualInput,
    handleOpenSettings,
    isLooking: lookupMutation.isPending,
    isProcessingOcr,
    showManualInput,
    hasPermission,
    device,
    cameraRef,
    AlertComponent,
  };
}
