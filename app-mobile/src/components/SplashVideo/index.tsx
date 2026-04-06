import React, { useCallback } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Video from 'react-native-video';
import { colors } from '../../theme/tokens';

const splashSource = require('../../assets/videos/splash.mp4');

interface SplashVideoProps {
  onFinish: () => void;
}

export function SplashVideo({ onFinish }: SplashVideoProps) {
  const handleEnd = useCallback(() => {
    onFinish();
  }, [onFinish]);

  const handleError = useCallback(() => {
    onFinish();
  }, [onFinish]);

  return (
    <View style={videoStyles.container}>
      <StatusBar hidden />
      <Video
        source={splashSource}
        style={videoStyles.video}
        resizeMode="cover"
        onEnd={handleEnd}
        onError={handleError}
        repeat={false}
        controls={false}
        muted={false}
        playInBackground={false}
        playWhenInactive={false}
      />
    </View>
  );
}

const videoStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surfaceDim,
    zIndex: 9999,
  },
  video: {
    flex: 1,
  },
});
