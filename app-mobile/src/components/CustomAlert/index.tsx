import React, { useEffect } from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { animation } from '../../theme/tokens';
import { styles } from './styles';

export interface CustomAlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export interface CustomAlertProps {
  visible: boolean;
  title: string;
  message?: string;
  buttons?: CustomAlertButton[];
  onDismiss?: () => void;
  icon?: string;
}

const DEFAULT_BUTTONS: CustomAlertButton[] = [{ text: 'OK', style: 'default' }];

export function CustomAlert({
  visible,
  title,
  message,
  buttons = DEFAULT_BUTTONS,
  onDismiss,
  icon,
}: CustomAlertProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, {
        duration: animation.durationNormal,
        easing: Easing.out(Easing.ease),
      });
      scale.value = withTiming(1, {
        duration: animation.durationNormal,
        easing: Easing.out(Easing.back(1.2)),
      });
    } else {
      opacity.value = withTiming(0, { duration: animation.durationFast });
      scale.value = withTiming(0.9, { duration: animation.durationFast });
    }
  }, [visible, opacity, scale]);

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handleButtonPress(button: CustomAlertButton) {
    button.onPress?.();
    onDismiss?.();
  }

  function getButtonStyle(buttonStyle?: CustomAlertButton['style']) {
    switch (buttonStyle) {
      case 'cancel':
        return styles.buttonCancel;
      case 'destructive':
        return styles.buttonDestructive;
      default:
        return styles.buttonDefault;
    }
  }

  function getButtonTextStyle(buttonStyle?: CustomAlertButton['style']) {
    switch (buttonStyle) {
      case 'cancel':
        return styles.buttonTextCancel;
      case 'destructive':
        return styles.buttonTextDestructive;
      default:
        return styles.buttonTextDefault;
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      <Animated.View style={[styles.overlay, overlayAnimatedStyle]}>
        <Animated.View style={[styles.container, containerAnimatedStyle]}>
          {icon ? (
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>{icon}</Text>
            </View>
          ) : null}

          <Text style={[styles.title, !message && styles.titleOnly]}>
            {title}
          </Text>

          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.buttonsRow}>
            {buttons.map((button, index) => (
              <Pressable
                key={`${button.text}-${index}`}
                style={[styles.buttonBase, getButtonStyle(button.style)]}
                onPress={() => handleButtonPress(button)}
              >
                <Text style={getButtonTextStyle(button.style)}>
                  {button.text}
                </Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
