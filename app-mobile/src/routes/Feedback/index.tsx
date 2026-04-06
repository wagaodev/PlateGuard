import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrazilianPlate } from '../../components/BrazilianPlate';
import { useFadeInAnimation, useSuccessAnimation } from '../../hooks/animations';
import { vehicleAccessMessages } from '../../locales/pt-BR/vehicleAccess';
import { commonMessages } from '../../locales/pt-BR/common';
import { colors } from '../../theme/tokens';
import { FeedbackType } from '../../types/vehicleAccess.types';
import { useFeedback } from './useFeedback';
import { styles } from './styles';

// ─── Per-state visual configuration ────────────────────────────────
interface StateConfig {
  iconBg: string;
  iconGlow: string;
  icon: string;
  subtitleColor: string;
  plateGlow: string;
  plateBorderColor: string;
  noteConfig: {
    bg: string;
    border: string;
    iconBg: string;
    iconColor: string;
    textColor: string;
    text: string;
  } | null;
  showSecondaryButton: boolean;
  gradientColor: string;
}

const stateConfigs: Record<FeedbackType, StateConfig> = {
  ALLOWED: {
    iconBg: colors.success,
    iconGlow: colors.successGlow,
    icon: '\u2713',
    subtitleColor: colors.textSecondary,
    plateGlow: 'transparent',
    plateBorderColor: 'transparent',
    noteConfig: {
      bg: 'rgba(74, 225, 118, 0.06)',
      border: 'rgba(74, 225, 118, 0.15)',
      iconBg: colors.success,
      iconColor: colors.white,
      textColor: colors.textSecondary,
      text: 'Leitura processada pelo Sentinel Core Engine v4.2. O portão foi aberto automaticamente para o veículo identificado.',
    },
    showSecondaryButton: false,
    gradientColor: colors.success,
  },
  DENIED: {
    iconBg: colors.warningBg,
    iconGlow: 'rgba(245, 158, 11, 0.3)',
    icon: '!',
    subtitleColor: colors.textSecondary,
    plateGlow: colors.errorGlow,
    plateBorderColor: 'rgba(239, 68, 68, 0.4)',
    noteConfig: {
      bg: 'rgba(245, 158, 11, 0.06)',
      border: 'rgba(245, 158, 11, 0.15)',
      iconBg: colors.warningBg,
      iconColor: colors.warning,
      textColor: colors.textSecondary,
      text: 'Tentativa registrada e notificação enviada para a central de monitoramento em tempo real.',
    },
    showSecondaryButton: false,
    gradientColor: colors.error,
  },
  NOT_FOUND: {
    iconBg: colors.primaryContainer,
    iconGlow: colors.primaryGlow,
    icon: '?',
    subtitleColor: colors.textSecondary,
    plateGlow: 'transparent',
    plateBorderColor: 'transparent',
    noteConfig: {
      bg: 'rgba(173, 198, 255, 0.06)',
      border: 'rgba(173, 198, 255, 0.15)',
      iconBg: colors.primaryContainer,
      iconColor: colors.white,
      textColor: colors.textSecondary,
      text: 'Este veículo não possui registro em nossa base. Por favor, entre em contato com a administração para orientações.',
    },
    showSecondaryButton: true,
    gradientColor: colors.primaryContainer,
  },
  INVALID_PLATE: {
    iconBg: colors.surfaceContainerHigh,
    iconGlow: 'transparent',
    icon: '\u2298',
    subtitleColor: colors.textSecondary,
    plateGlow: 'transparent',
    plateBorderColor: 'transparent',
    noteConfig: {
      bg: 'rgba(138, 143, 168, 0.06)',
      border: 'rgba(138, 143, 168, 0.15)',
      iconBg: colors.surfaceContainerHigh,
      iconColor: colors.textSecondary,
      textColor: colors.textSecondary,
      text: 'A placa não pôde ser identificada. Tente novamente com melhor iluminação ou insira manualmente.',
    },
    showSecondaryButton: false,
    gradientColor: colors.textSecondary,
  },
  SERVER_ERROR: {
    iconBg: colors.surfaceContainerHigh,
    iconGlow: 'transparent',
    icon: '\u21AF',
    subtitleColor: colors.textSecondary,
    plateGlow: 'transparent',
    plateBorderColor: 'transparent',
    noteConfig: {
      bg: 'rgba(138, 143, 168, 0.06)',
      border: 'rgba(138, 143, 168, 0.15)',
      iconBg: colors.surfaceContainerHigh,
      iconColor: colors.textSecondary,
      textColor: colors.textSecondary,
      text: 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
    },
    showSecondaryButton: false,
    gradientColor: colors.textSecondary,
  },
};

// ─── Detail row builders per feedback type ────────────────────────
interface DetailRowData {
  icon: string;
  iconBg: string;
  label: string;
  value: string;
  valueColor?: string;
}

function buildDetailRows(
  feedbackType: FeedbackType,
  result: {
    plate: string;
    ownerName?: string;
    accessType?: string;
    vehicleModel?: string;
    reason?: string;
  },
): DetailRowData[] {
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  switch (feedbackType) {
    case 'ALLOWED':
      return [
        result.ownerName
          ? { icon: '\uD83D\uDC64', iconBg: 'rgba(74, 225, 118, 0.12)', label: 'Nome', value: result.ownerName }
          : null,
        result.accessType
          ? { icon: '\uD83C\uDFAB', iconBg: 'rgba(74, 225, 118, 0.12)', label: 'Tipo', value: formatAccessType(result.accessType) }
          : null,
        result.vehicleModel
          ? { icon: '\uD83D\uDE97', iconBg: 'rgba(74, 225, 118, 0.12)', label: 'Veículo', value: result.vehicleModel }
          : null,
        { icon: '\uD83D\uDCC5', iconBg: 'rgba(74, 225, 118, 0.12)', label: 'Data', value: `${dateStr} às ${timeStr}` },
      ].filter(Boolean) as DetailRowData[];

    case 'DENIED':
      return [
        { icon: '\uD83D\uDD11', iconBg: 'rgba(255, 180, 171, 0.12)', label: 'Placa', value: result.plate },
        result.reason
          ? { icon: '\u26A0\uFE0F', iconBg: 'rgba(255, 180, 171, 0.12)', label: 'Motivo', value: result.reason, valueColor: colors.error }
          : { icon: '\u26A0\uFE0F', iconBg: 'rgba(255, 180, 171, 0.12)', label: 'Motivo', value: 'Veículo bloqueado', valueColor: colors.error },
        { icon: '\uD83D\uDCC5', iconBg: 'rgba(255, 180, 171, 0.12)', label: 'Registrado em', value: `${dateStr}, ${timeStr}` },
      ];

    case 'NOT_FOUND':
      return [
        { icon: '\uD83D\uDD0D', iconBg: 'rgba(173, 198, 255, 0.12)', label: 'Placa lida', value: result.plate },
        { icon: '\u2139\uFE0F', iconBg: 'rgba(173, 198, 255, 0.12)', label: 'Situação', value: 'Não cadastrado', valueColor: colors.warning },
      ];

    case 'INVALID_PLATE':
      return [
        { icon: '\u26A0\uFE0F', iconBg: 'rgba(138, 143, 168, 0.12)', label: 'Situação', value: 'Leitura inválida' },
      ];

    case 'SERVER_ERROR':
      return [
        { icon: '\u26A0\uFE0F', iconBg: 'rgba(138, 143, 168, 0.12)', label: 'Situação', value: 'Erro no servidor' },
        { icon: '\uD83D\uDCC5', iconBg: 'rgba(138, 143, 168, 0.12)', label: 'Horário', value: `${dateStr}, ${timeStr}` },
      ];

    default:
      return [];
  }
}

function formatAccessType(type: string): string {
  const map: Record<string, string> = {
    resident: 'Mensalista Permanente',
    visitor: 'Visitante',
    blocked: 'Bloqueado',
  };
  return map[type] ?? type;
}

// ─── Component ────────────────────────────────────────────────────
export function FeedbackScreen() {
  const { result, handleNewScan } = useFeedback();
  const { feedbackType } = result;
  const messages = vehicleAccessMessages[feedbackType];
  const config = stateConfigs[feedbackType];
  const detailRows = buildDetailRows(feedbackType, result);

  const fadeHero    = useFadeInAnimation(0);
  const fadePlate   = useFadeInAnimation(100);
  const fadeDetails = useFadeInAnimation(200);
  const fadeNote    = useFadeInAnimation(300);
  const fadeButton  = useFadeInAnimation(400);
  const iconScale   = useSuccessAnimation(200);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top colored glow */}
      <View
        style={[
          styles.topGradient,
          { backgroundColor: config.gradientColor },
        ]}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleNewScan}>
            <Text style={styles.backText}>{'\u2190'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{commonMessages.location}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.bellIcon}>{'\uD83D\uDD14'}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero: Icon + Title + Subtitle */}
        <Animated.View style={[styles.heroSection, fadeHero]}>
          <Animated.View
            style={[
              styles.heroIconContainer,
              {
                backgroundColor: config.iconBg,
                shadowColor: config.iconGlow,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: config.iconGlow === 'transparent' ? 0 : 0.4,
                shadowRadius: 24,
                elevation: config.iconGlow === 'transparent' ? 0 : 10,
              },
              iconScale,
            ]}
          >
            <Text style={styles.heroIconText}>{config.icon}</Text>
          </Animated.View>

          <Text style={styles.heroTitle}>{messages.title}</Text>
          <Text style={[styles.heroSubtitle, { color: config.subtitleColor }]}>
            {messages.subtitle}
          </Text>
        </Animated.View>

        {/* Plate */}
        {result.plate ? (
          <Animated.View style={[styles.plateSection, fadePlate]}>
            <Text style={styles.plateLabel}>PlateGuard Valeti</Text>
            <View
              style={[
                styles.plateWrapper,
                {
                  shadowColor: config.plateGlow,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: config.plateGlow === 'transparent' ? 0 : 0.5,
                  shadowRadius: 16,
                  elevation: config.plateGlow === 'transparent' ? 0 : 8,
                  borderWidth: config.plateBorderColor === 'transparent' ? 0 : 2,
                  borderColor: config.plateBorderColor,
                },
              ]}
            >
              <BrazilianPlate plate={result.plate} size="lg" />
            </View>
          </Animated.View>
        ) : null}

        {/* Details Card */}
        {detailRows.length > 0 && (
          <Animated.View style={[styles.detailsCard, fadeDetails]}>
            {detailRows.map((row, index) => (
              <React.Fragment key={row.label + index.toString()}>
                {index > 0 && <View style={styles.separator} />}
                <View style={styles.detailRow}>
                  <View
                    style={[
                      styles.detailIconWrapper,
                      { backgroundColor: row.iconBg },
                    ]}
                  >
                    <Text style={styles.detailIconText}>{row.icon}</Text>
                  </View>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>{row.label}</Text>
                    <Text
                      style={[
                        styles.detailValue,
                        row.valueColor ? { color: row.valueColor } : undefined,
                      ]}
                    >
                      {row.value}
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            ))}
          </Animated.View>
        )}

        {/* Note Box */}
        {config.noteConfig && (
          <Animated.View
            style={[
              styles.noteBox,
              {
                backgroundColor: config.noteConfig.bg,
                borderColor: config.noteConfig.border,
              },
              fadeNote,
            ]}
          >
            <View
              style={[
                styles.noteIconWrapper,
                { backgroundColor: config.noteConfig.iconBg },
              ]}
            >
              <Text
                style={[
                  styles.noteIcon,
                  { color: config.noteConfig.iconColor },
                ]}
              >
                {'\u2139'}
              </Text>
            </View>
            <Text
              style={[
                styles.noteText,
                { color: config.noteConfig.textColor },
              ]}
            >
              {config.noteConfig.text}
            </Text>
          </Animated.View>
        )}

        {/* CTA Buttons */}
        <Animated.View style={[styles.ctaSection, fadeButton]}>
          <TouchableOpacity style={styles.ctaButton} onPress={handleNewScan}>
            <Text style={styles.ctaIcon}>{'\uD83D\uDD0D'}</Text>
            <Text style={styles.ctaButtonText}>{commonMessages.newScan}</Text>
          </TouchableOpacity>

          {config.showSecondaryButton && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleNewScan}
            >
              <Text style={styles.secondaryButtonText}>
                Solicitar Cadastro
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>

      {/* Bottom Navigation (static) */}
      <View style={styles.bottomNav}>
        <View style={styles.navTab}>
          <Text style={[styles.navIcon, styles.navIconActive]}>{'\uD83D\uDCF7'}</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>
            {commonMessages.tabs.scanner}
          </Text>
        </View>
        <View style={styles.navTab}>
          <Text style={styles.navIcon}>{'\uD83D\uDE97'}</Text>
          <Text style={styles.navLabel}>{commonMessages.tabs.vehicles}</Text>
        </View>
        <View style={styles.navTab}>
          <Text style={styles.navIcon}>{'\uD83D\uDC64'}</Text>
          <Text style={styles.navLabel}>{commonMessages.tabs.profile}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
