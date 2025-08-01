import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { ANIMATION_DURATIONS, createModeData, DEFAULT_TIMER_SETTINGS, TIMER_LIMITS } from '../constants';
import { TimerMode, TimerSettings } from '../types';

export const usePomodoro = () => {
  // State
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMER_SETTINGS.focus * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentMode, setCurrentMode] = useState<TimerMode>('focus');
  const [currentSession, setCurrentSession] = useState(1);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [customTimes, setCustomTimes] = useState<TimerSettings>(DEFAULT_TIMER_SETTINGS);
  const [showCelebration, setShowCelebration] = useState(false);

  // Refs and animations
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const celebrationAnim = useRef(new Animated.Value(0)).current;

  // Memoized mode data
  const modes = useMemo(() => createModeData(customTimes), [customTimes]);

  // Switch mode function
  const switchMode = useCallback((mode: TimerMode) => {
    setCurrentMode(mode);
    setTimeLeft(modes[mode].duration);
    setIsRunning(false);
  }, [modes]);

  // Handle timer completion
  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    setShowCelebration(true);
    
    // Celebration animation
    Animated.sequence([
      Animated.timing(celebrationAnim, {
        toValue: 1,
        duration: ANIMATION_DURATIONS.CELEBRATION,
        useNativeDriver: true,
      }),
      Animated.timing(celebrationAnim, {
        toValue: 0,
        duration: ANIMATION_DURATIONS.CELEBRATION,
        useNativeDriver: true,
      })
    ]).start();
    
    if (currentMode === 'focus') {
      setCompletedSessions(prev => prev + 1);
      const nextMode: TimerMode = completedSessions + 1 === TIMER_LIMITS.SESSIONS_PER_CYCLE ? 'long' : 'short';
      setTimeout(() => {
        switchMode(nextMode);
        setShowCelebration(false);
      }, ANIMATION_DURATIONS.AUTO_SWITCH_DELAY);
    } else {
      setTimeout(() => {
        switchMode('focus');
        if (currentMode === 'long') {
          setCurrentSession(1);
        } else {
          setCurrentSession(prev => prev + 1);
        }
        setShowCelebration(false);
      }, ANIMATION_DURATIONS.AUTO_SWITCH_DELAY);
    }
  }, [currentMode, completedSessions, celebrationAnim, switchMode]);

  // Timer effect
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
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, handleTimerComplete]);

  // Button animation helper
  const animateButton = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: ANIMATION_DURATIONS.BUTTON_PRESS,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: ANIMATION_DURATIONS.BUTTON_PRESS,
        useNativeDriver: true,
      })
    ]).start();
  }, [scaleAnim]);

  // Actions
  const handleStartPause = useCallback(() => {
    animateButton();
    setIsRunning(!isRunning);
  }, [isRunning, animateButton]);

  const handleReset = useCallback(() => {
    animateButton();
    setIsRunning(false);
    setTimeLeft(modes[currentMode].duration);
  }, [modes, currentMode, animateButton]);

  const updateCustomTimes = useCallback((newTimes: Partial<TimerSettings>) => {
    setCustomTimes(prev => ({ ...prev, ...newTimes }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setCustomTimes(DEFAULT_TIMER_SETTINGS);
  }, []);

  return {
    // State
    timeLeft,
    isRunning,
    currentMode,
    currentSession,
    completedSessions,
    showSettings,
    customTimes,
    showCelebration,
    modes,
    
    // Animations
    scaleAnim,
    celebrationAnim,
    
    // Actions
    handleStartPause,
    handleReset,
    switchMode,
    setShowSettings,
    updateCustomTimes,
    resetToDefaults,
  };
};
