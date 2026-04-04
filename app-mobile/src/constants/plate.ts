export const PLATE_REGEX = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

export const PLATE_MASK_LENGTH = 7;

export function formatPlate(raw: string): string {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (clean.length >= 4) {
    return `${clean.slice(0, 3)} ${clean.slice(3, 7)}`;
  }
  return clean;
}

export function isValidPlate(plate: string): boolean {
  return PLATE_REGEX.test(plate.toUpperCase().replace(/\s/g, ''));
}
