import { Module } from '@nestjs/common';
import { VehicleAccessController } from './vehicle-access.controller';
import { VehicleAccessService } from './vehicle-access.service';
import { VehicleAccessRepository } from './vehicle-access.repository';
import { AccessLogModule } from '../access-log/access-log.module';

@Module({
  imports: [AccessLogModule],
  controllers: [VehicleAccessController],
  providers: [VehicleAccessService, VehicleAccessRepository],
})
export class VehicleAccessModule {}
