import { commonMessages } from '../../locales/pt-BR/common';

// ─── Status badge configuration ──────────────────────────────────

export interface StatusBadgeConfig {
  label: string;
  styleKey: 'statusAllowed' | 'statusDenied' | 'statusPending';
}

const STATUS_CONFIG: Record<string, StatusBadgeConfig> = {
  ALLOWED: { label: commonMessages.status.allowed, styleKey: 'statusAllowed' },
  DENIED:  { label: commonMessages.status.denied, styleKey: 'statusDenied' },
  PENDING: { label: commonMessages.status.pending, styleKey: 'statusPending' },
};

const DEFAULT_STATUS_CONFIG: StatusBadgeConfig = {
  label: commonMessages.status.pending,
  styleKey: 'statusPending',
};

export function getStatusBadgeConfig(status: string): StatusBadgeConfig {
  return STATUS_CONFIG[status] ?? DEFAULT_STATUS_CONFIG;
}
