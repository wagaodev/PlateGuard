import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  await prisma.vehicle.deleteMany();
  await prisma.accessLog.deleteMany();

  const vehicles = [
    {
      plate: 'BRA2O26',
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
  ];

  for (const vehicle of vehicles) {
    await prisma.vehicle.create({ data: vehicle });
  }

  console.log(`✅ Seed concluído: ${vehicles.length} veículos criados`);

  const seeded = await prisma.vehicle.findMany();
  for (const v of seeded) {
    const icon =
      v.status === 'ALLOWED' ? '✅' : v.status === 'DENIED' ? '❌' : '⏳';
    console.log(
      `${icon} ${v.plate} — ${v.ownerName} — ${v.status} — ${v.accessType}${v.qrCodeToken ? ` — QR: ${v.qrCodeToken.slice(0, 8)}...` : ''}`,
    );
  }

  // ─── VehicleLookup (DETRAN fake) ─────────────────────────────
  await prisma.vehicleLookup.deleteMany();

  const lookups = [
    {
      plate: 'BRA2O26',
      brand: 'Honda',
      model: 'Civic EXL 2.0',
      year: 2021,
      color: 'Prata',
      owner: 'Wagner Barboza Goulart',
      fuelType: 'Flex',
      city: 'Gravataí',
      state: 'RS',
      chassi: '9BWZZZ377VT004251',
      renavam: '12345678901',
    },
    {
      plate: 'ABC3D45',
      brand: 'Toyota',
      model: 'Corolla XEi 2.0',
      year: 2022,
      color: 'Branco',
      owner: 'Maria Silva Santos',
      fuelType: 'Flex',
      city: 'Porto Alegre',
      state: 'RS',
      chassi: '9BR53ZEC1N1234567',
      renavam: '23456789012',
    },
    {
      plate: 'XYZ1234',
      brand: 'Fiat',
      model: 'Uno Way 1.0',
      year: 2019,
      color: 'Vermelho',
      owner: 'João Santos Oliveira',
      fuelType: 'Flex',
      city: 'Canoas',
      state: 'RS',
      chassi: '9BD195165G0123456',
      renavam: '34567890123',
    },
    {
      plate: 'BLQ9A87',
      brand: 'Volkswagen',
      model: 'Gol 1.6',
      year: 2017,
      color: 'Preto',
      owner: 'Carlos Eduardo Lima',
      fuelType: 'Flex',
      city: 'Cachoeirinha',
      state: 'RS',
      chassi: '9BWAB45U5JT012345',
      renavam: '45678901234',
    },
    {
      plate: 'PEN5B23',
      brand: 'Chevrolet',
      model: 'Onix Plus 1.0 Turbo',
      year: 2023,
      color: 'Cinza',
      owner: 'Ana Paula Fernandes',
      fuelType: 'Flex',
      city: 'Esteio',
      state: 'RS',
      chassi: '9BGEA48B0NB123456',
      renavam: '56789012345',
    },
  ];

  // QTF6E90 — placa real do Wagner, existe apenas no DETRAN (não registrada no app)
  lookups.push({
    plate: 'QTF6E90',
    brand: 'Volkswagen',
    model: 'Passat Highline 2.0 TSI',
    year: 2018,
    color: 'Branco',
    owner: 'Wagner Barboza Goulart',
    fuelType: 'Gasolina',
    city: 'Gravataí',
    state: 'RS',
    chassi: '9BWZZZ377VT004251',
    renavam: '12345678901',
  });

  for (const lookup of lookups) {
    await prisma.vehicleLookup.create({ data: lookup });
  }

  console.log(`\n✅ DETRAN fake: ${lookups.length} registros criados`);
  for (const l of lookups) {
    console.log(
      `  🚗 ${l.plate} — ${l.brand} ${l.model} (${l.year}) — ${l.owner}`,
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
