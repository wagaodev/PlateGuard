import { PLATE_REGEX } from '../constants/plate';

export function validatePlateFormat(plate: string): boolean {
  const clean = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return PLATE_REGEX.test(clean);
}

export function normalizePlate(plate: string): string {
  return plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
