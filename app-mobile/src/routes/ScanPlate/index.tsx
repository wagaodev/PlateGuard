import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrazilianPlate } from '../../components/BrazilianPlate';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { usePulseRingAnimation } from '../../hooks/animations';
import { commonMessages } from '../../locales/pt-BR/common';
import { colors, spacing, animation } from '../../theme/tokens';
import { useUserStore } from '../../store/userStore';
import { useScanPlate } from './useScanPlate';
import { styles } from './styles';

const DEMO_PLATES = ['BRA2O26', 'ABC3D45', 'XYZ1234', 'BLQ9A87', 'QTF6E90'];

const VIEWFINDER_CAMERA_HEIGHT = 200;
const VIEWFINDER_QR_HEIGHT = 240;
const BRACKET_THICKNESS = 3;

function Bracket({ position, color }: { position: 'tl' | 'tr' | 'bl' | 'br'; color: string }) {
  const isTop = position.includes('t');
  const isLeft = position.includes('l');

  return (
    <View
      style={[
        styles.bracket,
        {
          top: isTop ? 0 : undefined,
          bottom: !isTop ? 0 : undefined,
          left: isLeft ? 0 : undefined,
          right: !isLeft ? 0 : undefined,
          borderTopWidth: isTop ? BRACKET_THICKNESS : 0,
          borderBottomWidth: !isTop ? BRACKET_THICKNESS : 0,
          borderLeftWidth: isLeft ? BRACKET_THICKNESS : 0,
          borderRightWidth: !isLeft ? BRACKET_THICKNESS : 0,
          borderColor: color,
        },
      ]}
    />
  );
}

function PulseRing({ delay, height }: { delay: number; height: number }) {
  const ringStyle = usePulseRingAnimation(delay);
  return (
    <Animated.View
      style={[
        styles.pulseRing,
        {
          width: '108%',
          height: height * 1.08,
          borderColor: '#FF6B35',
        },
        ringStyle,
      ]}
    />
  );
}

function ToggleTab({
  label,
  icon,
  isActive,
  onPress,
}: {
  label: string;
  icon: string;
  isActive: boolean;
  onPress: () => void;
}) {
  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      isActive ? '#FF6B35' : 'transparent',
      { duration: animation.durationNormal },
    ),
  }));

  return (
    <TouchableOpacity onPress={onPress} style={styles.toggleTouchable}>
      <Animated.View style={[styles.toggleButton, bgStyle]}>
        <Text style={styles.toggleIcon}>{icon}</Text>
        <Text style={isActive ? styles.toggleTextActive : styles.toggleTextInactive}>
          {label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export function ScanPlateScreen() {
  const {
    scanMode,
    handleModeChange,
    manualPlate,
    setManualPlate,
    showManualInput,
    setShowManualInput,
    handleManualSubmit,
    handleSimulatedScan,
    isValidating,
  } = useScanPlate();

  const { name, avatarUri } = useUserStore();
  const firstName = name.split(' ')[0];
  const [inputFocused, setInputFocused] = useState(false);

  const isCamera = scanMode === 'CAMERA';
  const bracketColor = '#FF6B35';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {isCamera ? (
        <View style={[styles.header, styles.headerCameraMode]}>
          <Text style={styles.headerLabel}>ACESSO</Text>
          <Text style={styles.headerGreeting}>
            {commonMessages.greeting}, {firstName} {'👋'}
          </Text>
        </View>
      ) : (
        <View style={[styles.header, styles.headerQrMode]}>
          <View style={styles.headerQrLeft}>
            <View
              style={[
                styles.headerAvatar,
                !avatarUri && styles.headerAvatarPlaceholder,
              ]}
            >
              {avatarUri ? (
                <Image
                  source={{ uri: avatarUri }}
                  style={[styles.headerAvatar, { borderWidth: 0 }]}
                />
              ) : (
                <Text style={styles.headerAvatarText}>{firstName[0]}</Text>
              )}
            </View>
            <View style={styles.headerQrTextContainer}>
              <Text style={styles.headerQrTitle}>{commonMessages.location}</Text>
              <Text style={styles.headerQrSubtitle}>SENTINEL ACCESS</Text>
            </View>
          </View>
          <View style={styles.headerBellContainer}>
            <Text style={styles.headerBellIcon}>{'🔔'}</Text>
          </View>
        </View>
      )}

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.xxl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.toggleWrapper}>
          <View style={styles.toggleContainer}>
            <ToggleTab
              label="Câmera"
              icon="📷"
              isActive={scanMode === 'CAMERA'}
              onPress={() => handleModeChange('CAMERA')}
            />
            <ToggleTab
              label="QR Code"
              icon="📱"
              isActive={scanMode === 'QR_CODE'}
              onPress={() => handleModeChange('QR_CODE')}
            />
          </View>
        </View>

        <View style={styles.viewfinderOuter}>
          <View style={styles.pulseRingContainer}>
            <PulseRing
              delay={0}
              height={isCamera ? VIEWFINDER_CAMERA_HEIGHT : VIEWFINDER_QR_HEIGHT}
            />
            <PulseRing
              delay={500}
              height={isCamera ? VIEWFINDER_CAMERA_HEIGHT : VIEWFINDER_QR_HEIGHT}
            />
          </View>

          <View
            style={[
              styles.viewfinderContainer,
              isCamera ? styles.viewfinderCamera : styles.viewfinderQr,
            ]}
          >
            <Bracket position="tl" color={bracketColor} />
            <Bracket position="tr" color={bracketColor} />
            <Bracket position="bl" color={bracketColor} />
            <Bracket position="br" color={bracketColor} />

            <View style={styles.viewfinderContent}>
              {isCamera ? (
                manualPlate.replace(/\s/g, '').length >= 3 ? (
                  <BrazilianPlate plate={manualPlate.replace(/\s/g, '')} size="md" />
                ) : (
                  <BrazilianPlate plate="BRA2O26" size="md" />
                )
              ) : (
                <View style={styles.qrIconContainer}>
                  <Text style={styles.qrIconText}>{'📱'}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {!isCamera && (
          <View style={styles.utilityRow}>
            <View style={styles.utilityButton}>
              <Text style={styles.utilityIcon}>{'🔦'}</Text>
            </View>
            <View style={styles.utilityButton}>
              <Text style={styles.utilityIcon}>{'🖼'}</Text>
            </View>
          </View>
        )}

        {isCamera && (
          <>
            {!showManualInput ? (
              <TouchableOpacity
                style={styles.manualButton}
                onPress={() => setShowManualInput(true)}
              >
                <Text style={styles.manualButtonIcon}>{'⌨️'}</Text>
                <Text style={styles.manualButtonText}>
                  {commonMessages.manualEntry}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.manualInputContainer}>
                <TextInput
                  style={[
                    styles.manualInput,
                    inputFocused && styles.manualInputFocused,
                  ]}
                  value={manualPlate}
                  onChangeText={setManualPlate}
                  placeholder="AAA0A00"
                  placeholderTextColor={colors.textMuted}
                  maxLength={7}
                  autoCapitalize="characters"
                  autoFocus={true}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                />
                {manualPlate.replace(/\s/g, '').length >= 3 && (
                  <View style={styles.manualPlatePreview}>
                    <BrazilianPlate plate={manualPlate.replace(/\s/g, '')} size="sm" />
                  </View>
                )}
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    { opacity: manualPlate.length < 7 ? 0.5 : 1 },
                  ]}
                  onPress={handleManualSubmit}
                  disabled={manualPlate.replace(/\s/g, '').length < 7 || isValidating}
                >
                  <Text style={styles.submitButtonText}>
                    {isValidating ? 'Validando...' : 'Validar Placa'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {isCamera && (
          <View style={styles.recentSection}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentTitle}>Últimos Acessos</Text>
              <TouchableOpacity>
                <Text style={styles.recentViewAll}>VER TUDO</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.recentCard}>
              <View style={styles.recentIconContainer}>
                <Text style={styles.recentIcon}>{'✅'}</Text>
              </View>
              <View style={styles.recentInfo}>
                <Text style={styles.recentPlate}>ABC-1234</Text>
                <Text style={styles.recentMeta}>Entrada liberada - 19:20</Text>
              </View>
              <Text style={styles.recentArrow}>{'›'}</Text>
            </View>
          </View>
        )}

        <View style={styles.simulateContainer}>
          <Text style={styles.simulateTitle}>Simular leitura (POC)</Text>
          <View style={styles.simulateRow}>
            {DEMO_PLATES.map((plate) => (
              <TouchableOpacity
                key={plate}
                style={styles.simulateChip}
                onPress={() => handleSimulatedScan(plate)}
                disabled={isValidating}
              >
                <Text style={styles.simulateChipText}>{plate}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <LoadingOverlay
        visible={isValidating}
        message="Validando placa..."
        subtitle="Consultando sistema de acesso"
      />
    </SafeAreaView>
  );
}
