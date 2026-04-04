import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FeedbackIcon } from '../../components/FeedbackIcon';
import { BrazilianPlate } from '../../components/BrazilianPlate';
import { useFadeInAnimation } from '../../hooks/animations';
import { vehicleAccessMessages } from '../../locales/pt-BR/vehicleAccess';
import { commonMessages } from '../../locales/pt-BR/common';
import { colors } from '../../theme/tokens';
import { FeedbackType } from '../../types/vehicleAccess.types';
import { useFeedback } from './useFeedback';
import { styles } from './styles';

const chipConfig: Record<FeedbackType, { bg: string; text: string; label: string }> = {
  ALLOWED:       { bg: colors.successBg, text: colors.success, label: 'LIBERADO' },
  DENIED:        { bg: colors.errorBg,   text: colors.error,   label: 'BLOQUEADO' },
  NOT_FOUND:     { bg: colors.warningBg, text: colors.warning, label: 'NÃO ENCONTRADO' },
  INVALID_PLATE: { bg: colors.surfaceContainerHigh, text: colors.textSecondary, label: 'INVÁLIDO' },
  SERVER_ERROR:  { bg: colors.surfaceContainerHigh, text: colors.textSecondary, label: 'ERRO' },
};

export function FeedbackScreen() {
  const { result, handleNewScan } = useFeedback();
  const { feedbackType } = result;
  const messages = vehicleAccessMessages[feedbackType];
  const chip = chipConfig[feedbackType];

  const fadeChip    = useFadeInAnimation(0);
  const fadePlate   = useFadeInAnimation(100);
  const fadeDetails = useFadeInAnimation(200);
  const fadeButton  = useFadeInAnimation(300);

  const subtitleColor = feedbackType === 'ALLOWED' ? colors.success
    : feedbackType === 'DENIED' ? colors.error
    : feedbackType === 'NOT_FOUND' ? colors.warning
    : colors.textSecondary;

  const timestamp = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleNewScan}>
          <Text style={styles.backText}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resultado</Text>
        <Text style={styles.headerTimestamp}>{timestamp}</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.heroSection}>
          <FeedbackIcon feedbackType={feedbackType} />
          <Text style={styles.heroTitle}>{messages.title}</Text>
          <Text style={[styles.heroSubtitle, { color: subtitleColor }]}>
            {messages.subtitle}
          </Text>

          <Animated.View style={[styles.chip, { backgroundColor: chip.bg }, fadeChip]}>
            <Text style={[styles.chipText, { color: chip.text }]}>{chip.label}</Text>
          </Animated.View>
        </View>

        {result.plate ? (
          <Animated.View style={[styles.plateMonitor, fadePlate]}>
            <Text style={styles.plateLabel}>Placa identificada</Text>
            <BrazilianPlate plate={result.plate} size="lg" />
          </Animated.View>
        ) : null}

        {(result.ownerName || result.vehicleModel || result.accessType) && (
          <Animated.View style={[styles.detailsCard, fadeDetails]}>
            {result.ownerName && (
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>👤</Text>
                <Text style={styles.detailLabel}>Dono</Text>
                <Text style={styles.detailValue}>{result.ownerName}</Text>
              </View>
            )}
            {result.vehicleModel && (
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>🚗</Text>
                <Text style={styles.detailLabel}>Modelo</Text>
                <Text style={styles.detailValue}>{result.vehicleModel}</Text>
              </View>
            )}
            {result.vehicleType && (
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>📋</Text>
                <Text style={styles.detailLabel}>Tipo</Text>
                <Text style={styles.detailValue}>{result.vehicleType}</Text>
              </View>
            )}
            {result.accessType && (
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>🔑</Text>
                <Text style={styles.detailLabel}>Acesso</Text>
                <Text style={styles.detailValue}>{result.accessType}</Text>
              </View>
            )}
          </Animated.View>
        )}

        {result.reason && (
          <Animated.View style={[styles.detailsCard, fadeDetails]}>
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>⚠️</Text>
              <Text style={[styles.detailValue, { color: colors.warning }]}>
                {result.reason}
              </Text>
            </View>
          </Animated.View>
        )}

        <Animated.View style={fadeButton}>
          <TouchableOpacity style={styles.ctaButton} onPress={handleNewScan}>
            <Text style={styles.ctaButtonText}>{commonMessages.newScan}</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
