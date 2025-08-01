import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants';
import { pomodoroStyles } from '../styles';
import { ModeData } from '../types';

interface TimerControlsProps {
  isRunning: boolean;
  currentModeData: ModeData;
  scaleAnim: Animated.Value;
  onStartPause: () => void;
  onReset: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  currentModeData,
  scaleAnim,
  onStartPause,
  onReset,
}) => {
  return (
    <View style={pomodoroStyles.controlSection}>
      <Animated.View
        style={[
          pomodoroStyles.controlButtons,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <TouchableOpacity
          style={[
            pomodoroStyles.controlButton,
            {
              backgroundColor: isRunning ? COLORS.PAUSE_COLOR : currentModeData.color,
            },
          ]}
          onPress={onStartPause}
        >
          <Text style={pomodoroStyles.buttonText}>
            {isRunning ? 'pause' : 'start'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[pomodoroStyles.controlButton, pomodoroStyles.secondaryButton]}
          onPress={onReset}
        >
          <Text style={pomodoroStyles.secondaryButtonText}>reset</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
