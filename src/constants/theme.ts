export const COLORS = {
  // Background gradients
  BACKGROUND: ['#FAFAFA', '#F5F5F5', '#EEEEEE'],
  
  // Text colors
  PRIMARY_TEXT: '#333',
  SECONDARY_TEXT: '#666',
  TERTIARY_TEXT: '#999',
  
  // UI elements
  BORDER_LIGHT: '#E0E0E0',
  BORDER_MEDIUM: '#E8E8E8',
  BACKGROUND_LIGHT: '#F0F0F0',
  BACKGROUND_MEDIUM: '#F8F8F8',
  
  // Modal
  MODAL_OVERLAY: 'rgba(0, 0, 0, 0.4)',
  WHITE: '#FFFFFF',
  
  // Button states
  PAUSE_COLOR: '#FF6B6B',
} as const;

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 60,
} as const;

export const BORDER_RADIUS = {
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  XXL: 24,
  CIRCLE: 1000,
} as const;

export const FONT_SIZES = {
  XS: 10,
  SM: 12,
  MD: 14,
  LG: 16,
  XL: 18,
  XXL: 20,
  TIMER: 48,
  BRAND: 24,
} as const;

export const FONT_WEIGHTS = {
  LIGHT: '200' as const,
  NORMAL: '300' as const,
  MEDIUM: '400' as const,
} as const;
