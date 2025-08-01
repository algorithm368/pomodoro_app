import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { pomodoroStyles } from '../styles';
import { ModeData, TimerMode } from '../types';

interface ModesSelectorProps {
  modes: Record<TimerMode, ModeData>;
  currentMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
  disabled?: boolean;
}

export const ModesSelector: React.FC<ModesSelectorProps> = ({
  modes,
  currentMode,
  onModeChange,
  disabled = false,
}) => {
  return (
    <View style={pomodoroStyles.modeSection}>
      <View style={pomodoroStyles.modeSelector}>
        {Object.entries(modes).map(([mode, data]) => (
          <TouchableOpacity
            key={mode}
            style={pomodoroStyles.modeButton}
            onPress={() => onModeChange(mode as TimerMode)}
            disabled={disabled}
          >
            <View
              style={[
                pomodoroStyles.modeIndicatorDot,
                {
                  backgroundColor: currentMode === mode ? data.color : '#E0E0E0',
                },
              ]}
            />
            <Text
              style={[
                pomodoroStyles.modeButtonText,
                currentMode === mode && { color: data.color },
              ]}
            >
              {mode}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
