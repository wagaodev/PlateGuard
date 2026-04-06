import type { MlkitOcrResult } from 'react-native-mlkit-ocr';
import { PLATE_REGEX } from '../constants/plate';

/**
 * Common OCR misreadings for Brazilian plates.
 * Maps characters that OCR frequently confuses.
 */
const OCR_CORRECTIONS: Record<string, string[]> = {
  '0': ['O', 'D', 'Q'],
  'O': ['0', 'D', 'Q'],
  '1': ['I', 'L', '7'],
  'I': ['1', 'L'],
  '5': ['S'],
  'S': ['5'],
  '8': ['B'],
  'B': ['8'],
  '6': ['G'],
  'G': ['6'],
  '2': ['Z'],
  'Z': ['2'],
  '4': ['A'],
};

/**
 * Applies common OCR error corrections to a candidate string
 * and returns the corrected plate if it matches the Brazilian plate regex.
 *
 * Brazilian Mercosul plate format: AAA0A00
 *   positions 0-2: letters
 *   position 3:    digit
 *   position 4:    letter or digit
 *   position 5-6:  digits
 */
export function applyOcrCorrections(candidate: string): string | null {
  if (candidate.length !== 7) return null;

  // Direct match — no corrections needed
  if (PLATE_REGEX.test(candidate)) return candidate;

  const chars = candidate.split('');
  const corrected = chars.map((ch, i) => {
    // Positions 0-2 must be letters — fix digits that should be letters
    if (i < 3) {
      if (/[0-9]/.test(ch)) {
        const alternatives = OCR_CORRECTIONS[ch];
        const letterAlt = alternatives?.find((a) => /[A-Z]/.test(a));
        return letterAlt ?? ch;
      }
      return ch;
    }
    // Position 3 must be a digit — fix letters that should be digits
    if (i === 3) {
      if (/[A-Z]/.test(ch)) {
        const alternatives = OCR_CORRECTIONS[ch];
        const digitAlt = alternatives?.find((a) => /[0-9]/.test(a));
        return digitAlt ?? ch;
      }
      return ch;
    }
    // Position 4 can be letter or digit — leave as-is
    if (i === 4) return ch;
    // Positions 5-6 must be digits — fix letters that should be digits
    if (/[A-Z]/.test(ch)) {
      const alternatives = OCR_CORRECTIONS[ch];
      const digitAlt = alternatives?.find((a) => /[0-9]/.test(a));
      return digitAlt ?? ch;
    }
    return ch;
  });

  const result = corrected.join('');
  if (PLATE_REGEX.test(result)) return result;

  return null;
}

/**
 * Extracts a valid Brazilian plate from OCR text blocks.
 *
 * Strategy:
 * 1. Try individual words (exact match)
 * 2. Try individual words with OCR error correction
 * 3. Try concatenating 2 adjacent words (OCR splits "BRA 2E19")
 * 4. Try concatenating 3 adjacent words (OCR splits "BR A2 E19")
 * 5. Try all substrings of length 7 from the full text
 */
export function extractPlateFromOcrResult(ocrResult: MlkitOcrResult): string | null {
  const allText = ocrResult.map((block) => block.text).join(' ');
  const cleanText = allText.toUpperCase().replace(/[^A-Z0-9\s]/g, '');
  const words = cleanText.split(/\s+/).filter(Boolean);

  // 1. Try individual words — exact match
  for (const word of words) {
    if (PLATE_REGEX.test(word)) {
      return word;
    }
  }

  // 2. Try individual words with OCR correction
  for (const word of words) {
    if (word.length === 7) {
      const corrected = applyOcrCorrections(word);
      if (corrected) return corrected;
    }
  }

  // 3. Try concatenating 2 adjacent words
  for (let i = 0; i < words.length - 1; i++) {
    const combined = words[i] + words[i + 1];
    if (PLATE_REGEX.test(combined)) {
      return combined;
    }
    if (combined.length === 7) {
      const corrected = applyOcrCorrections(combined);
      if (corrected) return corrected;
    }
  }

  // 4. Try concatenating 3 adjacent words
  for (let i = 0; i < words.length - 2; i++) {
    const combined = words[i] + words[i + 1] + words[i + 2];
    if (PLATE_REGEX.test(combined)) {
      return combined;
    }
    if (combined.length === 7) {
      const corrected = applyOcrCorrections(combined);
      if (corrected) return corrected;
    }
  }

  // 5. Try all 7-char substrings from the concatenated clean text (no spaces)
  const noSpaces = cleanText.replace(/\s/g, '');
  for (let i = 0; i <= noSpaces.length - 7; i++) {
    const sub = noSpaces.substring(i, i + 7);
    if (PLATE_REGEX.test(sub)) {
      return sub;
    }
    const corrected = applyOcrCorrections(sub);
    if (corrected) return corrected;
  }

  return null;
}
