import { commonMessages } from '../../locales/pt-BR/common';

// ─── Color name → hex mapping for vehicle colors ─────────────────
export const COLOR_MAP: Record<string, string> = {
  preta: '#1a1a1a',
  preto: '#1a1a1a',
  prato: '#1a1a1a',
  cinza: '#5a5a5a',
  vermelha: '#c0392b',
  vermelho: '#c0392b',
  azul: '#2980b9',
  marrom: '#8b4513',
  verde: '#27ae60',
  branca: '#f0f0f0',
  branco: '#f0f0f0',
  prata: '#c0c0c0',
  amarela: '#f1c40f',
  amarelo: '#f1c40f',
  bege: '#d4a574',
};

// ─── Color dot options for the selector ──────────────────────────
export const VEHICLE_COLOR_DOTS = [
  { name: 'preta', hex: '#1a1a1a' },
  { name: 'cinza', hex: '#5a5a5a' },
  { name: 'vermelha', hex: '#c0392b' },
  { name: 'azul', hex: '#2980b9' },
  { name: 'marrom', hex: '#8b4513' },
  { name: 'verde', hex: '#27ae60' },
] as const;

// ─── Vehicle type options for the segmented control ──────────────
export const VEHICLE_TYPES = [
  { key: 'car', icon: '\uD83D\uDE97', label: commonMessages.vehicle.car },
  { key: 'motorcycle', icon: '\uD83C\uDFCD\uFE0F', label: commonMessages.vehicle.motorcycle },
  { key: 'truck', icon: '\uD83D\uDE90', label: commonMessages.vehicle.truck },
] as const;

// ─── Resolve a color name (from DETRAN lookup) to hex ────────────
export function resolveActiveColor(colorName: string): string | null {
  const normalized = colorName.toLowerCase().trim();
  for (const [key, hex] of Object.entries(COLOR_MAP)) {
    if (normalized.includes(key)) return hex;
  }
  return null;
}

// ─── Resolve vehicle type from model (stub for future OCR) ──────
export function resolveVehicleType(_model: string): string {
  return 'car';
}
