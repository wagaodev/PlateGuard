import { Injectable } from '@nestjs/common';
import { Vehicle } from '@prisma/client';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class VehicleAccessRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByPlate(plate: string): Promise<Vehicle | null> {
    return this.prisma.vehicle.findUnique({ where: { plate } });
  }

  async findByQrToken(qrCodeToken: string): Promise<Vehicle | null> {
    return this.prisma.vehicle.findUnique({ where: { qrCodeToken } });
  }
}
