import type { ProjectAnnotations, Renderer } from 'storybook/internal/types';
import type { BackgroundConfig, BackgroundGlobalState } from './types';
import type { Addon_DecoratorFunction } from 'storybook/internal/types';
import { GLOBAL_KEY as KEY } from './constants';
import { withBackgroundAndGrid } from './decorators';

export const initialGlobals: ProjectAnnotations<Renderer>['initialGlobals'] = {
  [KEY]: '',
  ['backgrounds']: { value: undefined, grid: false }
};

export const decorators: Addon_DecoratorFunction[] = [withBackgroundAndGrid]

export const parameters = {
  "background": {
    disable: false,
    options: {

    }
  } satisfies Partial<BackgroundConfig>,
};
