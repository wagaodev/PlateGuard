import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { BrazilianPlate } from '../../components/BrazilianPlate';
import { commonMessages } from '../../locales/pt-BR/common';
import { colors } from '../../theme/tokens';
import { usePlateCapture } from './usePlateCapture';
import { styles } from './styles';

export function PlateCaptureScreen() {
  const {
    plate,
    setPlate,
    handleLookup,
    handleGoBack,
    handleCapture,
    handleToggleManualInput,
    handleOpenSettings,
    isLooking,
    showManualInput,
    hasPermission,
    device,
    cameraRef,
    AlertComponent,
  } = usePlateCapture();

  const [plateFocused, setPlateFocused] = useState(false);
  const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const isValidLength = cleanPlate.length === 7;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backText}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{commonMessages.addVehicle}</Text>
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        {!showManualInput && hasPermission && device ? (
          <View style={styles.cameraContainer}>
            <Camera
              ref={cameraRef}
              style={styles.camera}
              device={device}
              isActive={true}
              photo={true}
            />
            <View style={styles.cameraOverlay}>
              <View style={styles.cameraBrackets}>
                <View style={[styles.bracket, styles.bracketTopLeft]} />
                <View style={[styles.bracket, styles.bracketTopRight]} />
                <View style={[styles.bracket, styles.bracketBottomLeft]} />
                <View style={[styles.bracket, styles.bracketBottomRight]} />
              </View>
              <Text style={styles.cameraHintText}>
                Aponte para a placa do veículo
              </Text>
            </View>
            <View style={styles.cameraActions}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={handleCapture}
                activeOpacity={0.7}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleToggleManualInput}>
                <Text style={styles.manualEntryLink}>Digitar manualmente</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : !showManualInput && !hasPermission ? (
          <View style={styles.formCard}>
            <Text style={styles.permissionIcon}>{'📷'}</Text>
            <Text style={styles.permissionTitle}>Permissão de câmera necessária</Text>
            <Text style={styles.permissionMessage}>
              Para escanear placas, permita o acesso à câmera nas configurações.
            </Text>
            <TouchableOpacity style={styles.permissionButton} onPress={handleOpenSettings}>
              <Text style={styles.permissionButtonText}>Abrir Configurações</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleManualInput}>
              <Text style={styles.manualEntryLink}>Digitar manualmente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formCard}>
            <Text style={styles.label}>{commonMessages.vehicle.plate}</Text>

            <TextInput
              style={[styles.plateInput, plateFocused && styles.plateInputFocused]}
              value={plate}
              onChangeText={setPlate}
              placeholder="AAA0A00"
              placeholderTextColor={colors.textMuted}
              maxLength={7}
              autoCapitalize="characters"
              autoFocus={true}
              onFocus={() => setPlateFocused(true)}
              onBlur={() => setPlateFocused(false)}
              editable={!isLooking}
            />

            {cleanPlate.length >= 3 && (
              <View style={styles.platePreview}>
                <BrazilianPlate plate={cleanPlate} size="md" />
              </View>
            )}
          </View>
        )}

        {showManualInput && (
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!isValidLength || isLooking) && styles.submitButtonDisabled,
            ]}
            onPress={handleLookup}
            disabled={!isValidLength || isLooking}
            activeOpacity={0.7}
          >
            {isLooking ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={colors.surface} />
                <Text style={styles.submitButtonText}>
                  {commonMessages.vehicle.consulting}
                </Text>
              </View>
            ) : (
              <Text style={styles.submitButtonText}>
                {commonMessages.vehicle.consultButton}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>
      {AlertComponent}
    </View>
  );
}
