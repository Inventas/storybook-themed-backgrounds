import { useEffect } from 'storybook/internal/preview-api';

import { global as globalThis } from '@storybook/global';

import { withThemeByClassName } from "../../src";
import { Pre } from "../../src/Pre";

const cleanup = () => {
  const existing = globalThis.document.querySelector('style[data-theme-css]');
  if (existing) {
    existing.remove();
  }
};

const addStyleSheetDecorator = (storyFn: any) => {
  useEffect(() => {
    cleanup();

    const sheet = globalThis.document.createElement('style');
    sheet.setAttribute('data-theme-css', '');
    sheet.textContent = `
      [data-theme="theme-a"], .theme-a {
        background-color: white;
        color: black;
      }
      [data-theme="theme-b"], .theme-b {
        background-color: black;
        color: white;
      }
    `;

    globalThis.document.body.appendChild(sheet);

    return cleanup;
  });

  return storyFn();
};

export default {
  component: Pre,
  args: {
    text: 'Testing the themes',
  },
  globals: {
    sb_theme: 'light',
  },
  parameters: {
    chromatic: { disable: true },
    themes: { disable: false },
  },
  decorators: [addStyleSheetDecorator],
};

export const SetOverride = {
  parameters: {
    themes: {
      themeOverride: 'b',
    },
  },
  decorators: [
    withThemeByClassName({
      defaultTheme: 'a',
      themes: {
        a: {
          class: 'theme-a',
          backgroundColors: [
            'bg-white'
          ],
        },
        b: {
          class: 'theme-b',
          backgroundColors: [
            'bg-black'
          ],
        },
      },
      parentSelector: '#storybook-root > *',
    }),
  ],
};

export const Disabled = {
  parameters: {
    themes: {
      disable: true,
    },
  },
  decorators: [
    withThemeByClassName({
      defaultTheme: 'a',
      themes: {
        a: {
          class: 'theme-a',
          backgroundColors: [
            'bg-white'
          ],
        },
        b: {
          class: 'theme-b',
          backgroundColors: [
            'bg-black'
          ],
        },
      },
      parentSelector: '#storybook-root > *',
    }),
  ],
};
