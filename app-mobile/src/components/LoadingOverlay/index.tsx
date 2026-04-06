import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { styles } from './styles';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  subtitle?: string;
}

export function LoadingOverlay({
  visible,
  message = 'Carregando...',
  subtitle,
}: LoadingOverlayProps) {
  const ringScale = useSharedValue(1);
  const ringOpacity = useSharedValue(0.6);
  const dotScale = useSharedValue(1);
  const overlayOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      overlayOpacity.value = withTiming(1, { duration: 200 });
      ringScale.value = withRepeat(
        withTiming(1.3, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
      ringOpacity.value = withRepeat(
        withTiming(0.15, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
      dotScale.value = withRepeat(
        withSequence(
          withDelay(200, withTiming(0.7, { duration: 500 })),
          withTiming(1, { duration: 500 }),
        ),
        -1,
        false,
      );
    } else {
      overlayOpacity.value = withTiming(0, { duration: 150 });
    }
  }, [visible, overlayOpacity, ringScale, ringOpacity, dotScale]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
    pointerEvents: visible ? ('auto' as const) : ('none' as const),
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dotScale.value }],
  }));

  return (
    <Animated.View style={[styles.overlay, overlayStyle]}>
      <View style={styles.container}>
        <Animated.View style={[styles.pulseRing, ringStyle]}>
          <Animated.View style={[styles.innerDot, dotStyle]} />
        </Animated.View>
        <Text style={styles.message}>{message}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </Animated.View>
  );
}
