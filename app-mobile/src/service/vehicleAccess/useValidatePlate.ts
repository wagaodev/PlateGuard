import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { validatePlate, validateQrCode, createVehicle, fetchVehicles, deleteVehicle, CreateVehiclePayload } from './vehicleAccessApi';

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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateVehiclePayload) => createVehicle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
}

export function useVehicles() {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  });
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (plate: string) => deleteVehicle(plate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
}
