import { addons, types } from 'storybook/internal/manager-api';

import { ADDON_ID, THEME_MAP_PARAMETER_KEY, THEME_SWITCHER_ID } from './theme/constants';
import { ThemeSwitcher } from './components/theme-switcher';

addons.register(ADDON_ID, () => {
  addons.add(THEME_SWITCHER_ID, {
    title: 'Themes',
    type: types.TOOL,
    match: ({ viewMode, tabId }) => !!(viewMode && viewMode.match(/^(story|docs)$/)) && !tabId,
    render: ThemeSwitcher,
    // paramKey: THEME_MAP_PARAMETER,
  });
});
