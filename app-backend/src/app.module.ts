import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { PrismaModule } from './shared/prisma.module';
import { GlobalExceptionFilter } from './shared/filters/http-exception.filter';
import { VehicleAccessModule } from './modules/vehicle-access/vehicle-access.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { AccessLogModule } from './modules/access-log/access-log.module';
import { HealthModule } from './modules/health/health.module';
import { VehicleLookupModule } from './modules/vehicle-lookup/vehicle-lookup.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env['THROTTLE_TTL'] ?? '60', 10) * 1000,
        limit: parseInt(process.env['THROTTLE_LIMIT'] ?? '10', 10),
      },
    ]),
    PrismaModule,
    VehicleAccessModule,
    VehiclesModule,
    AccessLogModule,
    VehicleLookupModule,
    HealthModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
  ],
})
export class AppModule {}
