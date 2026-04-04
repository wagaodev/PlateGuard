import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrazilianPlate } from '../../components/BrazilianPlate';
import { useFadeInAnimation } from '../../hooks/animations';
import { commonMessages } from '../../locales/pt-BR/common';
import { useVehicleRegistration } from './useVehicleRegistration';
import { styles } from './styles';

const TYPE_LABELS: Record<string, string> = {
  car: commonMessages.vehicle.car,
  motorcycle: commonMessages.vehicle.motorcycle,
  truck: commonMessages.vehicle.truck,
};

export function VehicleRegistrationScreen() {
  const {
    plate,
    setPlate,
    model,
    setModel,
    selectedColor,
    setSelectedColor,
    selectedType,
    setSelectedType,
    generateQr,
    setGenerateQr,
    handleSubmit,
    handleGoBack,
    isSubmitting,
    vehicleColors,
    vehicleTypes,
  } = useVehicleRegistration();

  const [plateFocused, setPlateFocused] = useState(false);
  const [modelFocused, setModelFocused] = useState(false);
  const fadePreview = useFadeInAnimation(0);
  const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backText}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adicionar Veículo</Text>
        <Text style={styles.headerStep}>1 de 2</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40, gap: 16 }}>
        <View style={styles.formCard}>
          <View>
            <Text style={styles.label}>{commonMessages.vehicle.plate}</Text>
            <TextInput
              style={[styles.plateInput, plateFocused && styles.plateInputFocused]}
              value={plate}
              onChangeText={setPlate}
              placeholder="AAA0A00"
              placeholderTextColor="#5a5f72"
              maxLength={7}
              autoCapitalize="characters"
              onFocus={() => setPlateFocused(true)}
              onBlur={() => setPlateFocused(false)}
            />
          </View>

          {cleanPlate.length >= 3 && (
            <Animated.View style={[styles.platePreview, fadePreview]}>
              <BrazilianPlate plate={cleanPlate} size="md" />
            </Animated.View>
          )}

          <View>
            <Text style={styles.label}>{commonMessages.vehicle.model}</Text>
            <TextInput
              style={[styles.textInput, modelFocused && styles.textInputFocused]}
              value={model}
              onChangeText={setModel}
              placeholder="Ex: Honda Civic"
              placeholderTextColor="#5a5f72"
              onFocus={() => setModelFocused(true)}
              onBlur={() => setModelFocused(false)}
            />
          </View>

          <View>
            <Text style={styles.label}>{commonMessages.vehicle.color}</Text>
            <View style={styles.colorRow}>
              {vehicleColors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorPill,
                    selectedColor === color && styles.colorPillSelected,
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  <Text style={styles.colorPillText}>{color}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View>
            <Text style={styles.label}>{commonMessages.vehicle.type}</Text>
            <View style={styles.typeRow}>
              {vehicleTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    selectedType === type && styles.typeButtonActive,
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      selectedType === type && styles.typeButtonTextActive,
                    ]}
                  >
                    {TYPE_LABELS[type]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.qrToggle}
            onPress={() => setGenerateQr(!generateQr)}
          >
            <Text style={styles.qrIcon}>{'📱'}</Text>
            <View style={styles.qrTextContainer}>
              <Text style={styles.qrTitle}>{commonMessages.vehicle.generateQr}</Text>
              <Text style={styles.qrSubtitle}>{commonMessages.vehicle.qrDescription}</Text>
            </View>
            <View style={[styles.toggleTrack, generateQr ? styles.toggleTrackOn : styles.toggleTrackOff]}>
              <View style={[styles.toggleThumb, generateQr ? styles.toggleThumbOn : styles.toggleThumbOff]} />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, { opacity: cleanPlate.length < 7 ? 0.5 : 1 }]}
          onPress={handleSubmit}
          disabled={cleanPlate.length < 7 || isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Cadastrando...' : commonMessages.registerVehicle}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
