# LAYOUT.md — Implementação do Design System PlateGuard

> Este arquivo complementa o `CLAUDE.md`.
> Leia ambos antes de escrever qualquer componente visual.
> O `LAYOUT.md` é a fonte de verdade para todas as decisões visuais.
> Em caso de conflito com o `CLAUDE.md`, o `LAYOUT.md` prevalece para decisões de UI.

---

## Filosofia Visual — "The Silent Sentinel"

O app deve parecer um **centro de comando premium**, não um dashboard SaaS comum.
Três princípios guiam todas as decisões visuais:

1. **Autoridade silenciosa** — sem ruído visual. Cada elemento tem propósito.
2. **Profundidade tonal** — camadas de superfícies escuras criam hierarquia sem bordas.
3. **Contraste cirúrgico** — o azul elétrico (`primary`) só aparece onde importa.

---

## IMPORTANTE — Atualização de Tokens

O design final usa **azul elétrico** como cor primária (não laranja).
Os tokens do `CLAUDE.md` devem ser **substituídos** pelos tokens abaixo.
Não misturar laranja (`#FF4B00`) com o sistema novo.

---

## 1. Tokens Atualizados — Substituir `src/theme/tokens.ts`

```typescript
// src/theme/tokens.ts — VERSÃO FINAL (substitui a anterior)

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
  // Bordas de 1px para seção são PROIBIDAS.
  // Ghost border é o único fallback permitido, apenas para acessibilidade.
  ghostBorder:  'rgba(66, 71, 84, 0.15)',  // outline-variant @ 15%
  outlineVariant: '#424754',

  // ─── Glass (para elementos flutuantes) ──────────────────────────
  glassBg:      'rgba(37, 41, 58, 0.75)',  // surface-container-high semi-transparente
  glassBorder:  'rgba(66, 71, 84, 0.2)',

  // ─── Misc ───────────────────────────────────────────────────────
  white:    '#FFFFFF',  // usar APENAS em ícones sobre fundo primário
  black:    '#000000',
} as const

export const shadows = {
  // Tonal layering — sem drop shadows tradicionais
  // Sombra ambiente apenas para elementos flutuantes críticos
  ambientFloat:  {
    shadowColor:   '#4d8eff',   // tintado com primary para efeito de tela no escuro
    shadowOffset:  { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius:  40,
    elevation:     12,
  },
  // Glow do botão primário
  primaryButtonGlow: {
    shadowColor:   '#adc6ff',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius:  16,
    elevation:     8,
  },
  // Glow de alerta crítico
  alertGlow: {
    shadowColor:   '#4d8eff',
    shadowOffset:  { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius:  40,
    elevation:     10,
  },
} as const

export const radii = {
  // Cantos de 90 graus são proibidos. Mínimo sm (4px) em qualquer elemento.
  xs:   4,   // sm na spec — tooltip, tag pequena
  sm:   8,   // inputs, chips pequenos
  md:   12,  // cards internos
  lg:   16,  // cards principais
  xl:   20,  // modais, painéis grandes
  full: 9999, // pills, avatares
} as const

export const spacing = {
  // "No divider" rule — usar whitespace como separador
  listItemGap:  8,   // espaço entre itens de lista (substituindo dividers)
  sectionGap:   16,  // espaço entre seções
  xs:    4,
  sm:    8,
  md:    16,
  lg:    24,
  xl:    32,
  xxl:   48,
} as const

export const typography = {
  // Dual-font: Space Grotesk (tech/dados) + Manrope (legibilidade/UI)
  fontDisplay: 'SpaceGrotesk',  // placas, KPIs, headlines técnicas
  fontBody:    'Manrope',       // body, títulos de tela, descrições, logs

  // Escala editorial
  sizeDisplayLg: 56,   // 3.5rem — KPIs críticos (ex: total de entradas hoje)
  sizeHeadlineLg: 32,  // 2rem   — placa no Plate Monitor
  sizeHeadlineMd: 24,  // 1.5rem — títulos de página
  sizeHeadlineSm: 20,  // 1.25rem— subtítulos de seção
  sizeTitleLg:    18,
  sizeTitleMd:    16,
  sizeTitleSm:    14,
  sizeBodyLg:     16,
  sizeBodyMd:     14,
  sizeBodySm:     12,
  sizeLabelMd:    12,   // 0.75rem — metadados (usar textSecondary)
  sizeLabelSm:    11,

  weightRegular:  '400' as const,
  weightMedium:   '500' as const,
  weightSemiBold: '600' as const,
  weightBold:     '700' as const,

  // Configurações especiais da placa
  plateSize:       32,   // Headline-LG — Space Grotesk
  plateWeight:     '700' as const,
  plateSpacing:    4,    // letterSpacing generoso
  plateFont:       'SpaceGrotesk',
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

---

## 2. Sistema de Superfícies — A Regra Mais Importante

**Bordas de 1px para separar seções são PROIBIDAS.**
Hierarquia visual é criada 100% por mudança de cor de fundo.

```
surfaceDim (#0a0e1a)          ← fundo do app inteiro
  └─ surface (#0e1322)        ← telas principais
       └─ surfaceContainerLow (#161b2b)   ← sidebar, nav secundária
            └─ surfaceContainer (#1a1f2f) ← cards de conteúdo
                 └─ surfaceContainerHigh (#25293a) ← modais, estado ativo, plate monitor
```

Quando você sentir necessidade de adicionar uma borda, adicione `padding: 16` no lugar.

**Ghost border** (único caso permitido): acessibilidade obrigatória.
```typescript
borderWidth: 1,
borderColor: colors.ghostBorder,  // rgba(66, 71, 84, 0.15)
```

---

## 3. Tipografia — Regras de Uso

```
Space Grotesk → placas, KPIs, números de veículos, headers de seção técnica
Manrope       → títulos de tela, descrições, logs, configurações, qualquer texto narrativo

NUNCA misturar: um mesmo bloco de texto usa apenas uma família.
```

Instalar as fontes:
```bash
# Adicionar ao projeto
npx react-native-asset  # após adicionar os arquivos .ttf em src/assets/fonts/
```

Configurar no `react-native.config.js`:
```javascript
module.exports = {
  assets: ['./src/assets/fonts'],
}
```

---

## 4. Regras de Componentes

### 4.1 Sem dividers — jamais

```typescript
// ❌ Proibido
<View style={{ borderBottomWidth: 1, borderColor: colors.outlineVariant }} />
<Divider />

// ✅ Correto — usar gap vertical
<View style={{ gap: spacing.listItemGap }}>
  <VehicleItem />
  <VehicleItem />
</View>
```

### 4.2 Sem shadows tradicionais

```typescript
// ❌ Proibido
shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 10

// ✅ Correto — tonal layering (mudar backgroundColor)
// ✅ Correto — ambient glow tintado com primary (apenas elementos flutuantes)
...shadows.ambientFloat
```

### 4.3 Sem #FFFFFF como texto

```typescript
// ❌ Proibido
color: '#FFFFFF'
color: 'white'

// ✅ Correto
color: colors.onSurface  // #dee1f7
```

### 4.4 Sem cantos retos

```typescript
// ❌ Proibido
borderRadius: 0

// ✅ Mínimo permitido
borderRadius: radii.xs  // 4px
```

---

## 5. Componentes — Especificação Completa

### 5.1 Botão Primário

```typescript
// Aparência: azul elétrico com inner glow — parece usinado/backlit
{
  backgroundColor: colors.primary,       // #adc6ff
  borderRadius:    radii.lg,             // 16px
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.xl,

  // Inner glow: borda superior 1px em azul mais claro (efeito machined)
  borderTopWidth:  1,
  borderTopColor:  'rgba(255, 255, 255, 0.25)',

  // Ambient glow abaixo
  ...shadows.primaryButtonGlow,

  // Texto
  fontFamily:  typography.fontBody,   // Manrope
  fontSize:    typography.sizeTitleMd,
  fontWeight:  typography.weightSemiBold,
  color:       '#0e1322',             // on-primary: escuro sobre azul claro
}
```

### 5.2 Botão Secundário

```typescript
{
  backgroundColor: colors.surfaceContainerHigh,  // #25293a
  borderRadius:    radii.lg,
  // Sem borda
  // Sem shadow
  fontFamily:  typography.fontBody,
  color:       colors.onSurface,
}
```

### 5.3 Botão Terciário (Ghost)

```typescript
{
  backgroundColor: 'transparent',
  borderRadius:    radii.lg,
  fontFamily:      typography.fontBody,
  color:           colors.primary,
  // Sem border em estado normal
}
```

### 5.4 Input / Campo de Busca de Placa

```typescript
// Estado normal
{
  backgroundColor: colors.surfaceContainerLow,  // #161b2b
  borderRadius:    radii.sm,                    // 8px
  borderBottomWidth: 2,
  borderBottomColor: colors.outlineVariant,     // #424754
  paddingHorizontal: spacing.md,
  paddingVertical:   spacing.sm + 4,
  fontFamily:        typography.fontBody,       // Manrope
  color:             colors.onSurface,
}

// Estado focus (via useAnimatedStyle / useState)
{
  borderBottomColor: colors.primary,            // muda para azul
  backgroundColor:   colors.primaryMuted,       // tint azul sutil
}
```

### 5.5 Access Chip (Status de Acesso)

```typescript
// Sempre pill (borderRadius: full)

// ALLOWED
{
  backgroundColor: colors.successBg,   // #00a74b
  borderRadius:    radii.full,
  paddingVertical: 4,
  paddingHorizontal: spacing.md,
  color:           colors.success,     // #4ae176
  fontFamily:      typography.fontBody,
  fontSize:        typography.sizeLabelMd,
  fontWeight:      typography.weightSemiBold,
}

// DENIED
{
  backgroundColor: colors.errorBg,    // #93000a
  borderRadius:    radii.full,
  color:           colors.error,      // #ffb4ab
  // mesmos paddings
}
```

### 5.6 Plate Monitor (Hero Component)

O elemento mais importante do app. Deve parecer um objeto físico colocado sobre a superfície digital.

```typescript
// Container
{
  backgroundColor: colors.surfaceContainerHigh,  // #25293a — camada mais elevada
  borderRadius:    radii.xl,
  padding:         spacing.xl,

  // Ghost border para definir os limites (único uso permitido)
  borderWidth:  1,
  borderColor:  colors.ghostBorder,

  // Ambient glow — tintado com primary para parecer iluminado
  ...shadows.ambientFloat,
}

// Texto da placa
{
  fontFamily:   typography.plateFont,    // Space Grotesk
  fontSize:     typography.plateSize,    // 32px — Headline-LG
  fontWeight:   typography.plateWeight,  // 700
  letterSpacing: typography.plateSpacing, // 4px
  color:        colors.onSurface,        // #dee1f7
  textTransform: 'uppercase',
}
```

### 5.7 Glass Element (Flutuante)

Apenas para pop-overs, modais de placa, e alertas flutuantes:

```typescript
{
  backgroundColor:  colors.glassBg,    // rgba(37,41,58,0.75)
  borderRadius:     radii.xl,
  borderWidth:      1,
  borderColor:      colors.glassBorder,
  // backdrop-blur: 20px
  // No RN: usar @react-native-community/blur (BlurView) para blur real no iOS/Android
  // Fallback sem blur: apenas glassBg sem BlurView
}
```

### 5.8 Card Principal

```typescript
{
  backgroundColor: colors.surfaceContainer,  // #1a1f2f
  borderRadius:    radii.lg,
  padding:         spacing.lg,
  // Sem shadow. Profundidade criada pela diferença de cor em relação ao fundo surface.
}
```

### 5.9 Zebra Striping (Logs de Acesso)

Para listas densas de histórico. Sem dividers.

```typescript
// Item ímpar
backgroundColor: colors.surface               // #0e1322

// Item par
backgroundColor: colors.surfaceContainerLow   // #161b2b

// Gap entre itens: 0px (as cores fazem a separação)
// Padding interno de cada item: spacing.md (16px)
```

---

## 6. Telas — Implementação Detalhada

### 6.1 ScanPlateScreen

**Background:** `colors.surfaceDim` (#0a0e1a)

**AppHeader:**
```
backgroundColor: colors.surfaceContainerLow
// Sem borda inferior — mudança de cor já separa do conteúdo
padding: spacing.md
```
- Avatar circular `radii.full` com borda `colors.primaryBorder`
- Texto greeting: Manrope `sizeTitleMd` `onSurface`
- Subtítulo: Manrope `sizeLabelMd` `textSecondary`
- Ícone de notificação: cor `primary`

**ScanModeToggle:**
```
backgroundColor: colors.surfaceContainer
borderRadius: radii.full
```
- Tab ativa: `backgroundColor: colors.surfaceContainerHigh`, texto `colors.primary`, Manrope semibold
- Tab inativa: transparente, texto `colors.textSecondary`
- Sem border entre tabs

**CameraViewfinder:**
```
backgroundColor: colors.surfaceContainerHigh
borderRadius: radii.xl
// Ghost border apenas se necessário para contraste
borderWidth: 1
borderColor: colors.ghostBorder
```
- Brackets L-shape: cor `colors.primary` — 2px thick
- Sem glow nos brackets — o contraste tonal já destaca
- Scan line: gradiente `transparent → primary → transparent` — `useScanLineAnimation`
- Pulse rings: `colors.primary` a 5-8% opacidade — `usePulseRingAnimation`

**BrazilianPlate (dentro do viewfinder):**
- Usar componente `BrazilianPlate`
- Texto em Space Grotesk `plateSize` — é o único lugar onde a fonte "tech" aparece na scan

**Status label:**
```
fontFamily: Manrope
fontSize: sizeLabelMd
color: textSecondary
// Dot pulsante: cor primary
```

**Botão fallback "Inserir manualmente":**
- Botão Terciário (ghost) — texto `primary`, sem fundo, sem borda
- Manrope `sizeTitleSm`

**BottomNavBar:**
```
backgroundColor: colors.surfaceContainerLow
// Sem borda superior — mudança de cor separa
```
- Tab ativa: ícone + label `colors.primary`
- Tab inativa: `colors.textSecondary`
- Indicator: pequena linha de 2px em `colors.primary` acima do ícone ativo (não um dot)

---

### 6.2 FeedbackScreen

**Background:** `colors.surfaceDim`

**Header:**
- Back button: ícone `colors.primary`
- "Resultado": Manrope `sizeHeadlineSm` `onSurface`
- Timestamp: Manrope `sizeLabelMd` `textSecondary`

**Hero Section:**
- Ícone grande (80px): usar `surfaceContainerHigh` como fundo do círculo
- O "glow" do ícone usa a sombra ambiente tintada com a cor semântica — não gradiente no background da tela inteira
- Título: Manrope `sizeHeadlineMd` `onSurface`
- Subtítulo: Manrope `sizeTitleSm` — cor semântica (`success`, `error`, etc.)

**Access Chip (abaixo do subtítulo):**
- `ALLOWED` → chip verde `successBg` / `success`
- `DENIED` → chip vermelho `errorBg` / `error`
- Pill shape (`borderRadius: full`)

**Plate Monitor:**
```typescript
// Card com surfaceContainerHigh + ghost border + ambient glow
backgroundColor: colors.surfaceContainerHigh
borderRadius: radii.xl
borderWidth: 1
borderColor: colors.ghostBorder
...shadows.ambientFloat
```
- `BrazilianPlate` size="lg" centralizada
- Label "Placa identificada": Manrope `sizeLabelMd` `textSecondary`

**Details Card:**
```typescript
backgroundColor: colors.surfaceContainer  // um nível abaixo do Plate Monitor
borderRadius: radii.lg
padding: spacing.lg
```
- Rows **sem dividers** — separados por `gap: spacing.listItemGap` (8px)
- Cada row: ícone `primary` + label Manrope `sizeLabelMd` `textSecondary` + valor Manrope `sizeTitleSm` `onSurface`

**Botão "Nova Leitura":**
- Botão Primário completo (azul + inner glow)

**Animações:**
- `useSuccessAnimation` no ícone hero (scale bounce, delay 200ms)
- `useFadeInAnimation` sequencial: chip (0ms), plate monitor (100ms), details card (200ms), botão (300ms)

**Por feedbackType:**
| feedbackType | Ícone | Chip | Ambient Glow Color |
|---|---|---|---|
| ALLOWED | checkmark | successBg/success | successGlow |
| DENIED | shield-x | errorBg/error | errorGlow |
| NOT_FOUND | question | warningBg/warning | primaryGlow |
| INVALID_PLATE | camera-off | surfaceContainerHigh/textSecondary | nenhum |
| SERVER_ERROR | wifi-off | surfaceContainerHigh/textSecondary | nenhum |

---

### 6.3 ProfileScreen

**Background:** `colors.surfaceDim`

**Hero (painel superior):**
```typescript
backgroundColor: colors.surfaceContainerLow  // sem border inferior
padding: spacing.xl
```
- Avatar 88px: `borderRadius: full`, borda 2px `colors.primaryBorder`
- Botão editar foto: círculo 28px `colors.surfaceContainerHigh`, ícone `colors.primary`
- Nome: Space Grotesk `sizeHeadlineSm` `onSurface` — nome é dado "tech" do usuário
- Subtítulo: Manrope `sizeLabelMd` `textSecondary`
- Badge "Ativo": chip `successBg` / `success` pill

**Card Informações Pessoais:**
```typescript
backgroundColor: colors.surfaceContainer
borderRadius: radii.lg
```
- Label de seção: Manrope `sizeLabelMd` uppercase `textSecondary` — ex: "INFORMAÇÕES PESSOAIS"
- Rows sem dividers — gap `spacing.listItemGap`
- Ícone: `colors.primary`, label: `textSecondary`, valor: `onSurface`

**Card Meus Veículos:**
```typescript
backgroundColor: colors.surfaceContainer
borderRadius: radii.lg
```
- Item de veículo: `BrazilianPlate` size="sm" + modelo em Manrope + seta `colors.primary`
- Zebra striping nos itens: alterar entre `surface` e `surfaceContainerLow`
- Botão "Adicionar veículo":
  ```typescript
  backgroundColor: colors.primaryMuted    // rgba(173,198,255,0.08)
  borderRadius: radii.md
  borderWidth: 1
  borderColor: colors.primaryBorder       // ghost border permitido aqui
  // Texto: colors.primary, Manrope semibold
  // Ícone "+": colors.primary
  ```

**Card Menu:**
```typescript
backgroundColor: colors.surfaceContainer
borderRadius: radii.lg
```
- Itens sem dividers — gap `spacing.listItemGap`
- "Sair": texto e ícone `colors.error` (#ffb4ab)

---

### 6.4 VehicleRegistrationScreen

**Background:** `colors.surfaceDim`

**Header:**
- Back: ícone `colors.primary`
- Título: Manrope `sizeHeadlineSm` `onSurface`
- Step: Manrope `sizeLabelMd` `textSecondary`

**Form Card:**
```typescript
backgroundColor: colors.surfaceContainer
borderRadius: radii.lg
padding: spacing.lg
```

**Input de Placa:**
```typescript
// Estado normal
backgroundColor: colors.surfaceContainerLow
borderBottomWidth: 2
borderBottomColor: colors.outlineVariant
borderRadius: radii.sm  // apenas topo — bottom é reto por causa da barra

// Estado focus
borderBottomColor: colors.primary
backgroundColor: colors.primaryMuted

// Texto
fontFamily: typography.plateFont   // Space Grotesk — placa é dado tech
fontSize: typography.plateSize     // 32px
fontWeight: typography.plateWeight
color: colors.onSurface
letterSpacing: typography.plateSpacing
textAlign: 'center'
```

**Preview da Placa (abaixo do input):**
- `BrazilianPlate` size="md" atualiza em tempo real
- Animação: `useFadeInAnimation` quando o preview aparece (quando há 3+ caracteres)

**Inputs de Modelo, Cor, Tipo:**
- Mesmo estilo de input (surfaceContainerLow + borderBottom)
- Manrope como fonte
- Seletor de cor: pills `radii.full`, cor selecionada tem borda 2px `colors.primary`
- Segmented type: `surfaceContainerHigh` como container, item ativo `surfaceContainer` + texto `primary`

**Toggle QR Code:**
```typescript
backgroundColor: colors.surfaceContainerLow
borderRadius: radii.md
borderWidth: 1
borderColor: colors.primaryBorder   // ghost border permitido para destacar feature
padding: spacing.md
```
- Ícone QR: `colors.primary`
- Título: Manrope `sizeTitleSm` `onSurface`
- Subtítulo: Manrope `sizeLabelMd` `textSecondary`
- Toggle ON: `colors.primary`

**Botão "Cadastrar Veículo":**
- Botão Primário completo

---

## 7. Componente BrazilianPlate — Atualizado

Atualizar `src/components/BrazilianPlate/index.tsx` para usar Space Grotesk:

```typescript
// O texto da placa usa Space Grotesk — fonte "tech" por definição do design system
plateText: {
  fontFamily:    typography.plateFont,     // 'SpaceGrotesk'
  fontWeight:    typography.plateWeight,   // '700'
  color:         '#1a1a2e',
  letterSpacing: typography.plateSpacing,  // 4
},
countryText: {
  fontFamily: typography.fontBody,         // 'Manrope' — BRASIL é texto funcional
  ...
}
```

---

## 8. Glass (BlurView) — Setup

Para glassmorphism real (blur de 20px) em iOS e Android:

```bash
npm install @react-native-community/blur
cd ios && pod install
```

Uso em elementos flutuantes:
```typescript
import { BlurView } from '@react-native-community/blur'

<BlurView
  style={{ borderRadius: radii.xl, overflow: 'hidden' }}
  blurType="dark"
  blurAmount={20}
  reducedTransparencyFallbackColor={colors.surfaceContainerHigh}
>
  {children}
</BlurView>
```

Usar BlurView **apenas** em:
- Pop-over de detalhe de placa
- Modais de confirmação
- Alertas críticos flutuantes

Nos cards normais, `glassBg` (rgba) sem BlurView é suficiente.

---

## 9. Fontes — Setup Completo

```bash
# Baixar as fontes
# Space Grotesk: https://fonts.google.com/specimen/Space+Grotesk
# Manrope: https://fonts.google.com/specimen/Manrope

# Colocar os .ttf em:
# src/assets/fonts/SpaceGrotesk-Bold.ttf
# src/assets/fonts/SpaceGrotesk-SemiBold.ttf
# src/assets/fonts/SpaceGrotesk-Medium.ttf
# src/assets/fonts/SpaceGrotesk-Regular.ttf
# src/assets/fonts/Manrope-Bold.ttf
# src/assets/fonts/Manrope-SemiBold.ttf
# src/assets/fonts/Manrope-Medium.ttf
# src/assets/fonts/Manrope-Regular.ttf
```

`react-native.config.js`:
```javascript
module.exports = {
  assets: ['./src/assets/fonts'],
}
```

```bash
npx react-native-asset
```

---

## 10. Ordem de Implementação do Design System

Siga esta ordem antes de criar qualquer tela:

1. Instalar fontes (Space Grotesk + Manrope) e rodar `npx react-native-asset`
2. Substituir `src/theme/tokens.ts` pelos tokens deste arquivo
3. Atualizar `src/theme/glass.ts` com as novas variáveis de cor
4. Atualizar `src/components/BrazilianPlate` para usar Space Grotesk
5. Criar/atualizar `src/components/GlassCard` com os novos tokens
6. Instalar `@react-native-community/blur` e configurar pods
7. Validar as cores numa tela simples antes de avançar

---

## 11. Checklist de Revisão Visual

Antes de considerar qualquer tela pronta:

- [ ] Fundo da tela é `surfaceDim` (#0a0e1a)
- [ ] Nenhum `#FFFFFF` como cor de texto — apenas `onSurface` (#dee1f7)
- [ ] Nenhuma borda de 1px separando seções — apenas mudança de backgroundColor
- [ ] Nenhum divider/linha horizontal entre itens de lista
- [ ] Nenhuma shadow tradicional (shadowOpacity > 0.15) — apenas tonal layering
- [ ] Texto da placa usa Space Grotesk
- [ ] Todo texto UI/body/label usa Manrope
- [ ] Botão primário tem inner glow (borderTopWidth: 1, borderTopColor: rgba(255,255,255,0.25))
- [ ] Access chips são sempre pill (borderRadius: full)
- [ ] Ghost border só aparece onde acessibilidade exige
- [ ] Nenhum canto de 90 graus (borderRadius mínimo: 4px)
- [ ] Cor primária é azul (#adc6ff) — sem laranja em nenhum lugar

---

## 12. Mapeamento de Conflitos com CLAUDE.md

| Decisão no CLAUDE.md | Decisão final (LAYOUT.md prevalece) |
|---|---|
| `colors.primary: '#FF4B00'` (laranja) | `colors.primary: '#adc6ff'` (azul elétrico) |
| Fontes: Ubuntu + Inter | Space Grotesk + Manrope |
| glassCard com rgba white | Glass com surfaceContainerHigh semi-transparente |
| Shadow: 0 8px 32px rgba(0,0,0,0.45) | Sem shadow — tonal layering |
| Glow laranja em badges e tabs | Glow azul apenas em elementos flutuantes críticos |
| Border subtle em headers | Sem border — mudança de backgroundColor |
| Scan line e pulse rings com laranja | Primary azul (#adc6ff) |

Todos os outros pontos do `CLAUDE.md` (arquitetura, separação de responsabilidades, hooks, stores, React Query, etc.) permanecem válidos e devem ser seguidos.
