import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { VehicleLookupService } from '../src/modules/vehicle-lookup/vehicle-lookup.service';
import { VehicleLookupRepository } from '../src/modules/vehicle-lookup/vehicle-lookup.repository';

describe('VehicleLookupService', () => {
  let service: VehicleLookupService;
  let repository: jest.Mocked<VehicleLookupRepository>;

  beforeEach(async () => {
    jest.useFakeTimers();

    const mockRepository = {
      findByPlate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleLookupService,
        { provide: VehicleLookupRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(VehicleLookupService);
    repository = module.get(VehicleLookupRepository);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockVehicleLookupRecord = {
    id: '1',
    plate: 'BRA2E19',
    brand: 'Honda',
    model: 'Civic EXL 2.0',
    year: 2021,
    color: 'Prata',
    owner: 'Wagner Barboza Goulart',
    fuelType: 'Flex',
    city: 'Gravatai',
    state: 'RS',
    chassi: '9BWZZZ377VT004251',
    renavam: '12345678901',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  };

  describe('lookupByPlate', () => {
    it('should return correct data when plate is found', async () => {
      repository.findByPlate.mockResolvedValue(mockVehicleLookupRecord);

      const promise = service.lookupByPlate('BRA2E19');
      jest.runAllTimers();
      const result = await promise;

      expect(result.plate).toBe('BRA2E19');
      expect(result.brand).toBe('Honda');
      expect(result.model).toBe('Civic EXL 2.0');
      expect(result.year).toBe(2021);
      expect(result.color).toBe('Prata');
      expect(result.owner).toBe('Wagner Barboza Goulart');
      expect(result.fuelType).toBe('Flex');
      expect(result.city).toBe('Gravatai');
      expect(result.state).toBe('RS');
      expect(result.chassi).toBe('9BWZZZ377VT004251');
      expect(result.renavam).toBe('12345678901');
    });

    it('should normalize plate to uppercase', async () => {
      repository.findByPlate.mockResolvedValue(mockVehicleLookupRecord);

      const promise = service.lookupByPlate('bra2e19');
      jest.runAllTimers();
      await promise;

      expect(repository.findByPlate).toHaveBeenCalledWith('BRA2E19');
    });

    it('should strip non-alphanumeric characters from plate', async () => {
      repository.findByPlate.mockResolvedValue(mockVehicleLookupRecord);

      const promise = service.lookupByPlate('BRA-2E19');
      jest.runAllTimers();
      await promise;

      expect(repository.findByPlate).toHaveBeenCalledWith('BRA2E19');
    });

    it('should throw NotFoundException when plate is not found', async () => {
      repository.findByPlate.mockResolvedValue(null);

      const promise = service.lookupByPlate('ZZZ9Z99');
      jest.runAllTimers();

      await expect(promise).rejects.toThrow(NotFoundException);
      await expect(
        (async () => {
          repository.findByPlate.mockResolvedValue(null);
          const p = service.lookupByPlate('ZZZ9Z99');
          jest.runAllTimers();
          return p;
        })(),
      ).rejects.toThrow('Veículo com placa ZZZ9Z99 não encontrado no DETRAN');
    });

    it('should include a simulated delay before querying the repository', async () => {
      repository.findByPlate.mockResolvedValue(mockVehicleLookupRecord);

      const promise = service.lookupByPlate('BRA2E19');

      // Before timers advance, findByPlate should not have been called yet
      expect(repository.findByPlate).not.toHaveBeenCalled();

      jest.runAllTimers();
      await promise;

      // After timers advance, findByPlate should have been called
      expect(repository.findByPlate).toHaveBeenCalledTimes(1);
    });

    it('should map all fields correctly from repository record to response DTO', async () => {
      const customRecord = {
        id: '42',
        plate: 'ABC3D45',
        brand: 'Toyota',
        model: 'Corolla XEi',
        year: 2023,
        color: 'Branco',
        owner: 'Maria Silva',
        fuelType: 'Gasolina',
        city: 'Porto Alegre',
        state: 'RS',
        chassi: '1HGBH41JXMN109186',
        renavam: '99887766554',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };
      repository.findByPlate.mockResolvedValue(customRecord);

      const promise = service.lookupByPlate('ABC3D45');
      jest.runAllTimers();
      const result = await promise;

      // The response DTO should not include the 'id' field from the record
      expect(result).toEqual({
        plate: 'ABC3D45',
        brand: 'Toyota',
        model: 'Corolla XEi',
        year: 2023,
        color: 'Branco',
        owner: 'Maria Silva',
        fuelType: 'Gasolina',
        city: 'Porto Alegre',
        state: 'RS',
        chassi: '1HGBH41JXMN109186',
        renavam: '99887766554',
      });
      expect(
        (result as unknown as Record<string, unknown>)['id'],
      ).toBeUndefined();
    });
  });
});
