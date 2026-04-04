# Contrato da API — PlateGuard

> Base URL: `http://localhost:3000`
> Documentação interativa: `http://localhost:3000/api/docs` (Swagger UI)

---

## Autenticação

Nenhuma autenticação na POC. Evolução futura: JWT Bearer token via `@nestjs/jwt`.

---

## Rate Limiting

- **TTL:** 60 segundos
- **Limite:** 10 requisições por TTL por IP
- Headers de resposta: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## Tipo Compartilhado: FeedbackType

```typescript
type FeedbackType = 'ALLOWED' | 'DENIED' | 'NOT_FOUND' | 'INVALID_PLATE' | 'SERVER_ERROR'
```

O mobile **nunca interpreta status HTTP diretamente**. Sempre lê o campo `feedbackType` do payload de resposta.

---

## Endpoints

### POST /vehicle-access/validate

Valida acesso de um veículo por placa.

**Request:**
```json
{
  "plate": "BRA2E19",
  "entryMethod": "CAMERA"
}
```

| Campo | Tipo | Obrigatório | Validação |
|---|---|---|---|
| `plate` | string | sim | Regex `/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/` (Mercosul ou antigo) |
| `entryMethod` | string | não | `"CAMERA"` \| `"QR_CODE"` \| `"MANUAL"` (default: `"CAMERA"`) |

**Responses:**

**200 — ALLOWED**
```json
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
```

**403 — DENIED**
```json
{
  "feedbackType": "DENIED",
  "allowed": false,
  "plate": "BLQ9A87",
  "message": "Entrada negada",
  "reason": "Veículo não autorizado",
  "statusCode": 403,
  "timestamp": "2026-04-03T18:14:46.680Z"
}
```

**404 — NOT_FOUND**
```json
{
  "feedbackType": "NOT_FOUND",
  "allowed": false,
  "plate": "ZZZ9Z99",
  "message": "Placa não encontrada",
  "statusCode": 404,
  "timestamp": "2026-04-03T18:14:46.911Z"
}
```

**400 — INVALID_PLATE**
```json
{
  "feedbackType": "INVALID_PLATE",
  "allowed": false,
  "message": "Formato de placa inválido. Use Mercosul (AAA0A00) ou antigo (AAA0000)",
  "statusCode": 400,
  "timestamp": "2026-04-03T18:14:47.155Z"
}
```

**500 — SERVER_ERROR**
```json
{
  "feedbackType": "SERVER_ERROR",
  "allowed": false,
  "message": "Erro interno. Tente novamente.",
  "statusCode": 500,
  "timestamp": "2026-04-03T18:15:00.000Z"
}
```

---

### POST /vehicle-access/validate-qr

Valida acesso de um veículo por QR Code (token UUID).

**Request:**
```json
{
  "token": "550e8400-e29b-41d4-a716-446655440000"
}
```

| Campo | Tipo | Obrigatório | Validação |
|---|---|---|---|
| `token` | string | sim | UUID v4 válido |

**Responses:** Mesmo contrato do `/validate` (200 ALLOWED, 403 DENIED, 404 NOT_FOUND).

---

### POST /vehicles

Cadastra um novo veículo.

**Request:**
```json
{
  "plate": "BRA2E19",
  "ownerName": "Wagner Barboza",
  "vehicleType": "car",
  "vehicleModel": "Honda Civic",
  "vehicleColor": "Prata",
  "accessType": "resident",
  "generateQrCode": true
}
```

| Campo | Tipo | Obrigatório | Validação |
|---|---|---|---|
| `plate` | string | sim | Regex placa brasileira |
| `ownerName` | string | sim | |
| `vehicleType` | string | não | `"car"` \| `"truck"` \| `"motorcycle"` (default: `"car"`) |
| `vehicleModel` | string | não | |
| `vehicleColor` | string | não | |
| `accessType` | string | não | `"resident"` \| `"visitor"` \| `"blocked"` (default: `"resident"`) |
| `generateQrCode` | boolean | não | Se `true`, gera `qrCodeToken` UUID |

**Responses:**

**201 — Criado**
```json
{
  "id": "uuid",
  "plate": "BRA2E19",
  "ownerName": "Wagner Barboza",
  "vehicleType": "car",
  "vehicleModel": "Honda Civic",
  "vehicleColor": "Prata",
  "accessType": "resident",
  "status": "ALLOWED",
  "qrCodeToken": "uuid-gerado",
  "createdAt": "2026-04-03T18:14:49.659Z",
  "updatedAt": "2026-04-03T18:14:49.659Z"
}
```

**409 — Conflito (placa já cadastrada)**
```json
{
  "statusCode": 409,
  "message": "Veículo com placa BRA2E19 já cadastrado"
}
```

**Regra de status automático:**
- `accessType: "blocked"` → `status: "DENIED"`
- Qualquer outro `accessType` → `status: "ALLOWED"`

---

### GET /vehicles

Lista todos os veículos cadastrados (ordenado por `createdAt` desc).

**Response: 200**
```json
[
  {
    "id": "uuid",
    "plate": "BRA2E19",
    "ownerName": "Wagner Barboza",
    "vehicleType": "car",
    "vehicleModel": "Honda Civic",
    "vehicleColor": "Prata",
    "accessType": "resident",
    "status": "ALLOWED",
    "qrCodeToken": "uuid",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

---

### GET /vehicles/:plate

Busca veículo por placa.

**Response: 200** — Mesmo schema do item acima.

**Response: 404**
```json
{
  "statusCode": 404,
  "message": "Veículo com placa XYZ9999 não encontrado"
}
```

---

### GET /access-logs

Lista histórico de tentativas de acesso.

**Query params:**

| Param | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `plate` | string | não | Filtra logs por placa |

**Response: 200**
```json
[
  {
    "id": "uuid",
    "plate": "BRA2E19",
    "result": "ALLOWED",
    "reason": null,
    "entryMethod": "CAMERA",
    "requestedAt": "2026-04-03T18:14:46.491Z",
    "vehiclePlate": null
  }
]
```

| Campo `result` | Significado |
|---|---|
| `ALLOWED` | Acesso liberado |
| `DENIED` | Acesso negado |
| `NOT_FOUND` | Placa não encontrada no banco |

| Campo `entryMethod` | Significado |
|---|---|
| `CAMERA` | Leitura por câmera/OCR |
| `QR_CODE` | Leitura por QR Code |
| `MANUAL` | Input manual pelo operador |

---

### GET /health

Health check do servidor.

**Response: 200**
```json
{
  "status": "ok",
  "timestamp": "2026-04-03T18:14:46.254Z"
}
```

---

### GET /api/docs

Swagger UI com documentação interativa de todos os endpoints.

---

## Dados de Seed

| Placa | Dono | Status | Tipo Acesso | Modelo | QR Code |
|---|---|---|---|---|---|
| BRA2E19 | Wagner Barboza | ALLOWED | resident | Honda Civic | sim |
| ABC3D45 | Maria Silva | ALLOWED | resident | Toyota Corolla | sim |
| XYZ1234 | João Santos | ALLOWED | visitor | Fiat Uno | sim |
| BLQ9A87 | Bloqueado | DENIED | blocked | — | não |
| PEN5B23 | Pendente | PENDING | resident | — | não |
