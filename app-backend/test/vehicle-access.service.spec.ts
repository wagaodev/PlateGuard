import { Test, TestingModule } from '@nestjs/testing';
import { VehicleAccessService } from '../src/modules/vehicle-access/vehicle-access.service';
import { VehicleAccessRepository } from '../src/modules/vehicle-access/vehicle-access.repository';
import { AccessLogService } from '../src/modules/access-log/access-log.service';

describe('VehicleAccessService', () => {
  let service: VehicleAccessService;
  let repository: jest.Mocked<VehicleAccessRepository>;
  let accessLogService: jest.Mocked<AccessLogService>;

  beforeEach(async () => {
    const mockRepository = {
      findByPlate: jest.fn(),
      findByQrToken: jest.fn(),
    };

    const mockAccessLogService = {
      log: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleAccessService,
        { provide: VehicleAccessRepository, useValue: mockRepository },
        { provide: AccessLogService, useValue: mockAccessLogService },
      ],
    }).compile();

    service = module.get(VehicleAccessService);
    repository = module.get(VehicleAccessRepository);
    accessLogService = module.get(AccessLogService);
  });

  describe('validatePlate', () => {
    it('should return ALLOWED for a registered vehicle with status ALLOWED', async () => {
      repository.findByPlate.mockResolvedValue({
        id: '1',
        plate: 'BRA2E19',
        ownerName: 'Wagner Barboza',
        vehicleType: 'car',
        vehicleModel: 'Honda Civic',
        vehicleColor: 'Prata',
        accessType: 'resident',
        status: 'ALLOWED',
        qrCodeToken: 'token-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.validatePlate('BRA2E19', 'CAMERA');

      expect(result.feedbackType).toBe('ALLOWED');
      expect(result.allowed).toBe(true);
      expect(result.plate).toBe('BRA2E19');
      expect(result.ownerName).toBe('Wagner Barboza');
      expect(result.vehicleModel).toBe('Honda Civic');
      expect(accessLogService.log).toHaveBeenCalledWith({
        plate: 'BRA2E19',
        result: 'ALLOWED',
        reason: undefined,
        entryMethod: 'CAMERA',
      });
    });

    it('should return DENIED for a blocked vehicle', async () => {
      repository.findByPlate.mockResolvedValue({
        id: '2',
        plate: 'BLQ9A87',
        ownerName: 'Bloqueado',
        vehicleType: 'car',
        vehicleModel: null,
        vehicleColor: null,
        accessType: 'blocked',
        status: 'DENIED',
        qrCodeToken: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.validatePlate('BLQ9A87', 'MANUAL');

      expect(result.feedbackType).toBe('DENIED');
      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('Veículo não autorizado');
      expect(accessLogService.log).toHaveBeenCalledWith({
        plate: 'BLQ9A87',
        result: 'DENIED',
        reason: 'Veículo não autorizado',
        entryMethod: 'MANUAL',
      });
    });

    it('should return NOT_FOUND for an unknown plate', async () => {
      repository.findByPlate.mockResolvedValue(null);

      const result = await service.validatePlate('ZZZ9Z99', 'CAMERA');

      expect(result.feedbackType).toBe('NOT_FOUND');
      expect(result.allowed).toBe(false);
      expect(result.plate).toBe('ZZZ9Z99');
      expect(accessLogService.log).toHaveBeenCalledWith({
        plate: 'ZZZ9Z99',
        result: 'NOT_FOUND',
        reason: undefined,
        entryMethod: 'CAMERA',
      });
    });

    it('should normalize plate to uppercase', async () => {
      repository.findByPlate.mockResolvedValue(null);

      await service.validatePlate('bra2e19', 'CAMERA');

      expect(repository.findByPlate).toHaveBeenCalledWith('BRA2E19');
    });

    it('should default entryMethod to CAMERA', async () => {
      repository.findByPlate.mockResolvedValue(null);

      await service.validatePlate('ZZZ9Z99');

      expect(accessLogService.log).toHaveBeenCalledWith(
        expect.objectContaining({ entryMethod: 'CAMERA' }),
      );
    });
  });

  describe('validateQrCode', () => {
    it('should return ALLOWED for a valid QR token', async () => {
      repository.findByQrToken.mockResolvedValue({
        id: '1',
        plate: 'BRA2E19',
        ownerName: 'Wagner Barboza',
        vehicleType: 'car',
        vehicleModel: 'Honda Civic',
        vehicleColor: 'Prata',
        accessType: 'resident',
        status: 'ALLOWED',
        qrCodeToken: 'valid-token',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.validateQrCode('valid-token');

      expect(result.feedbackType).toBe('ALLOWED');
      expect(result.allowed).toBe(true);
      expect(accessLogService.log).toHaveBeenCalledWith(
        expect.objectContaining({ entryMethod: 'QR_CODE' }),
      );
    });

    it('should return NOT_FOUND for an invalid QR token', async () => {
      repository.findByQrToken.mockResolvedValue(null);

      const result = await service.validateQrCode('invalid-token');

      expect(result.feedbackType).toBe('NOT_FOUND');
      expect(result.allowed).toBe(false);
    });
  });
});
