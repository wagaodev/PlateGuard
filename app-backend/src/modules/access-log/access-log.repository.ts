import { Injectable } from '@nestjs/common';
import { AccessLog } from '@prisma/client';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class AccessLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    plate: string;
    result: string;
    reason?: string;
    entryMethod: string;
  }): Promise<AccessLog> {
    return this.prisma.accessLog.create({ data });
  }

  async findByPlate(plate: string): Promise<AccessLog[]> {
    return this.prisma.accessLog.findMany({
      where: { plate },
      orderBy: { requestedAt: 'desc' },
    });
  }

  async findAll(): Promise<AccessLog[]> {
    return this.prisma.accessLog.findMany({
      orderBy: { requestedAt: 'desc' },
    });
  }
}
