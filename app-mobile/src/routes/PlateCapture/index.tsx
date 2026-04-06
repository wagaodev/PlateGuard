import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'react-native-vision-camera';
import { BrazilianPlate } from '../../components/BrazilianPlate';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { commonMessages } from '../../locales/pt-BR/common';
import { colors } from '../../theme/tokens';
import { usePlateCapture } from './usePlateCapture';
import { styles } from './styles';

export function PlateCaptureScreen() {
  const {
    plate,
    setPlate,
    isValidLength,
    handleLookup,
    handleGoBack,
    handleCapture,
    handleToggleManualInput,
    handleOpenSettings,
    isLooking,
    isProcessingOcr,
    showManualInput,
    hasPermission,
    device,
    cameraRef,
    AlertComponent,
  } = usePlateCapture();

  const [plateFocused, setPlateFocused] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
                {isProcessingOcr
                  ? commonMessages.camera.readingPlate
                  : commonMessages.camera.pointToPlate}
              </Text>
            </View>
            <View style={styles.cameraActions}>
              {isProcessingOcr ? (
                <View style={styles.captureButton}>
                  <ActivityIndicator size="small" color={colors.primary} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={handleCapture}
                  activeOpacity={0.7}
                >
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={handleToggleManualInput}
                disabled={isProcessingOcr}
              >
                <Text style={styles.manualEntryLink}>{commonMessages.camera.enterManually}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : !showManualInput && !hasPermission ? (
          <View style={styles.formCard}>
            <Text style={styles.permissionIcon}>{'📷'}</Text>
            <Text style={styles.permissionTitle}>{commonMessages.camera.permissionRequired}</Text>
            <Text style={styles.permissionMessage}>
              {commonMessages.camera.permissionMessage}
            </Text>
            <TouchableOpacity style={styles.permissionButton} onPress={handleOpenSettings}>
              <Text style={styles.permissionButtonText}>{commonMessages.camera.openSettings}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleManualInput}>
              <Text style={styles.manualEntryLink}>{commonMessages.camera.enterManually}</Text>
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

            {plate.length >= 3 && (
              <View style={styles.platePreview}>
                <BrazilianPlate plate={plate} size="md" />
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
      <LoadingOverlay
        visible={isLooking || isProcessingOcr}
        message={isProcessingOcr ? commonMessages.camera.readingPlate : commonMessages.vehicle.consulting}
        subtitle={isProcessingOcr ? commonMessages.camera.processingOcr : commonMessages.vehicle.consultingSubtitle}
      />
    </SafeAreaView>
  );
}
