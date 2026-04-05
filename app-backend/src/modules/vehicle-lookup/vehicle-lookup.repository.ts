import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class VehicleLookupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByPlate(plate: string) {
    return this.prisma.vehicleLookup.findUnique({ where: { plate } });
  }
}
