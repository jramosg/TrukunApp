import React, { ReactElement } from "react";
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { brandColors } from "@/constants/Colors";
type ButtonProps = {
  title?: string;
  onPress: () => void;
  variant?: "filled" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "danger" | string;
  icon?: string;
  iconPosition?: "start" | "end";
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode | undefined;
};

type Colors = {
  primary: string;
  secondary: string;
  danger: string;
  white: string;
  transparent: "transparent";
};

const COLORS: Colors = {
  primary: brandColors.primaryMain,
  secondary: "#6c757d",
  danger: "#dc3545",
  white: "#fff",
  transparent: "transparent" as const,
};

const TrukunButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "filled",
  size = "medium",
  color = "primary",
  icon,
  iconPosition = "start",
  disabled = false,
  loading = false,
  style,
  children,
}) => {
  const btnColor = COLORS[color] || color;
  const textColor = variant === "filled" ? COLORS.white : btnColor;
  const borderColor = variant === "outlined" ? btnColor : "transparent";

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          paddingVertical: 6,
          paddingHorizontal: 12,
          fontSize: 14,
          iconSize: 18,
        };
      case "large":
        return {
          paddingVertical: 14,
          paddingHorizontal: 24,
          fontSize: 18,
          iconSize: 24,
        };
      default:
        return {
          paddingVertical: 10,
          paddingHorizontal: 20,
          fontSize: 16,
          iconSize: 20,
        };
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        { opacity: disabled || loading ? 0.6 : pressed ? 0.5 : 1.0 },
        styles.button,
        {
          backgroundColor: variant === "filled" ? btnColor : COLORS.transparent,
          borderColor: borderColor,
          borderWidth: variant === "outlined" ? 2 : 0,
        },
        getSizeStyles(),
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : children ? (
        children
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === "start" && (
            <Ionicons
              name={icon}
              size={getSizeStyles().iconSize}
              color={textColor}
              style={styles.icon}
            />
          )}
          <Text
            style={[
              styles.text,
              { color: textColor, fontSize: getSizeStyles().fontSize },
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === "end" && (
            <Ionicons
              name={icon}
              size={getSizeStyles().iconSize}
              color={textColor}
              style={styles.icon}
            />
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  text: {
    fontWeight: "bold",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 6,
  },
});

export default TrukunButton;
