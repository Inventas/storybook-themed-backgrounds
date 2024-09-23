// eslint-disable-next-line import/no-extraneous-dependencies
import React, { Fragment, useCallback } from 'react';

import { IconButton, TooltipLinkList, WithTooltip } from 'storybook/internal/components';
import {
  addons,
  useAddonState,
  useChannel,
  useGlobals,
  useParameter,
} from 'storybook/internal/manager-api';
import { styled } from 'storybook/internal/theming';

import { PaintBrushIcon, CircleIcon } from '@storybook/icons';

import type { Config as BackgroundConfig, GlobalState as BackgroundGlobalStateUpdate } from '../backgrounds/types';
import { BACKGROUND_PARAM_KEY, BACKGROUND_PARAM_KEY as BACKGROUND_KEY } from "../backgrounds/constants";
import {
  DEFAULT_ADDON_STATE,
  DEFAULT_THEME_PARAMETERS,
  GLOBAL_KEY as KEY,
  THEME_MAP_PARAMETER_KEY,
  THEME_SWITCHER_ID,
  THEMING_EVENTS,
  ThemeAddonState, ThemeMap, ThemeParameters
} from '../theme/constants';

const IconButtonLabel = styled.div(({ theme }) => ({
  fontSize: theme.typography.size.s2 - 1,
}));

const ThemeHeader = styled.div(({ theme }) => ({
  borderBottomColor: theme.appBorderColor,
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderTopColor: theme.appBorderColor,
  borderTopWidth: "10px",
  borderTopStyle: "solid",
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '7px',
  paddingBottom: '7px',
  fontWeight: '700'
}));

export const ThemeSwitcher = React.memo(function ThemeSwitcher() {

  // ----------- Theme Config -----------

  const { themeOverride, disable } = useParameter<ThemeParameters>(
    THEME_MAP_PARAMETER_KEY,
    DEFAULT_THEME_PARAMETERS
  ) as ThemeParameters;
  const [{ theme: selected }, updateGlobals, storyGlobals] = useGlobals();

  const channel = addons.getChannel();
  const fromLast = channel.last(THEMING_EVENTS.REGISTER_THEMES);
  const initializeThemeState = Object.assign({}, DEFAULT_ADDON_STATE, {
    themesList: fromLast?.[0]?.themes || [],
    themeDefault: fromLast?.[0]?.defaultTheme || '',
  });

  const [{ themesList, themeDefault }, updateState] = useAddonState<ThemeAddonState>(
    THEME_SWITCHER_ID,
    initializeThemeState
  );

  const isLocked = KEY in storyGlobals || !!themeOverride;

  useChannel({
    [THEMING_EVENTS.REGISTER_THEMES]: ({ themes, defaultTheme }) => {
      updateState((state) => ({
        ...state,
        themesList: themes,
        themeDefault: defaultTheme,
      }));
    },
  });

  // ----------- Background Config -----------

  const backgroundConfig = useParameter<BackgroundConfig>(BACKGROUND_PARAM_KEY);
  const { options = {} } = backgroundConfig || {};
  const themeMap = useParameter<ThemeMap>(THEME_MAP_PARAMETER_KEY, {});

  console.log("object", Object.entries(options))

  const backgrounds = Object.entries(themeMap).map(([theme, backgroundKeys]) => ({
    theme,
    items: backgroundKeys.map(key => {
      const color = options[key];
      return {
        name: `${color?.name || key} (${color.value})`,
        value: color?.value || '',
        key: key
      };
    }).filter(item => item.value !== '')
  }));

  const updateBackground = useCallback(
    (input: BackgroundGlobalStateUpdate) => {
      updateGlobals({
        [BACKGROUND_KEY]: input,
      });
    },
    [updateGlobals]
  );

  // ----------- Render -----------

  const themeName = selected || themeDefault;
  let label = '';
  if (isLocked) {
    label = 'Story override';
  } else if (themeName) {
    label = `${themeName} theme`;
  }

  if (disable) {
    return null;
  }

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnOutsideClick
      tooltip={({ onHide }) => {
        return (<div>
          {backgrounds.map((background) => (
            <Fragment key={background.theme}>
              <ThemeHeader>
                {background.theme}
              </ThemeHeader>
              <TooltipLinkList
                links={background.items.map((item) => ({
                  id: item.value,
                  title: item.name,
                  active: selected === item.key,
                  icon: <CircleIcon color={item?.value || 'grey'} />,
                  onClick: () => {
                    updateGlobals({ theme: background.theme });
                    updateBackground({ value: item.key, grid: false });
                    onHide();
                  },
                }))}
              />
            </Fragment>
          ))}
        </div>)
      }}
    >
      <IconButton
        key={THEME_SWITCHER_ID}
        active={!themeOverride}
        title="Theme"
        disabled={isLocked}
      >
        <PaintBrushIcon />
        {label && <IconButtonLabel>{label}</IconButtonLabel>}
      </IconButton>
    </WithTooltip>
  );
});
