import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { colors, radii, spacing } from '../../theme/tokens';
import { useScanLineAnimation, usePulseRingAnimation } from '../../hooks/animations';
import { ScanMode } from '../../types/vehicleAccess.types';

interface CameraViewfinderProps {
  scanMode: ScanMode;
  children?: React.ReactNode;
}

const VIEWFINDER_HEIGHT = 220;
const BRACKET_SIZE = 40;
const BRACKET_THICKNESS = 2;

function Bracket({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const isTop = position.includes('t');
  const isLeft = position.includes('l');

  return (
    <View
      style={[
        styles.bracket,
        {
          top:    isTop  ? 0 : undefined,
          bottom: !isTop ? 0 : undefined,
          left:   isLeft ? 0 : undefined,
          right:  !isLeft ? 0 : undefined,
          borderTopWidth:    isTop  ? BRACKET_THICKNESS : 0,
          borderBottomWidth: !isTop ? BRACKET_THICKNESS : 0,
          borderLeftWidth:   isLeft ? BRACKET_THICKNESS : 0,
          borderRightWidth:  !isLeft ? BRACKET_THICKNESS : 0,
        },
      ]}
    />
  );
}

function PulseRing({ delay }: { delay: number }) {
  const ringStyle = usePulseRingAnimation(delay);

  return (
    <Animated.View style={[styles.pulseRing, ringStyle]} />
  );
}

export function CameraViewfinder({ scanMode, children }: CameraViewfinderProps) {
  const scanLineStyle = useScanLineAnimation(VIEWFINDER_HEIGHT);

  return (
    <View style={styles.outerContainer}>
      <PulseRing delay={0} />
      <PulseRing delay={500} />
      <View style={styles.container}>
        <Bracket position="tl" />
        <Bracket position="tr" />
        <Bracket position="bl" />
        <Bracket position="br" />

        <Animated.View style={[styles.scanLine, scanLineStyle]} />

        <View style={styles.content}>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  container: {
    width: '100%',
    height: VIEWFINDER_HEIGHT,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.ghostBorder,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bracket: {
    position: 'absolute',
    width: BRACKET_SIZE,
    height: BRACKET_SIZE,
    borderColor: colors.primary,
  },
  scanLine: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    height: 2,
    backgroundColor: colors.primary,
    opacity: 0.6,
    borderRadius: radii.full,
  },
  pulseRing: {
    position: 'absolute',
    width: '110%',
    height: VIEWFINDER_HEIGHT * 1.1,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
