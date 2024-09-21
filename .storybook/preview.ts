import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    "tailwind-themes": {
      themes: {
        light: {
          white: { name: "white", value: "#ffffff" },
          "gray-50": { name: "gray-50", value: "#f9fafb" },
          "gray-100": { name: "gray-100", value: "#f3f4f6" },
          "gray-200": { name: "gray-200", value: "#e5e7eb" },
        },
        dark: {
          "dark-700": { name: "dark-700", value: "#3f3f46" },
          "dark-800": { name: "dark-800", value: "#27272a" },
          "dark-900": { name: "dark-900", value: "#18181b" },
          "dark-950": { name: "dark-950", value: "#09090b" },
        }
      }
    }
  },
  initialGlobals: {
    background: { value: "light" },
  },
};

export default preview;
