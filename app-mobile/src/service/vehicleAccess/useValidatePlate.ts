import { useMutation } from '@tanstack/react-query';
import { validatePlate, validateQrCode, createVehicle, CreateVehiclePayload } from './vehicleAccessApi';

export function useValidatePlate() {
  return useMutation({
    mutationFn: ({ plate, entryMethod }: { plate: string; entryMethod?: string }) =>
      validatePlate(plate, entryMethod),
  });
}

export function useValidateQrCode() {
  return useMutation({
    mutationFn: ({ token }: { token: string }) => validateQrCode(token),
  });
}

export function useCreateVehicle() {
  return useMutation({
    mutationFn: (payload: CreateVehiclePayload) => createVehicle(payload),
  });
}
