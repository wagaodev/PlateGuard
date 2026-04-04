import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { animation } from '../../theme/tokens';

export function useFadeInAnimation(delay = 0) {
  const opacity    = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value    = withDelay(delay, withTiming(1, { duration: animation.durationSlow }));
    translateY.value = withDelay(delay, withTiming(0, { duration: animation.durationSlow }));
  }, [delay, opacity, translateY]);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
}
