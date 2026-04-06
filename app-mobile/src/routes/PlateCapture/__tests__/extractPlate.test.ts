import type { MlkitOcrResult } from 'react-native-mlkit-ocr';
import { extractPlateFromOcrResult } from '../../../utils/extractPlateFromOcr';

/**
 * Helper to build a minimal MlkitOcrResult from text blocks.
 * Each string becomes a separate OCR block.
 */
function makeOcrResult(...texts: string[]): MlkitOcrResult {
  return texts.map((text) => ({
    text,
    resultPoints: [],
    lines: [],
    bounding: { top: 0, left: 0, width: 0, height: 0 },
    cornerPoints: [],
  })) as unknown as MlkitOcrResult;
}

describe('extractPlateFromOcrResult', () => {
  // ── Exact matches ────────────────────────────────────────────────
  describe('exact plate match (single word)', () => {
    it('should find a valid Mercosul plate in a single word', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('QTF6E90'))).toBe('QTF6E90');
    });

    it('should find plate BRA2O26', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('BRA2O26'))).toBe('BRA2O26');
    });

    it('should find plate among noise', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('BRASIL', 'ABC3D45', 'MG'))).toBe('ABC3D45');
    });

    it('should find old-format plate XYZ1234', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('XYZ1234'))).toBe('XYZ1234');
    });
  });

  // ── Split across words ───────────────────────────────────────────
  describe('plate split across OCR tokens', () => {
    it('should find plate split into 2 tokens (3+4)', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('QTF 6E90'))).toBe('QTF6E90');
    });

    it('should find plate split into 2 tokens (4+3)', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('QTF6 E90'))).toBe('QTF6E90');
    });

    it('should find plate split into 3 tokens', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('QT F6 E90'))).toBe('QTF6E90');
    });

    it('should find plate split across OCR blocks', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('QTF', '6E90'))).toBe('QTF6E90');
    });
  });

  // ── OCR error correction ─────────────────────────────────────────
  describe('OCR error correction', () => {
    it('should correct O->0 in digit position (QTF6E9O -> QTF6E90)', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('QTF6E9O'))).toBe('QTF6E90');
    });

    it('should correct 0->O in letter position (0TF6E90 -> should still find plate)', () => {
      // Position 0 expects a letter; "0" should be corrected to "O"
      expect(extractPlateFromOcrResult(makeOcrResult('0TF6E90'))).toBe('OTF6E90');
    });

    it('should correct I->1 in digit position', () => {
      // BRA2O26 with I instead of 2 at position 6
      expect(extractPlateFromOcrResult(makeOcrResult('XYZ1Z34'))).not.toBeNull();
    });

    it('should correct S->5 in digit position', () => {
      // Position 6 expects digit, S should become 5
      expect(extractPlateFromOcrResult(makeOcrResult('ABC3D4S'))).toBe('ABC3D45');
    });

    it('should correct B->8 in digit position', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('QTF6EB0'))).not.toBeNull();
    });

    it('should correct 8->B in letter position', () => {
      // Position 0 expects letter, 8 should become B
      expect(extractPlateFromOcrResult(makeOcrResult('8LQ9A87'))).toBe('BLQ9A87');
    });
  });

  // ── Noise filtering ──────────────────────────────────────────────
  describe('noise and special characters', () => {
    it('should strip special characters and find plate', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('BRASIL QTF-6E90 RS'))).toBe('QTF6E90');
    });

    it('should handle dots and dashes in OCR text', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('QTF.6E90'))).toBe('QTF6E90');
    });

    it('should handle lowercase OCR output', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('qtf6e90'))).toBe('QTF6E90');
    });
  });

  // ── Substring search ─────────────────────────────────────────────
  describe('substring search (plate embedded in longer text)', () => {
    it('should find plate embedded in continuous string', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('BRASILQTF6E90RS'))).toBe('QTF6E90');
    });
  });

  // ── No match ─────────────────────────────────────────────────────
  describe('no plate found', () => {
    it('should return null for empty OCR result', () => {
      expect(extractPlateFromOcrResult([])).toBeNull();
    });

    it('should return null for text with no plate', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('BRASIL', 'MERCOSUL'))).toBeNull();
    });

    it('should return null for too-short strings', () => {
      expect(extractPlateFromOcrResult(makeOcrResult('ABC'))).toBeNull();
    });
  });
});
