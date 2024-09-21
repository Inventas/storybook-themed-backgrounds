export const PARAMETER_KEY = 'tailwind-themes' as const;
export const PARAM_KEY = 'themes' as const;
export const GLOBAL_KEY = 'theme' as const;
export const BACKGROUND_KEY = 'backgrounds' as const;
export const ADDON_ID = `storybook/${PARAM_KEY}` as const;
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
export interface Color {
  name: string;
  value: string;
}
export type GenericColorMap = Record<string, Record<string, Color>>;
