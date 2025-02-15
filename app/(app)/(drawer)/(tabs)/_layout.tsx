import { router, Stack, Tabs, useNavigation } from "expo-router";
import React from "react";
import {
  Button,
  Linking,
  Platform,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

import { Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Avatar } from "@/components";
import { useSessionStore } from "@/store";

function AvatarHeader() {
  const navigation = useNavigation();
  const { user } = useSessionStore();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {router.canGoBack() && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 10, backgroundColor: "transparent" }}
        >
          <ThemedText>
            <Ionicons name="arrow-back" size={24} />
          </ThemedText>
        </TouchableOpacity>
      )}
      <Pressable onPress={() => navigation.openDrawer()}>
        <Avatar name={user?.name || user?.email || ""} src={user?.picture} />
      </Pressable>
    </View>
  );
}

interface TabOptionsProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconOutline: keyof typeof Ionicons.glyphMap;
}

function getTabOptions({ title, icon, iconOutline }: TabOptionsProps) {
  return {
    title,
    tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
      <ThemedText>
        <Ionicons name={focused ? icon : iconOutline} size={26} color={color} />
      </ThemedText>
    ),
    headerTitle: () => (
      <Image
        style={{ aspectRatio: 7 / 2, maxWidth: 126 }}
        source={require("@/assets/images/UdalaCompleteColorPrimary.png")}
        resizeMode="contain"
      />
    ),
    headerTitleAlign: "center" as const,
    headerLeft: () => <AvatarHeader />,
    headerRight: () => <AvatarHeader />,
  };
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute", // For iOS to use transparent background with blur effect
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="(home)" // This is your home tab
        options={getTabOptions({
          title: "Hasiera",
          icon: "home",
          iconOutline: "home-outline",
        })}
      />

      <Tabs.Screen
        name="(explore)"
        options={getTabOptions({
          title: "Zerbitzuak",
          icon: "home",
          iconOutline: "home-outline",
        })}
      />
    </Tabs>
  );
}
