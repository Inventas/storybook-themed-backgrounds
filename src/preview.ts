import type { ProjectAnnotations, Renderer } from 'storybook/internal/types';
import type {
  Config,
  GlobalState
} from "./backgrounds/types";
import type { Addon_DecoratorFunction } from 'storybook/internal/types';
import { GLOBAL_KEY as THEME_KEY, THEME_MAP_PARAMETER_KEY } from "./theme/constants";
import { BACKGROUND_PARAM_KEY as BACKGROUND_KEY } from './backgrounds/constants';
import { withBackgroundAndGrid } from './backgrounds/background.decorator';
import { DEFAULT_BACKGROUNDS } from "./backgrounds/defaults";

export const decorators: Addon_DecoratorFunction[] = [withBackgroundAndGrid]

export const parameters = {
  [THEME_MAP_PARAMETER_KEY]: {
    options: {
      light: [
        "white",
      ],
      dark: [
        "black",
      ]
    }
  },
  [BACKGROUND_KEY]: {
    grid: {
      cellSize: 20,
      opacity: 0.5,
      cellAmount: 5,
    },
    disable: false,
    options: DEFAULT_BACKGROUNDS,
  } satisfies Partial<Config>,
};

const initialBackground: GlobalState = { value: undefined, grid: false };

export const initialGlobals = {
  [THEME_KEY]: '',
  [BACKGROUND_KEY]: initialBackground
};