import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VehicleAccessService } from './vehicle-access.service';
import { ValidatePlateDto } from './dto/validate-plate.dto';
import { ValidateQrDto } from './dto/validate-qr.dto';
import { VehicleAccessResponseDto } from './dto/vehicle-access-response.dto';

/**
 * Throws the appropriate HTTP exception based on feedbackType.
 * Controller delegates business logic, but maps domain results to HTTP semantics.
 */
function throwIfNotAllowed(result: VehicleAccessResponseDto): void {
  if (result.feedbackType === 'DENIED') {
    throw new ForbiddenException({
      ...result,
      statusCode: HttpStatus.FORBIDDEN,
    });
  }

  if (result.feedbackType === 'NOT_FOUND') {
    throw new NotFoundException({
      ...result,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

@ApiTags('vehicle-access')
@Controller('vehicle-access')
export class VehicleAccessController {
  constructor(private readonly service: VehicleAccessService) {}

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validar acesso de veículo por placa' })
  @ApiResponse({
    status: 200,
    description: 'Acesso liberado',
    type: VehicleAccessResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Placa não encontrada' })
  @ApiResponse({ status: 400, description: 'Formato de placa inválido' })
  async validate(
    @Body() dto: ValidatePlateDto,
  ): Promise<VehicleAccessResponseDto> {
    const result = await this.service.validatePlate(
      dto.plate,
      dto.entryMethod ?? 'CAMERA',
    );

    throwIfNotAllowed(result);

    return result;
  }

  @Post('validate-qr')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validar acesso de veículo por QR Code' })
  @ApiResponse({
    status: 200,
    description: 'Acesso liberado',
    type: VehicleAccessResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'QR Code não encontrado' })
  async validateQr(
    @Body() dto: ValidateQrDto,
  ): Promise<VehicleAccessResponseDto> {
    const result = await this.service.validateQrCode(dto.token);

    throwIfNotAllowed(result);

    return result;
  }
}
