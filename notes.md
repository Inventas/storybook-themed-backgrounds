

## Theme Plugin
- Uses decorators to add dark mode to the app
  - `ClassNameDecorator`: adds the theme class to the component
  - `DataAttributeDecorator`: adds the data attribute to the component
  - `JSXProviderDecorator`: adds the JSX provider to the component

What do we need:

- We want each theme to have the option to provide a 1 to n background colors
- The default background colors are provided to the decorator when configuring the theme in `preview.ts`

```js
const preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: { 
          class: "",
          backgroundColors: [
            "bg-white",
            "bg-gray-100",
            "bg-gray-200",
            "bg-gray-300",
          ]
        },
        dark: { 
          class: "dark",
          backgroundColors: [
            "bg-gray-700",
            "bg-gray-800",
            "bg-gray-900",
            "bg-gray-950",
            "bg-black",
          ]
        },
      },
      defaultTheme: "light",
    }),
  ],
}
```
