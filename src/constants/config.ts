// Configuración de la aplicación
export const APP_NAME = "Bambu CRM";
export const APP_VERSION = "1.0.0";

// URLs y endpoints
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Configuración de UI
export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
} as const;

// Breakpoints de Tailwind (para uso en JS si es necesario)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;