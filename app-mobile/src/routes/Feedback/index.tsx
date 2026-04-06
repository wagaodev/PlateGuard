import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrazilianPlate } from '../../components/BrazilianPlate';
import { useFadeInAnimation, useSuccessAnimation } from '../../hooks/animations';
import { commonMessages } from '../../locales/pt-BR/common';
import { useFeedback } from './useFeedback';
import { styles } from './styles';

export function FeedbackScreen() {
  const { result, config, detailRows, messages, handleNewScan } = useFeedback();

  const fadeHero    = useFadeInAnimation(0);
  const fadePlate   = useFadeInAnimation(100);
  const fadeDetails = useFadeInAnimation(200);
  const fadeNote    = useFadeInAnimation(300);
  const fadeButton  = useFadeInAnimation(400);
  const iconScale   = useSuccessAnimation(200);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top colored glow */}
      <View
        style={[
          styles.topGradient,
          { backgroundColor: config.gradientColor },
        ]}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleNewScan}>
            <Text style={styles.backText}>{'\u2190'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{commonMessages.location}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.bellIcon}>{'\uD83D\uDD14'}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero: Icon + Title + Subtitle */}
        <Animated.View style={[styles.heroSection, fadeHero]}>
          <Animated.View
            style={[
              styles.heroIconContainer,
              {
                backgroundColor: config.iconBg,
                shadowColor: config.iconGlow,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: config.iconGlow === 'transparent' ? 0 : 0.4,
                shadowRadius: 24,
                elevation: config.iconGlow === 'transparent' ? 0 : 10,
              },
              iconScale,
            ]}
          >
            <Text style={styles.heroIconText}>{config.icon}</Text>
          </Animated.View>

          <Text style={styles.heroTitle}>{messages.title}</Text>
          <Text style={[styles.heroSubtitle, { color: config.subtitleColor }]}>
            {messages.subtitle}
          </Text>
        </Animated.View>

        {/* Plate */}
        {result.plate ? (
          <Animated.View style={[styles.plateSection, fadePlate]}>
            <Text style={styles.plateLabel}>PlateGuard Valeti</Text>
            <View
              style={[
                styles.plateWrapper,
                {
                  shadowColor: config.plateGlow,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: config.plateGlow === 'transparent' ? 0 : 0.5,
                  shadowRadius: 16,
                  elevation: config.plateGlow === 'transparent' ? 0 : 8,
                  borderWidth: config.plateBorderColor === 'transparent' ? 0 : 2,
                  borderColor: config.plateBorderColor,
                },
              ]}
            >
              <BrazilianPlate plate={result.plate} size="lg" />
            </View>
          </Animated.View>
        ) : null}

        {/* Details Card */}
        {detailRows.length > 0 && (
          <Animated.View style={[styles.detailsCard, fadeDetails]}>
            {detailRows.map((row, index) => (
              <React.Fragment key={row.label + index.toString()}>
                {index > 0 && <View style={styles.separator} />}
                <View style={styles.detailRow}>
                  <View
                    style={[
                      styles.detailIconWrapper,
                      { backgroundColor: row.iconBg },
                    ]}
                  >
                    <Text style={styles.detailIconText}>{row.icon}</Text>
                  </View>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>{row.label}</Text>
                    <Text
                      style={[
                        styles.detailValue,
                        row.valueColor ? { color: row.valueColor } : undefined,
                      ]}
                    >
                      {row.value}
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            ))}
          </Animated.View>
        )}

        {/* Note Box */}
        {config.noteConfig && (
          <Animated.View
            style={[
              styles.noteBox,
              {
                backgroundColor: config.noteConfig.bg,
                borderColor: config.noteConfig.border,
              },
              fadeNote,
            ]}
          >
            <View
              style={[
                styles.noteIconWrapper,
                { backgroundColor: config.noteConfig.iconBg },
              ]}
            >
              <Text
                style={[
                  styles.noteIcon,
                  { color: config.noteConfig.iconColor },
                ]}
              >
                {'\u2139'}
              </Text>
            </View>
            <Text
              style={[
                styles.noteText,
                { color: config.noteConfig.textColor },
              ]}
            >
              {config.noteConfig.text}
            </Text>
          </Animated.View>
        )}

        {/* CTA Buttons */}
        <Animated.View style={[styles.ctaSection, fadeButton]}>
          <TouchableOpacity style={styles.ctaButton} onPress={handleNewScan}>
            <Text style={styles.ctaIcon}>{'\uD83D\uDD0D'}</Text>
            <Text style={styles.ctaButtonText}>{commonMessages.newScan}</Text>
          </TouchableOpacity>

          {config.showSecondaryButton && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleNewScan}
            >
              <Text style={styles.secondaryButtonText}>
                {commonMessages.requestRegistration}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>

      {/* Bottom Navigation (static) */}
      <View style={styles.bottomNav}>
        <View style={styles.navTab}>
          <Text style={[styles.navIcon, styles.navIconActive]}>{'\uD83D\uDCF7'}</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>
            {commonMessages.tabs.scanner}
          </Text>
        </View>
        <View style={styles.navTab}>
          <Text style={styles.navIcon}>{'\uD83D\uDE97'}</Text>
          <Text style={styles.navLabel}>{commonMessages.tabs.vehicles}</Text>
        </View>
        <View style={styles.navTab}>
          <Text style={styles.navIcon}>{'\uD83D\uDC64'}</Text>
          <Text style={styles.navLabel}>{commonMessages.tabs.profile}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
