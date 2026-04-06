import { Injectable } from '@nestjs/common';
import { VehicleLookup } from '@prisma/client';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class VehicleLookupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByPlate(plate: string): Promise<VehicleLookup | null> {
    return this.prisma.vehicleLookup.findUnique({ where: { plate } });
  }
}
