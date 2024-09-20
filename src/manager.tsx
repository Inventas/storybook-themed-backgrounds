import React from "react";
import { addons, types } from "storybook/internal/manager-api";

import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { ADDON_ID, THEME_SWITCHER_ID } from "./constants";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

// Register the addon
addons.register(ADDON_ID, (api) => {
  // Register a tool
  addons.add(THEME_SWITCHER_ID, {
    title: "Tailwind Themes",
    type: types.TOOL,
    match: ({ viewMode, tabId }) => !!(viewMode && viewMode.match(/^(story|docs)$/)) && !tabId,
    render: () => <ThemeSwitcher api={api} />,
  });
});
