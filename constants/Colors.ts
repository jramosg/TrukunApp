/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export type TrukunColors = {
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primaryMain: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;
  primary1000: string;
  dangerMain: string
};

export type TrukunColorKeys = keyof TrukunColors;

export const brandColors: TrukunColors = {
  primary100: "#9f65fc",
  primary200: "#9c63f7",
  primary300: "#8555d4",
  primary400: "#925de8",
  primaryMain: "#784dbf",
  primary600: "#6c44ab",
  primary700: "#5f3c96",
  primary800: "#523482",
  primary900: "#342c6e",
  primary1000: "#382459",
  dangerMain: "#FF4961",
};

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
