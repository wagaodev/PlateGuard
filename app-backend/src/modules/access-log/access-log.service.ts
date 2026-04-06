import { Injectable } from '@nestjs/common';
import { AccessLog } from '@prisma/client';
import { AccessLogRepository } from './access-log.repository';

@Injectable()
export class AccessLogService {
  constructor(private readonly repository: AccessLogRepository) {}

  async log(data: {
    plate: string;
    result: string;
    reason?: string;
    entryMethod: string;
  }): Promise<AccessLog> {
    return this.repository.create(data);
  }

  async getByPlate(plate: string): Promise<AccessLog[]> {
    return this.repository.findByPlate(plate);
  }

  async getAll(): Promise<AccessLog[]> {
    return this.repository.findAll();
  }
}
