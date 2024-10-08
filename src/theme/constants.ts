export const ADDON_ID = `storybook/themed-backgrounds` as const;
export const THEME_MAP_PARAMETER_KEY = 'themes-map' as const;
export const THEME_PARAMETER_KEY = 'theme' as const;
export const GLOBAL_KEY = 'theme' as const;
export const THEME_SWITCHER_ID = `${ADDON_ID}/theme-switcher` as const;

export interface ThemeAddonState {
  themesList: string[];
  themeDefault?: string;
}

export const DEFAULT_ADDON_STATE: ThemeAddonState = {
  themesList: [],
  themeDefault: undefined,
};

export interface ThemeParameters {
  themeOverride?: string;
  disable?: boolean;
}

export const DEFAULT_THEME_PARAMETERS: ThemeParameters = {};

export const THEMING_EVENTS = {
  REGISTER_THEMES: `${ADDON_ID}/REGISTER_THEMES`,
  UPDATE: `${ADDON_ID}/UPDATE`,
} as const;

// New

export type Backgrounds = string[];
export type ThemeMap = Record<string, Backgrounds>;
export interface ThemeMapConfig {
  options: ThemeMap;
}
