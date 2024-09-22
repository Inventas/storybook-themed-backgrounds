import { useEffect } from 'storybook/internal/preview-api';
import type {
  Renderer,
  StoryContext,
  PartialStoryFn as StoryFunction,
} from 'storybook/internal/types';

import { PARAM_KEY as KEY } from '../constants';
import { DEFAULT_BACKGROUNDS } from '../defaults';
import type { BackgroundConfig } from '../types';
import { addBackgroundStyle, clearStyles, isReduceMotionEnabled } from '../utils';

const BG_SELECTOR_BASE = `addon-backgrounds`;

const transitionStyle = isReduceMotionEnabled() ? '' : 'transition: background-color 0.3s;';

export const withBackgroundAndGrid = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>
) => {
  const { globals, parameters, viewMode, id } = context;
  const {
    options = DEFAULT_BACKGROUNDS,
    disable,
  } = (parameters[KEY] || {}) as BackgroundConfig;
  const data = globals[KEY] || {};
  const backgroundName: string | undefined = data.value;

  const item = backgroundName ? options[backgroundName] : undefined;
  const value = item?.value || 'transparent';

  const shownBackground = !!item && !disable;

  const backgroundSelector = viewMode === 'docs' ? `#anchor--${id} .docs-story` : '.sb-show-main';

  const isLayoutPadded = parameters.layout === undefined || parameters.layout === 'padded';
  const defaultOffset = viewMode === 'docs' ? 20 : isLayoutPadded ? 16 : 0;

  const backgroundSelectorId =
    viewMode === 'docs' ? `${BG_SELECTOR_BASE}-docs-${id}` : `${BG_SELECTOR_BASE}-color`;
  const backgroundTarget = viewMode === 'docs' ? id : null;

  useEffect(() => {
    const backgroundStyles = `
    ${backgroundSelector} {
      background: ${value} !important;
      ${transitionStyle}
      }`;

    if (!shownBackground) {
      clearStyles(backgroundSelectorId);
      return;
    }

    addBackgroundStyle(backgroundSelectorId, backgroundStyles, backgroundTarget);
  }, [backgroundSelector, backgroundSelectorId, backgroundTarget, shownBackground, value]);

  return StoryFn();
};