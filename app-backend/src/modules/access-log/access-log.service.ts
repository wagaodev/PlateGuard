import { Injectable } from '@nestjs/common';
import { AccessLogRepository } from './access-log.repository';

@Injectable()
export class AccessLogService {
  constructor(private readonly repository: AccessLogRepository) {}

  async log(data: {
    plate: string;
    result: string;
    reason?: string;
    entryMethod: string;
  }) {
    return this.repository.create(data);
  }

  async getByPlate(plate: string) {
    return this.repository.findByPlate(plate);
  }

  async getAll() {
    return this.repository.findAll();
  }
}
