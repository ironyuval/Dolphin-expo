// Design System Constants - Converted from design-system.css and index.css

export const colors = {
  // DARK BLUE GROUP
  darkBlue: {
    100: '#010025',
    50: 'rgba(1, 0, 37, 0.5)',
    30: 'rgba(1, 0, 37, 0.3)',
    15: 'rgba(1, 0, 37, 0.15)',
  },
  
  // LIGHT BLUE GROUP
  lightBlue: {
    100: '#3E9DEA',
    50: 'rgba(62, 157, 234, 0.5)',
    30: 'rgba(62, 157, 234, 0.3)',
    15: 'rgba(62, 157, 234, 0.15)',
  },
  
  // TURQUOISE GROUP
  turquoise: {
    100: '#245C89',
    50: 'rgba(36, 92, 137, 0.5)',
    30: 'rgba(36, 92, 137, 0.3)',
    15: 'rgba(36, 92, 137, 0.15)',
  },
  
  // WHITE GROUP
  white: {
    100: '#FAFAFA',
    50: 'rgba(250, 250, 250, 0.5)',
    30: 'rgba(250, 250, 250, 0.3)',
    15: 'rgba(250, 250, 250, 0.15)',
  },
  
  // RED GROUP (EMERGENCY)
  red: {
    100: '#FF1F1F',
    50: 'rgba(255, 31, 31, 0.5)',
    30: 'rgba(255, 31, 31, 0.3)',
    15: 'rgba(255, 31, 31, 0.15)',
  },
  
  // OFF-WHITE GROUP
  offWhite: {
    100: '#E8ECF4',
    50: 'rgba(232, 236, 244, 0.5)',
    30: 'rgba(232, 236, 244, 0.3)',
    15: 'rgba(232, 236, 244, 0.15)',
  },
  
  // Aliases & Semantic Tokens
  primaryDarkest: '#010025',
  primaryDark: '#245C89',
  primaryMedium: '#3E9DEA',
  primaryLight: '#E8F5FF',
  
  white: '#FAFAFA',
  black: '#111111',
  
  // Semantic Colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#FF1F1F',
  info: '#006FFD',
  
  // Neutral Colors
  neutral: {
    darkest: '#1F2024',
    dark: '#494A50',
    medium: '#71727A',
    light: '#8F9098',
    lighter: '#E8E9F1',
    lightest: '#E8ECF4',
  },
  
  // Legacy UX Colors (from index.css)
  ux1: '#303030',
  ux2: '#515151',
  ux3: '#959595',
  ux4: '#d9d9d9',
  highlight: '#006FFD',
  bgLight: '#F5F5F5',
  textDark: '#C5C6CC',
} as const;

export const typography = {
  fontFamilies: {
    main: 'Heebo',
    secondary: 'Inter',
  },
  
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 22,
    '3xl': 24,
    '4xl': 28,
    '5xl': 36,
  },
  
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  
  styles: {
    h1: {
      fontWeight: '700' as const,
      fontSize: 24,
      lineHeight: '100%',
      fontFamily: 'Heebo',
    },
    h2: {
      fontWeight: '500' as const,
      fontSize: 18,
      lineHeight: '100%',
      fontFamily: 'Heebo',
    },
    fields: {
      fontWeight: '400' as const,
      fontSize: 14,
      lineHeight: '100%',
      fontFamily: 'Heebo',
    },
    notes: {
      fontWeight: '400' as const,
      fontSize: 12,
      lineHeight: '100%',
      fontFamily: 'Heebo',
    },
    miniCta: {
      fontWeight: '700' as const,
      fontSize: 12,
      lineHeight: '100%',
      fontFamily: 'Heebo',
    },
    caption: {
      fontWeight: '600' as const,
      fontSize: 10,
      lineHeight: '100%',
      fontFamily: 'Inter',
    },
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2, // Android
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

export const gradients = {
  primary: ['#3E9DEA', '#245C89'],
  welcome: ['#010025', '#245C89', '#3E9DEA'],
  auth: ['#3E9DEA', '#245C89'],
  card: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0)'],
} as const;

export const designSystem = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  gradients,
} as const;

export default designSystem;
