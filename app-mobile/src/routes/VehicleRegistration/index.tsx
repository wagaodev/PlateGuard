import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrazilianPlate } from '../../components/BrazilianPlate';
import { useFadeInAnimation } from '../../hooks/animations';
import { commonMessages } from '../../locales/pt-BR/common';
import { colors } from '../../theme/tokens';
import { useVehicleRegistration } from './useVehicleRegistration';
import { styles } from './styles';

function maskValue(value: string, visibleStart = 4, visibleEnd = 3): string {
  if (value.length <= visibleStart + visibleEnd) return value;
  const start = value.slice(0, visibleStart);
  const end = value.slice(-visibleEnd);
  const masked = '*'.repeat(value.length - visibleStart - visibleEnd);
  return `${start}${masked}${end}`;
}

interface DetailRowProps {
  icon: string;
  label: string;
  value: string;
  delay: number;
}

function DetailRow({ icon, label, value, delay }: DetailRowProps) {
  const fadeAnim = useFadeInAnimation(delay);
  return (
    <Animated.View style={[styles.detailRow, fadeAnim]}>
      <Text style={styles.detailIcon}>{icon}</Text>
      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
      <Text style={styles.lockIcon}>{'🔒'}</Text>
    </Animated.View>
  );
}

export function VehicleRegistrationScreen() {
  const {
    lookupData,
    generateQr,
    setGenerateQr,
    handleSubmit,
    handleGoBack,
    isSubmitting,
  } = useVehicleRegistration();

  const fadeHero = useFadeInAnimation(0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backText}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{commonMessages.vehicle.confirmRegistration}</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40, gap: 16 }}>
        <Animated.View style={[styles.plateHero, fadeHero]}>
          <BrazilianPlate plate={lookupData.plate} size="lg" />
          <Text style={styles.lookupInfoText}>{commonMessages.vehicle.lookupInfo}</Text>
        </Animated.View>

        <View style={styles.formCard}>
          <DetailRow icon="👤" label={commonMessages.vehicle.owner} value={lookupData.owner} delay={100} />
          <DetailRow icon="🏭" label={commonMessages.vehicle.brand} value={lookupData.brand} delay={150} />
          <DetailRow icon="🚗" label={commonMessages.vehicle.model} value={lookupData.model} delay={200} />
          <DetailRow icon="📅" label={commonMessages.vehicle.year} value={String(lookupData.year)} delay={250} />
          <DetailRow icon="🎨" label={commonMessages.vehicle.color} value={lookupData.color} delay={300} />
          <DetailRow icon="⛽" label={commonMessages.vehicle.fuel} value={lookupData.fuelType} delay={350} />
          <DetailRow icon="📍" label={commonMessages.vehicle.cityState} value={`${lookupData.city}/${lookupData.state}`} delay={400} />
          <DetailRow icon="🔧" label={commonMessages.vehicle.chassi} value={maskValue(lookupData.chassi, 6, 4)} delay={450} />
          <DetailRow icon="📋" label={commonMessages.vehicle.renavam} value={maskValue(lookupData.renavam, 4, 3)} delay={500} />
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

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && { opacity: 0.5 }]}
          onPress={handleSubmit}
          disabled={isSubmitting}
          activeOpacity={0.7}
        >
          {isSubmitting ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator size="small" color={colors.surface} />
              <Text style={styles.submitButtonText}>Cadastrando...</Text>
            </View>
          ) : (
            <Text style={styles.submitButtonText}>{commonMessages.registerVehicle}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
