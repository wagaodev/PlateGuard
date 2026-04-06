import { apiClient } from '../apiClient';
import { VehicleLookupResponse } from '../../types/vehicleLookup.types';

export async function lookupPlate(
  plate: string,
): Promise<VehicleLookupResponse> {
  const normalized = plate.toUpperCase().replace(/\s/g, '');
  const { data } = await apiClient.get<VehicleLookupResponse>(
    `/vehicle-lookup/${normalized}`,
  );
  return data;
}
