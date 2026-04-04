import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { VehiclesRepository } from './vehicles.repository';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(private readonly repository: VehiclesRepository) {}

  async create(dto: CreateVehicleDto) {
    const existing = await this.repository.findByPlate(dto.plate.toUpperCase());
    if (existing) {
      throw new ConflictException(`Veículo com placa ${dto.plate} já cadastrado`);
    }

    const accessType = dto.accessType ?? 'resident';
    const status = accessType === 'blocked' ? 'DENIED' : 'ALLOWED';

    return this.repository.create({
      plate: dto.plate.toUpperCase(),
      ownerName: dto.ownerName,
      vehicleType: dto.vehicleType ?? 'car',
      vehicleModel: dto.vehicleModel,
      vehicleColor: dto.vehicleColor,
      accessType,
      status,
      qrCodeToken: dto.generateQrCode ? randomUUID() : undefined,
    });
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findByPlate(plate: string) {
    const vehicle = await this.repository.findByPlate(plate.toUpperCase());
    if (!vehicle) {
      throw new NotFoundException(`Veículo com placa ${plate} não encontrado`);
    }
    return vehicle;
  }
}
