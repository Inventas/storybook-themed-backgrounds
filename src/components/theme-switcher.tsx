// eslint-disable-next-line import/no-extraneous-dependencies
import React, { Fragment, memo, useCallback, useState } from 'react';

import { IconButton, TooltipLinkList, WithTooltip } from 'storybook/internal/components';
import {
  addons,
  useAddonState,
  useChannel,
  useGlobals,
  useParameter,
} from 'storybook/internal/manager-api';
import { styled } from 'storybook/internal/theming';

import { PaintBrushIcon, CircleIcon, GridIcon, PhotoIcon, RefreshIcon } from '@storybook/icons';

import { DEFAULT_BACKGROUNDS } from '../defaults';
import type { Background, BackgroundMap, Config, BackgroundGlobalStateUpdate } from '../types';
import { BACKGROUND_KEY, Color, GenericColorMap, PARAMETER_KEY, ThemeAddonState, ThemeParameters } from "../constants";
import {
  DEFAULT_ADDON_STATE,
  DEFAULT_THEME_PARAMETERS,
  GLOBAL_KEY as KEY,
  PARAM_KEY,
  THEME_SWITCHER_ID,
  THEMING_EVENTS,
} from '../constants';

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

const hasMultipleThemes = (themesList: ThemeAddonState['themesList']) => themesList.length > 1;
const hasTwoThemes = (themesList: ThemeAddonState['themesList']) => themesList.length === 2;

export const ThemeSwitcher = React.memo(function ThemeSwitcher() {

  const { themeOverride, disable } = useParameter<ThemeParameters>(
    PARAM_KEY,
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

  console.log(themesList)

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

  const updateBackground = useCallback(
    (input: BackgroundGlobalStateUpdate) => {
      updateGlobals({
        [BACKGROUND_KEY]: input,
      });
    },
    [updateGlobals]
  );

  const defaultColorMap: GenericColorMap = themesList.reduce((acc, theme) => {
    acc[theme] = {theme: { name: theme, value: '#000000' }};
    return acc;
  }, {} as GenericColorMap);

  const themeBackgroundsMapping = useParameter<GenericColorMap>("tailwind-themes", defaultColorMap);

  const backgrounds = Object.entries(themeBackgroundsMapping).map(([theme, colors]) => ({
    theme,
    items: Object.entries(colors).map(([key, color]) => ({
      name: `${theme} (${color.name})`,
      value: color.value,
      key: key
    }))
  }));

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
                  onClick: () => {
                    updateGlobals({ theme: background.theme });
                    updateBackground({ value: item.value, grid: false });
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
