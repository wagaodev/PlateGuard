import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VehicleLookupService } from './vehicle-lookup.service';
import { VehicleLookupResponseDto } from './dto/vehicle-lookup-response.dto';

@ApiTags('vehicle-lookup')
@Controller('vehicle-lookup')
export class VehicleLookupController {
  constructor(private readonly service: VehicleLookupService) {}

  @Get(':plate')
  @ApiOperation({ summary: 'Consultar veículo no DETRAN (simulado)' })
  @ApiResponse({ status: 200, type: VehicleLookupResponseDto })
  @ApiResponse({ status: 404, description: 'Placa não encontrada no DETRAN' })
  async lookup(
    @Param('plate') plate: string,
  ): Promise<VehicleLookupResponseDto> {
    return this.service.lookupByPlate(plate);
  }
}
