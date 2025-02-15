/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export type brandColors = {
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
  dangerMain: string;
  tabIconSelected: string;
  primary: string,
  primaryMainContrast: string;
};

const primaryColor:string = "#784dbf"

export const brandColors: brandColors = {
  primary: primaryColor,
  primary100: "#9f65fc",
  primary200: "#9c63f7",
  primary300: "#8555d4",
  primary400: "#925de8",
  primaryMain: primaryColor,
  primary600: "#6c44ab",
  primary700: "#5f3c96",
  primary800: "#523482",
  primary900: "#342c6e",
  primary1000: "#382459",
  dangerMain: "#FF4961",
  tabIconSelected: primaryColor,
  primaryMainContrast: "#ffffff",
};

export const Colors = {
  light: {
    text: "#11181C",
    secondaryText: "#6F7780",
    background: "#fafafa",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    paper: "#ffffff",
    ...brandColors,
  },
  dark: {
    text: "#ECEDEE",
    secondaryText: "#9BA1A6",
    background: "#121212",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    paper: "#1e1e1e",
    ...brandColors,
  },
};

export type TrukunColors = keyof typeof Colors.light & keyof typeof Colors.dark;
