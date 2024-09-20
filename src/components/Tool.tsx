import React, { memo, useCallback, useEffect } from "react";
import { useGlobals, type API } from "storybook/internal/manager-api";
import { IconButton } from "storybook/internal/components";
import { ADDON_ID, GLOBAL_KEY, THEME_SWITCHER_ID } from "../constants";
import { PaintBrushIcon } from "@storybook/icons";

export const Tool = memo(function MyAddonSelector({ api }: { api: API }) {
  const [globals, updateGlobals, storyGlobals] = useGlobals();

  const isLocked = GLOBAL_KEY in storyGlobals;
  const isActive = !!globals[GLOBAL_KEY];

  const toggle = useCallback(() => {
    updateGlobals({
      [GLOBAL_KEY]: !isActive,
    });
  }, [isActive]);

  useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: "Toggle Measure [O]",
      defaultShortcut: ["O"],
      actionName: "outline",
      showInMenu: false,
      action: toggle,
    });
  }, [toggle, api]);

  return (
    <IconButton
      key={THEME_SWITCHER_ID}
      active={isActive}
      disabled={isLocked}
      title="Enable my addon"
      onClick={toggle}
    >
      <PaintBrushIcon />
    </IconButton>
  );
});
