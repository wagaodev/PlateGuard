import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { BrazilianPlate } from '../../components/BrazilianPlate';
import { commonMessages } from '../../locales/pt-BR/common';
import { colors } from '../../theme/tokens';
import { usePlateCapture } from './usePlateCapture';
import { styles } from './styles';

export function PlateCaptureScreen() {
  const { plate, setPlate, handleLookup, handleGoBack, isLooking } = usePlateCapture();
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
            onFocus={() => setPlateFocused(true)}
            onBlur={() => setPlateFocused(false)}
            editable={!isLooking}
          />

          {cleanPlate.length >= 3 && (
            <View style={styles.platePreview}>
              <BrazilianPlate plate={cleanPlate} size="md" />
            </View>
          )}

          <View style={styles.cameraHint}>
            <Text style={styles.cameraHintText}>{'📷 Escanear com câmera (em breve)'}</Text>
          </View>
        </View>

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
      </ScrollView>
    </View>
  );
}
