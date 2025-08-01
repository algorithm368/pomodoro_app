export type TimerMode = 'focus' | 'short' | 'long';

export interface TimerSettings {
  focus: number;
  short: number;
  long: number;
}

export interface ModeData {
  duration: number;
  label: string;
  color: string;
  icon: string;
  gradient: string[];
}

export interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  currentMode: TimerMode;
  currentSession: number;
  completedSessions: number;
  showSettings: boolean;
  showCelebration: boolean;
}

export interface TimerConfig {
  modes: Record<TimerMode, ModeData>;
  maxMinutes: number;
  minMinutes: number;
  sessionsPerCycle: number;
}
