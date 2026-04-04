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
} as const;
