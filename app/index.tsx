import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import {
  ModesSelector,
  ProgressIndicator,
  SettingsModal,
  TimerControls,
  TimerDisplay,
  usePomodoro,
} from '../src';
import { COLORS } from '../src/constants';
import { pomodoroStyles } from '../src/styles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function PomodoroTimer() {
  const {
    timeLeft,
    isRunning,
    currentMode,
    currentSession,
    completedSessions,
    showSettings,
    customTimes,
    showCelebration,
    modes,
    scaleAnim,
    celebrationAnim,
    handleStartPause,
    handleReset,
    switchMode,
    setShowSettings,
    updateCustomTimes,
    resetToDefaults,
  } = usePomodoro();

  const currentModeData = modes[currentMode];

  const handleSaveAndApply = () => {
    setShowSettings(false);
  };

  return (
    <LinearGradient colors={COLORS.BACKGROUND} style={pomodoroStyles.container}>
      {/* Subtle background elements */}
      <View style={pomodoroStyles.backgroundElements}>
        <View
          style={[
            pomodoroStyles.floatingElement,
            {
              left: screenWidth * 0.1,
              top: screenHeight * 0.2,
              opacity: 0.03,
            },
          ]}
        />
        <View
          style={[
            pomodoroStyles.floatingElement,
            {
              left: screenWidth * 0.7,
              top: screenHeight * 0.6,
              opacity: 0.03,
            },
          ]}
        />
        <View
          style={[
            pomodoroStyles.floatingElement,
            {
              left: screenWidth * 0.4,
              top: screenHeight * 0.8,
              opacity: 0.03,
            },
          ]}
        />
      </View>

      {/* Header */}
      <View style={pomodoroStyles.headerContainer}>
        <View style={pomodoroStyles.header}>
          <View style={pomodoroStyles.brandSection}>
            <View style={pomodoroStyles.logoContainer}>
              <View style={pomodoroStyles.zenCircle} />
              <Text style={pomodoroStyles.brandTitle}>podomoro</Text>
            </View>
          </View>

          <TouchableOpacity
            style={pomodoroStyles.settingsButton}
            onPress={() => setShowSettings(true)}
          >
            <View style={pomodoroStyles.settingsIcon}>
              <View style={pomodoroStyles.settingsDot} />
              <View style={pomodoroStyles.settingsDot} />
              <View style={pomodoroStyles.settingsDot} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Top Section */}
      <View style={pomodoroStyles.topSection}>
        <ModesSelector
          modes={modes}
          currentMode={currentMode}
          onModeChange={switchMode}
          disabled={isRunning}
        />
      </View>

      {/* Center Section - Timer Display */}
      <View style={pomodoroStyles.centerSection}>
        <TimerDisplay
          timeLeft={timeLeft}
          currentModeData={currentModeData}
          showCelebration={showCelebration}
          celebrationAnim={celebrationAnim}
        />
      </View>

      {/* Bottom Section */}
      <View style={pomodoroStyles.bottomSection}>
        <TimerControls
          isRunning={isRunning}
          currentModeData={currentModeData}
          scaleAnim={scaleAnim}
          onStartPause={handleStartPause}
          onReset={handleReset}
        />

        <ProgressIndicator
          currentSession={currentSession}
          completedSessions={completedSessions}
          currentModeData={currentModeData}
        />
      </View>

      {/* Settings Modal */}
      <SettingsModal
        visible={showSettings}
        customTimes={customTimes}
        modes={modes}
        onClose={() => setShowSettings(false)}
        onUpdateTimes={updateCustomTimes}
        onResetDefaults={resetToDefaults}
        onSaveAndApply={handleSaveAndApply}
      />
    </LinearGradient>
  );
}