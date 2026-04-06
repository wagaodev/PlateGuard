import { colors } from '../../theme/tokens';
import { FeedbackType } from '../../types/vehicleAccess.types';

// ─── Visual configuration per feedback state ─────────────────────────
// Only ALLOWED, DENIED, NOT_FOUND reach the Feedback screen.
// SERVER_ERROR and INVALID_PLATE are intercepted by the error handler
// in useScanPlate and shown as alerts — they never navigate here.

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

interface NoteConfig {
  bg: string;
  border: string;
  iconBg: string;
  iconColor: string;
  textColor: string;
  text: string;
}

// Semantic accent colors derived from tokens
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
      text: 'Leitura processada pelo Sentinel Core Engine v4.2. O portão foi aberto automaticamente para o veículo identificado.',
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
      text: 'Tentativa registrada e notificação enviada para a central de monitoramento em tempo real.',
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
      text: 'Este veículo não possui registro em nossa base. Por favor, entre em contato com a administração para orientações.',
    },
    showSecondaryButton: true,
    gradientColor: colors.primaryContainer,
  },
};

export function getStateConfig(feedbackType: FeedbackType): StateConfig {
  const config = feedbackStateConfigs[feedbackType as keyof typeof feedbackStateConfigs];
  if (!config) {
    // Fallback defensivo — não deveria chegar aqui
    return feedbackStateConfigs.NOT_FOUND;
  }
  return config;
}

// ─── Detail rows ─────────────────────────────────────────────────────

export interface DetailRowData {
  icon: string;
  iconBg: string;
  label: string;
  value: string;
  valueColor?: string;
}

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

export function buildDetailRows(
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
      result.ownerName ? { icon: '👤', iconBg: accents.success.iconBg, label: 'Nome', value: result.ownerName } : null,
      result.accessType ? { icon: '🎫', iconBg: accents.success.iconBg, label: 'Tipo', value: ACCESS_TYPE_LABELS[result.accessType] ?? result.accessType } : null,
      result.vehicleModel ? { icon: '🚗', iconBg: accents.success.iconBg, label: 'Veículo', value: result.vehicleModel } : null,
      { icon: '📅', iconBg: accents.success.iconBg, label: 'Data', value: `${date} às ${time}` },
    ].filter(Boolean) as DetailRowData[];
  }

  if (feedbackType === 'DENIED') {
    return [
      { icon: '🔑', iconBg: accents.error.iconBg, label: 'Placa', value: result.plate },
      { icon: '⚠️', iconBg: accents.error.iconBg, label: 'Motivo', value: result.reason ?? 'Veículo bloqueado', valueColor: colors.error },
      { icon: '📅', iconBg: accents.error.iconBg, label: 'Registrado em', value: `${date}, ${time}` },
    ];
  }

  if (feedbackType === 'NOT_FOUND') {
    return [
      { icon: '🔍', iconBg: accents.info.iconBg, label: 'Placa lida', value: result.plate },
      { icon: 'ℹ️', iconBg: accents.info.iconBg, label: 'Situação', value: 'Não cadastrado', valueColor: colors.warning },
    ];
  }

  return [];
}
