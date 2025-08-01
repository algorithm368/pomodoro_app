import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TIMER_LIMITS } from '../constants';
import { modalStyles } from '../styles';
import { ModeData, TimerMode, TimerSettings } from '../types';
import { clampNumber } from '../utils';

interface SettingsModalProps {
  visible: boolean;
  customTimes: TimerSettings;
  modes: Record<TimerMode, ModeData>;
  onClose: () => void;
  onUpdateTimes: (newTimes: Partial<TimerSettings>) => void;
  onResetDefaults: () => void;
  onSaveAndApply: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  customTimes,
  modes,
  onClose,
  onUpdateTimes,
  onResetDefaults,
  onSaveAndApply,
}) => {
  const handleTimeChange = (mode: TimerMode, text: string) => {
    // Allow empty string temporarily while typing
    if (text === '') {
      onUpdateTimes({ [mode]: '' as any });
      return;
    }

    // Parse and validate the number
    const numValue = parseInt(text);
    if (!isNaN(numValue)) {
      const clampedValue = clampNumber(numValue, TIMER_LIMITS.MIN_MINUTES, TIMER_LIMITS.MAX_MINUTES);
      onUpdateTimes({ [mode]: clampedValue });
    }
  };

  const handleBlur = (mode: TimerMode, value: number | string) => {
    // If field is empty when user leaves, set to 1
    if (value === '' || value === 0) {
      onUpdateTimes({ [mode]: 1 });
    }
  };

  const getModeDescription = (mode: TimerMode): string => {
    switch (mode) {
      case 'focus':
        return 'deep work session';
      case 'short':
        return 'quick break';
      case 'long':
        return 'extended rest';
      default:
        return '';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={modalStyles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={modalStyles.settingsModal}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <View style={modalStyles.modalHeader}>
            <View style={modalStyles.modalHandle} />
            <Text style={modalStyles.settingsTitle}>timer settings</Text>
            <Text style={modalStyles.settingsSubtitle}>
              customize your focus sessions
            </Text>
          </View>

          {/* Settings List */}
          <View style={modalStyles.settingsList}>
            {Object.entries(customTimes).map(([mode, time]) => (
              <View key={mode} style={modalStyles.settingRow}>
                <View style={modalStyles.settingInfo}>
                  <View style={modalStyles.settingIconContainer}>
                    <View
                      style={[
                        modalStyles.settingModeIndicator,
                        { backgroundColor: modes[mode as TimerMode].color },
                      ]}
                    />
                  </View>
                  <View style={modalStyles.settingTextContainer}>
                    <Text style={modalStyles.settingModeTitle}>
                      {modes[mode as TimerMode].label.toLowerCase()}
                    </Text>
                    <Text style={modalStyles.settingModeDesc}>
                      {getModeDescription(mode as TimerMode)}
                    </Text>
                  </View>
                </View>

                <View style={modalStyles.inputContainer}>
                  <View style={modalStyles.timeInputWrapper}>
                    <TextInput
                      style={modalStyles.timeInput}
                      value={time.toString()}
                      onChangeText={(text) => handleTimeChange(mode as TimerMode, text)}
                      onBlur={() => handleBlur(mode as TimerMode, time)}
                      keyboardType="numeric"
                      maxLength={2}
                      selectTextOnFocus={true}
                      returnKeyType="done"
                      blurOnSubmit={true}
                    />
                    <Text style={modalStyles.inputUnit}>min</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Modal Actions */}
          <View style={modalStyles.modalActions}>
            <TouchableOpacity
              style={modalStyles.resetButton}
              onPress={onResetDefaults}
            >
              <Text style={modalStyles.resetButtonText}>reset defaults</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={modalStyles.saveButton}
              onPress={onSaveAndApply}
            >
              <Text style={modalStyles.saveButtonText}>save & apply</Text>
            </TouchableOpacity>
          </View>

          {/* Usage Tip */}
          <View style={modalStyles.tipContainer}>
            <Text style={modalStyles.tipText}>
              💡 changes apply to new sessions immediately
            </Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
