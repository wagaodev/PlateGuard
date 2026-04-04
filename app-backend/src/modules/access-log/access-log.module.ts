import { Module } from '@nestjs/common';
import { AccessLogController } from './access-log.controller';
import { AccessLogService } from './access-log.service';
import { AccessLogRepository } from './access-log.repository';

@Module({
  controllers: [AccessLogController],
  providers: [AccessLogService, AccessLogRepository],
  exports: [AccessLogService],
})
export class AccessLogModule {}
