import { Module } from '@nestjs/common';
import { VehicleLookupController } from './vehicle-lookup.controller';
import { VehicleLookupService } from './vehicle-lookup.service';
import { VehicleLookupRepository } from './vehicle-lookup.repository';

@Module({
  controllers: [VehicleLookupController],
  providers: [VehicleLookupService, VehicleLookupRepository],
})
export class VehicleLookupModule {}
