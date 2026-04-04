import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class VehicleAccessRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByPlate(plate: string) {
    return this.prisma.vehicle.findUnique({ where: { plate } });
  }

  async findByQrToken(qrCodeToken: string) {
    return this.prisma.vehicle.findUnique({ where: { qrCodeToken } });
  }
}
