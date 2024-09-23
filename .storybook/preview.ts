import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      options: {
        // --- Light ---
        white: { name: 'White', value: '#ffffff' },
        "gray-50": { name: "Gray 50", value: "#f9fafb" },
        "gray-100": { name: "Gray 100", value: "#f3f4f6" },
        "gray-200": { name: "Gray 200", value: "#e5e7eb" },
        // --- Dark ---
        "dark-700": { name: "Dark 700", value: "#3f3f46" },
        "dark-800": { name: "Dark 800", value: "#27272a" },
        "dark-900": { name: "Dark 900", value: "#18181b" },
        "dark-950": { name: "Dark 950", value: "#09090b" },
      },
    },
    "theme-map": {
      a: [
        "white",
        "gray-50",
        "gray-100",
        "gray-200",
      ],
      b: [
        "dark-700",
        "dark-800",
        "dark-900",
        "dark-950",
      ]
    },
  },
  initialGlobals: {
    background: { value: "light" },
  },
};

export default preview;
