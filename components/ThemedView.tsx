import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { TrukunColors } from "@/constants/Colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  color?: TrukunColors;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  color = "background",
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    color
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
