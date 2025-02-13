import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, Stack } from "expo-router";
import Auth from "@/components/Auth";
import { brandColors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useSessionStore } from "@/store";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "explore",
  settings: {
    initialRouteName: "explore",
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { setSession } = useSessionStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("getSession", session);
      setSession(session);
    });

    supabase.auth.onAuthStateChange((event, session) => {
      console.log("session changed", session);
      setSession(session);
      if (event == "PASSWORD_RECOVERY") {
        router.navigate("/password-recovery");
      } else {
        router.navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const theme = {
    dark: {
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        primary: brandColors.primaryMain,
        ...brandColors,
      },
    },
    light: {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: brandColors.primaryMain,
        ...brandColors,
      },
    },
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? theme.dark : theme.light}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
