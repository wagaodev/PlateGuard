// src/theme/tokens.ts — VERSÃO FINAL (LAYOUT.md prevalece sobre CLAUDE.md)

export const colors = {
  // ─── Superfícies (sistema de camadas — sem bordas entre elas) ───
  surface:              '#0e1322',  // camada base — fundo de todas as telas
  surfaceContainerLow:  '#161b2b',  // sidebar, navegação secundária
  surfaceContainer:     '#1a1f2f',  // cards de conteúdo principal
  surfaceContainerHigh: '#25293a',  // modais, estados ativos, plate monitor
  surfaceDim:           '#0a0e1a',  // fundo do app inteiro (mais escuro que surface)

  // ─── Primary — Azul Elétrico ─────────────────────────────────────
  primary:          '#adc6ff',  // ação principal, destaques críticos
  primaryContainer: '#4d8eff',  // gradiente do botão CTA, glow
  primaryMuted:     'rgba(173, 198, 255, 0.08)',
  primaryBorder:    'rgba(173, 198, 255, 0.15)',
  primaryGlow:      'rgba(77, 142, 255, 0.25)',

  // ─── Semantic ────────────────────────────────────────────────────
  success:      '#4ae176',   // texto de chip "Acesso Liberado"
  successBg:    '#00a74b',   // fundo de chip "Acesso Liberado"
  successGlow:  'rgba(74, 225, 118, 0.2)',

  error:        '#ffb4ab',   // texto de chip "Bloqueado"
  errorBg:      '#93000a',   // fundo de chip "Bloqueado"
  errorGlow:    'rgba(255, 180, 171, 0.2)',

  warning:      '#ffd97a',
  warningBg:    '#7a4f00',

  // ─── Texto ───────────────────────────────────────────────────────
  onSurface:    '#dee1f7',  // texto primário (NUNCA usar #FFFFFF)
  textSecondary:'#8A8FA8',  // metadados, labels, subtítulos
  textMuted:    '#5a5f72',  // texto desabilitado
  textPlate:    '#dee1f7',  // texto da placa — Space Grotesk

  // ─── Bordas (Ghost Border) ───────────────────────────────────────
  ghostBorder:  'rgba(66, 71, 84, 0.15)',  // outline-variant @ 15%
  outlineVariant: '#424754',

  // ─── Glass (para elementos flutuantes) ──────────────────────────
  glassBg:      'rgba(37, 41, 58, 0.75)',  // surface-container-high semi-transparente
  glassBorder:  'rgba(66, 71, 84, 0.2)',

  // ─── Misc ───────────────────────────────────────────────────────
  white:    '#FFFFFF',  // usar APENAS em ícones sobre fundo primário
  black:    '#000000',
} as const;

export const shadows = {
  ambientFloat: {
    shadowColor:   '#4d8eff',
    shadowOffset:  { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius:  40,
    elevation:     12,
  },
  primaryButtonGlow: {
    shadowColor:   '#adc6ff',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius:  16,
    elevation:     8,
  },
  alertGlow: {
    shadowColor:   '#4d8eff',
    shadowOffset:  { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius:  40,
    elevation:     10,
  },
} as const;

export const radii = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  full: 9999,
} as const;

export const spacing = {
  listItemGap:  8,
  sectionGap:   16,
  xs:    4,
  sm:    8,
  md:    16,
  lg:    24,
  xl:    32,
  xxl:   48,
} as const;

export const typography = {
  fontDisplay: 'SpaceGrotesk',
  fontBody:    'Manrope',

  sizeDisplayLg: 56,
  sizeHeadlineLg: 32,
  sizeHeadlineMd: 24,
  sizeHeadlineSm: 20,
  sizeTitleLg:    18,
  sizeTitleMd:    16,
  sizeTitleSm:    14,
  sizeBodyLg:     16,
  sizeBodyMd:     14,
  sizeBodySm:     12,
  sizeLabelMd:    12,
  sizeLabelSm:    11,

  weightRegular:  '400' as const,
  weightMedium:   '500' as const,
  weightSemiBold: '600' as const,
  weightBold:     '700' as const,

  plateSize:       32,
  plateWeight:     '700' as const,
  plateSpacing:    4,
  plateFont:       'SpaceGrotesk',
} as const;

export const animation = {
  durationFast:   150,
  durationNormal: 250,
  durationSlow:   400,
  durationXSlow:  600,
  easingSpring:   { damping: 18, stiffness: 200 },
  easingBounce:   { damping: 12, stiffness: 180 },
} as const;

export type Colors     = typeof colors;
export type Shadows    = typeof shadows;
export type Radii      = typeof radii;
export type Spacing    = typeof spacing;
export type Typography = typeof typography;
export type Animation  = typeof animation;
