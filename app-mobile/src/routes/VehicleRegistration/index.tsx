import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrazilianPlate } from '../../components/BrazilianPlate';
import { useFadeInAnimation } from '../../hooks/animations';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { commonMessages } from '../../locales/pt-BR/common';
import { colors } from '../../theme/tokens';
import { useVehicleRegistration } from './useVehicleRegistration';
import { VEHICLE_COLOR_DOTS, VEHICLE_TYPES, resolveActiveColor, resolveVehicleType } from './vehicleRegistration.config';
import { styles } from './styles';

export function VehicleRegistrationScreen() {
  const {
    lookupData,
    generateQr,
    setGenerateQr,
    handleSubmit,
    handleGoBack,
    isSubmitting,
    AlertComponent,
  } = useVehicleRegistration();

  const fadeSection0 = useFadeInAnimation(0);
  const fadeSection1 = useFadeInAnimation(100);
  const fadeSection2 = useFadeInAnimation(200);
  const fadeSection3 = useFadeInAnimation(300);
  const fadeSection4 = useFadeInAnimation(400);
  const fadeSection5 = useFadeInAnimation(500);

  const activeColorHex = useMemo(
    () => resolveActiveColor(lookupData.color),
    [lookupData.color],
  );

  const activeType = useMemo(
    () => resolveVehicleType(lookupData.model),
    [lookupData.model],
  );

  const modelDisplay = `${lookupData.brand} ${lookupData.model}`.trim();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ─── Header ───────────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backText}>{'\u2190'}</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{commonMessages.vehicle.addTitle}</Text>
        </View>
        <Text style={styles.stepIndicator}>{commonMessages.vehicle.stepIndicator}</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Plate Section ──────────────────────────────────── */}
        <Animated.View style={[styles.plateSection, fadeSection0]}>
          <Text style={styles.sectionLabel}>{commonMessages.vehicle.plateLabel}</Text>
          <View style={styles.plateInputRow}>
            <Text style={styles.plateTextLarge}>{lookupData.plate}</Text>
            <View style={styles.cameraIconButton}>
              <Text style={styles.cameraIconText}>{'\uD83D\uDCF7'}</Text>
            </View>
          </View>
          <View style={styles.platePreviewRow}>
            <BrazilianPlate plate={lookupData.plate} size="sm" />
          </View>
        </Animated.View>

        {/* ─── Separator ──────────────────────────────────────── */}
        <View style={styles.separator} />

        {/* ─── Model Section ──────────────────────────────────── */}
        <Animated.View style={[styles.modelSection, fadeSection1]}>
          <Text style={styles.sectionLabel}>{commonMessages.vehicle.model}</Text>
          <Text style={styles.modelText}>{modelDisplay}</Text>
        </Animated.View>

        {/* ─── Color Section ──────────────────────────────────── */}
        <Animated.View style={[styles.colorSection, fadeSection2]}>
          <Text style={styles.sectionLabel}>{commonMessages.vehicle.color}</Text>
          <View style={styles.colorDotsRow}>
            {VEHICLE_COLOR_DOTS.map((c) => {
              const isActive = activeColorHex === c.hex;
              return (
                <View
                  key={c.name}
                  style={[
                    styles.colorDotWrapper,
                    isActive
                      ? styles.colorDotWrapperActive
                      : styles.colorDotWrapperInactive,
                  ]}
                >
                  <View style={[styles.colorDot, { backgroundColor: c.hex }]} />
                </View>
              );
            })}
          </View>
        </Animated.View>

        {/* ─── Vehicle Type Section ───────────────────────────── */}
        <Animated.View style={[styles.typeSection, fadeSection3]}>
          <Text style={styles.sectionLabel}>{commonMessages.vehicle.vehicleType}</Text>
          <View style={styles.segmentedControl}>
            {VEHICLE_TYPES.map((t) => {
              const isActive = t.key === activeType;
              return (
                <View
                  key={t.key}
                  style={[
                    styles.segmentedButton,
                    isActive && styles.segmentedButtonActive,
                  ]}
                >
                  <Text style={styles.segmentedIcon}>{t.icon}</Text>
                  <Text
                    style={[
                      styles.segmentedText,
                      isActive && styles.segmentedTextActive,
                    ]}
                  >
                    {t.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </Animated.View>

        {/* ─── QR Toggle ──────────────────────────────────────── */}
        <Animated.View style={fadeSection4}>
          <TouchableOpacity
            style={styles.qrToggle}
            onPress={() => setGenerateQr(!generateQr)}
            activeOpacity={0.7}
          >
            <View style={styles.qrIconContainer}>
              <Text style={styles.qrIcon}>{'\uD83D\uDCF1'}</Text>
            </View>
            <View style={styles.qrTextContainer}>
              <Text style={styles.qrTitle}>{commonMessages.vehicle.generateQr}</Text>
              <Text style={styles.qrSubtitle}>{commonMessages.vehicle.qrQuickAccess}</Text>
            </View>
            <View
              style={[
                styles.toggleTrack,
                generateQr ? styles.toggleTrackOn : styles.toggleTrackOff,
              ]}
            >
              <View
                style={[
                  styles.toggleThumb,
                  generateQr ? styles.toggleThumbOn : styles.toggleThumbOff,
                ]}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* ─── Submit Button ──────────────────────────────────── */}
        <Animated.View style={fadeSection5}>
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && { opacity: 0.5 }]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.7}
          >
            {isSubmitting ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color={colors.surface} />
                <Text style={styles.submitButtonText}>{commonMessages.scan.registering}</Text>
              </View>
            ) : (
              <Text style={styles.submitButtonText}>
                {commonMessages.registerVehicle}
              </Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {AlertComponent}
      <LoadingOverlay
        visible={isSubmitting}
        message={commonMessages.scan.registeringVehicle}
        subtitle={commonMessages.scan.registeringSubtitle}
      />
    </SafeAreaView>
  );
}
