import React from 'react';
import { Text, View } from 'react-native';
import { TIMER_LIMITS } from '../constants';
import { pomodoroStyles } from '../styles';
import { ModeData } from '../types';

interface ProgressIndicatorProps {
  currentSession: number;
  completedSessions: number;
  currentModeData: ModeData;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentSession,
  completedSessions,
  currentModeData,
}) => {
  return (
    <View style={pomodoroStyles.progressSection}>
      <View style={pomodoroStyles.sessionInfo}>
        <Text style={pomodoroStyles.sessionText}>
          {currentSession} / {TIMER_LIMITS.SESSIONS_PER_CYCLE}
        </Text>
      </View>
      <View style={pomodoroStyles.progressIndicators}>
        {Array.from({ length: TIMER_LIMITS.SESSIONS_PER_CYCLE }, (_, index) => (
          <View
            key={`progress-dot-${index + 1}`}
            style={[
              pomodoroStyles.progressDot,
              index < completedSessions && {
                backgroundColor: currentModeData.color,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};
