import { useCallback, useMemo } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';
import { useVehicleAccessStore } from '../../store/vehicleAccessStore';
import { vehicleAccessMessages } from '../../locales/pt-BR/vehicleAccess';
import { colors } from '../../theme/tokens';
import { FeedbackType } from '../../types/vehicleAccess.types';

// ─── Types ───────────────────────────────────────────────────────

interface NoteConfig {
  bg: string;
  border: string;
  iconBg: string;
  iconColor: string;
  textColor: string;
  text: string;
}

export interface StateConfig {
  iconBg: string;
  iconGlow: string;
  icon: string;
  accentColor: string;
  plateGlow: string;
  plateBorderColor: string;
  noteConfig: NoteConfig;
  showSecondaryButton: boolean;
  gradientColor: string;
}

export interface DetailRowData {
  icon: string;
  iconBg: string;
  label: string;
  value: string;
  valueColor?: string;
}

// ─── Semantic accent colors derived from tokens ──────────────────

const accents = {
  success: {
    bg: 'rgba(74, 225, 118, 0.06)',
    border: 'rgba(74, 225, 118, 0.15)',
    iconBg: 'rgba(74, 225, 118, 0.12)',
  },
  error: {
    bg: 'rgba(255, 180, 171, 0.06)',
    border: 'rgba(255, 180, 171, 0.15)',
    iconBg: 'rgba(255, 180, 171, 0.12)',
  },
  warning: {
    bg: 'rgba(245, 158, 11, 0.06)',
    border: 'rgba(245, 158, 11, 0.15)',
  },
  info: {
    bg: 'rgba(173, 198, 255, 0.06)',
    border: 'rgba(173, 198, 255, 0.15)',
    iconBg: 'rgba(173, 198, 255, 0.12)',
  },
} as const;

// ─── State config per feedback type ──────────────────────────────

const feedbackStateConfigs: Record<'ALLOWED' | 'DENIED' | 'NOT_FOUND', StateConfig> = {
  ALLOWED: {
    iconBg: colors.success,
    iconGlow: colors.successGlow,
    icon: '\u2713',
    accentColor: colors.success,
    plateGlow: 'transparent',
    plateBorderColor: 'transparent',
    noteConfig: {
      bg: accents.success.bg,
      border: accents.success.border,
      iconBg: colors.success,
      iconColor: colors.white,
      textColor: colors.textSecondary,
      text: 'Leitura processada pelo Sentinel Core Engine v4.2. O port\u00e3o foi aberto automaticamente para o ve\u00edculo identificado.',
    },
    showSecondaryButton: false,
    gradientColor: colors.success,
  },
  DENIED: {
    iconBg: colors.warningBg,
    iconGlow: 'rgba(245, 158, 11, 0.3)',
    icon: '!',
    accentColor: colors.error,
    plateGlow: colors.errorGlow,
    plateBorderColor: 'rgba(239, 68, 68, 0.4)',
    noteConfig: {
      bg: accents.warning.bg,
      border: accents.warning.border,
      iconBg: colors.warningBg,
      iconColor: colors.warning,
      textColor: colors.textSecondary,
      text: 'Tentativa registrada e notifica\u00e7\u00e3o enviada para a central de monitoramento em tempo real.',
    },
    showSecondaryButton: false,
    gradientColor: colors.error,
  },
  NOT_FOUND: {
    iconBg: colors.primaryContainer,
    iconGlow: colors.primaryGlow,
    icon: '?',
    accentColor: colors.primaryContainer,
    plateGlow: 'transparent',
    plateBorderColor: 'transparent',
    noteConfig: {
      bg: accents.info.bg,
      border: accents.info.border,
      iconBg: colors.primaryContainer,
      iconColor: colors.white,
      textColor: colors.textSecondary,
      text: 'Este ve\u00edculo n\u00e3o possui registro em nossa base. Por favor, entre em contato com a administra\u00e7\u00e3o para orienta\u00e7\u00f5es.',
    },
    showSecondaryButton: true,
    gradientColor: colors.primaryContainer,
  },
};

function getStateConfig(feedbackType: FeedbackType): StateConfig {
  const config = feedbackStateConfigs[feedbackType as keyof typeof feedbackStateConfigs];
  if (!config) {
    return feedbackStateConfigs.NOT_FOUND;
  }
  return config;
}

// ─── Detail rows builder ─────────────────────────────────────────

const ACCESS_TYPE_LABELS: Record<string, string> = {
  resident: 'Mensalista Permanente',
  visitor: 'Visitante',
  blocked: 'Bloqueado',
};

function formatTimestamp(): { date: string; time: string } {
  const now = new Date();
  return {
    date: now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  };
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
  const { date, time } = formatTimestamp();

  if (feedbackType === 'ALLOWED') {
    return [
      result.ownerName ? { icon: '\uD83D\uDC64', iconBg: accents.success.iconBg, label: 'Nome', value: result.ownerName } : null,
      result.accessType ? { icon: '\uD83C\uDFAB', iconBg: accents.success.iconBg, label: 'Tipo', value: ACCESS_TYPE_LABELS[result.accessType] ?? result.accessType } : null,
      result.vehicleModel ? { icon: '\uD83D\uDE97', iconBg: accents.success.iconBg, label: 'Ve\u00edculo', value: result.vehicleModel } : null,
      { icon: '\uD83D\uDCC5', iconBg: accents.success.iconBg, label: 'Data', value: `${date} \u00e0s ${time}` },
    ].filter(Boolean) as DetailRowData[];
  }

  if (feedbackType === 'DENIED') {
    return [
      { icon: '\uD83D\uDD11', iconBg: accents.error.iconBg, label: 'Placa', value: result.plate },
      { icon: '\u26A0\uFE0F', iconBg: accents.error.iconBg, label: 'Motivo', value: result.reason ?? 'Ve\u00edculo bloqueado', valueColor: colors.error },
      { icon: '\uD83D\uDCC5', iconBg: accents.error.iconBg, label: 'Registrado em', value: `${date}, ${time}` },
    ];
  }

  if (feedbackType === 'NOT_FOUND') {
    return [
      { icon: '\uD83D\uDD0D', iconBg: accents.info.iconBg, label: 'Placa lida', value: result.plate },
      { icon: '\u2139\uFE0F', iconBg: accents.info.iconBg, label: 'Situa\u00e7\u00e3o', value: 'N\u00e3o cadastrado', valueColor: colors.warning },
    ];
  }

  return [];
}

// ─── Hook ────────────────────────────────────────────────────────

type FeedbackRoute = RouteProp<RootStackParamList, 'Feedback'>;
type Nav = NativeStackNavigationProp<RootStackParamList>;

interface FeedbackMessages {
  readonly title: string;
  readonly subtitle: string;
}

interface UseFeedbackReturn {
  result: RootStackParamList['Feedback']['result'];
  config: StateConfig;
  detailRows: DetailRowData[];
  messages: FeedbackMessages;
  handleNewScan: () => void;
}

export function useFeedback(): UseFeedbackReturn {
  const navigation = useNavigation<Nav>();
  const route = useRoute<FeedbackRoute>();
  const { reset } = useVehicleAccessStore();
  const { result } = route.params;

  const { feedbackType } = result;

  const config = getStateConfig(feedbackType);

  const messages = vehicleAccessMessages[feedbackType];

  const detailRows = useMemo(
    () => buildDetailRows(feedbackType, result),
    [feedbackType, result],
  );

  const handleNewScan = useCallback(() => {
    reset();
    navigation.navigate('BottomTabs');
  }, [navigation, reset]);

  return {
    result,
    config,
    detailRows,
    messages,
    handleNewScan,
  };
}
