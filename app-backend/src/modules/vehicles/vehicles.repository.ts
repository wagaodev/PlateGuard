import { Injectable } from '@nestjs/common';
import { Vehicle, Prisma } from '@prisma/client';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class VehiclesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.VehicleCreateInput): Promise<Vehicle> {
    return this.prisma.vehicle.create({ data });
  }

  async findAll(): Promise<Vehicle[]> {
    return this.prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    return this.prisma.vehicle.findUnique({ where: { plate } });
  }

  async deleteByPlate(plate: string): Promise<Vehicle> {
    return this.prisma.vehicle.delete({ where: { plate } });
  }
}
