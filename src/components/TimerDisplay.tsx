import React from 'react';
import { Animated, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { pomodoroStyles } from '../styles';
import { ModeData } from '../types';
import { calculateProgress, formatTime } from '../utils';

interface TimerDisplayProps {
  timeLeft: number;
  currentModeData: ModeData;
  showCelebration: boolean;
  celebrationAnim: Animated.Value;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeLeft,
  currentModeData,
  showCelebration,
  celebrationAnim,
}) => {
  const progress = calculateProgress(currentModeData.duration, timeLeft);

  return (
    <View style={pomodoroStyles.timerSection}>
      <View style={pomodoroStyles.timerContainer}>
        {/* Progress circle */}
        <Svg width={240} height={240} style={pomodoroStyles.progressCircle}>
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

        {/* Timer display */}
        <View style={pomodoroStyles.timerDisplay}>
          <Text style={pomodoroStyles.timeText}>{formatTime(timeLeft)}</Text>
          <Text style={[pomodoroStyles.modeLabel, { color: currentModeData.color }]}>
            {currentModeData.label.toLowerCase()}
          </Text>
        </View>

        {/* Celebration */}
        {showCelebration && (
          <Animated.View
            style={[
              pomodoroStyles.celebration,
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
              },
            ]}
          >
            <View style={pomodoroStyles.celebrationCircle}>
              <Text style={pomodoroStyles.celebrationText}>✓</Text>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
};
