import { VehicleAccessResponse } from '../../types/vehicleAccess.types';
import { CreateVehiclePayload } from '../vehicleAccess/vehicleAccessApi';

describe('vehicleAccessApi', () => {
  const mockGet = jest.fn();
  const mockPost = jest.fn();
  const mockDelete = jest.fn();
  const mockIsAxiosError = jest.fn(() => false);

  let validatePlate: (plate: string, entryMethod?: string) => Promise<VehicleAccessResponse>;
  let validateQrCode: (token: string) => Promise<VehicleAccessResponse>;
  let createVehicle: (payload: CreateVehiclePayload) => Promise<unknown>;
  let fetchVehicles: () => Promise<unknown>;
  let deleteVehicle: (plate: string) => Promise<void>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    mockIsAxiosError.mockReturnValue(false);

    jest.doMock('axios', () => ({
      __esModule: true,
      default: {
        create: jest.fn(() => ({
          get: mockGet,
          post: mockPost,
          delete: mockDelete,
        })),
        isAxiosError: mockIsAxiosError,
      },
    }));

    const mod = require('../vehicleAccess/vehicleAccessApi');
    validatePlate = mod.validatePlate;
    validateQrCode = mod.validateQrCode;
    createVehicle = mod.createVehicle;
    fetchVehicles = mod.fetchVehicles;
    deleteVehicle = mod.deleteVehicle;
  });

  const mockAllowedResponse: VehicleAccessResponse = {
    feedbackType: 'ALLOWED',
    allowed: true,
    plate: 'BRA2E19',
    message: 'Entrada liberada',
    ownerName: 'Wagner Barboza',
    vehicleType: 'car',
    vehicleModel: 'Honda Civic',
    accessType: 'resident',
  };

  describe('validatePlate', () => {
    it('calls POST /vehicle-access/validate with plate and entryMethod', async () => {
      mockPost.mockResolvedValue({ data: mockAllowedResponse });
      await validatePlate('BRA2E19', 'CAMERA');
      expect(mockPost).toHaveBeenCalledWith('/vehicle-access/validate', {
        plate: 'BRA2E19',
        entryMethod: 'CAMERA',
      });
    });

    it('defaults entryMethod to CAMERA', async () => {
      mockPost.mockResolvedValue({ data: mockAllowedResponse });
      await validatePlate('BRA2E19');
      expect(mockPost).toHaveBeenCalledWith('/vehicle-access/validate', {
        plate: 'BRA2E19',
        entryMethod: 'CAMERA',
      });
    });

    it('normalizes plate', async () => {
      mockPost.mockResolvedValue({ data: mockAllowedResponse });
      await validatePlate('bra 2e19', 'MANUAL');
      expect(mockPost).toHaveBeenCalledWith('/vehicle-access/validate', {
        plate: 'BRA2E19',
        entryMethod: 'MANUAL',
      });
    });

    it('returns response on success', async () => {
      mockPost.mockResolvedValue({ data: mockAllowedResponse });
      const result = await validatePlate('BRA2E19');
      expect(result).toEqual(mockAllowedResponse);
    });

    it('returns error data when axios error has response data', async () => {
      const denied: VehicleAccessResponse = { feedbackType: 'DENIED', allowed: false, plate: 'BLQ9A87', message: 'Negado' };
      mockIsAxiosError.mockReturnValue(true);
      mockPost.mockRejectedValue({ response: { data: denied } });
      const result = await validatePlate('BLQ9A87');
      expect(result).toEqual(denied);
    });

    it('returns SERVER_ERROR on network failure', async () => {
      mockIsAxiosError.mockReturnValue(true);
      mockPost.mockRejectedValue({ response: undefined });
      const result = await validatePlate('BRA2E19');
      expect(result.feedbackType).toBe('SERVER_ERROR');
    });

    it('returns SERVER_ERROR for non-axios errors', async () => {
      mockIsAxiosError.mockReturnValue(false);
      mockPost.mockRejectedValue(new Error('Unknown'));
      const result = await validatePlate('BRA2E19');
      expect(result.feedbackType).toBe('SERVER_ERROR');
    });
  });

  describe('validateQrCode', () => {
    it('calls POST with token and QR_CODE', async () => {
      mockPost.mockResolvedValue({ data: mockAllowedResponse });
      await validateQrCode('token-123');
      expect(mockPost).toHaveBeenCalledWith('/vehicle-access/validate-qr', {
        token: 'token-123',
        entryMethod: 'QR_CODE',
      });
    });

    it('returns response on success', async () => {
      mockPost.mockResolvedValue({ data: mockAllowedResponse });
      const result = await validateQrCode('token');
      expect(result).toEqual(mockAllowedResponse);
    });

    it('returns SERVER_ERROR on failure', async () => {
      mockIsAxiosError.mockReturnValue(true);
      mockPost.mockRejectedValue({ response: undefined });
      const result = await validateQrCode('bad');
      expect(result.feedbackType).toBe('SERVER_ERROR');
    });
  });

  describe('createVehicle', () => {
    it('calls POST /vehicles', async () => {
      mockPost.mockResolvedValue({ data: { id: '1' } });
      await createVehicle({ plate: 'BRA2E19', ownerName: 'Wagner' });
      expect(mockPost).toHaveBeenCalledWith('/vehicles', expect.objectContaining({ plate: 'BRA2E19' }));
    });

    it('normalizes plate', async () => {
      mockPost.mockResolvedValue({ data: {} });
      await createVehicle({ plate: 'bra 2e19', ownerName: 'Test' });
      expect(mockPost).toHaveBeenCalledWith('/vehicles', expect.objectContaining({ plate: 'BRA2E19' }));
    });
  });

  describe('fetchVehicles', () => {
    it('calls GET /vehicles', async () => {
      mockGet.mockResolvedValue({ data: [{ plate: 'BRA2E19' }] });
      const result = await fetchVehicles();
      expect(mockGet).toHaveBeenCalledWith('/vehicles');
      expect(result).toEqual([{ plate: 'BRA2E19' }]);
    });
  });

  describe('deleteVehicle', () => {
    it('calls DELETE with normalized plate', async () => {
      mockDelete.mockResolvedValue({});
      await deleteVehicle('bra 2e19');
      expect(mockDelete).toHaveBeenCalledWith('/vehicles/BRA2E19');
    });
  });
});
