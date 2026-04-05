import axios from 'axios';
import { API_BASE_URL } from '../../constants/api';
import { VehicleLookupResponse } from '../../types/vehicleLookup.types';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export async function lookupPlate(
  plate: string,
): Promise<VehicleLookupResponse> {
  const normalized = plate.toUpperCase().replace(/\s/g, '');
  const { data } = await api.get<VehicleLookupResponse>(
    `/vehicle-lookup/${normalized}`,
  );
  return data;
}
