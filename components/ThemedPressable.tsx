import { Pressable, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { TrukunColors } from "@/constants/Colors";

export type ThemedPressableProps = ViewProps & {
  color?: TrukunColors;
};

export function ThemedPressable({
  style,
  color = "background",
  ...otherProps
}: ThemedPressableProps) {
  const backgroundColor = useThemeColor({}, color);
  console.log("presss", backgroundColor);
  return <Pressable style={[{ backgroundColor }, style]} {...otherProps} />;
}
