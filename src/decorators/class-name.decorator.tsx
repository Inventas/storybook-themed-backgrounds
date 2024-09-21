import { useEffect } from 'storybook/internal/preview-api';
import type { DecoratorFunction, Renderer } from 'storybook/internal/types';

import { initializeThemeState, pluckThemeFromContext, useThemeParameters } from './helpers';
import { Backgrounds } from "../constants";

export interface ClassNameThemeConfiguration {
  class: string,
  backgroundColors: Backgrounds,
}

export interface ClassNameStrategyConfiguration {
  themes: Record<string, ClassNameThemeConfiguration>;
  defaultTheme: string;
  parentSelector?: string;
}

const DEFAULT_ELEMENT_SELECTOR = 'html';

const classStringToArray = (classString: string) => classString.split(' ').filter(Boolean);

// TODO check with @kasperpeulen: change the types so they can be correctly inferred from context e.g. <Story extends (...args: any[]) => any>
export const withThemeByClassName = <TRenderer extends Renderer = Renderer>({
  themes,
  defaultTheme,
  parentSelector = DEFAULT_ELEMENT_SELECTOR,
}: ClassNameStrategyConfiguration): DecoratorFunction<TRenderer> => {
  initializeThemeState(Object.keys(themes), defaultTheme);

  return (storyFn, context) => {
    const { themeOverride } = useThemeParameters();
    const selected = pluckThemeFromContext(context);

    useEffect(() => {
      const selectedThemeName = themeOverride || selected || defaultTheme;
      const parentElement = document.querySelector(parentSelector);

      if (!parentElement) {
        return;
      }

      // console.log(Object.entries(themes))

      Object.entries(themes)
        .filter(([themeName]) => themeName !== selectedThemeName)
        .forEach(([themeName, config]) => {
          const classes = classStringToArray(config.class);
          if (classes.length > 0) {
            parentElement.classList.remove(...classes);
          }
        });

      const newThemeClasses = classStringToArray(themes[selectedThemeName].class);

      if (newThemeClasses.length > 0) {
        parentElement.classList.add(...newThemeClasses);
      }
    }, [themeOverride, selected]);

    return storyFn();
  };
};
