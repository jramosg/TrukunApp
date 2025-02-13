import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  brandColors,
  Colors,
  TrukunColorKeys,
  TrukunColors,
} from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "headline1"
    | "headline2";
  align?: "left" | "center" | "right";
  color?: TrukunColorKeys; // Color prop for dynamic color, including predefined colors or custom ones
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  align = "left",
  color, // Color passed as prop
  ...rest
}: ThemedTextProps) {
  const textColor = color
    ? brandColors[color] || color
    : useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const textAlignStyle = styles[align];

  return (
    <Text
      style={[
        { color: textColor }, // Use dynamic or theme color
        textAlignStyle,
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "headline1" ? styles.headline1 : undefined,
        type === "headline2" ? styles.headline2 : undefined,

        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4", // Default link color
  },
  headline1: {
    fontSize: 26,
    fontWeight: 500,
    lineHeight: 31.03,
  },
  headline2: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 28.13,
  },
  // Text alignment styles
  left: {
    textAlign: "left",
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
});
