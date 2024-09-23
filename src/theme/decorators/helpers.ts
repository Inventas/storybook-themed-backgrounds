import { addons, useParameter } from 'storybook/internal/preview-api';
import type { StoryContext } from 'storybook/internal/types';

import { THEME_PARAMETER_KEY, ThemeParameters } from "../constants";
import { DEFAULT_THEME_PARAMETERS, GLOBAL_KEY, THEME_MAP_PARAMETER_KEY, THEMING_EVENTS } from '../constants';

/**
 * @param StoryContext
 * @returns The global theme name set for your stories
 */
export function pluckThemeFromContext({ globals }: StoryContext): string {
  return globals[THEME_PARAMETER_KEY] || '';
}

export function useThemeParameters(): ThemeParameters {
  return useParameter<ThemeParameters>(THEME_PARAMETER_KEY, DEFAULT_THEME_PARAMETERS) as ThemeParameters;
}

export function initializeThemeState(themeNames: string[], defaultTheme: string) {
  addons.getChannel().emit(THEMING_EVENTS.REGISTER_THEMES, {
    defaultTheme,
    themes: themeNames,
  });
}
