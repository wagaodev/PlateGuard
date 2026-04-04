# CLAUDE.md — Diretivas do Projeto PlateGuard

> Este arquivo é o contrato de trabalho entre o Claude Code e o projeto.
> Leia integralmente antes de escrever qualquer linha de código.
> Não desvie das decisões arquiteturais documentadas aqui sem aprovação explícita.

---

## Visão Geral do Projeto

**Nome:** PlateGuard
**Tipo:** POC (Proof of Concept) com arquitetura profissional e escalável
**Objetivo:** Aplicativo mobile que aponta a câmera para uma placa veicular (OCR on-device) ou lê um QR Code, envia a placa para um backend NestJS e exibe feedback visual de entrada liberada ou negada. Inclui perfil de usuário e cadastro de veículos.

**Idioma do código:** Inglês (variáveis, funções, pastas, arquivos, comentários em código)
**Idioma da documentação:** Português (README, docs, comentários explicativos, mensagens de commit)

**Inspiração visual:** Paleta da Valeti (empresa brasileira de gestão de estacionamento/valet) adaptada para dark mobile UI com glassmorphism.

---

## Regras Absolutas — Não Negociáveis

1. **Nunca** usar Expo. O projeto mobile usa React Native CLI puro.
2. **Nunca** criar lógica de negócio dentro de componentes de UI. Toda lógica vai em hooks.
3. **Nunca** chamar API diretamente de dentro de uma screen ou componente. Sempre via camada de serviço + React Query.
4. **Nunca** usar `any` em TypeScript. Se necessário, usar `unknown` com narrowing explícito.
5. **Nunca** usar `useEffect` para busca de dados. Usar React Query (`useMutation` / `useQuery`).
6. **Nunca** colocar regra de negócio no Controller do NestJS. Controller recebe, delega, responde.
7. **Nunca** usar `synchronize: true` em produção. Migrações via Prisma migrate.
8. **Nunca** commitar `.env`. Apenas `.env.example` vai para o repositório.
9. **Nunca** duplicar tipos entre backend e mobile. Cada lado define seus próprios tipos alinhados pelo contrato da API.
10. **Sempre** tratar todos os estados possíveis: loading, success, error, empty.
11. **Nunca** usar valores de cor, espaçamento ou tipografia hardcoded. Sempre consumir via `theme` e `tokens`.
12. **Nunca** usar `StyleSheet.create` com valores mágicos. Sempre referenciar `theme.colors`, `theme.spacing`, `theme.radii`.
13. **Sempre** usar `react-native-reanimated` para animações. Nunca usar `Animated` da RN padrão.

---

## Estrutura do Monorepo

```
plate-guard/
├── plate-guard-api/          # Backend NestJS
├── plate-guard-app/          # Mobile React Native
├── docs/
│   ├── architecture.md
│   ├── api-contract.md
│   ├── decisions.md
│   └── roadmap.md
├── README.md
└── CLAUDE.md                 # Este arquivo
```

---

## PARTE 1 — DESIGN SYSTEM

> Esta é a primeira coisa a ser implementada no mobile.
> Nenhuma tela deve ser criada antes do design system estar completo.

### 1.1 Tokens de Design

Criar `src/theme/tokens.ts`:

```typescript
// src/theme/tokens.ts
// Paleta inspirada na Valeti — adaptada para mobile dark UI com glassmorphism

export const colors = {
  // ─── Backgrounds ───────────────────────────────────────────────
  bgPrimary:       '#0C111D',   // fundo base de todas as telas
  bgCard:          '#101828',   // fundo de cards secundários
  bgElevated:      '#182230',   // fundo de elementos elevados

  // ─── Accent / Primary ──────────────────────────────────────────
  primary:         '#FF4B00',
  primaryVariant:  '#FC4B05',
  primaryMuted:    'rgba(255, 75, 0, 0.08)',
  primaryBorder:   'rgba(255, 75, 0, 0.3)',
  primaryGlow:     'rgba(255, 75, 0, 0.2)',

  // ─── Semantic ──────────────────────────────────────────────────
  success:         '#22C55E',
  successMuted:    'rgba(34, 197, 94, 0.08)',
  successBorder:   'rgba(34, 197, 94, 0.3)',
  successGlow:     'rgba(34, 197, 94, 0.2)',

  danger:          '#EF4444',
  dangerMuted:     'rgba(239, 68, 68, 0.08)',
  dangerBorder:    'rgba(239, 68, 68, 0.3)',
  dangerGlow:      'rgba(239, 68, 68, 0.2)',

  warning:         '#F59E0B',
  warningMuted:    'rgba(245, 158, 11, 0.08)',
  warningBorder:   'rgba(245, 158, 11, 0.3)',

  neutral:         '#64748B',

  // ─── Text ──────────────────────────────────────────────────────
  textPrimary:     '#FCFCFD',
  textSecondary:   '#667085',
  textMuted:       '#98A2B3',
  textDisabled:    '#475467',

  // ─── Borders ───────────────────────────────────────────────────
  borderSubtle:    'rgba(255, 255, 255, 0.06)',
  borderMedium:    'rgba(255, 255, 255, 0.10)',
  borderStrong:    'rgba(255, 255, 255, 0.16)',
  borderDark:      '#344054',

  // ─── Glass ─────────────────────────────────────────────────────
  glassBg:         'rgba(255, 255, 255, 0.04)',
  glassBgMd:       'rgba(255, 255, 255, 0.07)',
  glassBorder:     'rgba(255, 255, 255, 0.08)',
  glassBorderMd:   'rgba(255, 255, 255, 0.12)',

  // ─── Overlay ───────────────────────────────────────────────────
  overlay:         'rgba(12, 17, 29, 0.85)',
  overlayLight:    'rgba(12, 17, 29, 0.5)',

  // ─── Misc ──────────────────────────────────────────────────────
  white:           '#FFFFFF',
  whiteSoft:       '#FCFCFD',
  black:           '#000000',
} as const

export const shadows = {
  primaryGlow:   '0 0 20px rgba(255, 75, 0, 0.35), 0 4px 12px rgba(255, 75, 0, 0.2)',
  primaryGlowSm: '0 0 10px rgba(255, 75, 0, 0.25)',
  successGlow:   '0 0 24px rgba(34, 197, 94, 0.4), 0 0 48px rgba(34, 197, 94, 0.15)',
  dangerGlow:    '0 0 24px rgba(239, 68, 68, 0.4), 0 0 48px rgba(239, 68, 68, 0.15)',
  warningGlow:   '0 0 20px rgba(245, 158, 11, 0.35)',
  card:          '0 8px 32px rgba(0, 0, 0, 0.45)',
  cardSm:        '0 4px 16px rgba(0, 0, 0, 0.3)',
} as const

export const radii = {
  xs:   4,
  sm:   8,
  md:   14,
  lg:   20,
  xl:   24,
  xxl:  32,
  full: 9999,
} as const

export const spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
} as const

export const typography = {
  fontHeading: 'Ubuntu',
  fontBody:    'Inter',

  sizeXs:  11,
  sizeSm:  13,
  sizeMd:  15,
  sizeLg:  17,
  sizeXl:  20,
  sizeXxl: 24,
  sizeH2:  28,
  sizeH1:  32,

  weightRegular:  '400' as const,
  weightMedium:   '500' as const,
  weightSemiBold: '600' as const,
  weightBold:     '700' as const,

  // Estilo especial para exibição de placa
  plateSize:    22,
  plateWeight:  '700' as const,
  plateSpacing: 3,
} as const

export const animation = {
  durationFast:   150,
  durationNormal: 250,
  durationSlow:   400,
  durationXSlow:  600,
  easingSpring:   { damping: 18, stiffness: 200 },
  easingBounce:   { damping: 12, stiffness: 180 },
} as const

export type Colors     = typeof colors
export type Shadows    = typeof shadows
export type Radii      = typeof radii
export type Spacing    = typeof spacing
export type Typography = typeof typography
export type Animation  = typeof animation
```

### 1.2 Objeto de Tema

Criar `src/theme/theme.ts`:

```typescript
import { colors, shadows, radii, spacing, typography, animation } from './tokens'

export const theme = { colors, shadows, radii, spacing, typography, animation } as const

export type Theme = typeof theme
```

### 1.3 Hook de Tema

Criar `src/theme/useTheme.ts`:

```typescript
import { theme, Theme } from './theme'

export function useTheme(): Theme {
  return theme
}
```

### 1.4 Barrel de Exportação

Criar `src/theme/index.ts`:

```typescript
export { theme }       from './theme'
export { useTheme }    from './useTheme'
export * from './tokens'
export * from './glass'
export type { Theme }  from './theme'
```

### 1.5 Helpers de Glassmorphism

Criar `src/theme/glass.ts`. Glassmorphism é o estilo visual padrão de TODOS os cards e painéis:

```typescript
// src/theme/glass.ts

import { ViewStyle } from 'react-native'
import { colors, radii } from './tokens'

export const glassCard: ViewStyle = {
  backgroundColor: colors.glassBg,
  borderRadius:    radii.lg,
  borderWidth:     1,
  borderColor:     colors.glassBorder,
  shadowColor:     '#000',
  shadowOffset:    { width: 0, height: 8 },
  shadowOpacity:   0.45,
  shadowRadius:    24,
  elevation:       8,
}

export const glassCardMd: ViewStyle = {
  ...glassCard,
  backgroundColor: colors.glassBgMd,
  borderColor:     colors.glassBorderMd,
}

export const glassCardSuccess: ViewStyle = {
  ...glassCard,
  backgroundColor: colors.successMuted,
  borderColor:     colors.successBorder,
}

export const glassCardDanger: ViewStyle = {
  ...glassCard,
  backgroundColor: colors.dangerMuted,
  borderColor:     colors.dangerBorder,
}

export const glassCardWarning: ViewStyle = {
  ...glassCard,
  backgroundColor: colors.warningMuted,
  borderColor:     colors.warningBorder,
}

export const glassHeader: ViewStyle = {
  backgroundColor:  colors.glassBg,
  borderBottomWidth: 1,
  borderBottomColor: colors.borderSubtle,
}

export const glassNavBar: ViewStyle = {
  backgroundColor: 'rgba(16, 24, 40, 0.92)',
  borderTopWidth:  1,
  borderTopColor:  colors.borderSubtle,
}
```

### 1.6 Componente GlassCard

Criar `src/components/GlassCard/index.tsx`:

```typescript
import React from 'react'
import { View, ViewStyle } from 'react-native'
import { glassCard, glassCardSuccess, glassCardDanger, glassCardWarning } from '../../theme/glass'
import { spacing } from '../../theme/tokens'

type Variant = 'default' | 'md' | 'success' | 'danger' | 'warning'

interface GlassCardProps {
  children: React.ReactNode
  style?:   ViewStyle
  variant?: Variant
  padding?: number
}

const variantMap: Record<Variant, ViewStyle> = {
  default: glassCard,
  md:      glassCard,
  success: glassCardSuccess,
  danger:  glassCardDanger,
  warning: glassCardWarning,
}

export function GlassCard({ children, style, variant = 'default', padding = spacing.lg }: GlassCardProps) {
  return (
    <View style={[variantMap[variant], { padding }, style]}>
      {children}
    </View>
  )
}
```

### 1.7 Componente BrazilianPlate

Criar `src/components/BrazilianPlate/index.tsx`. Renderiza visualmente uma placa brasileira Mercosul. Usado em todas as telas de feedback, perfil e cadastro:

```typescript
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { radii, typography } from '../../theme/tokens'

type PlateSize = 'sm' | 'md' | 'lg'

interface BrazilianPlateProps {
  plate: string
  size?: PlateSize
}

const sizes = {
  sm: { width: 120, height: 48,  fontSize: 16, strip: 14, padding: 4  },
  md: { width: 180, height: 68,  fontSize: 22, strip: 18, padding: 6  },
  lg: { width: 240, height: 90,  fontSize: 28, strip: 22, padding: 8  },
}

export function BrazilianPlate({ plate, size = 'md' }: BrazilianPlateProps) {
  const s = sizes[size]
  const formatted = plate.length >= 7
    ? `${plate.slice(0, 3)} ${plate.slice(3)}`
    : plate

  return (
    <View style={[styles.container, { width: s.width, height: s.height, borderRadius: radii.sm }]}>
      <View style={[styles.mercosulBand, { width: s.strip }]} />
      <View style={styles.body}>
        <View style={[styles.topStrip, { height: s.strip }]}>
          <Text style={[styles.countryText, { fontSize: s.strip * 0.6 }]}>BRASIL</Text>
        </View>
        <View style={styles.plateBody}>
          <Text style={[styles.plateText, { fontSize: s.fontSize }]}>{formatted}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:    { flexDirection: 'row', overflow: 'hidden', borderWidth: 2, borderColor: '#1a1a2e', backgroundColor: '#FFFFFF' },
  mercosulBand: { backgroundColor: '#009B3A' },
  body:         { flex: 1, flexDirection: 'column' },
  topStrip:     { backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center' },
  countryText:  { color: '#FFFFFF', fontFamily: typography.fontBody, fontWeight: typography.weightBold, letterSpacing: 1 },
  plateBody:    { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  plateText:    { fontFamily: typography.fontBody, fontWeight: typography.weightBold, color: '#1a1a2e', letterSpacing: typography.plateSpacing },
})
```

---

## PARTE 2 — ANIMAÇÕES

> Todas as animações usam `react-native-reanimated` v3. Nunca usar `Animated` da RN padrão.

### 2.1 Setup

```bash
npm install react-native-reanimated react-native-gesture-handler
```

`babel.config.js` deve incluir `plugins: ['react-native-reanimated/plugin']` como **último plugin**.

### 2.2 Hooks de Animação

Criar em `src/hooks/animations/`:

**usePulseAnimation.ts** — dot de status pulsante:
```typescript
import { useEffect } from 'react'
import { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated'

export function usePulseAnimation(duration = 1000) {
  const opacity = useSharedValue(1)
  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.3, { duration, easing: Easing.inOut(Easing.ease) }), -1, true)
  }, [])
  return useAnimatedStyle(() => ({ opacity: opacity.value }))
}
```

**useScanLineAnimation.ts** — linha de scan do viewfinder:
```typescript
import { useEffect } from 'react'
import { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated'

export function useScanLineAnimation(containerHeight: number, duration = 2000) {
  const translateY = useSharedValue(0)
  useEffect(() => {
    translateY.value = withRepeat(withTiming(containerHeight, { duration, easing: Easing.linear }), -1, false)
  }, [containerHeight])
  return useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }))
}
```

**useFadeInAnimation.ts** — entrada suave de elementos:
```typescript
import { useEffect } from 'react'
import { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated'
import { animation } from '../../theme/tokens'

export function useFadeInAnimation(delay = 0) {
  const opacity    = useSharedValue(0)
  const translateY = useSharedValue(20)
  useEffect(() => {
    opacity.value    = withDelay(delay, withTiming(1, { duration: animation.durationSlow }))
    translateY.value = withDelay(delay, withTiming(0, { duration: animation.durationSlow }))
  }, [])
  return useAnimatedStyle(() => ({ opacity: opacity.value, transform: [{ translateY: translateY.value }] }))
}
```

**useSuccessAnimation.ts** — scale bounce do ícone de resultado:
```typescript
import { useEffect } from 'react'
import { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated'
import { animation } from '../../theme/tokens'

export function useSuccessAnimation(delay = 200) {
  const scale = useSharedValue(0)
  useEffect(() => {
    scale.value = withDelay(delay, withSpring(1, animation.easingBounce))
  }, [])
  return useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }))
}
```

**usePulseRingAnimation.ts** — anéis concêntricos ao redor do viewfinder:
```typescript
import { useEffect } from 'react'
import { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withDelay, Easing } from 'react-native-reanimated'

export function usePulseRingAnimation(delay = 0, duration = 2000) {
  const scale   = useSharedValue(1)
  const opacity = useSharedValue(0.4)
  useEffect(() => {
    scale.value   = withDelay(delay, withRepeat(withTiming(1.15, { duration, easing: Easing.inOut(Easing.ease) }), -1, true))
    opacity.value = withDelay(delay, withRepeat(withTiming(0,    { duration, easing: Easing.inOut(Easing.ease) }), -1, true))
  }, [])
  return useAnimatedStyle(() => ({ transform: [{ scale: scale.value }], opacity: opacity.value }))
}
```

**index.ts** — barrel:
```typescript
export { usePulseAnimation }     from './usePulseAnimation'
export { useScanLineAnimation }  from './useScanLineAnimation'
export { useFadeInAnimation }    from './useFadeInAnimation'
export { useSuccessAnimation }   from './useSuccessAnimation'
export { usePulseRingAnimation } from './usePulseRingAnimation'
```

---

## PARTE 3 — BACKEND (plate-guard-api)

### Stack

| Tecnologia | Versão | Motivo |
|---|---|---|
| Node.js | 20.x | `.env` nativo, test runner nativo |
| NestJS | 10.x | Framework enterprise, DI nativa, Swagger |
| TypeScript | 5.x | Strict mode obrigatório |
| Prisma | 5.x | ORM com migrations e seed nativo |
| SQLite | — | Zero custo, embedded |
| Jest | 29.x | Testes |
| class-validator | latest | Validação de DTOs |
| class-transformer | latest | Transformação de payloads |
| @nestjs/swagger | latest | Documentação automática |
| @nestjs/throttler | latest | Rate limiting |
| Docker + Compose | — | Ambiente reproduzível |

### Estrutura de Pastas — Backend

```
plate-guard-api/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── shared/
│   │   ├── config/env.config.ts
│   │   ├── logger/logger.service.ts
│   │   └── filters/http-exception.filter.ts
│   └── modules/
│       ├── vehicle-access/
│       │   ├── vehicle-access.module.ts
│       │   ├── vehicle-access.controller.ts
│       │   ├── vehicle-access.service.ts
│       │   ├── vehicle-access.repository.ts
│       │   ├── mappers/vehicle-access.mapper.ts
│       │   └── dto/
│       │       ├── validate-plate.dto.ts
│       │       └── vehicle-access-response.dto.ts
│       ├── vehicles/
│       │   ├── vehicles.module.ts
│       │   ├── vehicles.controller.ts   # CRUD de veículos
│       │   ├── vehicles.service.ts
│       │   ├── vehicles.repository.ts
│       │   └── dto/
│       │       ├── create-vehicle.dto.ts
│       │       └── vehicle-response.dto.ts
│       ├── access-log/
│       │   ├── access-log.module.ts
│       │   ├── access-log.service.ts
│       │   └── access-log.repository.ts
│       └── health/
│           ├── health.module.ts
│           └── health.controller.ts
├── test/
│   ├── vehicle-access.service.spec.ts
│   └── vehicle-access.e2e.spec.ts
├── docker-compose.yml
├── Dockerfile
├── .env.example
└── README.md
```

### Schema Prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Vehicle {
  id            String      @id @default(uuid())
  plate         String      @unique
  ownerName     String
  vehicleType   String      @default("car")       // car | truck | motorcycle
  vehicleModel  String?
  vehicleColor  String?
  accessType    String      @default("resident")  // resident | visitor | blocked
  status        String                            // ALLOWED | DENIED | PENDING
  qrCodeToken   String?     @unique               // token para leitura QR Code
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  accessLogs    AccessLog[]
}

model AccessLog {
  id           String    @id @default(uuid())
  plate        String
  result       String                         // ALLOWED | DENIED | NOT_FOUND
  reason       String?
  entryMethod  String    @default("CAMERA")  // CAMERA | QR_CODE | MANUAL
  requestedAt  DateTime  @default(now())
  vehicle      Vehicle?  @relation(fields: [plate], references: [plate])
}
```

### Contrato da API

#### POST /vehicle-access/validate

```json
// Request
{ "plate": "BRA2E19", "entryMethod": "CAMERA" }

// 200 — ALLOWED
{
  "feedbackType": "ALLOWED",
  "allowed": true,
  "plate": "BRA2E19",
  "message": "Entrada liberada",
  "ownerName": "Wagner Barboza",
  "vehicleType": "car",
  "vehicleModel": "Honda Civic",
  "accessType": "resident"
}

// 403 — DENIED
{ "feedbackType": "DENIED", "allowed": false, "plate": "BRA2E19", "message": "Entrada negada", "reason": "Veículo não autorizado" }

// 404 — NOT_FOUND
{ "feedbackType": "NOT_FOUND", "allowed": false, "plate": "XYZ9999", "message": "Placa não encontrada" }

// 400 — INVALID_PLATE
{ "feedbackType": "INVALID_PLATE", "allowed": false, "message": "Formato de placa inválido" }

// 500 — SERVER_ERROR
{ "feedbackType": "SERVER_ERROR", "allowed": false, "message": "Erro interno. Tente novamente." }
```

#### POST /vehicle-access/validate-qr
```json
// Request
{ "token": "uuid-do-qr-code", "entryMethod": "QR_CODE" }
// Response — mesmo contrato do validate
```

#### POST /vehicles — cadastro de veículo
```json
{ "plate": "BRA2E19", "ownerName": "Wagner", "vehicleType": "car", "vehicleModel": "Honda Civic", "vehicleColor": "Prata", "accessType": "resident" }
```

#### GET /vehicles — lista todos
#### GET /vehicles/:plate — detalhe
#### GET /access-logs?plate=BRA2E19 — histórico
#### GET /health → `{ "status": "ok", "timestamp": "..." }`
#### GET /api/docs → Swagger UI

### Tipo FeedbackType

```typescript
export type FeedbackType = 'ALLOWED' | 'DENIED' | 'NOT_FOUND' | 'INVALID_PLATE' | 'SERVER_ERROR'
```

O mobile **nunca interpreta status HTTP**. Sempre lê o `feedbackType` do payload.

### Seed

```
✅ BRA2E19 — Wagner Barboza — ALLOWED — resident — Honda Civic    — com qrCodeToken
✅ ABC3D45 — Maria Silva    — ALLOWED — resident — Toyota Corolla — com qrCodeToken
✅ XYZ1234 — João Santos    — ALLOWED — visitor  — Fiat Uno       — com qrCodeToken
❌ BLQ9A87 — [Bloqueado]    — DENIED  — blocked
⏳ PEN5B23 — [Pendente]     — PENDING — resident
```

### Docker

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    env_file:
      - .env
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Variáveis de Ambiente

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="file:./data/plateguard.db"
THROTTLE_TTL=60
THROTTLE_LIMIT=10
```

---

## PARTE 4 — MOBILE (plate-guard-app)

### Stack Completa

| Tecnologia | Motivo |
|---|---|
| React Native CLI | Controle total, sem Expo |
| TypeScript strict | Consistência |
| React Navigation v6 | Stack + Bottom Tabs |
| Zustand | Estado global leve |
| TanStack Query v5 | Requisições, cache, estados |
| Axios | Cliente HTTP |
| react-native-vision-camera v4 | Câmera robusta |
| react-native-mlkit-ocr | OCR on-device (Fase 2) |
| react-native-reanimated v3 | Todas as animações |
| react-native-gesture-handler | Gestos |
| NativeWind v4 | Utility classes Tailwind |
| react-native-image-picker | Foto de perfil |
| @react-native-async-storage/async-storage | Persistência local |
| Jest + RNTL | Testes |

### Estrutura de Pastas — Mobile

```
plate-guard-app/
└── src/
    ├── theme/                                # ← IMPLEMENTAR PRIMEIRO
    │   ├── tokens.ts
    │   ├── theme.ts
    │   ├── useTheme.ts
    │   ├── glass.ts
    │   └── index.ts
    │
    ├── routes/
    │   ├── index.tsx                         # RootNavigator (Stack + BottomTabs)
    │   ├── ScanPlate/
    │   │   ├── index.tsx                     # UI only
    │   │   ├── useScanPlate.ts               # câmera, OCR, QR, dispatch
    │   │   └── styles.ts
    │   ├── Feedback/
    │   │   ├── index.tsx
    │   │   ├── useFeedback.ts
    │   │   └── styles.ts
    │   ├── Profile/
    │   │   ├── index.tsx
    │   │   ├── useProfile.ts                 # dados do usuário, troca de foto
    │   │   └── styles.ts
    │   └── VehicleRegistration/
    │       ├── index.tsx
    │       ├── useVehicleRegistration.ts     # form, submit, QR toggle
    │       └── styles.ts
    │
    ├── components/
    │   ├── GlassCard/index.tsx
    │   ├── BrazilianPlate/index.tsx
    │   ├── ScanModeToggle/index.tsx          # toggle Câmera / QR Code
    │   ├── CameraViewfinder/index.tsx        # brackets + scan line + pulse rings
    │   ├── FeedbackIcon/index.tsx            # ícone animado do resultado
    │   ├── BottomNavBar/index.tsx
    │   └── AppHeader/index.tsx               # avatar + nome + notificação
    │
    ├── hooks/
    │   ├── animations/
    │   │   ├── usePulseAnimation.ts
    │   │   ├── useScanLineAnimation.ts
    │   │   ├── useFadeInAnimation.ts
    │   │   ├── useSuccessAnimation.ts
    │   │   ├── usePulseRingAnimation.ts
    │   │   └── index.ts
    │   └── useAppState.ts
    │
    ├── service/
    │   └── vehicleAccess/
    │       ├── vehicleAccessApi.ts           # axios puro
    │       └── useValidatePlate.ts           # useMutation React Query
    │
    ├── store/
    │   ├── vehicleAccessStore.ts
    │   └── userStore.ts                      # mock de usuário logado
    │
    ├── types/
    │   ├── vehicleAccess.types.ts
    │   └── navigation.types.ts
    │
    ├── constants/
    │   ├── api.ts
    │   └── plate.ts
    │
    ├── locales/
    │   └── pt-BR/
    │       ├── vehicleAccess.ts
    │       └── common.ts
    │
    ├── utils/
    │   └── plateValidator.ts
    │
    └── assets/
        ├── fonts/                            # Ubuntu, Inter
        └── images/
```

### Navegação

```
RootNavigator (Stack)
├── BottomTabNavigator
│   ├── Tab: Scanner       → ScanPlateScreen
│   ├── Tab: Veículos      → (placeholder — fase 2)
│   └── Tab: Perfil        → ProfileScreen
├── Feedback               (Stack — sem tab, recebe params de resultado)
└── VehicleRegistration    (Stack — aberto a partir do ProfileScreen)
```

`FeedbackScreen` recebe `VehicleAccessResponse` via `navigation.navigate('Feedback', { result })`.

### Tipos de Navegação

```typescript
// src/types/navigation.types.ts
import { VehicleAccessResponse } from './vehicleAccess.types'

export type RootStackParamList = {
  BottomTabs:          undefined
  Feedback:            { result: VehicleAccessResponse }
  VehicleRegistration: undefined
}

export type BottomTabParamList = {
  Scanner:  undefined
  Vehicles: undefined
  Profile:  undefined
}
```

### Tipos de Dados

```typescript
// src/types/vehicleAccess.types.ts

export type FeedbackType =
  | 'ALLOWED'
  | 'DENIED'
  | 'NOT_FOUND'
  | 'INVALID_PLATE'
  | 'SERVER_ERROR'

export type ScanMode  = 'CAMERA' | 'QR_CODE' | 'MANUAL'

export type ScanState = 'idle' | 'scanning' | 'validating' | 'done'

export interface VehicleAccessResponse {
  feedbackType:  FeedbackType
  allowed:       boolean
  plate:         string
  message:       string
  reason?:       string
  ownerName?:    string
  vehicleType?:  string
  vehicleModel?: string
  accessType?:   string
}
```

### Especificação Visual das Telas

#### ScanPlateScreen

- **AppHeader** (glassmorphism): avatar 48px + borda `colors.primary` + glow / "Olá, Wagner 👋" + "Portaria Principal" / ícone notificação com badge laranja
- **ScanModeToggle**: pill container `bgCard` / tab ativa: `primary` com glow / tab inativa: transparente + `textSecondary`
- **CameraViewfinder**: `glassBg` + `glassBorder` + `borderRadius: radii.xl` / brackets L-shape em `primary` com glow / placa ou QR code dentro / scan line `useScanLineAnimation` / 2 pulse rings `usePulseRingAnimation`
  - Modo câmera: brackets retangulares 280×100 + `BrazilianPlate` size="md" como preview
  - Modo QR: brackets quadrados 200×200
- **Status**: dot `usePulseAnimation` + "Procurando placa..." / "Aponte para o QR Code..."
- **Botão fallback**: pill borda `primaryBorder`, bg `primaryMuted`, texto `primary` — "Inserir placa manualmente"
- **BottomNavBar**: glassmorphism / tab ativa: ícone + label `primary` + dot / tab inativa: `textSecondary`

#### FeedbackScreen

Estrutura comum a todos os estados:
- Background `bgPrimary` + gradiente radial sutil no topo com cor do estado
- Header: back button + "Resultado" + timestamp
- Hero icon 80px: gradiente + glow + `useSuccessAnimation` (scale bounce)
- `BrazilianPlate` size="lg" centralizada
- `GlassCard` com rows: ícone + label `textSecondary` + valor `textPrimary`
- Botão CTA laranja "Nova Leitura"
- Todos os elementos entram com `useFadeInAnimation` com delays escalonados (0, 100, 200, 300ms)

Por `feedbackType`:
- `ALLOWED`: gradiente `success`, glow verde, checkmark, "Entrada Liberada"
- `DENIED`: gradiente `danger`, glow vermelho, shield X, "Entrada Negada" + warning box âmbar
- `NOT_FOUND`: gradiente `warning`, glow âmbar, "?", "Placa Não Encontrada" + botão secundário "Solicitar Cadastro"
- `INVALID_PLATE`: gradiente `neutral`, câmera barrada, "Leitura Inválida"
- `SERVER_ERROR`: gradiente slate, wifi-off, "Erro de Comunicação" + botão "Tentar Novamente"

#### ProfileScreen

- **Hero glassmorphism**: avatar 88px + borda `primary` + glow + botão câmera 28px laranja (abre `react-native-image-picker`) / Nome Ubuntu 20px bold / subtítulo + badge "Ativo" laranja
- **GlassCard "Informações Pessoais"**: rows ícone + label + valor
- **GlassCard "Meus Veículos"**: item com `BrazilianPlate` size="sm" + modelo + arrow / botão "Adicionar veículo" dashed border laranja → navega para `VehicleRegistration`
- **GlassCard menu**: Histórico, Notificações (badge "3"), Configurações, Sair (vermelho)
- **BottomNavBar**: tab Perfil ativa

#### VehicleRegistrationScreen

- **Header**: back + "Adicionar Veículo" + "1 de 2"
- **GlassCard form**:
  - Input placa: bg `rgba(255,255,255,0.06)`, focus border `primary` + glow / texto `plateSize` bold `plateSpacing` centralizado / ícone câmera direita
  - `BrazilianPlate` preview abaixo do input, atualiza em tempo real enquanto o usuário digita
  - Input modelo
  - Seletor de cor: pills coloridas
  - Segmented control tipo: "Carro" | "Moto" | "Caminhonete"
  - **Toggle QR Code**: GlassCard interno `primaryBorder` / ícone QR `primary` + título + subtítulo / toggle switch ON: `primary` / quando ativo, backend gera `qrCodeToken` no cadastro
- **Botão**: "Cadastrar Veículo" laranja com glow

### Camada de Serviço

```typescript
// src/service/vehicleAccess/vehicleAccessApi.ts
// Axios puro. Sem React Query. Sem estado.

export async function validatePlate(plate: string, entryMethod = 'CAMERA'): Promise<VehicleAccessResponse> {
  const { data } = await api.post('/vehicle-access/validate', { plate, entryMethod })
  return data
}

export async function validateQrCode(token: string): Promise<VehicleAccessResponse> {
  const { data } = await api.post('/vehicle-access/validate-qr', { token, entryMethod: 'QR_CODE' })
  return data
}
```

```typescript
// src/service/vehicleAccess/useValidatePlate.ts
// useMutation — única fonte de verdade para a requisição de validação

export function useValidatePlate() {
  return useMutation({
    mutationFn: ({ plate, entryMethod }: { plate: string; entryMethod?: string }) =>
      validatePlate(plate, entryMethod),
  })
}
```

### Zustand Stores

```typescript
// src/store/vehicleAccessStore.ts
import { create } from 'zustand'
import { ScanState, ScanMode, VehicleAccessResponse } from '../types/vehicleAccess.types'

interface VehicleAccessState {
  scanState:     ScanState
  scanMode:      ScanMode
  lastResult:    VehicleAccessResponse | null
  setScanState:  (state: ScanState) => void
  setScanMode:   (mode: ScanMode)   => void
  setLastResult: (result: VehicleAccessResponse) => void
  reset:         () => void
}

export const useVehicleAccessStore = create<VehicleAccessState>((set) => ({
  scanState:     'idle',
  scanMode:      'CAMERA',
  lastResult:    null,
  setScanState:  (scanState)  => set({ scanState }),
  setScanMode:   (scanMode)   => set({ scanMode }),
  setLastResult: (lastResult) => set({ lastResult }),
  reset:         ()           => set({ scanState: 'idle', lastResult: null }),
}))
```

```typescript
// src/store/userStore.ts
import { create } from 'zustand'

interface UserState {
  name:      string
  role:      string
  unit:      string
  avatarUri: string | null
  setAvatar: (uri: string) => void
}

export const useUserStore = create<UserState>((set) => ({
  name:      'Wagner Barboza',
  role:      'Morador',
  unit:      'Bloco A, Apto 42',
  avatarUri: null,
  setAvatar: (avatarUri) => set({ avatarUri }),
}))
```

### Locales

```typescript
// src/locales/pt-BR/vehicleAccess.ts

export const vehicleAccessMessages = {
  ALLOWED:       { title: 'Entrada Liberada',      subtitle: 'Acesso autorizado pelo sistema' },
  DENIED:        { title: 'Entrada Negada',         subtitle: 'Acesso não autorizado' },
  NOT_FOUND:     { title: 'Placa Não Encontrada',   subtitle: 'Veículo não cadastrado no sistema' },
  INVALID_PLATE: { title: 'Leitura Inválida',       subtitle: 'Não foi possível identificar a placa' },
  SERVER_ERROR:  { title: 'Erro de Comunicação',    subtitle: 'Verifique sua conexão e tente novamente' },
  scanStatus: {
    camera: 'Procurando placa...',
    qrCode: 'Aponte para o QR Code do veículo',
    hint:   'Mercosul e padrão antigo suportados',
  },
} as const
```

---

## PARTE 5 — DOCUMENTAÇÃO DE DECISÕES

Criar `docs/decisions.md` com todos estes itens:

#### RabbitMQ / Mensageria
- **Decisão:** Não utilizado na POC
- **Motivo:** Fluxo síncrono — validar e responder. Mensageria não agrega no caminho crítico.
- **Evolução futura:** Side-effects (auditoria pesada, notificações, integração com cancela física) extraídos para consumers assíncronos via RabbitMQ ou AWS SQS. Pattern: CQRS lite.

#### Redis / Cache
- **Decisão:** Não utilizado na POC
- **Motivo:** Premature optimization para SQLite com volume baixo.
- **Evolução futura:** Com 500+ acessos/hora, Redis cacheia placas validadas recentemente com TTL de 5min.

#### Circuit Breaker
- **Decisão:** Não implementado
- **Motivo:** Sem serviços externos — backend consome apenas SQLite local.
- **Evolução futura:** Com integrações externas (DETRAN API, cancela física), circuit breaker via `opossum` seria obrigatório.

#### QR Code
- **Decisão:** Implementado como segundo modo de leitura (toggle na ScanPlateScreen)
- **Motivo:** Complementa OCR para ambientes com câmera limitada. Veículos ALLOWED têm `qrCodeToken` no banco. Backend valida via `/vehicle-access/validate-qr`.

#### OCR
- **Decisão:** On-device via ML Kit (`react-native-mlkit-ocr`) — Fase 2. Fase 1 usa input manual com preview de placa em tempo real.
- **Motivo:** Menor latência, não trafega imagem, backend recebe apenas string.

#### Expo vs React Native CLI
- **Decisão:** React Native CLI
- **Motivo:** Controle total sobre dependências nativas (Vision Camera, ML Kit, Image Picker).

#### Animated (RN) vs Reanimated
- **Decisão:** `react-native-reanimated` v3 para todas as animações
- **Motivo:** Roda na UI thread (não JS thread), performance nativa, API moderna com hooks.

#### Glassmorphism
- **Decisão:** Estilo visual padrão de todos os cards e painéis
- **Motivo:** Visual moderno, profissional e diferenciado. Tokens centralizados em `src/theme/glass.ts`.
- **Nota técnica:** `backdropFilter: blur()` não funciona nativamente no RN. Glassmorphism é simulado com `rgba` de baixa opacidade + sombras. Para blur real em iOS/Android, usar `@react-native-community/blur` na Fase 2.

#### Paleta — Valeti
- **Decisão:** Inspirada na Valeti (gestão de valet/estacionamento brasileiro), adaptada para dark mobile
- **Motivo:** Player relevante no segmento de acesso veicular. Demonstra pesquisa de mercado e conexão com o domínio do produto.
- **Tokens:** `src/theme/tokens.ts` — laranja `#FF4B00`, dark navy `#0C111D`.

---

## PARTE 6 — ORDEM DE IMPLEMENTAÇÃO

Siga esta ordem rigorosamente.

### Passo 1 — Backend base
1. NestJS + TypeScript strict
2. Prisma + SQLite + schema (Vehicle com `qrCodeToken` + AccessLog com `entryMethod`)
3. `prisma migrate dev`
4. Seed com placas ALLOWED/DENIED e qrCodeTokens gerados

### Passo 2 — Módulos backend
1. `vehicle-access`: DTO, Repository, Service, Mapper, Controller (`/validate` + `/validate-qr`)
2. `vehicles`: CRUD (POST + GET)
3. `access-log`: grava toda tentativa com `entryMethod`
4. Rate limiting, CORS, filtro global, healthcheck, Swagger

### Passo 3 — Docker
1. Dockerfile + docker-compose.yml
2. Validar `docker-compose up -d` + healthcheck

### Passo 4 — Testes backend
1. Unit: `vehicle-access.service.spec.ts`
2. E2E: `vehicle-access.e2e.spec.ts`

### Passo 5 — Mobile: Design System (OBRIGATÓRIO ANTES DE QUALQUER TELA)
1. `src/theme/tokens.ts`
2. `src/theme/theme.ts` + `useTheme.ts` + `glass.ts` + `index.ts`
3. NativeWind v4 + React Navigation + Zustand + TanStack Query
4. `react-native-reanimated` + `react-native-gesture-handler` (babel plugin obrigatório)
5. Instalar fontes Ubuntu e Inter

### Passo 6 — Componentes base
1. `GlassCard`
2. `BrazilianPlate`
3. `AppHeader`
4. `BottomNavBar`
5. `ScanModeToggle`
6. `FeedbackIcon`

### Passo 7 — Hooks de animação
1. Todos os 5 hooks em `src/hooks/animations/`

### Passo 8 — Camada de serviço
1. `vehicleAccessApi.ts`
2. `useValidatePlate.ts`
3. Stores Zustand
4. Tipos, constantes, locales

### Passo 9 — Telas
1. `ScanPlateScreen` — câmera simulada + toggle + QR + input manual + animações
2. `FeedbackScreen` — 5 estados com animações escalonadas
3. `ProfileScreen` — dados + veículos + troca de foto
4. `VehicleRegistrationScreen` — form + preview placa em tempo real + toggle QR

### Passo 10 — OCR real (Fase 2)
1. `react-native-mlkit-ocr` + Vision Camera
2. Frame processing + regex

### Passo 11 — Documentação
1. README principal completo
2. `docs/decisions.md`
3. `docs/api-contract.md`
4. `docs/roadmap.md`
5. `.env.example` de ambos os projetos

---

## Padrões de Código

```typescript
// ❌ Cor hardcoded — nunca
<View style={{ backgroundColor: '#FF4B00' }} />

// ✅ Sempre via tokens
import { colors } from '../theme'
<View style={{ backgroundColor: colors.primary }} />

// ❌ Animated padrão — nunca
import { Animated } from 'react-native'

// ✅ Sempre Reanimated
import Animated from 'react-native-reanimated'

// ❌ any — nunca
function handle(data: any) {}

// ✅ unknown + narrowing
function handle(data: unknown) {
  if (isVehicleAccessResponse(data)) { ... }
}
```

### Nomenclatura
```
arquivos:         kebab-case          (vehicle-access.service.ts)
componentes:      PascalCase          (FeedbackCard.tsx)
funções/hooks:    camelCase           (useValidatePlate)
constantes:       SCREAMING_SNAKE     (PLATE_REGEX)
tipos/interfaces: PascalCase          (VehicleAccessResponse)
tokens:           camelCase           (colors.primary, radii.lg)
```

### Commits (português, Conventional Commits)
```
feat: implementa design system com tokens e glassmorphism
feat: adiciona toggle de modo QR Code na tela de scan
feat: adiciona tela de cadastro de veículo com preview de placa
feat: implementa ProfileScreen com troca de foto
fix: corrige animação de pulse ring no viewfinder
refactor: extrai BrazilianPlate para componente reutilizável
style: aplica tokens de tema em FeedbackScreen
test: adiciona testes do VehicleAccessService
chore: configura react-native-reanimated com babel plugin
docs: documenta decisão de glassmorphism em decisions.md
```

---

## Checklist Final

### Backend
- [ ] `docker-compose up -d` sem erros
- [ ] Swagger em `http://localhost:3000/api/docs`
- [ ] `GET /health` → `{ status: "ok" }`
- [ ] `POST /vehicle-access/validate` — 5 feedbackTypes funcionando
- [ ] `POST /vehicle-access/validate-qr` — valida via qrCodeToken
- [ ] `POST /vehicles` — cadastro funcionando
- [ ] Toda tentativa grava em `access_logs` com `entryMethod`
- [ ] Rate limiting ativo
- [ ] `.env` não commitado

### Mobile — Design System
- [ ] `tokens.ts` com todos os tokens criado
- [ ] `glass.ts` com helpers glassmorphism criado
- [ ] `useTheme()` exportado e funcionando
- [ ] Reanimated configurado (babel plugin)
- [ ] Nenhuma cor hardcoded em nenhum arquivo

### Mobile — Componentes
- [ ] `GlassCard` com todas as variantes
- [ ] `BrazilianPlate` renderizando Mercosul corretamente
- [ ] `AppHeader` com avatar + nome + notificação
- [ ] `BottomNavBar` com 3 tabs e estado ativo
- [ ] `ScanModeToggle` alternando com animação
- [ ] `FeedbackIcon` com scale bounce

### Mobile — Animações
- [ ] Scan line animada no viewfinder
- [ ] Pulse rings ao redor dos brackets
- [ ] Status dot pulsante
- [ ] FeedbackScreen com fade-in escalonado (delays 0, 100, 200, 300ms)
- [ ] Ícone de resultado com scale bounce

### Mobile — Telas
- [ ] `ScanPlateScreen` — toggle CÂMERA/QR + simulação + input manual
- [ ] `FeedbackScreen` — 5 feedbackTypes com visuais corretos
- [ ] `ProfileScreen` — dados + veículos + troca de foto
- [ ] `VehicleRegistrationScreen` — form + preview placa em tempo real + toggle QR

### Documentação
- [ ] `docs/decisions.md` cobre: RabbitMQ, Redis, Circuit Breaker, QR Code, Expo, Reanimated, Glassmorphism, Paleta Valeti
- [ ] README com instruções completas
- [ ] `.env.example` em ambos os projetos
