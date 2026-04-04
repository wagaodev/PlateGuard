import { Injectable, Logger } from '@nestjs/common';
import { VehicleAccessRepository } from './vehicle-access.repository';
import { AccessLogService } from '../access-log/access-log.service';
import { VehicleAccessMapper } from './mappers/vehicle-access.mapper';
import { VehicleAccessResponseDto } from './dto/vehicle-access-response.dto';

@Injectable()
export class VehicleAccessService {
  private readonly logger = new Logger(VehicleAccessService.name);

  constructor(
    private readonly repository: VehicleAccessRepository,
    private readonly accessLogService: AccessLogService,
  ) {}

  async validatePlate(
    plate: string,
    entryMethod = 'CAMERA',
  ): Promise<VehicleAccessResponseDto> {
    const normalizedPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

    const vehicle = await this.repository.findByPlate(normalizedPlate);

    let response: VehicleAccessResponseDto;

    if (!vehicle) {
      response = VehicleAccessMapper.toNotFound(normalizedPlate);
    } else if (vehicle.status === 'ALLOWED') {
      response = VehicleAccessMapper.toAllowed(vehicle);
    } else {
      response = VehicleAccessMapper.toDenied(vehicle);
    }

    await this.accessLogService.log({
      plate: normalizedPlate,
      result: VehicleAccessMapper.feedbackTypeToResult(response.feedbackType),
      reason: response.reason,
      entryMethod,
    });

    this.logger.log(
      `Validate plate=${normalizedPlate} method=${entryMethod} result=${response.feedbackType}`,
    );

    return response;
  }

  async validateQrCode(token: string): Promise<VehicleAccessResponseDto> {
    const vehicle = await this.repository.findByQrToken(token);

    let response: VehicleAccessResponseDto;

    if (!vehicle) {
      response = VehicleAccessMapper.toNotFound('QR_TOKEN');
    } else if (vehicle.status === 'ALLOWED') {
      response = VehicleAccessMapper.toAllowed(vehicle);
    } else {
      response = VehicleAccessMapper.toDenied(vehicle);
    }

    await this.accessLogService.log({
      plate: vehicle?.plate ?? 'UNKNOWN',
      result: VehicleAccessMapper.feedbackTypeToResult(response.feedbackType),
      reason: response.reason,
      entryMethod: 'QR_CODE',
    });

    this.logger.log(
      `Validate QR token=${token.slice(0, 8)}... result=${response.feedbackType}`,
    );

    return response;
  }
}
