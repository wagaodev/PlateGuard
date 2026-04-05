import { VehicleLookupResponse } from '../../types/vehicleLookup.types';

describe('lookupPlate', () => {
  const mockGet = jest.fn();

  let lookupPlate: (plate: string) => Promise<VehicleLookupResponse>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    jest.doMock('axios', () => ({
      __esModule: true,
      default: {
        create: jest.fn(() => ({
          get: mockGet,
          post: jest.fn(),
          delete: jest.fn(),
        })),
      },
    }));

    const mod = require('../vehicleLookup/vehicleLookupApi');
    lookupPlate = mod.lookupPlate;
  });

  const mockResponse: VehicleLookupResponse = {
    plate: 'BRA2E19',
    brand: 'Honda',
    model: 'Civic EXL 2.0',
    year: 2021,
    color: 'Prata',
    owner: 'Wagner Barboza Goulart',
    fuelType: 'Flex',
    city: 'Gravataí',
    state: 'RS',
    chassi: '9BWZZZ377VT004251',
    renavam: '12345678901',
  };

  it('calls GET /vehicle-lookup/:plate with normalized plate', async () => {
    mockGet.mockResolvedValue({ data: mockResponse });
    await lookupPlate('BRA2E19');
    expect(mockGet).toHaveBeenCalledWith('/vehicle-lookup/BRA2E19');
  });

  it('normalizes plate by uppercasing and removing spaces', async () => {
    mockGet.mockResolvedValue({ data: mockResponse });
    await lookupPlate('bra 2e19');
    expect(mockGet).toHaveBeenCalledWith('/vehicle-lookup/BRA2E19');
  });

  it('returns VehicleLookupResponse on success', async () => {
    mockGet.mockResolvedValue({ data: mockResponse });
    const result = await lookupPlate('BRA2E19');
    expect(result).toEqual(mockResponse);
    expect(result.brand).toBe('Honda');
  });

  it('throws on 404', async () => {
    mockGet.mockRejectedValue(new Error('Request failed with status code 404'));
    await expect(lookupPlate('ZZZ9Z99')).rejects.toThrow('404');
  });

  it('throws on network error', async () => {
    mockGet.mockRejectedValue(new Error('Network Error'));
    await expect(lookupPlate('BRA2E19')).rejects.toThrow('Network Error');
  });
});
