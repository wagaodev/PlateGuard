# Decisões Técnicas — PlateGuard

> Este documento registra todas as decisões arquiteturais significativas do projeto,
> com justificativa técnica e caminho de evolução futura.

---

## 1. RabbitMQ / Mensageria

**Decisão:** Não utilizado na POC.

**Motivo:** O fluxo de validação de placa é síncrono — recebe placa, consulta banco, responde. Mensageria não agrega valor no caminho crítico. Adicionar uma fila entre a requisição e a resposta aumentaria a latência sem benefício funcional.

**Evolução futura:** Side-effects que não precisam de resposta síncrona (auditoria pesada, notificações push, integração com cancela física, envio de relatório diário) seriam extraídos para consumers assíncronos via RabbitMQ ou AWS SQS. Pattern: CQRS lite — o comando valida e responde, o evento dispara os side-effects.

---

## 2. Redis / Cache

**Decisão:** Não utilizado na POC.

**Motivo:** Premature optimization. O SQLite local atende o volume da POC (< 100 veículos) com consultas sub-millisecond. Adicionar Redis aumentaria a complexidade operacional sem ganho mensurável.

**Evolução futura:** Com 500+ acessos/hora, Redis cacheia placas validadas recentemente com TTL de 5 minutos. Pattern: cache-aside — consulta Redis primeiro, fallback para DB, grava no Redis após consulta. Isso reduz a carga no banco principal e garante resposta < 10ms para placas frequentes.

---

## 3. Circuit Breaker

**Decisão:** Não implementado.

**Motivo:** O backend consome apenas SQLite local (embedded, sem rede). Não há serviços externos que possam falhar de forma intermitente. Circuit breaker sem serviço externo é overhead sem propósito.

**Evolução futura:** Com integrações externas (DETRAN API para validação de situação do veículo, API da cancela física, serviço de notificação push), circuit breaker via `opossum` seria obrigatório. Configuração: threshold 50%, timeout 3s, reset 30s.

---

## 4. QR Code

**Decisão:** Implementado como segundo modo de leitura (toggle na ScanPlateScreen).

**Motivo:** Complementa OCR para ambientes onde a câmera tem limitação (garagem escura, placa suja, reflexo). Veículos com status ALLOWED têm um `qrCodeToken` (UUID) no banco. O backend valida via `POST /vehicle-access/validate-qr`.

**Implementação:**
- Schema: campo `qrCodeToken` (String? @unique) no model Vehicle
- Endpoint: `POST /vehicle-access/validate-qr` recebe `{ token }` e retorna o mesmo contrato do `/validate`
- Mobile: toggle Câmera/QR Code na ScanPlateScreen com componente `ScanModeToggle`
- Seed: 3 veículos ALLOWED têm qrCodeToken gerado via `crypto.randomUUID()`

**Evolução futura:** O QR Code pode conter um deep link (`plateguard://validate?token=UUID`) para leitura automática ao apontar a câmera do celular.

---

## 5. OCR

**Decisão:** On-device via ML Kit (`react-native-mlkit-ocr`) — planejado para Fase 2. Fase 1 usa input manual com preview de placa em tempo real.

**Motivo:** OCR on-device oferece menor latência (não trafega imagem pela rede), funciona offline, e o backend recebe apenas a string da placa. Isso simplifica o contrato da API e reduz custo de banda.

**Implementação atual:** Input manual + chips de simulação (demo) que enviam placas do seed diretamente para o endpoint `/validate`.

**Evolução futura:**
1. Instalar `react-native-mlkit-ocr` + Vision Camera
2. Frame processing com regex `/[A-Z]{3}[0-9][A-Z0-9][0-9]{2}/`
3. Debounce de 500ms para evitar múltiplas validações da mesma placa
4. Fallback para input manual se OCR não reconhecer em 10 segundos

---

## 6. Expo vs React Native CLI

**Decisão:** React Native CLI puro.

**Motivo:** Controle total sobre dependências nativas. O projeto usa:
- Vision Camera (Fase 2) — requer native modules
- ML Kit OCR — requer native modules
- Image Picker — requer configuração nativa
- Reanimated — requer babel plugin + native setup

Expo managed workflow limitaria o acesso a essas APIs ou exigiria eject, anulando o benefício.

**Trade-off aceito:** Setup inicial mais complexo (Xcode, Android Studio, pod install), mas total controle sobre o build pipeline.

---

## 7. Animated (RN) vs Reanimated

**Decisão:** `react-native-reanimated` v3 para **todas** as animações.

**Motivo:** Reanimated roda animações na UI thread (não na JS thread), garantindo 60fps mesmo com lógica pesada no JavaScript. A API de hooks (`useAnimatedStyle`, `withSpring`, `withTiming`) é mais ergonômica e composável que a API legada `Animated.Value`.

**Hooks implementados:**
- `usePulseAnimation` — dot de status pulsante (opacity loop)
- `useScanLineAnimation` — linha de scan no viewfinder (translateY loop)
- `useFadeInAnimation` — entrada de elementos com fade + slide (opacity + translateY)
- `useSuccessAnimation` — scale bounce do ícone de resultado (withSpring)
- `usePulseRingAnimation` — anéis concêntricos ao redor do viewfinder (scale + opacity loop)

---

## 8. Design System — "The Silent Sentinel"

**Decisão:** Dark mode exclusivo com filosofia editorial-tech. Tonal layering em vez de bordas e shadows.

**Motivo:** O app deve parecer um centro de comando premium, não um dashboard SaaS comum. A paleta escura reduz fadiga visual em ambientes de portaria (uso prolongado) e faz o azul elétrico (`#adc6ff`) parecer luminoso e crítico.

**Princípios:**
1. **Bordas de 1px para seções são proibidas** — hierarquia por mudança de backgroundColor
2. **Dividers são proibidos** — gap/whitespace como separador
3. **#FFFFFF como texto é proibido** — usar `onSurface` (#dee1f7)
4. **Shadows tradicionais proibidas** — tonal layering (empilhamento de superfícies)
5. **Ghost border** apenas para acessibilidade obrigatória

---

## 9. Paleta de Cores — Azul Elétrico

**Decisão:** Primária azul elétrico `#adc6ff` com superfícies navy profundo.

**Motivo:** A paleta original (laranja Valeti) foi substituída durante o refinamento do design para criar uma identidade visual mais sofisticada e menos "startup". O azul elétrico sobre superfícies escuras cria contraste cirúrgico — a cor primária só aparece onde importa.

**Tokens críticos:**
- `primary`: `#adc6ff` — ação principal, destaques
- `surfaceDim`: `#0a0e1a` — fundo do app
- `surfaceContainerHigh`: `#25293a` — modais, plate monitor
- `onSurface`: `#dee1f7` — texto primário (nunca branco puro)

---

## 10. Tipografia — Dual-Font Strategy

**Decisão:** Space Grotesk (dados técnicos) + Manrope (UI/body).

**Motivo:**
- **Space Grotesk** é geométrica e monoespaciada-friendly, perfeita para placas, KPIs e dados alfanuméricos. Passa a sensação de "engineered".
- **Manrope** é altamente legível em tamanhos pequenos, ideal para labels, descrições e textos narrativos.

**Regra:** Nunca misturar as duas famílias no mesmo bloco de texto.

---

## 11. Glassmorphism

**Decisão:** Estilo visual para elementos flutuantes (modais, pop-overs, alertas).

**Nota técnica:** `backdropFilter: blur()` não funciona nativamente no React Native. Na POC, glassmorphism é simulado com `rgba` de baixa opacidade + tonal layering. Para blur real, usar `@react-native-community/blur` (BlurView) na Fase 2.

**Onde usar:** Pop-over de detalhe de placa, modais de confirmação, alertas críticos flutuantes. Nos cards normais, apenas mudança de `backgroundColor`.

---

## 12. State Management — Zustand

**Decisão:** Zustand para estado global do app.

**Motivo:** API mínima, sem boilerplate, sem providers, sem actions/reducers. Para uma POC com 2-3 stores simples, Zustand é a escolha mais pragmática. Redux seria overengineering.

**Stores:**
- `vehicleAccessStore` — scanState, scanMode, lastResult
- `userStore` — mock de usuário logado (nome, role, avatar)

---

## 13. Data Fetching — TanStack Query v5

**Decisão:** TanStack Query para todas as requisições HTTP.

**Motivo:** Gerencia cache, loading, error e retry automaticamente. Elimina a necessidade de `useEffect` para fetch de dados (regra absoluta do projeto). `useMutation` para operações de escrita, `useQuery` para leitura.

**Mutations implementadas:**
- `useValidatePlate` — `POST /vehicle-access/validate`
- `useValidateQrCode` — `POST /vehicle-access/validate-qr`
- `useCreateVehicle` — `POST /vehicles`

---

## 14. SQLite como Banco de Dados

**Decisão:** SQLite via Prisma como banco de dados da POC.

**Motivo:** Zero custo operacional, embedded, sem necessidade de servidor de banco. Para uma POC que precisa demonstrar a arquitetura (não a escala), SQLite é ideal. O Prisma abstrai o provider — trocar para PostgreSQL exige apenas mudar o `datasource` no schema.

**Evolução futura:** PostgreSQL em container para ambientes multi-instância. Redis como cache layer na frente.
