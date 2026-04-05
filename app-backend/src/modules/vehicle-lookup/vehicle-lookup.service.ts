import { Injectable, NotFoundException } from '@nestjs/common';
import { VehicleLookupRepository } from './vehicle-lookup.repository';
import { VehicleLookupResponseDto } from './dto/vehicle-lookup-response.dto';

@Injectable()
export class VehicleLookupService {
  constructor(private readonly repository: VehicleLookupRepository) {}

  async lookupByPlate(plate: string): Promise<VehicleLookupResponseDto> {
    const normalized = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

    // Simulates external DETRAN API latency (2s)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const record = await this.repository.findByPlate(normalized);

    if (!record) {
      throw new NotFoundException(
        `Veículo com placa ${normalized} não encontrado no DETRAN`,
      );
    }

    return {
      plate: record.plate,
      brand: record.brand,
      model: record.model,
      year: record.year,
      color: record.color,
      owner: record.owner,
      fuelType: record.fuelType,
      city: record.city,
      state: record.state,
      chassi: record.chassi,
      renavam: record.renavam,
    };
  }
}
