import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  await prisma.vehicle.deleteMany()
  await prisma.accessLog.deleteMany()

  const vehicles = [
    {
      plate: 'BRA2E19',
      ownerName: 'Wagner Barboza',
      vehicleType: 'car',
      vehicleModel: 'Honda Civic',
      vehicleColor: 'Prata',
      accessType: 'resident',
      status: 'ALLOWED',
      qrCodeToken: randomUUID(),
    },
    {
      plate: 'ABC3D45',
      ownerName: 'Maria Silva',
      vehicleType: 'car',
      vehicleModel: 'Toyota Corolla',
      vehicleColor: 'Branco',
      accessType: 'resident',
      status: 'ALLOWED',
      qrCodeToken: randomUUID(),
    },
    {
      plate: 'XYZ1234',
      ownerName: 'João Santos',
      vehicleType: 'car',
      vehicleModel: 'Fiat Uno',
      vehicleColor: 'Vermelho',
      accessType: 'visitor',
      status: 'ALLOWED',
      qrCodeToken: randomUUID(),
    },
    {
      plate: 'BLQ9A87',
      ownerName: 'Bloqueado',
      vehicleType: 'car',
      vehicleModel: undefined,
      vehicleColor: undefined,
      accessType: 'blocked',
      status: 'DENIED',
      qrCodeToken: undefined,
    },
    {
      plate: 'PEN5B23',
      ownerName: 'Pendente',
      vehicleType: 'car',
      vehicleModel: undefined,
      vehicleColor: undefined,
      accessType: 'resident',
      status: 'PENDING',
      qrCodeToken: undefined,
    },
  ]

  for (const vehicle of vehicles) {
    await prisma.vehicle.create({ data: vehicle })
  }

  console.log(`✅ Seed concluído: ${vehicles.length} veículos criados`)

  const seeded = await prisma.vehicle.findMany()
  for (const v of seeded) {
    const icon = v.status === 'ALLOWED' ? '✅' : v.status === 'DENIED' ? '❌' : '⏳'
    console.log(`${icon} ${v.plate} — ${v.ownerName} — ${v.status} — ${v.accessType}${v.qrCodeToken ? ` — QR: ${v.qrCodeToken.slice(0, 8)}...` : ''}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
