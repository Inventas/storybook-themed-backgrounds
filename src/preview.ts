import type { ProjectAnnotations, Renderer } from 'storybook/internal/types';
import type {
  Config,
  Config as BackgroundConfig,
  GlobalState,
  GlobalState as BackgroundGlobalState
} from "./backgrounds/types";
import type { Addon_DecoratorFunction } from 'storybook/internal/types';
import { GLOBAL_KEY as THEME_KEY } from './theme/constants';
import { PARAM_KEY as BACKGROUND_KEY } from './backgrounds/constants';
import { withBackgroundAndGrid } from './backgrounds/background.decorator';
import { withBackground } from "./backgrounds/legacy/withBackgroundLegacy";
import { withGrid } from "./backgrounds/legacy/withGridLegacy";
import { DEFAULT_BACKGROUNDS } from "./backgrounds/defaults";

// export const initialGlobals: ProjectAnnotations<Renderer>['initialGlobals'] = {
//   [THEME_KEY]: '',
//   [BACKGROUND_KEY]: { value: undefined, grid: false }
// };

export const decorators: Addon_DecoratorFunction[] = FEATURES?.backgroundsStoryGlobals
  ? [withBackgroundAndGrid]
  : [withGrid, withBackground];

export const parameters = {
  [BACKGROUND_KEY]: {
    grid: {
      cellSize: 20,
      opacity: 0.5,
      cellAmount: 5,
    },
    disable: false,
    // TODO: remove in 9.0
    ...(!FEATURES?.backgroundsStoryGlobals && {
      values: Object.values(DEFAULT_BACKGROUNDS),
    }),
  } satisfies Partial<Config>,
};

const modern: Record<string, GlobalState> = {
  [BACKGROUND_KEY]: { value: undefined, grid: false },
};

const initialGlobalsBackground = FEATURES?.backgroundsStoryGlobals ? modern : { [BACKGROUND_KEY]: null };

export const initialGlobals = {
  [THEME_KEY]: '',
  ...initialGlobalsBackground,
};