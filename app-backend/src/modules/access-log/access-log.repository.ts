import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class AccessLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    plate: string;
    result: string;
    reason?: string;
    entryMethod: string;
  }) {
    return this.prisma.accessLog.create({ data });
  }

  async findByPlate(plate: string) {
    return this.prisma.accessLog.findMany({
      where: { plate },
      orderBy: { requestedAt: 'desc' },
    });
  }

  async findAll() {
    return this.prisma.accessLog.findMany({
      orderBy: { requestedAt: 'desc' },
    });
  }
}
