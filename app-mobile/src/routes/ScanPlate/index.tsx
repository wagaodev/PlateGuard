import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '../../components/AppHeader';
import { ScanModeToggle } from '../../components/ScanModeToggle';
import { CameraViewfinder } from '../../components/CameraViewfinder';
import { BrazilianPlate } from '../../components/BrazilianPlate';
import { usePulseAnimation } from '../../hooks/animations';
import { vehicleAccessMessages } from '../../locales/pt-BR/vehicleAccess';
import { commonMessages } from '../../locales/pt-BR/common';
import { useScanPlate } from './useScanPlate';
import { styles } from './styles';

const DEMO_PLATES = ['BRA2E19', 'ABC3D45', 'XYZ1234', 'BLQ9A87', 'ZZZ9Z99'];

export function ScanPlateScreen() {
  const {
    scanMode,
    handleModeChange,
    manualPlate,
    setManualPlate,
    showManualInput,
    setShowManualInput,
    handleManualSubmit,
    handleSimulatedScan,
    isValidating,
  } = useScanPlate();

  const pulseStyle = usePulseAnimation();
  const [inputFocused, setInputFocused] = useState(false);

  const statusText = scanMode === 'QR_CODE'
    ? vehicleAccessMessages.scanStatus.qrCode
    : vehicleAccessMessages.scanStatus.camera;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader />
      <ScrollView style={styles.content} contentContainerStyle={{ gap: 16, paddingBottom: 20 }}>
        <View style={styles.toggleWrapper}>
          <ScanModeToggle activeMode={scanMode} onModeChange={handleModeChange} />
        </View>

        <CameraViewfinder scanMode={scanMode}>
          {manualPlate.replace(/\s/g, '').length >= 3 && (
            <BrazilianPlate plate={manualPlate.replace(/\s/g, '')} size="md" />
          )}
        </CameraViewfinder>

        <View style={styles.statusContainer}>
          <Animated.View style={[styles.statusDot, pulseStyle]} />
          <Text style={styles.statusText}>{statusText}</Text>
        </View>

        {!showManualInput ? (
          <TouchableOpacity
            style={styles.manualButton}
            onPress={() => setShowManualInput(true)}
          >
            <Text style={styles.manualButtonText}>
              {commonMessages.manualEntry}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.manualInputContainer}>
            <TextInput
              style={[styles.manualInput, inputFocused && styles.manualInputFocused]}
              value={manualPlate}
              onChangeText={setManualPlate}
              placeholder="AAA0A00"
              placeholderTextColor="#5a5f72"
              maxLength={7}
              autoCapitalize="characters"
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
            />
            <TouchableOpacity
              style={[styles.submitButton, { opacity: manualPlate.length < 7 ? 0.5 : 1 }]}
              onPress={handleManualSubmit}
              disabled={manualPlate.replace(/\s/g, '').length < 7 || isValidating}
            >
              <Text style={styles.submitButtonText}>
                {isValidating ? 'Validando...' : 'Validar Placa'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.simulateContainer}>
          <Text style={styles.simulateTitle}>Simular leitura (POC)</Text>
          <View style={styles.simulateRow}>
            {DEMO_PLATES.map((plate) => (
              <TouchableOpacity
                key={plate}
                style={styles.simulateChip}
                onPress={() => handleSimulatedScan(plate)}
                disabled={isValidating}
              >
                <Text style={styles.simulateChipText}>{plate}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
