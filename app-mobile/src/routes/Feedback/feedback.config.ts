import { colors } from '../../theme/tokens';
import { FeedbackType } from '../../types/vehicleAccess.types';

// ─── Per-state visual configuration ────────────────────────────────
export interface StateConfig {
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

export const stateConfigs: Record<FeedbackType, StateConfig> = {
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
      text: 'Leitura processada pelo Sentinel Core Engine v4.2. O port\u00e3o foi aberto automaticamente para o ve\u00edculo identificado.',
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
      text: 'Tentativa registrada e notifica\u00e7\u00e3o enviada para a central de monitoramento em tempo real.',
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
      text: 'Este ve\u00edculo n\u00e3o possui registro em nossa base. Por favor, entre em contato com a administra\u00e7\u00e3o para orienta\u00e7\u00f5es.',
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
      text: 'A placa n\u00e3o p\u00f4de ser identificada. Tente novamente com melhor ilumina\u00e7\u00e3o ou insira manualmente.',
    },
    showSecondaryButton: false,
    gradientColor: colors.textSecondary,
  },
  SERVER_ERROR: {
    iconBg: colors.surfaceContainerHigh,
    iconGlow: 'transparent',
    icon: '\u21af',
    subtitleColor: colors.textSecondary,
    plateGlow: 'transparent',
    plateBorderColor: 'transparent',
    noteConfig: {
      bg: 'rgba(138, 143, 168, 0.06)',
      border: 'rgba(138, 143, 168, 0.15)',
      iconBg: colors.surfaceContainerHigh,
      iconColor: colors.textSecondary,
      textColor: colors.textSecondary,
      text: 'N\u00e3o foi poss\u00edvel conectar ao servidor. Verifique sua conex\u00e3o e tente novamente.',
    },
    showSecondaryButton: false,
    gradientColor: colors.textSecondary,
  },
};

// ─── Detail row data ───────────────────────────────────────────────
export interface DetailRowData {
  icon: string;
  iconBg: string;
  label: string;
  value: string;
  valueColor?: string;
}

export function formatAccessType(type: string): string {
  const map: Record<string, string> = {
    resident: 'Mensalista Permanente',
    visitor: 'Visitante',
    blocked: 'Bloqueado',
  };
  return map[type] ?? type;
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
          ? { icon: '\uD83D\uDE97', iconBg: 'rgba(74, 225, 118, 0.12)', label: 'Ve\u00edculo', value: result.vehicleModel }
          : null,
        { icon: '\uD83D\uDCC5', iconBg: 'rgba(74, 225, 118, 0.12)', label: 'Data', value: `${dateStr} \u00e0s ${timeStr}` },
      ].filter(Boolean) as DetailRowData[];

    case 'DENIED':
      return [
        { icon: '\uD83D\uDD11', iconBg: 'rgba(255, 180, 171, 0.12)', label: 'Placa', value: result.plate },
        result.reason
          ? { icon: '\u26A0\uFE0F', iconBg: 'rgba(255, 180, 171, 0.12)', label: 'Motivo', value: result.reason, valueColor: colors.error }
          : { icon: '\u26A0\uFE0F', iconBg: 'rgba(255, 180, 171, 0.12)', label: 'Motivo', value: 'Ve\u00edculo bloqueado', valueColor: colors.error },
        { icon: '\uD83D\uDCC5', iconBg: 'rgba(255, 180, 171, 0.12)', label: 'Registrado em', value: `${dateStr}, ${timeStr}` },
      ];

    case 'NOT_FOUND':
      return [
        { icon: '\uD83D\uDD0D', iconBg: 'rgba(173, 198, 255, 0.12)', label: 'Placa lida', value: result.plate },
        { icon: '\u2139\uFE0F', iconBg: 'rgba(173, 198, 255, 0.12)', label: 'Situa\u00e7\u00e3o', value: 'N\u00e3o cadastrado', valueColor: colors.warning },
      ];

    case 'INVALID_PLATE':
      return [
        { icon: '\u26A0\uFE0F', iconBg: 'rgba(138, 143, 168, 0.12)', label: 'Situa\u00e7\u00e3o', value: 'Leitura inv\u00e1lida' },
      ];

    case 'SERVER_ERROR':
      return [
        { icon: '\u26A0\uFE0F', iconBg: 'rgba(138, 143, 168, 0.12)', label: 'Situa\u00e7\u00e3o', value: 'Erro no servidor' },
        { icon: '\uD83D\uDCC5', iconBg: 'rgba(138, 143, 168, 0.12)', label: 'Hor\u00e1rio', value: `${dateStr}, ${timeStr}` },
      ];

    default:
      return [];
  }
}
