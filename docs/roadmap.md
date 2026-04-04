# Roadmap — PlateGuard

---

## Fase 1 — POC Funcional (atual)

> Status: **Concluída**

### Backend
- [x] NestJS + TypeScript strict
- [x] Prisma + SQLite + migrations
- [x] Seed com 5 veículos (3 ALLOWED, 1 DENIED, 1 PENDING)
- [x] Módulo `vehicle-access` — validação por placa e QR Code
- [x] Módulo `vehicles` — CRUD (POST + GET + GET/:plate)
- [x] Módulo `access-log` — registro de toda tentativa com entryMethod
- [x] Módulo `health` — healthcheck
- [x] Rate limiting (ThrottlerGuard)
- [x] CORS habilitado
- [x] Filtro global de exceções com feedbackType
- [x] Swagger UI em /api/docs
- [x] Docker + docker-compose
- [x] 18 testes (7 unitários + 11 E2E)

### Mobile
- [x] React Native CLI 0.84 (sem Expo)
- [x] Design system completo (tokens azul elétrico, Space Grotesk + Manrope)
- [x] 7 componentes reutilizáveis (GlassCard, BrazilianPlate, AppHeader, BottomNavBar, ScanModeToggle, CameraViewfinder, FeedbackIcon)
- [x] 5 hooks de animação (Reanimated v3)
- [x] 4 telas completas (ScanPlate, Feedback, Profile, VehicleRegistration)
- [x] Navegação Stack + BottomTabs
- [x] Camada de serviço (Axios + TanStack Query mutations)
- [x] Zustand stores (vehicleAccess + user)
- [x] Locales pt-BR
- [x] Input manual com preview de placa em tempo real
- [x] Chips de simulação (demo) para todas as placas do seed

### Documentação
- [x] README.md — visão geral e ordem de leitura
- [x] CLAUDE.md — arquitetura completa
- [x] LAYOUT.md — design system implementável
- [x] DESIGN.md — filosofia visual
- [x] docs/decisions.md — 14 decisões técnicas documentadas
- [x] docs/api-contract.md — contrato completo da API
- [x] docs/roadmap.md — este arquivo

---

## Fase 2 — OCR + Camera Real

> Status: Planejada

### OCR On-Device
- [ ] Instalar `react-native-mlkit-ocr`
- [ ] Instalar `react-native-vision-camera` v4
- [ ] Frame processing com regex de placa brasileira
- [ ] Debounce de 500ms para evitar validações duplicadas
- [ ] Fallback automático para input manual após 10s sem reconhecimento
- [ ] Indicador visual de confiança do OCR (borda verde/amarela no viewfinder)

### QR Code Scanner
- [ ] Integrar leitor de QR Code via Vision Camera
- [ ] Decodificar token UUID do QR
- [ ] Validar via `POST /vehicle-access/validate-qr`

### Melhorias Visuais
- [ ] Glassmorphism real com `@react-native-community/blur` (BlurView)
- [ ] Haptic feedback (vibração) no resultado da validação
- [ ] Animação de transição entre ScanPlate → Feedback (shared element)

---

## Fase 3 — Autenticação + Multi-Tenant

> Status: Futuro

### Autenticação
- [ ] JWT com refresh token
- [ ] Tela de login com biometria (Face ID / Fingerprint)
- [ ] Roles: admin, operador, morador
- [ ] Middleware de autorização por role

### Multi-Tenant
- [ ] Suporte a múltiplos condomínios/portarias
- [ ] Isolamento de dados por tenant
- [ ] Administração por condomínio

### Backend
- [ ] Migrar SQLite → PostgreSQL
- [ ] Redis como cache layer (TTL 5min para placas frequentes)
- [ ] Circuit breaker para integrações externas (opossum)
- [ ] Logs estruturados (Pino/Winston)
- [ ] Health check avançado (banco, cache, uptime)

---

## Fase 4 — Integrações Externas

> Status: Futuro

### DETRAN API
- [ ] Consulta de situação do veículo (regular, irregular, roubado)
- [ ] Cache de consultas com TTL de 24h
- [ ] Circuit breaker com fallback para dados locais

### Cancela Física
- [ ] Integração via MQTT ou HTTP com controlador de cancela
- [ ] Abertura automática para veículos ALLOWED
- [ ] Timeout de segurança (cancela fecha após 30s)

### Notificações Push
- [ ] Firebase Cloud Messaging (FCM)
- [ ] Notificar morador quando seu veículo é escaneado
- [ ] Notificar admin sobre tentativas DENIED

### Mensageria
- [ ] RabbitMQ para side-effects assíncronos
- [ ] Consumer de auditoria (grava em banco analítico)
- [ ] Consumer de notificação
- [ ] Consumer de integração com cancela

---

## Fase 5 — Dashboard Admin

> Status: Futuro

### Web Admin (Next.js)
- [ ] Dashboard com métricas em tempo real
- [ ] Gráficos de acessos por hora/dia
- [ ] Gestão de veículos (CRUD completo)
- [ ] Gestão de moradores e visitantes
- [ ] Relatórios exportáveis (PDF/CSV)
- [ ] Mapa de calor de horários de pico

### Analytics
- [ ] Tempo médio de validação
- [ ] Taxa de sucesso/falha por método (câmera, QR, manual)
- [ ] Placas mais frequentes
- [ ] Alertas automáticos para padrões suspeitos
