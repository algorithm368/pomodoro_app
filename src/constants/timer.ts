import { ModeData, TimerMode, TimerSettings } from '../types';

export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  focus: 25,
  short: 5,
  long: 15,
};

export const TIMER_LIMITS = {
  MIN_MINUTES: 1,
  MAX_MINUTES: 60,
  SESSIONS_PER_CYCLE: 4,
} as const;

export const ANIMATION_DURATIONS = {
  BUTTON_PRESS: 100,
  CELEBRATION: 500,
  AUTO_SWITCH_DELAY: 3000,
} as const;

export const createModeData = (customTimes: TimerSettings): Record<TimerMode, ModeData> => ({
  focus: {
    duration: (typeof customTimes.focus === 'number' ? customTimes.focus : DEFAULT_TIMER_SETTINGS.focus) * 60,
    label: 'Focus Time',
    color: '#10B981',
    icon: 'bulb-outline',
    gradient: ['#10B981', '#059669'],
  },
  short: {
    duration: (typeof customTimes.short === 'number' ? customTimes.short : DEFAULT_TIMER_SETTINGS.short) * 60,
    label: 'Short Break',
    color: '#3B82F6',
    icon: 'cafe-outline',
    gradient: ['#3B82F6', '#2563EB'],
  },
  long: {
    duration: (typeof customTimes.long === 'number' ? customTimes.long : DEFAULT_TIMER_SETTINGS.long) * 60,
    label: 'Long Break',
    color: '#8B5CF6',
    icon: 'bed-outline',
    gradient: ['#8B5CF6', '#7C3AED'],
  },
});
