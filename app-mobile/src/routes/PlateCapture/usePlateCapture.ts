import { useState, useCallback, useRef, useEffect } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import MlkitOcr, { type MlkitOcrResult } from 'react-native-mlkit-ocr';
import { RootStackParamList } from '../../types/navigation.types';
import { useVehicleLookup } from '../../service/vehicleLookup/useVehicleLookup';
import { isValidPlate, PLATE_REGEX } from '../../constants/plate';
import { commonMessages } from '../../locales/pt-BR/common';
import { useCustomAlert } from '../../hooks/useCustomAlert';

type Nav = NativeStackNavigationProp<RootStackParamList>;

/**
 * Extracts a valid Brazilian plate from OCR text blocks.
 * Tries individual words first, then concatenates adjacent words
 * (OCR may split "BRA 2E19" into two separate tokens).
 */
function extractPlateFromOcrResult(ocrResult: MlkitOcrResult): string | null {
  const allText = ocrResult.map((block) => block.text).join(' ');
  const cleanText = allText.toUpperCase().replace(/[^A-Z0-9\s]/g, '');
  const words = cleanText.split(/\s+/).filter(Boolean);

  // Try individual words
  for (const word of words) {
    if (PLATE_REGEX.test(word)) {
      return word;
    }
  }

  // Try concatenating adjacent words (plate split across two tokens)
  for (let i = 0; i < words.length - 1; i++) {
    const combined = words[i] + words[i + 1];
    if (PLATE_REGEX.test(combined)) {
      return combined;
    }
  }

  return null;
}

export function usePlateCapture() {
  const navigation = useNavigation<Nav>();
  const lookupMutation = useVehicleLookup();
  const [plate, setPlate] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);
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
      const photo = await cameraRef.current.takePhoto({ enableShutterSound: true });
      const photoUri = `file://${photo.path}`;

      setIsProcessingOcr(true);

      // Run ML Kit OCR on the captured photo
      const ocrResult = await MlkitOcr.detectFromUri(photoUri);
      const foundPlate = extractPlateFromOcrResult(ocrResult);

      setIsProcessingOcr(false);

      if (foundPlate) {
        // OCR found a valid plate — auto-fill and auto-lookup
        setPlate(foundPlate);
        try {
          const lookupData = await lookupMutation.mutateAsync(foundPlate);
          navigation.navigate('VehicleRegistration', { lookupData });
        } catch {
          alert(
            commonMessages.camera.notFoundTitle,
            commonMessages.camera.notFoundMessage,
            [{ text: commonMessages.alerts.ok }],
            '🔍',
          );
          setShowManualInput(true);
        }
      } else {
        // OCR couldn't find a plate — fallback to manual input
        setShowManualInput(true);
        alert(
          commonMessages.camera.plateNotDetected,
          commonMessages.camera.plateNotDetectedMessage,
          [{ text: commonMessages.alerts.ok }],
          '📷',
        );
      }
    } catch {
      setIsProcessingOcr(false);
      setShowManualInput(true);
    }
  }, [lookupMutation, navigation, alert]);

  const handleToggleManualInput = useCallback(() => {
    setShowManualInput(true);
  }, []);

  const handleOpenSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  const handleLookup = useCallback(async () => {
    const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (!isValidPlate(cleanPlate)) {
      alert(commonMessages.camera.invalidPlateTitle, commonMessages.camera.invalidPlateMessage, [
        { text: commonMessages.alerts.ok },
      ], '⚠️');
      return;
    }

    try {
      const lookupData = await lookupMutation.mutateAsync(cleanPlate);
      navigation.navigate('VehicleRegistration', { lookupData });
    } catch {
      alert(
        commonMessages.camera.notFoundTitle,
        commonMessages.camera.notFoundMessage,
        [{ text: commonMessages.alerts.ok }],
        '🔍',
      );
    }
  }, [plate, lookupMutation, navigation, alert]);

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
