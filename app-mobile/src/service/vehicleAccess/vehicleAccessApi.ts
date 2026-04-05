import axios from 'axios';
import { API_BASE_URL } from '../../constants/api';
import { VehicleAccessResponse } from '../../types/vehicleAccess.types';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export async function validatePlate(
  plate: string,
  entryMethod = 'CAMERA',
): Promise<VehicleAccessResponse> {
  try {
    const { data } = await api.post<VehicleAccessResponse>(
      '/vehicle-access/validate',
      { plate: plate.toUpperCase().replace(/\s/g, ''), entryMethod },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return error.response.data as VehicleAccessResponse;
    }
    return {
      feedbackType: 'SERVER_ERROR',
      allowed: false,
      plate,
      message: 'Erro de comunicação com o servidor',
    };
  }
}

export async function validateQrCode(
  token: string,
): Promise<VehicleAccessResponse> {
  try {
    const { data } = await api.post<VehicleAccessResponse>(
      '/vehicle-access/validate-qr',
      { token, entryMethod: 'QR_CODE' },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return error.response.data as VehicleAccessResponse;
    }
    return {
      feedbackType: 'SERVER_ERROR',
      allowed: false,
      plate: '',
      message: 'Erro de comunicação com o servidor',
    };
  }
}

export interface CreateVehiclePayload {
  plate: string;
  ownerName: string;
  vehicleType?: string;
  vehicleModel?: string;
  vehicleColor?: string;
  accessType?: string;
  generateQrCode?: boolean;
}

export async function createVehicle(payload: CreateVehiclePayload) {
  const { data } = await api.post('/vehicles', {
    ...payload,
    plate: payload.plate.toUpperCase().replace(/\s/g, ''),
  });
  return data;
}

export async function fetchVehicles() {
  const { data } = await api.get('/vehicles');
  return data;
}

export async function deleteVehicle(plate: string) {
  await api.delete(`/vehicles/${plate.toUpperCase().replace(/\s/g, '')}`);
}
