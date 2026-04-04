import { Vehicle } from '@prisma/client';
import {
  VehicleAccessResponseDto,
  FeedbackType,
} from '../dto/vehicle-access-response.dto';

export class VehicleAccessMapper {
  static toAllowed(vehicle: Vehicle): VehicleAccessResponseDto {
    return {
      feedbackType: 'ALLOWED',
      allowed: true,
      plate: vehicle.plate,
      message: 'Entrada liberada',
      ownerName: vehicle.ownerName,
      vehicleType: vehicle.vehicleType,
      vehicleModel: vehicle.vehicleModel ?? undefined,
      accessType: vehicle.accessType,
    };
  }

  static toDenied(vehicle: Vehicle): VehicleAccessResponseDto {
    return {
      feedbackType: 'DENIED',
      allowed: false,
      plate: vehicle.plate,
      message: 'Entrada negada',
      reason: 'Veículo não autorizado',
    };
  }

  static toNotFound(plate: string): VehicleAccessResponseDto {
    return {
      feedbackType: 'NOT_FOUND',
      allowed: false,
      plate,
      message: 'Placa não encontrada',
    };
  }

  static toInvalidPlate(): VehicleAccessResponseDto {
    return {
      feedbackType: 'INVALID_PLATE',
      allowed: false,
      plate: '',
      message: 'Formato de placa inválido',
    };
  }

  static toServerError(): VehicleAccessResponseDto {
    return {
      feedbackType: 'SERVER_ERROR',
      allowed: false,
      plate: '',
      message: 'Erro interno. Tente novamente.',
    };
  }

  static feedbackTypeToResult(feedbackType: FeedbackType): string {
    switch (feedbackType) {
      case 'ALLOWED':
        return 'ALLOWED';
      case 'DENIED':
        return 'DENIED';
      default:
        return 'NOT_FOUND';
    }
  }
}
