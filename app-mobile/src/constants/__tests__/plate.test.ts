import { PLATE_REGEX, PLATE_MASK_LENGTH, formatPlate, isValidPlate } from '../plate';

describe('PLATE_REGEX', () => {
  it('matches valid Mercosul plates', () => {
    expect(PLATE_REGEX.test('BRA2E19')).toBe(true);
    expect(PLATE_REGEX.test('ABC3D45')).toBe(true);
    expect(PLATE_REGEX.test('XYZ1234')).toBe(true);
  });

  it('rejects plates with lowercase letters', () => {
    expect(PLATE_REGEX.test('bra2e19')).toBe(false);
  });

  it('rejects plates that are too short', () => {
    expect(PLATE_REGEX.test('ABC')).toBe(false);
    expect(PLATE_REGEX.test('ABC1')).toBe(false);
  });

  it('rejects plates that are too long', () => {
    expect(PLATE_REGEX.test('ABC1D234')).toBe(false);
  });

  it('rejects plates with special characters', () => {
    expect(PLATE_REGEX.test('ABC-1D23')).toBe(false);
    expect(PLATE_REGEX.test('ABC.1D23')).toBe(false);
  });

  it('rejects plates starting with numbers', () => {
    expect(PLATE_REGEX.test('1BC2E19')).toBe(false);
  });
});

describe('PLATE_MASK_LENGTH', () => {
  it('equals 7', () => {
    expect(PLATE_MASK_LENGTH).toBe(7);
  });
});

describe('formatPlate', () => {
  it('returns uppercased input when shorter than 4 chars', () => {
    expect(formatPlate('ab')).toBe('AB');
    expect(formatPlate('abc')).toBe('ABC');
    expect(formatPlate('a')).toBe('A');
  });

  it('returns empty string for empty input', () => {
    expect(formatPlate('')).toBe('');
  });

  it('formats 7-char plates with space after 3rd char', () => {
    expect(formatPlate('BRA2E19')).toBe('BRA 2E19');
    expect(formatPlate('ABC3D45')).toBe('ABC 3D45');
  });

  it('formats plates with 4+ chars by inserting space', () => {
    expect(formatPlate('ABCD')).toBe('ABC D');
    expect(formatPlate('ABC12')).toBe('ABC 12');
  });

  it('handles mixed case input by uppercasing', () => {
    expect(formatPlate('bra2e19')).toBe('BRA 2E19');
    expect(formatPlate('aBc3d45')).toBe('ABC 3D45');
  });

  it('strips non-alphanumeric characters', () => {
    expect(formatPlate('BR-A2E19')).toBe('BRA 2E19');
    expect(formatPlate('ABC 3D45')).toBe('ABC 3D45');
    expect(formatPlate('A.B.C.1234')).toBe('ABC 1234');
  });

  it('truncates to 7 chars max in the output slot', () => {
    expect(formatPlate('BRA2E19XX')).toBe('BRA 2E19');
  });
});

describe('isValidPlate', () => {
  it('accepts valid Mercosul plates', () => {
    expect(isValidPlate('BRA2E19')).toBe(true);
    expect(isValidPlate('ABC3D45')).toBe(true);
    expect(isValidPlate('XYZ1234')).toBe(true);
  });

  it('accepts valid plates with old format (all digits after letters)', () => {
    expect(isValidPlate('ABC1234')).toBe(true);
  });

  it('accepts lowercase input (normalizes internally)', () => {
    expect(isValidPlate('bra2e19')).toBe(true);
    expect(isValidPlate('abc3d45')).toBe(true);
  });

  it('handles spaces in input by stripping them', () => {
    expect(isValidPlate('BRA 2E19')).toBe(true);
    expect(isValidPlate('ABC 3D45')).toBe(true);
    expect(isValidPlate(' BRA2E19 ')).toBe(true);
  });

  it('rejects plates that are too short', () => {
    expect(isValidPlate('AB')).toBe(false);
    expect(isValidPlate('ABC')).toBe(false);
    expect(isValidPlate('ABC1')).toBe(false);
  });

  it('rejects plates with wrong format', () => {
    expect(isValidPlate('1234567')).toBe(false);
    expect(isValidPlate('ABCDEFG')).toBe(false);
    expect(isValidPlate('12AB34C')).toBe(false);
  });

  it('rejects plates with special characters', () => {
    expect(isValidPlate('ABC-1D23')).toBe(false);
    expect(isValidPlate('ABC!1234')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidPlate('')).toBe(false);
  });
});
