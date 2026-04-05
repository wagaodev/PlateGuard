import { useMutation } from '@tanstack/react-query';
import { lookupPlate } from './vehicleLookupApi';

export function useVehicleLookup() {
  return useMutation({
    mutationFn: (plate: string) => lookupPlate(plate),
  });
}
