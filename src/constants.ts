export const ADDON_ID = "tailwind-theme";
export const THEME_SWITCHER_ID = `${ADDON_ID}/theme-switcher` as const;
export const GLOBAL_KEY = `tailwind-theme`;
export const PARAM_KEY = "tailwind-theme"

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
} as const;
