import { brandColors, Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type AvatarProps = {
  src?: string;
  name: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, name }) => {
  const getInitials = (name: string) => {
    return name && name.length > 0 ? name[0].toUpperCase() : "?";
  };

  return (
    <View
      style={[
        styles.avatar,
        src ? styles.avatarWithImg : null, // Condition for image style
      ]}
    >
      {src ? (
        <Image source={{ uri: src }} style={styles.avatarImage} />
      ) : (
        <Text style={styles.initials}>{getInitials(name)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: brandColors.primary,
    userSelect: "none",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    objectFit: "cover",
  },
  initials: {
    fontSize: 20, // You can adjust the font size based on avatar size
    color: brandColors.primaryMainContrast,
  },
  avatarWithImg: {
    backgroundColor: "transparent",
  },
});

export default Avatar;
