export const ADDON_ID = "my-addon";
export const THEME_SWITCHER_ID = `${ADDON_ID}/theme-switcher` as const;
export const GLOBAL_KEY = `my-addon`;

export const EVENTS = {
  RESULT: `${ADDON_ID}/result`,
  REQUEST: `${ADDON_ID}/request`,
};
