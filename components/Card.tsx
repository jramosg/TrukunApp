import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

interface CardProps {
  children: ReactNode;
  elevation?: number;
  style?: object;
}

const Card: React.FC<CardProps> = ({
  children,
  elevation = 0,
  style,
  ...props
}) => {
  const backgroundColor = useThemeColor({}, "paper");

  const elevationStyle = (() => {
    switch (elevation) {
      case 5:
        return styles.elevation5;

      default:
        return null;
    }
  })();

  return (
    <ThemedView
      style={[
        styles.card,
        {
          backgroundColor: backgroundColor,
        },
        elevationStyle,
        style,
      ]}
      {...props}
    >
      {children}
    </ThemedView>
  );
};

export const cardBorderRadius = 8
const styles = StyleSheet.create({
  card: {
    borderRadius: cardBorderRadius,
  },
  elevation5: {
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    elevation: 5,
  },
});

export default Card;
