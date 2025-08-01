/**
 * Formats seconds into MM:SS format
 * @param seconds - Number of seconds to format
 * @returns Formatted time string (e.g., "25:00")
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculates progress percentage
 * @param totalDuration - Total duration in seconds
 * @param timeLeft - Remaining time in seconds
 * @returns Progress percentage (0-100)
 */
export const calculateProgress = (totalDuration: number, timeLeft: number): number => {
  return ((totalDuration - timeLeft) / totalDuration) * 100;
};

/**
 * Validates and clamps a number within a range
 * @param value - Value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Clamped value
 */
export const clampNumber = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
