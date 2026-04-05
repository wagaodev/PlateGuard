import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { VehiclesService } from '../src/modules/vehicles/vehicles.service';
import { VehiclesRepository } from '../src/modules/vehicles/vehicles.repository';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let repository: jest.Mocked<VehiclesRepository>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByPlate: jest.fn(),
      deleteByPlate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        { provide: VehiclesRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(VehiclesService);
    repository = module.get(VehiclesRepository);
  });

  const mockVehicle = {
    id: '1',
    plate: 'BRA2E19',
    ownerName: 'Wagner Barboza',
    vehicleType: 'car',
    vehicleModel: 'Honda Civic',
    vehicleColor: 'Prata',
    accessType: 'resident',
    status: 'ALLOWED',
    qrCodeToken: null,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  };

  describe('create', () => {
    it('should create a vehicle successfully', async () => {
      repository.findByPlate.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockVehicle);

      const result = await service.create({
        plate: 'BRA2E19',
        ownerName: 'Wagner Barboza',
        vehicleType: 'car',
        vehicleModel: 'Honda Civic',
        vehicleColor: 'Prata',
        accessType: 'resident',
      });

      expect(result).toEqual(mockVehicle);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          plate: 'BRA2E19',
          ownerName: 'Wagner Barboza',
          vehicleType: 'car',
          vehicleModel: 'Honda Civic',
          vehicleColor: 'Prata',
          accessType: 'resident',
          status: 'ALLOWED',
        }),
      );
    });

    it('should normalize plate to uppercase', async () => {
      repository.findByPlate.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockVehicle);

      await service.create({
        plate: 'bra2e19',
        ownerName: 'Wagner Barboza',
      });

      expect(repository.findByPlate).toHaveBeenCalledWith('BRA2E19');
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ plate: 'BRA2E19' }),
      );
    });

    it('should throw ConflictException for duplicate plate', async () => {
      repository.findByPlate.mockResolvedValue(mockVehicle);

      await expect(
        service.create({
          plate: 'BRA2E19',
          ownerName: 'Wagner Barboza',
        }),
      ).rejects.toThrow(ConflictException);

      await expect(
        service.create({
          plate: 'BRA2E19',
          ownerName: 'Wagner Barboza',
        }),
      ).rejects.toThrow('Veículo com placa BRA2E19 já cadastrado');
    });

    it('should set status to DENIED when accessType is blocked', async () => {
      repository.findByPlate.mockResolvedValue(null);
      repository.create.mockResolvedValue({
        ...mockVehicle,
        accessType: 'blocked',
        status: 'DENIED',
      });

      await service.create({
        plate: 'BLQ9A87',
        ownerName: 'Bloqueado',
        accessType: 'blocked',
      });

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          accessType: 'blocked',
          status: 'DENIED',
        }),
      );
    });

    it('should set status to ALLOWED for resident accessType', async () => {
      repository.findByPlate.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockVehicle);

      await service.create({
        plate: 'BRA2E19',
        ownerName: 'Wagner Barboza',
        accessType: 'resident',
      });

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          accessType: 'resident',
          status: 'ALLOWED',
        }),
      );
    });

    it('should set status to ALLOWED for visitor accessType', async () => {
      repository.findByPlate.mockResolvedValue(null);
      repository.create.mockResolvedValue({
        ...mockVehicle,
        accessType: 'visitor',
      });

      await service.create({
        plate: 'XYZ1234',
        ownerName: 'Visitante',
        accessType: 'visitor',
      });

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          accessType: 'visitor',
          status: 'ALLOWED',
        }),
      );
    });

    it('should default accessType to resident when not provided', async () => {
      repository.findByPlate.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockVehicle);

      await service.create({
        plate: 'BRA2E19',
        ownerName: 'Wagner Barboza',
      });

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          accessType: 'resident',
          status: 'ALLOWED',
        }),
      );
    });

    it('should generate QR token when generateQrCode is true', async () => {
      repository.findByPlate.mockResolvedValue(null);
      repository.create.mockResolvedValue({
        ...mockVehicle,
        qrCodeToken: 'generated-uuid',
      });

      await service.create({
        plate: 'BRA2E19',
        ownerName: 'Wagner Barboza',
        generateQrCode: true,
      });

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          qrCodeToken: expect.any(String),
        }),
      );
      // Verify the token is a valid UUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
      const createCall = repository.create.mock.calls[0][0] as Record<
        string,
        unknown
      >;
      expect(createCall.qrCodeToken).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      );
    });

    it('should not generate QR token when generateQrCode is false', async () => {
      repository.findByPlate.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockVehicle);

      await service.create({
        plate: 'BRA2E19',
        ownerName: 'Wagner Barboza',
        generateQrCode: false,
      });

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          qrCodeToken: undefined,
        }),
      );
    });

    it('should not generate QR token when generateQrCode is not provided', async () => {
      repository.findByPlate.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockVehicle);

      await service.create({
        plate: 'BRA2E19',
        ownerName: 'Wagner Barboza',
      });

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          qrCodeToken: undefined,
        }),
      );
    });

    it('should default vehicleType to car when not provided', async () => {
      repository.findByPlate.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockVehicle);

      await service.create({
        plate: 'BRA2E19',
        ownerName: 'Wagner Barboza',
      });

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          vehicleType: 'car',
        }),
      );
    });
  });

  describe('findAll', () => {
    it('should return all vehicles', async () => {
      const vehicles = [
        mockVehicle,
        {
          ...mockVehicle,
          id: '2',
          plate: 'ABC3D45',
          ownerName: 'Maria Silva',
        },
      ];
      repository.findAll.mockResolvedValue(vehicles);

      const result = await service.findAll();

      expect(result).toEqual(vehicles);
      expect(result).toHaveLength(2);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no vehicles exist', async () => {
      repository.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('findByPlate', () => {
    it('should return the vehicle when found', async () => {
      repository.findByPlate.mockResolvedValue(mockVehicle);

      const result = await service.findByPlate('BRA2E19');

      expect(result).toEqual(mockVehicle);
      expect(repository.findByPlate).toHaveBeenCalledWith('BRA2E19');
    });

    it('should normalize plate to uppercase when searching', async () => {
      repository.findByPlate.mockResolvedValue(mockVehicle);

      await service.findByPlate('bra2e19');

      expect(repository.findByPlate).toHaveBeenCalledWith('BRA2E19');
    });

    it('should throw NotFoundException when vehicle is not found', async () => {
      repository.findByPlate.mockResolvedValue(null);

      await expect(service.findByPlate('ZZZ9Z99')).rejects.toThrow(
        NotFoundException,
      );

      await expect(service.findByPlate('ZZZ9Z99')).rejects.toThrow(
        'Veículo com placa ZZZ9Z99 não encontrado',
      );
    });
  });

  describe('deleteByPlate', () => {
    it('should delete the vehicle when found', async () => {
      repository.findByPlate.mockResolvedValue(mockVehicle);
      repository.deleteByPlate.mockResolvedValue(mockVehicle);

      const result = await service.deleteByPlate('BRA2E19');

      expect(result).toEqual(mockVehicle);
      expect(repository.findByPlate).toHaveBeenCalledWith('BRA2E19');
      expect(repository.deleteByPlate).toHaveBeenCalledWith('BRA2E19');
    });

    it('should normalize plate to uppercase when deleting', async () => {
      repository.findByPlate.mockResolvedValue(mockVehicle);
      repository.deleteByPlate.mockResolvedValue(mockVehicle);

      await service.deleteByPlate('bra2e19');

      expect(repository.findByPlate).toHaveBeenCalledWith('BRA2E19');
      expect(repository.deleteByPlate).toHaveBeenCalledWith('BRA2E19');
    });

    it('should throw NotFoundException when vehicle to delete is not found', async () => {
      repository.findByPlate.mockResolvedValue(null);

      await expect(service.deleteByPlate('ZZZ9Z99')).rejects.toThrow(
        NotFoundException,
      );

      await expect(service.deleteByPlate('ZZZ9Z99')).rejects.toThrow(
        'Veículo com placa ZZZ9Z99 não encontrado',
      );
    });

    it('should not call deleteByPlate on repository when vehicle is not found', async () => {
      repository.findByPlate.mockResolvedValue(null);

      try {
        await service.deleteByPlate('ZZZ9Z99');
      } catch {
        // expected
      }

      expect(repository.deleteByPlate).not.toHaveBeenCalled();
    });
  });
});
