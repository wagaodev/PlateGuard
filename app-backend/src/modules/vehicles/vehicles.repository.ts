import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VehiclesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.VehicleCreateInput) {
    return this.prisma.vehicle.create({ data });
  }

  async findAll() {
    return this.prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByPlate(plate: string) {
    return this.prisma.vehicle.findUnique({ where: { plate } });
  }
}
