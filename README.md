# PlateGuard — Monorepo

> **Claude Code:** Leia este arquivo inteiro antes de qualquer ação.
> A ordem de leitura abaixo é obrigatória.

---

## Ordem de Leitura Obrigatória

```
1. README.md        ← você está aqui
2. CLAUDE.md        ← arquitetura, regras, backend, mobile, ordem de implementação
3. LAYOUT.md        ← design system, tokens, componentes visuais, telas
```

Não escreva nenhuma linha de código antes de ler os três arquivos.
Em caso de conflito entre CLAUDE.md e LAYOUT.md, o LAYOUT.md prevalece para decisões visuais.

---

## O que é este projeto

PlateGuard é um sistema de controle de acesso veicular por leitura de placa.

- O app mobile aponta a câmera para uma placa (OCR on-device) **ou** lê um QR Code
- Envia a placa para um backend NestJS
- Exibe feedback visual: entrada liberada ou negada

É uma POC com arquitetura profissional e escalável. O objetivo é demonstrar maturidade técnica.

---

## Estrutura do Monorepo

```
scan-plate/
├── README.md               ← leia primeiro (este arquivo)
├── CLAUDE.md               ← leia segundo
├── LAYOUT.md               ← leia terceiro
├── plate-guard-api/        ← backend NestJS (criar)
├── plate-guard-app/        ← mobile React Native CLI (criar)
└── docs/
    ├── decisions.md        ← decisões técnicas com justificativa
    ├── api-contract.md     ← contrato completo da API
    ├── architecture.md     ← diagrama de arquitetura
    └── roadmap.md          ← fases do projeto
```

---

## Stack Resumida

| Lado | Tech |
|---|---|
| Backend | NestJS + TypeScript + Prisma + SQLite + Docker + Swagger |
| Mobile | React Native CLI + TypeScript + Zustand + TanStack Query + Reanimated |
| Design | Space Grotesk + Manrope + glassmorphism + azul elétrico `#adc6ff` |

---

## Por onde começar

Após ler os três arquivos, siga a **Ordem de Implementação** definida no `CLAUDE.md` (Parte 6).

O primeiro passo é o backend. O segundo é o design system do mobile (tokens + fontes).
Nenhuma tela é criada antes do design system estar completo.

---

## Idioma

- **Código:** inglês (variáveis, funções, arquivos, pastas, comentários inline)
- **Documentação:** português (README, docs/, commits, comentários explicativos)
- **App (textos da UI):** português brasileiro

---

## Commits

Padrão Conventional Commits em português:

```
feat: implementa endpoint de validação de placa
fix: corrige regex para formato Mercosul
docs: adiciona decisions.md com justificativa do QR Code
chore: configura docker-compose e Dockerfile
refactor: extrai BrazilianPlate para componente reutilizável
test: adiciona testes unitários do VehicleAccessService
style: aplica tokens de tema em FeedbackScreen
```
