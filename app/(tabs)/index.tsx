import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentMode, setCurrentMode] = useState('focus'); // 'focus', 'short', 'long'
  const [currentSession, setCurrentSession] = useState(1);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [customTimes, setCustomTimes] = useState({
    focus: 25,
    short: 5,
    long: 15
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const intervalRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const celebrationAnim = useRef(new Animated.Value(0)).current;

  const modes = React.useMemo(() => ({
    focus: { 
      duration: customTimes.focus * 60, 
      label: 'Focus Time', 
      color: '#10B981', 
      icon: 'bulb-outline',
      gradient: ['#10B981', '#059669']
    },
    short: { 
      duration: customTimes.short * 60, 
      label: 'Short Break', 
      color: '#3B82F6', 
      icon: 'cafe-outline',
      gradient: ['#3B82F6', '#2563EB']
    },
    long: { 
      duration: customTimes.long * 60, 
      label: 'Long Break', 
      color: '#8B5CF6', 
      icon: 'bed-outline',
      gradient: ['#8B5CF6', '#7C3AED']
    }
  }), [customTimes]);

  const switchMode = React.useCallback((mode) => {
    setCurrentMode(mode);
    setTimeLeft(modes[mode].duration);
    setIsRunning(false);
  }, [modes]);

  const handleTimerComplete = React.useCallback(() => {
    setIsRunning(false);
    setShowCelebration(true);
    
    // Celebration animation
    Animated.sequence([
      Animated.timing(celebrationAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(celebrationAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
    
    if (currentMode === 'focus') {
      setCompletedSessions(prev => prev + 1);
      const nextMode = completedSessions + 1 === 4 ? 'long' : 'short';
      setTimeout(() => {
        switchMode(nextMode);
        setShowCelebration(false);
      }, 3000);
    } else {
      setTimeout(() => {
        switchMode('focus');
        if (currentMode === 'long') {
          setCurrentSession(1);
        } else {
          setCurrentSession(prev => prev + 1);
        }
        setShowCelebration(false);
      }, 3000);
    }
  }, [currentMode, completedSessions, celebrationAnim, switchMode]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, handleTimerComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    // Button animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
    
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    // Button animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
    
    setIsRunning(false);
    setTimeLeft(modes[currentMode].duration);
  };

  const progress = ((modes[currentMode].duration - timeLeft) / modes[currentMode].duration) * 100;
  const currentModeData = modes[currentMode];

  return (
    <LinearGradient
      colors={['#FAFAFA', '#F5F5F5', '#EEEEEE']}
      style={styles.container}
    >
      {/* Subtle background elements */}
      <View style={styles.backgroundElements}>
        {/* Minimal floating elements */}
        <View
          key="floating-1"
          style={[
            styles.floatingElement,
            {
              left: screenWidth * 0.1,
              top: screenHeight * 0.2,
              opacity: 0.03,
            }
          ]}
        />
        <View
          key="floating-2"
          style={[
            styles.floatingElement,
            {
              left: screenWidth * 0.7,
              top: screenHeight * 0.6,
              opacity: 0.03,
            }
          ]}
        />
        <View
          key="floating-3"
          style={[
            styles.floatingElement,
            {
              left: screenWidth * 0.4,
              top: screenHeight * 0.8,
              opacity: 0.03,
            }
          ]}
        />
      </View>

      {/* Minimal Header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.brandSection}>
            <View style={styles.logoContainer}>
              <View style={styles.zenCircle} />
              <Text style={styles.brandTitle}>zen</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setShowSettings(true)}
          >
            <View style={styles.settingsIcon}>
              <View style={styles.settingsDot} />
              <View style={styles.settingsDot} />
              <View style={styles.settingsDot} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content - Centered and Minimal */}
      <View style={styles.mainContent}>
        
        {/* Simple Mode Selector */}
        <View style={styles.modeSection}>
          <View style={styles.modeSelector}>
            {Object.entries(modes).map(([mode, data]) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.modeButton,
                  currentMode === mode && styles.activeModeButton
                ]}
                onPress={() => switchMode(mode)}
                disabled={isRunning}
              >
                <View style={[
                  styles.modeIndicatorDot,
                  { backgroundColor: currentMode === mode ? data.color : '#E0E0E0' }
                ]} />
                <Text style={[
                  styles.modeButtonText,
                  currentMode === mode && { color: data.color }
                ]}>
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Zen Timer Circle */}
        <View style={styles.timerSection}>
          <View style={styles.timerContainer}>
            
            {/* Simple progress ring */}
            <Svg width={240} height={240} style={styles.progressCircle}>
              {/* Background circle */}
              <Circle
                cx="120"
                cy="120"
                r="100"
                stroke="#F0F0F0"
                strokeWidth="2"
                fill="none"
              />
              {/* Progress circle */}
              <Circle
                cx="120"
                cy="120"
                r="100"
                stroke={currentModeData.color}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 100}`}
                strokeDashoffset={`${2 * Math.PI * 100 * (1 - progress / 100)}`}
                transform="rotate(-90 120 120)"
                opacity="0.8"
              />
            </Svg>
            
            {/* Minimal Timer Display */}
            <View style={styles.timerDisplay}>
              <Text style={styles.timeText}>
                {formatTime(timeLeft)}
              </Text>
              <Text style={[styles.modeLabel, { color: currentModeData.color }]}>
                {currentModeData.label.toLowerCase()}
              </Text>
            </View>

            {/* Zen Celebration */}
            {showCelebration && (
              <Animated.View 
                style={[
                  styles.celebration,
                  {
                    opacity: celebrationAnim,
                    transform: [
                      {
                        scale: celebrationAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1.2],
                        }),
                      },
                    ],
                  }
                ]}
              >
                <View style={styles.celebrationCircle}>
                  <Text style={styles.celebrationText}>✓</Text>
                </View>
              </Animated.View>
            )}
          </View>
        </View>

        {/* Minimal Control Buttons */}
        <View style={styles.controlSection}>
          <Animated.View 
            style={[
              styles.controlButtons,
              { transform: [{ scale: scaleAnim }] }
            ]}
          >
            <TouchableOpacity
              style={[
                styles.controlButton,
                styles.primaryButton,
                { backgroundColor: isRunning ? '#FF6B6B' : currentModeData.color }
              ]}
              onPress={handleStartPause}
            >
              <Text style={styles.buttonText}>
                {isRunning ? 'pause' : 'start'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.secondaryButton]}
              onPress={handleReset}
            >
              <Text style={styles.secondaryButtonText}>reset</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Minimal Progress Indicators */}
        <View style={styles.progressSection}>
          <View style={styles.sessionInfo}>
            <Text style={styles.sessionText}>{currentSession} / 4</Text>
          </View>
          <View style={styles.progressIndicators}>
            <View 
              key="progress-dot-1" 
              style={[
                styles.progressDot,
                0 < completedSessions && { backgroundColor: currentModeData.color }
              ]} 
            />
            <View 
              key="progress-dot-2" 
              style={[
                styles.progressDot,
                1 < completedSessions && { backgroundColor: currentModeData.color }
              ]} 
            />
            <View 
              key="progress-dot-3" 
              style={[
                styles.progressDot,
                2 < completedSessions && { backgroundColor: currentModeData.color }
              ]} 
            />
            <View 
              key="progress-dot-4" 
              style={[
                styles.progressDot,
                3 < completedSessions && { backgroundColor: currentModeData.color }
              ]} 
            />
          </View>
        </View>

      </View>

      {/* Settings Modal */}
      <Modal
        visible={showSettings}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSettings(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.settingsModal}>
            <Text style={styles.settingsTitle}>Timer Settings</Text>
            
            {Object.entries(customTimes).map(([mode, time]) => (
              <View key={mode} style={styles.settingRow}>
                <Text style={styles.settingLabel}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)} ({modes[mode].label})
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.timeInput}
                    value={time.toString()}
                    onChangeText={(text) => setCustomTimes(prev => ({
                      ...prev, 
                      [mode]: parseInt(text) || 1
                    }))}
                    keyboardType="numeric"
                  />
                  <Text style={styles.inputUnit}>min</Text>
                </View>
              </View>
            ))}
            
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setShowSettings(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingElement: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8E8E8',
  },
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandSection: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zenCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    marginRight: 12,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#333',
    letterSpacing: 2,
  },
  settingsButton: {
    padding: 12,
  },
  settingsIcon: {
    flexDirection: 'row',
    gap: 3,
  },
  settingsDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#999',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modeSection: {
    marginBottom: 60,
  },
  modeSelector: {
    flexDirection: 'row',
    gap: 32,
    justifyContent: 'center',
  },
  modeButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  activeModeButton: {
    // Active state styling handled by color changes
  },
  modeIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
  },
  modeButtonText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#999',
    letterSpacing: 1,
  },
  timerSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  timerContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    position: 'absolute',
  },
  timerDisplay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 48,
    fontWeight: '200',
    color: '#333',
    fontFamily: 'System',
    letterSpacing: 1,
    marginBottom: 8,
  },
  modeLabel: {
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: 1,
  },
  celebration: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  celebrationCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  celebrationText: {
    fontSize: 24,
    color: '#666',
  },
  controlSection: {
    marginBottom: 60,
  },
  controlButtons: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
  },
  controlButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    minWidth: 100,
    alignItems: 'center',
  },
  primaryButton: {
    // Color set dynamically
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '300',
    color: 'white',
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#666',
    letterSpacing: 1,
  },
  progressSection: {
    alignItems: 'center',
  },
  sessionInfo: {
    marginBottom: 16,
  },
  sessionText: {
    fontSize: 12,
    fontWeight: '300',
    color: '#999',
    letterSpacing: 1,
  },
  progressIndicators: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 32,
    width: screenWidth - 64,
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    fontWeight: '300',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    width: 64,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    textAlign: 'center',
    color: '#333',
    backgroundColor: '#FAFAFA',
    fontWeight: '300',
  },
  inputUnit: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
    fontWeight: '300',
  },
  doneButton: {
    marginTop: 24,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  doneButtonText: {
    color: '#666',
    fontWeight: '300',
    fontSize: 14,
    letterSpacing: 1,
  },
});
