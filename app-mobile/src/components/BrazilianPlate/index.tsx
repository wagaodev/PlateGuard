import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { radii, typography } from '../../theme/tokens';

type PlateSize = 'sm' | 'md' | 'lg';

interface BrazilianPlateProps {
  plate: string;
  size?: PlateSize;
}

const sizes = {
  sm: { width: 120, height: 48,  fontSize: 16, strip: 14, padding: 4  },
  md: { width: 180, height: 68,  fontSize: 22, strip: 18, padding: 6  },
  lg: { width: 240, height: 90,  fontSize: 28, strip: 22, padding: 8  },
};

export function BrazilianPlate({ plate, size = 'md' }: BrazilianPlateProps) {
  const s = sizes[size];
  const formatted = plate.length >= 7
    ? `${plate.slice(0, 3)} ${plate.slice(3)}`
    : plate;

  return (
    <View style={[styles.container, { width: s.width, height: s.height, borderRadius: radii.sm }]}>
      <View style={[styles.mercosulBand, { width: s.strip }]} />
      <View style={styles.body}>
        <View style={[styles.topStrip, { height: s.strip }]}>
          <Text style={[styles.countryText, { fontSize: s.strip * 0.6 }]}>BRASIL</Text>
        </View>
        <View style={styles.plateBody}>
          <Text style={[styles.plateText, { fontSize: s.fontSize }]}>{formatted}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#1a1a2e',
    backgroundColor: '#FFFFFF',
  },
  mercosulBand: {
    backgroundColor: '#009B3A',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
  },
  topStrip: {
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryText: {
    color: '#FFFFFF',
    fontFamily: typography.fontBody,
    fontWeight: typography.weightBold,
    letterSpacing: 1,
  },
  plateBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  plateText: {
    fontFamily:    typography.plateFont,
    fontWeight:    typography.plateWeight,
    color:         '#1a1a2e',
    letterSpacing: typography.plateSpacing,
  },
});
